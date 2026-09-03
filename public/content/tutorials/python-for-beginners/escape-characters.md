---
id: python-escape-characters
slug: escape-characters
course: python-for-beginners
chapter: 5
topic: 5.5
title: Escape Characters
description: Backslash escape sequences (\n, \t, \\, \", \') and raw strings (r'...') in Python.
difficulty: Beginner
readingTime: 7
order: 21
keywords:
  - escape characters
  - raw strings
  - backslash
  - newlines
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Escape Characters

Escape characters allow inserting non-printable or reserved characters into strings.

---

# Key Concepts & Detailed Explanation

Common escape sequences:
- \n: Line feed / newline
- \t: Horizontal tab
- \\: Literal backslash
- \': Single quote
- \": Double quote
Raw strings (prefixed with 'r') suppress escape processing, making them ideal for Windows file paths and regex patterns.

---

# Code Examples & Output

```python
# Escape sequences
print("Line 1\nLine 2\nLine 3")
print("Name:\tSumit\tRole:\tMentor")
print("She said, \"Python is wonderful!\"")

# Raw strings for file paths
raw_path = r"C:\Users\MSK\new_project"
print("Raw path:", raw_path)
```

**Expected Output:**
```text
Line 1
Line 2
Line 3
Name:	Sumit	Role:	Mentor
She said, "Python is wonderful!"
Raw path: C:\Users\MSK\new_project
```

---

# Best Practices & Common Pitfalls

Always prefix file paths and regular expressions with 'r' to prevent unwanted \n or \t escapes.

---

# Practice Quiz

### 1. Which character initiates an escape sequence in Python?
- A) /
- B) \
- C) %
- D) $
**Answer:** B
**Explanation:** The backslash (\) initiates an escape sequence.

---

### 2. What does the 'r' prefix indicate before a string literal (e.g. r'C:\new')?
- A) Regular string
- B) Raw string
- C) Read-only string
- D) Resource string
**Answer:** B
**Explanation:** 'r' designates a raw string.


---

# Practice Challenge

Print a directory path containing backslashes and a quote without causing syntax errors using a raw string.
