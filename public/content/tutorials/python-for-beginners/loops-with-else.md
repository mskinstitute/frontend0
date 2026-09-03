---
id: python-loops-with-else
slug: loops-with-else
course: python-for-beginners
chapter: 13
topic: 13.5
title: Loops with Else
description: Understanding the for-else and while-else construct in Python.
difficulty: Beginner
readingTime: 8
order: 65
keywords:
  - for else
  - while else
  - loop else
  - search pattern
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Loops with Else

Python features a unique 'else' clause for loops that executes ONLY if the loop completes without hitting a 'break'.

---

# Key Concepts & Detailed Explanation

How loop-else works:
- If a loop finishes all iterations naturally, the else block runs.
- If the loop terminates early via 'break', the else block is SKIPPED.
- This is exceptionally useful for search algorithms (e.g. checking for prime numbers).

---

# Code Examples & Output

```python
target = 7
numbers = [1, 3, 5, 7, 9]

# Search with for-else
for num in numbers:
    if num == target:
        print(f"Found target: {target}")
        break
else:
    print("Target not found in list")

# Prime number check
n = 13
for i in range(2, int(n**0.5) + 1):
    if n % i == 0:
        print(f"{n} is not prime")
        break
else:
    print(f"{n} is a Prime Number!")
```

**Expected Output:**
```text
Found target: 7
13 is a Prime Number!
```

---

# Best Practices & Common Pitfalls

Think of loop-else as 'nobreak': 'execute this else block if no break occurred'.

---

# Practice Quiz

### 1. When does the 'else' block attached to a for loop execute?
- A) Always on every iteration
- B) Only if the loop finishes naturally without encountering 'break'
- C) Only when an error occurs
- D) Never
**Answer:** B
**Explanation:** The else block executes only if the loop was not broken by 'break'.

---

### 2. If 'break' is triggered inside a loop, does the loop's 'else' block execute?
- A) Yes
- B) No, it is skipped
- C) Only in while loops
- D) Only in Python 3
**Answer:** B
**Explanation:** Hitting break bypasses the loop-else block.


---

# Practice Challenge

Write a program that searches for a specific student name in a list and prints 'Student not registered' using for-else.
