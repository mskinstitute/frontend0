---
id: python-opening-closing-files
slug: opening-closing-files
course: python-for-beginners
chapter: 15
topic: 15.1
title: Opening & Closing Files
description: The open() function, file access modes (r, w, a, x, b, t), and closing with close().
difficulty: Beginner
readingTime: 8
order: 78
keywords:
  - open()
  - close()
  - file modes
  - file handling
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Opening & Closing Files

File handling allows Python scripts to read from and write to permanent storage on disk.

---

# Key Concepts & Detailed Explanation

Common file modes:
- 'r' (Read): Default mode. Opens file for reading; raises FileNotFoundError if missing.
- 'w' (Write): Opens for writing. OVERWRITES existing contents; creates file if missing.
- 'a' (Append): Opens for writing. Appends data to end of file without overwriting.
- 'x' (Exclusive creation): Creates new file; fails if file already exists.
- 'b' (Binary): Used for images, audio, PDFs (e.g. 'rb', 'wb').
- 't' (Text): Default text mode.

---

# Code Examples & Output

```python
# Basic file writing and manual closing
file = open("sample.txt", "w")
file.write("Welcome to MSK Institute File Handling Tutorial!\n")
file.write("Learning Python from scratch.\n")
file.close()

# Reading it back
file = open("sample.txt", "r")
content = file.read()
print("File content:\n" + content)
file.close()
```

**Expected Output:**
```text
File content:
Welcome to MSK Institute File Handling Tutorial!
Learning Python from scratch.
```

---

# Best Practices & Common Pitfalls

Always close files to release OS file locks and prevent memory leaks. Better yet, use the 'with' statement.

---

# Practice Quiz

### 1. Which file mode opens a file for writing and appends new content to the end without truncating?
- A) 'w'
- B) 'r'
- C) 'a'
- D) 'x'
**Answer:** C
**Explanation:** 'a' (append) mode appends to the end of the file.

---

### 2. What happens if you open a non-existent file in 'r' mode?
- A) Python creates an empty file
- B) Raises FileNotFoundError
- C) Returns None
- D) Raises PermissionError
**Answer:** B
**Explanation:** Reading a non-existent file raises FileNotFoundError.


---

# Practice Challenge

Create a script that opens a file in 'a' mode and appends a timestamped log entry.
