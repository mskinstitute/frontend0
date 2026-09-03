---
id: python-add-remove-items
slug: add-remove-items
course: python-for-beginners
chapter: 8
topic: 8.3
title: Add & Remove Items
description: Modifying lists with append(), insert(), extend(), remove(), pop(), clear(), and del.
difficulty: Beginner
readingTime: 9
order: 34
keywords:
  - append
  - insert
  - pop
  - remove
  - extend
  - del
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Add & Remove Items

Python provides versatile methods to grow or shrink list collections dynamically.

---

# Key Concepts & Detailed Explanation

Methods to add items:
- append(x): Adds x to the end of the list.
- insert(index, x): Inserts x at the specified index.
- extend(iterable): Appends all items from another collection.
Methods to remove items:
- remove(x): Removes the FIRST occurrence of value x (raises ValueError if missing).
- pop([index]): Removes and returns the item at index (defaults to last item).
- clear(): Empties the list completely.
- del list[index]: Deletes item at index.

---

# Code Examples & Output

```python
cart = ["Book", "Pen"]

# Adding items
cart.append("Notebook")
cart.insert(1, "Highlighter")
print("After additions:", cart)

# Removing items
removed_item = cart.pop()  # Removes "Notebook"
print("Popped item:", removed_item)

cart.remove("Pen")
print("After removing Pen:", cart)
```

**Expected Output:**
```text
After additions: ['Book', 'Highlighter', 'Pen', 'Notebook']
Popped item: Notebook
After removing Pen: ['Book', 'Highlighter']
```

---

# Best Practices & Common Pitfalls

Use pop() when implementing Stack (LIFO) or Queue (FIFO) data structures.

---

# Practice Quiz

### 1. What does 'list.append([1, 2])' do?
- A) Adds 1 and 2 as separate items
- B) Adds the entire list [1, 2] as a single nested element
- C) Throws TypeError
- D) Replaces the list
**Answer:** B
**Explanation:** append() adds its argument as a single element. Use extend() to merge.

---

### 2. Which method removes an item by index and returns it?
- A) remove()
- B) pop()
- C) delete()
- D) drop()
**Answer:** B
**Explanation:** pop([index]) removes and returns the element.


---

# Practice Challenge

Create a to-do list, add 3 tasks, complete (pop) the first task, and remove one task by name.
