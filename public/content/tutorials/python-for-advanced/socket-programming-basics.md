# Socket Programming Basics

At the foundation of all network communication—from HTTP APIs and database drivers to WebSockets and peer-to-peer protocols—lies the **Socket API**. Standardized through the BSD Sockets interface, a socket is an operating system abstraction representing an endpoint for network data transmission.

In Python, the standard `socket` module exposes low-level C system calls directly, providing fine-grained control over network protocols, buffers, and addressing schemes.

---

## 1. Network Architecture: The Berkeley Socket Model

Sockets operate predominantly at the **Transport Layer** (Layer 4) of the OSI model, mediating communication between application processes and the network protocol stack:

```
 Application Layer:   [ Web Browser / Python App / Database Client ]
                                  │
                          The Socket Interface
                 socket(AF_INET, SOCK_STREAM / SOCK_DGRAM)
                                  │
 Transport Layer:     [ TCP Protocol ]        [ UDP Protocol ]
                                  │
 Network Layer:       [ IPv4 / IPv6 Routing (IP Packets) ]
```

### Core Socket Families and Types

| Constant | Description | Operational Domain |
| :--- | :--- | :--- |
| `socket.AF_INET` | IPv4 Addressing | Standard internet communication `("127.0.0.1", 8080)` |
| `socket.AF_INET6` | IPv6 Addressing | Modern IPv6 internet addresses `("::1", 8080)` |
| `socket.AF_UNIX` | Unix Domain Sockets | Ultra-fast local Inter-Process Communication (POSIX only) |
| `socket.SOCK_STREAM` | Stream Socket (TCP) | Reliable, connection-oriented, ordered byte stream |
| `socket.SOCK_DGRAM` | Datagram Socket (UDP) | Unreliable, connectionless, message-based packets |

---

## 2. Server & Client Lifecycle Mechanics

TCP communication requires a structured connection handshake before data exchange can take place:

```
           SERVER PROCESS                              CLIENT PROCESS
                 │                                           │
          socket.socket()                             socket.socket()
                 │                                           │
          socket.bind()                                      │
                 │                                           │
         socket.listen()                                     │
                 │                                           │
         socket.accept() (Blocks)                            │
                 │                                           │
                 │ ◄─────── Three-Way Handshake ───────────► │ socket.connect()
                 ▼                                           ▼
      (Returns client_socket)
                 │                                           │
       client_socket.recv()   ◄────── Data Stream ────────── │ socket.sendall()
                 │                                           │
       client_socket.sendall() ────── Data Stream ─────────► │ socket.recv()
                 │                                           │
       client_socket.close()                                 │ socket.close()
```

---

## 3. The `send()` vs `sendall()` Distinction

> **Critical Trap:** When transmitting data over a TCP socket:
> - `socket.send(data)` is a low-level call that returns the number of bytes actually sent. Under network congestion or full OS buffers, it may send only a **partial subset** of your bytes!
> - `socket.sendall(data)` loops internally until the entire buffer has been transmitted or an error occurs. **In production code, always use `sendall()`**.

```python
# Unsafe approach:
# bytes_sent = sock.send(payload)  # Might only send 400 out of 1000 bytes!

# Safe idiomatic approach:
sock.sendall(payload)  # Guarantees transmission of all 1000 bytes
```

---

## 4. Production Echo Server & Client Example

### The Server Implementation

```python
import socket

def run_echo_server(host: str = "127.0.0.1", port: int = 65432) -> None:
    # 1. Create IPv4 TCP socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_sock:
        # SO_REUSEADDR prevents "Address already in use" errors during server restarts
        server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        # 2. Bind socket to host and port
        server_sock.bind((host, port))

        # 3. Listen for incoming connections (backlog queue = 5)
        server_sock.listen(5)
        print(f"[SERVER] Listening on {host}:{port}...")

        # 4. Accept a connection (blocks until client connects)
        client_conn, client_addr = server_sock.accept()
        with client_conn:
            print(f"[SERVER] Connection established with client: {client_addr}")
            while True:
                # 5. Receive data (up to 1024 bytes buffer)
                data = client_conn.recv(1024)
                if not data:
                    print("[SERVER] Client disconnected cleanly.")
                    break  # Empty bytes indicates client closed connection

                message = data.decode("utf-8")
                print(f"[SERVER] Received: '{message}'")

                # 6. Echo back the response
                reply = f"ECHO: {message.upper()}".encode("utf-8")
                client_conn.sendall(reply)

if __name__ == "__main__":
    # Server can be started in a standalone terminal
    pass
```

### The Client Implementation

```python
import socket

def run_echo_client(host: str = "127.0.0.1", port: int = 65432) -> None:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_sock:
        print(f"[CLIENT] Connecting to {host}:{port}...")
        client_sock.connect((host, port))
        print("[CLIENT] Connected!")

        # Send encoded byte payload
        message = "Hello, Berkeley Sockets!"
        client_sock.sendall(message.encode("utf-8"))

        # Receive server response
        response = client_sock.recv(1024)
        print(f"[CLIENT] Server replied: '{response.decode('utf-8')}'")

if __name__ == "__main__":
    # Client connects to active echo server
    pass
```

---

## 5. Architectural Summary Table

| API Function | Role | Called By | Blocking Behavior |
| :--- | :--- | :--- | :--- |
| `bind((host, port))` | Associates socket with an IP/port | Server | Non-blocking |
| `listen(backlog)` | Puts socket into passive listening mode | Server | Non-blocking |
| `accept()` | Waits for connection; returns `(conn, addr)` | Server | Blocks until client connects |
| `connect((host, port))` | Initiates 3-way TCP handshake | Client | Blocks until handshake finishes |
| `sendall(bytes)` | Transmits complete byte buffer | Server & Client | Blocks until buffer is transmitted |
| `recv(bufsize)` | Reads incoming bytes from socket buffer | Server & Client | Blocks until data arrives or closed |

---

# Multiple Choice Questions

### 1.
What socket family constant represents standard IPv4 internet addressing in Python?
A. `socket.AF_UNIX`
B. `socket.AF_INET`
C. `socket.SOCK_STREAM`
D. `socket.AF_LINK`

**Answer:** B

**Explanation:** `socket.AF_INET` designates the IPv4 address family, expecting a tuple of `(host, port)`.

---

### 2.
Why is `socket.sendall()` preferred over `socket.send()` in production network programming?
A. `sendall()` uses UDP, which is faster.
B. `send()` may transmit only a partial slice of the byte buffer under heavy network loads, whereas `sendall()` loops until the entire buffer is sent.
C. `sendall()` automatically encrypts data using TLS.
D. `send()` is deprecated in Python 3.

**Answer:** B

**Explanation:** Standard `send()` only guarantees transmitting what the OS network buffers can immediately take, which may be fewer bytes than requested. `sendall()` guarantees complete transmission of the entire buffer.

---

### 3.
What does an empty byte string `b""` returned by `sock.recv(1024)` signify?
A. The network cable was unplugged.
B. The remote peer has closed its connection cleanly (EOF / TCP FIN).
C. The buffer size was too small.
D. A server timeout occurred.

**Answer:** B

**Explanation:** In TCP socket communication, when the remote peer shuts down the connection gracefully, `recv()` returns an empty bytes object `b""`, signaling End-of-File (EOF).

---

### 4.
What is the purpose of setting `server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)`?
A. It allows the server to bind to the port immediately upon restart, bypassing the operating system's `TIME_WAIT` socket delay.
B. It increases download speeds by 50%.
C. It allows multiple servers to bind to the exact same port simultaneously.
D. It enables IPv6 routing.

**Answer:** A

**Explanation:** `SO_REUSEADDR` allows the socket to reuse local addresses in the `TIME_WAIT` state, preventing `OSError: [Errno 98] Address already in use` when quickly restarting a server.

---

### 5.
Which socket type constant specifies a reliable, connection-oriented TCP byte stream?
A. `socket.SOCK_DGRAM`
B. `socket.SOCK_RAW`
C. `socket.SOCK_STREAM`
D. `socket.SOCK_RDM`

**Answer:** C

**Explanation:** `socket.SOCK_STREAM` defines a sequenced, two-way, reliable byte stream protocol, which maps directly to TCP.

---
