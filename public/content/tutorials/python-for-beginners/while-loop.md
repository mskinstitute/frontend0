---
id: python-while-loop
slug: while-loop
course: python-for-beginners
chapter: 13
topic: 13.1
title: While Loop
description: Condition-controlled repetition, loop counters, and preventing infinite loops.
difficulty: Beginner
readingTime: 8
order: 61
keywords:
  - while loop
  - iteration
  - infinite loop
  - counter
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# While Loop

A while loop repeatedly executes a block of code as long as its condition remains True.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
count = 1

while count <= 5:
    print(f"Iteration #{count}")
    count += 1  # Crucial: update counter!

print("Loop finished!")
```

**Expected Output:**
```text
Iteration #1
Iteration #2
Iteration #3
Iteration #4
Iteration #5
Loop finished!
```

---

# Best Practices & Common Pitfalls

Always ensure the while loop's condition will eventually evaluate to False, or the program will freeze in an infinite loop.

---

# Practice Quiz

### 1. What happens if a while loop's condition never becomes False?
- A) The computer shuts down
- B) It runs indefinitely (infinite loop)
- C) Python raises InfiniteError
- D) It runs 1000 times then stops
**Answer:** B
**Explanation:** It creates an infinite loop that continues until terminated by the OS (Ctrl+C).

---

### 2. Which statement increments a counter 'i' by 1 inside a while loop?
- A) i++
- B) i += 1
- C) increment(i)
- D) i =+ 1
**Answer:** B
**Explanation:** Python does not have 'i++'; use 'i += 1'.


---

# Practice Challenge

Write a while loop that prints all even numbers between 2 and 20.
