---
id: python-update-items
slug: update-items
course: python-for-beginners
chapter: 8
topic: 8.4
title: Update Items
description: Updating list elements by index, updating slices, and bulk replacements.
difficulty: Beginner
readingTime: 8
order: 35
keywords:
  - update list
  - slice assignment
  - mutation
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Update Items

Because lists are mutable, items can be replaced by direct assignment to indices or slices.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
scores = [50, 60, 70, 80, 90]

# Single index update
scores[0] = 55
print("Updated first score:", scores)

# Slice assignment (replace multiple items)
scores[1:3] = [65, 75]
print("Updated slice [1:3]:", scores)

# Replace with different length
scores[3:] = [85, 95, 100]
print("Expanded update:", scores)
```

**Expected Output:**
```text
Updated first score: [55, 60, 70, 80, 90]
Updated slice [1:3]: [55, 65, 75, 80, 90]
Expanded update: [55, 65, 75, 85, 95, 100]
```

---

# Best Practices & Common Pitfalls

Assigning to a slice can change the size of the list if the replacement sequence has a different length.

---

# Practice Quiz

### 1. Can you replace multiple items in a list simultaneously using slice assignment?
- A) Yes, list[1:3] = [new1, new2]
- B) No, one index at a time only
- C) Only with map()
- D) Only in Python 3
**Answer:** A
**Explanation:** Slice assignment allows replacing multiple elements.

---

### 2. What happens if you assign to an index that doesn't exist (e.g. list[100] = 5 on a 3-item list)?
- A) It automatically extends the list
- B) It raises an IndexError
- C) It creates a dictionary
- D) None
**Answer:** B
**Explanation:** Index assignment out of bounds raises an IndexError. Use append() to grow.


---

# Practice Challenge

Create a list of 5 cities and replace the middle 3 cities with 2 new cities using slice assignment.
