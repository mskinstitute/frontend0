---
id: python-math-module-math-random
slug: math-module-math-random
course: python-for-beginners
chapter: 4
topic: 4.3
title: Math Module (math, random)
description: Using the math module for trigonometric and logarithmic functions and the random module for random generation.
difficulty: Beginner
readingTime: 9
order: 16
keywords:
  - math
  - random
  - sqrt
  - ceil
  - randint
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Math Module (math, random)

Python provides the math module for scientific calculations and random for stochastic simulations.

---

# Key Concepts & Detailed Explanation

Key math functions:
- math.sqrt(x): Square root
- math.ceil(x) / math.floor(x): Rounding up / down
- math.pi / math.e: Mathematical constants
Key random functions:
- random.randint(a, b): Random integer between a and b inclusive
- random.choice(seq): Random item from a sequence
- random.shuffle(seq): Shuffle list in-place

---

# Code Examples & Output

```python
import math
import random

# Math module
print("Square root of 81:", math.sqrt(81))
print("Ceil of 3.2:", math.ceil(3.2))
print("Factorial of 5:", math.factorial(5))

# Random module
secret_pin = random.randint(1000, 9999)
print("Generated 4-digit PIN:", secret_pin)

cards = ["Ace", "King", "Queen", "Jack"]
print("Random draw:", random.choice(cards))
```

**Expected Output:**
```text
Square root of 81: 9.0
Ceil of 3.2: 4
Factorial of 5: 120
Generated 4-digit PIN: ...
Random draw: ...
```

---

# Best Practices & Common Pitfalls

For cryptographically secure random numbers (passwords, tokens), use the 'secrets' module instead of 'random'.

---

# Practice Quiz

### 1. Which function from math calculates the square root?
- A) math.root()
- B) math.sqrt()
- C) math.sq()
- D) math.pow()
**Answer:** B
**Explanation:** math.sqrt() computes square roots.

---

### 2. Does random.randint(1, 6) include 6 in its possible outcomes?
- A) Yes, both endpoints are inclusive
- B) No, up to 5 only
- C) Only if specified
- D) Throws error
**Answer:** A
**Explanation:** randint(a, b) includes both a and b.


---

# Practice Challenge

Write a dice roll simulator that rolls two 6-sided dice and prints the sum.
