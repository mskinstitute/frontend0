---
id: python-arithmetic-operators
slug: arithmetic-operators
course: python-for-beginners
chapter: 6
topic: 6.1
title: Arithmetic Operators
description: Comprehensive review of all arithmetic operators: +, -, *, /, //, %, and **.
difficulty: Beginner
readingTime: 8
order: 23
keywords:
  - arithmetic
  - operators
  - math
  - modulus
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Arithmetic Operators

Arithmetic operators perform fundamental mathematical calculations on numerical operands.

---

# Key Concepts & Detailed Explanation

Arithmetic operators:
- Addition (+): Sum of operands. Also used for sequence concatenation.
- Subtraction (-): Difference of operands.
- Multiplication (*): Product. Also used for sequence repetition.
- Division (/): Floating point quotient.
- Floor Division (//): Integer quotient rounded down.
- Modulus (%): Division remainder.
- Exponentiation (**): Power.

---

# Code Examples & Output

```python
x = 25
y = 4

print(f"{x} + {y} = {x + y}")
print(f"{x} - {y} = {x - y}")
print(f"{x} * {y} = {x * y}")
print(f"{x} / {y} = {x / y}")
print(f"{x} // {y} = {x // y}")
print(f"{x} % {y} = {x % y}")
print(f"{x} ** {y} = {x ** y}")
```

**Expected Output:**
```text
25 + 4 = 29
25 - 4 = 21
25 * 4 = 100
25 / 4 = 6.25
25 // 4 = 6
25 % 4 = 1
25 ** 4 = 390625
```

---

# Best Practices & Common Pitfalls

Be mindful when using floor division with negative numbers: -7 // 2 yields -4 because it rounds towards negative infinity.

---

# Practice Quiz

### 1. What is the result of -7 // 2 in Python?
- A) -3
- B) -4
- C) -3.5
- D) 3
**Answer:** B
**Explanation:** Python floor division rounds down towards negative infinity, yielding -4.

---

### 2. What does 'Hi' * 3 produce in Python?
- A) TypeError
- B) 'HiHiHi'
- C) 'Hi 3'
- D) None
**Answer:** B
**Explanation:** The multiplication operator on a string repeats it.


---

# Practice Challenge

Write a program that calculates both the quotient and remainder of two numbers using // and %.
