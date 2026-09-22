---
id: python-introduction
slug: python-introduction
course: python-for-beginners
chapter: Introduction and Setup
topic: "Python Introduction: The Universal Programming Language"
difficulty: Beginner
readingTime: 12
order: 1
keywords: ["python introduction", "what is python", "guido van rossum", "interpreted vs compiled", "python features", "python applications"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# What is Python?

- Python is an `interpreted` and a `high-level` programming language.
- It was created by `Guido Van Rossum` in 1989 and first released in 1991. 
- Python is a dynamically typed, general purpose programming language that supports an `object-oriented` programming approach as well as a functional programming approach.
___


## What is Python used for

-   It is used to create `softwares`.
-   It is used to create `Games`.
-   It is used to create `web applications`.
-   It can be used to handle databases.
-   It is used in AI and `Machine Learning` to simulate human behavior and to learn from past data without hard coding.
-   It is used in `business` and `accounting` to perform `complex mathematical operations` along with quantitative and qualitative analysis.
-   Python is used in `Data Visualization` to create plots and graphical representations.
-   Python helps in `Data Analytics` to analyze and understand raw data for insights and trends.


## Features of Python

-   Python is `simple` and `easy` to understand.
-   It is `Interpreted` and `platform-independent` which makes debugging very easy.
-   Python is an `open-source` programming language.
-   Python provides very big library support. Some of the popular libraries include NumPy, Tensorflow, Selenium, OpenCV, etc.
-   It is possible to `integrate` other `programming languages` within python.

## Why Learn Python?

    1. **Easy to Learn and Use**: Python's simple syntax and readability make it an ideal language for beginners. It allows you to focus on learning programming concepts without getting bogged down by complex syntax.
    2. **Versatile and Powerful**: Python can be used for a wide variety of applications, including web development, data science, machine learning, automation, and more.
    3. **Strong Community Support**: Python has a large and active community, which means you'll find plenty of resources, tutorials, and libraries to help you solve problems and extend your knowledge.
    4. **Career Opportunities**: Python is in high demand across many industries, offering numerous job opportunities for developers, data scientists, and software engineers.



# Multiple Choice Questions

### 1. Who created the Python programming language and in which year was it first released?
A. James Gosling in 1995
B. Guido van Rossum in 1991
C. Dennis Ritchie in 1972
D. Bjarne Stroustrup in 1983
**Answer:** B

**Explanation:** Python was conceived in the late 1980s and officially released in 1991 by Dutch programmer Guido van Rossum at CWI in the Netherlands.

---

### 2. What is the role of the Python Virtual Machine (PVM)?
A. It compiles Python code into HTML and CSS
B. It acts as the runtime engine that executes compiled Python bytecode instruction-by-instruction on the host CPU
C. It scans the hard drive for malware
D. It connects the computer to local Wi-Fi networks
**Answer:** B

**Explanation:** When a Python script runs, the compiler converts source code into bytecode (`.pyc`). The Python Virtual Machine (PVM) is the interpreter engine that executes this bytecode.

---

### 3. Why is Python described as a "dynamically typed" programming language?
A. Variable types must be declared using explicit C++ keywords
B. Variable data types are determined and checked automatically at runtime, without requiring explicit type declarations
C. Python only supports numeric data types
D. Python code can only run inside dynamic web pages
**Answer:** B

**Explanation:** In dynamically typed languages like Python, you do not declare types like `int age = 15;`. Writing `age = 15` automatically binds the variable name to an integer object in memory at runtime.

---

### 4. What does the term "Batteries Included" mean in the context of Python?
A. Python requires rechargeable lithium-ion hardware batteries to function
B. Python comes bundled with a massive standard library containing built-in modules for math, file I/O, networking, and date handling
C. Python can only run on mobile laptops
D. Python scripts must be executed with battery saver mode turned off
**Answer:** B

**Explanation:** "Batteries Included" is Python's official philosophy describing its extensive standard library. Right out of the box, Python can parse JSON, compute statistical formulas, and handle files without installing external tools.

---

### 5. Which command can you run inside an interactive Python session to view the guiding principles of Python design?
A. `import help`
B. `import this`
C. `python --rules`
D. `show guidelines`
**Answer:** B

**Explanation:** Executing `import this` displays "The Zen of Python", a collection of 19 guiding software engineering aphorisms authored by Tim Peters.

---

# Hands-On Practice Challenge: Your First Python Program

Write, run, and understand this complete Python program that demonstrates printing, dynamic variables, and f-string output.

```python
# ==========================================================
# Challenge 1: Welcome to Python Programming
# MSK Institute of Technology - Computer Science Division
# ==========================================================

# 1. Store student details in dynamic variables
student_name = "Aarav Sharma"
batch = "Class 11 - Computer Science"
institute = "MSK Institute"
daily_coding_minutes = 45

# 2. Print formatted banner using f-strings
print("=" * 45)
print(f"  WELCOME TO PYTHON PROGRAMMING, {student_name.upper()}!")
print("=" * 45)

# 3. Compute study goals
weekly_hours = (daily_coding_minutes * 7) / 60

print(f"Scholar Name      : {student_name}")
print(f"Enrolled Batch    : {batch}")
print(f"Learning Center   : {institute}")
print(f"Daily Goal        : {daily_coding_minutes} minutes")
print(f"Target Commitment : {weekly_hours:.1f} hours per week")
print("=" * 45)
print("Tip: 'Simple is better than complex.' - The Zen of Python")
```

### Expected Program Output:
```text
=============================================
  WELCOME TO PYTHON PROGRAMMING, AARAV SHARMA!
=============================================
Scholar Name      : Aarav Sharma
Enrolled Batch    : Class 11 - Computer Science
Learning Center   : MSK Institute
Daily Goal        : 45 minutes
Target Commitment : 5.2 hours per week
=============================================
Tip: 'Simple is better than complex.' - The Zen of Python
```
