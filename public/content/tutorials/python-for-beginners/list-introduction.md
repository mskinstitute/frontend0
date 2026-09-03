---
id: python-list-introduction
slug: list-introduction
course: python-for-beginners
chapter: 8
topic: 8.1
title: List Introduction
description: Ordered, mutable, heterogenous collections, list syntax, and memory allocation.
difficulty: Beginner
readingTime: 8
order: 32
keywords:
  - lists
  - mutable
  - heterogeneous
  - sequences
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# List Introduction

Lists are the most widely used collection data type in Python: ordered, mutable, and dynamic.

---

# Key Concepts & Detailed Explanation

List characteristics:
- **Ordered:** Elements maintain their insertion sequence.
- **Mutable:** Elements can be added, modified, or removed in place.
- **Heterogeneous:** A single list can contain mixed data types (integers, strings, floats, even other lists).
- **Zero-indexed:** The first element is at index 0.

---

# Code Examples & Output

```python
# Creating lists
numbers = [10, 20, 30, 40]
mixed = ["Sumit", 28, 4.9, True]
empty = []

print("Numbers list:", numbers)
print("Mixed types:", mixed)
print("Total elements:", len(numbers))
```

**Expected Output:**
```text
Numbers list: [10, 20, 30, 40]
Mixed types: ['Sumit', 28, 4.9, True]
Total elements: 4
```

---

# Best Practices & Common Pitfalls

While Python lists allow mixed types, it is best practice to keep lists homogenous (all numbers or all strings).

---

# Practice Quiz

### 1. Are Python lists mutable or immutable?
- A) Immutable
- B) Mutable
- C) Depends on elements
- D) Only mutable in Python 2
**Answer:** B
**Explanation:** Lists are mutable; you can change their contents in place.

---

### 2. Which brackets are used to define a list literal?
- A) ()
- B) {}
- C) []
- D) <>
**Answer:** C
**Explanation:** Square brackets [] define a list.


---

# Practice Challenge

Create a list of your top 5 favorite programming topics and print the length and the middle element.
