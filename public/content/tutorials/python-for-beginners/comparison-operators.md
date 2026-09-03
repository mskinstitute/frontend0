---
id: python-comparison-operators
slug: comparison-operators
course: python-for-beginners
chapter: 6
topic: 6.3
title: Comparison Operators
description: Relational operators (==, !=, <, >, <=, >=) and chained comparisons.
difficulty: Beginner
readingTime: 8
order: 25
keywords:
  - comparison
  - relational
  - equality
  - chained comparisons
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Comparison Operators

Comparison operators evaluate relationships between values and return a boolean (True or False).

---

# Key Concepts & Detailed Explanation

Comparison Operators:
- == (Equal to)
- != (Not equal to)
- > (Greater than)
- < (Less than)
- >= (Greater than or equal to)
- <= (Less than or equal to)
Python supports chained comparisons: 18 <= age < 65 checks both conditions cleanly.

---

# Code Examples & Output

```python
a = 15
b = 20

print("a == b:", a == b) # False
print("a != b:", a != b) # True
print("a < b:", a < b)   # True

# Chained comparisons
score = 85
if 70 <= score <= 100:
    print("Score is in the distinction range!")
```

**Expected Output:**
```text
a == b: False
a != b: True
a < b: True
Score is in the distinction range!
```

---

# Best Practices & Common Pitfalls

Never confuse the assignment operator '=' with the equality comparison operator '=='.

---

# Practice Quiz

### 1. Which operator tests if two values are NOT equal?
- A) <>
- B) !=
- C) !==
- D) not ==
**Answer:** B
**Explanation:** != is the not-equal-to operator.

---

### 2. Is the chained expression '1 < 5 < 10' valid in Python?
- A) No, raises SyntaxError
- B) Yes, it evaluates to True
- C) Only in functions
- D) Returns 10
**Answer:** B
**Explanation:** Python natively supports mathematical chained comparisons.


---

# Practice Challenge

Write a program that prompts for an age and checks if the person is eligible for a senior citizen concession (age >= 60).
