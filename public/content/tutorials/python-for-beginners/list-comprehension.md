---
id: python-list-comprehension
slug: list-comprehension
course: python-for-beginners
chapter: 13
topic: 13.7
title: List Comprehension
description: Concise, readable, high-performance syntax for constructing lists: [expr for item in iterable if condition].
difficulty: Beginner
readingTime: 9
order: 67
keywords:
  - list comprehension
  - comprehension
  - pythonic
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# List Comprehension

List comprehensions provide a clean, one-line syntax to transform and filter iterables.

---

# Key Concepts & Detailed Explanation

Syntax: `[expression for item in iterable if condition]`
Benefits:
1. Replaces 4-5 lines of for-loop with append() into a single readable expression.
2. Implemented in optimized C under the hood, making comprehensions noticeably faster than standard append loops.

---

# Code Examples & Output

```python
# Traditional loop vs List Comprehension
# Get squares of even numbers from 1 to 10
squares = [n ** 2 for n in range(1, 11) if n % 2 == 0]
print("Even squares:", squares)

# String transformation
names = ["sumit", "amit", "rohit"]
capitalized = [name.capitalize() for name in names]
print("Capitalized:", capitalized)
```

**Expected Output:**
```text
Even squares: [4, 16, 36, 64, 100]
Capitalized: ['Sumit', 'Amit', 'Rohit']
```

---

# Best Practices & Common Pitfalls

If a comprehension spans more than 2 lines or has complex nested loops, revert to a standard for loop for clarity.

---

# Practice Quiz

### 1. What is the result of '[x * 2 for x in [1, 2, 3]]'?
- A) [2, 4, 6]
- B) [1, 2, 3, 1, 2, 3]
- C) [2, 2, 2]
- D) [6]
**Answer:** A
**Explanation:** Each element is multiplied by 2, returning [2, 4, 6].

---

### 2. Can a list comprehension include an 'if' filtering clause?
- A) Yes, at the end: [x for x in seq if cond]
- B) No, only mapping is allowed
- C) Only with lambda
- D) Only in Python 2
**Answer:** A
**Explanation:** List comprehensions support optional trailing 'if' filters.


---

# Practice Challenge

Create a list comprehension that extracts all words containing the letter 'e' from a sentence.
