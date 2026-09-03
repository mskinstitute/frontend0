---
id: python-assignment-operators
slug: assignment-operators
course: python-for-beginners
chapter: 6
topic: 6.2
title: Assignment Operators
description: Compound assignment operators (+=, -=, *=, /=, //=, %=, **=) and the walrus operator (:=).
difficulty: Beginner
readingTime: 8
order: 24
keywords:
  - assignment
  - compound operators
  - walrus operator
  - +=
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Assignment Operators

Assignment operators assign values to variables, with compound versions performing an operation and assignment together.

---

# Key Concepts & Detailed Explanation

Compound assignment shortcuts:
- x += 5 is equivalent to x = x + 5
- x -= 2 is equivalent to x = x - 2
- x *= 3 is equivalent to x = x * 3
- x /= 2 is equivalent to x = x / 2
The Walrus Operator (:=) introduced in Python 3.8 allows assignment expression inside conditional statements.

---

# Code Examples & Output

```python
count = 10
count += 5
print("Count after += 5:", count) # 15

count *= 2
print("Count after *= 2:", count) # 30

# Walrus operator (:=)
if (n := len("MSK Institute")) > 10:
    print(f"Long string with length {n}")
```

**Expected Output:**
```text
Count after += 5: 15
Count after *= 2: 30
Long string with length 13
```

---

# Best Practices & Common Pitfalls

Use compound assignment operators to make accumulator loops cleaner.

---

# Practice Quiz

### 1. What is 'x += 10' shorthand for?
- A) x = 10
- B) x = x + 10
- C) x + 10 = x
- D) x == 10
**Answer:** B
**Explanation:** x += 10 adds 10 to the current value of x and reassigns it.

---

### 2. What is the walrus operator symbol in Python?
- A) =>
- B) :=
- C) ->
- D) ~=
**Answer:** B
**Explanation:** := is the assignment expression (walrus) operator.


---

# Practice Challenge

Initialize a balance of ₹10,000 and simulate 3 deposits and 2 withdrawals using compound assignment operators.
