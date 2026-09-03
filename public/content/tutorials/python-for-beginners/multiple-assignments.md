---
id: python-multiple-assignments
slug: multiple-assignments
course: python-for-beginners
chapter: 2
topic: 2.4
title: Multiple Assignments
description: Simultaneous assignments, assigning identical values, and variable swapping in a single line.
difficulty: Beginner
readingTime: 8
order: 9
keywords:
  - multiple assignment
  - unpacking
  - swapping
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Multiple Assignments

Python's multiple assignment syntax reduces boilerplate and eliminates temporary variables.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Multiple variables to different values
x, y, z = 10, 20, 30
print(f"x={x}, y={y}, z={z}")

# Same value to multiple variables
a = b = c = 0
print(f"a={a}, b={b}, c={c}")

# Classic Python variable swap
x, y = y, x
print(f"Swapped: x={x}, y={y}")
```

**Expected Output:**
```text
x=10, y=20, z=30
a=0, b=0, c=0
Swapped: x=20, y=10
```

---

# Best Practices & Common Pitfalls

Ensure the number of variables on the left matches the number of values on the right, or Python raises ValueError.

---

# Practice Quiz

### 1. What happens if you run 'a, b = 1, 2, 3'?
- A) a=1, b=2
- B) ValueError: too many values to unpack
- C) a=1, b=3
- D) SyntaxError
**Answer:** B
**Explanation:** Mismatched counts trigger a ValueError.

---

### 2. How does Python swap 'x, y = y, x' safely?
- A) It uses a hidden temporary variable
- B) The right hand side evaluates as a tuple in memory before assignment
- C) Hardware magic
- D) Only works for integers
**Answer:** B
**Explanation:** The right side is packed into a tuple before being unpacked to the left.


---

# Practice Challenge

Assign three test scores in one line, swap the highest and lowest, and print the result.
