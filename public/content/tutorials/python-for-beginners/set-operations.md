---
id: python-set-operations
slug: set-operations
course: python-for-beginners
chapter: 10
topic: 10.3
title: Set Operations
description: Mathematical set operations: Union (|), Intersection (&), Difference (-), and Symmetric Difference (^).
difficulty: Beginner
readingTime: 9
order: 46
keywords:
  - union
  - intersection
  - difference
  - symmetric difference
  - venn
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Set Operations

Python sets support complete mathematical set theory operations natively.

---

# Key Concepts & Detailed Explanation

Set operators and methods:
- **Union (`|` or `.union()`):** All elements from both sets.
- **Intersection (`&` or `.intersection()`):** Elements common to both sets.
- **Difference (`-` or `.difference()`):** Elements in A but not in B.
- **Symmetric Difference (`^` or `.symmetric_difference()`):** Elements in either set, but not in both.

---

# Code Examples & Output

```python
batch_a = {"Rahul", "Priya", "Sumit", "Neha"}
batch_b = {"Sumit", "Ankit", "Priya", "Karan"}

print("Union (All students):", batch_a | batch_b)
print("Intersection (In both batches):", batch_a & batch_b)
print("Difference (Only in A):", batch_a - batch_b)
print("Symmetric Difference (In only one batch):", batch_a ^ batch_b)
```

**Expected Output:**
```text
Union (All students): {'Rahul', 'Priya', 'Sumit', 'Neha', 'Ankit', 'Karan'}
Intersection (In both batches): {'Sumit', 'Priya'}
Difference (Only in A): {'Rahul', 'Neha'}
Symmetric Difference (In only one batch): {'Rahul', 'Neha', 'Ankit', 'Karan'}
```

---

# Best Practices & Common Pitfalls

Use intersection (&) to find shared permissions or common friends in social network apps.

---

# Practice Quiz

### 1. Which operator performs set intersection in Python?
- A) |
- B) &
- C) ^
- D) -
**Answer:** B
**Explanation:** & computes the intersection.

---

### 2. What does A ^ B (symmetric difference) represent?
- A) Elements present in both A and B
- B) Elements present in A or B, but not both
- C) All elements in A
- D) Cartesian product
**Answer:** B
**Explanation:** Symmetric difference returns items unique to each set.


---

# Practice Challenge

Given two sets of skills required for Job A and Job B, find the common skills and unique skills.
