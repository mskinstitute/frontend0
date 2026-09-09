---
id: html-colors
slug: html-colors-color-codes
course: html5
lesson: html-styling
chapter: 5
topic: 5.1
title: HTML Colors & Color Formats
description: Master color representation in HTML and CSS. Learn color names, hexadecimal HEX codes, RGB, RGBA with alpha transparency, and HSL values.
difficulty: Beginner
readingTime: 10
order: 7
keywords:
  - html colors
  - hex color codes
  - rgb rgba
  - hsl colors
  - background color
lastUpdated: 2026-09-02
author: MSK Institute
version: 1.2
---

# HTML Colors & Color Formats

Colors bring life, emotion, and branding to the web. In HTML and CSS, colors can be specified in several standardized formats depending on whether you need simple presets, precise hex codes, or transparency channels.

In this lesson, you will master the four primary ways to define colors on the web: **Named Colors**, **HEX**, **RGB/RGBA**, and **HSL**.

---

# 1. Color Names

HTML supports **140 standard color names** recognized by all modern browsers:

```html
<!-- Text Colors using CSS inline styles -->
<h2 style="color: Tomato;">Heading in Tomato Red</h2>
<p style="color: DodgerBlue;">Paragraph in Dodger Blue</p>
<p style="color: Orange;">Highlight in MSK Orange</p>
<p style="color: MediumSeaGreen;">Success in Medium Sea Green</p>

<!-- Background Colors -->
<div style="background-color: #0A2540; color: white; padding: 20px;">
  Navy Blue Hero Container
</div>
```

---

# 2. Hexadecimal Color Codes (HEX)

A hexadecimal color code is specified with a `#` followed by six hexadecimal digits (`0` through `F`):

$$\text{\#RRGGBB}$$

- `RR` represents **Red** (`00` to `FF` in hex, or `0` to `255` in decimal).
- `GG` represents **Green** (`00` to `FF`).
- `BB` represents **Blue** (`00` to `FF`).

### Examples:
| Color | HEX Code | Red (0-255) | Green (0-255) | Blue (0-255) |
|---|---|---|---|---|
| **MSK Orange** | `#FF6B00` | 255 | 107 | 0 |
| **MSK Dark Navy** | `#0A2540` | 10 | 37 | 64 |
| **Pure White** | `#FFFFFF` | 255 | 255 | 255 |
| **Pure Black** | `#000000` | 0 | 0 | 0 |
| **Emerald Green**| `#10B981` | 16 | 185 | 129 |

### 3-Digit Shorthand HEX:
When each pair of digits is identical, it can be written as 3 digits:
- `#FFFFFF` &rarr; `#FFF`
- `#000000` &rarr; `#000`
- `#FF6600` &rarr; `#F60`

---

# 3. RGB and RGBA (Red, Green, Blue, Alpha)

### RGB
Specifies color intensity from 0 to 255 for each channel:
```html
<p style="color: rgb(255, 107, 0);">MSK Vibrant Orange</p>
```

### RGBA (With Alpha Transparency)
The fourth parameter is **Alpha** (a decimal from `0.0` for completely transparent to `1.0` for completely opaque):

```html
<!-- Semi-transparent dark overlay card -->
<div style="background-color: rgba(10, 37, 64, 0.85); color: white; padding: 20px; border-radius: 12px;">
  <h3>Overlay Card with 85% Opacity</h3>
</div>
```

---

# 4. HSL (Hue, Saturation, Lightness)

HSL is often preferred by graphic and UI designers because it models human visual perception:

- **Hue (0 to 360°):** Degree on the color wheel (`0°` = Red, `120°` = Green, `240°` = Blue).
- **Saturation (0% to 100%):** Intensity (`0%` is grayscale, `100%` is pure vibrant color).
- **Lightness (0% to 100%):** Brightness (`0%` is black, `50%` is normal, `100%` is pure white).

```html
<p style="color: hsl(25, 100%, 50%);">Vibrant Orange in HSL</p>
```

---

# Practice Quiz

### 1. In the HEX color `#FF0000`, which color channel is at maximum intensity?
- A) Blue
- B) Green
- C) Red
- D) Yellow
**Answer:** C
**Explanation:** The first two digits (`FF`) represent Red at maximum intensity (`255`), while Green and Blue are `00`.

---

### 2. What does the "A" in RGBA stand for?
- A) Angle
- B) Alpha (transparency / opacity)
- C) Amber
- D) Alignment
**Answer:** B
**Explanation:** Alpha specifies the opacity level between `0.0` (invisible) and `1.0` (fully solid).
