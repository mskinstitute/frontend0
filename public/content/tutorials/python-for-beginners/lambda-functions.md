---
id: python-lambda-functions
slug: lambda-functions
course: python-for-beginners
chapter: 14
topic: 14.5
title: Lambda Functions
description: Anonymous one-line functions (lambda arguments: expression) and usage with map(), filter(), sorted().
difficulty: Beginner
readingTime: 8
order: 74
keywords:
  - lambda
  - anonymous function
  - map
  - filter
  - sorted
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Lambda Functions

Lambda functions are small, anonymous functions defined in a single line without the def keyword.

---

# Key Concepts & Detailed Explanation

Syntax: `lambda arg1, arg2: expression`
Lambdas are commonly passed as short callbacks to higher-order functions:
- sorted(data, key=lambda x: ...): Custom sort key.
- filter(lambda x: ..., data): Filter elements.
- map(lambda x: ..., data): Transform elements.

---

# Code Examples & Output

```python
# Basic lambda
square = lambda x: x ** 2
print("Square of 6:", square(6))

# Sorting list of tuples by second element
students = [("Rahul", 88), ("Priya", 95), ("Ankit", 79)]
students.sort(key=lambda s: s[1], reverse=True)
print("Sorted by score:", students)

# Using filter with lambda
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda n: n % 2 == 0, numbers))
print("Evens filtered:", evens)
```

**Expected Output:**
```text
Square of 6: 36
Sorted by score: [('Priya', 95), ('Rahul', 88), ('Ankit', 79)]
Evens filtered: [2, 4, 6, 8]
```

---

# Best Practices & Common Pitfalls

Use lambdas for simple, disposable one-liners. If the logic requires multiple lines or statements, define a proper function with 'def'.

---

# Practice Quiz

### 1. Can a lambda function contain multiple statements or loops in Python?
- A) Yes
- B) No, lambdas can only contain a single expression
- C) Only with semicolons
- D) Only in Python 3.11+
**Answer:** B
**Explanation:** Python lambdas are restricted to a single expression.

---

### 2. What does 'lambda a, b: a + b' evaluate to?
- A) An anonymous function that sums two inputs
- B) A tuple
- C) SyntaxError
- D) None
**Answer:** A
**Explanation:** It creates a two-argument anonymous function.


---

# Practice Challenge

Use sorted() with a lambda key to sort a list of dictionaries [{'name': '...', 'age': ...}] by age.
