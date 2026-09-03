---
id: python-iterating-with-loops
slug: iterating-with-loops
course: python-for-beginners
chapter: 13
topic: 13.6
title: Iterating with Loops
description: Modern iteration patterns with enumerate(), zip(), and reversed().
difficulty: Beginner
readingTime: 9
order: 66
keywords:
  - enumerate
  - zip
  - iteration
  - looping techniques
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Iterating with Loops

Master Pythonic iteration tools: enumerate() for indices and zip() for parallel looping.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
students = ["Aarav", "Bhavna", "Chirag"]
scores = [95, 88, 92]

# enumerate(): provides index and value simultaneously
print("Class rankings:")
for rank, student in enumerate(students, start=1):
    print(f"  #{rank}: {student}")

# zip(): iterate through multiple lists in parallel
print("Report cards:")
for student, score in zip(students, scores):
    print(f"  {student} scored {score}%")
```

**Expected Output:**
```text
Class rankings:
  #1: Aarav
  #2: Bhavna
  #3: Chirag
Report cards:
  Aarav scored 95%
  Bhavna scored 88%
  Chirag scored 92%
```

---

# Best Practices & Common Pitfalls

Never manually increment an index counter in a for loop; always use 'enumerate(seq, start=0)'.

---

# Practice Quiz

### 1. Which built-in function pairs an index with each item during iteration?
- A) index()
- B) enumerate()
- C) pair()
- D) track()
**Answer:** B
**Explanation:** enumerate() returns (index, item) pairs.

---

### 2. What does 'zip([1, 2], ['a', 'b'])' produce when looped?
- A) (1, 'a') and (2, 'b')
- B) [1, 2, 'a', 'b']
- C) ['1a', '2b']
- D) Error
**Answer:** A
**Explanation:** zip() aggregates corresponding elements into tuples.


---

# Practice Challenge

Use zip() to combine 4 city names with their corresponding temperature readings and display them.
