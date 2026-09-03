---
id: python-tuple-methods
slug: tuple-methods
course: python-for-beginners
chapter: 9
topic: 9.5
title: Tuple Methods
description: The two built-in tuple methods: count() and index().
difficulty: Beginner
readingTime: 7
order: 42
keywords:
  - count()
  - index()
  - tuple methods
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Tuple Methods

Because tuples are immutable, they have only two built-in inspection methods: count() and index().

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
numbers = (10, 20, 30, 20, 40, 20, 50)

# count(value): occurrences
twenties = numbers.count(20)
print("Occurrences of 20:", twenties) # 3

# index(value): first occurrence index
first_thirty = numbers.index(30)
print("Index of 30:", first_thirty)   # 2
```

**Expected Output:**
```text
Occurrences of 20: 3
Index of 30: 2
```

---

# Best Practices & Common Pitfalls

Calling .index() on an item not present in the tuple raises ValueError. Check 'if item in tup:' first.

---

# Practice Quiz

### 1. How many built-in methods do tuples have in Python?
- A) 2 (count, index)
- B) 11
- C) 0
- D) 5
**Answer:** A
**Explanation:** Tuples have only two methods: count() and index().

---

### 2. What happens if you search for a non-existent item using tuple.index(x)?
- A) Returns -1
- B) Raises ValueError
- C) Returns None
- D) Returns False
**Answer:** B
**Explanation:** index() raises ValueError if the element is not found.


---

# Practice Challenge

Count how many times the letter 'A' appears in a tuple of grades and find the index of grade 'C'.
