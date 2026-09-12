---
id: python-constants-python-convention
slug: constants-python-convention
course: python-for-beginners
chapter: 2
topic: 2.5
title: Constants (Python Convention)
description: Master Python constant naming conventions, PEP 8 uppercase standards, module-level constant files, and compile-time immutability hints using typing.Final.
difficulty: Beginner
readingTime: 12
order: 10
keywords:
  - python constants
  - pep 8 constants
  - typing final
  - all caps convention
  - config module
  - immutable values
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Constants in Python: The All-Caps Convention & Modern Final Hints

A **constant** is a special type of variable whose assigned value is intended to remain permanent and unalterable throughout the entire lifetime of an application. Think of mathematical values like $\pi \approx 3.14159$, physics constants like the acceleration due to gravity ($9.8\ \text{m/s}^2$), or operational settings like your production server's database port (`5432`).

In languages such as JavaScript (`const`), C++ (`const`), or Java (`final`), the compiler physically forbids any attempt to reassign a constant variable, throwing an immediate compile-time error. 

However, **Python does not have a built-in `const` keyword**. 

In the Python community, we follow a famous architectural principle coined by Python's creator, Guido van Rossum:
> *"We are all consenting adults here."*

Python trusts developers to act responsibly and respect conventions rather than imposing rigid language-level handcuffs. To declare that a value is sacred and must never be mutated, Python developers rely on universal **PEP 8 naming conventions**, dedicated configuration modules, and modern static type annotations like `typing.Final`.

---

## Real-World Analogy: Aadhaar Number vs Train Platform Number

Imagine visiting New Delhi Railway Station (`NDLS`):

```
+-------------------------------------------------------------------------+
|                  VARIABLE vs CONSTANT REAL-WORLD ANALOGY                |
+-------------------------------------------------------------------------+

  1. THE CONSTANT (Permanent & Unchanging):
     - Station Code: "NDLS" (New Delhi)
     - Railway Track Gauge: 1676 mm (Broad Gauge)
     - A Citizen's 12-digit Aadhaar Card Number
     -> These values are permanently stamped and universally trusted.
     -> In Python, we write them in ALL_CAPS: STATION_CODE = "NDLS"

  2. THE VARIABLE (Dynamic & Changing):
     - Shatabdi Express Arrival Platform: Platform 1 -> Platform 3 -> Platform 5
     - Train Speed: 0 km/h -> 110 km/h -> 45 km/h
     - Waiting Room Passenger Count: 42 -> 78 -> 19
     -> These values fluctuate continuously during runtime.
     -> In Python, we write them in snake_case: current_platform = 3
+-------------------------------------------------------------------------+
```

When a software engineer inspects a 10,000-line Python codebase and sees a variable named `MAX_RETRY_ATTEMPTS`, they immediately know: *"Do not reassign this variable inside any function!"*

---

## Visual Architecture: Memory & Linter Boundary

Even though Python allows runtime reassignment of uppercase variables, modern IDEs (like VS Code with Pylance) and static typecheckers (like `mypy`) will sound an alarm if you violate constancy when using `Final`:

```
===========================================================================
        PYTHON CONSTANT RUNTIME BEHAVIOR vs STATIC ANALYSIS
===========================================================================

  Code:
  -----
  from typing import Final

  MAX_LOGIN_ATTEMPTS: Final[int] = 3

  # Somewhere in a controller:
  MAX_LOGIN_ATTEMPTS = 5   <--- Reassignment attempt!

  +-----------------------------------------------------------------------+
  | 1. RUNTIME PYTHON INTERPRETER (CPython):                              |
  |    - Does NOT crash. CPython executes: name -> new integer 5.         |
  |    - "Consenting adults" rule: The interpreter permits mutation.      |
  +-----------------------------------------------------------------------+
                                  |
                                  v
  +-----------------------------------------------------------------------+
  | 2. STATIC TYPE CHECKER / IDE (Pylance / VS Code / MyPy):              |
  |    - Red squiggly underline appears immediately under line!           |
  |    - Diagnostic Error:                                                |
  |      "Cannot assign member 'MAX_LOGIN_ATTEMPTS' because it is Final." |
  |    - Build pipeline / CI / CD will fail before deployment!            |
  +-----------------------------------------------------------------------+
```

---

## 1. The PEP 8 All-Caps Naming Convention

According to the official **PEP 8 style guide**, constants must be written entirely in capital letters with underscores separating words:

```python
# ==========================================================
# Example 1: Standard PEP 8 Constant Declarations
# ==========================================================

# Mathematical & Physics constants
PI = 3.141592653589793
SPEED_OF_LIGHT_MPS = 299792458
EARTH_GRAVITY = 9.80665

# Application configuration constants
MAX_DB_CONNECTIONS = 20
DEFAULT_TIMEOUT_SECONDS = 30
API_BASE_URL = "https://api.mskinstitute.in/v1"
SUPPORT_EMAIL = "admissions@mskinstitute.in"

# Financial & Business rules
CGST_RATE = 0.09  # 9% Central GST
SGST_RATE = 0.09  # 9% State GST

print("Base API Endpoint :", API_BASE_URL)
print("Default Timeout   :", DEFAULT_TIMEOUT_SECONDS, "seconds")
print("Total GST Rate    :", (CGST_RATE + SGST_RATE) * 100, "%")
```

### Output:
```text
Base API Endpoint : https://api.mskinstitute.in/v1
Default Timeout   : 30 seconds
Total GST Rate    : 18.0 %
```

---

## 2. Enforcing Constancy with `typing.Final` (Python 3.8+)

Introduced in **PEP 591** and Python 3.8, the `Final` qualifier from the standard library `typing` module allows developers to declare that a variable should never be reassigned or overridden.

```python
# ==========================================================
# Example 2: Using typing.Final for Strict Static Typing
# ==========================================================
from typing import Final

# Annotated with explicit data type
APPLICATION_NAME: Final[str] = "MSK EduPortal"
DATABASE_PORT: Final[int] = 5432
IS_PRODUCTION: Final[bool] = False

# Annotated with inferred data type
MAX_UPLOAD_SIZE_MB: Final = 25

print(f"System: {APPLICATION_NAME}")
print(f"Port  : {DATABASE_PORT}")
print(f"Limit : {MAX_UPLOAD_SIZE_MB} MB")

# Accidental reassignment attempt:
# If you run `mypy script.py` or inspect this in VS Code,
# the tool will warn: "Cannot assign to Final name 'DATABASE_PORT'"
# DATABASE_PORT = 3306
```

### Output:
```text
System: MSK EduPortal
Port  : 5432
Limit : 25 MB
```

---

## 3. Best Practice: Dedicated Configuration Modules (`config.py`)

In professional enterprise software, constants are almost never scattered across random business logic files. Instead, they are centralized in a dedicated module—typically named `constants.py`, `config.py`, or `settings.py`.

### Project File Structure:
```text
my_banking_app/
│
├── config.py          # Centralized constants repository
└── transaction.py     # Application logic importing constants
```

### File 1: `config.py`
```python
# config.py - Centralized system constants
from typing import Final

BANK_NAME: Final[str] = "Hindustan National Bank"
IFSC_PREFIX: Final[str] = "HNBK"
MINIMUM_ACCOUNT_BALANCE: Final[float] = 1000.00
DAILY_ATM_WITHDRAWAL_LIMIT: Final[int] = 50000
CURRENCY_SYMBOL: Final[str] = "INR"
```

### File 2: `transaction.py`
```python
# transaction.py - Business logic using configuration
import config

def verify_atm_withdrawal(account_balance: float, requested_amount: int) -> bool:
    print(f"Connecting to {config.BANK_NAME} Gateway...")
    
    # Check 1: Exceeds daily ATM ceiling?
    if requested_amount > config.DAILY_ATM_WITHDRAWAL_LIMIT:
        print(f"FAILED: Exceeds maximum limit of {config.CURRENCY_SYMBOL} {config.DAILY_ATM_WITHDRAWAL_LIMIT}")
        return False
        
    # Check 2: Violates minimum threshold?
    remaining = account_balance - requested_amount
    if remaining < config.MINIMUM_ACCOUNT_BALANCE:
        print(f"FAILED: Account balance cannot drop below {config.CURRENCY_SYMBOL} {config.MINIMUM_ACCOUNT_BALANCE}")
        return False
        
    print(f"SUCCESS: Dispensing {config.CURRENCY_SYMBOL} {requested_amount}. New balance: {config.CURRENCY_SYMBOL} {remaining}")
    return True

# Simulate transactions
verify_atm_withdrawal(account_balance=15000.00, requested_amount=60000)
verify_atm_withdrawal(account_balance=5000.00, requested_amount=4500)
verify_atm_withdrawal(account_balance=12000.00, requested_amount=3000)
```

### Output:
```text
Connecting to Hindustan National Bank Gateway...
FAILED: Exceeds maximum limit of INR 50000
Connecting to Hindustan National Bank Gateway...
FAILED: Account balance cannot drop below INR 1000.0
Connecting to Hindustan National Bank Gateway...
SUCCESS: Dispensing INR 3000. New balance: INR 9000.0
```

---

## 4. Mutable Objects as Constants (The Sneaky Trap)

A critical nuance in Python is that marking a container (like a `list` or `dict`) in `ALL_CAPS` or with `Final` only prevents reassigning the variable name to a new object. It does **not** make the internal contents immutable!

```python
# ==========================================================
# Example 3: The Mutable Constant Trap
# ==========================================================
from typing import Final

# TRAP: This list is declared in ALL_CAPS, but lists are mutable!
ALLOWED_ROLES: Final = ["ADMIN", "MANAGER", "INSTRUCTOR"]

# While reassigning is flagged by linters:
# ALLOWED_ROLES = ["SUPERUSER"]  <- Flagged by Pylance

# Modifying the list in-place silently mutates your constant!
ALLOWED_ROLES.append("HACKER")
print("Compromised Roles:", ALLOWED_ROLES)

# ---------------------------------------------------------
# SOLUTION: Use an immutable container (tuple or frozenset)!
# ---------------------------------------------------------
SAFE_ALLOWED_ROLES: Final = ("ADMIN", "MANAGER", "INSTRUCTOR")

# SAFE_ALLOWED_ROLES.append("HACKER")  <- AttributeError: 'tuple' object has no attribute 'append'
print("Safe Immutable Roles:", SAFE_ALLOWED_ROLES)
```

### Output:
```text
Compromised Roles: ['ADMIN', 'MANAGER', 'INSTRUCTOR', 'HACKER']
Safe Immutable Roles: ('ADMIN', 'MANAGER', 'INSTRUCTOR')
```

> **Pro Tip:** Whenever you create a constant collection of values, always use a `tuple` (or `frozenset`) instead of a `list` (or `set`) to guarantee true runtime immutability!

---

## Do's and Don'ts: Constant Management

| Practice | Bad Example | Good Example | Why It Matters |
| :--- | :--- | :--- | :--- |
| **Casing Standard** | `max_users = 100` | `MAX_USERS = 100` | Signals instantly to fellow developers that the value is read-only. |
| **Magic Numbers** | `fee = amount * 0.18` | `fee = amount * GST_TAX_RATE` | Eliminates enigmatic numbers; allows single-point updates when rules change. |
| **Static Enforcement** | `TIMEOUT = 60` | `TIMEOUT: Final[int] = 60` | Enables VS Code and `mypy` to detect accidental reassignment before deployment. |
| **Collection Types** | `COLORS = ["red", "blue"]` | `COLORS = ("red", "blue")` | Tuples prevent accidental in-place mutation like `.append()` or `.clear()`. |
| **Centralization** | Declaring `PI` inside 5 files | Importing `PI` from `config.py` | Eliminates duplicated values and maintains a single source of truth. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                     PYTHON CONSTANTS CHEAT SHEET                        |
+-------------------------------------------------------------------------+
  - Built-in Keyword:      None (Python has no 'const' keyword)
  - PEP 8 Standard:        SCREAMING_SNAKE_CASE (e.g., MAX_RETRIES = 5)
  - Python 3.8+ Linter:    from typing import Final; RATE: Final = 0.18
  - Immutable Containers:  Use tuples for lists: ('GET', 'POST')
  - Organization:          Store in config.py or settings.py and import
  - Philosophy:            "We are all consenting adults here"
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. How does the standard CPython runtime interpreter react if you reassign an uppercase variable like `PI = 3.14` to `PI = 9.99`?
A. CPython throws a fatal `ConstAssignmentError` and halts execution
B. CPython executes the reassignment without crashing because uppercase naming is a convention, not an enforced runtime keyword
C. CPython prompts the user for administrator confirmation
D. CPython automatically resets the value back to 3.14

**Answer:** B
**Explanation:** Python does not have a language-level `const` keyword. The `ALL_CAPS` standard is a PEP 8 developer convention. The CPython interpreter treats it as an ordinary variable at runtime, though linters will warn against reassigning it.

---

### 2. Which module and class from the standard library should you import to enable static type checkers to flag constant reassignment in Python 3.8+?
A. `import constant from sys`
B. `from typing import Final`
C. `from builtins import ReadOnly`
D. `import static from os`

**Answer:** B
**Explanation:** PEP 591 introduced `Final` into the standard `typing` module in Python 3.8. Marking a variable as `RATE: Final = 0.05` instructs static analyzers like MyPy and Pylance to report an error if that variable is reassigned.

---

### 3. Which data structure should you choose to store constant fixed options (like HTTP methods) to prevent accidental runtime mutation?
A. A mutable `list` such as `METHODS = ["GET", "POST"]`
B. An immutable `tuple` such as `METHODS = ("GET", "POST")`
C. A standard `set`
D. A dynamic bytearray

**Answer:** B
**Explanation:** While a `list` marked in ALL_CAPS can still be modified via `.append()` or `.pop()`, a `tuple` is fundamentally immutable. Any attempt to modify a tuple at runtime raises a `TypeError`.

---

### 4. Which of the following conforms to the official PEP 8 naming convention for constants?
A. `maximumUserLimit = 500`
B. `Maximum_User_Limit = 500`
C. `MAXIMUM_USER_LIMIT = 500`
D. `__max_user_limit__ = 500`

**Answer:** C
**Explanation:** PEP 8 explicitly specifies that constants should be written in capital letters with underscores separating words (`SCREAMING_SNAKE_CASE`), such as `MAXIMUM_USER_LIMIT`.

---

### 5. What is the recommended architectural design pattern for managing constants across a multi-file Python project?
A. Hardcoding raw numbers inside every mathematical function
B. Centralizing constants inside a dedicated `config.py` or `constants.py` module and importing it wherever needed
C. Declaring constants inside Windows registry keys
D. Creating temporary text files on the desktop and reading them line by line

**Answer:** B
**Explanation:** Centralizing configuration values and constants inside a dedicated `config.py` or `constants.py` provides a single source of truth, avoids duplication, and makes project-wide maintenance effortless.

---

# Hands-On Practice Challenge: E-Commerce GST Invoice Engine

Write a complete Python script that calculates customer checkout pricing using immutable constants and configuration flags.

```python
# ==========================================================
# Challenge 10: E-Commerce GST Billing Engine
# MSK Institute of Technology
# ==========================================================
from typing import Final

# ----------------------------------------------------------
# 1. System Constants & Tax Brackets (PEP 8 Standard)
# ----------------------------------------------------------
STORE_NAME: Final[str] = "Bharat Digital Bazaar"
CURRENCY: Final[str] = "INR"

# Tax Rates (9% Central GST + 9% State GST = 18% Total)
CGST_RATE: Final[float] = 0.09
SGST_RATE: Final[float] = 0.09

# Shipping Policy Constants
FREE_SHIPPING_THRESHOLD: Final[float] = 999.00
STANDARD_SHIPPING_FEE: Final[float] = 70.00

# ----------------------------------------------------------
# 2. Invoice Calculation Function
# ----------------------------------------------------------
def generate_tax_invoice(customer_name: str, item_subtotal: float) -> None:
    # Calculate Tax Components
    cgst_amount = item_subtotal * CGST_RATE
    sgst_amount = item_subtotal * SGST_RATE
    total_tax = cgst_amount + sgst_amount

    # Determine Shipping Fee
    if item_subtotal >= FREE_SHIPPING_THRESHOLD:
        shipping_fee = 0.0
        shipping_note = "FREE (Order >= INR 999)"
    else:
        shipping_fee = STANDARD_SHIPPING_FEE
        shipping_note = f"{CURRENCY} {STANDARD_SHIPPING_FEE:.2f}"

    grand_total = item_subtotal + total_tax + shipping_fee

    # ------------------------------------------------------
    # 3. Print Formatted Tax Invoice
    # ------------------------------------------------------
    print("=" * 48)
    print(f"        {STORE_NAME.upper()}")
    print("           GST TAX INVOICE (RULE 46)")
    print("=" * 48)
    print(f"Customer Name  : {customer_name}")
    print(f"Cart Subtotal  : {CURRENCY} {item_subtotal:>10.2f}")
    print(f"CGST (9.0%)    : {CURRENCY} {cgst_amount:>10.2f}")
    print(f"SGST (9.0%)    : {CURRENCY} {sgst_amount:>10.2f}")
    print(f"Shipping Fee   : {shipping_note:>14}")
    print("-" * 48)
    print(f"GRAND TOTAL    : {CURRENCY} {grand_total:>10.2f}")
    print("=" * 48)
    print("  Thank you for shopping local with Bharat Bazaar!\n")


# ----------------------------------------------------------
# Test Cases
# ----------------------------------------------------------
generate_tax_invoice(customer_name="Pooja Sharma", item_subtotal=450.00)
generate_tax_invoice(customer_name="Vikram Verma", item_subtotal=1499.00)
```

### Expected Program Output:
```text
================================================
        BHARAT DIGITAL BAZAAR
           GST TAX INVOICE (RULE 46)
================================================
Customer Name  : Pooja Sharma
Cart Subtotal  : INR     450.00
CGST (9.0%)    : INR      40.50
SGST (9.0%)    : INR      40.50
Shipping Fee   :     INR 70.00
------------------------------------------------
GRAND TOTAL    : INR     601.00
================================================
  Thank you for shopping local with Bharat Bazaar!

================================================
        BHARAT DIGITAL BAZAAR
           GST TAX INVOICE (RULE 46)
================================================
Customer Name  : Vikram Verma
Cart Subtotal  : INR    1499.00
CGST (9.0%)    : INR     134.91
SGST (9.0%)    : INR     134.91
Shipping Fee   : FREE (Order >= INR 999)
------------------------------------------------
GRAND TOTAL    : INR    1768.82
================================================
  Thank you for shopping local with Bharat Bazaar!
```
