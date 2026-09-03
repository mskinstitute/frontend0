---
id: python-quiz-application
slug: quiz-application
course: python-for-beginners
chapter: 16
topic: 16.2
title: Quiz Application
description: Build an interactive CLI Quiz Application featuring scoring, multiple choice options, and result feedback.
difficulty: Beginner
readingTime: 15
order: 83
keywords:
  - project
  - quiz application
  - quiz
  - interactive cli
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Quiz Application

Create an interactive multiple-choice quiz engine that evaluates answers and generates a final score report.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Interactive Quiz Application
quiz_data = [
    {
        "question": "What is the output of print(2 ** 3)?",
        "options": ["A) 6", "B) 8", "C) 9", "D) 5"],
        "answer": "B"
    },
    {
        "question": "Which data structure is immutable in Python?",
        "options": ["A) List", "B) Dictionary", "C) Tuple", "D) Set"],
        "answer": "C"
    },
    {
        "question": "How do you define a function in Python?",
        "options": ["A) function", "B) def", "C) fn", "D) method"],
        "answer": "B"
    }
]

def run_quiz(questions):
    score = 0
    print("=== Welcome to MSK Python Quiz ===\n")
    
    for i, q in enumerate(questions, 1):
        print(f"Question {i}: {q['question']}")
        for opt in q['options']:
            print(f"  {opt}")
        
        # In actual run: user_ans = input("Your answer (A/B/C/D): ").strip().upper()
        # Simulating correct answers:
        user_ans = q['answer']
        if user_ans == q['answer']:
            print("Correct! +1 mark\n")
            score += 1
        else:
            print(f"Incorrect. Correct answer was {q['answer']}\n")
            
    total = len(questions)
    pct = (score / total) * 100
    print("=== Final Results ===")
    print(f"Score: {score}/{total} ({pct:.1f}%)")
    print(f"Status: {'PASSED 🎉' if pct >= 60 else 'FAILED'}")

run_quiz(quiz_data)
```

**Expected Output:**
```text
=== Welcome to MSK Python Quiz ===

Question 1: What is the output of print(2 ** 3)?
  A) 6
  B) 8
  C) 9
  D) 5
Correct! +1 mark

Question 2: Which data structure is immutable in Python?
  A) List
  B) Dictionary
  C) Tuple
  D) Set
Correct! +1 mark

Question 3: How do you define a function in Python?
  A) function
  B) def
  C) fn
  D) method
Correct! +1 mark

=== Final Results ===
Score: 3/3 (100.0%)
Status: PASSED 🎉
```

---

# Best Practices & Common Pitfalls

Structure your quiz questions as a list of dictionaries so adding new questions is as easy as adding one data entry.

---

# Practice Quiz

### 1. What data structure cleanly represents a question with multiple choices and answer key?
- A) List of dictionaries
- B) Nested tuples of strings
- C) Floating point array
- D) Boolean set
**Answer:** A
**Explanation:** A list of dictionaries is the standard format for question banks.

---

### 2. How should user input be sanitized when accepting 'A', 'B', 'C', or 'D'?
- A) input.strip().upper()
- B) int(input)
- C) input.split()
- D) input.lower()
**Answer:** A
**Explanation:** Stripping whitespace and converting to uppercase prevents trivial mismatches.


---

# Practice Challenge

Add a timer or randomize the order of questions using random.shuffle() before running the quiz.
