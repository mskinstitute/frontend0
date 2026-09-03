---
id: python-nested-loops
slug: nested-loops
course: python-for-beginners
chapter: 13
topic: 13.3
title: Nested Loops
description: Loops inside loops, coordinate grids, and pattern printing.
difficulty: Beginner
readingTime: 9
order: 63
keywords:
  - nested loops
  - patterns
  - grid
  - matrix iteration
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Loops

A nested loop is a loop inside the body of another loop, commonly used for multidimensional data and patterns.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Printing a star pattern
rows = 4
for i in range(1, rows + 1):
    for j in range(i):
        print("*", end=" ")
    print()

# Coordinates
for x in range(2):
    for y in range(2):
        print(f"Point: ({x}, {y})")
```

**Expected Output:**
```text
* 
* * 
* * * 
* * * * 
Point: (0, 0)
Point: (0, 1)
Point: (1, 0)
Point: (1, 1)
```

---

# Best Practices & Common Pitfalls

Be cautious of loop complexity: nested loops have O(n²) time complexity. Avoid deep nesting on large datasets.

---

# Practice Quiz

### 1. How many total iterations execute in: for i in range(3): for j in range(4): pass?
- A) 7
- B) 12
- C) 4
- D) 3
**Answer:** B
**Explanation:** 3 outer iterations * 4 inner iterations = 12 total iterations.

---

### 2. What happens when 'break' is called inside an inner nested loop?
- A) Breaks both inner and outer loops
- B) Breaks only the innermost loop
- C) Stops the program
- D) Skips to outer loop else
**Answer:** B
**Explanation:** break only exits the innermost loop enclosing it.


---

# Practice Challenge

Print a 5x5 multiplication table using nested for loops.
