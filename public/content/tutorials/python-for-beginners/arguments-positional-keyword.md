---
id: python-arguments-positional-keyword
slug: arguments-positional-keyword
course: python-for-beginners
chapter: 14
topic: 14.2
title: Arguments: Positional, Keyword
description: Passing arguments by position vs by parameter name, and rules for mixing them.
difficulty: Beginner
readingTime: 8
order: 71
keywords:
  - positional arguments
  - keyword arguments
  - parameters
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Arguments: Positional, Keyword

Python functions accept arguments by relative position or explicitly by keyword name.

---

# Key Concepts & Detailed Explanation

Argument types:
- **Positional arguments:** Assigned to parameters based on their order in the call.
- **Keyword arguments:** Assigned explicitly using `name=value` syntax, allowing arguments in any order.
Rule: Positional arguments MUST always precede keyword arguments!

---

# Code Examples & Output

```python
def register_student(name, age, city):
    print(f"Student: {name}, Age: {age}, City: {city}")

# Positional arguments (order matters)
register_student("Kavita", 21, "Shikohabad")

# Keyword arguments (order doesn't matter)
register_student(city="Agra", name="Rajesh", age=24)

# Mixed (positional MUST come first)
register_student("Neha", city="Firozabad", age=22)
```

**Expected Output:**
```text
Student: Kavita, Age: 21, City: Shikohabad
Student: Rajesh, Age: 24, City: Agra
Student: Neha, Age: 22, City: Firozabad
```

---

# Best Practices & Common Pitfalls

Using keyword arguments at the call site improves self-documentation of complex function invocations.

---

# Practice Quiz

### 1. Can a positional argument be placed AFTER a keyword argument in a function call?
- A) Yes, anytime
- B) No, positional arguments must precede keyword arguments
- C) Only if numbers
- D) Only in Python 2
**Answer:** B
**Explanation:** SyntaxError: positional argument follows keyword argument.

---

### 2. What is the advantage of keyword arguments?
- A) They make code faster
- B) They eliminate dependency on parameter ordering
- C) They prevent recursion
- D) They use less memory
**Answer:** B
**Explanation:** Keyword arguments can be provided in any order.


---

# Practice Challenge

Write a function 'order_pizza(size, crust, topping)' and call it once using positional args and once using keyword args.
