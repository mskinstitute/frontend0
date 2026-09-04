---
id: html-colspan-rowspan
slug: colspan-rowspan
course: html5
lesson: tables
chapter: 8
topic: 8.2
title: Merging Cells with Colspan & Rowspan
description: Master advanced table formatting in HTML using colspan and rowspan attributes to merge columns and rows seamlessly.
difficulty: Intermediate
readingTime: 10
order: 14
keywords:
  - html tables
  - colspan
  - rowspan
  - table cells
  - merge cells html
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Merging Cells with Colspan & Rowspan

In complex spreadsheets, invoices, and timetables, cells often need to span across multiple columns or multiple rows.

HTML provides two powerful attributes for `<th>` and `<td>`:
1. `colspan`: Combines multiple **columns** horizontally into a single cell.
2. `rowspan`: Combines multiple **rows** vertically into a single cell.

---

# 1. The `colspan` Attribute (Horizontal Merging)

The `colspan` attribute specifies how many columns a single header or data cell should extend across.

```html
<table border="1">
  <tr>
    <th colspan="2">Student Information</th>
  </tr>
  <tr>
    <td>Name:</td>
    <td>Sumit Kumar</td>
  </tr>
  <tr>
    <td>Roll Number:</td>
    <td>MSK-2026-042</td>
  </tr>
</table>
```

### Visual Representation

```text
+-----------------------------------+
|        Student Information        |  <-- colspan="2"
+-----------------+-----------------+
| Name:           | Sumit Kumar     |
+-----------------+-----------------+
| Roll Number:    | MSK-2026-042    |
+-----------------+-----------------+
```

---

# 2. The `rowspan` Attribute (Vertical Merging)

The `rowspan` attribute specifies how many rows a cell should span down vertically.

```html
<table border="1">
  <tr>
    <th>Course</th>
    <th>Batch</th>
    <th>Timings</th>
  </tr>
  <tr>
    <td rowspan="2">HTML5 Masterclass</td>
    <td>Morning Batch</td>
    <td>08:00 AM - 10:00 AM</td>
  </tr>
  <tr>
    <td>Evening Batch</td>
    <td>05:00 PM - 07:00 PM</td>
  </tr>
</table>
```

### Visual Representation

```text
+-------------------+---------------+-----------------------+
| Course            | Batch         | Timings               |
+-------------------+---------------+-----------------------+
| HTML5 Masterclass | Morning Batch | 08:00 AM - 10:00 AM   |
| (rowspan="2")     +---------------+-----------------------+
|                   | Evening Batch | 05:00 PM - 07:00 PM   |
+-------------------+---------------+-----------------------+
```

> ⚠️ **Common Mistake**
>
> When using `rowspan="2"`, remember to **omit** the corresponding `<td>` in the subsequent row, otherwise an extra unwanted cell will be pushed to the right!

---

# Multiple Choice Questions (MCQs)

### 1. Which attribute merges two adjacent columns horizontally?

A. `rowspan="2"`

B. `colspan="2"`

C. `span="2"`

D. `merge="columns"`

**Answer:** B

---

### 2. Which attribute merges two cells across vertical rows?

A. `rowspan="2"`

B. `colspan="2"`

C. `height="2"`

D. `vspan="2"`

**Answer:** A

---

# Summary

- `colspan="n"` merges `n` columns to the right.
- `rowspan="n"` merges `n` rows downwards.
- Always remove the extra displaced cells in merged rows to keep table geometry balanced.
