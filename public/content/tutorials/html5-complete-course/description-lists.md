---
id: html-description-lists
slug: description-lists
course: html5
lesson: lists
chapter: 7
topic: 7.2
title: Description Lists in HTML
description: Master HTML description lists using dl, dt, and dd elements for glossaries, metadata key-value pairs, and FAQs.
difficulty: Beginner
readingTime: 8
order: 12
keywords:
  - html description list
  - dl tag
  - dt tag
  - dd tag
  - definition list
  - key value html
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Description Lists in HTML (`<dl>`)

In addition to unordered lists (`<ul>`) and ordered lists (`<ol>`), HTML provides a third powerful list type: **Description Lists** (`<dl>`).

A description list is a list of terms, with a description or definition of each term.

---

# Description List Elements

| Tag | Name | Purpose |
|---|---|---|
| `<dl>` | Description List | Container element enclosing the entire list |
| `<dt>` | Description Term | Specifies the term, title, or key |
| `<dd>` | Description Details | Specifies the definition, description, or value |

---

# Basic Syntax & Example

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — the standard markup language for documents designed to be displayed in a web browser.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — used for describing the presentation and styling of a document written in HTML.</dd>

  <dt>JavaScript</dt>
  <dd>A lightweight, interpreted programming language that enables interactive web applications.</dd>
</dl>
```

---

# Practical Real-World Use Cases

### 1. Key-Value Metadata Display
Description lists are ideal for receipt summaries, product specifications, and user profile data:

```html
<dl>
  <dt>Student Name:</dt>
  <dd>Sumit Kumar</dd>

  <dt>Course Enrolled:</dt>
  <dd>HTML5 Complete Masterclass</dd>

  <dt>Status:</dt>
  <dd>Active Student</dd>
</dl>
```

### 2. FAQ (Frequently Asked Questions)

```html
<dl>
  <dt>Do I get a certificate after completion?</dt>
  <dd>Yes! An official verifiable MSK Institute certificate with QR code is awarded.</dd>

  <dt>Are the notes downloadable?</dt>
  <dd>Yes, all chapter notes can be printed and downloaded freely.</dd>
</dl>
```

---

# Multiple Choice Questions (MCQs)

### 1. Which tag defines the container for a description list?

A. `<list>`

B. `<dl>`

C. `<dt>`

D. `<dd>`

**Answer:** B

---

### 2. Which tag defines the description term (key)?

A. `<dd>`

B. `<dt>`

C. `<term>`

D. `<key>`

**Answer:** B

---

# Summary

- `<dl>` wraps description lists.
- `<dt>` marks the term (title/key).
- `<dd>` marks the description (detail/value).
- Ideal for dictionaries, product specs, metadata, and FAQ sections.
