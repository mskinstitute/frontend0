---
id: python-implicit-casting
slug: implicit-casting
course: python-for-beginners
chapter: 7
topic: 7.1
title: Implicit Casting
description: Automatic type coercion performed by Python without data loss (e.g. int + float -> float).
difficulty: Beginner
readingTime: 7
order: 29
keywords:
  - implicit casting
  - type coercion
  - automatic conversion
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Implicit Casting

Implicit casting occurs when Python automatically converts one data type to another without programmer intervention.

---

# Key Concepts & Detailed Explanation

To avoid loss of precision, Python always promotes lower data types (like integer) to higher data types (like float) when operating together.
Example: Adding an integer (5) to a float (2.5) implicitly converts 5 to 5.0 and returns 7.5.

---

# Code Examples & Output

```python
integer_val = 15
float_val = 4.5

# Python automatically coerces integer to float
result = integer_val + float_val
print("Result:", result)
print("Type of result:", type(result))
```

**Expected Output:**
```text
Result: 19.5
Type of result: <class 'float'>
```

---

# Best Practices & Common Pitfalls

Python never implicitly converts strings to numbers. '5' + 5 will raise a TypeError.

---

# Practice Quiz

### 1. What is the data type resulting from '10 + 2.0'?
- A) int
- B) float
- C) complex
- D) str
**Answer:** B
**Explanation:** Implicit conversion promotes the result to float.

---

### 2. Does Python implicitly convert '100' + 20?
- A) Yes, to 120
- B) Yes, to '10020'
- C) No, raises TypeError
- D) Promotes to float
**Answer:** C
**Explanation:** Python refuses to implicitly convert between strings and numbers.


---

# Practice Challenge

Demonstrate implicit conversion by dividing two integers and checking the type of the result.
