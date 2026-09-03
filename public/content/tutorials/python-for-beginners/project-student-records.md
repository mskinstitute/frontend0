---
id: python-project-student-records
slug: project-student-records
course: python-for-beginners
chapter: 11
topic: 11.7
title: Project: Student Records
description: Hands-on project: build a complete CLI student record manager using Python dictionaries.
difficulty: Beginner
readingTime: 12
order: 55
keywords:
  - project
  - student records
  - crud
  - dictionary project
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Project: Student Records

Apply everything learned about dictionaries to build a complete Student Records Manager system.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Complete Student Records System
records = {}

def add_student(roll_no, name, score):
    records[roll_no] = {"name": name, "score": score}
    print(f"Added student: {name} (Roll: {roll_no})")

def find_student(roll_no):
    student = records.get(roll_no)
    if student:
        print(f"Found: {student['name']} with score {student['score']}%")
    else:
        print("Student not found!")

# Add sample data
add_student(101, "Aman Sharma", 91.5)
add_student(102, "Kavita Rao", 88.0)

# Query student
find_student(101)
find_student(999)
```

**Expected Output:**
```text
Added student: Aman Sharma (Roll: 101)
Added student: Kavita Rao (Roll: 102)
Found: Aman Sharma with score 91.5%
Student not found!
```

---

# Best Practices & Common Pitfalls

Organizing your project logic into small, focused functions makes maintenance simple.

---

# Practice Quiz

### 1. What is the primary advantage of using a dictionary keyed by roll number for student records?
- A) Alphabetical sorting
- B) O(1) constant-time lookup by roll number
- C) Smaller file size
- D) No typing required
**Answer:** B
**Explanation:** Dictionary key lookups are near-instantaneous (O(1)).

---

### 2. Which method prevents the program from crashing if a roll number is missing?
- A) records[roll_no]
- B) records.get(roll_no)
- C) del records[roll_no]
- D) records.pop()
**Answer:** B
**Explanation:** .get() safely returns None instead of raising KeyError.


---

# Practice Challenge

Extend this project with an 'update_student_score(roll_no, new_score)' function.
