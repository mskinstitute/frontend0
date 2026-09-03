---
id: python-python-setup
slug: python-setup
course: python-for-beginners
chapter: 1
topic: 1.3
title: Python Setup
description: Downloading and installing Python, configuring system PATH, and running code via the terminal and REPL.
difficulty: Beginner
readingTime: 8
order: 3
keywords:
  - python setup
  - path
  - python --version
  - install
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Python Setup

Setting up Python on your operating system provides the underlying runtime required to execute all Python scripts.

---

# Key Concepts & Detailed Explanation

When installing Python on Windows:
- Always check the box 'Add python.exe to PATH' at the bottom of the installer window.
- Verify the installation by opening PowerShell or CMD and running 'python --version'.
- Launch the interactive REPL by typing 'python'. The REPL (Read-Eval-Print Loop) is ideal for testing snippets of code immediately.

---

# Code Examples & Output

```python
# In Terminal:
# $ python --version
# Output: Python 3.12.x

# You can also run code directly from command line:
# $ python -c "print('Direct execution from terminal')"
```

**Expected Output:**
```text
Python 3.12.x
Direct execution from terminal
```

---

# Best Practices & Common Pitfalls

If 'python' is not recognized in terminal, rerun the installer and select 'Modify' -> enable 'Add to PATH'.

---

# Practice Quiz

### 1. What command verifies that Python is properly recognized on your system?
- A) python --version
- B) python.start()
- C) check python
- D) verify --py
**Answer:** A
**Explanation:** 'python --version' outputs the active Python version.

---

### 2. What does REPL stand for?
- A) Read-Eval-Print Loop
- B) Run-Execute-Package-Link
- C) Recursive-Engine-Programming-Language
- D) Real-time-Embedded-Process-Logic
**Answer:** A
**Explanation:** REPL stands for Read-Eval-Print Loop.


---

# Practice Challenge

Open your system terminal, launch the Python REPL, evaluate 125 * 8, and exit cleanly.
