---
id: python-list-methods
slug: list-methods
course: python-for-beginners
chapter: 8
topic: 8.5
title: List Methods
description: Built-in list methods: sort(), reverse(), copy(), count(), index(), and sorted().
difficulty: Beginner
readingTime: 9
order: 36
keywords:
  - sort()
  - reverse()
  - copy()
  - count()
  - list methods
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# List Methods

Python lists feature high-performance methods for ordering, searching, and duplicating data.

---

# Key Concepts & Detailed Explanation

Key methods:
- .sort(key=None, reverse=False): Sorts list in-place (returns None).
- sorted(iterable): Returns a NEW sorted list without modifying original.
- .reverse(): Reverses elements in-place.
- .count(x): Returns number of times x appears.
- .index(x): Returns index of first occurrence of x.
- .copy(): Returns a shallow copy.

---

# Code Examples & Output

```python
grades = [88, 92, 79, 95, 88, 100]

print("Count of 88:", grades.count(88))  # 2
print("First index of 95:", grades.index(95)) # 3

# Sorting in-place
grades.sort(reverse=True)
print("Sorted descending:", grades)

# Using sorted() to preserve original
original = [5, 2, 8, 1]
sorted_copy = sorted(original)
print("Original untouched:", original)
print("Sorted copy:", sorted_copy)
```

**Expected Output:**
```text
Count of 88: 2
First index of 95: 3
Sorted descending: [100, 95, 92, 88, 88, 79]
Original untouched: [5, 2, 8, 1]
Sorted copy: [1, 2, 5, 8]
```

---

# Best Practices & Common Pitfalls

Remember that 'my_list.sort()' mutates in-place and returns None. Do not write 'sorted_list = my_list.sort()'.

---

# Practice Quiz

### 1. What does the method 'my_list.sort()' return?
- A) The sorted list
- B) None
- C) True
- D) An iterator
**Answer:** B
**Explanation:** sort() operates in-place and returns None.

---

### 2. How do you create an independent shallow copy of a list 'lst'?
- A) lst.copy() or lst[:]
- B) new = lst
- C) clone(lst)
- D) lst.duplicate()
**Answer:** A
**Explanation:** lst.copy() or slicing lst[:] creates a shallow copy.


---

# Practice Challenge

Sort a list of student names alphabetically in reverse order using the sort(reverse=True) method.
