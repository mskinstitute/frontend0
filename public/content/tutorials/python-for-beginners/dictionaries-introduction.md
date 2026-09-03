---
id: python-dictionaries-introduction
slug: dictionaries-introduction
course: python-for-beginners
chapter: 11
topic: 11.1
title: Dictionaries Introduction
description: Key-value pair mappings, fast hashing, uniqueness of keys, and ordered behavior (Python 3.7+).
difficulty: Beginner
readingTime: 9
order: 49
keywords:
  - dictionaries
  - dict
  - key-value
  - mapping
  - hash table
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Dictionaries Introduction

Dictionaries store data in key-value pairs, offering near-instantaneous lookups by key.

---

# Key Concepts & Detailed Explanation

Dictionary anatomy:
- **Key-Value structure:** { key1: val1, key2: val2 }
- **Unique keys:** Keys must be unique and hashable (strings, numbers, tuples).
- **Mutable:** Values can be updated, inserted, or removed.
- **Ordered:** Since Python 3.7, dictionaries maintain insertion order.

---

# Code Examples & Output

```python
# Creating a student dictionary
student = {
    "roll_no": 101,
    "name": "Arun Kumar",
    "course": "Python for Beginners",
    "fee_paid": True,
    "score": 92.5
}

print("Student dict:", student)
print("Student name:", student["name"])
print("Total keys:", len(student))
```

**Expected Output:**
```text
Student dict: {'roll_no': 101, 'name': 'Arun Kumar', 'course': 'Python for Beginners', 'fee_paid': True, 'score': 92.5}
Student name: Arun Kumar
Total keys: 5
```

---

# Best Practices & Common Pitfalls

Always use immutable types (like strings or integers) as dictionary keys. Never use lists.

---

# Practice Quiz

### 1. Can a list be used as a dictionary key in Python?
- A) Yes, anytime
- B) No, because lists are mutable and unhashable
- C) Only if it contains integers
- D) Only in Python 3
**Answer:** B
**Explanation:** Dictionary keys must be hashable; lists are unhashable.

---

### 2. Do Python dictionaries maintain insertion order in modern Python 3.7+?
- A) No, dictionaries are always completely random
- B) Yes, insertion order is guaranteed
- C) Only when sorted
- D) Only with collections.OrderedDict
**Answer:** B
**Explanation:** Insertion order preservation is guaranteed in Python 3.7+.


---

# Practice Challenge

Create a dictionary describing a computer lab with keys for lab_name, computers_count, and has_projector.
