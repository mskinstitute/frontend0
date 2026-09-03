---
id: python-accessing-updating-items
slug: accessing-updating-items
course: python-for-beginners
chapter: 11
topic: 11.2
title: Accessing & Updating Items
description: Accessing values with square brackets vs .get() with fallback defaults, and updating keys.
difficulty: Beginner
readingTime: 8
order: 50
keywords:
  - .get()
  - accessing dict
  - updating dict
  - keyerror
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Accessing & Updating Items

Safely access values using the .get() method to avoid KeyError crashes.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
institute = {
    "name": "MSK Institute",
    "city": "Shikohabad",
    "courses": 15
}

# Bracket access (crashes if key doesn't exist!)
print("City:", institute["city"])

# Safe access with .get()
branch = institute.get("branch", "Main Campus (Default)")
print("Branch:", branch)

# Updating existing key & adding new key
institute["courses"] = 16       # Updated
institute["established"] = 2018 # New key added
print("Updated institute:", institute)
```

**Expected Output:**
```text
City: Shikohabad
Branch: Main Campus (Default)
Updated institute: {'name': 'MSK Institute', 'city': 'Shikohabad', 'courses': 16, 'established': 2018}
```

---

# Best Practices & Common Pitfalls

Always use .get(key, default) when reading keys that may not exist in external API responses or config files.

---

# Practice Quiz

### 1. What happens when you access a non-existent key with 'dict[key]'?
- A) Returns None
- B) Raises KeyError
- C) Returns False
- D) Creates the key
**Answer:** B
**Explanation:** Bracket access raises KeyError if the key is missing.

---

### 2. What does 'd.get("missing", "N/A")' return if "missing" is not in d?
- A) KeyError
- B) None
- C) "N/A"
- D) False
**Answer:** C
**Explanation:** .get() returns the provided fallback default.


---

# Practice Challenge

Write a program that looks up an employee's salary using .get() with a default of ₹25,000.
