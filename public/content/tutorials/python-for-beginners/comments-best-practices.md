---
id: python-comments-best-practices
slug: comments-best-practices
course: python-for-beginners
chapter: 1
topic: 1.5
title: Comments & Best Practices
description: Writing effective single-line comments, docstrings, and following PEP 8 conventions.
difficulty: Beginner
readingTime: 8
order: 5
keywords:
  - comments
  - docstrings
  - pep 8
  - clean code
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Comments & Best Practices

Comments and docstrings document the intent behind code, making it readable and maintainable.

---

# Key Concepts & Detailed Explanation

Good code documents itself, but great code explains 'why' non-obvious logic exists.
- Single-line comments start with '#'.
- Multi-line docstrings use triple quotes (''' or """) right beneath function/class definitions.
- Follow PEP 8 guidelines: descriptive variable names, snake_case for functions, and 79-character line limits.

---

# Code Examples & Output

```python
# Compute simple interest
def compute_interest(principal, rate_percent, years):
    """
    Calculate simple interest.
    
    Args:
        principal (float): Amount invested
        rate_percent (float): Annual interest rate
        years (int): Number of years
    Returns:
        float: Total interest earned
    """
    interest = (principal * rate_percent * years) / 100
    return interest

print("Interest earned:", compute_interest(10000, 7.5, 3))
```

**Expected Output:**
```text
Interest earned: 2250.0
```

---

# Best Practices & Common Pitfalls

Don't write comments that simply repeat the code (e.g. '# add 1 to x'). Explain the business reason.

---

# Practice Quiz

### 1. Which syntax defines a docstring in Python?
- A) // docstring
- B) /* docstring */
- C) Triple quotes """ docstring """
- D) <!-- docstring -->
**Answer:** C
**Explanation:** Triple quotes are used for multi-line docstrings.

---

### 2. What naming convention does PEP 8 mandate for variables and functions?
- A) camelCase
- B) snake_case
- C) kebab-case
- D) PascalCase
**Answer:** B
**Explanation:** PEP 8 prescribes snake_case (e.g. user_age, calculate_tax).


---

# Practice Challenge

Write a function 'convert_celsius_to_fahrenheit' with a complete docstring and inline comments.
