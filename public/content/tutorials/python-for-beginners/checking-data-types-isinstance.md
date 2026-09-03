---
id: python-checking-data-types-isinstance
slug: checking-data-types-isinstance
course: python-for-beginners
chapter: 3
topic: 3.3
title: Checking Data Types (isinstance)
description: Using isinstance() for safe type checking and polymorphism compared to type() equality.
difficulty: Beginner
readingTime: 8
order: 13
keywords:
  - isinstance
  - type checking
  - inheritance
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Checking Data Types (isinstance)

The isinstance() function is the industry standard for type validation in Python.

---

# Key Concepts & Detailed Explanation

Why isinstance() is superior to type():
- type(x) == int checks exact type equality.
- isinstance(x, int) checks if x is an int OR an instance of any subclass of int (such as bool).
- isinstance() accepts a tuple of types: isinstance(x, (int, float)) checks if x is either numeric type.

---

# Code Examples & Output

```python
x = 42

# Checking with isinstance
if isinstance(x, int):
    print("x is an integer")

# Multiple allowed types
value = 18.5
if isinstance(value, (int, float)):
    print(f"{value} is a valid number")

# Note: bool is a subclass of int in Python!
print("isinstance(True, int):", isinstance(True, int)) # True
```

**Expected Output:**
```text
x is an integer
18.5 is a valid number
isinstance(True, int): True
```

---

# Best Practices & Common Pitfalls

Always use isinstance() when validating function inputs.

---

# Practice Quiz

### 1. What does isinstance(5, (int, float, str)) evaluate to?
- A) True
- B) False
- C) int
- D) TypeError
**Answer:** A
**Explanation:** isinstance checks if the object matches any type in the tuple.

---

### 2. Why is 'isinstance(x, int)' preferred over 'type(x) == int'?
- A) It supports inheritance and subclasses
- B) It is faster in loops
- C) It uses less memory
- D) It imports typing automatically
**Answer:** A
**Explanation:** isinstance() accounts for subclass hierarchies.


---

# Practice Challenge

Write a function 'sum_numbers(a, b)' that ensures both arguments are either int or float before adding.
