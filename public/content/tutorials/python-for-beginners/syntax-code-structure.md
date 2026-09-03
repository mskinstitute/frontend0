---
id: python-syntax-code-structure
slug: syntax-code-structure
course: python-for-beginners
chapter: 1
topic: 1.4
title: Syntax & Code Structure
description: Master Python's indentation rules, colon syntax, statement blocks, and case sensitivity.
difficulty: Beginner
readingTime: 9
order: 4
keywords:
  - syntax
  - code structure
  - indentation
  - case sensitivity
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Syntax & Code Structure

Python's syntax enforces clean, readable code by replacing curly braces with structured indentation.

---

# Key Concepts & Detailed Explanation

In Python:
1. Every indented block starts after a colon (:).
2. The standard indentation level is 4 spaces. Never mix spaces and tabs.
3. Python is strictly case-sensitive: 'score', 'Score', and 'SCORE' are 3 different variables.

---

# Code Examples & Output

```python
# Demonstrating clean indentation
score = 88

if score >= 90:
    print("Grade: A+")
elif score >= 75:
    print("Grade: A")
    print("Well done!")
else:
    print("Grade: Passed")
```

**Expected Output:**
```text
Grade: A
Well done!
```

---

# Best Practices & Common Pitfalls

Configure VS Code to 'Insert Spaces when pressing Tab' with Tab Size set to 4.

---

# Practice Quiz

### 1. How many spaces are recommended for Python indentation according to PEP 8?
- A) 2 spaces
- B) 4 spaces
- C) 8 spaces
- D) 1 space
**Answer:** B
**Explanation:** PEP 8 prescribes exactly 4 spaces per indentation level.

---

### 2. What character must end the line preceding an indented block (such as an if statement)?
- A) ;
- B) {
- C) :
- D) ->
**Answer:** C
**Explanation:** A colon (:) precedes any indented block.


---

# Practice Challenge

Write an if-else statement checking if temperature > 30 and print appropriate messages with proper indentation.
