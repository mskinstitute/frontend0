---
id: python-tuple-introduction
slug: tuple-introduction
course: python-for-beginners
chapter: 9
topic: 9.1
title: Tuple Introduction
description: Ordered, immutable collections in Python, syntax with parentheses, single-element tuples, and memory advantages.
difficulty: Beginner
readingTime: 8
order: 38
keywords:
  - tuples
  - immutable
  - parentheses
  - tuple syntax
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Tuple Introduction

Tuples are ordered, immutable collections used to group related data that should not be altered.

---

# Key Concepts & Detailed Explanation

Tuples vs Lists:
1. **Immutability:** Once created, you cannot append, extend, or alter items in a tuple. This guarantees data integrity.
2. **Performance:** Tuples consume less memory and are faster to allocate than lists.
3. **Dictionary Keys:** Because tuples are hashable (if their items are immutable), they can serve as dictionary keys.
Note: A single-element tuple requires a trailing comma: `(42,)`.

---

# Code Examples & Output

```python
# Defining tuples
point = (10, 20)
single_item = (100,) # Trailing comma is required!
mixed_tuple = ("MSK", 2026, 99.5, True)

print("Point coordinates:", point)
print("Single tuple type:", type(single_item))
print("Tuple length:", len(mixed_tuple))
```

**Expected Output:**
```text
Point coordinates: (10, 20)
Single tuple type: <class 'tuple'>
Tuple length: 4
```

---

# Best Practices & Common Pitfalls

Always include a trailing comma for single-element tuples: '(5,)' is a tuple, but '(5)' is just an integer in parentheses.

---

# Practice Quiz

### 1. What is the data type of 'x = (42)' without a comma?
- A) tuple
- B) int
- C) list
- D) set
**Answer:** B
**Explanation:** Without a trailing comma, Python treats parentheses as mathematical grouping, resulting in an int.

---

### 2. Which property distinguishes tuples from lists?
- A) Tuples are mutable
- B) Tuples are immutable
- C) Tuples cannot hold strings
- D) Tuples are unordered
**Answer:** B
**Explanation:** Tuples cannot be modified after creation (immutable).


---

# Practice Challenge

Create a tuple representing GPS coordinates (latitude, longitude, altitude) and print its elements.
