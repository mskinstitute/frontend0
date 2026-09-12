---
id: vs-code-setup
slug: vs-code-setup
course: python-for-beginners
chapter: Introduction and Setup
topic: "VS Code Setup for Python: Extensions, Terminal, and Configuration"
difficulty: Beginner
readingTime: 12
order: 2
keywords: ["vs code python setup", "visual studio code python", "pylance extension", "select python interpreter", "python integrated terminal", "code editor python"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# VS Code Setup for Python: Extensions, Terminal, and Configuration

Imagine an architect or civil engineer who has to draft building plans. They could draw sketches on a rough napkin using a leaky ballpoint pen, but professional blueprints require a dedicated drafting table with T-squares, precision compasses, calibrated rulers, and erasable pencils. 

In software engineering, your **Integrated Development Environment (IDE)** is that precision drafting table. While Python comes with a rudimentary editor called IDLE, professional software engineers across India and global tech firms write Python inside **Visual Studio Code (VS Code)**. With syntax highlighting, real-time error squiggly lines, automatic autocomplete (IntelliSense), and an integrated terminal, VS Code supercharges your coding speed!

---

## 1. The Anatomy of a Modern Python Development Setup

```
+-------------------------------------------------------------------------+
|                  VS CODE PYTHON WORKBENCH ARCHITECTURE                  |
+-------------------------------------------------------------------------+

  +---------------------------------------------------------------------+
  | File Explorer   | Editor Tab (main.py)                              |
  |  - main.py      |   1  # Real-time syntax highlighting              |
  |  - utils.py     |   2  student_name = "Priya"                       |
  |  - .venv/       |   3  print(f"Hello, {student_name}!")             |
  |                 |                                                   |
  | Extensions (🧩) | IntelliSense Popup:                              |
  |  - Python (MS)  |   [student_name: str]                             |
  |  - Pylance      +---------------------------------------------------+
  |                 | Integrated Terminal (Ctrl + `)                    |
  |                 | PS C:\Users\Student> python main.py               |
  |                 | Hello, Priya!                                     |
  +-----------------+---------------------------------------------------+
  | Status Bar: Python 3.12.2 64-bit ('venv': venv) | UTF-8 | Spaces: 4 |
  +---------------------------------------------------------------------+
```

---

## 2. Step-by-Step Setup Guide

### Step 1: Install Visual Studio Code
Download and install the official free installer from [code.visualstudio.com](https://code.visualstudio.com) for Windows, macOS, or Linux.

### Step 2: Install Essential Extensions
Open the Extensions view (`Ctrl + Shift + X` on Windows/Linux or `Cmd + Shift + X` on macOS):
1. **Python (by Microsoft):** The official language pack providing linting, debugging, code navigation, and formatting.
2. **Pylance (by Microsoft):** High-performance language server delivering fast autocomplete, type inference, and parameter hints.

### Step 3: Select Your Python Interpreter
VS Code needs to know which installed version of Python to run:
1. Press `Ctrl + Shift + P` (`Cmd + Shift + P`) to open the **Command Palette**.
2. Type `Python: Select Interpreter` and press Enter.
3. Choose the latest recommended version (e.g., `Python 3.12.x` or your project virtual environment).

---

## 3. Running Your Code in VS Code

There are three ways to execute a Python script in VS Code:

| Execution Method | How to Trigger | When to Use |
| :--- | :--- | :--- |
| **1. The Play Button** | Click the triangle `▶` icon in the top-right corner | Easiest for beginners; opens terminal automatically |
| **2. Keyboard Shortcut** | Press `Ctrl + F5` (Run Without Debugging) | Fastest way during continuous coding practice |
| **3. Integrated Terminal** | Press `` Ctrl + ` `` to open terminal, then type `python app.py` | Professional standard; allows passing command-line flags |

---

## 4. Recommended `settings.json` Configuration

To keep your code clean, add these settings to your user settings (`Ctrl + ,` $\to$ Open Settings JSON):

```json
{
  "python.analysis.typeCheckingMode": "basic",
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": true,
  "files.autoSave": "afterDelay",
  "editor.rulers": [79, 88]
}
```

- **`editor.formatOnSave: true`:** Cleans up indentation and whitespace automatically every time you press `Ctrl + S`.
- **`editor.rulers: [79, 88]`:** Shows a subtle vertical guideline marking the PEP 8 recommended maximum line length!

---

## 5. Do's and Don'ts of VS Code Configuration

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Indentation** | Enforce 4 spaces per tab (`editor.insertSpaces: true`). | Mix tab characters with space bars in the same file. |
| **Interpreter** | Verify the bottom-right status bar shows the correct Python version. | Run scripts without selecting an interpreter, causing "Python not found" warnings. |
| **Extensions** | Install trusted extensions from verified publishers (Microsoft, Red Hat). | Install 50 random unverified plugins that slow down VS Code launch times. |
| **File Saving** | Save your file (`Ctrl + S`) before running in terminal. | Run the terminal command on an unsaved file (indicated by a white circle on the tab). |

---

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  VS CODE FOR PYTHON CHEAT SHEET                         |
+-------------------------------------------------------------------------+

  - Command Palette:      Ctrl + Shift + P (Cmd + Shift + P on macOS)
  - Toggle Terminal:      Ctrl + ` (Backtick)
  - Run Script Shortcut:  Ctrl + F5 (Run Without Debugging)
  - Core Extensions:      Python (Microsoft) + Pylance
  - Status Bar Check:     Bottom-right shows active Python interpreter version
```

---

# Multiple Choice Questions

### 1. Which official extension must be installed in VS Code to enable rich Python autocomplete, linting, and debugging?
A. Python by Microsoft
B. Java Development Kit
C. C-Sharp Dev Kit
D. Live Server

**Answer:** A
**Explanation:** The official "Python" extension created by Microsoft (which bundles Pylance) is the primary plugin required for Python language support, debugging, and IntelliSense in VS Code.

---

### 2. Which keyboard shortcut opens the Command Palette in VS Code on Windows?
A. `Ctrl + Shift + P`
B. `Alt + F4`
C. `Ctrl + Z`
D. `Shift + Esc`

**Answer:** A
**Explanation:** `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS) opens the Command Palette, allowing you to search and execute any editor command, such as `Python: Select Interpreter`.

---

### 3. What does Pylance do in VS Code when you write Python code?
A. It plays background music while coding
B. It acts as the language server, providing instant type information, auto-completion popups, and syntax error diagnostics
C. It connects to the internet to back up files
D. It compiles Python into C++ code

**Answer:** B
**Explanation:** Pylance is Microsoft's high-performance language server for Python. It analyzes code as you type, offering smart auto-completions, parameter hints, and type checking.

---

### 4. What does a solid white circle on a file's tab in VS Code signify?
A. The file has been successfully uploaded to GitHub
B. The file contains unsaved changes that will not be executed until saved (`Ctrl + S`)
C. The file has syntax errors
D. Python is currently executing that file

**Answer:** B
**Explanation:** A white dot or circle on the editor tab header indicates that the file is "dirty" (has unsaved modifications). If you run `python app.py` in the terminal without saving, Python will run the old version on disk!

---

### 5. Why is the setting `"editor.insertSpaces": true` essential for Python developers?
A. Python does not allow spaces in code
B. Python strictly prohibits mixing tab characters and spaces for indentation; using spaces prevents `TabError: inconsistent use of tabs and spaces in indentation`
C. It saves hard drive space
D. It prevents Windows from shutting down

**Answer:** B
**Explanation:** Python uses indentation to define code blocks. Mixing physical Tab characters (`\t`) with Space characters (` `) triggers fatal indentation errors in Python 3. `insertSpaces: true` converts every Tab keypress into consistent spaces.

---

# Hands-On Practice Challenge: Environment Diagnostic Script

Create a new file named `env_check.py` in VS Code, paste this diagnostic script, and run it using `Ctrl + F5` to inspect your development environment.

```python
# ==========================================================
# Challenge 2: Python Environment Diagnostic
# Run this file inside VS Code to verify your setup!
# ==========================================================

import sys
import os
import platform

print("=" * 55)
print("     MSK INSTITUTE - PYTHON WORKBENCH DIAGNOSTIC")
print("=" * 55)

# 1. Python Version Telemetry
major = sys.version_info.major
minor = sys.version_info.minor
micro = sys.version_info.micro

print(f"Python Version Detected : {major}.{minor}.{micro}")
print(f"Operating System        : {platform.system()} ({platform.release()})")
print(f"Machine Architecture    : {platform.machine()}")

# 2. Executable Path
print(f"Interpreter Binary Path : {sys.executable}")

# 3. Current Working Directory
print(f"Project Workspace Folder: {os.getcwd()}")
print("=" * 55)

# 4. Version Verification Logic
if major >= 3 and minor >= 10:
    print("STATUS: EXCELLENT! Modern Python 3.10+ detected.")
    print("You are ready to learn modern syntax like match-case and structural typing.")
else:
    print("STATUS: OUTDATED. Please upgrade to Python 3.10 or newer.")

print("=" * 55)
print("Tip: Use Ctrl + ` to toggle your VS Code terminal anytime.")
```

### Expected Program Output:
```text
=======================================================
     MSK INSTITUTE - PYTHON WORKBENCH DIAGNOSTIC
=======================================================
Python Version Detected : 3.12.2
Operating System        : Windows (10.0.26100)
Machine Architecture    : AMD64
Interpreter Binary Path : C:\Users\Student\AppData\Local\Programs\Python\Python312\python.exe
Project Workspace Folder: D:\Sumit\MSK-Institute-Website
=======================================================
STATUS: EXCELLENT! Modern Python 3.10+ detected.
You are ready to learn modern syntax like match-case and structural typing.
=======================================================
Tip: Use Ctrl + ` to toggle your VS Code terminal anytime.
```
