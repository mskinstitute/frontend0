---
id: comments-best-practices
slug: comments-best-practices
course: python-for-beginners
chapter: Introduction and Setup
topic: "Comments and Best Practices: Single-line, Multi-line, Docstrings, and PEP 8"
difficulty: Beginner
readingTime: 12
order: 5
keywords: ["python comments", "single line comments python", "docstrings python", "pep 8 comments", "multiline comments python", "__doc__ attribute"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Comments and Best Practices: Single-line, Multi-line, Docstrings, and PEP 8

Imagine borrowing a detailed science laboratory notebook from a senior student. If the notebook only contains raw mathematical calculations like `42 * 9.8 / 3.1415 = 131.02` with no labels or explanations, you will have no idea whether that formula calculates the speed of a falling cricket ball, the pressure of a steam cylinder, or the flow of water through a pipe. But if the senior wrote sticky notes explaining: *"Calculating water pressure before opening valve #2 to avoid pipe leakage,"* you instantly understand the purpose of the work!

In programming, **Comments** are those essential sticky notes. Code tells the computer **HOW** to do something; comments explain to human engineers **WHY** it was done that way. In this lesson, you will master single-line comments, multi-line explanations, official Python **Docstrings**, and the industry-standard **PEP 8 commenting conventions**.

---

## 1. Single-Line & Inline Comments

In Python, the hash symbol (`#`) starts a comment. The Python interpreter ignores everything from the `#` to the end of that line:

```python
# Calculate simple interest for an education loan (Standalone Comment)
principal = 50000       # Principal amount in INR (Inline Comment)
annual_rate = 7.5       # Annual interest rate percentage
duration_years = 3      # Repayment tenure in years

# Standard simple interest formula: (P * R * T) / 100
interest = (principal * annual_rate * duration_years) / 100
```

> [!NOTE]
> **PEP 8 Rule for Inline Comments:**
> Separate inline comments from the code statement with **at least 2 spaces**, followed by `#` and **1 space** before the text:
> `x = 5  # At least 2 spaces before hash!`

---

## 2. Multi-Line Comments vs. Multi-Line Strings

Python does not have a dedicated syntax like C's `/* ... */`. Instead, developers write multi-line comments in two ways:

### Approach A: Consecutive Single-Line Hashes (Recommended by PEP 8)
```python
# =========================================================
# Function: calculate_grade
# Purpose : Evaluates term marks and assigns CBSE letter grade.
# Returns : Character grade string (A1, A2, B1, etc.)
# =========================================================
```

### Approach B: Triple-Quoted Strings (`"""..."""`)
If a string enclosed in triple double quotes `"""` or triple single quotes `'''` is not assigned to a variable or used as a docstring, Python parses it as an unassigned string literal and promptly garbage collects it:
```python
"""
This is a multi-line explanation.
Since it is not assigned to a variable,
Python's runtime compiler safely ignores it.
"""
```

---

## 3. The Power of Python Docstrings (`__doc__`)

A **Docstring (Documentation String)** is fundamentally different from a regular comment!
- A **Comment** is completely discarded during bytecode compilation.
- A **Docstring** is preserved in memory and attached to functions, classes, or modules via the **`__doc__`** attribute, making it viewable via `help()`!

```python
def calculate_compound_interest(principal, rate, time, compounds_per_year=1):
    """
    Calculate the compound interest on a principal deposit.

    Parameters:
        principal (float): Initial amount invested in INR.
        rate (float): Annual interest rate as a percentage (e.g. 8.5).
        time (int): Investment duration in years.
        compounds_per_year (int, optional): Frequency of interest calculation per year.

    Returns:
        float: Final accumulated balance including interest.
    """
    amount = principal * (1 + (rate / 100) / compounds_per_year) ** (compounds_per_year * time)
    return amount

# You can inspect the function's documentation programmatically!
print(calculate_compound_interest.__doc__)
```

```
+-------------------------------------------------------------------------+
|                  COMMENTS VS DOCSTRINGS IN MEMORY                       |
+-------------------------------------------------------------------------+

  1. Normal Comment (# calculate total)
     -> Stripped during parsing. NEVER exists in memory or compiled .pyc!

  2. Docstring ("""Calculates total balance.""")
     -> Stored in the function's runtime object: func.__doc__
     -> Displayed when someone calls help(func) or hovers in VS Code!
```

---

## 4. The 3 Golden Rules of PEP 8 Commenting

1. **Explain the *Why*, not the *What*:**
   ```python
   # BAD: Obvious and wasteful comment
   x = x + 1  # add 1 to x

   # GOOD: Explains non-obvious business logic
   timeout_seconds += 60  # Extend timeout due to high railway server latency during Tatkal hours
   ```
2. **Keep Comments Synchronized with Code:** An outdated or incorrect comment that contradicts the code is far worse than no comment at all.
3. **Write in Clear, Professional English:** Use complete sentences with proper capitalization and periods.

---

## 5. Do's and Don'ts of Commenting

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Docstrings** | Write triple-quoted docstrings as the first line inside every function. | Use regular `#` comments to document function parameters and return types. |
| **Spacing** | Leave 2 spaces before an inline comment: `count = 10  # Counter`. | Jam comments right against code: `count = 10#Counter`. |
| **Maintenance** | Update comments immediately whenever you modify the underlying logic. | Modify code while leaving misleading, outdated comments in place. |
| **Clarity** | Write self-documenting code with clear variable names. | Write unreadable spaghetti code and try to fix it with 20 lines of comments. |

---

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  PYTHON COMMENTS CHEAT SHEET                            |
+-------------------------------------------------------------------------+

  - Single-line:        # This is a comment
  - Inline comment:     total = 100  # 2 spaces before hash
  - Multi-line:         Multiple # lines or unassigned """ strings
  - Docstring:          First statement in function/module enclosed in """
  - Inspect Docstring:  print(function_name.__doc__) or help(function_name)
  - Core Rule:          Explain WHY, never describe the obvious WHAT!
```

---

# Multiple Choice Questions

### 1. Which symbol starts a single-line comment in Python?
A. `//`
B. `/*`
C. `#`
D. `--`

**Answer:** C
**Explanation:** The hash symbol `#` begins a comment in Python. The interpreter ignores everything following `#` on that line.

---

### 2. What is the key functional difference between a standard `#` comment and a triple-quoted `"""` docstring in Python?
A. Comments can only be written in uppercase
B. Standard comments are discarded by the compiler, while docstrings are retained in memory and accessible via the `__doc__` attribute and `help()` function
C. Docstrings can only be read on Linux
D. Comments slow down code execution by 50%

**Answer:** B
**Explanation:** Regular `#` comments are ignored during bytecode compilation and do not exist at runtime. Docstrings are preserved as metadata attributes (`__doc__`) on functions, modules, and classes.

---

### 3. According to PEP 8, how many spaces should precede an inline comment after code?
A. Zero spaces
B. At least 2 spaces
C. Exactly 5 spaces
D. 1 tab character

**Answer:** B
**Explanation:** PEP 8 dictates that inline comments should be separated from the code statement by at least two spaces, followed by the `#` symbol and a single space before the text.

---

### 4. Which of the following comments represents a bad programming practice?
A. `# retry handshake if banking gateway returns HTTP 504 timeout`
B. `i = i + 1  # Increment i by 1`
C. `# calculate GST tax based on interstate CGST/SGST rules`
D. `# cache results for 300 seconds to prevent database load spikes`

**Answer:** B
**Explanation:** Stating `Increment i by 1` merely restates what the code obviously does without providing any context. Comments should explain the non-obvious *why*, not the obvious *what*.

---

### 5. What will calling `print(len.__doc__)` display in the Python terminal?
A. An empty line
B. The built-in documentation string explaining how the `len()` function calculates object length
C. A `SyntaxError`
D. The physical memory address of the function

**Answer:** B
**Explanation:** Built-in Python functions include standard docstrings. Accessing `len.__doc__` displays the built-in documentation: `Return the number of items in a container.`

---

# Hands-On Practice Challenge: Docstring & Help System Explorer

Run this program in VS Code or terminal to create a documented utility function and inspect its metadata using Python's interactive documentation engine.

```python
# ==========================================================
# Challenge 5: Docstrings & Self-Documenting Code
# MSK Institute of Technology
# ==========================================================

def calculate_scholarship_stipend(gpa, base_stipend=5000):
    """
    Calculate the monthly scholarship stipend based on academic GPA.

    Parameters:
        gpa (float): Cumulative Grade Point Average (0.0 to 10.0 scale).
        base_stipend (int, optional): Standard foundation grant in INR. Defaults to 5000.

    Returns:
        int: Total monthly stipend award in INR.
    """
    # Award 100% bonus for top tier academic merit (GPA >= 9.5)
    if gpa >= 9.5:
        return base_stipend * 2  # Double stipend for top rankers
    elif gpa >= 8.5:
        return int(base_stipend * 1.5)  # 50% bonus
    elif gpa >= 7.0:
        return base_stipend  # Standard base grant
    else:
        return 0  # Below minimum scholarship threshold


# 1. Execute function
scholar_gpa = 9.8
stipend_amount = calculate_scholarship_stipend(scholar_gpa)

print("=" * 55)
print("     SCHOLARSHIP STIPEND ALLOCATION RESULT")
print("=" * 55)
print(f"Student Cumulative GPA: {scholar_gpa}")
print(f"Monthly Stipend Award : ₹{stipend_amount:,} / month")
print("=" * 55)

# 2. Programmatically inspect the function's internal Docstring
print("\n[PROGRAMMATIC DOCSTRING INSPECTION VIA .__doc__]:")
print(calculate_scholarship_stipend.__doc__.strip())
print("=" * 55)
```

### Expected Program Output:
```text
=======================================================
     SCHOLARSHIP STIPEND ALLOCATION RESULT
=======================================================
Student Cumulative GPA: 9.8
Monthly Stipend Award : ₹10,000 / month
=======================================================

[PROGRAMMATIC DOCSTRING INSPECTION VIA .__doc__]:
Calculate the monthly scholarship stipend based on academic GPA.

    Parameters:
        gpa (float): Cumulative Grade Point Average (0.0 to 10.0 scale).
        base_stipend (int, optional): Standard foundation grant in INR. Defaults to 5000.

    Returns:
        int: Total monthly stipend award in INR.
=======================================================
```
