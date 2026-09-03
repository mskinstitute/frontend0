---
id: python-nested-lists
slug: nested-lists
course: python-for-beginners
chapter: 8
topic: 8.6
title: Nested Lists
description: 2D matrices, multidimensional arrays, nested indexing, and nested iteration.
difficulty: Beginner
readingTime: 9
order: 37
keywords:
  - nested lists
  - 2d list
  - matrix
  - nested iteration
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Lists

Nested lists are lists containing other lists as elements, perfect for representing 2D tables, grids, and matrices.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# 3x3 Tic-Tac-Toe / Coordinate grid
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Accessing nested elements: matrix[row][column]
print("Row 0, Col 0:", matrix[0][0])  # 1
print("Center element:", matrix[1][1]) # 5

# Iterating over nested list
print("Grid rows:")
for row in matrix:
    for val in row:
        print(val, end=" ")
    print()
```

**Expected Output:**
```text
Row 0, Col 0: 1
Center element: 5
Grid rows:
1 2 3 
4 5 6 
7 8 9 
```

---

# Best Practices & Common Pitfalls

Beware of shallow copying nested lists. Use 'copy.deepcopy()' if inner lists need to be independent.

---

# Practice Quiz

### 1. How do you access the value 5 in 'm = [[1, 2], [4, 5]]'?
- A) m[1, 1]
- B) m[1][1]
- C) m(1)(1)
- D) m[5]
**Answer:** B
**Explanation:** Two sets of brackets are used: m[row][column].

---

### 2. Why does '[[0]*3]*3' cause bugs when modifying one inner element?
- A) SyntaxError
- B) All rows reference the exact same list in memory
- C) Python doesn't support multiplication
- D) It creates tuples
**Answer:** B
**Explanation:** Multiplying a list copies the reference, so changing one row affects all rows.


---

# Practice Challenge

Create a 3x3 matrix representing exam marks for 3 students across 3 subjects, and compute the average mark for each student.
