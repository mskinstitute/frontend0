---
id: python-set-comprehension
slug: set-comprehension
course: python-for-beginners
chapter: 13
topic: 13.8
title: Set Comprehension
description: Creating unique filtered sets with set comprehension syntax: {expr for item in iterable}.
difficulty: Beginner
readingTime: 8
order: 68
keywords:
  - set comprehension
  - comprehensions
  - unique comprehension
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Set Comprehension

Set comprehensions use curly braces {} to construct unique sets from transformed iterables.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Extract unique word lengths
words = ["Python", "Code", "Web", "Dev", "Python", "FullStack"]
unique_lengths = {len(w) for w in words}
print("Unique word lengths:", unique_lengths)

# Set comprehension with filter
evens = {x for x in range(15) if x % 2 == 0}
print("Unique even set:", evens)
```

**Expected Output:**
```text
Unique word lengths: {3, 4, 6, 9}
Unique even set: {0, 2, 4, 6, 8, 10, 12, 14}
```

---

# Best Practices & Common Pitfalls

Notice the curly brackets: '[x for x in ...]' makes a list; '{x for x in ...}' makes a set.

---

# Practice Quiz

### 1. Which brackets designate a set comprehension in Python?
- A) []
- B) {}
- C) ()
- D) <>
**Answer:** B
**Explanation:** Curly braces {} define a set comprehension.

---

### 2. What does '{x % 3 for x in range(10)}' produce?
- A) {0, 1, 2}
- B) {0, 1, 2, 0, 1, 2, ...}
- C) [0, 1, 2]
- D) Error
**Answer:** A
**Explanation:** Because sets deduplicate, only the unique remainders {0, 1, 2} are retained.


---

# Practice Challenge

Extract all unique vowels present in the sentence 'MSK Institute of Technology and Management' using set comprehension.
