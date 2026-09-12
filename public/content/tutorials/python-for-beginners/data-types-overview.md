---
id: python-data-types-overview
slug: data-types-overview
course: python-for-beginners
chapter: 3
topic: 3.1
title: Data Types Overview
description: Master Python built-in data types, categorize scalar primitives vs compound collections, and understand the crucial distinction between mutable and immutable objects.
difficulty: Beginner
readingTime: 14
order: 11
keywords:
  - python data types
  - primitives vs collections
  - mutable vs immutable
  - int float str bool
  - list tuple set dict
  - nonetype
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Python Data Types Overview: Primitives, Collections, & Memory Mutability

In computer programming, a **data type** defines the nature of a piece of information stored in memory. It tells the Python interpreter two critical things:
1. **How much memory** to allocate and how to represent the bits.
2. **What operations** are legally permissible on that value (e.g., you can multiply two numbers, but you cannot divide two sentences).

Because Python is **dynamically typed**, you never need to declare types explicitly like in C++ or Java (e.g., `int count = 10;`). Instead, Python inspects the value on the right-hand side of the assignment operator (`=`) at runtime and assigns the appropriate internal class. In Python, **everything is an object**, and every object has an associated type class.

---

## Real-World Analogy: The Indian Kitchen Organization

Think of memory in a Python program like an organized Indian kitchen:

```
+-------------------------------------------------------------------------+
|                  PYTHON DATA TYPES AS KITCHEN CONTAINERS                |
+-------------------------------------------------------------------------+

  1. SCALAR / PRIMITIVE TYPES (Single Distinct Items):
     - Single green chili or cinnamon stick -> int (42) or float (3.14)
     - A handwritten recipe label           -> str ("Garam Masala")
     - Gas stove burner status (ON / OFF)   -> bool (True / False)
     - An empty, unused spice container     -> NoneType (None)

  2. COMPOUND / COLLECTION TYPES (Containers Holding Multiple Items):
     - Masala Dabba (Open Steel Container)  -> list (Mutable! You can add,
                                               remove, or swap spices daily)
     - Sealed Pickling Jar (Achaar Martaban)-> tuple (Immutable! Once sealed,
                                               nobody alters the contents)
     - Unique Grain Sieve                   -> set (Filters out duplicate
                                               pebbles; unordered, unique)
     - Spice Rack with Name Tags            -> dict (Key-Value: "Chili" -> 200g,
                                               "Turmeric" -> 100g)
+-------------------------------------------------------------------------+
```

---

## Visual Architecture: The Python Type Taxonomy

Every built-in type in Python falls under a well-defined family:

```
===========================================================================
                     PYTHON BUILT-IN TYPE HIERARCHY
===========================================================================

                          +--------------------+
                          |    Python Object   |
                          +---------+----------+
                                    |
        +---------------------------+----------------------------+
        |                           |                            |
+-------v--------+          +-------v--------+           +-------v--------+
|    NUMERIC     |          |   SEQUENCES    |           |    MAPPINGS    |
+-------+--------+          +-------+--------+           +-------+--------+
| int (arbitrary)|          | str  (text)    |           | dict           |
| float (IEEE)   |          | list (mutable) |           | (key: value)   |
| complex (real) |          | tuple (immu)   |           +----------------+
| bool (True/1)  |          | range (stream) |
+----------------+          +----------------+
        |                           |
+-------v--------+          +-------v--------+           +----------------+
|      SETS      |          |    BINARIES    |           |   SINGLETONS   |
+-------+--------+          +-------+--------+           +-------+--------+
| set   (mutable)|          | bytes (immu)   |           | NoneType (None)|
| frozenset (im) |          | bytearray (mut)|           | NotImplemented |
+----------------+          +----------------+           +----------------+
```

---

## 1. Scalar Primitives (Singular Values)

Scalar primitives represent atomic pieces of data that cannot be broken down into smaller accessible items.

```python
# ==========================================================
# Example 1: Scalar Primitives
# ==========================================================

# 1. Integers (Whole numbers of infinite precision)
student_count = 145
earth_population = 8_000_000_000  # Underscores enhance readability

# 2. Floats (Real numbers with decimals)
temperature_celsius = 36.6
gold_rate_per_gram = 7150.85

# 3. Booleans (Logical True / False - subclass of int!)
is_enrolled = True
has_fee_due = False

# 4. Complex Numbers (Real + Imaginary component 'j')
impedance = 4 + 7j

# 5. NoneType (Represents absence of value or null)
scholarship_grant = None

print("Student Count :", student_count, "-> Type:", type(student_count))
print("Gold Rate     :", gold_rate_per_gram, "-> Type:", type(gold_rate_per_gram))
print("Enrolled Flag :", is_enrolled, "-> Type:", type(is_enrolled))
print("Complex Num   :", impedance, "-> Type:", type(impedance))
print("Scholarship   :", scholarship_grant, "-> Type:", type(scholarship_grant))
```

### Output:
```text
Student Count : 145 -> Type: <class 'int'>
Gold Rate     : 7150.85 -> Type: <class 'float'>
Enrolled Flag : True -> Type: <class 'bool'>
Complex Num   : (4+7j) -> Type: <class 'complex'>
Scholarship   : None -> Type: <class 'NoneType'>
```

---

## 2. Compound Collections (Data Structures)

Collections allow you to bundle, index, search, and iterate over multiple values under a single identifier.

```python
# ==========================================================
# Example 2: The 4 Core Collection Types
# ==========================================================

# 1. LIST: Ordered, mutable, allows duplicates
metro_stations = ["Rajiv Chowk", "Hauz Khas", "Kashmere Gate", "Rajiv Chowk"]

# 2. TUPLE: Ordered, immutable, allows duplicates
gps_coordinates = (28.6139, 77.2090)  # Latitude, Longitude of New Delhi

# 3. SET: Unordered, mutable, unique items only (duplicates dropped)
unique_subject_codes = {"CS101", "MA102", "EC103", "CS101"}

# 4. DICTIONARY: Key-Value pairs, fast lookup, ordered by insertion
student_profile = {
    "roll_no": 1042,
    "name": "Arjun Patel",
    "city": "Ahmedabad",
    "cgpa": 8.75
}

print("List Items       :", metro_stations)
print("Tuple (GPS)      :", gps_coordinates)
print("Set (Unique)     :", unique_subject_codes)
print("Dict (Profile)   :", student_profile)
```

### Output:
```text
List Items       : ['Rajiv Chowk', 'Hauz Khas', 'Kashmere Gate', 'Rajiv Chowk']
Tuple (GPS)      : (28.6139, 77.209)
Set (Unique)     : {'CS101', 'EC103', 'MA102'}
Dict (Profile)   : {'roll_no': 1042, 'name': 'Arjun Patel', 'city': 'Ahmedabad', 'cgpa': 8.75}
```

---

## 3. The Cornerstone Concept: Mutability vs Immutability

Understanding **mutability** is the single most important conceptual milestone in Python.
- **Mutable objects:** Their internal state can be changed in-place without altering their memory address (`id()`).
- **Immutable objects:** Their value can **never** be changed once created in memory. If you modify them, Python allocates an entirely new object with a new memory address.

```
+-------------------+---------------------------------------------------+
| CATEGORY          | DATA TYPES                                        |
+-------------------+---------------------------------------------------+
| Immutable Objects | int, float, complex, bool, str, tuple, frozenset  |
| Mutable Objects   | list, dict, set, bytearray                        |
+-------------------+---------------------------------------------------+
```

### Proof of Mutability in Code:

```python
# ==========================================================
# Example 3: Verifying Memory Identity (id())
# ==========================================================

# --- TEST 1: Strings are IMMUTABLE ---
city = "Jaipur"
original_city_id = id(city)
print(f"Original City: {city} at memory id: {original_city_id}")

city = city + " Pink City"
new_city_id = id(city)
print(f"Updated City : {city} at memory id: {new_city_id}")
print(f"Did string allocate a new memory address? {original_city_id != new_city_id}")

print("-" * 55)

# --- TEST 2: Lists are MUTABLE ---
cart = ["Laptop", "Mouse"]
original_cart_id = id(cart)
print(f"Original Cart: {cart} at memory id: {original_cart_id}")

cart.append("Keyboard")
new_cart_id = id(cart)
print(f"Updated Cart : {cart} at memory id: {new_cart_id}")
print(f"Did list maintain the EXACT same memory address? {original_cart_id == new_cart_id}")
```

### Output:
```text
Original City: Jaipur at memory id: 2195828407856
Updated City : Jaipur Pink City at memory id: 2195828598448
Did string allocate a new memory address? True
-------------------------------------------------------
Original Cart: ['Laptop', 'Mouse'] at memory id: 2195828723200
Updated Cart : ['Laptop', 'Mouse', 'Keyboard'] at memory id: 2195828723200
Did list maintain the EXACT same memory address? True
```

---

## 4. The Curious Case of `bool` as a Subclass of `int`

In Python, the boolean type `bool` is actually a direct subclass of `int`!
- `True` has an internal integer value of `1`.
- `False` has an internal integer value of `0`.

```python
# ==========================================================
# Example 4: Boolean Arithmetic Quirks
# ==========================================================

print("True + True   :", True + True)       # 1 + 1 = 2
print("True * 50     :", True * 50)         # 1 * 50 = 50
print("False * 100    :", False * 100)       # 0 * 100 = 0
print("isinstance(True, int):", isinstance(True, int))  # True!
```

### Output:
```text
True + True   : 2
True * 50     : 50
False * 100    : 0
isinstance(True, int): True
```

---

## Do's and Don'ts: Choosing Data Types

| Situation | Don't Do This | Do This | Why |
| :--- | :--- | :--- | :--- |
| **Fixed Records** | Using a `list` for GPS lat/long: `[28.6, 77.2]` | Using a `tuple`: `(28.6, 77.2)` | Prevents accidental modification of geographical coordinates. |
| **Unique Lookups** | Storing tags in a `list` and running manual deduplication | Storing tags in a `set` | Sets guarantee uniqueness automatically and offer $O(1)$ lookup time. |
| **Empty Value** | Using empty string `""` or `0` to mean "not provided" | Using `None` | Clearly separates "zero" or "blank text" from true absence of data. |
| **Dictionary Keys** | Using a mutable `list` as a dict key | Using an immutable `str`, `int`, or `tuple` as key | Dictionary keys must be hashable; mutable lists raise `TypeError: unhashable type`. |

---

## Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                      DATA TYPES CHEAT SHEET                             |
+-------------------------------------------------------------------------+
  - Numbers:         int (infinite digits), float (decimals), complex (j)
  - Text:            str (immutable Unicode text in quotes)
  - Logic:           bool (True / False - subclass of int)
  - Missing State:   None (singleton of NoneType)
  - Collections:     
      * list  : [1, 2, 3]         -> Ordered, Mutable, Allows Duplicates
      * tuple : (1, 2, 3)         -> Ordered, Immutable, Allows Duplicates
      * set   : {1, 2, 3}         -> Unordered, Unique, Fast Membership Check
      * dict  : {'k': 'v'}        -> Key-Value pairs, Fast Hashed Access
  - Inspection:      type(x) to inspect class, isinstance(x, Class) to verify
+-------------------------------------------------------------------------+
```

---

# Multiple Choice Questions

### 1. Which of the following Python built-in data types is classified as mutable?
A. `tuple`
B. `str`
C. `list`
D. `float`

**Answer:** C
**Explanation:** Lists in Python are mutable. You can append, remove, or modify items in-place without altering the list's memory address. Tuples, strings, and floats are immutable.

---

### 2. What is the data type and class representation of the literal `None` in Python?
A. `<class 'null'>`
B. `<class 'void'>`
C. `<class 'NoneType'>`
D. `<class 'undefined'>`

**Answer:** C
**Explanation:** The `None` object represents the absence of a value or null state. It is a singleton belonging to `<class 'NoneType'>`.

---

### 3. What will be the output of evaluating `print(type(True), isinstance(True, int))`?
A. `<class 'bool'> False`
B. `<class 'bool'> True`
C. `<class 'int'> True`
D. `<class 'boolean'> False`

**Answer:** B
**Explanation:** `True` belongs to `<class 'bool'>`. In Python, the `bool` class is an explicit subclass of `int` where `True == 1` and `False == 0`. Therefore, `isinstance(True, int)` evaluates to `True`.

---

### 4. Which collection type automatically eliminates duplicate values upon initialization?
A. `list`
B. `tuple`
C. `set`
D. `dict`

**Answer:** C
**Explanation:** A `set` is an unordered collection of distinct, hashable items. If duplicate values are passed during creation (e.g., `{1, 2, 2, 3}`), the duplicates are discarded, leaving `{1, 2, 3}`.

---

### 5. Why does attempting to use a standard Python list as a dictionary key raise a `TypeError`?
A. Python dictionaries can only accept string keys
B. Lists are mutable and therefore unhashable, whereas dictionary keys must be hashable and immutable
C. Lists take up too much RAM
D. Lists cannot be converted to JSON

**Answer:** B
**Explanation:** Python uses hash tables to implement dictionaries for $O(1)$ fast lookups. Because a list is mutable, its contents (and thus its hypothetical hash) can change at any time, violating hash table invariants. Hence, Python raises `TypeError: unhashable type: 'list'`.

---

# Hands-On Practice Challenge: Polymorphic University Student Registry

Write a script that creates a comprehensive student record utilizing every major Python data type, prints their dynamic types, and demonstrates list mutability vs tuple safety.

```python
# ==========================================================
# Challenge 11: University Student Registry System
# MSK Institute of Technology
# ==========================================================

# 1. Store heterogeneous student attributes using appropriate types
student_record = {
    "student_id": 9042,                           # int
    "full_name": "Divya Mehra",                   # str
    "cgpa": 9.42,                                 # float
    "is_scholarship_holder": True,                # bool
    "disciplinary_remarks": None,                 # NoneType
    "enrolled_semesters": (1, 2, 3, 4),           # tuple (immutable history)
    "current_courses": ["DSA", "DBMS", "OS"],     # list (mutable active courses)
    "programming_skills": {"Python", "C++", "SQL"}# set (unique skills)
}

print("=" * 60)
print("             MSK UNIVERSITY STUDENT PROFILE")
print("=" * 60)

# 2. Iterate through each attribute and inspect its Python type
for field, value in student_record.items():
    type_name = type(value).__name__
    print(f"{field:<23}: {str(value):<20} | Type: {type_name}")

print("=" * 60)

# 3. Demonstrate collection mutability vs immutability
print("ACTION: Student enrolls in an elective course 'Computer Networks'...")
student_record["current_courses"].append("Computer Networks")
print("Updated Active Courses (List):", student_record["current_courses"])

print("\nACTION: Attempting to modify completed semesters tuple...")
try:
    # Tuples do not permit item assignment!
    student_record["enrolled_semesters"][0] = 99  # type: ignore
except TypeError as error:
    print("IMMUTABILITY SHIELD TRIGGERED:", error)

print("=" * 60)
```

### Expected Program Output:
```text
============================================================
             MSK UNIVERSITY STUDENT PROFILE
============================================================
student_id             : 9042                 | Type: int
full_name              : Divya Mehra          | Type: str
cgpa                   : 9.42                 | Type: float
is_scholarship_holder  : True                 | Type: bool
disciplinary_remarks   : None                 | Type: NoneType
enrolled_semesters     : (1, 2, 3, 4)         | Type: tuple
current_courses        : ['DSA', 'DBMS', 'OS'] | Type: list
programming_skills     : {'SQL', 'C++', 'Python'} | Type: set
============================================================
ACTION: Student enrolls in an elective course 'Computer Networks'...
Updated Active Courses (List): ['DSA', 'DBMS', 'OS', 'Computer Networks']

ACTION: Attempting to modify completed semesters tuple...
IMMUTABILITY SHIELD TRIGGERED: 'tuple' object does not support item assignment
============================================================
```
