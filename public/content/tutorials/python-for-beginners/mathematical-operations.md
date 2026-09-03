---
id: python-mathematical-operations
slug: mathematical-operations
course: python-for-beginners
chapter: 4
topic: 4.2
title: Mathematical Operations
description: Arithmetic operators, operator precedence (PEMDAS), and integer vs float division.
difficulty: Beginner
readingTime: 8
order: 15
keywords:
  - arithmetic
  - division
  - floor division
  - modulus
  - pemdas
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Mathematical Operations

Python supports standard mathematical operators with intuitive division and precedence rules.

---

# Key Concepts & Detailed Explanation

Arithmetic Operators:
- + (Addition), - (Subtraction), * (Multiplication)
- / (True division, always returns float, e.g. 4 / 2 = 2.0)
- // (Floor division, rounds down to integer, e.g. 7 // 2 = 3)
- % (Modulus, remainder after division, e.g. 7 % 2 = 1)
- ** (Exponentiation, e.g. 2 ** 3 = 8)
Precedence follows PEMDAS: Parentheses -> Exponents -> Multiplication/Division -> Addition/Subtraction.

---

# Code Examples & Output

```python
a, b = 20, 6

print("True Division (/):", a / b)   # 3.3333333333333335
print("Floor Division (//):", a // b) # 3
print("Modulus (%):", a % b)          # 2
print("Exponent (**):", 3 ** 3)       # 27

# Operator precedence
result = 10 + 2 * 3 ** 2
print("10 + 2 * 3^2 =", result) # 10 + 2 * 9 = 28
```

**Expected Output:**
```text
True Division (/): 3.3333333333333335
Floor Division (//): 3
Modulus (%): 2
Exponent (**): 27
10 + 2 * 3^2 = 28
```

---

# Best Practices & Common Pitfalls

Always use parentheses () to make operator precedence explicit and readable.

---

# Practice Quiz

### 1. What is the return type of 10 / 2 in Python?
- A) int
- B) float
- C) double
- D) number
**Answer:** B
**Explanation:** True division (/) always returns a float in Python 3.

---

### 2. What is the result of 17 % 5?
- A) 3
- B) 2
- C) 3.4
- D) 1
**Answer:** B
**Explanation:** 17 divided by 5 is 3 with a remainder of 2.


---

# Practice Challenge

Calculate compound interest for ₹50,000 at 8% annual interest over 5 years using the formula A = P * (1 + r/n)**(n*t).
