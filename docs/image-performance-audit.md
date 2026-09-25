# MSK Institute — Image Performance Audit

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  

---

## 1. Image Inventory & Delivery Audit

| File / Remote Source | Pages Used | Source Dimensions | File Size | Format | Rendered Dimensions | Above/Below Fold | Current Delivery Method | Optimization Action |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| `/assets/img/instructors/sumit-kumar.png` | All 13 Blog Posts, Team sections | 800 x 800 | **784.0 KB** ⚠️ | PNG | 44 x 44 | Above | Unoptimized `<img>` | Convert to WebP (400x400, ~18 KB). Add explicit width & height. |
| `/logo.jpg` | All Pages (Navbar, Footer, Schemas) | 300 x 300 | 2.1 KB | JPEG | 32 x 32 | Above | Plain `<img>` | Optimize dimensions and add priority in header. |
| `https://images.unsplash.com/...` (66 course thumbnails) | `/courses`, `/courses/[slug]`, `/` | 600 x 340 (avg) | ~45 KB - 85 KB each | JPEG | 380 x 214 | Mixed | Unoptimized `<img>` with query params | Enable Next.js remote pattern optimization to WebP/AVIF. |
| `https://drive.google.com/thumbnail?id=1AXwGPZPx7...` | `/courses/ccc`, `/courses/adca` | 1000 x 600 | ~65 KB | JPEG | 600 x 340 | Above | Remote Google Drive thumbnail | Enable Next.js remote pattern or replace with self-hosted WebP. |
| `/brand/android-icon-512x512.png` | Manifest / PWA | 512 x 512 | 119.5 KB | PNG | Icon | N/A | PWA Manifest | Keep for Android splash/PWA compliance. |
| `/brand/maskable-icon-512x512.png`| Manifest / PWA | 512 x 512 | 94.0 KB | PNG | Icon | N/A | PWA Manifest | Optimized maskable asset. |
| `/images/tutorials/markdown/markdown-documentation.jpg`| Markdown Tutorial Hub | 1200 x 630 | 160.4 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~35 KB). |
| `/images/tutorials/ccc/cyber-security.jpg` | CCC Tutorial | 1200 x 630 | 109.5 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~28 KB). |
| `/images/tutorials/ccc/computer-hardware.jpg` | CCC Tutorial | 1200 x 630 | 81.6 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~22 KB). |
| `/images/tutorials/ccc/input-devices.jpg` | CCC Tutorial | 1200 x 630 | 67.0 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~19 KB). |
| `/images/tutorials/ccc/digital-india-upi.jpg` | CCC Tutorial | 1200 x 630 | 66.1 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~18 KB). |
| `/images/tutorials/pandas/pandas-data-analytics.jpg` | Pandas Tutorial | 1200 x 630 | 63.8 KB | JPEG | 600 x 315 | Below | Static public JPEG | Convert to WebP (~17 KB). |
| 45+ Diagram SVGs (`/images/tutorials/*/*.svg`) | Specific tutorial lessons | Vector | 2.5 KB - 8 KB | SVG | Responsive | Below | Inline SVG / `<img loading="lazy">` | Optimal vector formats. Zero layout shifts. |

---

## 2. Identified Image Deficiencies

### 1. Missing Dimensions & Layout Shifts (CLS)
* On `/blogs`, 28 article thumbnail images were rendered without explicit `width` and `height` attributes on their `<img />` tags.
* On `/blogs/[slug]`, the author avatar (`sumit-kumar.png`) and the hero cover image lacked explicit inline width/height attributes, causing cumulative layout shifts during image loading.

### 2. Excessive Resolution & File Weight
* `public/assets/img/instructors/sumit-kumar.png` is 800x800 pixels at 784 KB, loaded across all blog posts where it is displayed inside a 44x44 circular avatar thumbnail. This wastes over 760 KB of bandwidth on every article view.

### 3. Remote Image Optimization Missing in `next.config.ts`
* Course featured images hosted on `images.unsplash.com` and `drive.google.com` are not routed through Next.js Image Optimization because `next.config.ts` lacks the `images.remotePatterns` configuration for these domains and modern formats (`image/avif`, `image/webp`).

---

## 3. Image Optimization Plan
1. **Optimize `sumit-kumar.png`:** Convert and compress using `sharp` to a 400x400 WebP asset (~18 KB), reducing byte weight by **97.7%**.
2. **Add Missing Dimensions:** Add explicit `width` and `height` attributes to all blog and author avatar image tags.
3. **Configure `next.config.ts`:** Enable modern formats (`['image/avif', 'image/webp']`) and add allowed remote patterns for `images.unsplash.com` and `drive.google.com`.
4. **Hero Image Rules:** Ensure LCP hero images carry `fetchPriority="high"` and are never lazy-loaded, while below-fold course thumbnails maintain `loading="lazy"`.
