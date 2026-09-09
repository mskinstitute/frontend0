---
id: html-form-controls-validations
slug: form-controls-validations
course: html5
lesson: form
chapter: 11
topic: 11.2
title: Form Controls & Built-in Client Validations
description: Master HTML5 native form validation attributes (required, pattern, min, max, step) and interactive controls like select, textarea, and datalist.
difficulty: Intermediate
readingTime: 12
order: 20
keywords:
  - html form validation
  - required attribute
  - pattern regex
  - select tag
  - textarea tag
  - datalist element
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Form Controls & Built-in Client Validations

HTML5 introduced powerful native client-side validation mechanisms. You can enforce required fields, string length, regex patterns, and numeric ranges directly in HTML **without writing a single line of JavaScript**.

---

# HTML5 Validation Attributes

| Attribute | Applies To | Description |
|---|---|---|
| `required` | Most inputs | Form cannot be submitted if input is empty |
| `minlength` / `maxlength` | Text, Password, Email | Restricts minimum/maximum character count |
| `min` / `max` | Number, Date, Range | Restricts minimum/maximum numeric or date value |
| `step` | Number, Range | Specifies legal number intervals (e.g. `step="0.01"` for currency) |
| `pattern` | Text, Tel, Search, URL | Enforces a regular expression (Regex) |

---

# Practical Example: Production Student Registration Form

```html
<form action="/api/register" method="POST">
  <!-- Required Text with Length Limits -->
  <label for="fullname">Full Name:</label>
  <input 
    type="text" 
    id="fullname" 
    name="fullname" 
    required 
    minlength="3" 
    maxlength="50"
    placeholder="e.g. Sumit Kumar"
  >

  <!-- Email with native RFC validation -->
  <label for="email">Email Address:</label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    required
    placeholder="name@example.com"
  >

  <!-- Phone with 10-digit Regex Pattern -->
  <label for="mobile">Mobile Number:</label>
  <input 
    type="tel" 
    id="mobile" 
    name="mobile" 
    required 
    pattern="[6-9][0-9]{9}" 
    title="Please enter a valid 10-digit Indian mobile number"
    placeholder="9876543210"
  >

  <!-- Number with Min/Max limits -->
  <label for="age">Age (14 - 60):</label>
  <input 
    type="number" 
    id="age" 
    name="age" 
    min="14" 
    max="60" 
    required
  >

  <!-- Multi-line Comments -->
  <label for="remarks">Special Requests:</label>
  <textarea id="remarks" name="remarks" rows="4" maxlength="300"></textarea>

  <!-- Submit Button -->
  <button type="submit">Submit Registration</button>
</form>
```

---

# Advanced Form Controls

### 1. Dropdown Select (`<select>`)
```html
<label for="course">Choose Course:</label>
<select id="course" name="course" required>
  <option value="" disabled selected>-- Select a course --</option>
  <option value="html5">HTML5 Complete Masterclass</option>
  <option value="python">Python for Beginners</option>
  <option value="ccc">CCC NIELIT Diploma</option>
</select>
```

### 2. Autocomplete `<datalist>`
The `<datalist>` element provides an "autocomplete" feature on `<input>` elements while still allowing custom text:

```html
<label for="city">Select City:</label>
<input list="cities" id="city" name="city">

<datalist id="cities">
  <option value="Shikohabad">
  <option value="Firozabad">
  <option value="Agra">
  <option value="Mainpuri">
  <option value="Etawah">
</datalist>
```

---

# Multiple Choice Questions (MCQs)

### 1. Which attribute specifies that an input field must be filled out before submitting the form?

A. `mandatory`

B. `required`

C. `validate`

D. `important`

**Answer:** B

---

### 2. Which attribute allows enforcing a custom Regular Expression on an input field?

A. `regex`

B. `rule`

C. `pattern`

D. `format`

**Answer:** C

---

# Summary

- HTML5 validation attributes (`required`, `minlength`, `maxlength`, `min`, `max`, `pattern`) validate user data before form submission.
- The `pattern` attribute accepts regex expressions for precise formats like phone numbers and postal codes.
- `<select>` creates dropdowns, and `<datalist>` provides autocomplete suggestions for standard inputs.
