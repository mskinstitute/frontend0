---
id: python-ternary-operators
slug: ternary-operators
course: python-for-beginners
chapter: 12
topic: 12.4
title: Ternary Operators
description: Conditional expressions (value_if_true if condition else value_if_false) in Python.
difficulty: Beginner
readingTime: 8
order: 59
keywords:
  - ternary
  - conditional expression
  - inline conditional
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Ternary Operators

Python's ternary operator provides a clean one-line expression to assign values based on a condition.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
age = 19

# Syntax: [on_true] if [condition] else [on_false]
status = "Adult" if age >= 18 else "Minor"
print("Status:", status)

# Direct embedding inside f-string
number = 7
print(f"The number {number} is {'Even' if number % 2 == 0 else 'Odd'}.")
```

**Expected Output:**
```text
Status: Adult
The number 7 is Odd.
```

---

# Best Practices & Common Pitfalls

Ternary operators are ideal for simple value assignments. Avoid nesting ternary expressions as they become hard to read.

---

# Practice Quiz

### 1. What is the correct syntax for the ternary operator in Python?
- A) condition ? a : b
- B) a if condition else b
- C) if condition then a else b
- D) choose(condition, a, b)
**Answer:** B
**Explanation:** Python uses 'a if condition else b'.

---

### 2. What does 'x = 10 if True else 20' assign to x?
- A) 20
- B) 10
- C) True
- D) None
**Answer:** B
**Explanation:** Because condition is True, it returns 10.


---

# Practice Challenge

Use a ternary expression to calculate delivery fee: ₹0 if cart_total >= ₹500 else ₹50.
