---
id: python-project-grading-system
slug: project-grading-system
course: python-for-beginners
chapter: 12
topic: 12.5
title: Project: Grading System
description: Build an interactive automated student grading and percentage calculator system.
difficulty: Beginner
readingTime: 12
order: 60
keywords:
  - grading system
  - project
  - conditionals project
  - percentage
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Project: Grading System

Build a complete real-world grading application utilizing conditions and validation.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
def calculate_grade(marks):
    """Calculates overall percentage and letter grade."""
    total = sum(marks)
    percentage = (total / (len(marks) * 100)) * 100
    
    if percentage >= 90:
        grade, remark = "A+", "Outstanding"
    elif percentage >= 80:
        grade, remark = "A", "Excellent"
    elif percentage >= 70:
        grade, remark = "B", "Very Good"
    elif percentage >= 50:
        grade, remark = "C", "Average"
    else:
        grade, remark = "F", "Needs Improvement"
        
    return percentage, grade, remark

# Test student
marks_list = [85, 92, 78, 88, 90]
pct, grd, rmk = calculate_grade(marks_list)

print("--- MSK Institute Academic Report ---")
print(f"Overall Percentage: {pct:.2f}%")
print(f"Assigned Grade: {grd}")
print(f"Academic Remark: {rmk}")
```

**Expected Output:**
```text
--- MSK Institute Academic Report ---
Overall Percentage: 86.60%
Assigned Grade: A
Academic Remark: Excellent
```

---

# Best Practices & Common Pitfalls

Always validate that individual input scores fall within 0 and 100 before computing grades.

---

# Practice Quiz

### 1. Why is an elif chain better than multiple independent if statements for grading?
- A) Independent if statements test every condition even after finding a match
- B) elif statements don't need colons
- C) elif runs faster only on Linux
- D) There is no difference
**Answer:** A
**Explanation:** An elif chain stops evaluating once a true branch is found, preventing bugs.

---

### 2. What does sum([80, 90, 100]) compute?
- A) 270
- B) 90
- C) 3
- D) Error
**Answer:** A
**Explanation:** sum() calculates the total of an iterable of numbers.


---

# Practice Challenge

Modify the grading system to check if a student failed any individual subject (< 40 marks), awarding an automatic 'Compartment' status.
