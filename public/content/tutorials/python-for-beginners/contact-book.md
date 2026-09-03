---
id: python-contact-book
slug: contact-book
course: python-for-beginners
chapter: 16
topic: 16.1
title: Contact Book
description: Build a complete production-grade CLI Contact Book with add, search, update, delete, and list operations.
difficulty: Beginner
readingTime: 15
order: 82
keywords:
  - project
  - contact book
  - crud
  - real world project
lastUpdated: 2026-09-03
author: MSK Institute
version: 1.0
---

# Contact Book

Build a persistent CLI Contact Book application that manages phone numbers, emails, and names.

---

# Key Concepts & Detailed Explanation

undefined

---

# Code Examples & Output

```python
# Contact Book Application
class ContactBook:
    def __init__(self):
        self.contacts = {}

    def add_contact(self, name, phone, email):
        self.contacts[name.lower()] = {
            "name": name,
            "phone": phone,
            "email": email
        }
        print(f"Contact '{name}' added successfully!")

    def search_contact(self, name):
        contact = self.contacts.get(name.lower())
        if contact:
            print(f"Name: {contact['name']} | Phone: {contact['phone']} | Email: {contact['email']}")
        else:
            print(f"No contact found for '{name}'.")

    def list_all(self):
        if not self.contacts:
            print("Contact book is empty.")
            return
        print(f"\n--- Contact List ({len(self.contacts)}) ---")
        for c in self.contacts.values():
            print(f"• {c['name']} -> {c['phone']} ({c['email']})")

# Demonstration
book = ContactBook()
book.add_contact("Sumit Kumar", "+91 9876543210", "sumit@mskinstitute.in")
book.add_contact("Priya Sharma", "+91 9123456789", "priya@example.com")
book.search_contact("Sumit Kumar")
book.list_all()
```

**Expected Output:**
```text
Contact 'Sumit Kumar' added successfully!
Contact 'Priya Sharma' added successfully!
Name: Sumit Kumar | Phone: +91 9876543210 | Email: sumit@mskinstitute.in

--- Contact List (2) ---
• Sumit Kumar -> +91 9876543210 (sumit@mskinstitute.in)
• Priya Sharma -> +91 9123456789 (priya@example.com)
```

---

# Best Practices & Common Pitfalls

Store dictionary keys in lowercase ('name.lower()') so user searches are case-insensitive.

---

# Practice Quiz

### 1. Why should search keys be normalized to lowercase in contact book lookups?
- A) Saves memory
- B) Allows case-insensitive searching so 'Sumit' matches 'sumit'
- C) Python requires lowercase dict keys
- D) Prevents SQL injection
**Answer:** B
**Explanation:** Normalizing keys enables case-insensitive lookups.

---

### 2. Which data structure provides the fastest average search time for contacts by name?
- A) List
- B) Dictionary (Hash Map)
- C) Tuple
- D) Array
**Answer:** B
**Explanation:** Dictionaries provide O(1) average lookup time.


---

# Practice Challenge

Add a 'delete_contact(name)' method and an 'export_to_csv(filename)' method to the Contact Book.
