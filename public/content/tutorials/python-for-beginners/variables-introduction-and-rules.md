---
id: python-variables-introduction-and-rules
slug: variables-introduction-and-rules
course: python-for-beginners
chapter: 2
topic: 2.1
title: Variables Introduction and Rules
description: Variables in Python, memory pointers, valid naming rules, and reserved keywords.
difficulty: Beginner
readingTime: 8
order: 6
keywords:
  - variables
  - naming rules
  - identifiers
  - keywords
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Variables Introduction and Rules

A variable is a labeled name that references an object stored in computer memory.

---

# Key Concepts & Detailed Explanation

In Python, variables do not store values directly; they store references (memory addresses) to objects.
Rules for identifiers:
1. Must begin with a letter (a-z, A-Z) or an underscore (_).
2. Cannot begin with a number.
3. Can only contain alphanumeric characters and underscores.
4. Cannot be a Python keyword (e.g. if, for, class, def, return).

---

# Code Examples & Output

```python
# Valid identifiers
student_name = "Amit"
_system_id = 9921
batch_2026 = "Morning"

print(student_name, _system_id, batch_2026)

# Check all reserved keywords
import keyword
print("Reserved keywords count:", len(keyword.kwlist))
```

**Expected Output:**
```text
Amit 9921 Morning
Reserved keywords count: 35
```

---

# Best Practices & Common Pitfalls

Never name your variables 'l' (lowercase L), 'O' (uppercase O), or 'I' (uppercase i) as they resemble numbers.

---

# Practice Quiz

### 1. Which of these is NOT a valid Python identifier?
- A) total_sum
- B) _cache
- C) 4th_quarter
- D) valueTwo
**Answer:** C
**Explanation:** Identifiers cannot start with a digit.

---

### 2. How many reserved keywords exist approximately in modern Python 3?
- A) 10
- B) 35
- C) 100
- D) 256
**Answer:** B
**Explanation:** Python 3 has approximately 35 reserved keywords.


---

# Practice Challenge

List 5 valid and 3 invalid variable names, explaining why each invalid one fails Python rules.
