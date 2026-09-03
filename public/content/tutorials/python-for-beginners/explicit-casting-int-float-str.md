---
id: python-explicit-casting
slug: explicit-casting
course: python-for-beginners
chapter: 7
topic: 7.2
title: Explicit Casting (int(), float(), str())
description: Manual type conversion using int(), float(), str(), list(), and tuple().
difficulty: Beginner
readingTime: 8
order: 30
keywords:
  - explicit casting
  - int()
  - float()
  - str()
  - type casting
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Explicit Casting (int(), float(), str())

Explicit casting (type conversion) is manually initiated by the programmer using built-in conversion functions.

---

# Key Concepts & Detailed Explanation

Explicit casting functions:
- int(x): Converts to integer. Can parse string of digits or truncate float.
- float(x): Converts integer or valid string to float.
- str(x): Converts any Python object to its readable string representation.
- list(seq) / tuple(seq) / set(seq): Converts between collections.

---

# Code Examples & Output

```python
# Converting user input string to int and float
age_str = "21"
age = int(age_str)
print("Age next year:", age + 1)

price_str = "89.99"
price = float(price_str)
print("Total with tax:", price * 1.18)

# Number to string
order_id = 10429
message = "Order #" + str(order_id)
print(message)
```

**Expected Output:**
```text
Age next year: 22
Total with tax: 106.1882
Order #10429
```

---

# Best Practices & Common Pitfalls

Always wrap string-to-number conversions in try-except blocks when handling user input.

---

# Practice Quiz

### 1. What does float('123') return?
- A) 123
- B) 123.0
- C) ValueError
- D) None
**Answer:** B
**Explanation:** float('123') converts the string to 123.0.

---

### 2. How do you convert the tuple (1, 2, 3) into a list?
- A) list((1, 2, 3))
- B) convert((1, 2, 3))
- C) (1, 2, 3).toList()
- D) to_list()
**Answer:** A
**Explanation:** The list() constructor converts any iterable into a list.


---

# Practice Challenge

Accept two float strings, cast them to integers, and print their sum.
