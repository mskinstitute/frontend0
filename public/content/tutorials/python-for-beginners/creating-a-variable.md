---
id: creating-a-variable
slug: creating-a-variable
course: python-for-beginners
chapter: Variables
topic: "Creating a Variable: Dynamic Typing and Memory Reference Mechanics"
difficulty: Beginner
readingTime: 12
order: 7
keywords: ["creating a variable python", "dynamic typing python", "python memory model", "id function python", "variable assignment", "garbage collection python"]
lastUpdated: 2026-09-12
author: Antigravity Team
version: 1.0.0
---

# Creating a Variable: Dynamic Typing and Memory Reference Mechanics

Imagine attaching a paper luggage tag to a school bag at an airport check-in counter. The paper tag has your name written on it: *"Aarav Sharma"*. The tag itself is not the heavy bag packed with books, clothes, and water bottles; the tag is merely a lightweight pointer tied to the bag with a piece of string. If you later untie that tag and attach it to a completely different leather suitcase, the luggage tag now points to the new suitcase, while the old bag goes to the unclaimed luggage counter.

In languages like C or Java, variables are rigid metal boxes that can only hold one specific data type (like integers). **In Python, variables are those lightweight luggage name tags!** A Python variable holds a memory reference (pointer) to an object stored in computer memory. Understanding this memory model is the secret to mastering Python!

---

## 1. How Assignment Works: The `=` Operator

In Python, you create a variable the exact moment you first assign a value to it using the **single equals sign (`=`)**:

```python
# Creating variables
city = "New Delhi"      # Creates a string object and binds the name 'city'
temperature = 34.5      # Creates a float object and binds 'temperature'
is_sunny = True         # Creates a boolean object and binds 'is_sunny'
```

```
+-------------------------------------------------------------------------+
|                  THE PYTHON VARIABLE REFERENCE MODEL                    |
+-------------------------------------------------------------------------+

  Variable Name (Tag in Namespace)           Object in Heap Memory
  +---------------+                          +-------------------------+
  |  city         | -----------------------> | String Object:          |
  +---------------+                          | "New Delhi"             |
                                             +-------------------------+
  +---------------+                          +-------------------------+
  |  temperature  | -----------------------> | Float Object:           |
  +---------------+                          | 34.5                    |
                                             +-------------------------+
```

---

## 2. Inspecting Memory with `id()`

Every object created in Python is allocated a unique integer identifier representing its address in memory. You can inspect this address using the built-in **`id()`** function:

```python
score_a = 100
score_b = score_a

# Both variables point to the exact same object in memory!
print(id(score_a))  # E.g. 140723849204880
print(id(score_b))  # Exact same memory ID!

# The 'is' operator checks if two tags point to the same memory object
print(score_a is score_b)  # True!
```

---

## 3. Dynamic Typing: Rebinding Names at Runtime

Because Python variables are just reference tags, you can rebind the same variable name to completely different data types throughout the execution of your program:

```python
data = 42
print(data, type(data))  # Output: 42 <class 'int'>

# Rebind 'data' to a string!
data = "Forty-Two"
print(data, type(data))  # Output: Forty-Two <class 'str'>

# Rebind 'data' to a list!
data = [10, 20, 30]
print(data, type(data))  # Output: [10, 20, 30] <class 'list'>
```

> [!NOTE]
> In Python, **variables do not have types—objects have types!** The variable `data` is simply a label that points to an integer object, then later points to a string object.

---

## 4. Automatic Garbage Collection

What happens to the number `42` in memory when we reassigned `data = "Forty-Two"`?

```
+-------------------------------------------------------------------------+
|                  PYTHON AUTOMATIC GARBAGE COLLECTION                    |
+-------------------------------------------------------------------------+

  Before:   data ------> [ Object: 42 ] (Reference Count = 1)
  
  After:    data ------> [ Object: "Forty-Two" ]
                         [ Object: 42 ] (Reference Count = 0!)
                               |
                               v
               RECLAIMED BY GARBAGE COLLECTOR!
```

Python tracks how many variable tags point to each object (**Reference Counting**). When an object has zero active tags pointing to it, Python's automated **Garbage Collector** safely deletes it and reclaims RAM for your computer!

---

## 5. Do's and Don'ts of Creating Variables

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Consistency** | Keep variable types logically consistent within a business domain. | Constantly reassign a variable from a number to a string and then a list, confusing future readers. |
| **Assignment** | Use a single `=` for assignment: `x = 5`. | Confuse the assignment operator `=` with the equality check `==`. |
| **Initialization** | Always assign an initial value before reading a variable. | Try to read a variable before assigning it, causing a `NameError`. |
| **Meaning** | Name variables based on their real-world meaning: `total_cart_price`. | Use arbitrary placeholders like `temp1`, `temp2`, `val`. |

---

## 6. Quick Revision Summary

```
+-------------------------------------------------------------------------+
|                  CREATING VARIABLES CHEAT SHEET                         |
+-------------------------------------------------------------------------+

  - Creation:           name = value (created upon first assignment)
  - Nature:             Variables are pointers/name tags, NOT fixed boxes!
  - Types:              Objects have types, variables do not.
  - Memory ID:          id(variable) returns memory address.
  - Identity Check:     a is b (True if both share the exact same id).
  - Memory Cleanup:     Automated garbage collection when ref count hits 0.
```

---

# Multiple Choice Questions

### 1. In Python's internal memory architecture, what is a variable?
A. A fixed physical hardware register on the CPU
B. A named reference tag that points to an object stored in heap memory
C. An unalterable constant stored in disk storage
D. A special binary file on the operating system

**Answer:** B
**Explanation:** Python treats variables as name tags (references) that point to objects in heap memory. Assigning a value binds the name to an object in memory.

---

### 2. What will the built-in function `id(x)` return when passed a variable?
A. The variable's current data type
B. The unique integer identifier representing the object's memory address
C. The number of characters in the variable name
D. The execution time of the script

**Answer:** B
**Explanation:** `id()` returns the identity of an object, which is guaranteed to be unique and constant for the lifetime of that object (corresponding to its memory address in CPython).

---

### 3. What happens if you try to print a variable before it has been created (e.g. `print(score)` when `score` was never assigned)?
A. Python prints `0`
B. Python prints `None`
C. Python raises a `NameError: name 'score' is not defined`
D. Python crashes the computer

**Answer:** C
**Explanation:** In Python, a variable only exists after it is assigned a value. Accessing an unassigned identifier raises a `NameError`.

---

### 4. What does Python's automatic Garbage Collector do when an object's reference count drops to zero?
A. It saves the object to a backup hard drive
B. It automatically frees the object's allocated memory and returns it to the operating system
C. It raises a `MemoryError`
D. It halts program execution

**Answer:** B
**Explanation:** Python uses reference counting combined with cyclic garbage collection. When no active references point to an object, Python deallocates the memory automatically.

---

### 5. If `a = 250` and `b = a`, what does the expression `a is b` evaluate to?
A. `False`
B. `True`
C. `None`
D. `SyntaxError`

**Answer:** B
**Explanation:** `b = a` copies the reference pointer from `a` to `b`. Because both variables point to the exact same integer object in memory, `a is b` returns `True`.

---

# Hands-On Practice Challenge: Memory Reference & Pointer Experiment

Run this script to observe Python's memory management, dynamic rebinding, and object identity in real time.

```python
# ==========================================================
# Challenge 7: Variable Memory & Dynamic Rebinding
# MSK Institute of Technology
# ==========================================================

print("=" * 60)
print("       PYTHON MEMORY REFERENCE & DYNAMIC TYPING LAB")
print("=" * 60)

# 1. Inspecting shared memory references
score_primary = 500
score_backup = score_primary

print("--- 1. Shared Memory References ---")
print(f"score_primary Value : {score_primary} | Memory Address: {id(score_primary)}")
print(f"score_backup  Value : {score_backup}  | Memory Address: {id(score_backup)}")
print(f"Do they share identity? (score_primary is score_backup): {score_primary is score_backup}")

# 2. Rebinding score_backup to a new value
score_backup = 750
print("\n--- 2. After Rebinding score_backup to 750 ---")
print(f"score_primary Value : {score_primary} | Memory Address: {id(score_primary)}")
print(f"score_backup  Value : {score_backup}  | Memory Address: {id(score_backup)}")
print(f"Do they share identity now? : {score_primary is score_backup}")

# 3. Demonstrating Dynamic Typing on a Single Variable Name
print("\n--- 3. Dynamic Typing Lifecycle ---")
token = 101
print(f"State 1 -> Value: {token:<15} | Type: {type(token).__name__:<8} | ID: {id(token)}")

token = "Batch-Alpha-2026"
print(f"State 2 -> Value: {token:<15} | Type: {type(token).__name__:<8} | ID: {id(token)}")

token = [98.5, 92.0, 89.5]
print(f"State 3 -> Value: {str(token):<15} | Type: {type(token).__name__:<8} | ID: {id(token)}")

print("=" * 60)
print("Key Lesson: Variables in Python are lightweight luggage tags,")
print("pointing effortlessly to whatever data object you bind them to!")
print("=" * 60)
```

### Expected Program Output:
```text
============================================================
       PYTHON MEMORY REFERENCE & DYNAMIC TYPING LAB
============================================================
--- 1. Shared Memory References ---
score_primary Value : 500 | Memory Address: 140723849204880
score_backup  Value : 500 | Memory Address: 140723849204880
Do they share identity? (score_primary is score_backup): True

--- 2. After Rebinding score_backup to 750 ---
score_primary Value : 500 | Memory Address: 140723849204880
score_backup  Value : 750 | Memory Address: 140723849205920
Do they share identity now? : False

--- 3. Dynamic Typing Lifecycle ---
State 1 -> Value: 101             | Type: int      | ID: 140723849204880
State 2 -> Value: Batch-Alpha-2026| Type: str      | ID: 2194827182912
State 3 -> Value: [98.5, 92.0, 89.5] | Type: list     | ID: 2194827291840
============================================================
Key Lesson: Variables in Python are lightweight luggage tags,
pointing effortlessly to whatever data object you bind them to!
============================================================
```
