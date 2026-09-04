---
id: html-tables
slug: tables-structured-data
course: html5
lesson: html-navigation
chapter: 2
topic: 2.2
title: Tables & Structured Data
description: Master HTML data tables, table headers, bodies, footers, accessible scope attributes, merging columns with colspan, merging rows with rowspan, and responsive styling.
difficulty: Intermediate
readingTime: 13
order: 5
keywords:
  - html tables
  - table thead tbody
  - colspan rowspan
  - html table accessibility
  - scope col row
lastUpdated: 2026-09-02
author: MSK Institute
version: 1.2
---

# Tables & Structured Data

Tables in HTML are designed for displaying **tabular data**—information organized into a logical two-dimensional grid of rows and columns (such as fee structures, train schedules, comparison matrices, and financial balance sheets).

> ⚠️ **Historical Warning:**
>
> In the 1990s and early 2000s, developers used `<table>` tags to design page layouts. **Never do this today!** Tables should strictly be used for tabular data. Page layouts must always be built with CSS Flexbox and CSS Grid.

---

# The Anatomy of a Modern Data Table

A semantic, fully accessible HTML5 table is composed of several coordinated tags:

```html
<table>
  <!-- Table Caption: Describes the table for users and screen readers -->
  <caption>MSK Institute Course Fee & Batch Schedule 2026</caption>

  <!-- Table Header -->
  <thead>
    <tr>
      <th scope="col">Course Name</th>
      <th scope="col">Duration</th>
      <th scope="col">Mode</th>
      <th scope="col">Batch Timing</th>
      <th scope="col">Fee (₹)</th>
    </tr>
  </thead>

  <!-- Table Body: Contains actual rows of data -->
  <tbody>
    <tr>
      <th scope="row">Python Programming Masterclass</th>
      <td>2 Months</td>
      <td>Online + Offline</td>
      <td>08:00 AM - 09:30 AM</td>
      <td>₹6,500</td>
    </tr>
    <tr>
      <th scope="row">Full Stack Web Development</th>
      <td>6 Months</td>
      <td>Classroom Lab</td>
      <td>10:00 AM - 12:00 PM</td>
      <td>₹18,000</td>
    </tr>
    <tr>
      <th scope="row">CCC Computer Concepts</th>
      <td>1 Month</td>
      <td>Online & Offline</td>
      <td>04:00 PM - 05:00 PM</td>
      <td>₹2,500</td>
    </tr>
  </tbody>

  <!-- Table Footer: For summaries, totals, averages -->
  <tfoot>
    <tr>
      <td colspan="4"><strong>Special Scholarship Available on Merit:</strong></td>
      <td><strong>Up to 50% Off</strong></td>
    </tr>
  </tfoot>
</table>
```

---

# Key Elements Explained

### 1. `<caption>`
The title or description of the table. Must be the very first child immediately after the opening `<table>` tag. Screen readers announce the caption first, giving blind users immediate context.

### 2. `<thead>`, `<tbody>`, and `<tfoot>`
- **`<thead>`**: Wraps the column headers. When tables are printed across multiple pages, browsers automatically repeat `<thead>` on every printed page!
- **`<tbody>`**: Wraps all rows of data.
- **`<tfoot>`**: Wraps summary or calculation rows (totals, averages, legal terms).

### 3. `<th>` vs `<td>`
- **`<th>`** (Table Header): Bold and centered by default. Used for label cells.
- **`<td>`** (Table Data): Normal left-aligned text. Used for data values.

### 4. Accessibility with `scope`
The `scope` attribute explicitly defines what the header applies to:
- `scope="col"`: The header applies to all cells in that vertical column.
- `scope="row"`: The header applies to all cells in that horizontal row.

---

# Merging Cells: `colspan` and `rowspan`

Complex tables often require combining multiple horizontal or vertical cells into one:

### 1. `colspan` (Horizontal Column Spanning)
Spans across multiple adjacent columns:
```html
<tr>
  <td colspan="3">Notice: All classrooms are closed on Sunday</td>
</tr>
```

### 2. `rowspan` (Vertical Row Spanning)
Spans across multiple vertical rows:
```html
<table border="1">
  <tr>
    <th>Day</th>
    <th>Time</th>
    <th>Subject</th>
  </tr>
  <tr>
    <!-- This cell spans across 2 rows for Monday and Tuesday -->
    <td rowspan="2">Mon - Tue</td>
    <td>09:00 AM</td>
    <td>HTML5 & Web Architecture</td>
  </tr>
  <tr>
    <!-- Notice Monday-Tuesday is already taken, so only 2 cells here -->
    <td>11:00 AM</td>
    <td>CSS3 Grid & Responsive Layouts</td>
  </tr>
</table>
```

---

# Practice Quiz

### 1. Which element defines a header cell in an HTML table?
- A) `<td>`
- B) `<th>`
- C) `<head>`
- D) `<tr>`
**Answer:** B
**Explanation:** `<th>` defines a table header cell.

---

### 2. Which attribute allows a table cell to span across 3 horizontal columns?
- A) `rowspan="3"`
- B) `colspan="3"`
- C) `span="3"`
- D) `width="3col"`
**Answer:** B
**Explanation:** `colspan` merges columns horizontally.

---

# Next Lesson

**Next Topic (3.1): Images, Multimedia & Modern Embeds**

In the next lesson, we will explore:
- High-performance responsive images (`<img>`, `<picture>`, `srcset`)
- HTML5 native `<video>` and `<audio>`
- Captions and subtitles with `<track>`
- Secure embedding with `<iframe>`
