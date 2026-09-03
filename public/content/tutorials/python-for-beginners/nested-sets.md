---
id: python-nested-sets
slug: nested-sets
course: python-for-beginners
chapter: 10
topic: 10.5
title: Nested Sets
description: Frozenset, immutability, and why standard sets cannot contain other mutable sets.
difficulty: Beginner
readingTime: 8
order: 48
keywords:
  - frozenset
  - nested sets
  - hashable
  - immutable set
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Sets

Because sets require elements to be hashable and immutable, standard sets cannot contain sets. Use frozenset instead.

---

# Key Concepts & Detailed Explanation

What is frozenset?
A frozenset is an immutable version of a Python set. Once created, its elements cannot be added or removed.
Because frozensets are immutable, they are hashable and can be:
1. Stored inside other sets.
2. Used as keys in dictionaries.

---

# Code Examples & Output

```python
# Using frozenset as elements in a set
fs1 = frozenset([1, 2, 3])
fs2 = frozenset([3, 4, 5])

outer_set = {fs1, fs2}
print("Outer set with frozensets:", outer_set)

# frozenset as dictionary key
cache = {
    frozenset(["user", "admin"]): "ReadWriteAccess",
    frozenset(["guest"]): "ReadOnlyAccess"
}
print("Access level:", cache[frozenset(["guest"])])
```

**Expected Output:**
```text
Outer set with frozensets: {frozenset({1, 2, 3}), frozenset({3, 4, 5})}
Access level: ReadOnlyAccess
```

---

# Best Practices & Common Pitfalls

Use frozenset when you need set operations on fixed collections or dictionary keys.

---

# Practice Quiz

### 1. Why can't you put a standard set inside another set in Python?
- A) Sets only hold numbers
- B) Sets are mutable and therefore unhashable
- C) Python limits nesting to 1 level
- D) Sets cannot be iterated
**Answer:** B
**Explanation:** Standard sets are unhashable because they are mutable.

---

### 2. Which data type provides an immutable, hashable set in Python?
- A) const_set
- B) frozenset
- C) tuple_set
- D) fixed_set
**Answer:** B
**Explanation:** frozenset creates an immutable set.


---

# Practice Challenge

Create a dictionary mapping a frozenset of department roles to their security clearance level.
