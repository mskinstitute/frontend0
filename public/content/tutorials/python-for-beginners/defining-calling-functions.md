---
id: python-defining-calling-functions
slug: defining-calling-functions
course: python-for-beginners
chapter: 14
topic: 14.1
title: Defining & Calling Functions
description: The def keyword, function naming conventions, invoking functions, and the call stack.
difficulty: Beginner
readingTime: 8
order: 70
keywords:
  - functions
  - def
  - call stack
  - modular code
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Defining & Calling Functions

Functions are reusable blocks of code that execute only when invoked, eliminating repetitive logic.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Defining a function
def greet_student(name, course="Python"):
    print(f"Welcome, {name}! You are learning {course} at MSK Institute.")

# Calling the function
greet_student("Pooja")
greet_student("Aditya", "Full Stack Development")
```

**Expected Output:**
```text
Welcome, Pooja! You are learning Python at MSK Institute.
Welcome, Aditya! You are learning Full Stack Development at MSK Institute.
```

---

# Best Practices & Common Pitfalls

Always define functions before the line of code that calls them; Python reads top to bottom.

---

# Practice Quiz

### 1. Which keyword defines a function in Python?
- A) function
- B) fn
- C) def
- D) func
**Answer:** C
**Explanation:** The 'def' keyword defines functions.

---

### 2. What naming style should be used for Python functions according to PEP 8?
- A) camelCase
- B) snake_case
- C) PascalCase
- D) UPPERCASE
**Answer:** B
**Explanation:** PEP 8 prescribes snake_case for functions (e.g. calculate_total).


---

# Practice Challenge

Write a function 'celsius_to_fahrenheit(c)' and test it with 0°C and 100°C.
