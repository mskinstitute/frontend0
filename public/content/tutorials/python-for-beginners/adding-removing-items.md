---
id: python-adding-removing-dict-items
slug: adding-removing-dict-items
course: python-for-beginners
chapter: 11
topic: 11.3
title: Adding & Removing Items
description: Adding keys, removing with .pop(), .popitem(), del, and .clear().
difficulty: Beginner
readingTime: 8
order: 51
keywords:
  - pop()
  - popitem()
  - del
  - clear()
  - dict removal
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Adding & Removing Items

Add new keys effortlessly and remove obsolete entries using pop or del.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
device = {
    "brand": "Dell",
    "model": "Inspiron",
    "ram": "16GB",
    "storage": "512GB SSD",
    "color": "Silver"
}

# Remove with pop() (returns removed value)
removed_color = device.pop("color")
print("Removed color:", removed_color)

# Remove last inserted pair with popitem()
last_item = device.popitem()
print("Removed last item:", last_item)

# Remove with del
del device["ram"]
print("Remaining device keys:", device)
```

**Expected Output:**
```text
Removed color: Silver
Removed last item: ('storage', '512GB SSD')
Remaining device keys: {'brand': 'Dell', 'model': 'Inspiron'}
```

---

# Best Practices & Common Pitfalls

Use 'pop(key, default)' to avoid KeyError if the key might already be absent.

---

# Practice Quiz

### 1. What does 'dict.popitem()' remove and return?
- A) The first item
- B) The last inserted (key, value) tuple
- C) A random item
- D) Only the value
**Answer:** B
**Explanation:** popitem() removes and returns the most recently inserted pair as a tuple.

---

### 2. Which statement deletes an entire dictionary from memory?
- A) dict.delete()
- B) del dict
- C) dict.remove()
- D) dict.drop()
**Answer:** B
**Explanation:** 'del dict' deletes the variable reference completely.


---

# Practice Challenge

Create an inventory dictionary, sell an item using pop(), and print the updated inventory.
