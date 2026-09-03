---
id: python-common-pitfalls
slug: common-pitfalls
course: python-for-beginners
chapter: 7
topic: 7.3
title: Common Pitfalls
description: ValueError with invalid string formats, float precision loss, and boolean conversions.
difficulty: Beginner
readingTime: 8
order: 31
keywords:
  - pitfalls
  - valueerror
  - precision
  - truthiness pitfalls
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Common Pitfalls

Understanding common type-casting pitfalls prevents subtle bugs and runtime crashes.

---

# Key Concepts & Detailed Explanation

Top 3 Casting Pitfalls in Python:
1. **ValueError on int(float_string):** `int("3.14")` crashes! You must do `int(float("3.14"))`.
2. **The bool("False") Trap:** Any non-empty string in Python evaluates to True! Therefore `bool("False")` is `True`.
3. **Float Arithmetic Precision:** Floating-point numbers cannot represent some base-10 fractions exactly: `0.1 + 0.2 != 0.3` (it equals 0.30000000000000004).

---

# Code Examples & Output

```python
# Trap 1: Non-integer string to int
try:
    bad_int = int("45.8")
except ValueError as e:
    print("Caught expected ValueError:", e)

# Correct way
good_int = int(float("45.8"))
print("Proper conversion:", good_int)

# Trap 2: bool("False") is True!
print("bool('False'):", bool("False")) # True!
print("bool(''):", bool(""))           # False (empty is falsy)
```

**Expected Output:**
```text
Caught expected ValueError: invalid literal for int() with base 10: '45.8'
Proper conversion: 45
bool('False'): True
bool(''): False
```

---

# Best Practices & Common Pitfalls

To safely parse a boolean from text, check if text.strip().lower() in ('true', '1', 'yes').

---

# Practice Quiz

### 1. What is the output of bool('False') in Python?
- A) False
- B) True
- C) ValueError
- D) None
**Answer:** B
**Explanation:** Any non-empty string is truthy, so bool('False') evaluates to True.

---

### 2. Why does int('12.34') raise a ValueError?
- A) Python doesn't support decimals
- B) The int() function expects pure digit characters when parsing strings
- C) String is too long
- D) Only floats exist in Python 3
**Answer:** B
**Explanation:** int() expects an integer literal when converting from string.


---

# Practice Challenge

Write a safe parsing function 'safe_to_int(val, default=0)' that returns the default if conversion fails.
