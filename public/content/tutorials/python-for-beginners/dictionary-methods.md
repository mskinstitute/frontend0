---
id: python-dictionary-methods
slug: dictionary-methods
course: python-for-beginners
chapter: 11
topic: 11.5
title: Dictionary Methods
description: Mastering .keys(), .values(), .items(), .update(), and .setdefault().
difficulty: Beginner
readingTime: 9
order: 53
keywords:
  - keys()
  - values()
  - items()
  - update()
  - setdefault()
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Dictionary Methods

Dictionary view methods provide dynamic windows into keys, values, and pair tuples.

---

# Key Concepts & Detailed Explanation

View methods:
- .keys(): Dynamic view of all keys.
- .values(): Dynamic view of all values.
- .items(): Dynamic view of all (key, value) pairs.
- .update(other_dict): Merges pairs from other_dict into this dict.
- .setdefault(key, default): Returns key value; if key missing, inserts key with default.

---

# Code Examples & Output

```python
course_info = {
    "name": "Python for Beginners",
    "duration": "1 Month",
    "mode": "Both"
}

print("Keys:", list(course_info.keys()))
print("Values:", list(course_info.values()))

# Iterating over items
for key, value in course_info.items():
    print(f"  {key} -> {value}")

# setdefault
instructor = course_info.setdefault("instructor", "Er. Sumit Kumar")
print("Instructor:", instructor)
```

**Expected Output:**
```text
Keys: ['name', 'duration', 'mode']
Values: ['Python for Beginners', '1 Month', 'Both']
  name -> Python for Beginners
  duration -> 1 Month
  mode -> Both
Instructor: Er. Sumit Kumar
```

---

# Best Practices & Common Pitfalls

Iterating with 'for k, v in d.items():' is the most idiomatic way to loop through dictionaries in Python.

---

# Practice Quiz

### 1. Which method yields an iterable of (key, value) tuples?
- A) dict.pairs()
- B) dict.items()
- C) dict.entries()
- D) dict.values()
**Answer:** B
**Explanation:** dict.items() returns (key, value) tuples.

---

### 2. What does dict.setdefault('key', 'default') do if 'key' already exists?
- A) Overwrites with default
- B) Returns current value and does not overwrite
- C) Raises KeyError
- D) Deletes key
**Answer:** B
**Explanation:** setdefault returns existing value without modifying if the key exists.


---

# Practice Challenge

Merge two dictionaries of student contact details using the .update() method.
