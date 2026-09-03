---
id: python-if-elif-else
slug: if-elif-else
course: python-for-beginners
chapter: 12
topic: 12.1
title: If, Elif, Else
description: Branching control flow with if, elif, and else statements.
difficulty: Beginner
readingTime: 8
order: 56
keywords:
  - if
  - elif
  - else
  - control flow
  - conditionals
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# If, Elif, Else

Conditional statements allow programs to make decisions and execute different blocks of code based on conditions.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
marks = 82

if marks >= 90:
    grade = "A+"
elif marks >= 80:
    grade = "A"
elif marks >= 70:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "Fail"

print(f"Marks: {marks} | Final Grade: {grade}")
```

**Expected Output:**
```text
Marks: 82 | Final Grade: A
```

---

# Best Practices & Common Pitfalls

Python tests conditions from top to bottom. The moment one condition evaluates to True, Python executes its block and skips the rest.

---

# Practice Quiz

### 1. What keyword stands for 'else if' in Python?
- A) elseif
- B) elif
- C) else_if
- D) case
**Answer:** B
**Explanation:** Python uses 'elif'.

---

### 2. Is the 'else' block mandatory in an if statement?
- A) Yes, always
- B) No, it is optional
- C) Only if elif is used
- D) Only in scripts
**Answer:** B
**Explanation:** 'else' is optional.


---

# Practice Challenge

Write a program that takes an integer and prints whether it is positive, negative, or zero.
