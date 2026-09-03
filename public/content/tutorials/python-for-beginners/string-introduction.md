---
id: python-string-introduction
slug: string-introduction
course: python-for-beginners
chapter: 5
topic: 5.1
title: String Introduction
description: String creation, single/double/triple quotes, string immutability, and length checking.
difficulty: Beginner
readingTime: 8
order: 17
keywords:
  - strings
  - immutability
  - len()
  - quotes
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# String Introduction

Strings are ordered, immutable sequences of characters used to store textual information.

---

# Key Concepts & Detailed Explanation

In Python:
1. Strings can be defined using single ('...'), double ("..."), or triple ('''...''' or """...""") quotes.
2. Triple-quoted strings preserve literal newlines.
3. Strings are immutable: once created, individual characters cannot be changed in place.

---

# Code Examples & Output

```python
single = 'Hello'
double = "World"
multi = """This is a
multiline string
in Python."""

combined = single + " " + double
print("Combined:", combined)
print("Length:", len(combined))
```

**Expected Output:**
```text
Combined: Hello World
Length: 11
```

---

# Best Practices & Common Pitfalls

Use double quotes if your string contains an apostrophe: "Don't worry".

---

# Practice Quiz

### 1. Can you modify a character in an existing string using 's[0] = "X"'?
- A) Yes
- B) No, strings are immutable
- C) Only in Python 2
- D) Only with mutable flag
**Answer:** B
**Explanation:** Strings are immutable; mutating an index raises TypeError.

---

### 2. Which function returns the total character count of a string?
- A) size()
- B) count()
- C) len()
- D) length()
**Answer:** C
**Explanation:** len() returns the length of a string.


---

# Practice Challenge

Create a multiline string containing a welcome message for MSK Institute and print its total length.
