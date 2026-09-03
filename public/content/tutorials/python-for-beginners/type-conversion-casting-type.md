---
id: python-type-conversion-casting-type
slug: type-conversion-casting-type
course: python-for-beginners
chapter: 3
topic: 3.2
title: Type Conversion (Casting & type())
description: Inspecting types with type() and performing explicit conversions between int, float, str, and bool.
difficulty: Beginner
readingTime: 8
order: 12
keywords:
  - casting
  - type conversion
  - truthy
  - falsy
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Type Conversion (Casting & type())

Type conversion transforms data from one data type into another.

---

# Key Concepts & Detailed Explanation

Common conversions:
- int(x): Converts x to integer (truncates floats towards zero).
- float(x): Converts x to floating point.
- str(x): Converts any object into its string representation.
- bool(x): Evaluates truthiness. 0, empty strings, empty lists, and None evaluate to False (falsy); all others are True (truthy).

---

# Code Examples & Output

```python
# Explicit type casting
raw_input = "250"
total = int(raw_input) + 50
print("Total:", total)

pi_float = 3.99
print("Truncated:", int(pi_float)) # 3

# Truthy and Falsy tests
print("bool(0):", bool(0))          # False
print("bool('hello'):", bool("hello")) # True
print("bool([]):", bool([]))        # False
```

**Expected Output:**
```text
Total: 300
Truncated: 3
bool(0): False
bool('hello'): True
bool([]): False
```

---

# Best Practices & Common Pitfalls

Be careful when casting user input with int(). If the string contains non-digits, it raises ValueError.

---

# Practice Quiz

### 1. What does int('45.5') return?
- A) 45
- B) 45.5
- C) ValueError
- D) 46
**Answer:** C
**Explanation:** int() cannot directly parse float strings. Use int(float('45.5')).

---

### 2. Which value is considered truthy in Python?
- A) 0
- B) []
- C) "False"
- D) None
**Answer:** C
**Explanation:** A non-empty string like 'False' is truthy.


---

# Practice Challenge

Write a program that takes two numerical strings, casts them to floats, and prints their product.
