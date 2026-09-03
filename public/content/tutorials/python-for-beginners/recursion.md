---
id: python-recursion
slug: recursion
course: python-for-beginners
chapter: 14
topic: 14.6
title: Recursion
description: Understanding base cases, recursive steps, the call stack, and sys.getrecursionlimit().
difficulty: Beginner
readingTime: 9
order: 75
keywords:
  - recursion
  - base case
  - factorial
  - call stack
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Recursion

Recursion occurs when a function calls itself to solve smaller subproblems.

---

# Key Concepts & Detailed Explanation

The two essential parts of every recursive function:
1. **Base Case:** Condition that stops recursion and returns a value. Without this, the function recurses infinitely!
2. **Recursive Step:** The function calling itself with modified arguments moving closer to the base case.

---

# Code Examples & Output

```python
# Factorial: n! = n * (n - 1)!
def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive step

print("5! =", factorial(5)) # 5 * 4 * 3 * 2 * 1 = 120

# Fibonacci sequence recursively
def fibonacci(n):
    if n <= 0: return 0
    if n == 1: return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(7):", fibonacci(7))
```

**Expected Output:**
```text
5! = 120
Fibonacci(7): 13
```

---

# Best Practices & Common Pitfalls

Python has a default recursion depth limit (typically 1000) to prevent stack overflow crashes. Check it with sys.getrecursionlimit().

---

# Practice Quiz

### 1. What happens if a recursive function lacks a valid base case?
- A) It returns 0
- B) It raises RecursionError (maximum recursion depth exceeded)
- C) It freezes forever
- D) It returns None
**Answer:** B
**Explanation:** Missing base cases cause RecursionError when the call stack limit is reached.

---

### 2. What is the base case in factorial(n)?
- A) n == 10
- B) n <= 1
- C) n == 0 only
- D) n < 0
**Answer:** B
**Explanation:** When n <= 1, factorial returns 1 without further recursion.


---

# Practice Challenge

Write a recursive function 'sum_digits(n)' that computes the sum of all digits of an integer (e.g. 123 -> 6).
