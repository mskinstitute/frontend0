---
id: python-reading-writing-files
slug: reading-writing-files
course: python-for-beginners
chapter: 15
topic: 15.2
title: Reading & Writing Files
description: Writing text with .write() and .writelines(), and overwriting vs appending.
difficulty: Beginner
readingTime: 8
order: 79
keywords:
  - write()
  - writelines()
  - reading files
  - append
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Reading & Writing Files

Write lines of text cleanly and inspect file content dynamically.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
lines_to_write = [
    "Chapter 1: Python Basics\n",
    "Chapter 2: Data Structures\n",
    "Chapter 3: File Handling\n"
]

# Writing multiple lines
with open("chapters.txt", "w") as f:
    f.writelines(lines_to_write)

# Reading back line by line
with open("chapters.txt", "r") as f:
    for line in f:
        print("->", line.strip())
```

**Expected Output:**
```text
-> Chapter 1: Python Basics
-> Chapter 2: Data Structures
-> Chapter 3: File Handling
```

---

# Best Practices & Common Pitfalls

Iterating directly over a file object ('for line in f:') reads memory-efficiently line by line without loading the whole file into RAM.

---

# Practice Quiz

### 1. Does f.writelines() automatically append newline characters (\n) to each list item?
- A) Yes
- B) No, you must include '\n' in each string explicitly
- C) Only in Python 3
- D) Only with strip()
**Answer:** B
**Explanation:** writelines() does not append newlines automatically.

---

### 2. Why is 'for line in file:' better than 'file.read().splitlines()' for large files?
- A) It reads line by line lazily, avoiding high memory consumption
- B) It automatically translates uppercase
- C) It creates threads
- D) It is faster on disk
**Answer:** A
**Explanation:** Streaming line by line prevents out-of-memory errors on massive files.


---

# Practice Challenge

Write a program that prompts user for their favorite 3 hobbies and writes each to 'hobbies.txt'.
