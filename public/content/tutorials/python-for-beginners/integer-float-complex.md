---
id: python-integer-float-complex
slug: integer-float-complex
course: python-for-beginners
chapter: 4
topic: 4.1
title: Integer, Float, Complex
description: Master Python's three core numeric types—arbitrary-precision integers, IEEE-754 floating-point numbers, and electrical engineering complex numbers.
difficulty: Beginner
readingTime: 14
order: 14
keywords:
  - python numbers
  - integer arbitrary precision
  - float ieee 754
  - complex numbers j
  - floating point quirk
  - math isclose
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Python Numbers: Integers, Floats, & Complex Numbers

Numbers form the bedrock of computation. Whether you are building financial accounting software, predicting rocket trajectories for ISRO, or calculating electricity tariffs, choosing and manipulating the correct numerical representation is critical.

Python natively provides three distinct built-in numeric types:
1. **`int` (Integer):** Whole positive or negative numbers with **arbitrary precision** (unlimited digits!).
2. **`float` (Floating-Point):** Real numbers with fractional decimal points, standardized to 64-bit double precision (**IEEE 754**).
3. **`complex` (Complex Number):** Numbers with a real component and an imaginary component denoted by the letter **`j`**.

---

## Real-World Analogy: Counting Currency, Weighing Gold, & AC Power Grids

```
+-------------------------------------------------------------------------+
|                    PYTHON NUMBERS REAL-WORLD ANALOGY                    |
+-------------------------------------------------------------------------+

  1. INTEGER (int) -> Counting Physical Currency Notes:
     - You count 500 Rupee notes: 1, 2, 50, 100,000.
     - You cannot have 0.7 of a physical banknote.
     - In C/C++, a 32-bit integer crashes (overflows) after 2.14 billion!
     - In Python, integers have infinite capacity. You could compute the
       entire money supply of planet Earth down to the last single Rupee!

  2. FLOAT (float) -> Weighing Gold on a Jeweler's Electronic Scale:
     - Gold weight: 10.345 grams, purity 91.6%.
     - Represents continuous physical measurements with decimals.
     - Just as 1/3 cannot be represented with finite decimals in base 10
       (0.3333...), binary computers cannot represent 0.1 exactly in base 2.

  3. COMPLEX (complex) -> Alternating Current (AC) Electrical Engineering:
     - Power grids (like Tata Power) supply AC electricity where voltage
       and current are out of phase.
     - Engineers calculate total impedance: Z = Resistance + j * Reactance.
     - Python uses 'j' (standard electrical engineering notation) rather
       than 'i' to avoid confusing imaginary numbers with current (I).
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: CPython Numeric Representation

```
===========================================================================
             HOW PYTHON NUMBERS RESIDE IN COMPUTER MEMORY
===========================================================================

  1. INTEGER (PyLongObject):
     +-------------------+--------------------+------------------------+
     | Header (Ref Count)| Digit Count (Sign) | Dynamic Array of Words |
     +-------------------+--------------------+------------------------+
     * Memory expands automatically as digits grow! No integer overflow.

  2. FLOAT (IEEE-754 64-bit Double Precision):
     +--------+--------------------------+-----------------------------+
     | 1 Sign | 11 Bits Exponent (Range) | 52 Bits Mantissa (Precision)|
     +--------+--------------------------+-----------------------------+
     * 53 bits of precision gives roughly 15 to 17 decimal digits.

  3. COMPLEX (Two 64-bit Floats):
     +-----------------------------------+-----------------------------+
     | Real Component: 64-bit Float      | Imag Component: 64-bit Float|
     +-----------------------------------+-----------------------------+
```

---

## 1. Integers (`int`): Arbitrary Unlimited Precision

In legacy programming languages like C, Java, or C#, an integer variable is strictly limited to 32 bits (maximum value: $2,147,483,647$) or 64 bits. If your calculation exceeds this ceiling, the program silently produces negative numbers (integer overflow) or crashes.

In Python 3, **integers have arbitrary precision**. Python allocates memory dynamically, allowing you to compute numbers with thousands of digits without loss of precision:

```python
# ==========================================================
# Example 1: Arbitrary Precision Integers
# ==========================================================

# Standard whole numbers
students = 120
negative_temp = -14

# Massive calculation: 2 raised to power 100
huge_power = 2 ** 100
print("2^100 =")
print(huge_power)
print("Number of digits in 2^100:", len(str(huge_power)))

# Readability Tip: PEP 515 underscores as digit separators
# Python completely ignores underscores in numbers!
indian_national_budget = 48_20_000_000_000  # 48.2 Lakh Crores INR
print("\nNational Budget in INR:", indian_national_budget)

# Number systems: Binary, Octal, Hexadecimal literals
binary_val = 0b1010        # Binary (Prefix 0b) -> 10 in decimal
octal_val = 0o77           # Octal (Prefix 0o)  -> 63 in decimal
hex_val = 0xFF             # Hex (Prefix 0x)    -> 255 in decimal

print(f"0b1010 = {binary_val} | 0o77 = {octal_val} | 0xFF = {hex_val}")
```

### Output:
```text
2^100 =
1267650600228229401496703205376
Number of digits in 2^100: 31

National Budget in INR: 4820000000000
0b1010 = 10 | 0o77 = 63 | 0xFF = 255
```

---

## 2. Floats (`float`): Decimal Numbers & The IEEE-754 Quirk

Floats represent real numbers with fractional parts. You can declare them using standard decimal notation or scientific exponential notation (`e` or `E`).

```python
# ==========================================================
# Example 2: Floats and Scientific Notation
# ==========================================================

# Standard decimals
petrol_rate = 96.72
body_temperature = 98.6

# Scientific notation: N * 10^exponent
distance_to_sun_km = 1.496e8   # 1.496 * 10^8 = 149,600,000 km
mass_of_electron_kg = 9.109e-31 # 9.109 * 10^-31 kg

print(f"Sun Distance : {distance_to_sun_km:,.1f} km")
print(f"Electron Mass: {mass_of_electron_kg} kg")
```

### Output:
```text
Sun Distance : 149,600,000.0 km
Electron Mass: 9.109e-31 kg
```

### The Famous Floating-Point Quirk: `0.1 + 0.2 != 0.3`

Because computers calculate in base 2 (binary), fractional numbers like `0.1` ($1/10$) and `0.2` ($1/5$) are infinite repeating fractions in binary, just like $1/3$ is in decimal ($0.3333...$):

```python
# ==========================================================
# Example 3: The Floating-Point Inaccuracy Trap & Solution
# ==========================================================
import math

sum_val = 0.1 + 0.2
print("0.1 + 0.2 evaluated as:", sum_val)
print("Is sum_val == 0.3?    :", sum_val == 0.3)  # False!

# SOLUTION 1: For comparisons, use math.isclose()
print("Is close within tolerance?:", math.isclose(sum_val, 0.3))  # True!

# SOLUTION 2: Rounding for display
print("Rounded to 2 decimals   :", round(sum_val, 2))
```

### Output:
```text
0.1 + 0.2 evaluated as: 0.30000000000000004
Is sum_val == 0.3?    : False
Is close within tolerance?: True
Rounded to 2 decimals   : 0.3
```

> **Pro Tip for Banking/Finance:** For critical financial transactions (like invoicing, banking ledgers, and GST calculations) where fractional cents or paise cannot be lost, never use `float`! Use Python's standard library `decimal.Decimal` module.

---

## 3. Complex Numbers (`complex`): Real & Imaginary (`j`)

In mathematics, a complex number is expressed as $a + bi$, where $i = \sqrt{-1}$. In Python, the letter **`j`** (or `J`) denotes the imaginary unit.

Python provides built-in attributes and methods to work with complex numbers:
- **`.real`:** Retrieves the real part as a `float`.
- **`.imag`:** Retrieves the imaginary coefficient as a `float`.
- **`.conjugate()`:** Returns the complex conjugate ($a - bj$).
- **`abs(c)`:** Computes the magnitude (hypotenuse) $\sqrt{a^2 + b^2}$.

```python
# ==========================================================
# Example 4: Complex Number Operations
# ==========================================================

# Declaring complex numbers
z1 = 3 + 4j
z2 = complex(2, -1)  # 2 - 1j

print("Complex Number 1 (z1) :", z1)
print("Complex Number 2 (z2) :", z2)

# Extracting components
print("z1 Real Part          :", z1.real)
print("z1 Imaginary Part     :", z1.imag)
print("z1 Complex Conjugate  :", z1.conjugate())

# Arithmetic
print("Addition (z1 + z2)    :", z1 + z2)       # (3+2) + (4-1)j = 5 + 3j
print("Multiplication (z1*z2):", z1 * z2)

# Magnitude / Absolute Value: sqrt(3^2 + 4^2) = sqrt(25) = 5.0
magnitude = abs(z1)
print("Magnitude of z1       :", magnitude)
```

### Output:
```text
Complex Number 1 (z1) : (3+4j)
Complex Number 2 (z2) : (2-1j)
z1 Real Part          : 3.0
z1 Imaginary Part     : 4.0
z1 Complex Conjugate  : (3-4j)
Addition (z1 + z2)    : (5+3j)
Multiplication (z1*z2): (10+5j)
Magnitude of z1       : 5.0
```

---

## Do's and Don'ts: Working with Python Numbers

| Scenario | Anti-Pattern (Don't) | Best Practice (Do) | Why |
| :--- | :--- | :--- | :--- |
| **Large Literals** | `fee = 15000000` | `fee = 15_000_000` | Underscores make massive numbers immediately readable without changing the value. |
| **Float Equality** | `if total == 0.3:` | `if math.isclose(total, 0.3):` | Floating-point binary representation errors cause exact `==` checks to fail. |
| **Imaginary Unit** | `z = 4 + 3i` | `z = 4 + 3j` | `3i` raises a `SyntaxError`; Python strictly requires `j` or `J`. |
| **Solitary Imaginary** | `z = 5 + j` | `z = 5 + 1j` | `j` alone is treated as an undefined variable name; always write `1j`. |
| **Financial Ledgers** | Using `float` for GST/invoicing | Using `decimal.Decimal` | Prevents rounding errors from accumulating into lost currency. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                       PYTHON NUMBERS CHEAT SHEET                        |
+-------------------------------------------------------------------------+
  - int:       Unlimited size; e.g., 42, -900, 10_000_000, 2**100
  - float:     IEEE-754 64-bit; e.g., 3.14, -0.05, 1.5e6
  - complex:   Real + Imaginary using 'j'; e.g., 3 + 4j, complex(real, imag)
  - Attributes:.real, .imag, .conjugate(), abs(c) for magnitude
  - Prefixes:  0b (binary), 0o (octal), 0x (hexadecimal)
  - Equality:  Never use == on floats! Use math.isclose(a, b)
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. What happens when an integer calculation in Python 3 exceeds 64 bits of storage?
A. Python halts execution and throws an `IntegerOverflowError`
B. Python automatically allocates more memory dynamically, supporting arbitrary-precision integers of unlimited size
C. The number wraps around to a negative integer
D. Python truncates the number to zero

**Answer:** B
**Explanation:** Unlike C, C++, or Java, Python 3 handles integer precision dynamically. Python integers expand seamlessly in memory to store numbers with hundreds or thousands of digits without overflowing.

---

### 2. Which character must be used to represent the imaginary unit of a complex number in Python?
A. `i`
B. `j`
C. `img`
D. `k`

**Answer:** B
**Explanation:** Python uses `j` or `J` to represent the imaginary unit $\sqrt{-1}$, adhering to standard electrical engineering conventions. Writing `i` raises a `SyntaxError`.

---

### 3. Why does the expression `0.1 + 0.2 == 0.3` evaluate to `False` in standard Python?
A. Python has a bug in its addition algorithm
B. Numbers with decimals cannot be represented exactly in binary base-2 floating-point arithmetic (IEEE-754), resulting in `0.30000000000000004`
C. Python automatically rounds all sums down to the nearest even number
D. The `==` operator only works on strings

**Answer:** B
**Explanation:** In standard IEEE-754 64-bit floating-point arithmetic, fractions like 1/10 and 2/10 cannot be expressed as finite binary decimals. The tiny rounding disparity produces `0.30000000000000004`, making direct equality comparison with `0.3` evaluate to `False`.

---

### 4. Which function from the standard library should be used to safely compare two floating-point numbers for equality within a reasonable tolerance?
A. `math.isclose(a, b)`
B. `float.equals(a, b)`
C. `math.approx(a, b)`
D. `sys.compare(a, b)`

**Answer:** A
**Explanation:** `math.isclose(a, b)` evaluates whether two numbers are close to each other within a specified relative or absolute tolerance, effectively overcoming binary floating-point representation limits.

---

### 5. What will be displayed when evaluating the expression `print(type(5_000_000))`?
A. `<class 'separated_int'>`
B. `<class 'int'>`
C. `<class 'str'>`
D. `SyntaxError`

**Answer:** B
**Explanation:** PEP 515 introduced underscores as visual digit separators in numeric literals for human readability. The Python interpreter completely ignores the underscores, treating `5_000_000` as the standard integer `5000000` (`<class 'int'>`).

---

# Hands-On Practice Challenge: Electrical AC Circuit Impedance Calculator

Write a script that models an alternating current (AC) electrical circuit with resistance, inductance, and capacitance. Calculate total complex impedance, phase angle, and current drawn using Python's native complex numbers and `math.isclose()`.

```python
# ==========================================================
# Challenge 14: AC Circuit Complex Impedance Calculator
# MSK Institute of Technology
# ==========================================================
import math

print("=" * 60)
print("         MSK ELECTRICAL ENGINEERING AC WORKBENCH")
print("=" * 60)

# ----------------------------------------------------------
# 1. Circuit Parameters
# ----------------------------------------------------------
# AC Mains Supply in India: 230V RMS at 50 Hz
rms_voltage = 230.0     # Volts
frequency_hz = 50.0     # Hertz

# Component Specifications
resistance_r = 40.0     # Resistance in Ohms (Real part)
inductance_l = 0.15     # Inductance in Henrys
capacitance_c = 60e-6   # Capacitance in Farads (60 microfarads)

# ----------------------------------------------------------
# 2. Reactance Calculations (Angular frequency omega = 2 * pi * f)
# ----------------------------------------------------------
omega = 2 * math.pi * frequency_hz
inductive_reactance_xl = omega * inductance_l
capacitive_reactance_xc = 1 / (omega * capacitance_c)
net_reactance_x = inductive_reactance_xl - capacitive_reactance_xc

# ----------------------------------------------------------
# 3. Formulate Complex Impedance (Z = R + j*X)
# ----------------------------------------------------------
total_impedance = complex(resistance_r, net_reactance_x)

# Magnitude of impedance |Z| = sqrt(R^2 + X^2)
impedance_magnitude = abs(total_impedance)

# RMS Current drawn I = V / |Z|
rms_current = rms_voltage / impedance_magnitude

# Phase Angle theta = atan2(Imag, Real) in degrees
phase_angle_rad = math.atan2(total_impedance.imag, total_impedance.real)
phase_angle_deg = math.degrees(phase_angle_rad)

# ----------------------------------------------------------
# 4. Display Formatted Engineering Telemetry
# ----------------------------------------------------------
print(f"AC Mains Voltage       : {rms_voltage:.1f} V @ {frequency_hz:.1f} Hz")
print(f"Pure Resistance (R)    : {resistance_r:.2f} Ohms")
print(f"Inductive Reactance(XL): {inductive_reactance_xl:.2f} Ohms")
print(f"Capacitive Reactance(XC: {capacitive_reactance_xc:.2f} Ohms")
print("-" * 60)
print(f"Total Complex Impedance: {total_impedance.real:.2f} + {total_impedance.imag:.2f}j Ohms")
print(f"Impedance Magnitude |Z|: {impedance_magnitude:.2f} Ohms")
print(f"Circuit RMS Current (I): {rms_current:.3f} Amperes")
print(f"Phase Angle (theta)    : {phase_angle_deg:.2f} degrees")

# Circuit behavior classification
if math.isclose(net_reactance_x, 0.0, abs_tol=1e-3):
    print("Circuit Status         : RESISTIVE RESONANCE (Unity Power Factor)")
elif net_reactance_x > 0:
    print("Circuit Status         : LAGGING POWER FACTOR (Inductive Load)")
else:
    print("Circuit Status         : LEADING POWER FACTOR (Capacitive Load)")

print("=" * 60)
```

### Expected Program Output:
```text
============================================================
         MSK ELECTRICAL ENGINEERING AC WORKBENCH
============================================================
AC Mains Voltage       : 230.0 V @ 50.0 Hz
Pure Resistance (R)    : 40.00 Ohms
Inductive Reactance(XL): 47.12 Ohms
Capacitive Reactance(XC: 53.05 Ohms
------------------------------------------------------------
Total Complex Impedance: 40.00 + -5.93j Ohms
Impedance Magnitude |Z|: 40.44 Ohms
Circuit RMS Current (I): 5.688 Amperes
Phase Angle (theta)    : -8.43 degrees
Circuit Status         : LEADING POWER FACTOR (Capacitive Load)
============================================================
```
