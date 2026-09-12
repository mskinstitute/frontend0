# The OS and Sys Modules in Python

Python scripts frequently need to interact with the underlying operating system and the Python runtime interpreter itself. The **`os`** module provides a portable interface for interacting with the operating system (filesystem, environment variables, directories), while the **`sys`** module grants access to interpreter internals, command-line arguments, and standard I/O streams.

---

## 1. Navigating Files and Folders with the `os` Module

The `os` module abstracts away low-level differences between Windows, macOS, and Linux.

### Managing Current Working Directory & Files

```python
import os

# 1. Get Current Working Directory
cwd = os.getcwd()
print(f"Current Directory: {cwd}")

# 2. Creating Directories safely
os.makedirs("data/backups/daily", exist_ok=True)

# 3. Listing Directory Contents
entries = os.listdir(".")
print("Directory entries:", entries[:5])

# 4. Traversing Trees with os.walk()
for root, dirs, files in os.walk("data"):
    print(f"Directory: {root} | Subfolders: {len(dirs)} | Files: {len(files)}")
```

---

## 2. Path Manipulation with `os.path`

Paths differ drastically between platforms (Windows uses backslashes `\`, while UNIX uses forward slashes `/`). Never concatenate paths with manual strings (`"folder/" + file`). Always use **`os.path.join()`**:

```python
import os

# Cross-platform path construction
folder = "projects"
subfolder = "python"
filename = "main.py"

full_path = os.path.join(folder, subfolder, filename)
print("Cross-platform Path:", full_path)

# Path analysis helpers
print("Absolute Path:", os.path.abspath(full_path))
print("Directory Name:", os.path.dirname(full_path))  # projects/python
print("Base Filename:", os.path.basename(full_path))  # main.py
print("Extension Split:", os.path.splitext(full_path)) # ('projects/python/main', '.py')

# Existence and Type checks
print("Exists?", os.path.exists(full_path))
print("Is regular file?", os.path.isfile(full_path))
print("Is directory?", os.path.isdir(folder))
```

---

## 3. Reading Environment Variables with `os.environ`

Environment variables keep sensitive credentials and runtime configurations out of your source code:

```python
import os

# Access with fallback default
database_url = os.environ.get("DATABASE_URL", "sqlite:///default.db")
api_port = int(os.environ.get("PORT", 8080))

print(f"DB: {database_url} | Port: {api_port}")
```

---

## 4. Interpreter Control with the `sys` Module

While `os` communicates with the OS, `sys` provides controls for the active Python interpreter.

### 1. Command-Line Arguments with `sys.argv`

When a script is executed like `python script.py --mode fast -n 5`, arguments are passed as a list of strings in `sys.argv`:

```python
import sys

# sys.argv[0] is always the script name itself
script_name = sys.argv[0]
print(f"Script: {script_name}")
print(f"Total arguments passed: {len(sys.argv)}")

if len(sys.argv) > 1:
    print(f"First parameter: {sys.argv[1]}")
```

### 2. Terminating Execution with `sys.exit()`

Terminates script execution cleanly and returns a status code to the operating system shell (`0` indicates success; any non-zero integer indicates an error):

```python
import sys

def run_task(file_path):
    if not os.path.exists(file_path):
        print(f"Fatal: Required file '{file_path}' does not exist.", file=sys.stderr)
        # Exit with error code 1
        sys.exit(1)

    print("Task running...")
    sys.exit(0)  # Clean success exit
```

### 3. Runtime Introspection & Search Paths

```python
import sys

print(f"Python Version: {sys.version.split()[0]}")
print(f"Platform: {sys.platform}")        # 'win32', 'linux', or 'darwin'
print(f"Python Executable: {sys.executable}")

# The module search path list
print("First 2 paths in sys.path:", sys.path[:2])
```

---

## 5. Summary Comparison Table

| Module | Core Responsibility | Key Examples |
| :--- | :--- | :--- |
| **`os`** | Interacting with the operating system and filesystem | `os.listdir()`, `os.makedirs()`, `os.environ`, `os.walk()` |
| **`os.path`** | Cross-platform filesystem path manipulations | `os.path.join()`, `os.path.exists()`, `os.path.splitext()` |
| **`sys`** | Interacting with the Python runtime interpreter | `sys.argv`, `sys.exit()`, `sys.platform`, `sys.path` |

---

# Multiple Choice Questions

### 1. Why should you use `os.path.join("a", "b")` instead of `"a/" + "b"`?
A. String concatenation is forbidden in Python 3
B. `os.path.join()` automatically uses the correct platform-specific path separator (`\` on Windows, `/` on Linux/macOS)
C. It compresses the folder on disk
D. It prevents permissions errors
**Answer:** B
**Explanation:** Different operating systems use different path separator characters. `os.path.join()` dynamically chooses the appropriate separator for the host environment.
---

### 2. What is the element at `sys.argv[0]` in a Python script?
A. The first argument passed after the script name
B. The name or path of the executing script itself
C. The current operating system platform
D. The system username
**Answer:** B
**Explanation:** `sys.argv[0]` always holds the filename or path of the Python script being executed.
---

### 3. Which function splits a file path into its root path and file extension (e.g. `('document', '.pdf')`)?
A. `os.path.split_ext()`
B. `os.path.splitext()`
C. `os.path.extension()`
D. `os.path.divide()`
**Answer:** B
**Explanation:** `os.path.splitext(path)` splits the path into a tuple `(root, ext)` where `ext` contains the leading dot extension.
---

### 4. What exit code should be passed to `sys.exit()` to signal to the OS that the program completed successfully without errors?
A. `1`
B. `0`
C. `-1`
D. `200`
**Answer:** B
**Explanation:** In standard computing, exit status code `0` denotes success, while non-zero codes indicate various failure conditions.
---

### 5. How can you retrieve an environment variable named `API_KEY` safely with a default value fallback if not found?
A. `os.environ["API_KEY"]`
B. `os.environ.get("API_KEY", "default_key")`
C. `sys.get_env("API_KEY")`
D. `os.path.env("API_KEY")`
**Answer:** B
**Explanation:** `os.environ.get("KEY", default)` returns the default value if the environment variable does not exist, avoiding a `KeyError`.
---
