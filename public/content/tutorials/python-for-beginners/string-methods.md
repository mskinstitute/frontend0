---
id: python-string-methods
slug: string-methods
course: python-for-beginners
chapter: 5
topic: 5.6
title: String Methods
description: Inspection methods: split(), join(), find(), count(), startswith(), and endswith().
difficulty: Beginner
readingTime: 9
order: 22
keywords:
  - split()
  - join()
  - find()
  - count()
  - string methods
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# String Methods

String methods empower search, tokenization, validation, and manipulation of text.

---

# Key Concepts & Detailed Explanation

Essential methods:
- .split(delim): Splits string by delimiter into a list of words.
- delim.join(list): Joins list elements into a single delimited string.
- .find(sub): Returns index of first occurrence (-1 if not found).
- .count(sub): Returns occurrence count of substring.
- .startswith(prefix) / .endswith(suffix): Returns boolean.
- .isalpha() / .isdigit() / .isalnum(): Checks character composition.

---

# Code Examples & Output

```python
sentence = "Python,JavaScript,TypeScript,Go"

# Splitting into a list
languages = sentence.split(",")
print("Languages list:", languages)

# Joining back with a different delimiter
pipe_separated = " | ".join(languages)
print("Joined:", pipe_separated)

# Validation methods
code = "MSK2026"
print("Is alphanumeric:", code.isalnum()) # True
print("Starts with MSK:", code.startswith("MSK")) # True
```

**Expected Output:**
```text
Languages list: ['Python', 'JavaScript', 'TypeScript', 'Go']
Joined: Python | JavaScript | TypeScript | Go
Is alphanumeric: True
Starts with MSK: True
```

---

# Best Practices & Common Pitfalls

Use 'in' operator for simple existence checks ('Python' in sentence); use .find() only when you need the index.

---

# Practice Quiz

### 1. What does 'text.find("xyz")' return if "xyz" is not present in 'text'?
- A) None
- B) False
- C) -1
- D) ValueError
**Answer:** C
**Explanation:** find() returns -1 when the substring is not found.

---

### 2. Which method checks if a string consists entirely of digits?
- A) isnumber()
- B) isnumeric() / isdigit()
- C) check_digit()
- D) has_digits()
**Answer:** B
**Explanation:** isdigit() / isnumeric() verifies digit-only strings.


---

# Practice Challenge

Write a program that takes a comma-separated list of student names, strips whitespace from each, and joins them with ' & '.
