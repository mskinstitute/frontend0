# File Exceptions and Error Handling in Python

File operations interact directly with the operating system and physical storage drives, making them inherently prone to runtime exceptions. A file might be missing, locked by another process, lack read/write permissions, or contain an incompatible text encoding. 

Mastering Python's file exception hierarchy ensures your applications fail gracefully and protect critical user data from corruption.

---

## 1. The File Exception Hierarchy

All file and operating-system-level errors in Python inherit from the base `OSError` class.

```text
BaseException
 └── Exception
      └── OSError (or EnvironmentError / IOError)
           ├── FileNotFoundError       # File does not exist
           ├── PermissionError         # Insufficient read/write privileges
           ├── IsADirectoryError       # Expected a file, but target is a folder
           ├── NotADirectoryError      # Expected a directory in path, but found a file
           ├── FileExistsError         # Attempted to create an already-existing file (mode 'x')
           └── TimeoutError            # System operation timed out
```

Additionally, opening text files with the wrong character set can trigger:
- **`UnicodeDecodeError`**: Occurs when bytes in a binary stream cannot be decoded into the expected encoding (e.g., attempting to read a binary image as `utf-8`).
- **`UnicodeEncodeError`**: Occurs when writing characters that the target encoding cannot express.

---

## 2. Common File Exceptions in Action

### 1. `FileNotFoundError`

Attempting to read a non-existent file in `'r'` mode raises `FileNotFoundError`:

```python
try:
    with open("missing_report.csv", "r", encoding="utf-8") as f:
        data = f.read()
except FileNotFoundError as err:
    print(f"Error: Could not locate file ({err})")
```

### 2. `PermissionError`

Occurs when the current user account does not have read/write privileges for the destination path, or if an operating-system-level lock (e.g., another process writing to the file) prohibits access:

```python
try:
    # Attempting to write to a protected system folder
    with open("C:/Windows/System32/config.sys", "w") as f:
        f.write("test")
except PermissionError:
    print("Access denied: Administrative privileges required.")
```

### 3. `FileExistsError` (Exclusive Creation Mode `'x'`)

Mode `'x'` guarantees that a file is created *only* if it does not already exist, preventing accidental data overwrites:

```python
try:
    with open("audit_log.txt", "x", encoding="utf-8") as f:
        f.write("Log initialized.\n")
except FileExistsError:
    print("Audit log already exists. Skipping re-initialization.")
```

---

## 3. The Full `try-except-else-finally` File Pattern

The most robust architectural pattern for file operations combines context managers with a comprehensive error-handling structure:

```python
def process_data_file(filepath):
    file_handle = None
    try:
        # 1. Attempt the file operation
        with open(filepath, "r", encoding="utf-8") as file_handle:
            content = file_handle.read()
            processed_data = [line.strip().upper() for line in content.splitlines()]
            
    except FileNotFoundError:
        print(f"Error: Target file '{filepath}' was not found.")
        return None
        
    except PermissionError:
        print(f"Error: Insufficient read permissions for '{filepath}'.")
        return None
        
    except UnicodeDecodeError as err:
        print(f"Encoding mismatch in '{filepath}': {err}")
        return None
        
    except OSError as err:
        # Catch-all for any other low-level OS/disk failures
        print(f"Unexpected OS error occurred: {err}")
        return None
        
    else:
        # 2. Runs ONLY if try block executed without any exceptions
        print(f"Successfully processed {len(processed_data)} records.")
        return processed_data
        
    finally:
        # 3. Runs ALWAYS, regardless of success or exception
        print(f"File handling cycle for '{filepath}' concluded.")
```

---

## 4. EAFP vs. LBYL in File Handling

In Python development, there are two distinct design philosophies:

1. **LBYL (Look Before You Leap):**
   ```python
   import os
   if os.path.exists("records.txt"):
       with open("records.txt") as f:
           data = f.read()
   ```
   *The Flaw:* **Race conditions (TOCTOU - Time Of Check To Time Of Use)**. Between the time `os.path.exists()` returns `True` and `open()` executes, another process or thread could delete or lock the file!

2. **EAFP (Easier to Ask for Forgiveness than Permission - The Pythonic Way):**
   ```python
   try:
       with open("records.txt") as f:
           data = f.read()
   except FileNotFoundError:
       data = ""
   ```
   *The Benefit:* Atomic, clean, thread-safe, and avoids redundant filesystem calls.

---

## 5. Best Practices Checklist

- [x] **Always handle specific exceptions first:** Place `FileNotFoundError` and `PermissionError` before generic `OSError` or `Exception`.
- [x] **Always specify `encoding="utf-8"`:** Never rely on system-default encodings (which differ between Windows and Linux/macOS).
- [x] **Use mode `'x'` for safety:** If you don't want to inadvertently overwrite existing files, use exclusive creation `'x'`.
- [x] **Embrace EAFP:** Let `open()` attempt the action and catch expected errors rather than pre-checking with `os.path.exists()`.

---

# Multiple Choice Questions

### 1. Which base class do `FileNotFoundError`, `PermissionError`, and `IsADirectoryError` all inherit from?
A. `ValueError`
B. `IOBase`
C. `OSError`
D. `SystemError`
**Answer:** C
**Explanation:** In Python 3, file system and operating system exceptions inherit directly from `OSError`.
---

### 2. What open mode should you use to open a file for writing ONLY if the file does not already exist?
A. `'w'`
B. `'a'`
C. `'r+'`
D. `'x'`
**Answer:** D
**Explanation:** Mode `'x'` provides exclusive creation. If the target file exists, Python immediately raises a `FileExistsError`.
---

### 3. Why is the EAFP pattern preferred over checking `os.path.exists()` before opening a file?
A. `os.path.exists()` is deprecated in modern Python
B. EAFP prevents Time-of-Check to Time-of-Use (TOCTOU) race conditions
C. `try-except` blocks execute faster than `if` conditions in all scenarios
D. `os.path.exists()` cannot inspect text files
**Answer:** B
**Explanation:** Checking file existence first (LBYL) leaves a window where another process could modify or delete the file before `open()` is called. EAFP handles the operation atomically.
---

### 4. Which block in a `try-except-else-finally` statement executes strictly when NO exceptions occurred in the `try` block?
A. `except`
B. `else`
C. `finally`
D. `catch`
**Answer:** B
**Explanation:** The `else` block executes only if the code in the `try` suite completes cleanly without raising any exceptions.
---

### 5. What error occurs when reading a file encoded in UTF-16 using `encoding="utf-8"`?
A. `PermissionError`
B. `FileNotFoundError`
C. `UnicodeDecodeError`
D. `AttributeError`
**Answer:** C
**Explanation:** When bytes in the target stream do not adhere to the expected byte rules of the specified encoding, Python raises `UnicodeDecodeError`.
---
