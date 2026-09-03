---
id: python-slicing-indexing
slug: slicing-indexing
course: python-for-beginners
chapter: 5
topic: 5.2
title: Slicing & Indexing
description: Zero-based indexing, negative indexing, and slicing with [start:stop:step].
difficulty: Beginner
readingTime: 9
order: 18
keywords:
  - indexing
  - slicing
  - negative indexing
  - reverse string
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Slicing & Indexing

Python's indexing and slicing provide unmatched convenience for extracting substrings.

---

# Key Concepts & Detailed Explanation

Indexing:
- Forward indexing begins at 0.
- Negative indexing begins at -1 (the last character).
Slicing syntax: [start:stop:step]
- start: inclusive start index (defaults to 0).
- stop: exclusive stop index (defaults to end of string).
- step: stride (defaults to 1; -1 traverses backwards).

---

# Code Examples & Output

```python
tech = "MSK Institute"

print("First char [0]:", tech[0])      # 'M'
print("Last char [-1]:", tech[-1])     # 'e'
print("Slice [0:3]:", tech[0:3])       # 'MSK'
print("Step slice [::2]:", tech[::2])  # Every second char
print("Reversed [::-1]:", tech[::-1])  # 'etutitsnI KSM'
```

**Expected Output:**
```text
First char [0]: M
Last char [-1]: e
Slice [0:3]: MSK
Step slice [::2]: MKIttt
Reversed [::-1]: etutitsnI KSM
```

---

# Best Practices & Common Pitfalls

Remember that 'stop' is exclusive: text[1:4] extracts characters at indices 1, 2, and 3.

---

# Practice Quiz

### 1. What does 'Python'[1:4] return?
- A) 'Pyt'
- B) 'yth'
- C) 'ytho'
- D) 'thon'
**Answer:** B
**Explanation:** Indices 1, 2, 3 give 'yth'.

---

### 2. What is the most concise way to reverse a string 's' in Python?
- A) s.reverse()
- B) s[::-1]
- C) reverse(s)
- D) s[-1:0]
**Answer:** B
**Explanation:** s[::-1] reverses the string using slice step -1.


---

# Practice Challenge

Extract the domain name from an email address 'student@mskinstitute.in' using slicing.
