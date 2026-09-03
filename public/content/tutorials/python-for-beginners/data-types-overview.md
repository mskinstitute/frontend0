---
id: python-data-types-overview
slug: data-types-overview
course: python-for-beginners
chapter: 3
topic: 3.1
title: Data Types Overview
description: Overview of Python built-in types: int, float, str, bool, list, tuple, set, dict, and NoneType.
difficulty: Beginner
readingTime: 9
order: 11
keywords:
  - data types
  - primitives
  - collections
  - types overview
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Data Types Overview

Data types define the kind of value an object holds and the operations that can be performed upon it.

---

# Key Concepts & Detailed Explanation

Python data types are divided into:
1. **Numeric:** int, float, complex
2. **Text:** str
3. **Boolean:** bool (True, False)
4. **Sequences:** list, tuple, range
5. **Mappings:** dict
6. **Sets:** set, frozenset
7. **Binary:** bytes, bytearray
8. **Null Value:** NoneType (None)

---

# Code Examples & Output

```python
# Scalar types
age = 22             # int
height = 5.9         # float
name = "Neha"        # str
graduated = True     # bool
diploma = None       # NoneType

# Collection types
hobbies = ["Coding", "Chess"]      # list (mutable)
geo_coords = (27.17, 78.00)        # tuple (immutable)
languages = {"Python", "SQL"}      # set (unique)
user = {"name": name, "age": age}  # dict (key-value)

print("Types:", type(age), type(height), type(hobbies))
```

**Expected Output:**
```text
Types: <class 'int'> <class 'float'> <class 'list'>
```

---

# Best Practices & Common Pitfalls

Use type(variable) in the terminal anytime you need to inspect an unknown value.

---

# Practice Quiz

### 1. Which type is mutable in Python?
- A) tuple
- B) str
- C) list
- D) int
**Answer:** C
**Explanation:** Lists are mutable; their elements can be changed in place.

---

### 2. What is the data type of the value None in Python?
- A) null
- B) NoneType
- C) void
- D) empty
**Answer:** B
**Explanation:** None belongs to <class 'NoneType'>.


---

# Practice Challenge

Declare one variable for each of the 6 fundamental data types and print their types.
