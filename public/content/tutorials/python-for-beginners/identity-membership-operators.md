---
id: python-identity-membership-operators
slug: identity-membership-operators
course: python-for-beginners
chapter: 6
topic: 6.5
title: Identity & Membership Operators
description: Difference between equality (==) and identity (is), and membership testing with in and not in.
difficulty: Beginner
readingTime: 8
order: 27
keywords:
  - is
  - is not
  - in
  - not in
  - identity
  - membership
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Identity & Membership Operators

Identity operators compare memory references, while membership operators test for containment.

---

# Key Concepts & Detailed Explanation

Identity operators:
- 'is': True if both variables point to the EXACT same object in memory (id(a) == id(b)).
- 'is not': True if they point to different objects.
Membership operators:
- 'in': True if value exists inside the sequence/collection.
- 'not in': True if value is absent.

---

# Code Examples & Output

```python
# Equality vs Identity
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print("list1 == list2:", list1 == list2) # True (equal contents)
print("list1 is list2:", list1 is list2) # False (different objects)
print("list1 is list3:", list1 is list3) # True (same memory reference)

# Membership testing
allowed_roles = ["admin", "instructor", "student"]
user_role = "instructor"

print("Is allowed:", user_role in allowed_roles) # True
```

**Expected Output:**
```text
list1 == list2: True
list1 is list2: False
list1 is list3: True
Is allowed: True
```

---

# Best Practices & Common Pitfalls

Always use 'is None' or 'is not None' to check for None, never '== None'.

---

# Practice Quiz

### 1. What is the difference between '==' and 'is' in Python?
- A) They are identical
- B) '==' checks value equality, 'is' checks memory identity
- C) 'is' is only for strings
- D) '==' is deprecated
**Answer:** B
**Explanation:** '==' compares values; 'is' compares memory addresses.

---

### 2. Which operator checks if an item exists inside a list or dictionary?
- A) contains
- B) has
- C) in
- D) within
**Answer:** C
**Explanation:** The 'in' operator tests membership.


---

# Practice Challenge

Write a program that asks for a student username and checks if it exists in an authorized list using 'in'.
