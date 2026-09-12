---
id: python-type-conversion-casting-type
slug: type-conversion-casting-type
course: python-for-beginners
chapter: 3
topic: 3.2
title: Type Conversion (Casting & type())
description: Master implicit type coercion vs explicit type casting in Python, handle string-to-number parsing traps, and learn truthy and falsy boolean evaluation rules.
difficulty: Beginner
readingTime: 13
order: 12
keywords:
  - python type conversion
  - type casting
  - implicit coercion
  - explicit casting
  - int float str bool
  - truthy and falsy
  - valueerror
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Type Conversion in Python: Implicit vs Explicit Casting & Truthy/Falsy Rules

In computer programming, **type conversion** (also known as **type casting**) is the process of translating a value from one data type into another. 

When user input arrives from a web form or a terminal prompt via `input()`, Python **always captures it as a string (`str`)**, even if the user typed `"450"`. If you attempt to add `50` to `"450"`, Python will immediately raise a `TypeError: can only concatenate str (not "int") to str`. To perform calculations, you must explicitly convert that string into an integer or floating-point number.

Python provides two distinct forms of conversion:
1. **Implicit Type Conversion (Coercion):** Python automatically promotes data types behind the scenes to prevent data loss.
2. **Explicit Type Conversion (Casting):** The programmer manually converts types using built-in constructor functions like `int()`, `float()`, `str()`, and `bool()`.

---

## Real-World Analogy: Airport Currency Exchange & Empty Tiffin Boxes

```
+-------------------------------------------------------------------------+
|                  TYPE CONVERSION REAL-WORLD ANALOGY                     |
+-------------------------------------------------------------------------+

  1. IMPLICIT CONVERSION (Automatic Widening):
     - You pay 10 Rupees (integer) and a 50 Paise coin (0.50 float).
     - The shopkeeper automatically records Rs. 10.50 (float).
     - Python does this automatically: 10 + 0.50 -> 10.5 (No data lost!)

  2. EXPLICIT CASTING (Intentional Transformation):
     - Converting liquid milk into solid paneer. You must explicitly apply
       the recipe: paneer = int(milk).
     - If you attempt to make paneer from stones (e.g., int("alphabet")),
       the recipe shatters with a ValueError!

  3. TRUTHY vs FALSY (Occupied vs Empty Tiffin Box):
     - An empty tiffin box ([]), an empty glass (""), zero coins (0),
       or no lunch provided (None) -> FALSY (Evaluates to False).
     - A tiffin box with even a single grain of rice (["rice"]), or a
       string with a single space (" ") -> TRUTHY (Evaluates to True).
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: Conversion Flow & Memory Mechanics

```
===========================================================================
             IMPLICIT COERCION vs EXPLICIT TYPE CASTING
===========================================================================

  1. IMPLICIT PROMOTION (Safe & Automatic):
     +---------+        +-----------+         +-----------+
     | int (5) |  +     | float(2.5)|   ==>   | float(7.5)|
     +---------+        +-----------+         +-----------+
          (Narrower)          (Wider)             (Wider Type Retained)

  2. EXPLICIT CASTING MATRIX:
     Target Type      Source Input          Result           Internal Action
     ----------------------------------------------------------------------
     int("125")       str                   125 (int)        Parses numeric ASCII
     int(9.99)        float                 9 (int)          Truncates toward zero
     float("3.14")    str                   3.14 (float)     Parses IEEE-754 float
     str(404)         int                   "404" (str)      Generates string literal
     bool("")         str (empty)           False            Falsy check
     bool("False")    str (non-empty)       True             Truthy check!
```

---

## 1. Implicit Type Conversion (Automatic Promotion)

When operands in an expression belong to different numeric types, Python automatically converts the narrower type into the wider type without any programmer intervention.

```python
# ==========================================================
# Example 1: Implicit Promotion
# ==========================================================

item_count = 5          # int
unit_price = 14.75      # float

# Python promotes item_count to float behind the scenes before multiplying
total_bill = item_count * unit_price

print("item_count type :", type(item_count))
print("unit_price type :", type(unit_price))
print("total_bill value:", total_bill)
print("total_bill type :", type(total_bill))  # Promoted to float!

# Integer division vs Float division
a = 10
b = 2
c = a / b  # Single slash ALWAYS yields float in Python 3!
print("10 / 2 yields    :", c, "Type:", type(c))
```

### Output:
```text
item_count type : <class 'int'>
unit_price type : <class 'float'>
total_bill value: 73.75
total_bill type : <class 'float'>
10 / 2 yields    : 5.0 Type: <class 'float'>
```

> **Notice:** Even when dividing two integers evenly (`10 / 2`), Python 3 automatically returns a `float` (`5.0`) to maintain consistent division semantics.

---

## 2. Explicit Type Conversion (Manual Casting)

To convert between incompatible types, Python provides constructor functions named after the target data type: `int()`, `float()`, `str()`, and `bool()`.

```python
# ==========================================================
# Example 2: Explicit Conversion
# ==========================================================

# 1. String to Integer
roll_str = "105"
roll_num = int(roll_str)
print(f"Parsed Roll Number: {roll_num + 1} (Next in sequence)")

# 2. Float to Integer (Truncation, NOT rounding!)
cgpa = 9.87
cgpa_truncated = int(cgpa)
print(f"CGPA {cgpa} truncated to integer: {cgpa_truncated}")  # Notice it drops .87

# 3. Number to String (Essential for formatted output and concatenations)
account_balance = 54200.50
receipt_message = "Your current balance is INR " + str(account_balance)
print(receipt_message)

# 4. Integer to Float
base_score = 90
calibrated_score = float(base_score)
print(f"Calibrated Score: {calibrated_score}")
```

### Output:
```text
Parsed Roll Number: 106 (Next in sequence)
CGPA 9.87 truncated to integer: 9
Your current balance is INR 54200.5
Calibrated Score: 90.0
```

---

## 3. The Classic "Float-in-a-String" Parsing Trap

A very common bug encountered by beginners is attempting to cast a floating-point string directly using `int()`:

```python
# ==========================================================
# Example 3: The Float-String Trap and Fix
# ==========================================================

raw_price = "499.99"

# Attempt 1: Direct int() on a decimal string triggers a crash!
try:
    bad_cast = int(raw_price)
except ValueError as e:
    print("CRASH AVOIDED:", e)

# Attempt 2: The Two-Step Safe Cast
# Step 1: Parse the string into a float
# Step 2: Truncate the float into an int
safe_float = float(raw_price)
safe_int = int(safe_float)
print(f"Safe Two-Step Cast: String '{raw_price}' -> Float {safe_float} -> Int {safe_int}")
```

### Output:
```text
CRASH AVOIDED: invalid literal for int() with base 10: '499.99'
Safe Two-Step Cast: String '499.99' -> Float 499.99 -> Int 499
```

> **Key Rule:** `int()` will parse `"499"` directly, but it rejects `"499.99"` with `ValueError` because the decimal character `.` is not a base-10 digit! You must pass through `float()` first.

---

## 4. Truthy and Falsy Rules: The Complete Standard

In Python, every single object can be tested for truth value inside an `if` condition or when passed to `bool()`. Python defines a very specific set of values that evaluate to `False` (termed **falsy**); **all other objects are truthy** (`True`).

### The Official Python Falsy Values:
1. Constants: `None` and `False`
2. Zero of any numeric type: `0`, `0.0`, `0j`
3. Empty sequences and collections: `""` (empty string), `[]` (empty list), `()` (empty tuple), `{}` (empty dict), `set()` (empty set), `range(0)`

```python
# ==========================================================
# Example 4: Truthy vs Falsy Evaluation
# ==========================================================

# All of these evaluate to False
falsy_values = [0, 0.0, "", [], (), {}, set(), None, False]

print("--- FALSY EVALUATIONS ---")
for val in falsy_values:
    print(f"bool({repr(val):<7}) evaluates to -> {bool(val)}")

# Sneaky Gotchas: Non-empty containers with 'falsy' items are TRUTHY!
print("\n--- SNEAKY TRUTHY GOTCHAS ---")
print("bool('0')      ->", bool("0"))        # Non-empty string! -> True
print("bool('False')  ->", bool("False"))    # Non-empty string! -> True
print("bool([0])      ->", bool([0]))        # List containing 1 item! -> True
print("bool(' ')      ->", bool(" "))        # String with 1 space! -> True
```

### Output:
```text
--- FALSY EVALUATIONS ---
bool(0      ) evaluates to -> False
bool(0.0    ) evaluates to -> False
bool(''     ) evaluates to -> False
bool([]     ) evaluates to -> False
bool(()     ) evaluates to -> False
bool({}     ) evaluates to -> False
bool(set()  ) evaluates to -> False
bool(None   ) evaluates to -> False
bool(False  ) evaluates to -> False

--- SNEAKY TRUTHY GOTCHAS ---
bool('0')      -> True
bool('False')  -> True
bool([0])      -> True
bool(' ')      -> True
```

---

## Do's and Don'ts: Type Conversion

| Scenario | Anti-Pattern (Don't) | Best Practice (Do) | Why |
| :--- | :--- | :--- | :--- |
| **User Input Numbers** | `total = input("Qty: ") * 5` | `total = int(input("Qty: ")) * 5` | Raw `input()` returns `str`; multiplying repeats the string! |
| **Float Strings** | `int("75.50")` | `int(float("75.50"))` | `int()` raises `ValueError` on decimal strings. |
| **Empty Check** | `if len(cart) == 0:` | `if not cart:` | Pythonic truthiness check is cleaner, faster, and idiomatic. |
| **String Conversion** | Manual character stitching | `str(obj)` or f-string `f"{obj}"` | Fast, handles all standard object representations. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                    TYPE CONVERSION CHEAT SHEET                          |
+-------------------------------------------------------------------------+
  - Implicit Coercion:  int + float -> float (automatic, no data loss)
  - Explicit Functions: int(), float(), str(), bool(), list(), tuple(), set()
  - Float Truncation:   int(3.99) -> 3 (drops decimals towards zero)
  - Decimal String:     float("12.5") -> 12.5, int(float("12.5")) -> 12
  - Falsy Catalog:      0, 0.0, '', [], (), {}, set(), None, False
  - Truthy Gotcha:      bool("0") is True, bool("False") is True!
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. What is the result of evaluating the expression `int(4.85)` in Python?
A. `5` (rounded up)
B. `4` (truncated towards zero)
C. `4.85`
D. `TypeError`

**Answer:** B
**Explanation:** When converting a float to an integer using `int()`, Python truncates the fractional part towards zero. It does not perform rounding. Hence, `int(4.85)` produces `4`.

---

### 2. What will happen when executing `int("35.75")` directly in Python?
A. It returns `35`
B. It returns `36`
C. It raises a `ValueError: invalid literal for int() with base 10: '35.75'`
D. It returns `35.75`

**Answer:** C
**Explanation:** The `int()` constructor cannot parse a string containing a decimal point directly. To convert a floating-point string to an integer, you must first convert it to a float: `int(float("35.75"))`.

---

### 3. Which of the following expressions evaluates to `False` when passed to `bool()`?
A. `bool("0")`
B. `bool([0])`
C. `bool(" ")`
D. `bool([])`

**Answer:** D
**Explanation:** An empty list `[]` is falsy in Python and evaluates to `False`. The string `"0"`, the list `[0]`, and the space string `" "` are non-empty containers, so they all evaluate to `True`.

---

### 4. What is the data type of the result produced by `100 / 20` in Python 3?
A. `<class 'int'>`
B. `<class 'float'>`
C. `<class 'decimal'>`
D. `<class 'fraction'>`

**Answer:** B
**Explanation:** In Python 3, standard true division using the single slash operator `/` always produces a floating-point number, even if the division results in a whole number. Therefore, `100 / 20` yields `5.0` (`<class 'float'>`).

---

### 5. Why does evaluating `bool("False")` produce `True` in Python?
A. Because `"False"` is recognized as an alias for `True`
B. Because any non-empty string is truthy in Python, regardless of the characters inside it
C. Because Python's boolean parser is case-sensitive
D. Because strings cannot be cast to booleans

**Answer:** B
**Explanation:** The `bool()` function tests whether an object has content. Any string containing one or more characters (even the characters `"False"` or `"0"`) is non-empty and therefore considered truthy (`True`). Only an empty string `""` evaluates to `False`.

---

# Hands-On Practice Challenge: Smart POS Terminal Receipt Parser

Write a complete Python program that simulates a retail Point of Sale (POS) scanner. The system receives raw string inputs from barcode scanners and user prompts, sanitizes and converts the types safely, validates truthiness, and prints a formatted bill.

```python
# ==========================================================
# Challenge 12: Smart POS Checkout Parser
# MSK Institute of Technology
# ==========================================================

# Simulated raw string inputs received from scanner and web form
raw_item_name = "  Wireless Mechanical Keyboard  "
raw_unit_price = "2499.50"    # Price as float string
raw_quantity = "2"            # Quantity as int string
raw_discount_code = "DIWALI50" # Promo code string
raw_notes = ""                # Empty customer notes string

print("=" * 55)
print("          BHARAT RETAIL POS BILLING ENGINE")
print("=" * 55)

# 1. Clean and convert types explicitly
clean_name = raw_item_name.strip()
unit_price = float(raw_unit_price)
quantity = int(raw_quantity)

# 2. Perform numeric calculation (Demonstrates implicit int * float promotion)
subtotal = unit_price * quantity
print(f"Product Name       : {clean_name}")
print(f"Unit Price         : INR {unit_price:.2f} (Type: {type(unit_price).__name__})")
print(f"Quantity Purchased : {quantity} (Type: {type(quantity).__name__})")
print(f"Subtotal Calculated: INR {subtotal:.2f} (Type: {type(subtotal).__name__})")

# 3. Truthiness validation for optional promotions & notes
has_discount = bool(raw_discount_code)
has_customer_notes = bool(raw_notes.strip())

print("-" * 55)
if has_discount:
    discount_amount = subtotal * 0.10  # 10% promotional discount
    print(f"Promo Code Applied : '{raw_discount_code}' -> Saved INR {discount_amount:.2f}")
else:
    discount_amount = 0.0
    print("Promo Code Applied : None")

final_payable = subtotal - discount_amount

# 4. Display delivery notes status
if has_customer_notes:
    print(f"Delivery Remarks   : {raw_notes}")
else:
    print("Delivery Remarks   : (No special instructions provided)")

print("=" * 55)
print(f"FINAL PAYABLE AMOUNT: INR {final_payable:.2f}")
print("=" * 55)
```

### Expected Program Output:
```text
=======================================================
          BHARAT RETAIL POS BILLING ENGINE
=======================================================
Product Name       : Wireless Mechanical Keyboard
Unit Price         : INR 2499.50 (Type: float)
Quantity Purchased : 2 (Type: int)
Subtotal Calculated: INR 4999.00 (Type: float)
-------------------------------------------------------
Promo Code Applied : 'DIWALI50' -> Saved INR 499.90
Delivery Remarks   : (No special instructions provided)
=======================================================
FINAL PAYABLE AMOUNT: INR 4499.10
=======================================================
```
