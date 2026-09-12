---
id: python-mathematical-operations
slug: mathematical-operations
course: python-for-beginners
chapter: 4
topic: 4.2
title: Mathematical Operations
description: Master Python's 7 arithmetic operators, understand the critical difference between true division and floor division, navigate negative modulo quirks, and master PEMDAS precedence.
difficulty: Beginner
readingTime: 13
order: 15
keywords:
  - python math operations
  - arithmetic operators
  - floor division
  - modulo operator
  - pemdas bodmas
  - divmod
  - operator precedence
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Python Mathematical Operations: Arithmetic, Floor Division, & PEMDAS Precedence

Python excels as an intuitive, high-performance mathematical workbench. From basic classroom arithmetic to advanced engineering algorithms, Python provides seven core arithmetic operators designed with mathematical rigor.

Unlike many older programming languages where dividing two integers truncates the decimal portion silently (e.g., in C or Java `5 / 2` yields `2`), Python 3 cleanly separates **true division (`/`)** from **floor division (`//`)**, preventing catastrophic financial rounding bugs.

---

## Real-World Analogy: Distributing Diwali Laddus

Imagine your grandmother made **23 fresh Besan Laddus** to pack into **4 gift boxes** for visiting family:

```
+-------------------------------------------------------------------------+
|                  THE ARITHMETIC DIVISION TRIO ANALOGY                   |
+-------------------------------------------------------------------------+

  Total Items : 23 Laddus
  Recipients  : 4 Gift Boxes

  1. TRUE DIVISION (23 / 4 = 5.75):
     - You slice the remaining laddus into fractions with a knife.
     - Each box receives exactly 5 whole laddus and 0.75 of a laddu.
     - In Python: Single slash '/' ALWAYS produces a float!

  2. FLOOR DIVISION (23 // 4 = 5):
     - You refuse to crush laddus; each box receives 5 whole, intact laddus.
     - Any fractional decimal is discarded towards the floor.
     - In Python: Double slash '//' yields the integer quotient.

  3. MODULO (23 % 4 = 3):
     - After placing 5 laddus in each of the 4 boxes (20 total),
       exactly 3 whole laddus remain on the plate for you to eat!
     - In Python: Percent '%' yields the remainder of integer division.
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: Division & Negative Floor Mechanics

Floor division does not simply "chop off" decimals—it mathematically rounds down towards negative infinity: $\lfloor x \rfloor$.

```
===========================================================================
                FLOOR DIVISION ON POSITIVE vs NEGATIVE NUMBERS
===========================================================================

  1. POSITIVE DIVISION: 7 // 2
     7 / 2 = +3.5
     Number line:  [... 2 -------- 3 --(3.5)-- 4 ...]
     Rounds down (left) towards floor -> +3

  2. NEGATIVE DIVISION: -7 // 2   <--- THE TRAP!
     -7 / 2 = -3.5
     Number line:  [... -5 -------- -4 --(-3.5)-- -3 ...]
     Rounds down (left) towards floor -> -4 (NOT -3!)

  3. PYTHON'S BUILT-IN divmod() EQUATION:
     Dividend = (Divisor * Quotient) + Remainder
     For -7 and 2:
     -7 = (2 * -4) + 1   ==> Quotient = -4, Remainder = 1
```

---

## 1. The 7 Native Arithmetic Operators

Python includes seven arithmetic operators for scalar numbers:

```python
# ==========================================================
# Example 1: The 7 Core Arithmetic Operators
# ==========================================================

a = 17
b = 5

print("Addition (+)            :", a + b)       # 22
print("Subtraction (-)         :", a - b)       # 12
print("Multiplication (*)      :", a * b)       # 85
print("True Division (/)       :", a / b)       # 3.4 (Always float!)
print("Floor Division (//)     :", a // b)      # 3 (Integer quotient)
print("Modulus (%)             :", a % b)       # 2 (Remainder)
print("Exponentiation (**)     :", 2 ** 8)      # 256 (2 to the power 8)
```

### Output:
```text
Addition (+)            : 22
Subtraction (-)         : 12
Multiplication (*)      : 85
True Division (/)       : 3.4
Floor Division (//)     : 3
Modulus (%)             : 2
Exponentiation (**)     : 256
```

---

## 2. Fast Quotient & Remainder with `divmod()`

When you need both the quotient and the remainder simultaneously—such as converting minutes into hours and minutes, or seconds into clock formats—calling `divmod(x, y)` performs both operations in a single, highly optimized C-level step:

```python
# ==========================================================
# Example 2: Practical Time Formatting with divmod()
# ==========================================================

total_flight_minutes = 285  # Flight from New Delhi to London leg

hours, minutes = divmod(total_flight_minutes, 60)
print(f"Flight Duration: {hours} Hours and {minutes} Minutes")

# Formatting seconds into HH:MM:SS
total_seconds = 7385
hours, remainder_secs = divmod(total_seconds, 3600)
minutes, seconds = divmod(remainder_secs, 60)
print(f"Video Timestamp: {hours:02d}:{minutes:02d}:{seconds:02d}")
```

### Output:
```text
Flight Duration: 4 Hours and 45 Minutes
Video Timestamp: 02:03:05
```

---

## 3. Operator Precedence: PEMDAS / BODMAS Hierarchy

When multiple operators appear in a single line, Python evaluates them in strict order of mathematical precedence:

```
+----------+------------------------------------------+--------------------+
| PRIORITY | OPERATOR                                 | ASSOCIATIVITY      |
+----------+------------------------------------------+--------------------+
| 1 (High) | ( ) Parentheses                          | Left to Right      |
| 2        | ** Exponentiation                        | RIGHT TO LEFT!     |
| 3        | +x, -x (Unary plus / minus)              | Right to Left      |
| 4        | *, /, //, % (Multiplication / Divisions) | Left to Right      |
| 5 (Low)  | +, - (Addition / Subtraction)            | Left to Right      |
+----------+------------------------------------------+--------------------+
```

### The Right-to-Left Exponentiation Quirk:

Notice that exponentiation (`**`) binds from **right to left**, unlike all other arithmetic operators:

```python
# ==========================================================
# Example 3: Exponentiation Associativity and PEMDAS
# ==========================================================

# Standard PEMDAS evaluation
# 1. (4 + 6) = 10
# 2. 3 ** 2 = 9
# 3. 10 * 9 = 90
# 4. 90 / 5 = 18.0
calculation = (4 + 6) * 3 ** 2 / 5
print("Result of (4 + 6) * 3 ** 2 / 5 =", calculation)

# The Right-to-Left Exponentiation Trap:
# 2 ** 3 ** 2 evaluates as 2 ** (3 ** 2) = 2 ** 9 = 512
# NOT (2 ** 3) ** 2 = 8 ** 2 = 64!
power_chain = 2 ** 3 ** 2
print("2 ** 3 ** 2 evaluates to          :", power_chain)

power_chain_explicit = (2 ** 3) ** 2
print("(2 ** 3) ** 2 evaluates to        :", power_chain_explicit)
```

### Output:
```text
Result of (4 + 6) * 3 ** 2 / 5 = 18.0
2 ** 3 ** 2 evaluates to          : 512
(2 ** 3) ** 2 evaluates to        : 64
```

---

## 4. Practical Odd/Even & Cycle Checking with Modulo (`%`)

The modulo operator `%` is one of the most powerful utilities in software engineering:
1. **Parity Check:** `number % 2 == 0` determines whether an integer is even.
2. **Circular Wrapping:** Rotating carousel slides or board games: `(index + 1) % total_slides`.

```python
# ==========================================================
# Example 4: Real-World Applications of Modulo
# ==========================================================

tokens = [101, 102, 103, 104, 105]

print("--- ODD/EVEN PARITY CHECK ---")
for t in tokens:
    parity = "EVEN" if t % 2 == 0 else "ODD"
    print(f"Token {t} is {parity}")

print("\n--- CIRCULAR QUEUE / CAROUSEL ---")
TOTAL_SLIDES = 4
for click in range(7):
    active_slide = click % TOTAL_SLIDES
    print(f"User Click #{click + 1} -> Displays Slide #{active_slide}")
```

### Output:
```text
--- ODD/EVEN PARITY CHECK ---
Token 101 is ODD
Token 102 is EVEN
Token 103 is ODD
Token 104 is EVEN
Token 105 is ODD

--- CIRCULAR QUEUE / CAROUSEL ---
User Click #1 -> Displays Slide #0
User Click #2 -> Displays Slide #1
User Click #3 -> Displays Slide #2
User Click #4 -> Displays Slide #3
User Click #5 -> Displays Slide #0
User Click #6 -> Displays Slide #1
User Click #7 -> Displays Slide #2
```

---

## Do's and Don'ts: Arithmetic Operations

| Scenario | Anti-Pattern (Don't) | Best Practice (Do) | Why |
| :--- | :--- | :--- | :--- |
| **Formula Readability** | `val = a + b * c / d ** e` | `val = a + (b * c) / (d ** e)` | Explicit parentheses eliminate ambiguity for other programmers. |
| **Quotient and Remainder** | `q = x // y; r = x % y` | `q, r = divmod(x, y)` | `divmod` computes both values in a single C-level operation. |
| **Even/Odd Check** | Comparing string ends: `str(x)[-1] in '02468'` | `x % 2 == 0` | Modulo check is clean, idiomatic, and thousands of times faster. |
| **Power Calculation** | Importing `math.pow(2, 10)` for ints | `2 ** 10` | `**` preserves arbitrary-precision integers; `math.pow()` converts to float. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  MATHEMATICAL OPERATIONS CHEAT SHEET                    |
+-------------------------------------------------------------------------+
  - Addition:        +
  - Subtraction:     -
  - Multiplication:  *
  - True Division:   /  (Always yields float; e.g., 4 / 2 = 2.0)
  - Floor Division:  // (Rounds down to -inf; e.g., 7 // 2 = 3, -7 // 2 = -4)
  - Modulus:         %  (Remainder; e.g., 17 % 5 = 2)
  - Exponent:        ** (Right-associative; 2 ** 3 ** 2 = 512)
  - divmod():        divmod(17, 5) -> (3, 2)
  - Order:           PEMDAS / BODMAS (Parentheses > Exponents > Mul/Div > Add/Sub)
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. What is the result and data type produced by evaluating `8 / 4` in Python 3?
A. `2` of type `<class 'int'>`
B. `2.0` of type `<class 'float'>`
C. `2` of type `<class 'double'>`
D. `0.5` of type `<class 'float'>`

**Answer:** B
**Explanation:** In Python 3, the single-slash true division operator `/` always produces a floating-point number, regardless of whether the division divides evenly. Hence, `8 / 4` results in `2.0`.

---

### 2. What is the value of the expression `-9 // 2` in Python?
A. `-4`
B. `-5`
C. `-4.5`
D. `4`

**Answer:** B
**Explanation:** Floor division `//` rounds down towards negative infinity ($\lfloor x \rfloor$). Since $-9 / 2 = -4.5$, rounding down to the next lower integer on the number line produces `-5`.

---

### 3. How does Python evaluate the chained power expression `2 ** 2 ** 3`?
A. `(2 ** 2) ** 3 = 4 ** 3 = 64`
B. `2 ** (2 ** 3) = 2 ** 8 = 256`
C. `2 * 2 * 3 = 12`
D. Syntax error

**Answer:** B
**Explanation:** Exponentiation (`**`) is right-associative in Python. It evaluates from right to left: first `2 ** 3 = 8`, and then `2 ** 8 = 256`.

---

### 4. What does the built-in function `divmod(29, 6)` return?
A. `(4.83, 5)`
B. `(4, 5)`
C. `(5, 4)`
D. `4`

**Answer:** B
**Explanation:** `divmod(a, b)` returns a tuple containing the floor quotient and remainder: `(a // b, a % b)`. For 29 and 6: $29 // 6 = 4$ and $29 \% 6 = 5$, giving `(4, 5)`.

---

### 5. What is the result of evaluating the arithmetic expression `10 + 5 * 2 ** 2`?
A. `60`
B. `100`
C. `30`
D. `400`

**Answer:** C
**Explanation:** Following PEMDAS: Exponentiation has highest priority ($2 ** 2 = 4$), followed by multiplication ($5 * 4 = 20$), followed by addition ($10 + 20 = 30$).

---

# Hands-On Practice Challenge: Indian Home Loan EMI & Amortization Calculator

Write a script that calculates the Equated Monthly Installment (EMI) for a housing loan in India using the standard banking formula:
$$\text{EMI} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
where $P$ is principal, $r$ is monthly interest rate, and $n$ is total months. The program will also calculate total interest and use `divmod()` to output the tenure in years and remaining months.

```python
# ==========================================================
# Challenge 15: Home Loan EMI & Repayment Calculator
# MSK Institute of Technology
# ==========================================================

def calculate_home_loan_emi(principal: float, annual_rate_pct: float, tenure_months: int):
    # ------------------------------------------------------
    # 1. Convert Annual Percentage Rate to Monthly Decimal Rate
    # ------------------------------------------------------
    monthly_rate = (annual_rate_pct / 12) / 100

    # ------------------------------------------------------
    # 2. Banking EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    # Demonstrates: +, *, /, -, and ** with proper parentheses
    # ------------------------------------------------------
    growth_factor = (1 + monthly_rate) ** tenure_months
    emi = (principal * monthly_rate * growth_factor) / (growth_factor - 1)

    total_payment = emi * tenure_months
    total_interest_payable = total_payment - principal

    # Use divmod() to split tenure into years and remaining months
    tenure_years, rem_months = divmod(tenure_months, 12)

    # ------------------------------------------------------
    # 3. Print Comprehensive Amortization Summary
    # ------------------------------------------------------
    print("=" * 55)
    print("           SBI / HDFC HOME LOAN EMI ADVISOR")
    print("=" * 55)
    print(f"Loan Principal Sanctioned: INR {principal:>12,.2f}")
    print(f"Annual Interest Rate     : {annual_rate_pct:>11.2f} % p.a.")
    print(f"Repayment Tenure         : {tenure_years} Years {rem_months} Months ({tenure_months} Mo)")
    print("-" * 55)
    print(f"Monthly EMI Payable      : INR {emi:>12,.2f}")
    print(f"Total Amount Repayable   : INR {total_payment:>12,.2f}")
    print(f"Total Interest Portion   : INR {total_interest_payable:>12,.2f}")
    print("=" * 55 + "\n")


# ----------------------------------------------------------
# Test Case: 45 Lakhs loan at 8.75% for 20 years (240 months)
# ----------------------------------------------------------
calculate_home_loan_emi(principal=45_00_000.0, annual_rate_pct=8.75, tenure_months=240)

# Test Case: 15 Lakhs Car Loan at 9.5% for 5.5 years (66 months)
calculate_home_loan_emi(principal=15_00_000.0, annual_rate_pct=9.50, tenure_months=66)
```

### Expected Program Output:
```text
=======================================================
           SBI / HDFC HOME LOAN EMI ADVISOR
=======================================================
Loan Principal Sanctioned: INR 4,500,000.00
Annual Interest Rate     :        8.75 % p.a.
Repayment Tenure         : 20 Years 0 Months (240 Mo)
-------------------------------------------------------
Monthly EMI Payable      : INR    39,781.33
Total Amount Repayable   : INR 9,547,519.86
Total Interest Portion   : INR 5,047,519.86
=======================================================

=======================================================
           SBI / HDFC HOME LOAN EMI ADVISOR
=======================================================
Loan Principal Sanctioned: INR 1,500,000.00
Annual Interest Rate     :        9.50 % p.a.
Repayment Tenure         : 5 Years 6 Months (66 Mo)
-------------------------------------------------------
Monthly EMI Payable      : INR    29,292.05
Total Amount Repayable   : INR 1,933,275.46
Total Interest Portion   : INR   433,275.46
=======================================================
```
