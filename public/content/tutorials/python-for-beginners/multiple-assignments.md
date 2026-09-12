---
id: multiple-assignments
slug: multiple-assignments
course: python-for-beginners
chapter: Variables
topic: "Multiple Variable Assignments and Tuple Unpacking Basics"
difficulty: Beginner
readingTime: 12
order: 9
keywords: ["multiple assignments python", "tuple unpacking python", "swapping variables python", "python starred unpacking", "chained assignment python", "simultaneous assignment"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Multiple Variable Assignments and Tuple Unpacking Basics

Imagine standing in a school assembly hall where the physical education teacher instructs: *"House captains of Red, Green, and Blue houses, step forward and collect your sports day banners simultaneously."* The three captains step forward together, and three banners are handed over in one coordinated motion. Nobody has to wait in a single-file line for ten minutes.

In traditional programming languages like C or Java, assigning values or swapping two variables requires clumsy multi-line steps and temporary holding variables (`int temp = a; a = b; b = temp;`). In Python, **Multiple Variable Assignments and Unpacking** let you initialize multiple values, unpack lists, and swap variables in a single, beautiful line of code!

---

## 1. Simultaneous Assignment (Multiple Values to Multiple Variables)

You can assign multiple variables on a single line by separating both names and values with commas:

```python
# Initialize coordinates
x, y, z = 10, 20, 30

# Initialize student profile
name, roll_no, marks = "Karan", 105, 94.5

print(f"Scholar: {name} | Roll: {roll_no} | Marks: {marks}")
```

```
+-------------------------------------------------------------------------+
|                  SIMULTANEOUS MULTIPLE ASSIGNMENT                       |
+-------------------------------------------------------------------------+

     Variables:    name   ,   roll_no   ,   marks
                    |            |            |
                    v            v            v
     Values:     "Karan"  ,     105     ,    94.5
```

> [!IMPORTANT]
> **Count Matching Rule:**
> The number of variables on the left side MUST match the number of values on the right side.
> - `a, b = 1, 2, 3` $\to$ **`ValueError: too many values to unpack (expected 2)`**
> - `a, b, c = 1, 2` $\to$ **`ValueError: not enough values to unpack (expected 3, got 2)`**

---

## 2. Chained Assignment (One Value to Multiple Variables)

If multiple variables need the exact same starting value, chain them together with equals signs:

```python
score_math = score_science = score_english = 100

print(score_math)     # 100
print(score_science)  # 100
print(score_english)  # 100
```

> [!WARNING]
> **The Mutable Object Trap with Chained Assignment:**
> Never use chained assignment with mutable collections like lists or dictionaries:
> ```python
> # DANGER! Both list_a and list_b point to the EXACT SAME list in memory!
> list_a = list_b = []
> list_a.append("Apple")
> print(list_b)  # Surprise! list_b also has ['Apple']!
> 
> # CORRECT WAY: Create separate independent lists
> list_a, list_b = [], []
> ```

---

## 3. The Iconic Python Swap: `a, b = b, a`

In other programming languages, swapping two numbers requires creating a temporary third variable:

```python
# The Clumsy Traditional Way (C / Java style):
temp = a
a = b
b = temp

# THE ELEGANT PYTHONIC WAY (Single line, zero temp variable!):
a, b = b, a
```

### How does this work under the hood?
1. Python first evaluates the entire right-hand side (`b, a`) and packs it into a temporary tuple in memory `(b, a)`.
2. It then unpacks that tuple into the left-hand targets `a` and `b`. The swap happens simultaneously!

---

## 4. Advanced: Extended Unpacking with the Asterisk (`*`)

What if you have a list of 6 examination scores, and you want to separate the first rank, the last rank, and collect all the middle scores together? Python provides the **starred expression (`*`)**:

```python
scores = [98, 92, 89, 84, 78, 65]

# Unpack first, middle scores as a list, and last!
topper, *middle_scores, lowest = scores

print("Highest Score :", topper)         # 98
print("Middle Scores  :", middle_scores)  # [92, 89, 84, 78] (Collected into a list!)
print("Lowest Score   :", lowest)         # 65
```

---

## 5. Do's and Don'ts of Multiple Assignments

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Swapping** | Use `a, b = b, a` for swapping two variables. | Introduce a manual `temp` variable out of habit from other languages. |
| **Balance** | Ensure the number of variables matches the values being unpacked. | Ignore variable count, triggering runtime `ValueError` unpacking crashes. |
| **Mutable Lists** | Initialize separate lists: `list_a, list_b = [], []`. | Chain mutable objects: `list_a = list_b = []`, creating accidental shared state. |
| **Readability** | Limit multiple assignment to 3 or 4 related variables. | Jam 15 unrelated variables onto a single giant, unreadable 200-character line. |

---

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  MULTIPLE ASSIGNMENT CHEAT SHEET                        |
+-------------------------------------------------------------------------+

  - Multiple values:    x, y, z = 1, 2, 3
  - Same value:         a = b = c = 0 (Primitives only!)
  - Variable swap:      a, b = b, a
  - Starred capture:    first, *rest, last = [10, 20, 30, 40, 50]
  - Error to avoid:     ValueError: too many / not enough values to unpack
```

---

# Multiple Choice Questions

### 1. How do you swap the values of two variables `x` and `y` in idiomatic Python?
A. `swap(x, y)`
B. `x, y = y, x`
C. `x = y; y = x`
D. `x.swap(y)`

**Answer:** B
**Explanation:** Python allows simultaneous tuple assignment. `x, y = y, x` packs the right-hand values into a temporary tuple and unpacks them into the left-hand variables, swapping their values without a temporary variable.

---

### 2. What happens if you execute `a, b, c = [10, 20]` in Python?
A. `c` is automatically assigned `None`
B. Python raises a `ValueError: not enough values to unpack (expected 3, got 2)`
C. `c` is assigned `0`
D. The script ignores the error and continues

**Answer:** B
**Explanation:** Python requires an exact 1-to-1 match between the number of variables on the left and elements in the sequence on the right. Having fewer elements than variables triggers a `ValueError`.

---

### 3. What will be the value of `b` after executing: `a, *b, c = [1, 2, 3, 4, 5]`?
A. `[2, 3, 4]`
B. `2`
C. `[2, 3]`
D. `(2, 3, 4)`

**Answer:** A
**Explanation:** The starred variable `*b` collects all remaining elements between `a` (which takes the first element `1`) and `c` (which takes the last element `5`). Therefore, `b` is assigned `[2, 3, 4]`.

---

### 4. Why is chaining list assignments like `list_1 = list_2 = []` dangerous in Python?
A. Lists cannot be assigned with equals signs
B. Both variables point to the exact same mutable list object in memory, meaning mutating `list_1` will unexpectedly mutate `list_2`
C. It causes a memory leak on Windows
D. Python limits lists to 10 elements

**Answer:** B
**Explanation:** In chained assignment, both variables receive references to the same object. Because lists are mutable, calling `list_1.append()` will modify the list that `list_2` also references.

---

### 5. What will be printed by the following code:
```python
x, y = 5, 10
x, y = y, x + y
print(x, y)
```
A. `10 15`
B. `10 20`
C. `5 15`
D. `15 15`

**Answer:** A
**Explanation:** In simultaneous assignment, the entire right-hand side is evaluated first using current values: `y` is `10`, and `x + y` is `5 + 10 = 15`. Then the values are assigned: `x = 10`, `y = 15`.

---

# Hands-On Practice Challenge: Coordinate Swapper & Data Unpacker

Run this program to explore simultaneous assignment, the classic Fibonacci sequence generator, and starred sequence extraction.

```python
# ==========================================================
# Challenge 9: Multiple Assignment & Unpacking Lab
# MSK Institute of Technology
# ==========================================================

print("=" * 60)
print("     MULTIPLE ASSIGNMENT & TUPLE UNPACKING LAB")
print("=" * 60)

# 1. Coordinate Point Initialization
x, y, z = 100, 250, -45
print(f"3D Space Vector  : X={x}, Y={y}, Z={z}")

# 2. Variable Swapping in Action
print("\n--- 1. Variable Swapping ---")
first_place = "Rohan"
second_place = "Priya"
print(f"Before Inversion : 1st: {first_place} | 2nd: {second_place}")

# Swap positions
first_place, second_place = second_place, first_place
print(f"After Inversion  : 1st: {first_place} | 2nd: {second_place}")

# 3. Generating Fibonacci Numbers using Simultaneous Assignment
print("\n--- 2. Fibonacci Sequence Generation ---")
print("First 8 Fibonacci numbers computed via a, b = b, a + b:")
a, b = 0, 1
for _ in range(8):
    print(a, end=" ")
    a, b = b, a + b
print()

# 4. Starred Unpacking on Tournament Scores
print("\n--- 3. Starred List Unpacking ---")
cricket_scores = [124, 86, 54, 42, 38, 18, 4]

# Extract captain, middle order, and tail-enders
captain_score, vice_captain, *middle_order, last_man = cricket_scores

print(f"Captain's Innings : {captain_score} runs")
print(f"Vice Captain      : {vice_captain} runs")
print(f"Middle Order Runs : {middle_order}")
print(f"Last Batsman      : {last_man} runs")
print("=" * 60)
```

### Expected Program Output:
```text
============================================================
     MULTIPLE ASSIGNMENT & TUPLE UNPACKING LAB
============================================================
3D Space Vector  : X=100, Y=250, Z=-45

--- 1. Variable Swapping ---
Before Inversion : 1st: Rohan | 2nd: Priya
After Inversion  : 1st: Priya | 2nd: Rohan

--- 2. Fibonacci Sequence Generation ---
First 8 Fibonacci numbers computed via a, b = b, a + b:
0 1 1 2 3 5 8 13 

--- 3. Starred List Unpacking ---
Captain's Innings : 124 runs
Vice Captain      : 86 runs
Middle Order Runs : [54, 42, 38, 18]
Last Batsman      : 4 runs
============================================================
```
