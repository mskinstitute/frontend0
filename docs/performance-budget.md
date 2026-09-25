# MSK Institute — Performance Budget Specification

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  

---

## 1. Core Web Vitals Targets

| Metric | Budget Ceiling | Target Goal | Baseline Observed | Status |
| :--- | :---: | :---: | :---: | :---: |
| **LCP (Largest Contentful Paint)** | ≤ 2.5 s | < 1.5 s | 248ms – 2,264ms | PASS |
| **INP (Interaction to Next Paint)** | < 200 ms | < 100 ms | ~45ms | PASS |
| **CLS (Cumulative Layout Shift)** | < 0.10 | < 0.05 | **0.405** (Batches), **0.242** (Study) ⚠️ | **REQUIRES FIX** |
| **FCP (First Contentful Paint)** | < 1.8 s | < 1.0 s | 192ms – 1,444ms | PASS |
| **TTFB (Time to First Byte)** | < 600 ms | < 100 ms | 3.7ms – 55.6ms (SSG) | PASS |

---

## 2. Resource Weight Budgets by Page Type

| Page Type | Max HTML (Gzip) | Max Initial JS (Gzip) | Max CSS (Gzip) | Max Initial Images (Gzip) | Max Initial Requests |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Homepage** (`/`) | ≤ 35 KB | ≤ 180 KB | ≤ 30 KB | ≤ 100 KB | ≤ 25 |
| **Course Catalog** (`/courses`) | **≤ 40 KB** (prev 147 KB) | ≤ 190 KB | ≤ 30 KB | ≤ 150 KB | ≤ 35 |
| **Course Detail** (`/courses/[slug]`)| ≤ 40 KB | ≤ 185 KB | ≤ 30 KB | ≤ 120 KB | ≤ 25 |
| **Live Batches** (`/live-batches`)| ≤ 25 KB | ≤ 185 KB | ≤ 30 KB | ≤ 50 KB | ≤ 20 |
| **Study Material** (`/study-material`)| ≤ 45 KB | ≤ 190 KB | ≤ 30 KB | ≤ 60 KB | ≤ 25 |
| **Blog Article** (`/blogs/[slug]`)| ≤ 25 KB | ≤ 200 KB | ≤ 30 KB | **≤ 60 KB** (prev 850 KB) | ≤ 20 |
| **Tutorial Lesson** (`/tutorials/...`)| ≤ 30 KB | ≤ 190 KB | ≤ 30 KB | ≤ 80 KB | ≤ 25 |
| **Certificate Verification** | ≤ 20 KB | **≤ 160 KB** (prev 365 KB) | ≤ 30 KB | ≤ 30 KB | ≤ 18 |
| **Typing Tool** (`/tools/typing`)| ≤ 30 KB | **≤ 180 KB** (prev 367 KB) | ≤ 30 KB | ≤ 50 KB | ≤ 22 |
| **Playground** (`/playground`)| ≤ 35 KB | ≤ 325 KB | ≤ 35 KB | ≤ 40 KB | ≤ 30 |

---

## 3. Enforcement & Verification Policy
* Run `npm run audit:performance` before every major release.
* Automated CI check verifies that `next build` produces zero pages exceeding the 200 KB First Load JS budget (excluding isolated sandbox tools like `/playground`).
* No uncompressed PNG images larger than 100 KB may be committed to `public/`.
* Every `<img>` tag must include explicit `width` and `height` dimensions or aspect-ratio reservation to ensure CLS < 0.05.
