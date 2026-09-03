---
id: python-create-access-lists
slug: create-access-lists
course: python-for-beginners
chapter: 8
topic: 8.2
title: Create & Access Lists
description: Accessing elements using positive and negative indices, slicing, and checking membership with in.
difficulty: Beginner
readingTime: 8
order: 33
keywords:
  - indexing
  - slicing
  - accessing lists
  - in
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Create & Access Lists

Access elements in a list using index brackets or slices.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
courses = ["Python", "Web Dev", "Data Science", "Cyber Security", "AI"]

# Indexing
print("First course:", courses[0])   # Python
print("Last course:", courses[-1])   # AI

# Slicing [start:stop]
print("Top 2:", courses[:2])         # ['Python', 'Web Dev']
print("Middle:", courses[1:4])       # ['Web Dev', 'Data Science', 'Cyber Security']

# Check membership
if "Python" in courses:
    print("Python is offered at MSK Institute!")
```

**Expected Output:**
```text
First course: Python
Last course: AI
Top 2: ['Python', 'Web Dev']
Middle: ['Web Dev', 'Data Science', 'Cyber Security']
Python is offered at MSK Institute!
```

---

# Best Practices & Common Pitfalls

Accessing an index beyond len(list) - 1 raises an IndexError. Always check length or use slices (slices never raise IndexError).

---

# Practice Quiz

### 1. What does list[-2] access?
- A) The second element from the start
- B) The second element from the end
- C) An error
- D) The second slice
**Answer:** B
**Explanation:** Negative indices count backwards from the end.

---

### 2. What happens when you slice beyond list bounds (e.g. [1, 2][0:100])?
- A) IndexError
- B) Returns available items without error
- C) None
- D) Crashes Python
**Answer:** B
**Explanation:** Slicing gracefully clamps to available bounds without throwing IndexError.


---

# Practice Challenge

From a list of 7 numbers, extract the first 3, the last 3, and every alternate number using slices.
