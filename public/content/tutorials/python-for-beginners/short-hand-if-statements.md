---
id: python-short-hand-if-statements
slug: short-hand-if-statements
course: python-for-beginners
chapter: 12
topic: 12.3
title: Short-hand If Statements
description: Writing concise one-line if statements for simple guards and checks.
difficulty: Beginner
readingTime: 7
order: 58
keywords:
  - short-hand if
  - one-line if
  - inline if
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Short-hand If Statements

When you have only one statement to execute, you can place it on the same line as the if keyword.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
score = 95

# One-line if
if score >= 90: print("Outstanding performance!")

# Multiple statements separated by semicolons (use sparingly)
if score == 95: print("Top scorer!"); bonus = 5; print("Bonus added:", bonus)
```

**Expected Output:**
```text
Outstanding performance!
Top scorer!
Bonus added: 5
```

---

# Best Practices & Common Pitfalls

Use short-hand if only for very simple one-liners; keep multiline indented blocks for readability.

---

# Practice Quiz

### 1. Is 'if x > 10: print(x)' valid Python syntax?
- A) Yes
- B) No, indentation on new line is required
- C) Only in Python 2
- D) SyntaxError
**Answer:** A
**Explanation:** Single-line short-hand if statements are completely valid in Python.

---

### 2. What symbol allows separating multiple statements on a single line?
- A) :
- B) ;
- C) ,
- D) |
**Answer:** B
**Explanation:** The semicolon (;) separates multiple statements on a single line.


---

# Practice Challenge

Write a short-hand if statement that prints 'Discount unlocked' if bill_amount > 1000.
