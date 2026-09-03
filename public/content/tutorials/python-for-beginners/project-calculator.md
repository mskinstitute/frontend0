---
id: python-project-calculator
slug: project-calculator
course: python-for-beginners
chapter: 14
topic: 14.8
title: Project: Calculator
description: Build a modular command-line calculator with functions for basic and advanced math.
difficulty: Beginner
readingTime: 12
order: 77
keywords:
  - project
  - calculator
  - modular functions
  - cli math
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Project: Calculator

Combine functions, return values, control flow, and error handling into a modular CLI Calculator.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Modular Calculator Project
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        return "Error: Division by zero!"
    return a / b
def power(a, b): return a ** b

operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "^": power
}

def calculate(op, a, b):
    func = operations.get(op)
    if func:
        return func(a, b)
    return "Error: Invalid operator"

# Testing calculator
print("10 + 5 =", calculate("+", 10, 5))
print("10 / 2 =", calculate("/", 10, 2))
print("10 / 0 =", calculate("/", 10, 0))
print("2 ^ 8  =", calculate("^", 2, 8))
```

**Expected Output:**
```text
10 + 5 = 15
10 / 2 = 5.0
10 / 0 = Error: Division by zero!
2 ^ 8  = 256
```

---

# Best Practices & Common Pitfalls

Using a dictionary to map operators to function references is a clean implementation of the Strategy Pattern.

---

# Practice Quiz

### 1. Why is mapping functions inside a dictionary cleaner than a massive if-elif chain?
- A) It is dynamic, modular, and easier to extend with new operations
- B) It uses less CPU clock cycles
- C) Functions can't be used in if statements
- D) None
**Answer:** A
**Explanation:** Dictionary function dispatch makes code modular and extensible.

---

### 2. What should a robust division function check for before calculating?
- A) Negative numbers
- B) Division by zero divisor (b == 0)
- C) Floats
- D) Strings
**Answer:** B
**Explanation:** Division by zero must be guarded against to prevent ZeroDivisionError.


---

# Practice Challenge

Add modulus (%) and square root operations to the modular calculator.
