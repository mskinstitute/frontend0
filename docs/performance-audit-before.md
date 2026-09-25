# MSK Institute — Performance & Core Web Vitals Baseline Audit (Before)

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  
**Environment:** Next.js 15.5.24 Production Server (`next start`) on Localhost Port 3005  
**Auditor Engine:** Chromium DevTools Protocol (CDP) via Microsoft Edge v153.0.4234.48  
**Tested Devices:**
- **Desktop:** Viewport 1280x800, 1.0x DPR
- **Mobile:** Simulated Android Mobile (Viewport 375x667, 2.0x DPR, Mobile Chrome User Agent)

---

## 1. Executive Summary of Baseline Findings

A comprehensive performance baseline was executed across the 11 mission-critical pages of the MSK Institute website prior to making any optimizations.

### Core Web Vitals Targets vs Measured Baseline:
* **LCP Target (≤ 2.5s):** PASSED on most routes (248ms – 1,444ms), but reached **2,264ms** on desktop blog articles due to heavy unoptimized author avatars (784 KB `sumit-kumar.png`).
* **CLS Target (< 0.1):** **CRITICAL REGRESSIONS DETECTED** on:
  * `/live-batches`: **0.405** (Failing by 4x over the 0.1 threshold)
  * `/study-material`: **0.242** (Failing by 2.4x over the 0.1 threshold)
* **HTML Payload Bloat:** `/courses` transfers **147.3 KB** of HTML with an uncompressed raw HTML footprint of **994.2 KB** (nearly 1 MB) because complete multi-chapter syllabi for all 66 courses are serialized into the catalog page.
* **JavaScript Bundle Bloat:**
  * `/verify-certificate`: **1,485.6 KB** uncompressed JS (365.8 KB gzip) due to static imports of 1.2 MB JSON registries in `api.ts`.
  * `/admin`: **1,484.7 KB** uncompressed JS (361.9 KB gzip) due to `api.ts`.
  * `/tools/typing`: **1,361.6 KB** uncompressed JS (367.2 KB gzip) due to top-level `jsPDF` import (322 KB) in `TypingCertificateModal.tsx`.
* **Image Delivery:** Plain `<img>` tags are used across course cards and blogs without responsive `srcset` or Next.js image optimization for remote Unsplash and Google Drive thumbnail assets. 28 images on `/blogs` lack explicit width and height dimensions.

---

## 2. Page-by-Page Baseline Measurement Matrix

Measurements recorded using automated Chromium DevTools Protocol performance observers:

| Page / Route | Device | LCP (ms) | FCP (ms) | CLS | TTFB (ms) | Transferred HTML | Uncompressed HTML | Total JS (Gzip) | Total CSS (Gzip) | LCP Element |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Homepage** (`/`) | Desktop | 1,224 | 1,224 | 0.035 | 37.6 | 30.8 KB | 192.2 KB | 187.5 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 564 | 564 | 0.000 | 25.1 | 30.8 KB | 192.2 KB | 187.5 KB | 29.2 KB | Hero Heading `h1` |
| **Courses Listing** (`/courses`) | Desktop | 1,132 | 680 | 0.002 | 13.3 | 147.3 KB | **994.2 KB** | 197.5 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 540 | 456 | 0.000 | 11.2 | 147.3 KB | **994.2 KB** | 197.5 KB | 29.2 KB | Catalog Header `h1` |
| **Python Course** (`/courses/python-mastery...`) | Desktop | 1,444 | 1,444 | 0.001 | 55.6 | 34.6 KB | 224.9 KB | 187.6 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 652 | 652 | 0.000 | 32.4 | 34.6 KB | 224.9 KB | 187.6 KB | 29.2 KB | Course Title `h1` |
| **Data Analytics Course** (`/courses/data-analysis...`) | Desktop | 952 | 684 | 0.036 | 50.7 | 52.8 KB | 310.2 KB | 187.6 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 452 | 452 | 0.000 | 29.8 | 52.8 KB | 310.2 KB | 187.6 KB | 29.2 KB | Course Title `h1` |
| **Full Stack Course** (`/courses/full-stack-web-dev...`) | Desktop | 440 | 440 | 0.001 | 34.3 | 30.9 KB | 184.2 KB | 187.6 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 488 | 488 | 0.000 | 28.5 | 30.9 KB | 184.2 KB | 187.6 KB | 29.2 KB | Course Title `h1` |
| **Live Batches** (`/live-batches`) | Desktop | 476 | 192 | **0.405** ⚠️ | 3.7 | 13.1 KB | 63.7 KB | 195.2 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 356 | 356 | 0.000 | 3.1 | 13.1 KB | 63.7 KB | 195.2 KB | 29.2 KB | Batches Heading `h1` |
| **Study Material** (`/study-material`) | Desktop | 676 | 676 | **0.242** ⚠️ | 6.0 | 82.9 KB | 334.1 KB | 199.7 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 192 | 192 | 0.000 | 5.2 | 82.9 KB | 334.1 KB | 199.7 KB | 29.2 KB | Hub Heading `h1` |
| **Blog Listing** (`/blogs`) | Desktop | 292 | 292 | 0.001 | 5.1 | 42.9 KB | 178.0 KB | 190.7 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 360 | 360 | 0.000 | 4.8 | 42.9 KB | 178.0 KB | 190.7 KB | 29.2 KB | Blog Header `h1` |
| **Blog Article** (`/blogs/how-to-prepare-for-nielit...`) | Desktop | **2,264** | 2,264 | 0.017 | 4.3 | 19.4 KB | 94.6 KB | 228.8 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 312 | 312 | 0.000 | 4.1 | 19.4 KB | 94.6 KB | 228.8 KB | 29.2 KB | Article Title `h1` |
| **Tutorial Page** (`/tutorials/html5-complete...`) | Desktop | 248 | 248 | 0.001 | 4.3 | 14.9 KB | 78.5 KB | 190.2 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 616 | 616 | 0.000 | 4.0 | 14.9 KB | 78.5 KB | 190.2 KB | 29.2 KB | Tutorial Header `h1` |
| **Contact** (`/contact`) | Desktop | 772 | 772 | 0.002 | 5.8 | 16.1 KB | 82.8 KB | 196.1 KB | 29.2 KB | `img: /logo.jpg` |
| | Mobile | 296 | 296 | 0.000 | 4.5 | 16.1 KB | 82.8 KB | 196.1 KB | 29.2 KB | Contact Heading `h1` |

---

## 3. Root Cause Analysis of Detected Bottlenecks

### Bottleneck 1: CLS on `/live-batches` (0.405) & `/study-material` (0.242)
* **Root Cause:** In both pages, the dynamic client component (`LiveBatchesClient`, `StudyMaterialClient`) is wrapped inside `<Suspense fallback={<div className="p-12 text-center text-text-muted">Loading...</div>}>`.
* **Mechanics:** The server streams the initial 100px placeholder fallback. When React hydrates the component in the browser, the massive content (4 batch cards + sticky enrollment form, or 20+ study material cards) mounts abruptly, pushing the footer down by over 800px.
* **Resolution:** Move search-param reading out of the root suspense wrapper into an isolated listener or pass server `searchParams` from the server component page directly as props. Render full static cards during SSR and hydration.

### Bottleneck 2: Course Catalog HTML Weight (994 KB uncompressed)
* **Root Cause:** `src/app/courses/page.tsx` passes the raw 66 `Course` objects directly into `CourseCatalogClient`. Each course contains full arrays for `chapters`, `topics`, `learningOutcomes`, `faqs`, `prerequisites`, and `toolsCovered`.
* **Mechanics:** Next.js serializes this massive JSON tree into the HTML document for hydration.
* **Resolution:** Create a sanitized `CourseCardItem` projector in `src/app/courses/page.tsx` that delivers only the 10 fields required for catalog card rendering and client-side filtering (`id`, `slug`, `title`, `shortDescription`, `featuredImageUrl`, `level`, `mode`, `duration`, `categories`, `price`).

### Bottleneck 3: `api.ts` Registry Bundling in Client Components
* **Root Cause:** `src/services/api.ts` contained top-level static imports for 9 JSON databases totaling over 1.2 MB.
* **Mechanics:** When client components like `src/components/CertificateVerifier.tsx` and `src/app/admin/page.tsx` import helper functions from `api.ts`, Webpack includes the entire static JSON registry into the client bundle chunk `static/chunks/8515-88237a44d1a65930.js` (745.3 KB raw).
* **Resolution:** Make JSON loading in `getLocalData` conditional on the server runtime via dynamic `await import(...)` and route client-side queries through lightweight API endpoints or direct relative `/data/` fetches.

### Bottleneck 4: 784 KB Uncompressed Instructor Avatar
* **Root Cause:** `public/assets/img/instructors/sumit-kumar.png` is an 800x800 uncompressed 24-bit PNG file (784.0 KB).
* **Mechanics:** Used as the `author.avatar` in all 13 blog articles and rendered inside a 44x44 circular avatar thumbnail. On desktop connections, this single asset delays the blog post LCP and consumes unnecessary cellular data.
* **Resolution:** Convert and optimize `sumit-kumar.png` to high-performance WebP using `sharp` (~18 KB at 400x400) and update markdown/data references.

### Bottleneck 5: Heavy Third-Party Google Maps Iframe on `/contact`
* **Root Cause:** `src/components/ContactClient.tsx` unconditionally embeds an `<iframe>` loading Google Maps.
* **Mechanics:** Even with `loading="lazy"`, the iframe initiates dozens of network requests and transfers over 1 MB of Google script and map tile assets on page scroll.
* **Resolution:** Implement a lightweight interactive preview card ("Click to explore interactive map") with direct links to Google Maps navigation, deferring the iframe until deliberate user interaction.
