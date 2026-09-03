---
id: python-sets-introduction
slug: sets-introduction
course: python-for-beginners
chapter: 10
topic: 10.1
title: Sets Introduction
description: Unordered, unindexed, unique collections in Python using curly braces {} and the set() constructor.
difficulty: Beginner
readingTime: 8
order: 44
keywords:
  - sets
  - unique
  - unordered
  - unindexed
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Sets Introduction

Sets are unordered collections of unique, hashable elements, ideal for deduplication and mathematical set theory.

---

# Key Concepts & Detailed Explanation

Set characteristics:
- **Unique elements:** Duplicate values are automatically discarded.
- **Unordered:** Items have no fixed position; cannot be accessed via index [i].
- **Mutable:** You can add or remove elements.
- **Fast lookups:** Checking 'x in set' operates in average O(1) constant time due to hash tables.
Note: Empty set must be created with `set()`, because `{}` creates an empty dictionary.

---

# Code Examples & Output

```python
# Creating sets
tech_stack = {"Python", "HTML", "CSS", "Python", "JavaScript"}
print("Unique elements (duplicates removed):", tech_stack)

# Removing duplicates from a list
raw_ids = [101, 102, 101, 103, 102, 104]
unique_ids = list(set(raw_ids))
print("Deduplicated IDs:", unique_ids)

# Empty set
empty_set = set()
print("Type of empty_set:", type(empty_set))
```

**Expected Output:**
```text
Unique elements (duplicates removed): {'Python', 'HTML', 'CSS', 'JavaScript'}
Deduplicated IDs: [101, 102, 103, 104]
Type of empty_set: <class 'set'>
```

---

# Best Practices & Common Pitfalls

Always use set() instead of {} to create an empty set, since {} creates an empty dict.

---

# Practice Quiz

### 1. How do you define an empty set in Python?
- A) {}
- B) set()
- C) []
- D) empty_set()
**Answer:** B
**Explanation:** set() creates an empty set; {} creates an empty dict.

---

### 2. What happens when you add duplicate elements to a set?
- A) Raises ValueError
- B) Duplicates are silently ignored
- C) Duplicates overwrite the set
- D) SyntaxError
**Answer:** B
**Explanation:** Sets only store distinct elements; duplicates are ignored.


---

# Practice Challenge

Take a list with duplicate city names and produce a unique sorted list of cities using set().
