---
id: python-creating-a-variable
slug: creating-a-variable
course: python-for-beginners
chapter: 2
topic: 2.2
title: Creating a Variable
description: Dynamic typing, assignment operator (=), and object identity with id().
difficulty: Beginner
readingTime: 8
order: 7
keywords:
  - assignment
  - dynamic typing
  - id()
  - memory
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Creating a Variable

Variables in Python are created at the exact moment a value is bound to them with the '=' operator.

---

# Key Concepts & Detailed Explanation

Python uses dynamic typing. A variable can reference an integer at one moment and be rebound to a string later. Every object has a unique integer identity in memory, discoverable with id().

---

# Code Examples & Output

```python
# Dynamic re-binding
data = 100
print("Type:", type(data), "Memory ID:", id(data))

data = "MSK Institute"
print("Type:", type(data), "Memory ID:", id(data))
```

**Expected Output:**
```text
Type: <class 'int'> Memory ID: ...
Type: <class 'str'> Memory ID: ...
```

---

# Best Practices & Common Pitfalls

Although Python allows rebinding a variable to a different type, keeping types consistent improves code readability.

---

# Practice Quiz

### 1. What function reveals the unique memory address of a Python object?
- A) address()
- B) id()
- C) pointer()
- D) mem()
**Answer:** B
**Explanation:** id() returns the object's unique memory identity.

---

### 2. Do you have to declare variable types in Python before assigning values?
- A) Yes
- B) No, Python is dynamically typed
- C) Only inside classes
- D) Only in scripts
**Answer:** B
**Explanation:** Python infers types dynamically upon assignment.


---

# Practice Challenge

Create three variables of different types, print their values, their types using type(), and their memory IDs using id().
