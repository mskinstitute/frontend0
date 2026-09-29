---
id: variables-introduction-and-rules
slug: variables-introduction-and-rules
course: python-for-beginners
chapter: Variables
topic: "Variables Introduction and Naming Rules: Identifiers and Reserved Keywords"
difficulty: Beginner
readingTime: 12
order: 6
keywords: ["python variables", "variable naming rules", "python keywords", "identifiers in python", "snake_case python", "keyword.kwlist"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# What is Variable?
Variables are containers for `store data` values.

Imagine walking into your home kitchen and opening a spice rack. Your mother has arranged dozens of identical stainless steel containers (*dabbas*). One contains turmeric (*haldi*), another contains mustard seeds (*rai*), another contains cumin (*jeera*), and another contains salt (*namak*). If none of the containers had labels, cooking a simple meal would be a chaotic disaster—you might accidentally pour salt into a pot of sweet tea! But because every container has a clear label on its lid, anyone in the family can reach into the cabinet and grab exactly what they need.

In computer programming, **Variables** are those labeled containers. A variable is simply a named memory tag that points to data stored in your computer's RAM. To ensure the computer never gets confused, Python enforces strict rules on what you can name your variables (**Identifiers**).

---

# Create Variable

Python has no command for declaring a variable.
A variable can have a short name (like x and y) or a more descriptive name (age, carname, student_name). 

## 1.  **Rules of Python Variable Names:**

Every variable name in Python must obey these five non-negotiable rules:

- A variable name must `start` with a `Letters (A-Z, a-z)` or `Underscores (_)` character
- A variable name `cannot` start with a `Digits (0-9)`
- A variable name `cannot` be any of the Python `keywords`.
- A variable name can only contain `alpha-numeric` characters and underscores `(A-z, 0-9, and _ )`
- No Spaces or Hyphens Allowed:     ✓ `total_score`     ✕ `total score`       ✕ `total-score` (Minus operator!)
- No Special Punctuation Symbols:   ✕ `user@email`      ✕ `price$`            ✕ `discount%` (SyntaxError!)
- Strictly `Case-Sensitive`: `student_name`, `Student_Name`, `STUDENT_NAME` (3 different variables!)



For example, to create a variable name **student** to hold **Student's Name** and variable **age** to hold **Student's Age**

```py
student = 'Amit'
age = 18
```

| variable  |  Value |
| --------  |  ----- |
| student   | 'Amit' |
| age       |  18    |

Variables do not need to be declared with any particular type, and can even change type after they have been set.


### Legal variable names ✅
```py
myname = "Sumit"
my_name = "Sumit"
_my_name = "Sumit"
myName = "Sumit"
MYNAME = "Sumit"
myname2 = "Sumit"
```

### Illegal variable names ❎:
```py
2myname = "Sumit"
my-name = "Sumit"
my name = "Sumit"
@my_name = "Sumit"
&my_name = "Sumit"
```

---

## 2. Python Reserved Keywords (The 35 Forbidden Names)

Python reserves approximately 35 special words that form the grammatical skeleton of the language. You **CANNOT** use any of these words as **variable** names, **function** names, or **identifiers**:

```cmd
PowerShell 7.6.6
PS C:\Users\MSK-Institute> py
Python 3.13.0 (tags/v3.13.0:60403a5, Oct  7 2024, 09:38:07) [MSC v.1941 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> help("keywords")

Here is a list of the Python keywords.  Enter any keyword to get more help.
```

```py no-try
False               class               from                or
None                continue            global              pass
True                def                 if                  raise
and                 del                 import              return
as                  elif                in                  try
assert              else                is                  while
async               except              lambda              with
await               finally             nonlocal            yield
break               for                 not
```

### The Full Keyword Roster:

Complete list of python reserved keywords is given below.

| Categories | Reserved Keywords |
| :--- | :--- |
| **Booleans & Values** | `True`, `False`, `None` |
| **Control Flow & Logic** | `if`, `elif`, `else`, `while`, `for`, `break`, `continue`, `pass` |
| **Logical Operators** | `and`, `or`, `not`, `is`, `in` |
| **Functions & Classes** | `def`, `return`, `lambda`, `class`, `yield` |
| **Exceptions & Errors** | `try`, `except`, `finally`, `raise`, `assert` |
| **Scope & Imports** | `global`, `nonlocal`, `import`, `from`, `as`, `with`, `del` |
| **Async Operations** | `async`, `await` |

If you try to name a variable `def = 100` or `for = "student"`, Python stops immediately with a `SyntaxError: invalid syntax`!


```python
import keyword

all_keywords = keyword.kwlist

print("Total Keywords in Python:", len(all_keywords))
print(all_keywords)
```



---

## 3. PEP 8 Naming Conventions

Beyond the hard syntax rules, Python has universal community style conventions outlined in **PEP 8**:

### 1. Variables & Functions: 
Use **snake_case** Each word is separated by an all **lowercase** with **underscores** character.
```python
student_count = 50
calculate_total_marks = 450
```

### 2. Constants:
Use **UPPER_CASE** with underscores
```py
MAX_ATTEMPTS = 3
PI = 3.14159
DATABASE_PORT = 5432
```

### 3. Classes:
Use **PascalCase** Each word starts with a Capitalize each word, zero underscores. 
```py
class StudentRecord:
    pass
```

---

## 4. Valid vs. Invalid Variable Names

| Identifier | Valid? | Reason / Explanation |
| :--- | :--- | :--- |
| `student_marks` | **YES** | Follows clean PEP 8 `snake_case`. |
| `_internal_id` | **YES** | Starts with valid underscore. |
| `batch2026` | **YES** | Letters followed by digits. |
| `2026batch` | **NO** | **SyntaxError:** Cannot begin with a number! |
| `user-name` | **NO** | **SyntaxError:** Hyphen `-` is interpreted as a subtraction operator! |
| `total marks` | **NO** | **SyntaxError:** Spaces are forbidden inside variable names. |
| `class` | **NO** | **SyntaxError:** `class` is a reserved Python keyword. |
| `scholar#id` | **NO** | **SyntaxError:** Special character `#` is a comment operator. |

---

## 5. Do's and Don'ts of Naming Variables

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Clarity** | Use descriptive, self-explanatory names (`daily_temperature = 32`). | Use single-letter or cryptic names (`t = 32`, `d1 = 12`). |
| **Style** | Use `snake_case` for all regular variables and functions. | Use camelCase (`studentCount`) out of habit from Java or JavaScript. |
| **Keywords** | Verify variable names with `keyword.iskeyword(name)`. | Name variables similar to built-ins like `print`, `str`, `list`, or `sum`. |
| **Readability** | Choose pronounceable names that other teammates can read aloud. | Create absurdly long names like `the_total_score_of_all_students_in_delhi_batch`. |

---

# Multiple Choice Questions

### 1. Which of the following is a VALID variable name in Python?
A. `2nd_semester_marks`
B. `total-score`
C. `student_roll_number`
D. `class`
**Answer:** C
**Explanation:** `student_roll_number` contains only letters and underscores. Option A starts with a number (illegal), Option B contains a hyphen/minus operator, and Option D is a reserved keyword.

---

### 2. What error does Python raise if you attempt to assign a value to a reserved keyword (e.g. `for = 10`)?
A. `TypeError`
B. `SyntaxError: invalid syntax`
C. `ZeroDivisionError`
D. `IndexError`
**Answer:** B
**Explanation:** Keywords represent the grammar of Python. Attempting to use a keyword as an identifier violates the language grammar, triggering a `SyntaxError`.

---

### 3. According to PEP 8, which naming convention should be used for standard Python variables?
A. `camelCase` (e.g., `studentName`)
B. `snake_case` (e.g., `student_name`)
C. `kebab-case` (e.g., `student-name`)
D. `PascalCase` (e.g., `StudentName`)
**Answer:** B
**Explanation:** PEP 8 dictates `snake_case` (all lowercase letters separated by underscores) for variables and function names in Python.

---

### 4. How does Python treat the three identifiers `school`, `School`, and `SCHOOL`?
A. As three identical references to the same variable
B. As three completely distinct, independent variables in memory due to strict case sensitivity
C. It throws a duplicate variable warning
D. It automatically merges their values
**Answer:** B
**Explanation:** Python is case-sensitive. Identifiers with different casing are stored as completely separate names in the local/global namespace.

---

### 5. How can you programmatically check if a specific word is a reserved Python keyword in your code?
A. `import keyword; keyword.iskeyword("your_word")`
B. `check_word("your_word")`
C. `sys.is_reserved("your_word")`
D. `python.verify("your_word")`
**Answer:** A
**Explanation:** The built-in `keyword` module provides the `iskeyword()` function, which returns `True` if the provided string is a reserved Python keyword.

---

# Hands-On Practice Challenge:

Run this interactive Python script to inspect valid naming rules and test candidate identifier names programmatically.

```python
# ==========================================================
# Challenge 6: Variable Naming & Keyword Inspector
# MSK Institute of Technology
# ==========================================================

import keyword

print("=" * 55)
print("       PYTHON VARIABLE IDENTIFIER INSPECTOR")
print("=" * 55)

# 1. Candidate variable names to evaluate
candidate_names = [
    "student_name",
    "batch_2026",
    "_internal_token",
    "2nd_rank",      # Invalid: Starts with a digit
    "user-email",    # Invalid: Contains hyphen
    "total score",   # Invalid: Contains space
    "class",         # Invalid: Reserved keyword
    "True",          # Invalid: Reserved keyword
    "total_marks",
]

print(f"{'Identifier Name':<20} | {'Is Keyword?':<12} | {'Status':<15}")
print("-" * 55)

for name in candidate_names:
    is_kw = keyword.iskeyword(name)
    is_valid_identifier = name.isidentifier() and not is_kw
    
    if is_valid_identifier:
        status = "✓ VALID"
    elif is_kw:
        status = "✕ RESERVED KEYWORD"
    else:
        status = "✕ INVALID SYNTAX"
        
    print(f"{name:<20} | {str(is_kw):<12} | {status:<15}")

print("=" * 55)

# 2. Demonstration of clean snake_case variables in action
total_students = 60
girls_count = 32
boys_count = total_students - girls_count
girls_percentage = (girls_count / total_students) * 100

print(f"Batch Strength    : {total_students} Scholars")
print(f"Boys Enrolled     : {boys_count}")
print(f"Girls Enrolled    : {girls_count} ({girls_percentage:.1f}%)")
print("==========================================================")
```
