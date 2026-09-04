---
id: html-target-attributes-security
slug: target-attributes-security
course: html5
lesson: links
chapter: 6
topic: 6.2
title: Target Attributes & Hyperlink Security
description: Master target attributes (_blank, _self, _top, _parent) and essential web security protections including rel="noopener noreferrer".
difficulty: Beginner
readingTime: 10
order: 10
keywords:
  - html links
  - target attribute
  - target blank
  - noopener
  - noreferrer
  - link security
lastUpdated: 2026-09-05
author: MSK Institute
version: 1.0
hideOnThisPage: true
---

# Target Attributes & Hyperlink Security

When creating links with the anchor tag `<a>`, the `target` attribute specifies where to open the linked document.

---

# Target Values

| Target Value | Description |
|---|---|
| `_self` | Default. Opens the document in the same window/tab |
| `_blank` | Opens the document in a new window or new browser tab |
| `_parent` | Opens the document in the parent frame |
| `_top` | Opens the document in the full body of the window, breaking out of frames |

```html
<!-- Opens in new tab -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  Visit GitHub
</a>
```

---

# Security Hazard: Reverse Tabnabbing

When you use `target="_blank"` without precautions, the newly opened page gains access to your window object via `window.opener`.

A malicious site can execute:
```javascript
window.opener.location = "https://fake-phishing-site.com";
```
This is called **reverse tabnabbing**. The user may not notice that their original tab was redirected to a phishing page.

### The Fix: `rel="noopener noreferrer"`

Always add `rel="noopener noreferrer"` to external links:
- `noopener`: Prevents the new page from accessing `window.opener`.
- `noreferrer`: Prevents the browser from sending the HTTP `Referer` header.

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
  Secure External Link
</a>
```

> 💡 **Tip**
>
> Modern browsers (Chrome 88+, Firefox 79+, Safari 12.2+) automatically apply `rel="noopener"` by default when `target="_blank"` is set, but adding it explicitly is still an industry best practice for older browser compatibility.

---

# Other Protocols: mailto, tel & download

You can trigger native device actions with links:

```html
<!-- Email link -->
<a href="mailto:support@mskinstitute.in?subject=Admission%20Query">Send Email</a>

<!-- Phone call link -->
<a href="tel:+919876543210">Call Us</a>

<!-- Direct file download -->
<a href="/downloads/syllabus.pdf" download="HTML5-Syllabus.pdf">Download Syllabus</a>
```

---

# Multiple Choice Questions (MCQs)

### 1. Which target attribute value opens a link in a new browser tab?

A. `_new`

B. `_window`

C. `_blank`

D. `_top`

**Answer:** C

---

### 2. Why should you always pair `target="_blank"` with `rel="noopener"`?

A. To make the link load twice as fast

B. To prevent the new page from accessing window.opener for security

C. To make the link underline disappear

D. To send cookies automatically

**Answer:** B

---

# Summary

- `target="_self"` opens in current tab (default).
- `target="_blank"` opens in a new tab.
- Always add `rel="noopener noreferrer"` to external `_blank` links for security.
- `mailto:`, `tel:`, and `download` trigger email clients, phone dialers, and direct file downloads.
