---
id: python-nested-dictionaries
slug: nested-dictionaries
course: python-for-beginners
chapter: 11
topic: 11.6
title: Nested Dictionaries
description: Modeling real-world hierarchical data like JSON using dictionaries of dictionaries.
difficulty: Beginner
readingTime: 9
order: 54
keywords:
  - nested dictionaries
  - json
  - hierarchical data
  - multi-level dict
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Nested Dictionaries

Nested dictionaries contain dictionaries as values, mirroring modern REST API JSON formats.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
students_db = {
    "MSK-101": {
        "name": "Pooja Sharma",
        "course": "Python for Beginners",
        "marks": {"theory": 88, "practical": 94}
    },
    "MSK-102": {
        "name": "Aman Verma",
        "course": "Web Development",
        "marks": {"theory": 78, "practical": 85}
    }
}

# Accessing multi-level data
student_name = students_db["MSK-101"]["name"]
practical_score = students_db["MSK-101"]["marks"]["practical"]

print(f"Student: {student_name} | Practical Score: {practical_score}")
```

**Expected Output:**
```text
Student: Pooja Sharma | Practical Score: 94
```

---

# Best Practices & Common Pitfalls

Use multiple square brackets (dict[k1][k2][k3]) to navigate deep hierarchies safely.

---

# Practice Quiz

### 1. How do you access 'city' in 'users = {'u1': {'address': {'city': 'Agra'}}}'?
- A) users['u1', 'address', 'city']
- B) users['u1']['address']['city']
- C) users.u1.address.city
- D) users['city']
**Answer:** B
**Explanation:** Chain square brackets for each nested level: users['u1']['address']['city'].

---

### 2. Which common web data format directly maps to Python nested dictionaries?
- A) HTML
- B) CSV
- C) JSON
- D) Markdown
**Answer:** C
**Explanation:** JSON (JavaScript Object Notation) directly maps to Python nested dictionaries and lists.


---

# Practice Challenge

Create a nested dictionary representing a company with 2 departments, each having 2 employees.
