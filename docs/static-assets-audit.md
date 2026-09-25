# MSK Institute — Static Assets Audit

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  
**Directory Analyzed:** `public/` (Total files: 122 images & icons + 11 data files)

---

## 1. Static Assets Distribution by Directory

| Directory | File Count | Total Disk Size | Typical Asset Types | Status & Optimization |
| :--- | :---: | :---: | :--- | :--- |
| `public/assets/img/instructors/` | 1 | 784.0 KB | Instructor profile photo (`sumit-kumar.png`) | **Requires Optimization:** 800x800 PNG used as 44px avatar. Convert to WebP (~18 KB). |
| `public/brand/` | 23 | 550.2 KB | Favicons, Apple Touch icons, Android icons, PWA splash screenshots | **Retain:** All required for PWA compliance across various devices. |
| `public/icons/` | 4 | 215.3 KB | Standard Android / Favicon icons | **Retain:** Core PWA icons. |
| `public/images/tutorials/` | 89 | 592.4 KB | Lesson SVGs, cheatsheet diagrams, hardware photos | **Optimal:** 85+ diagram SVGs are clean vector graphics (3 KB - 6 KB each). |
| `public/data/` | 11 | 2.3 MB | JSON databases (courses, batches, study materials, inventory) | **Server-side data:** Must not be statically bundled into client JS bundles. |
| Root (`public/logo.jpg`, `sw.js`, etc.)| 8 | 24.1 KB | Service worker, robots, manifest, favicon | **Optimal:** Lightweight root assets. |

---

## 2. Top 10 Largest Static Files

| File Path | File Size | Recommended Optimization |
| :--- | :---: | :--- |
| `public/assets/img/instructors/sumit-kumar.png` | **784.0 KB** ⚠️ | Convert to WebP (400x400 at 85% quality, ~18 KB). |
| `public/images/tutorials/markdown/markdown-documentation.jpg` | 160.4 KB | Convert to WebP (~35 KB). |
| `public/brand/android-icon-512x512.png` | 119.5 KB | Required for Android 512px app icon. |
| `public/images/tutorials/ccc/cyber-security.jpg` | 109.5 KB | Convert to WebP (~28 KB). |
| `public/brand/maskable-icon-512x512.png` | 94.0 KB | Required for Android adaptive maskable icon. |
| `public/images/tutorials/ccc/computer-hardware.jpg` | 81.6 KB | Convert to WebP (~22 KB). |
| `public/brand/screenshot-desktop.png` | 73.1 KB | Used in PWA install dialog preview. |
| `public/images/tutorials/ccc/input-devices.jpg` | 67.0 KB | Convert to WebP (~19 KB). |
| `public/images/tutorials/ccc/digital-india-upi.jpg` | 66.1 KB | Convert to WebP (~18 KB). |
| `public/images/tutorials/pandas/pandas-data-analytics.jpg` | 63.8 KB | Convert to WebP (~17 KB). |

---

## 3. Hygiene Verification
* **Zero Orphan Assets:** All icons, diagrams, and images in `public/` are mapped to active routes, tutorial lessons, or PWA manifests.
* **No Unused Heavy PDFs:** No large binary PDFs are embedded in the static directory; all PDF guides are dynamically generated on-demand in the browser via `jspdf`.
