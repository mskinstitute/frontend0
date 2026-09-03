---
id: python-accessing-items
slug: accessing-items
course: python-for-beginners
chapter: 9
topic: 9.2
title: Accessing Items
description: Indexing, negative indexing, and slicing tuples.
difficulty: Beginner
readingTime: 7
order: 39
keywords:
  - tuple indexing
  - tuple slicing
  - accessing tuples
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Accessing Items

Accessing items in tuples follows the exact same 0-based indexing and slice rules as lists and strings.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
colors = ("red", "green", "blue", "yellow", "purple")

# Indexing
print("First color:", colors[0])  # red
print("Last color:", colors[-1])  # purple

# Slicing
print("Primary colors:", colors[0:3]) # ('red', 'green', 'blue')
print("Step slice:", colors[::2])     # ('red', 'blue', 'purple')
```

**Expected Output:**
```text
First color: red
Last color: purple
Primary colors: ('red', 'green', 'blue')
Step slice: ('red', 'blue', 'purple')
```

---

# Best Practices & Common Pitfalls

Slicing a tuple produces a brand-new tuple object.

---

# Practice Quiz

### 1. What is returned by ('a', 'b', 'c', 'd')[1:3]?
- A) ('a', 'b')
- B) ('b', 'c')
- C) ('b', 'c', 'd')
- D) ['b', 'c']
**Answer:** B
**Explanation:** Slice [1:3] extracts indices 1 and 2, producing ('b', 'c').

---

### 2. Does tuple access support negative indexing?
- A) Yes, -1 is the last item
- B) No, positive only
- C) Only with reverse()
- D) Only in functions
**Answer:** A
**Explanation:** Negative indices work identically to lists.


---

# Practice Challenge

Given a tuple of 12 months, extract the summer months (indices 4 to 7) using slicing.
