---
id: python-output-variables-printing-techniques
slug: output-variables-printing-techniques
course: python-for-beginners
chapter: 2
topic: 2.3
title: Output Variables & Printing Techniques
description: Master the print() function with custom separators, custom line endings, and multi-variable printing.
difficulty: Beginner
readingTime: 8
order: 8
keywords:
  - print()
  - sep
  - end
  - output
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Output Variables & Printing Techniques

The print() function is the fundamental way to display program output to the console.

---

# Key Concepts & Detailed Explanation

print() accepts several optional keyword arguments:
- sep: String inserted between values, default is space ' '.
- end: String appended after the last value, default is newline '\n'.
- file: Specifies where to write (defaults to sys.stdout).

---

# Code Examples & Output

```python
# Using sep and end
print("2026", "09", "03", sep="-")
print("Loading data", end=" -> ")
print("Complete!")

# Printing multiple expressions
item = "Laptop"
price = 45000
print("Item:", item, "| Price: ₹", price)
```

**Expected Output:**
```text
2026-09-03
Loading data -> Complete!
Item: Laptop | Price: ₹ 45000
```

---

# Best Practices & Common Pitfalls

Use 'end=""' when building progress bars or continuous console prompts.

---

# Practice Quiz

### 1. What is the output of print('A', 'B', sep='*')?
- A) A B
- B) A*B
- C) AB*
- D) *AB
**Answer:** B
**Explanation:** sep='*' places an asterisk between arguments.

---

### 2. How do you prevent print() from starting a new line?
- A) print(..., newline=False)
- B) print(..., end='')
- C) print(..., stop=True)
- D) print(..., sep='')
**Answer:** B
**Explanation:** Setting end='' overrides the default '\n'.


---

# Practice Challenge

Print the numbers 1, 2, 3, 4, 5 on the same line separated by ' -> ' with no trailing newline.
