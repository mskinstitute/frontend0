---
id: python-nested-tuples
slug: nested-tuples
course: python-for-beginners
chapter: 9
topic: 9.6
title: Nested Tuples
description: Multidimensional tuples, nested structures, and mutable items inside immutable tuples.
difficulty: Beginner
readingTime: 8
order: 43
keywords:
  - nested tuples
  - tuple of lists
  - nested immutability
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Tuples

Tuples can contain other tuples or even mutable collections like lists.

---

# Key Concepts & Detailed Explanation

Crucial concept:
A tuple is immutable in terms of its references. If a tuple contains a mutable object (such as a list), the contents of that inner list CAN be modified!

---

# Code Examples & Output

```python
# Tuple containing lists
student_record = ("Vikram", [85, 90, 92])
print("Original:", student_record)

# The list INSIDE the tuple can be mutated!
student_record[1].append(95)
print("After adding mark:", student_record)

# Nested coordinates
grid = (
    (0, 0),
    (0, 1),
    (1, 0),
    (1, 1)
)
print("Top-right coordinate:", grid[1])
```

**Expected Output:**
```text
Original: ('Vikram', [85, 90, 92])
After adding mark: ('Vikram', [85, 90, 92, 95])
Top-right coordinate: (0, 1)
```

---

# Best Practices & Common Pitfalls

If you want 100% true immutability all the way down, ensure nested elements are also tuples or primitives.

---

# Practice Quiz

### 1. Can you modify a list that is placed inside a tuple?
- A) No, tuple makes all children immutable
- B) Yes, the list itself remains mutable
- C) Only with copy()
- D) Only in Python 2
**Answer:** B
**Explanation:** The tuple only locks its references; the list referenced inside is still mutable.

---

### 2. How do you access the value 4 in 't = ((1, 2), (3, 4))'?
- A) t[1][1]
- B) t[1, 1]
- C) t(1)(1)
- D) t[4]
**Answer:** A
**Explanation:** t[1][1] accesses the second element of the second inner tuple.


---

# Practice Challenge

Create a nested tuple representing 3 books with (Title, Author, Year) and print each book's title.
