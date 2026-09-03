---
id: python-expense-tracker
slug: expense-tracker
course: python-for-beginners
chapter: 16
topic: 16.3
title: Expense Tracker
description: Build an Expense Tracker CLI to log expenses with categories, calculate totals, and view summaries.
difficulty: Beginner
readingTime: 15
order: 84
keywords:
  - project
  - expense tracker
  - budget
  - finance project
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Expense Tracker

Build a budget and personal finance tracking system to record and analyze expenses by category.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Personal Expense Tracker
class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    def add_expense(self, title, amount, category):
        self.expenses.append({
            "title": title,
            "amount": float(amount),
            "category": category
        })
        print(f"Recorded: ₹{amount} for '{title}' under '{category}'")

    def total_expense(self):
        return sum(item["amount"] for item in self.expenses)

    def category_breakdown(self):
        breakdown = {}
        for item in self.expenses:
            cat = item["category"]
            breakdown[cat] = breakdown.get(cat, 0) + item["amount"]
        return breakdown

    def print_summary(self):
        print(f"\n{'='*30}")
        print(f"  Monthly Expense Summary")
        print(f"{'='*30}")
        print(f"Total Spent: ₹{self.total_expense():.2f}\n")
        print("Category Breakdown:")
        for cat, amt in self.category_breakdown().items():
            pct = (amt / self.total_expense()) * 100
            print(f"  • {cat:<15}: ₹{amt:>8.2f} ({pct:>5.1f}%)")
        print(f"{'='*30}\n")

tracker = ExpenseTracker()
tracker.add_expense("Python Book", 450, "Education")
tracker.add_expense("Hostel Rent", 4500, "Housing")
tracker.add_expense("Internet Fiber", 799, "Utilities")
tracker.add_expense("Lab Snacks", 250, "Food")
tracker.print_summary()
```

**Expected Output:**
```text
Recorded: ₹450 for 'Python Book' under 'Education'
Recorded: ₹4500 for 'Hostel Rent' under 'Housing'
Recorded: ₹799 for 'Internet Fiber' under 'Utilities'
Recorded: ₹250 for 'Lab Snacks' under 'Food'

==============================
  Monthly Expense Summary
==============================
Total Spent: ₹5999.00

Category Breakdown:
  • Education      : ₹  450.00 (  7.5%)
  • Housing        : ₹ 4500.00 ( 75.0%)
  • Utilities      : ₹  799.00 ( 13.3%)
  • Food           : ₹  250.00 (  4.2%)
==============================
```

---

# Best Practices & Common Pitfalls

Use list comprehensions with sum() to aggregate totals cleanly and concisely.

---

# Practice Quiz

### 1. How do you calculate category totals efficiently from an expense list?
- A) Using a dictionary to accumulate sums per category key
- B) Using 10 separate variables
- C) Sorting the list repeatedly
- D) Using pop()
**Answer:** A
**Explanation:** A dictionary accumulator (breakdown[cat] = breakdown.get(cat, 0) + amt) aggregates sums efficiently.

---

### 2. Which format specifier right-aligns a float across 8 spaces with 2 decimals?
- A) :>8.2f
- B) :<8.2f
- C) :^8.2f
- D) :.8f
**Answer:** A
**Explanation:** :>8.2f right-aligns across width 8 with 2 decimal digits.


---

# Practice Challenge

Add a method to export expenses to a CSV file named 'expenses.csv'.
