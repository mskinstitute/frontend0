---
id: python-concatenation-formatting
slug: concatenation-formatting
course: python-for-beginners
chapter: 5
topic: 5.4
title: Concatenation & Formatting (f-string, format, %)
description: Modern f-strings, str.format(), and legacy % formatting techniques for clean dynamic text.
difficulty: Beginner
readingTime: 9
order: 20
keywords:
  - f-strings
  - format()
  - string formatting
  - concatenation
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Concatenation & Formatting (f-string, format, %)

f-strings (Formatted String Literals) are the gold standard for formatting dynamic data into text.

---

# Key Concepts & Detailed Explanation

Evolution of Python string formatting:
1. % formatting (Python 2 legacy): "%s is %d years old" % (name, age)
2. str.format() (Python 3.0): "{} is {} years old".format(name, age)
3. f-strings (Python 3.6+): f"{name} is {age} years old"
f-strings evaluate expressions at runtime and support format specifiers like `{val:.2f}` for decimal rounding.

---

# Code Examples & Output

```python
product = "Keyboard"
price = 1299.856

# f-string with precision formatting
print(f"Item: {product}")
print(f"Price: ₹{price:.2f}")
print(f"With 18% GST: ₹{price * 1.18:.2f}")

# Alignment formatting
print(f"{'Header':^20}")
```

**Expected Output:**
```text
Item: Keyboard
Price: ₹1299.86
With 18% GST: ₹1533.83
       Header       
```

---

# Best Practices & Common Pitfalls

f-strings are not only cleaner to read; they are also significantly faster than format() and % operators.

---

# Practice Quiz

### 1. Which format specifier rounds a float to 2 decimal places in an f-string?
- A) :.2d
- B) :.2f
- C) :%2
- D) :round(2)
**Answer:** B
**Explanation:** :.2f formats a float with 2 decimal places.

---

### 2. Can you call functions inside f-string curly braces { }?
- A) No
- B) Yes, any valid Python expression is supported
- C) Only built-in math functions
- D) Only in Python 3.12+
**Answer:** B
**Explanation:** f-strings can call functions and evaluate arbitrary expressions inside { }.


---

# Practice Challenge

Create a formatted receipt string showing Item Name, Unit Price, Quantity, and Total Amount using f-strings.
