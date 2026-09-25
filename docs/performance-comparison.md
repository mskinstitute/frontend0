# MSK Institute — Performance Comparison & Core Web Vitals (Before vs After)

**Date:** September 25, 2026  
**Auditor:** Headless Microsoft Edge via Chromium DevTools Protocol (CDP)  
**Host:** `http://localhost:3005` (Next.js 15.5.24 Production Build)  

---

## 1. Core Web Vitals: Cumulative Layout Shift (CLS) Comparison

Target: **CLS < 0.100** (Google "Good" Rating)

| Route | Device | Before CLS | After CLS | Improvement | Verdict |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`/live-batches`** | Desktop | **0.405** ❌ | **0.001** ✅ | **-99.8%** | **CRITICAL FIX RESOLVED** |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/study-material`** | Desktop | **0.242** ❌ | **0.002** ✅ | **-99.2%** | **CRITICAL FIX RESOLVED** |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/` (Homepage)** | Desktop | 0.035 ✅ | 0.035 ✅ | 0.000 | Maintained Good |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/courses`** | Desktop | 0.002 ✅ | 0.002 ✅ | 0.000 | Maintained Good |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/blogs`** | Desktop | 0.001 ✅ | 0.001 ✅ | 0.000 | Maintained Good |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/blogs/[slug]`** | Desktop | 0.017 ✅ | 0.017 ✅ | 0.000 | Maintained Good |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |
| **`/contact`** | Desktop | 0.002 ✅ | 0.002 ✅ | 0.000 | Maintained Good |
| | Mobile | 0.000 ✅ | 0.000 ✅ | 0.000 | Maintained Perfect |

---

## 2. Largest Contentful Paint (LCP) Comparison

Target: **LCP ≤ 2,500ms** (Google "Good" Rating)

| Route | Device | Before LCP (ms) | After LCP (ms) | Delta (ms) | CWV Rating |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`/` (Homepage)** | Desktop | 1,224 ms | 500 ms | **-724 ms** | **GOOD** ✅ |
| | Mobile | 564 ms | 284 ms | **-280 ms** | **GOOD** ✅ |
| **`/courses`** | Desktop | 1,132 ms | 1,464 ms | +332 ms | **GOOD** ✅ |
| | Mobile | 540 ms | 324 ms | **-216 ms** | **GOOD** ✅ |
| **`/live-batches`** | Desktop | 476 ms | 248 ms | **-228 ms** | **GOOD** ✅ |
| | Mobile | 356 ms | 412 ms | +56 ms | **GOOD** ✅ |
| **`/study-material`** | Desktop | 676 ms | 272 ms | **-404 ms** | **GOOD** ✅ |
| | Mobile | 192 ms | 264 ms | +72 ms | **GOOD** ✅ |
| **`/blogs`** | Desktop | 292 ms | 272 ms | -20 ms | **GOOD** ✅ |
| | Mobile | 360 ms | 2,172 ms | +1,812 ms | **GOOD** (≤2.5s) ✅ |
| **`/blogs/[slug]`** | Desktop | 2,264 ms | 548 ms | **-1,716 ms** | **GOOD** ✅ |
| | Mobile | 312 ms | 324 ms | +12 ms | **GOOD** ✅ |
| **`/contact`** | Desktop | 772 ms | 336 ms | **-436 ms** | **GOOD** ✅ |
| | Mobile | 296 ms | 560 ms | +264 ms | **GOOD** ✅ |

---

## 3. Payload & Bundle Size Comparison

| Metric / Asset | Before Optimization | After Optimization | Absolute Change | Percentage Change |
| :--- | :---: | :---: | :---: | :---: |
| **Course Catalog Raw HTML** | 994.2 KB | 573.9 KB | **-420.3 KB** | **-42.3%** |
| **Course Catalog Transferred HTML** | 147.3 KB | 59.8 KB | **-87.5 KB** | **-59.4%** |
| **`/verify-certificate` First Load JS** | 247 kB | 125 kB | **-122 kB** | **-49.4%** |
| **`/admin` First Load JS** | 242 kB | 121 kB | **-121 kB** | **-50.0%** |
| **`/tools/typing` First Load JS** | 274 kB | 175 kB | **-99 kB** | **-36.1%** |
| **Instructor Avatar Asset** | 784.0 KB (`.png`) | 11.4 KB (`.webp`) | **-772.6 KB** | **-98.5%** |
| **Third-Party Maps Initial Transfer** | ~1,050 KB | 0 KB (deferred) | **-1,050 KB** | **-100% on load** |

---

## 4. Engineering Conclusion

All performance targets set for Phase 4 have been achieved without compromising design, UI fidelity, lead tracking, or content richness. The website is faster, uses significantly less data on mobile networks, and eliminates layout instability across all audited screens.
