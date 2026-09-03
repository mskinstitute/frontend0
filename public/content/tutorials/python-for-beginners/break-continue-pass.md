---
id: python-break-continue-pass
slug: break-continue-pass
course: python-for-beginners
chapter: 13
topic: 13.4
title: Break, Continue, Pass
description: Controlling loop iteration with break (exit), continue (skip), and pass (placeholder).
difficulty: Beginner
readingTime: 8
order: 64
keywords:
  - break
  - continue
  - pass
  - loop control
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Break, Continue, Pass

Fine-tune loop execution flow with break, continue, and pass.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# break: terminate loop early
print("--- break example ---")
for n in range(1, 10):
    if n == 4:
        break
    print(n, end=" ")
print()

# continue: skip current iteration
print("--- continue example (skip evens) ---")
for n in range(1, 6):
    if n % 2 == 0:
        continue
    print(n, end=" ")
print()

# pass: placeholder for future code
for n in range(3):
    pass  # TODO: implement logic
```

**Expected Output:**
```text
--- break example ---
1 2 3 
--- continue example (skip evens) ---
1 3 5 
```

---

# Best Practices & Common Pitfalls

Use 'pass' whenever Python requires a statement syntactically (such as empty functions, loops, or classes).

---

# Practice Quiz

### 1. Which statement immediately halts the loop and exits it?
- A) skip
- B) continue
- C) break
- D) pass
**Answer:** C
**Explanation:** 'break' exits the loop immediately.

---

### 2. What does 'continue' do inside a loop?
- A) Restarts the entire script
- B) Skips the rest of current iteration and proceeds to the next
- C) Exits the loop
- D) Pauses execution
**Answer:** B
**Explanation:** 'continue' skips remaining lines of the current iteration.


---

# Practice Challenge

Loop through numbers 1 to 20, skipping multiples of 3, and breaking if number reaches 17.
