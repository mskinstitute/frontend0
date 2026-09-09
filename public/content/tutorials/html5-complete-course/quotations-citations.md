---
id: html-quotations-citations
slug: quotations-citations
course: html5
lesson: text-formatting
chapter: 3
topic: 3.2
title: Quotations & Citations in HTML
description: Learn how to markup quotations, citations, abbreviations, and contact addresses using blockquote, q, cite, abbr, and address elements.
difficulty: Beginner
readingTime: 10
order: 6
keywords:
  - html quotations
  - blockquote
  - q tag
  - cite tag
  - abbr tag
  - address element
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Quotations & Citations in HTML

When building blogs, portfolios, documentation, or news websites, you often need to quote other authors, reference scientific sources, abbreviate technical jargon, or present business contact details.

HTML provides dedicated semantic elements for all these use cases.

---

# Key Semantic Elements for Quotations

| Element | Tag Name | Description | Default Rendering |
|---|---|---|---|
| Block Quote | `<blockquote>` | Long quotation taken from an external source | Indented block with left margin |
| Inline Quote | `<q>` | Short inline quotation embedded in a paragraph | Surrounds text with quotation marks |
| Abbreviation | `<abbr>` | Explains an acronym or shortened word | Dotted underline, tooltip on hover |
| Work Citation | `<cite>` | Defines the title of a creative work (book, movie, paper) | Italicized text |
| Contact Address | `<address>` | Contact information for the author/owner | Italicized block with line breaks |
| Bi-Directional | `<bdo>` | Overrides current text direction (LTR vs RTL) | Reverses visual text display |

---

# 1. The `<blockquote>` Element

The `<blockquote>` element specifies a section that is quoted from another source. Browsers typically indent `<blockquote>` elements.

```html
<blockquote cite="https://www.w3.org/Consortium/">
  The power of the Web is in its universality.
  Access by everyone regardless of disability is an essential aspect.
</blockquote>
<p>— Tim Berners-Lee, <cite>W3C Founder</cite></p>
```

> 📌 **Note:-**
>
> The `cite` attribute on `<blockquote>` is a URL indicating the original source. It is invisible to readers but used by search engines and screen readers.

---

# 2. The `<q>` Element (Short Inline Quotations)

The `<q>` tag defines a short quotation. Browsers automatically insert real quotation marks around the text:

```html
<p>Steve Jobs once said: <q>Stay hungry, stay foolish.</q></p>
```

### Expected Output

Steve Jobs once said: “Stay hungry, stay foolish.”

---

# 3. The `<abbr>` Element (Abbreviations & Acronyms)

Use `<abbr>` to give assistive technologies and browsers useful information about abbreviations:

```html
<p>We are learning <abbr title="HyperText Markup Language">HTML5</abbr> at MSK Institute.</p>
```

---

# 4. The `<address>` Element

The `<address>` element should contain contact details for the author/owner of the document:

```html
<address>
  Written by MSK Institute Faculty<br>
  Visit us at: Station Road, Shikohabad, UP<br>
  Email: <a href="mailto:info@mskinstitute.in">info@mskinstitute.in</a>
</address>
```

---

# Multiple Choice Questions (MCQs)

### 1. Which tag is used for long quotations from an external source?

A. `<quote>`

B. `<blockquote>`

C. `<q>`

D. `<cite>`

**Answer:** B

---

### 2. Which tag automatically inserts quotation marks around text?

A. `<q>`

B. `<blockquote>`

C. `<mark>`

D. `<cite>`

**Answer:** A

---

### 3. Which attribute on `<abbr>` provides the expanded text tooltip?

A. `alt`

B. `name`

C. `title`

D. `desc`

**Answer:** C

---

# Summary

In this lesson, you mastered:
- Using `<blockquote>` for large quotes with citation URLs.
- Using `<q>` for inline quotes with automatic quotation marks.
- Marking up acronyms with `<abbr title="...">`.
- Displaying creator contact info with `<address>`.
