---
id: python-set-methods
slug: set-methods
course: python-for-beginners
chapter: 10
topic: 10.4
title: Set Methods
description: Relational methods: issubset(), issuperset(), and isdisjoint().
difficulty: Beginner
readingTime: 8
order: 47
keywords:
  - issubset
  - issuperset
  - isdisjoint
  - set methods
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Set Methods

Test subset, superset, and disjoint relationships between sets.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
full_curriculum = {"Python", "HTML", "CSS", "JS", "SQL", "Git"}
student_skills = {"Python", "HTML", "CSS"}
unrelated_skills = {"Cooking", "Painting"}

print("Is student a subset?", student_skills.issubset(full_curriculum))     # True
print("Is curriculum superset?", full_curriculum.issuperset(student_skills)) # True
print("Are unrelated skills disjoint?", student_skills.isdisjoint(unrelated_skills)) # True
```

**Expected Output:**
```text
Is student a subset? True
Is curriculum superset? True
Are unrelated skills disjoint? True
```

---

# Best Practices & Common Pitfalls

isdisjoint() returns True if two sets share zero elements in common.

---

# Practice Quiz

### 1. What does 'set1.isdisjoint(set2)' return if they have no common elements?
- A) False
- B) True
- C) None
- D) Error
**Answer:** B
**Explanation:** isdisjoint() returns True when the intersection is empty.

---

### 2. If every element of A is also in B, what does A.issubset(B) return?
- A) True
- B) False
- C) None
- D) Equal
**Answer:** A
**Explanation:** A is a subset of B if all its items exist in B.


---

# Practice Challenge

Verify whether a candidate's submitted skills are a complete subset of the job prerequisites.
