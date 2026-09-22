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

# Setting Up Visual Studio Code (VS Code)

Welcome to the second chapter of the Python Basic Course at MSK Institute. In this chapter, we'll guide you through setting up Visual Studio Code (VS Code), a powerful and popular code editor that will make your Python programming experience more efficient and enjoyable.

## Why Use VS Code?

VS Code is a free, open-source code editor developed by Microsoft. It offers numerous features that make coding easier, such as:
- Syntax highlighting and code snippets
- IntelliSense (smart code completion)
- Integrated terminal
- Debugging tools
- Extensions and plugins for various languages and tools

## Installing VS Code

### Step 1: Download VS Code
1. Visit the [VS Code website](https://code.visualstudio.com/).
2. Click on the download button for your operating system (Windows, macOS, or Linux).
3. Once the download is complete, run the installer and follow the prompts to install VS Code.

### Step 2: Install Python
1. If you haven't already, download and install Python from the official website: [python.org](https://www.python.org/).
2. Make sure to check the box that says "Add Python to PATH" during the installation process.

## Setting Up VS Code for Python

### Step 3: Open VS Code
1. Launch VS Code from your desktop or start menu.

### Step 4: Install Python Extension
1. Click on the Extensions icon in the Activity Bar on the side of the window or press `Ctrl+Shift+X`.
2. Search for "Python" and select the extension provided by Microsoft.
3. Click the "Install" button.

### Step 5: Configure Python Interpreter
1. Open the Command Palette by pressing `Ctrl+Shift+P`.
2. Type `Python: Select Interpreter` and select it from the dropdown list.
3. Choose the Python interpreter that you installed earlier (it should display the version number).

### Step 6: Create a New Python File
1. Open a new file by selecting `File > New File` or pressing `Ctrl+N`.
2. Save the file with a `.py` extension (e.g., `hello.py`).

### Step 7: Write Your First Python Program
1. In your new Python file, type the following code:
   ```python
   print("Hello, World!")
   ```
2. Save the file by selecting `File > Save` or pressing `Ctrl+S`.

### Step 8: Run Your Python Program
1. Open the integrated terminal by selecting `View > Terminal` or pressing `Ctrl+` (backtick).
2. In the terminal, navigate to the directory where your Python file is saved using the `cd` command.
3. Run your program by typing:
   ```sh
   python hello.py
   ```
4. You should see `Hello, World!` printed in the terminal.

## Additional VS Code Features

### Extensions
VS Code supports a wide range of extensions to enhance your coding experience. Some useful extensions for Python development include:
- **Pylint**: For code linting and quality checking.
- **Jupyter**: For working with Jupyter notebooks.
- **GitLens**: For powerful Git integration.

### Customization
VS Code is highly customizable. You can change themes, customize the layout, and set up keyboard shortcuts to suit your preferences. Explore the settings by navigating to `File > Preferences > Settings`.

---

Congratulations! You have successfully set up Visual Studio Code for Python development. You are now ready to start coding in Python. In the next chapter, we will dive deeper into Python's basic concepts and start writing some exciting programs.




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
