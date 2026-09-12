---
id: output-variables-printing-techniques
slug: output-variables-printing-techniques
course: python-for-beginners
chapter: Variables
topic: "Output Variables and Printing Techniques: print(), sep, end, and Formatting"
difficulty: Beginner
readingTime: 12
order: 8
keywords: ["print function python", "sep and end python", "f-strings python", "formatting output python", "python print multiple variables", "string concatenation python"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Output Variables and Printing Techniques: print(), sep, end, and Formatting

Imagine standing on a railway station platform listening to the public announcement speaker. If the announcer says: *"Train... Number... One... Two... Zero... Five... Seven"*, the gaps between words and the tone at the end of each sentence determine how clearly passengers understand the message. If words are jammed together with zero spacing, or if sentences never pause, nobody can comprehend the announcement.

In Python, the built-in **`print()`** function is your program's public address loudspeaker. While most beginners only know how to print simple words, `print()` contains powerful built-in parameters—**`sep`**, **`end`**, and **modern f-string formatting**—that let you produce beautiful, professional reports and tables!

---

## 1. The Complete Anatomy of the `print()` Function

Under the hood, Python's `print()` function accepts several optional keyword arguments:

```python
print(*objects, sep=' ', end='\n', file=None, flush=False)
```

```
+-------------------------------------------------------------------------+
|                  THE 4 CORE PARAMETERS OF PRINT()                       |
+-------------------------------------------------------------------------+

  1. *objects   -> Any number of variables/values: print("Aarav", 10, True)
  2. sep=' '    -> Separator string placed BETWEEN objects (Default: space)
  3. end='\n'   -> String placed at the VERY END of the print (Default: newline)
  4. flush=False-> Forces immediate terminal output buffer flush
```

---

## 2. Mastering the `sep` (Separator) Parameter

By default, passing multiple items to `print()` separates them with a single space:

```python
day = 15
month = 8
year = 1947

# Default separator is a space (' ')
print(day, month, year)
# Output: 15 8 1947

# Custom date separator using hyphen:
print(day, month, year, sep="-")
# Output: 15-8-1947

# Custom time separator using colon:
print("10", "45", "30", sep=":")
# Output: 10:45:30

# Bullet point separator:
print("Python", "HTML5", "CSS3", sep=" • ")
# Output: Python • HTML5 • CSS3
```

---

## 3. Mastering the `end` Parameter

By default, every `print()` call appends an invisible newline character (`\n`), moving the cursor to the next line. You can change this behavior using `end`:

```python
# Default: Each call prints on a new line
print("Loading")
print("Complete")
# Output:
# Loading
# Complete

# Custom end: Keeps the cursor on the same line!
print("Connecting to database", end="... ")
print("Success!")
# Output: Connecting to database... Success!

# Printing a countdown loop on one single row:
for count in range(3, 0, -1):
    print(count, end=" -> ")
print("BLAST OFF! 🚀")
# Output: 3 -> 2 -> 1 -> BLAST OFF! 🚀
```

---

## 4. String Concatenation vs. Modern f-strings

A common trap for beginners is using the plus operator (`+`) to join variables:

```python
name = "Rohan"
score = 95

# DANGER: TypeError! Python cannot concatenate strings and integers!
# print("Student: " + name + " scored: " + score)  # CRASH!

# THE PYTHONIC SOLUTION: Formatted String Literals (f-strings, Python 3.6+)
print(f"Student: {name} scored: {score}")  # Perfect!
```

### Advanced f-string Formatting Tricks:
```python
price = 1250000.7584

# 1. Round to 2 decimal places: .2f
print(f"Final Price: ₹{price:.2f}")       # Output: Final Price: ₹1250000.76

# 2. Add comma thousands separators: ,
print(f"Formatted Balance: ₹{price:,.2f}") # Output: Formatted Balance: ₹1,250,000.76

# 3. Leading zero padding for roll numbers: 04d
roll_no = 7
print(f"Candidate ID: {roll_no:04d}")      # Output: Candidate ID: 0007
```

---

## 5. Do's and Don'ts of Output Formatting

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Variable Injection** | Use f-strings: `f"Hello {name}, your score is {score}"`. | Chain 10 plus signs and manual `str()` casts: `"Hello " + name + " " + str(score)`. |
| **Separators** | Use `sep="-"` to format dates, paths, and CSV values cleanly. | Manually insert hyphen strings between every single variable: `print(d, "-", m, "-", y)`. |
| **Line Endings** | Use `end=""` when creating progress bars or inline prompts. | Leave multiple trailing empty `print("")` statements to create vertical space. |
| **Precision** | Format currency and percentages with `:.2f`. | Print raw floating-point numbers with 14 decimal digits (`3.141592653589793`). |

---

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  PRINTING & FORMATTING CHEAT SHEET                      |
+-------------------------------------------------------------------------+

  - Default behavior:   print("A", "B") -> A B\n
  - Custom separator:   print("A", "B", sep=":") -> A:B
  - Keep on same line:  print("Hello", end=" ")
  - f-string syntax:    f"Name: {name}, Marks: {score}"
  - Currency commas:    f"₹{amount:,}" -> ₹1,000,000
  - Decimal precision:  f"{percentage:.2f}%" -> 94.25%
  - Pad zeros:          f"{id:05d}" -> 00042
```

---

# Multiple Choice Questions

### 1. What are the default values of the `sep` and `end` parameters in Python's `print()` function?
A. `sep=","` and `end=" "`
B. `sep=" "` (a single space) and `end="\n"` (a newline character)
C. `sep=""` (empty string) and `end=""`
D. `sep="\t"` (tab) and `end="\r"`

**Answer:** B
**Explanation:** By default, `print()` separates multiple items with a single space (`sep=' '`) and appends a newline character at the end (`end='\n'`).

---

### 2. What will the following code output: `print("Delhi", "Mumbai", "Kolkata", sep=" -> ")`?
A. `Delhi Mumbai Kolkata`
B. `Delhi -> Mumbai -> Kolkata`
C. `Delhi -> Mumbai -> Kolkata ->`
D. `SyntaxError`

**Answer:** B
**Explanation:** The `sep` parameter specifies the string placed between objects. The separator is only placed *between* items, not at the end.

---

### 3. What will happen if you run `print("Marks: " + 95)` in Python?
A. It prints `Marks: 95`
B. It raises a `TypeError: can only concatenate str (not "int") to str`
C. It prints `Marks: 95.0`
D. It converts the string to an integer

**Answer:** B
**Explanation:** Python does not perform implicit string coercion with the `+` operator. Attempting to concatenate a string and an integer raises a `TypeError`. Use f-strings instead (`f"Marks: {95}"`).

---

### 4. Which f-string formatting specifier rounds a floating-point number to exactly two decimal places?
A. `{price:2d}`
B. `{price:.2f}`
C. `{price:%2}`
D. `{price:round}`

**Answer:** B
**Explanation:** The format specification `:.2f` rounds a floating-point number to 2 decimal places (e.g. `f"{3.14159:.2f}"` produces `'3.14'`).

---

### 5. How can you print three items in a `for` loop so they appear on the same line separated by spaces rather than on new lines?
A. `print(item, end=" ")`
B. `print(item, line=False)`
C. `print(item, newline=0)`
D. `print(item, stay=True)`

**Answer:** A
**Explanation:** Setting `end=" "` replaces the default newline character (`\n`) with a single space, allowing subsequent print calls to continue on the same terminal line.

---

# Hands-On Practice Challenge: Report Card Formatter

Create and run this Python program to format a professional student report card using custom `sep`, `end`, and f-string formatting specifications.

```python
# ==========================================================
# Challenge 8: Professional Academic Report Card Formatter
# MSK Institute of Technology
# ==========================================================

student_name = "Ananya Iyer"
roll_number = 42
exam_date = (15, 9, 2026)  # (Day, Month, Year)
tuition_fee = 45000.0

# Subject Marks Dictionary
marks = {
    "Computer Science": 98,
    "Mathematics     ": 95,
    "Physics         ": 91,
    "English         ": 89,
}

print("=" * 55)
print("             MSK ACADEMIC REPORT CARD")
print("=" * 55)

# 1. Custom sep demonstration for date formatting
print("Examination Date : ", end="")
print(exam_date[0], exam_date[1], exam_date[2], sep="/")

# 2. Leading zero padding using f-strings
print(f"Candidate Roll No: {roll_number:05d}")
print(f"Candidate Name   : {student_name}")
print("-" * 55)

# 3. Tabular Output using formatting width
print(f"{'Subject Name':<20} | {'Marks Obtained':<15} | {'Status'}")
print("-" * 55)

total_marks = 0
for subject, score in marks.items():
    total_marks += score
    print(f"{subject:<20} | {score:>14} | PASS")

print("-" * 55)
average = total_marks / len(marks)
print(f"Total Aggregate  : {total_marks} / 400")
print(f"Average Score    : {average:.2f}%")

# 4. Currency comma formatting
print(f"Term Tuition Paid: ₹{tuition_fee:,.2f}")
print("=" * 55)

# 5. Inline progress simulation using end parameter
print("Generating Digital Seal", end="")
for dot in range(4):
    print(".", end="", flush=True)
print(" [VERIFIED ✓]")
print("==========================================================")
```

### Expected Program Output:
```text
=======================================================
             MSK ACADEMIC REPORT CARD
=======================================================
Examination Date : 15/9/2026
Candidate Roll No: 00042
Candidate Name   : Ananya Iyer
-------------------------------------------------------
Subject Name         | Marks Obtained  | Status
-------------------------------------------------------
Computer Science     |             98 | PASS
Mathematics          |             95 | PASS
Physics              |             91 | PASS
English              |             89 | PASS
-------------------------------------------------------
Total Aggregate  : 373 / 400
Average Score    : 93.25%
Term Tuition Paid: ₹45,000.00
=======================================================
Generating Digital Seal.... [VERIFIED ✓]
==========================================================
```
