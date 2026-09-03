---
id: python-project-multiplication-table-generator
slug: project-multiplication-table-generator
course: python-for-beginners
chapter: 13
topic: 13.9
title: Project: Multiplication Table Generator
description: Build a dynamic, formatted multiplication table generator for any number up to custom range.
difficulty: Beginner
readingTime: 10
order: 69
keywords:
  - project
  - multiplication table
  - loops project
  - cli math
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Project: Multiplication Table Generator

Combine loops, string formatting, and validation to build a dynamic Multiplication Table CLI tool.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
def generate_table(number, limit=10):
    """Generates a formatted multiplication table."""
    print(f"\n{'='*25}")
    print(f"  Table for {number} (1 to {limit})")
    print(f"{'='*25}")
    
    for i in range(1, limit + 1):
        product = number * i
        print(f"  {number:2d} x {i:2d} = {product:4d}")
    print(f"{'='*25}\n")

# Generate table for 7
generate_table(7, limit=10)
```

**Expected Output:**
```text
=========================
  Table for 7 (1 to 10)
=========================
   7 x  1 =    7
   7 x  2 =   14
   7 x  3 =   21
   7 x  4 =   28
   7 x  5 =   35
   7 x  6 =   42
   7 x  7 =   49
   7 x  8 =   56
   7 x  9 =   63
   7 x 10 =   70
=========================
```

---

# Best Practices & Common Pitfalls

Use format specifiers like ':2d' to guarantee clean columnar alignment.

---

# Practice Quiz

### 1. Which range expression loops from 1 to 10 inclusive?
- A) range(1, 10)
- B) range(1, 11)
- C) range(0, 10)
- D) range(10)
**Answer:** B
**Explanation:** range(1, 11) stops at 10.

---

### 2. How can you specify a default parameter value in Python functions?
- A) def func(x = 10):
- B) def func(x := 10):
- C) def func(default x: 10):
- D) x = 10; def func(x):
**Answer:** A
**Explanation:** 'def func(x=10):' assigns a default value to parameter x.


---

# Practice Challenge

Extend the project to print multiple tables side by side (e.g. tables for 2, 3, 4, 5).
