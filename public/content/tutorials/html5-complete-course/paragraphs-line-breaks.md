---
id: html-paragraphs
slug: paragraphs-line-breaks
course: html5
lesson: html-text
chapter: 2
topic: 2.2
title: Paragraphs & Line Breaks in HTML
description: Master the paragraph tag p, line breaks with br, thematic divider rules with hr, and whitespace collapsing rules.
difficulty: Beginner
readingTime: 8
order: 4
keywords:
  - html paragraphs
  - p tag
  - br line break
  - hr divider
  - whitespace collapsing
lastUpdated: 2026-09-02
author: MSK Institute
version: 1.2
---

# HTML Paragraphs, Line Breaks & Dividers

In HTML, running body text is organized using paragraphs (`<p>`), line breaks (`<br>`), and thematic horizontal dividers (`<hr>`).

---

# Paragraphs (`<p>`)

A paragraph always starts on a new line, and browsers automatically add a margin before and after the paragraph:

```html
<p>MSK Institute is the leading coding center in Shikohabad.</p>
<p>We teach Python, Full Stack Web Development, and UI Design.</p>
```

---

# Line Breaks (`<br>`)

The `<br>` tag inserts a single line break without starting a new paragraph or adding extra margins:

```html
<p>
  MSK Institute<br>
  Station Road, Near Railway Bridge<br>
  Shikohabad, UP - 283135
</p>
```

---

# Thematic Divider (`<hr>`)

The `<hr>` tag represents a thematic break between paragraphs or sections:

```html
<p>Introduction to the course curriculum...</p>
<hr>
<p>Detailed module breakdown follows below...</p>
```

---

# Understanding HTML Whitespace Collapsing

HTML parsers automatically collapse multiple consecutive spaces, tabs, or newlines into a single space:

```html
<!-- HTML Code: Multiple spaces and newlines -->
<p>
  Learn        to
  code         today!
</p>

<!-- Browser Displays: -->
<p>Learn to code today!</p>
```

To preserve exact spaces and tabs, use the `<pre>` tag.
