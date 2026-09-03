---
id: python-constants-python-convention
slug: constants-python-convention
course: python-for-beginners
chapter: 2
topic: 2.5
title: Constants (Python Convention)
description: PEP 8 constant conventions with ALL_CAPS and enforcing constancy with typing.Final.
difficulty: Beginner
readingTime: 7
order: 10
keywords:
  - constants
  - pep 8
  - final
  - all caps
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Constants (Python Convention)

Constants represent fixed values that should never be altered throughout program execution.

---

# Key Concepts & Detailed Explanation

While languages like C++ or JavaScript provide 'const', Python relies on naming conventions:
- Use ALL_CAPS_WITH_UNDERSCORES to signal to developers that a value must not be altered.
- From Python 3.8+, you can import 'Final' from 'typing' so that static linters (like MyPy or Pylance) highlight accidental modifications.

---

# Code Examples & Output

```python
from typing import Final

# Conventional constants
MAX_USERS = 500
TAX_RATE: Final = 0.18

# Linters will flag reassignment
print(f"Max Users: {MAX_USERS}, Tax: {TAX_RATE * 100}%")
```

**Expected Output:**
```text
Max Users: 500, Tax: 18.0%
```

---

# Best Practices & Common Pitfalls

Define global constants in a dedicated 'config.py' or 'constants.py' file for large projects.

---

# Practice Quiz

### 1. What naming style indicates a constant in Python?
- A) camelCase
- B) ALL_CAPS
- C) snake_case
- D) lowercase
**Answer:** B
**Explanation:** ALL_CAPS is the PEP 8 convention for constants.

---

### 2. Which module provides the 'Final' type annotation to guard constants?
- A) constants
- B) typing
- C) sys
- D) math
**Answer:** B
**Explanation:** typing.Final informs type checkers of constant variables.


---

# Practice Challenge

Create a configuration dictionary with constants for DB_HOST, DB_PORT, and MAX_RETRIES.
