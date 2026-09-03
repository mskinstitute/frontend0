---
id: python-nested-conditions
slug: nested-conditions
course: python-for-beginners
chapter: 12
topic: 12.2
title: Nested Conditions
description: If statements placed inside other if blocks for hierarchical decision trees.
difficulty: Beginner
readingTime: 8
order: 57
keywords:
  - nested if
  - decision trees
  - nested conditions
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Conditions

Nested conditions allow testing secondary criteria once an initial primary condition passes.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
age = 20
has_voter_id = True

if age >= 18:
    print("Age criterion met.")
    if has_voter_id:
        print("Eligible to cast vote in election.")
    else:
        print("Please apply for a voter ID card.")
else:
    print("Not eligible: must be at least 18 years old.")
```

**Expected Output:**
```text
Age criterion met.
Eligible to cast vote in election.
```

---

# Best Practices & Common Pitfalls

If nesting exceeds 3 levels, consider combining conditions with 'and' or refactoring into helper functions.

---

# Practice Quiz

### 1. What danger arises from overly deep nesting of if-statements?
- A) Slower compilation
- B) Reduced code readability ('arrow anti-pattern')
- C) SyntaxError
- D) Memory leaks
**Answer:** B
**Explanation:** Deep nesting makes code difficult to read and maintain.

---

### 2. Can an 'elif' block also contain nested if statements?
- A) Yes, any block can contain nested conditions
- B) No, only main if can
- C) Only in functions
- D) Only with parentheses
**Answer:** A
**Explanation:** Python supports nested conditions anywhere inside any code block.


---

# Practice Challenge

Write a nested condition that checks if a user is logged in, and if so, whether they have 'admin' or 'student' privileges.
