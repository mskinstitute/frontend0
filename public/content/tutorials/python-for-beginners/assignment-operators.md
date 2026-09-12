---
id: python-assignment-operators
slug: assignment-operators
course: python-for-beginners
chapter: 6
topic: 6.2
title: Assignment Operators
description: Master Python simple and compound assignment operators (+=, -=, *=, /=), understand in-place list mutation mechanics, and leverage the Python 3.8+ walrus operator (:=).
difficulty: Beginner
readingTime: 13
order: 24
keywords:
  - python assignment operators
  - compound assignment
  - augmented assignment
  - walrus operator
  - assignment expressions
  - in place mutation
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Python Assignment Operators: Compound Shortcuts & The Walrus Operator (:=)

In computer programming, **assignment operators** are used to bind values, calculations, and object references to variable names. While simple assignment (`=`) is the most fundamental construct in any language, Python provides a full suite of **augmented (compound) assignment operators** (such as `+=`, `-=`, `*=`, and `//=`) that condense calculation and assignment into a single atomic expression.

Furthermore, Python 3.8 introduced the revolutionary **Walrus Operator (`:=`)**—officially known as **Assignment Expressions**—which allows variables to be assigned *inside* conditional checks and loop statements.

---

## Real-World Analogy: The Kirana Store Khata & The Walrus Whiskers

```
+-------------------------------------------------------------------------+
|                 ASSIGNMENT OPERATORS REAL-WORLD ANALOGY                 |
+-------------------------------------------------------------------------+

  1. SIMPLE ASSIGNMENT (=):
     - Opening a fresh customer Khata (ledger account):
       ramesh_balance = 5000.00
     - Stamps an initial balance onto a fresh page.

  2. COMPOUND AUGMENTED ASSIGNMENT (+=, -=):
     - Ramesh purchases 400 Rupees of groceries on credit.
     - The shopkeeper doesn't write out the verbose mathematical equation:
       ramesh_balance = ramesh_balance + 400
     - Instead, he makes an ink tick in the margin:
       ramesh_balance += 400
     - Faster, prevents repetitive typing, and updates in-place!

  3. THE WALRUS OPERATOR (:=):
     - Look at the symbol sideways: ':' are eyes and '=' are long tusks!
     - Getting your train ticket stamped AND verified at the exact same gate:
       Assigns a value to a variable AT THE VERY MOMENT it is evaluated inside
       an 'if' or 'while' condition!
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: In-Place Mutation vs Reallocation

A critical internal detail in Python is how compound operators behave differently on **immutable** vs **mutable** objects:

```
===========================================================================
             BEHAVIOR OF += ON IMMUTABLE vs MUTABLE OBJECTS
===========================================================================

  1. IMMUTABLE OBJECT (Integer, Float, String):
     count = 10 (id: 0x100)
     count += 5
     +--------------------------------------------------------------------+
     | Python evaluates count + 5 = 15. Because integers are immutable,   |
     | it allocates a NEW object 15 at address 0x200!                     |
     +--------------------------------------------------------------------+

  2. MUTABLE OBJECT (List):
     cart = ["Laptop"] (id: 0x500)
     cart += ["Mouse"]
     +--------------------------------------------------------------------+
     | Python translates this to cart.extend(["Mouse"]). The list mutates |
     | IN-PLACE at the EXACT same memory address 0x500!                   |
     +--------------------------------------------------------------------+
```

---

## 1. The Full Family of Compound Assignment Operators

Compound assignment combines an arithmetic or bitwise operation with assignment:

```python
# ==========================================================
# Example 1: Arithmetic Compound Assignments
# ==========================================================

balance = 1000

# 1. Addition Assignment (+=)
balance += 500       # balance = balance + 500
print("After += 500 :", balance)      # 1500

# 2. Subtraction Assignment (-=)
balance -= 250       # balance = balance - 250
print("After -= 250 :", balance)      # 1250

# 3. Multiplication Assignment (*=)
balance *= 2         # balance = balance * 2
print("After *= 2   :", balance)      # 2500

# 4. True Division Assignment (/=) -> Converts to float!
balance /= 4         # balance = balance / 4
print("After /= 4   :", balance)      # 625.0

# 5. Floor Division Assignment (//=)
balance //= 2        # balance = balance // 2
print("After //= 2  :", balance)      # 312.0

# 6. Modulus Assignment (%=)
balance %= 100       # balance = balance % 100
print("After %= 100 :", balance)      # 12.0

# 7. Exponentiation Assignment (**=)
power_val = 3
power_val **= 4      # power_val = 3 ** 4
print("3 **= 4      :", power_val)    # 81
```

### Output:
```text
After += 500 : 1500
After -= 250 : 1250
After *= 2   : 2500
After /= 4   : 625.0
After //= 2  : 312.0
After %= 100 : 12.0
3 **= 4      : 81
```

---

## 2. In-Place List Mutation with `+=`

When used on lists, `+=` calls the internal `__iadd__` method, extending the existing list in-place rather than allocating a new one:

```python
# ==========================================================
# Example 2: List In-Place Extension
# ==========================================================

# Standard list extension with '+='
metro_stations = ["Kashmere Gate", "Chandni Chowk"]
initial_id = id(metro_stations)

metro_stations += ["Chawri Bazar", "New Delhi"]
after_id = id(metro_stations)

print("Updated Metro Route:", metro_stations)
print("Initial Memory ID  :", initial_id)
print("After Memory ID    :", after_id)
print("Was list modified in-place?", initial_id == after_id)  # True!
```

### Output:
```text
Updated Metro Route: ['Kashmere Gate', 'Chandni Chowk', 'Chawri Bazar', 'New Delhi']
Initial Memory ID  : 2195828723200
After Memory ID    : 2195828723200
Was list modified in-place? True
```

---

## 3. The Walrus Operator (`:=`): Assignment Expressions

Introduced in **Python 3.8 via PEP 572**, the walrus operator allows you to assign a value to a variable **directly inside an expression**:

$$\text{variable} \text{ := } \text{expression}$$

### Why the Walrus Operator is Revolutionary:
Without the walrus operator, you often have to compute a value once to check it, and then redundantly query it again inside the block.

```python
# ==========================================================
# Example 3: The Walrus Operator in Action (Python 3.8+)
# ==========================================================

# Problem: Check if a passenger name is too long and print its length
candidate_name = "Dr. Subramanian Chandrasekhar"

# TRADITIONAL APPROACH (Two steps):
name_len = len(candidate_name)
if name_len > 15:
    print(f"Traditional: Name length {name_len} exceeds passport display limit!")

# MODERN WALRUS APPROACH (Single step!):
# Evaluates len(), assigns to 'n', and checks '> 15' all in one line!
if (n := len(candidate_name)) > 15:
    print(f"Walrus (:=) : Name length {n} exceeds passport display limit!")
```

### Output:
```text
Traditional: Name length 29 exceeds passport display limit!
Walrus (:=) : Name length 29 exceeds passport display limit!
```

---

## 4. Practical Walrus Use Case: Interactive Loops & Stream Processing

The walrus operator shines brightest when processing streams of user input or reading files line-by-line:

```python
# ==========================================================
# Example 4: Simulated Stream Processing with Walrus
# ==========================================================

# Simulated stream of user inputs
incoming_inputs = ["delhi", "mumbai", "kolkata", "exit", "chennai"]
input_iterator = iter(incoming_inputs)

print("--- PROCESSING STREAM UNTIL 'exit' ---")
# Reads the next token, assigns it to 'city', and checks condition simultaneously!
while (city := next(input_iterator)) != "exit":
    print(f"Dispatching delivery cargo to: {city.upper()}")
```

### Output:
```text
--- PROCESSING STREAM UNTIL 'exit' ---
Dispatching delivery cargo to: DELHI
Dispatching delivery cargo to: MUMBAI
Dispatching delivery cargo to: KOLKATA
```

---

## Do's and Don'ts: Assignment Operators

| Scenario | Anti-Pattern (Don't) | Best Practice (Do) | Why |
| :--- | :--- | :--- | :--- |
| **Accumulating Counters** | `count = count + 1` | `count += 1` | `+=` is concise and directly communicates an accumulator pattern. |
| **Walrus Overuse** | Cramming complex logic into `:=` | Use `:=` only when it enhances clarity | Overly nested walrus expressions hurt code readability. |
| **Division Assignment** | Expecting `x /= 2` to stay `int` | Use `x //= 2` if integer type is needed | True division `/=` always converts the variable to `float`. |
| **Missing Parens with `:=`** | `if n := len(s) > 5:` | `if (n := len(s)) > 5:` | Without parentheses, `n` gets assigned the boolean `True`/`False`! |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                   ASSIGNMENT OPERATORS CHEAT SHEET                      |
+-------------------------------------------------------------------------+
  - Simple:         x = 10
  - Compound:       +=, -=, *=, /=, //=, %=, **=
  - Float Division: x /= 2 always converts x to a float!
  - List In-Place:  my_list += [4] extends the list in-place without reallocation
  - Walrus (:=):    (var := expr) assigns and returns value in an expression
  - Python Version: Walrus operator requires Python 3.8 or newer
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. What will be the data type and value of variable `x` after executing `x = 20; x /= 4` in Python?
A. `5` of `<class 'int'>`
B. `5.0` of `<class 'float'>`
C. `5` of `<class 'double'>`
D. `TypeError`

**Answer:** B
**Explanation:** In Python 3, the true division operator `/` (and its compound counterpart `/=`) always produces a floating-point number. `20 /= 4` yields `5.0` of type `float`.

---

### 2. Which operator in Python is nicknamed the "Walrus Operator"?
A. `=>`
B. `->`
C. `:=`
D. `~=`

**Answer:** C
**Explanation:** `:=` is called the walrus operator because the colon and equals sign resemble the eyes and long downward tusks of a walrus sideways. It was introduced in Python 3.8 as the assignment expression operator.

---

### 3. What does `items += [10]` do when `items` is an existing Python list?
A. It creates a brand-new list at a different memory address
B. It modifies the existing list in-place by appending 10 (equivalent to `items.extend([10])`)
C. It raises a `TypeError`
D. It adds 10 to every number in the list

**Answer:** B
**Explanation:** For mutable sequences like lists, the `+=` operator executes in-place mutation via the `__iadd__` protocol, appending the items directly without reallocating the list container.

---

### 4. What will happen if you omit parentheses and write `if x := 5 > 2:` in Python?
A. `x` is assigned `5`
B. `x` is assigned `True`
C. `x` is assigned `2`
D. `SyntaxError`

**Answer:** B
**Explanation:** Comparison operators (like `>`) have higher precedence than the walrus operator `:=`. Python first evaluates `5 > 2` which yields `True`, and then assigns `True` to `x`. To assign `5`, parentheses are required: `if (x := 5) > 2:`.

---

### 5. What is the value of `n` after executing `n = 2; n **= 3`?
A. `6`
B. `8`
C. `9`
D. `5`

**Answer:** B
**Explanation:** `n **= 3` is compound exponentiation, equivalent to `n = n ** 3`. $2^3 = 8$.

---

# Hands-On Practice Challenge: High-Frequency Stock Portfolio Rebalancer

Write a complete, runnable Python script that manages an investor's brokerage portfolio. Use compound assignment operators (`+=`, `-=`, `*=`) to simulate dividend payouts, brokerage fee deductions, and stock splits, and use the walrus operator (`:=`) to filter out micro-cap stocks with low holdings.

```python
# ==========================================================
# Challenge 24: Stock Portfolio Rebalancer & Walrus Filter
# MSK Institute of Technology
# ==========================================================

def simulate_portfolio_lifecycle() -> None:
    print("=" * 60)
    print("         DALAL STREET EQUITY PORTFOLIO MANAGER")
    print("=" * 60)

    # 1. Initialize Portfolio Cash Balance
    cash_balance = 50_000.00
    print(f"Initial Cash Reserve     : INR {cash_balance:>10,.2f}")

    # Dividend Credit (+ =)
    quarterly_dividend = 4500.00
    cash_balance += quarterly_dividend
    print(f"Dividend Received (+={quarterly_dividend}) : INR {cash_balance:>10,.2f}")

    # Brokerage & Demat Maintenance (- =)
    demat_charges = 354.00
    cash_balance -= demat_charges
    print(f"Demat Charges Paid (-={demat_charges}): INR {cash_balance:>10,.2f}")

    # Share Holding Units
    tcs_shares = 20
    # Stock Bonus Split 1:1 (*=)
    tcs_shares *= 2
    print(f"TCS Shares Post-Split (*=2): {tcs_shares} shares")

    print("-" * 60)
    print("--- WALRUS OPERATOR (:=) PORTFOLIO POSITION AUDIT ---")

    # List of stock positions: (Ticker, Quantity, Market Price)
    holdings = [
        ("RELIANCE", 15, 2980.50),
        ("INFY", 50, 1820.00),
        ("TATASTEEL", 200, 154.25),
        ("PENNY_STOCK", 10, 4.50)
    ]

    total_portfolio_value = cash_balance

    # Use walrus operator inside condition to calculate valuation AND filter
    for ticker, qty, price in holdings:
        # Compute value, assign to 'val', and check if substantial in one step!
        if (val := qty * price) > 5000.00:
            total_portfolio_value += val
            print(f"Holding: {ticker:<12} | Qty: {qty:^4} | Val: INR {val:>10,.2f} [CORE ASSET]")
        else:
            print(f"Holding: {ticker:<12} | Qty: {qty:^4} | Val: INR {val:>10,.2f} [MICRO-CAP / IGNORED]")

    print("=" * 60)
    print(f"TOTAL CONSOLIDATED WEALTH : INR {total_portfolio_value:>10,.2f}")
    print("=" * 60)


# ----------------------------------------------------------
# Execute Portfolio Simulation
# ----------------------------------------------------------
simulate_portfolio_lifecycle()
```

### Expected Program Output:
```text
============================================================
         DALAL STREET EQUITY PORTFOLIO MANAGER
============================================================
Initial Cash Reserve     : INR  50,000.00
Dividend Received (+=4500.0) : INR  54,500.00
Demat Charges Paid (-=354.0): INR  54,146.00
TCS Shares Post-Split (*=2): 40 shares
------------------------------------------------------------
--- WALRUS OPERATOR (:=) PORTFOLIO POSITION AUDIT ---
Holding: RELIANCE     | Qty:  15  | Val: INR  44,707.50 [CORE ASSET]
Holding: INFY         | Qty:  50  | Val: INR  91,000.00 [CORE ASSET]
Holding: TATASTEEL    | Qty: 200  | Val: INR  30,850.00 [CORE ASSET]
Holding: PENNY_STOCK  | Qty:  10  | Val: INR      45.00 [MICRO-CAP / IGNORED]
============================================================
TOTAL CONSOLIDATED WEALTH : INR 220,703.50
============================================================
```
