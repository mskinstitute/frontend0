---
id: python-bitwise-operators
slug: bitwise-operators
course: python-for-beginners
chapter: 6
topic: 6.6
title: Bitwise Operators
description: Binary logic operations (&, |, ^, ~, <<, >>) on integers.
difficulty: Beginner
readingTime: 8
order: 28
keywords:
  - bitwise
  - binary
  - and
  - or
  - xor
  - shift
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Bitwise Operators

Bitwise operators perform calculations directly on the individual binary bits of integers.

---

# Key Concepts & Detailed Explanation

Bitwise Operators:
- & (AND): Bit is 1 if both bits are 1.
- | (OR): Bit is 1 if either bit is 1.
- ^ (XOR): Bit is 1 if bits are different.
- ~ (NOT): Inverts all bits (formula: ~x = -x - 1).
- << (Left shift): Shifts bits left, multiplying by 2 per shift.
- >> (Right shift): Shifts bits right, dividing by 2 per shift.

---

# Code Examples & Output

```python
a = 6  # 0b0110
b = 3  # 0b0011

print("a & b:", a & b)   # 0b0010 = 2
print("a | b:", a | b)   # 0b0111 = 7
print("a ^ b:", a ^ b)   # 0b0101 = 5
print("~a:", ~a)         # -7
print("a << 1:", a << 1) # 12 (multiplied by 2)
print("a >> 1:", a >> 1) # 3 (divided by 2)
```

**Expected Output:**
```text
a & b: 2
a | b: 7
a ^ b: 5
~a: -7
a << 1: 12
a >> 1: 3
```

---

# Best Practices & Common Pitfalls

Use 'bin(number)' to see the binary string representation of any integer.

---

# Practice Quiz

### 1. What is the result of 4 << 1 in Python?
- A) 2
- B) 8
- C) 16
- D) 4
**Answer:** B
**Explanation:** Left shift by 1 bit multiplies the integer by 2, giving 8.

---

### 2. Which bitwise operator yields 1 only when bits differ?
- A) AND (&)
- B) OR (|)
- C) XOR (^)
- D) NOT (~)
**Answer:** C
**Explanation:** XOR (^) returns 1 when exactly one bit is 1.


---

# Practice Challenge

Use bitwise AND (&) to test whether an integer is even or odd (hint: num & 1).
