---
id: python-copying-dictionaries
slug: copying-dictionaries
course: python-for-beginners
chapter: 11
topic: 11.4
title: Copying Dictionaries
description: Understanding reference copying vs shallow copy (.copy()) vs deepcopy (copy.deepcopy()).
difficulty: Beginner
readingTime: 8
order: 52
keywords:
  - copy()
  - deepcopy
  - shallow copy
  - reference assignment
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Copying Dictionaries

Avoid mutation bugs by understanding how Python duplicates dictionaries in memory.

---

# Key Concepts & Detailed Explanation

Copying mechanisms:
1. **Reference Assignment (`d2 = d1`):** Does NOT copy! Both point to the exact same dictionary in memory. Modifying d2 changes d1.
2. **Shallow Copy (`d2 = d1.copy()"):** Copies top-level keys. If a value is a nested list or dict, it is still shared!
3. **Deep Copy (`copy.deepcopy(d1)"):** Recursively duplicates every nested structure. Completely independent.

---

# Code Examples & Output

```python
import copy

original = {
    "id": 1,
    "scores": [80, 90]
}

# Shallow copy vs Deep copy
shallow = original.copy()
deep = copy.deepcopy(original)

# Modify nested list
original["scores"].append(100)

print("Original scores:", original["scores"])  # [80, 90, 100]
print("Shallow scores (affected):", shallow["scores"]) # [80, 90, 100]
print("Deep scores (protected):", deep["scores"])      # [80, 90]
```

**Expected Output:**
```text
Original scores: [80, 90, 100]
Shallow scores (affected): [80, 90, 100]
Deep scores (protected): [80, 90]
```

---

# Best Practices & Common Pitfalls

Always use copy.deepcopy() when cloning configurations or nested data models.

---

# Practice Quiz

### 1. Does 'dict2 = dict1' create a new independent dictionary?
- A) Yes
- B) No, it merely copies the memory reference
- C) Only in functions
- D) Only if small
**Answer:** B
**Explanation:** Assignment copies references, not the underlying object.

---

### 2. Which module provides the deepcopy() function?
- A) sys
- B) copy
- C) math
- D) os
**Answer:** B
**Explanation:** The standard 'copy' module provides deepcopy().


---

# Practice Challenge

Demonstrate that modifying a shallow-copied nested dictionary alters the original, but deepcopy protects it.
