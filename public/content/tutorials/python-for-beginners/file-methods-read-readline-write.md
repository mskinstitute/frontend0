---
id: python-file-methods-read-readline-write
slug: file-methods-read-readline-write
course: python-for-beginners
chapter: 15
topic: 15.4
title: File Methods (read, readline, write)
description: Differences between .read(), .readline(), .readlines(), .seek(), and .tell().
difficulty: Beginner
readingTime: 9
order: 81
keywords:
  - read()
  - readline()
  - readlines()
  - seek()
  - tell()
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# File Methods (read, readline, write)

Understand position pointers and reading granularity with file methods.

---

# Key Concepts & Detailed Explanation

File navigation methods:
- .read(size): Reads entire file (or up to 'size' bytes).
- .readline(): Reads a single line ending in \n.
- .readlines(): Reads all lines and returns them as a list of strings.
- .tell(): Returns current byte position of the file pointer.
- .seek(offset, whence): Moves file pointer to specified byte offset.

---

# Code Examples & Output

```python
# Demonstrate seek and tell
with open("cursor_demo.txt", "w+") as f:
    f.write("0123456789ABCDEF")
    
    print("Pointer at end:", f.tell()) # 16
    f.seek(0) # Reset to beginning
    print("Read first 5 chars:", f.read(5)) # "01234"
    print("Pointer now:", f.tell()) # 5
    
    f.seek(10)
    print("Read from position 10:", f.read()) # "ABCDEF"
```

**Expected Output:**
```text
Pointer at end: 16
Read first 5 chars: 01234
Pointer now: 5
Read from position 10: ABCDEF
```

---

# Best Practices & Common Pitfalls

Use 'f.seek(0)' to rewind a file back to the beginning after reading it once.

---

# Practice Quiz

### 1. What method rewinds the file read pointer back to the start of the file?
- A) f.rewind()
- B) f.seek(0)
- C) f.reset()
- D) f.start()
**Answer:** B
**Explanation:** f.seek(0) resets the file pointer to byte 0.

---

### 2. What does f.tell() return?
- A) Line number
- B) Current byte offset position in the file
- C) File size
- D) Character count
**Answer:** B
**Explanation:** f.tell() returns the current integer position in bytes.


---

# Practice Challenge

Write a program that writes 5 lines of text to a file, rewinds with seek(0), and prints only the 3rd line using readline().
