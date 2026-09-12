# The Math and Random Modules in Python

Python's standard library includes comprehensive mathematical and stochastic computing capabilities out of the box. The **`math`** module provides access to C-standard mathematical functions for floating-point arithmetic, while the **`random`** module provides tools for generating pseudo-random numbers, shuffling datasets, and stochastic modeling.

---

## 1. Deep Dive into the `math` Module

The `math` module operates on real numbers (for complex numbers, Python provides `cmath`).

### Constants and Precision Checks

```python
import math

print(f"Pi: {math.pi}")          # 3.141592653589793
print(f"Euler's e: {math.e}")    # 2.718281828459045
print(f"Infinity: {math.inf}")

# Comparing floating point numbers safely (avoids 0.1 + 0.2 != 0.3 trap)
a = 0.1 + 0.2
b = 0.3
print(a == b)                    # False (Floating point IEEE 754 precision artifact!)
print(math.isclose(a, b))        # True (Compares within tolerance)
```

### Rounding, Flooring, and Truncation

```python
import math

val = 4.75
neg_val = -4.75

print(math.ceil(val))    # 5  (Smallest integer >= val)
print(math.floor(val))   # 4  (Largest integer <= val)
print(math.trunc(val))   # 4  (Drops decimals towards zero)

print(math.floor(neg_val)) # -5
print(math.trunc(neg_val)) # -4 (Truncates toward zero)
```

### Advanced Mathematical Functions

```python
import math

# Roots and Exponents
print(math.sqrt(144))            # 12.0
print(math.pow(2, 8))            # 256.0

# Logarithms
print(math.log(math.e))          # 1.0 (Natural log base e)
print(math.log10(1000))          # 3.0 (Log base 10)
print(math.log2(64))             # 6.0 (Log base 2)

# Combinatorics and Number Theory
print(math.factorial(5))         # 120 (5 * 4 * 3 * 2 * 1)
print(math.gcd(48, 64))          # 16  (Greatest Common Divisor)
print(math.comb(10, 3))          # 120 (10 choose 3 combinations)

# Trigonometry (Expects radians!)
angle_deg = 45
angle_rad = math.radians(angle_deg)
print(f"sin(45°): {math.sin(angle_rad):.4f}")
```

---

## 2. Generating Pseudo-Randomness with `random`

Python's `random` module uses the Mersenne Twister algorithm to produce deterministic pseudo-random sequences.

### Generating Random Numbers

```python
import random

# Float in range [0.0, 1.0)
print(random.random())

# Float in arbitrary continuous range [10.0, 25.0]
print(random.uniform(10.0, 25.0))

# Integer in range [1, 6] (Both endpoints INCLUSIVE!)
print(random.randint(1, 6))

# Integer with stepping: [0, 2, 4, 6, 8, 10]
print(random.randrange(0, 11, 2))
```

### Reproducibility with Seeds

Setting a seed ensures identical random sequences across executions—vital for reproducible data science experiments and automated testing:

```python
import random

random.seed(101)
print(random.randint(1, 100))  # Always prints 75
print(random.randint(1, 100))  # Always prints 25
```

---

## 3. Sampling, Shuffling, and Choosing Collections

| Function | Behavior | Mutates Original? | Replacement? |
| :--- | :--- | :---: | :---: |
| `random.choice(seq)` | Returns 1 random item | No | N/A |
| `random.choices(seq, k=n)` | Returns $n$ items (can pick same item repeatedly) | No | **With** Replacement |
| `random.sample(seq, k=n)` | Returns $n$ unique items (lottery draw) | No | **Without** Replacement |
| `random.shuffle(seq)` | Rearranges elements in-place | **Yes** | In-place |

```python
import random

deck = ["Ace", "King", "Queen", "Jack", "10", "9"]

# 1. Single selection
print("Picked:", random.choice(deck))

# 2. In-place shuffle (Modifies list directly!)
random.shuffle(deck)
print("Shuffled:", deck)

# 3. Sample without replacement (Unique hand of 3 cards)
hand = random.sample(deck, 3)
print("Unique Hand:", hand)

# 4. Weighted random choice
outcomes = ["Win", "Loss", "Draw"]
weights = [0.1, 0.7, 0.2]  # 10% Win, 70% Loss, 20% Draw
spin = random.choices(outcomes, weights=weights, k=1)
print("Simulation result:", spin[0])
```

---

## 4. Cryptographic Security Warning

> **Security Rule:** Python's `random` module is **NOT** cryptographically secure! Never use `random` to generate passwords, authentication tokens, encryption keys, or password reset URLs.
> For security-sensitive randomness, use Python's built-in **`secrets`** module:
> ```python
> import secrets
> secure_token = secrets.token_hex(16)  # Safe for security tokens
> ```

---

# Multiple Choice Questions

### 1. Which function should be used to compare two floating-point numbers safely to avoid precision errors?
A. `math.equals()`
B. `math.isclose()`
C. `math.approx()`
D. `math.float_cmp()`
**Answer:** B
**Explanation:** `math.isclose(a, b)` compares two floating-point numbers within a relative or absolute tolerance, avoiding IEEE 754 precision pitfalls.
---

### 2. What is the value of `math.floor(-3.2)`?
A. `-3`
B. `-4`
C. `-3.0`
D. `3`
**Answer:** B
**Explanation:** `math.floor()` rounds down to the largest integer less than or equal to the argument; for `-3.2`, the next smaller integer is `-4`.
---

### 3. Which `random` function selects a specified number of UNIQUE items from a sequence WITHOUT replacement?
A. `random.choices()`
B. `random.sample()`
C. `random.choice()`
D. `random.unique()`
**Answer:** B
**Explanation:** `random.sample(population, k)` selects $k$ unique elements without replacement. `random.choices()` selects with replacement.
---

### 4. What does `random.shuffle(my_list)` return?
A. A new reversed list
B. `None` (it shuffles the list in-place)
C. A generator object
D. A tuple of randomized indices
**Answer:** B
**Explanation:** `random.shuffle()` mutates the list in-place and returns `None`.
---

### 5. Why shouldn't you use Python's `random` module to generate security tokens or passwords?
A. It only generates numbers up to 100
B. The underlying Mersenne Twister PRNG is deterministic and predictable from previous state observations
C. It requires an active internet connection
D. It deletes files on collision
**Answer:** B
**Explanation:** Mersenne Twister is a pseudo-random generator whose state can be reconstructed after observing ~624 outputs. Use `secrets` for cryptographic security.
---
