---
id: python-integer-float-complex
slug: integer-float-complex
course: python-for-beginners
chapter: 4
topic: 4.1
title: Integer, Float, Complex
description: Arbitrary precision integers, IEEE 754 floats, and complex numbers (a + bj) in Python.
difficulty: Beginner
readingTime: 8
order: 14
keywords:
  - numbers
  - int
  - float
  - complex
  - precision
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Integer, Float, Complex

Python natively provides rich numerical representations for discrete, fractional, and imaginary numbers.

---

# Key Concepts & Detailed Explanation

Key points on Python numeric types:
1. **int:** Unbounded precision. Python automatically allocates memory as digits grow.
2. **float:** IEEE 754 double precision. Supports scientific notation (e.g. 1.2e6).
3. **complex:** Numbers with real and imaginary parts using 'j' (e.g. 3 + 4j).

---

# Code Examples & Output

```python
# Integers of any size
huge = 2 ** 100
print("2^100 =", huge)

# Floats and scientific notation
mass_electron = 9.109e-31
print("Mass:", mass_electron)

# Complex numbers
c = 4 + 7j
print("Real:", c.real, "| Imaginary:", c.imag, "| Conjugate:", c.conjugate())
```

**Expected Output:**
```text
2^100 = 1267650600228229401496703205376
Mass: 9.109e-31
Real: 4.0 | Imaginary: 7.0 | Conjugate: (4-7j)
```

---

# Best Practices & Common Pitfalls

To work with exact decimal precision for financial apps, use the built-in 'decimal' module.

---

# Practice Quiz

### 1. Which letter designates the imaginary part in Python complex numbers?
- A) i
- B) j
- C) z
- D) img
**Answer:** B
**Explanation:** Python uses 'j' or 'J' for imaginary components.

---

### 2. What happens when an integer in Python exceeds 64 bits?
- A) It causes an overflow error
- B) Python seamlessly allocates more memory for arbitrary precision
- C) It wraps around to negative
- D) It becomes a float
**Answer:** B
**Explanation:** Python integers automatically scale to arbitrary precision.


---

# Practice Challenge

Create two complex numbers, add them, and print their real and imaginary components.
