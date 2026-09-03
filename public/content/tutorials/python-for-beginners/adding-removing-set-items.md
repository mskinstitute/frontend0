---
id: python-adding-removing-set-items
slug: adding-removing-set-items
course: python-for-beginners
chapter: 10
topic: 10.2
title: Adding & Removing Items
description: Adding with add() and update(), and removing with remove(), discard(), pop(), and clear().
difficulty: Beginner
readingTime: 8
order: 45
keywords:
  - add()
  - update()
  - remove()
  - discard()
  - set modification
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Adding & Removing Items

Manipulate set elements dynamically using dedicated insertion and removal methods.

---

# Key Concepts & Detailed Explanation

Adding:
- add(elem): Adds a single element.
- update(iterable): Adds multiple elements from another iterable.
Removing:
- remove(elem): Removes element. Raises KeyError if missing!
- discard(elem): Removes element. DOES NOT raise error if missing (safe remove).
- pop(): Removes and returns an arbitrary element.
- clear(): Removes all elements.

---

# Code Examples & Output

```python
fruits = {"Apple", "Banana"}

# Adding
fruits.add("Orange")
fruits.update(["Mango", "Grapes"])
print("After updates:", fruits)

# Safe removal with discard
fruits.discard("Watermelon") # Does not throw error!
fruits.remove("Apple")        # Removes Apple

popped = fruits.pop()
print("Arbitrary popped fruit:", popped)
print("Remaining:", fruits)
```

**Expected Output:**
```text
After updates: {'Orange', 'Banana', 'Mango', 'Apple', 'Grapes'}
Arbitrary popped fruit: ...
Remaining: ...
```

---

# Best Practices & Common Pitfalls

Prefer 'discard()' over 'remove()' when you aren't certain the element exists in the set.

---

# Practice Quiz

### 1. What is the difference between remove() and discard() on a set?
- A) remove() raises KeyError if missing; discard() does nothing
- B) discard() is for numbers only
- C) remove() deletes the whole set
- D) They are identical
**Answer:** A
**Explanation:** discard() safely ignores missing elements without raising KeyError.

---

### 2. Which method adds multiple items from a list to an existing set?
- A) add()
- B) extend()
- C) update()
- D) append()
**Answer:** C
**Explanation:** set.update(iterable) adds all elements from the iterable.


---

# Practice Challenge

Create a set of student attendees, add 2 new attendees with update(), and discard a cancelled attendee.
