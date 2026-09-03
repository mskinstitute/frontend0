---
id: python-for-loop
slug: for-loop
course: python-for-beginners
chapter: 13
topic: 13.2
title: For Loop
description: Sequence iteration over lists, strings, tuples, and using the range() function.
difficulty: Beginner
readingTime: 9
order: 62
keywords:
  - for loop
  - range()
  - iteration
  - sequences
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# For Loop

Python's for loop iterates directly over the items of any sequence or iterable.

---

# Key Concepts & Detailed Explanation

The range() function:
- range(stop): 0 up to stop (exclusive).
- range(start, stop): start up to stop (exclusive).
- range(start, stop, step): increments by step.

---

# Code Examples & Output

```python
# Iterating over range
print("Counting with range(1, 6):")
for i in range(1, 6):
    print(i, end=" ")
print()

# Iterating over a list
languages = ["Python", "JavaScript", "Go"]
for lang in languages:
    print(f"Programming in {lang}")
```

**Expected Output:**
```text
Counting with range(1, 6):
1 2 3 4 5 
Programming in Python
Programming in JavaScript
Programming in Go
```

---

# Best Practices & Common Pitfalls

Use range(len(my_list)) only if you strictly need index access; otherwise loop directly over items.

---

# Practice Quiz

### 1. What does list(range(1, 5)) generate?
- A) [1, 2, 3, 4, 5]
- B) [1, 2, 3, 4]
- C) [0, 1, 2, 3, 4]
- D) [1, 5]
**Answer:** B
**Explanation:** The stop value (5) is exclusive, producing [1, 2, 3, 4].

---

### 2. How do you count backwards from 5 down to 1 using range?
- A) range(5, 0, -1)
- B) range(5, 1)
- C) range(1, 5).reverse()
- D) range(-5, -1)
**Answer:** A
**Explanation:** range(5, 0, -1) counts backwards with step -1.


---

# Practice Challenge

Write a for loop that calculates the sum of all numbers from 1 to 100.
