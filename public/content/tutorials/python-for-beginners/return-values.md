---
id: python-return-values
slug: return-values
course: python-for-beginners
chapter: 14
topic: 14.4
title: Return Values
description: The return statement, returning multiple values via tuples, and returning None implicitly.
difficulty: Beginner
readingTime: 8
order: 73
keywords:
  - return
  - return multiple values
  - None
  - functions
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Return Values

Functions use the return statement to pass computed results back to the caller.

---

# Key Concepts & Detailed Explanation

Key points:
- Once 'return' is executed, function execution halts immediately.
- If a function has no return statement, it implicitly returns 'None'.
- Returning comma-separated values ('return a, b, c') packs them into a tuple, allowing multiple return values!

---

# Code Examples & Output

```python
def get_min_max_avg(scores):
    """Returns multiple statistics packaged in a tuple."""
    return min(scores), max(scores), sum(scores) / len(scores)

test_scores = [78, 92, 85, 96, 70]
lowest, highest, average = get_min_max_avg(test_scores)

print(f"Min: {lowest}, Max: {highest}, Avg: {average:.1f}")
```

**Expected Output:**
```text
Min: 70, Max: 96, Avg: 84.2
```

---

# Best Practices & Common Pitfalls

Unpack multiple return values directly at the call site for clean, readable code.

---

# Practice Quiz

### 1. What does a Python function return if there is no explicit 'return' statement?
- A) 0
- B) False
- C) None
- D) Empty string
**Answer:** C
**Explanation:** Python functions return None by default.

---

### 2. How does Python return multiple values from a function?
- A) Using pointers
- B) By packing values into a tuple
- C) By creating an array
- D) It is not possible
**Answer:** B
**Explanation:** Multiple comma-separated values are automatically packed into a tuple.


---

# Practice Challenge

Write a function that accepts a sentence and returns its word count, character count, and whether it contains digits.
