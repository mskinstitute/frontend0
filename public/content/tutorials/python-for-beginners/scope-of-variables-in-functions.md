---
id: python-scope-of-variables-in-functions
slug: scope-of-variables-in-functions
course: python-for-beginners
chapter: 14
topic: 14.7
title: Scope of Variables in Functions
description: Understanding LEGB rule (Local, Enclosing, Global, Built-in), global keyword, and nonlocal.
difficulty: Beginner
readingTime: 9
order: 76
keywords:
  - variable scope
  - LEGB
  - global
  - nonlocal
  - local
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Scope of Variables in Functions

Variable scope dictates where a variable can be read or modified in a Python program.

---

# Key Concepts & Detailed Explanation

The LEGB Rule for variable lookup:
1. **L (Local):** Defined inside the current function.
2. **E (Enclosing):** Defined in enclosing outer functions.
3. **G (Global):** Defined at top-level module scope.
4. **B (Built-in):** Built-in Python functions and constants (e.g. print, len).
Use the 'global' keyword to modify global variables from inside a function, and 'nonlocal' for enclosing scopes.

---

# Code Examples & Output

```python
x = 100  # Global scope

def modify_without_global():
    x = 50  # Creates a NEW local variable x!
    print("Inside local x:", x)

modify_without_global()
print("Global x unchanged:", x)

def modify_with_global():
    global x
    x = 200  # Modifies the actual global x!

modify_with_global()
print("Global x modified:", x)
```

**Expected Output:**
```text
Inside local x: 50
Global x unchanged: 100
Global x modified: 200
```

---

# Best Practices & Common Pitfalls

Minimizing reliance on global variables makes code modular, testable, and thread-safe.

---

# Practice Quiz

### 1. What does the LEGB acronym stand for in Python variable resolution?
- A) Local, Enclosing, Global, Built-in
- B) Logical, External, General, Binary
- C) Linear, Execution, Grid, Block
- D) Loop, Engine, Global, Base
**Answer:** A
**Explanation:** LEGB stands for Local, Enclosing, Global, Built-in.

---

### 2. Which keyword allows modifying an outer function's variable from an inner closure?
- A) global
- B) nonlocal
- C) outer
- D) super
**Answer:** B
**Explanation:** 'nonlocal' binds to the enclosing function's variable.


---

# Practice Challenge

Create an outer function 'counter()' returning an inner function that increments a nonlocal count variable on each call.
