# MSK Institute — Performance & Core Web Vitals Audit (After Optimization)

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  
**Environment:** Next.js 15.5.24 Production Server (`next start`) on Localhost Port 3005  
**Auditor Engine:** Chromium DevTools Protocol (CDP) via Microsoft Edge v153.0.4234.48  
**Tested Devices:**
- **Desktop:** Viewport 1280x800, 1.0x DPR
- **Mobile:** Simulated Android Mobile (Viewport 375x667, 2.0x DPR, Mobile Chrome User Agent)

---

## 1. Executive Summary of Improvements

All performance targets set for Phase 4 have been achieved and verified through automated Chromium DevTools Protocol measurement:

1. **Complete Resolution of Critical Layout Shifts (CLS):**
   * `/live-batches`: CLS plummeted from **0.405** down to **0.001** (Desktop) and **0.000** (Mobile) — a **99.8% reduction**, permanently passing Google's CWV threshold (< 0.1).
   * `/study-material`: CLS plummeted from **0.242** down to **0.002** (Desktop) and **0.000** (Mobile) — a **99.2% reduction**, passing Google's CWV threshold.

2. **Course Catalog HTML Bloat Eradication:**
   * Raw uncompressed HTML on `/courses` reduced from **994.2 KB** down to **573.9 KB** (**-420.3 KB / -42.3%**).
   * Transferred HTML reduced from **147.3 KB** down to **59.8 KB** (**-59.4%**).

3. **Massive Client JavaScript Reductions:**
   * `/verify-certificate`: First Load JS reduced from **247 kB** to **125 kB** (**-49.4%** / eliminated 745 KB JSON leak).
   * `/admin`: First Load JS reduced from **242 kB** to **121 kB** (**-50.0%**).
   * `/tools/typing`: First Load JS reduced from **274 kB** to **175 kB** (**-36.1%** / dynamically imported `jsPDF`).

4. **Image & Avatar Weight Reduction:**
   * Replaced 784 KB `sumit-kumar.png` with a modern WebP asset `sumit-kumar.webp` (11.4 KB, **98.5% smaller**), curing blog article LCP delays.
   * Fixed 28 missing image dimensions in `BlogsClient.tsx` and explicit width/height in `BlogArticleClient.tsx` preventing layout shifts.

5. **Third-Party Iframe Optimization:**
   * Replaced unconditional 1MB+ Google Maps iframe with interactive deferred click-to-load card with native Google Maps navigation links.

---

## 2. Page-by-Page Measurement Matrix (After Optimization)

Measurements recorded via automated Edge Chromium DevTools Protocol:

| Page / Route | Device | LCP (ms) | FCP (ms) | CLS | TTFB (ms) | Transferred HTML | Uncompressed HTML | Total JS (Gzip) | Total CSS (Gzip) | CWV Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage** (`/`) | Desktop | 500 | 500 | **0.035** | 144.4 | 32.1 KB | 203.1 KB | 186.2 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 284 | 284 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Courses Listing** (`/courses`) | Desktop | 1,464 | 1,384 | **0.002** | 23.5 | 59.8 KB | **573.9 KB** | 196.2 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 324 | 240 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Python Course** (`/courses/python-mastery...`) | Desktop | 356 | 356 | **0.001** | 68.6 | 36.1 KB | 235.8 KB | 186.2 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 628 | 628 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Data Analytics Course** (`/courses/data-analysis...`) | Desktop | 584 | 584 | **0.036** | 18.9 | 54.3 KB | 321.0 KB | 186.2 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 228 | 228 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Full Stack Course** (`/courses/full-stack-web-dev...`) | Desktop | 332 | 332 | **0.001** | 15.6 | 32.3 KB | 195.1 KB | 186.2 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 248 | 248 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Live Batches** (`/live-batches`) | Desktop | 248 | 248 | **0.001** | 579.8 | 18.1 KB | 99.3 KB | 193.8 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 412 | 412 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Study Material** (`/study-material`) | Desktop | 272 | 272 | **0.002** | 24.8 | 99.4 KB | 550.9 KB | 198.4 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 264 | 264 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Blog Listing** (`/blogs`) | Desktop | 272 | 272 | **0.001** | 87.0 | 44.2 KB | 189.7 KB | 189.4 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 2,172 | 2,172 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Blog Article** (`/blogs/how-to-prepare-for-nielit...`) | Desktop | 548 | 548 | **0.017** | 17.4 | 20.8 KB | 105.6 KB | 227.5 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 324 | 324 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Tutorial Page** (`/tutorials/html5-complete...`) | Desktop | 192 | 192 | **0.001** | 17.5 | 16.3 KB | 89.4 KB | 188.9 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 1,808 | 1,808 | **0.000** | — | — | — | — | — | **GOOD** ✅ |
| **Contact** (`/contact`) | Desktop | 336 | 336 | **0.002** | 19.6 | 17.4 KB | 94.7 KB | 194.9 KB | 29.2 KB | **GOOD** ✅ |
| | Mobile | 560 | 560 | **0.000** | — | — | — | — | — | **GOOD** ✅ |

---

## 3. Key Accomplishments

* **Zero Regressions:** 100% of the 1,688 SSG pages compile and validate without errors.
* **All CWV Targets Met:** Every page achieves CLS < 0.05 (well below 0.1 threshold) and LCP < 2.5s.
* **Attribution & Analytics Intact:** Google Tag Manager (`GTM-WTZ5VP6M`), Google Analytics 4 (`G-6CQ1F72VS0`), WhatsApp CTAs, phone calls, and lead generation trackers remain fully operational.
