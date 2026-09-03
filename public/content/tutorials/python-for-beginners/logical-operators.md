---
id: python-logical-operators
slug: logical-operators
course: python-for-beginners
chapter: 6
topic: 6.4
title: Logical Operators
description: Boolean logic with and, or, not, and short-circuit evaluation.
difficulty: Beginner
readingTime: 8
order: 26
keywords:
  - logical operators
  - and
  - or
  - not
  - short-circuit
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Logical Operators

Logical operators combine multiple boolean expressions to make decisions.

---

# Key Concepts & Detailed Explanation

Logical operators:
- and: Returns True if BOTH operands are True.
- or: Returns True if AT LEAST ONE operand is True.
- not: Reverses the boolean truth value.
Short-circuit evaluation:
- In 'A and B', if A is False, B is never evaluated.
- In 'A or B', if A is True, B is never evaluated.

---

# Code Examples & Output

```python
has_degree = True
experience_years = 3
knows_python = True

# Logical and
if has_degree and knows_python:
    print("Eligible for technical interview")

# Logical or
is_sunday = False
is_holiday = True
if is_sunday or is_holiday:
    print("Institute is closed")

# Logical not
is_raining = False
if not is_raining:
    print("Outdoor lab session active")
```

**Expected Output:**
```text
Eligible for technical interview
Institute is closed
Outdoor lab session active
```

---

# Best Practices & Common Pitfalls

Rely on short-circuiting to prevent errors: 'if user and user.is_authenticated:'

---

# Practice Quiz

### 1. What does 'True and False' evaluate to?
- A) True
- B) False
- C) None
- D) Error
**Answer:** B
**Explanation:** 'and' requires both operands to be True.

---

### 2. What does 'not (5 > 10)' evaluate to?
- A) True
- B) False
- C) None
- D) 5
**Answer:** A
**Explanation:** 5 > 10 is False; not False is True.


---

# Practice Challenge

Write a conditional statement that checks if a user is eligible for admission: age >= 18 AND (passed_exam OR has_interview_waiver).
