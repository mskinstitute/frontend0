---
id: python-arguments-default-args-kwargs
slug: arguments-default-args-kwargs
course: python-for-beginners
chapter: 14
topic: 14.3
title: Arguments: Default, *args, **kwargs
description: Default parameter values, arbitrary positional arguments (*args), and arbitrary keyword arguments (**kwargs).
difficulty: Beginner
readingTime: 9
order: 72
keywords:
  - *args
  - **kwargs
  - default arguments
  - variable arguments
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Arguments: Default, *args, **kwargs

Handle variable numbers of arguments dynamically using *args and **kwargs.

---

# Key Concepts & Detailed Explanation

Special parameter types:
- **Default arguments:** Default values used when no argument is supplied.
- ***args:** Collects extra positional arguments into a **tuple**.
- ****kwargs:** Collects extra keyword arguments into a **dictionary**.

---

# Code Examples & Output

```python
# *args: accepts any number of positional values
def sum_all(*numbers):
    total = sum(numbers)
    print(f"Sum of {len(numbers)} items: {total}")
    return total

sum_all(10, 20, 30, 40)

# **kwargs: accepts any number of keyword values
def display_profile(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

print("Student Details:")
display_profile(name="Simran", course="Python", roll_no=105)
```

**Expected Output:**
```text
Sum of 4 items: 100
Student Details:
  name: Simran
  course: Python
  roll_no: 105
```

---

# Best Practices & Common Pitfalls

Beware of mutable default arguments: 'def fn(lst=[])' retains state across calls! Always use 'def fn(lst=None): if lst is None: lst = []'.

---

# Practice Quiz

### 1. What data type is *args inside a function?
- A) list
- B) tuple
- C) dict
- D) set
**Answer:** B
**Explanation:** *args packs arbitrary positional arguments into a tuple.

---

### 2. What data type is **kwargs inside a function?
- A) list
- B) tuple
- C) dict
- D) string
**Answer:** C
**Explanation:** **kwargs packs arbitrary keyword arguments into a dictionary.


---

# Practice Challenge

Write a function 'build_car(maker, model, **features)' that accepts any number of custom feature flags.
