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

# Variables Introduction and Naming Rules: Identifiers and Reserved Keywords

Imagine walking into your home kitchen and opening a spice rack. Your mother has arranged dozens of identical stainless steel containers (*dabbas*). One contains turmeric (*haldi*), another contains mustard seeds (*rai*), another contains cumin (*jeera*), and another contains salt (*namak*). If none of the containers had labels, cooking a simple meal would be a chaotic disaster—you might accidentally pour salt into a pot of sweet tea! But because every container has a clear label on its lid, anyone in the family can reach into the cabinet and grab exactly what they need.

In computer programming, **Variables** are those labeled containers. A variable is simply a named memory tag that points to data stored in your computer's RAM. To ensure the computer never gets confused, Python enforces strict rules on what you can name your variables (**Identifiers**).

---

## 1. The 5 Cardinal Rules of Python Variable Names

Every variable name in Python must obey these five non-negotiable rules:

```
+-------------------------------------------------------------------------+
|                  PYTHON IDENTIFIER NAMING RULES                         |
+-------------------------------------------------------------------------+

  1. Allowed Characters:
     Letters (A-Z, a-z), Digits (0-9), and Underscores (_) ONLY!
     ✓ student_age     ✓ roll_number_2     ✓ _private_id

  2. Must Start with a Letter or Underscore:
     ✓ marks           ✓ _temp             ✕ 1st_rank (ILLEGAL!)

  3. No Spaces or Hyphens Allowed:
     ✓ total_score     ✕ total score       ✕ total-score (Minus operator!)

  4. No Special Punctuation Symbols:
     ✕ user@email      ✕ price$            ✕ discount% (SyntaxError!)

  5. Strictly Case-Sensitive:
     student_name != Student_Name != STUDENT_NAME (3 different variables!)
```

---

## 2. Python Reserved Keywords (The 35 Forbidden Names)

Python reserves approximately 35 special words that form the grammatical skeleton of the language. You **CANNOT** use any of these words as variable names, function names, or identifiers:

```python
import keyword

# Print all 35 reserved Python keywords
print("Total Keywords in Python:", len(keyword.kwlist))
print(keyword.kwlist)
```

### The Full Keyword Roster:
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

---

## 3. PEP 8 Naming Conventions

Beyond the hard syntax rules, Python has universal community style conventions outlined in **PEP 8**:

```python
# 1. Variables & Functions: Use snake_case (all lowercase with underscores)
student_count = 50
calculate_total_marks = 450

# 2. Constants: Use UPPER_CASE with underscores
MAX_ATTEMPTS = 3
PI = 3.14159
DATABASE_PORT = 5432

# 3. Classes: Use PascalCase (Capitalize each word, zero underscores)
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

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  VARIABLE NAMING RULES CHEAT SHEET                      |
+-------------------------------------------------------------------------+

  - Allowed:            Letters, numbers, underscores (a-z, A-Z, 0-9, _)
  - First character:    Must be a letter or underscore (NEVER a digit!)
  - Case Sensitivity:   age != Age != AGE
  - Forbidden:          Spaces, hyphens (-), symbols (@, $, %, #), and 35 keywords
  - Standard Style:     snake_case (e.g., student_roll_number)
```

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

# Hands-On Practice Challenge: Variable Validator & Keyword Inspector

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

### Expected Program Output:
```text
=======================================================
       PYTHON VARIABLE IDENTIFIER INSPECTOR
=======================================================
Identifier Name      | Is Keyword?  | Status         
-------------------------------------------------------
student_name         | False        | ✓ VALID        
batch_2026           | False        | ✓ VALID        
_internal_token      | False        | ✓ VALID        
2nd_rank             | False        | ✕ INVALID SYNTAX
user-email           | False        | ✕ INVALID SYNTAX
total score          | False        | ✕ INVALID SYNTAX
class                | True         | ✕ RESERVED KEYWORD
True                 | True         | ✕ RESERVED KEYWORD
total_marks          | False        | ✓ VALID        
=======================================================
Batch Strength    : 60 Scholars
Boys Enrolled     : 28
Girls Enrolled    : 32 (53.3%)
==========================================================
```
