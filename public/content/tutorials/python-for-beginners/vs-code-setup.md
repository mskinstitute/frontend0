---
id: python-vs-code-setup
slug: vs-code-setup
course: python-for-beginners
chapter: 1
topic: 1.2
title: VS Code Setup
description: Configuring Visual Studio Code with the official Python extension, Pylance, and integrated terminal.
difficulty: Beginner
readingTime: 8
order: 2
keywords:
  - vs code
  - vscode setup
  - python extension
  - ide
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# VS Code Setup

Visual Studio Code is the premier free code editor for Python, offering smart autocompletion, debugging, and terminal integration.

---

# Key Concepts & Detailed Explanation

To get the most out of Python development in VS Code:
1. Install VS Code from code.visualstudio.com.
2. Ensure you check 'Add to PATH' during installation.
3. Open the Extensions Marketplace (Ctrl+Shift+X) and search for 'Python' by Microsoft.
4. Install the Python extension bundle, which includes Pylance for blazing-fast IntelliSense type hints.
5. Select your Python interpreter via Ctrl+Shift+P -> 'Python: Select Interpreter'.

---

# Code Examples & Output

```python
# Run this inside VS Code to verify your environment
import sys
import os

print("Python Executable:", sys.executable)
print("Current Working Dir:", os.getcwd())
print("VS Code Python Environment is working perfectly!")
```
```output
Python Executable: C:\Users\...\python.exe
Current Working Dir: D:\MSK-Institute
VS Code Python Environment is working perfectly!
```

---

# Best Practices & Common Pitfalls

Use Ctrl + ~ to toggle the integrated terminal in VS Code quickly.

---

# Practice Quiz

### 1. Which key combination opens the Extensions Marketplace in VS Code?
- A) Ctrl + Shift + X
- B) Ctrl + Alt + Del
- C) Ctrl + Shift + P
- D) Ctrl + B
**Answer:** A
**Explanation:** Ctrl + Shift + X opens the Extensions view.

---

### 2. Which Microsoft extension provides intelligent Python completions in VS Code?
- A) Live Server
- B) Pylance (part of Python Extension)
- C) C/C++
- D) Prettier
**Answer:** B
**Explanation:** Pylance provides rich type checking and IntelliSense.


---

# Practice Challenge

Open VS Code, create a new folder named 'python_lab', create 'app.py', and run it using the built-in terminal.
