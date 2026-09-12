---
id: python-arithmetic-operators
slug: arithmetic-operators
course: python-for-beginners
chapter: 6
topic: 6.1
title: Arithmetic Operators
description: Master Python's arithmetic operators, understand operator overloading across numbers, strings, and lists, and handle floating-point modulus and unary operations.
difficulty: Beginner
readingTime: 13
order: 23
keywords:
  - python arithmetic operators
  - operator overloading
  - unary operators
  - string repetition
  - list concatenation
  - float modulo
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Arithmetic Operators in Python: Polymorphic Overloading & Precision

In Python, **operators** are special symbols that instruct the interpreter to perform specific mathematical, relational, or logical computations on one or more **operands**. 

While arithmetic operators (`+`, `-`, `*`, `/`, `//`, `%`, `**`) are primarily associated with mathematical numbers, Python's object-oriented architecture gives them **polymorphic abilities** (often called **operator overloading**). Depending on whether the operands are integers, floats, strings, or lists, the exact same symbol can add quantities, concatenate sentences, or duplicate sequences!

---

## Real-World Analogy: The Versatile Indian Post Office Clerk

```
+-------------------------------------------------------------------------+
|                  OPERATOR OVERLOADING REAL-WORLD ANALOGY                |
+-------------------------------------------------------------------------+

  1. NUMERIC ARITHMETIC (Counting Currency Notes):
     - Cashier adds cash: 500 Rupees + 200 Rupees = 700 Rupees.
     - Multiplication scales value: 500 Rupees * 4 = 2,000 Rupees.

  2. STRING OVERLOADING (The Wedding Card & Loudspeaker):
     - Addition '+' stitches phrases together:
       "Shubham" + " " + "Weds" + " " + "Priya"
       -> "Shubham Weds Priya"
     - Multiplication '*' repeats announcements over the station PA system:
       "Attention please! " * 3
       -> "Attention please! Attention please! Attention please! "

  3. SEQUENCE OVERLOADING (Indian Railway Train Bogies):
     - Addition '+' attaches bogies to the train:
       ["Engine"] + ["AC-1", "AC-2", "Sleeper"]
       -> ['Engine', 'AC-1', 'AC-2', 'Sleeper']
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: The Operator Polymorphism Matrix

```
===========================================================================
             HOW ARITHMETIC OPERATORS ADAPT TO DATA TYPES
===========================================================================

  Operator  Numeric (int/float)    Text (str)             Sequence (list/tuple)
  -------------------------------------------------------------------------
  +         Mathematical Addition  String Concatenation   Sequence Merging
            10 + 5 -> 15           "A" + "B" -> "AB"      [1] + [2] -> [1, 2]

  *         Multiplication         Text Repetition        Sequence Replication
            4 * 3 -> 12            "Om " * 3 -> "Om Om "  [0] * 3 -> [0, 0, 0]

  -         Subtraction            NOT SUPPORTED (Error)  NOT SUPPORTED (Error)
  /         True Division          NOT SUPPORTED (Error)  NOT SUPPORTED (Error)
  //        Floor Division         NOT SUPPORTED (Error)  NOT SUPPORTED (Error)
  %         Modulus (Remainder)    Legacy %-formatting    NOT SUPPORTED (Error)
  **        Exponentiation         NOT SUPPORTED (Error)  NOT SUPPORTED (Error)
```

---

## 1. Unary vs Binary Arithmetic Operators

Operators that require two values are **binary operators** (e.g., `a + b`). Operators that act on a single value are **unary operators** (e.g., unary minus `-x` and unary plus `+x`):

```python
# ==========================================================
# Example 1: Unary and Binary Arithmetic Operations
# ==========================================================

# Binary operations
base_price = 1500
discount = 350
net_price = base_price - discount
print(f"Binary Subtraction: {base_price} - {discount} = {net_price}")

# Unary operations (Flipping mathematical sign)
temperature_delhi = 42
frozen_temperature = -temperature_delhi
print(f"Unary Minus: -({temperature_delhi}) = {frozen_temperature}")

# Double negation flips back to positive
print(f"Double Negation: -(-5) = {-(-5)}")
```

### Output:
```text
Binary Subtraction: 1500 - 350 = 1150
Unary Minus: -(42) = -42
Double Negation: -(-5) = 5
```

---

## 2. Operator Overloading on Strings & Lists

Python allows `+` and `*` on strings, lists, and tuples:

```python
# ==========================================================
# Example 2: Operator Overloading in Action
# ==========================================================

# 1. String Concatenation (+) and Repetition (*)
greeting = "Namaste"
banner = (greeting + " ") * 3
border = "-" * 35
print(border)
print(banner)
print(border)

# 2. List Concatenation (+) and Replication (*)
delhi_metro_yellow = ["Samaypur Badli", "Kashmere Gate"]
extension = ["Rajiv Chowk", "HUDA City Centre"]

complete_line = delhi_metro_yellow + extension
print("\nComplete Metro Line (+):", complete_line)

# Initializing a fixed-size game board or matrix with replication (*)
grid_row = [0] * 5
print("Zero Initialized Row   (*):", grid_row)
```

### Output:
```text
-----------------------------------
Namaste Namaste Namaste 
-----------------------------------

Complete Metro Line (+): ['Samaypur Badli', 'Kashmere Gate', 'Rajiv Chowk', 'HUDA City Centre']
Zero Initialized Row   (*): [0, 0, 0, 0, 0]
```

> **Warning on List Replication:** Using `[[0] * 3] * 3` to create a 2D matrix copies **references**, not independent lists! Modifying one cell will modify all rows. For 2D matrices, always use list comprehensions.

---

## 3. Floating-Point Modulus (`%`)

Unlike languages like C or Java where the modulo operator `%` only works on integers, Python fully supports **floating-point modulo**:

```python
# ==========================================================
# Example 3: Floating-Point Modulo Operations
# ==========================================================

# 1. Float modulo
wire_length_meters = 12.5
cut_size_meters = 3.0

unused_wire = wire_length_meters % cut_size_meters
pieces_cut = wire_length_meters // cut_size_meters

print(f"Total Wire   : {wire_length_meters} meters")
print(f"Cuts of {cut_size_meters}m : {int(pieces_cut)} complete pieces")
print(f"Remaining Wire: {unused_wire:.2f} meters")

# 2. Precise currency change breakdown
rupees = 187.75
change_after_fifties = rupees % 50
print(f"Remaining after INR 50 notes: INR {change_after_fifties:.2f}")
```

### Output:
```text
Total Wire   : 12.5 meters
Cuts of 3.0m : 4 complete pieces
Remaining Wire: 0.50 meters
Remaining after INR 50 notes: INR 37.75
```

---

## 4. The Complete 7-Operator Reference Table

| Operator | Name | Example | Result | Types Supported |
| :--- | :--- | :--- | :--- | :--- |
| `+` | Addition / Concat | `10 + 20` / `'A' + 'B'` | `30` / `'AB'` | Numbers, Strings, Lists, Tuples |
| `-` | Subtraction | `50 - 15` | `35` | Numbers only |
| `*` | Multiplication / Repeat | `4 * 5` / `'Hi' * 2` | `20` / `'HiHi'` | Numbers, Strings, Lists, Tuples |
| `/` | True Division | `7 / 2` | `3.5` (Always float) | Numbers only |
| `//` | Floor Division | `7 // 2` / `-7 // 2` | `3` / `-4` (Rounds to $-\infty$) | Numbers only |
| `%` | Modulus (Remainder) | `17 % 5` / `7.5 % 2` | `2` / `1.5` | Numbers only |
| `**` | Exponentiation | `2 ** 10` | `1024` | Numbers only |

---

## Do's and Don'ts: Arithmetic Operators

| Scenario | Anti-Pattern (Don't) | Best Practice (Do) | Why |
| :--- | :--- | :--- | :--- |
| **String Multiplication** | `"Price: " + 50` | `f"Price: {50}"` | `+` between `str` and `int` raises `TypeError`. |
| **Even/Odd Detection** | `if n / 2 == int(n / 2):` | `if n % 2 == 0:` | Modulo check is mathematically direct and faster. |
| **Power Calculation** | Importing `pow` for basic math | `2 ** 8` | The `**` operator is native and cleaner. |
| **Negative Floor** | Expecting `-7 // 2 == -3` | Remember it rounds to $-\infty$ (`-4`) | Python strictly respects the floor definition $\lfloor x \rfloor$. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  ARITHMETIC OPERATORS CHEAT SHEET                       |
+-------------------------------------------------------------------------+
  - Addition (+):        Adds numbers, concatenates strings & lists
  - Subtraction (-):     Subtracts numbers, supports unary minus (-x)
  - Multiplication (*):  Multiplies numbers, repeats strings & lists
  - True Division (/):   Always returns float (4 / 2 -> 2.0)
  - Floor Division (//): Truncates towards negative infinity (-7 // 2 -> -4)
  - Modulus (%):         Remainder of division; works on floats (7.5 % 2 -> 1.5)
  - Exponentiation (**): Computes power; right-associative (2 ** 3 ** 2 = 512)
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. What is the output of evaluating `"Bharat" * 3` in Python?
A. `TypeError`
B. `"BharatBharatBharat"`
C. `"Bharat 3"`
D. `["Bharat", "Bharat", "Bharat"]`

**Answer:** B
**Explanation:** The multiplication operator `*` when applied between a string and an integer performs sequence repetition, duplicating the text $N$ times to produce `"BharatBharatBharat"`.

---

### 2. What will happen if you attempt to execute `"Chapter " + 1` in Python?
A. It outputs `"Chapter 1"`
B. It raises a `TypeError: can only concatenate str (not "int") to str`
C. It outputs `"Chapter "`
D. It converts `"Chapter "` to an integer

**Answer:** B
**Explanation:** Python is strongly typed and will not implicitly coerce an integer to a string during addition. To concatenate them, you must explicitly cast using `str(1)` or use an f-string: `f"Chapter {1}"`.

---

### 3. What does `11.5 % 3` evaluate to in Python?
A. `TypeError: float modulo is not allowed`
B. `2.5`
C. `3.5`
D. `2`

**Answer:** B
**Explanation:** Unlike C and Java where `%` is restricted to integers, Python supports floating-point modulo. $11.5 = (3 \times 3) + 2.5$, so the remainder is `2.5`.

---

### 4. What is the result of evaluating `[1, 2] + [3, 4]`?
A. `[4, 6]`
B. `[1, 2, 3, 4]`
C. `[[1, 2], [3, 4]]`
D. `TypeError`

**Answer:** B
**Explanation:** The addition operator `+` on lists concatenates the two sequences, producing a single merged list `[1, 2, 3, 4]`.

---

### 5. Which of the following statements about unary operators in Python is TRUE?
A. Python supports `++x` to increment a variable by 1 like C++
B. The unary minus `-x` negates the numeric value of `x`
C. Unary operators can only be used on strings
D. `x++` is valid syntax in Python

**Answer:** B
**Explanation:** The unary minus operator `-` negates the numeric operand (e.g., `-(-10)` is `10`). Python does **not** have the `++` or `--` increment/decrement operators found in C-family languages.

---

# Hands-On Practice Challenge: ATM Cash Dispenser & Denomination Optimizer

Write a complete, runnable Python script that simulates an automated Indian bank ATM. The machine accepts an amount requested by a customer and calculates the minimum number of 500, 200, 100, and 50 Rupee banknotes using arithmetic floor division (`//`) and modulus (`%`).

```python
# ==========================================================
# Challenge 23: ATM Banknote Denomination Optimizer
# MSK Institute of Technology
# ==========================================================

def dispense_atm_cash(requested_amount: int) -> None:
    print("=" * 60)
    print("      STATE BANK CASH DISPENSER: TRANSACTION RECEIPT")
    print("=" * 60)
    print(f"Requested Withdrawal Amount: INR {requested_amount:,}")
    print("-" * 60)

    # 1. Validation: ATM only dispenses in multiples of 50
    if requested_amount <= 0:
        print("ERROR: Withdrawal amount must be greater than zero.")
        print("=" * 60 + "\n")
        return

    if requested_amount % 50 != 0:
        print("ERROR: Amount must be a multiple of INR 50 (ATM cannot dispense coins).")
        print("=" * 60 + "\n")
        return

    # 2. Denomination Breakdown using // and %
    # Available notes in Indian ATMs: 500, 200, 100, 50
    notes_500 = requested_amount // 500
    rem_after_500 = requested_amount % 500

    notes_200 = rem_after_500 // 200
    rem_after_200 = rem_after_500 % 200

    notes_100 = rem_after_200 // 100
    rem_after_100 = rem_after_200 % 100

    notes_50 = rem_after_100 // 50
    final_remainder = rem_after_100 % 50

    # 3. Print Dispensed Currency Summary
    print(f"{'DENOMINATION':<18} | {'COUNT':^10} | {'SUBTOTAL (INR)':>15}")
    print("-" * 60)
    if notes_500 > 0:
        print(f"INR 500 Note       | {notes_500:^10} | {notes_500 * 500:>15,}")
    if notes_200 > 0:
        print(f"INR 200 Note       | {notes_200:^10} | {notes_200 * 200:>15,}")
    if notes_100 > 0:
        print(f"INR 100 Note       | {notes_100:^10} | {notes_100 * 100:>15,}")
    if notes_50 > 0:
        print(f"INR 50 Note        | {notes_50:^10} | {notes_50 * 50:>15,}")
    print("=" * 60)
    total_notes = notes_500 + notes_200 + notes_100 + notes_50
    print(f"Total Banknotes Dispensed : {total_notes}")
    print(f"Unprocessed Remainder     : INR {final_remainder}")
    print("Status                    : TRANSACTION SUCCESSFUL\n")


# ----------------------------------------------------------
# Test Cases
# ----------------------------------------------------------
dispense_atm_cash(8850)
dispense_atm_cash(1400)
dispense_atm_cash(1235)  # Invalid: not multiple of 50
```

### Expected Program Output:
```text
============================================================
      STATE BANK CASH DISPENSER: TRANSACTION RECEIPT
============================================================
Requested Withdrawal Amount: INR 8,850
------------------------------------------------------------
DENOMINATION       |   COUNT    |  SUBTOTAL (INR)
------------------------------------------------------------
INR 500 Note       |     17     |           8,500
INR 200 Note       |     1      |             200
INR 100 Note       |     1      |             100
INR 50 Note        |     1      |              50
============================================================
Total Banknotes Dispensed : 20
Unprocessed Remainder     : INR 0
Status                    : TRANSACTION SUCCESSFUL

============================================================
      STATE BANK CASH DISPENSER: TRANSACTION RECEIPT
============================================================
Requested Withdrawal Amount: INR 1,400
------------------------------------------------------------
DENOMINATION       |   COUNT    |  SUBTOTAL (INR)
------------------------------------------------------------
INR 500 Note       |     2      |           1,000
INR 200 Note       |     2      |             400
============================================================
Total Banknotes Dispensed : 4
Unprocessed Remainder     : INR 0
Status                    : TRANSACTION SUCCESSFUL

============================================================
      STATE BANK CASH DISPENSER: TRANSACTION RECEIPT
============================================================
Requested Withdrawal Amount: INR 1,235
------------------------------------------------------------
ERROR: Amount must be a multiple of INR 50 (ATM cannot dispense coins).
============================================================
```
