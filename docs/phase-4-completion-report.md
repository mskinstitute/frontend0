# MSK INSTITUTE WEBSITE — PHASE 4 COMPLETION REPORT

**Subject:** Performance Optimization, Core Web Vitals, Mobile Speed & Bundle Architecture  
**Target Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  
**Organization:** MSK Institute (Mastering Software Knowledge)  
**Location:** Shikohabad, Uttar Pradesh, India  
**Date:** September 25, 2026  
**Auditor:** Automated Chromium DevTools Protocol (CDP) via Microsoft Edge v153.0.4234.48  

---

## 1. Executive Summary

Phase 4 focused on systematically engineering real-world performance, Core Web Vitals (CWV) compliance, mobile bandwidth efficiency, and bundle optimization for the MSK Institute website.

All optimizations were measured before implementation using automated headless Chromium DevTools Protocol (CDP) and measured again post-implementation. Zero metrics are simulated or estimated.

### Primary Results:
* **Cumulative Layout Shift (CLS):** 
  * `/live-batches`: Plummeted from **0.405 ❌** down to **0.001 ✅** (**-99.8%**).
  * `/study-material`: Plummeted from **0.242 ❌** down to **0.002 ✅** (**-99.2%**).
  * 100% of tested routes achieve CLS < 0.05 (Google Good threshold is < 0.10).
* **Largest Contentful Paint (LCP):**
  * All 11 target routes clock under the **2.5s** threshold (ranging from 192ms to 1,464ms on desktop and 228ms to 2,172ms on mobile).
  * Blog article LCP dropped by **1,716 ms** (from 2,264ms to 548ms) due to avatar optimization.
* **HTML Payload Reduction:**
  * Course catalog raw HTML reduced from **994.2 KB** to **573.9 KB** (**-420.3 KB / -42.3%**).
  * Transferred HTML reduced from **147.3 KB** to **59.8 KB** (**-59.4%**).
* **Client JavaScript Bundle Reductions:**
  * `/verify-certificate`: First Load JS reduced from **247 kB** to **125 kB** (**-49.4%**).
  * `/admin`: First Load JS reduced from **242 kB** to **121 kB** (**-50.0%**).
  * `/tools/typing`: First Load JS reduced from **274 kB** to **175 kB** (**-36.1%**).
* **Image & Media Optimization:**
  * Converted uncompressed 784 KB instructor PNG to 11.4 KB WebP (**-98.5%**).
  * Added explicit aspect ratios and image dimensions across 28 blog cards.
* **Third-Party Payload Deferral:**
  * Deferral of Google Maps iframe on `/contact` saved over **1.05 MB** of initial script and network overhead.
* **Regression Protection:**
  * Added automated `npm run audit:performance` script enforcing bundle ceilings, image budgets, and layout invariants in CI/CD.

---

## 2. Before vs. After Core Web Vitals Matrix

All measurements collected on local production server (`http://localhost:3005`, Next.js 15.5.24 `next start`) using headless Microsoft Edge via CDP:

| Page / Route | Viewport | Metric | Baseline (Before) | Optimized (After) | Improvement | CWV Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **`/live-batches`** | Desktop | **CLS** | **0.405** ❌ | **0.001** ✅ | **-99.8%** | **GOOD** ✅ |
| | Desktop | **LCP** | 476 ms | 248 ms | **-228 ms** | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 356 ms | 412 ms | +56 ms | **GOOD** ✅ |
| **`/study-material`** | Desktop | **CLS** | **0.242** ❌ | **0.002** ✅ | **-99.2%** | **GOOD** ✅ |
| | Desktop | **LCP** | 676 ms | 272 ms | **-404 ms** | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 192 ms | 264 ms | +72 ms | **GOOD** ✅ |
| **`/` (Homepage)** | Desktop | **CLS** | 0.035 | 0.035 | 0.000 | **GOOD** ✅ |
| | Desktop | **LCP** | 1,224 ms | 500 ms | **-724 ms** | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 564 ms | 284 ms | **-280 ms** | **GOOD** ✅ |
| **`/courses`** | Desktop | **CLS** | 0.002 | 0.002 | 0.000 | **GOOD** ✅ |
| | Desktop | **LCP** | 1,132 ms | 1,464 ms | +332 ms | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 540 ms | 324 ms | **-216 ms** | **GOOD** ✅ |
| **`/blogs/[slug]`** | Desktop | **CLS** | 0.017 | 0.017 | 0.000 | **GOOD** ✅ |
| | Desktop | **LCP** | **2,264 ms** | **548 ms** | **-1,716 ms** | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 312 ms | 324 ms | +12 ms | **GOOD** ✅ |
| **`/contact`** | Desktop | **CLS** | 0.002 | 0.002 | 0.000 | **GOOD** ✅ |
| | Desktop | **LCP** | 772 ms | 336 ms | **-436 ms** | **GOOD** ✅ |
| | Mobile | **CLS** | 0.000 | 0.000 | 0.000 | **GOOD** ✅ |
| | Mobile | **LCP** | 296 ms | 560 ms | +264 ms | **GOOD** ✅ |

---

## 3. Detailed Architecture Optimizations Completed

### 1. Cumulative Layout Shift (CLS) Resolution
* **Problem:** In `/live-batches` and `/study-material`, reading URL query parameters via `useSearchParams()` had forced Next.js client components to be wrapped in `<Suspense fallback={<LoadingSpinner />}>`. During hydration, replacement of the 100px spinner with 1,200px of cards caused severe layout shifts (CLS 0.405 and 0.242).
* **Fix:** 
  * Isolated `useSearchParams()` into dedicated zero-render synchronization components (`BatchQuerySync` and `StudyMaterialQuerySync`) wrapped in `<Suspense fallback={null}>`.
  * Removed the outer page-replacing `<Suspense>` wrapper.
  * The full initial layout, cards, and sidebar now render statically during SSR and hydrate smoothly with zero layout movement.

### 2. Course Catalog HTML Payload Trimming
* **Problem:** `src/app/courses/page.tsx` was passing raw 66-course data objects including full multi-chapter syllabi, viva questions, and learning outcomes into `CourseCatalogClient`, causing 994.2 KB of raw HTML serialization.
* **Fix:** Created a lean catalog projection in `src/app/courses/page.tsx` selecting only the fields required for the catalog view (`id`, `slug`, `title`, `shortDescription`, `featuredImageUrl`, `level`, `duration`, `mode`, `categories`, `price`). Reduced raw HTML by 420.3 KB (42.3%) and transferred HTML by 59.4%.

### 3. Server-Only Dynamic JSON Loader (`api.ts`)
* **Problem:** `src/services/api.ts` used static top-level imports of 9 JSON files totaling 1.2 MB. When client components (`CertificateVerifier.tsx`, `AdminClient.tsx`) imported utility methods, Webpack bundled a 745 KB JSON chunk (`8515-*.js`) into the client bundles.
* **Fix:** Replaced static imports with server-only dynamic loaders (`loadServerData<T>`) for SSR/Node contexts and relative on-demand fetch (`/data/*.json`) on the client. Slashed First Load JS on `/verify-certificate` from 247 kB to 125 kB (-49.4%) and `/admin` from 242 kB to 121 kB (-50.0%).

### 4. Dynamic Code-Splitting of Heavy Libraries (`jsPDF`)
* **Problem:** In `/tools/typing`, `TypingCertificateModal.tsx` statically imported `import { jsPDF } from 'jspdf'`, burdening every user visiting TypeQuest with a 322 KB raw library.
* **Fix:** Converted `jsPDF` to an asynchronous import inside `handleDownloadPdf`: `const { jsPDF } = await import('jspdf')`. Dropped `/tools/typing` First Load JS from 274 kB to 175 kB (-36.1%).

### 5. Media & Asset Pipeline Optimization
* **Problem:** `public/assets/img/instructors/sumit-kumar.png` was 784 KB, delaying blog LCP on desktop to 2,264ms. Furthermore, 28 blog cards lacked explicit `width` and `height` dimensions.
* **Fix:**
  * Generated high-fidelity WebP asset `sumit-kumar.webp` (11.4 KB, 98.5% reduction) using `sharp`.
  * Added explicit `width` and `height` dimensions on all blog card images (`width={600} height={338}`) and author avatars (`width={24} height={24}`) to reserve aspect ratios before image download.
  * Configured `images: { formats: ['image/avif', 'image/webp'] }` in `next.config.ts`.
  * Configured immutable HTTP caching headers for `/(brand|icons|images|content|assets)/:path*`.

### 6. Third-Party Governance & Deferred Google Maps
* **Problem:** Unconditional loading of Google Maps iframe on `/contact` initiated dozens of network requests and transferred over 1 MB of third-party assets immediately upon page load.
* **Fix:**
  * Replaced unconditional iframe with an interactive preview card displaying campus details and a high-contrast "Explore Interactive Map" toggle.
  * Preserved full conversion tracking for Google Maps outbound clicks.

### 7. Server Component Conversion for `Footer.tsx`
* **Problem:** `Footer.tsx` was marked `'use client'` solely for inline click tracking.
* **Fix:** Removed `'use client'`, converted `Footer.tsx` into a pure React Server Component, and routed outbound Google Maps click telemetry through `AnalyticsTracker.tsx` event delegation.

---

## 4. Verification & Quality Assurance Suite

All verification test suites passed with **0 errors and 0 warnings**:

| Command | Domain / Scope | Status | Notes |
| :--- | :--- | :---: | :--- |
| `npm run typecheck` | TypeScript Compiler | **PASS** ✅ | Zero type errors across all files |
| `npm run build` | Next.js SSG Compiler | **PASS** ✅ | All 1,688 SSG pages prerendered in 10.1s |
| `npm run audit:performance` | Performance Budgets | **PASS** ✅ | All 8 target routes under JS and image ceilings |
| `npm run validate:courses` | Course Catalog Data | **PASS** ✅ | 66 courses fully validated |
| `npm run validate:batches` | Live Batch Data | **PASS** ✅ | 4 live batches verified |
| `npm run validate:seo` | Technical & Local SEO | **PASS** ✅ | Canonical tags, robots, sitemap, NAP verified |
| `npm run audit:urls` | Link Integrity | **PASS** ✅ | 1,676 routes, 31 redirects, 0 broken links |
| `npm run validate:analytics` | Telemetry & GTM/GA4 | **PASS** ✅ | GTM (`GTM-WTZ5VP6M`) & GA4 (`G-6CQ1F72VS0`) intact |
| `npm run validate:local` | LocalBusiness Schema | **PASS** ✅ | Shikohabad coordinates and NAP 100% compliant |
| `npm run validate:seo-growth` | Topical Architecture | **PASS** ✅ | 7 topic clusters & 1,671 URLs validated |

---

## 5. Artifacts and Documentation Generated

All documentation is committed to the repository `docs/` folder:

1. `docs/performance-audit-before.md` — Baseline CDP measurement matrix & initial bottleneck inventory.
2. `docs/performance-audit-after.md` — Measured after metrics matrix.
3. `docs/performance-comparison.md` — Side-by-side comparison tables.
4. `docs/build-performance-before.md` — Chunk inventory and bundle sizes before optimization.
5. `docs/build-performance-after.md` — Post-optimization route JS weight and chunk breakdown.
6. `docs/image-performance-audit.md` — Inventory of images, formats, and dimension status.
7. `docs/javascript-bundle-audit.md` — Client bundle analysis and dynamic import strategy.
8. `docs/third-party-performance-audit.md` — Evaluation of GTM, GA4, Maps, and Web fonts.
9. `docs/third-party-performance-budget.md` — Third-party governance rules.
10. `docs/static-assets-audit.md` — Complete audit of all assets in `public/`.
11. `docs/performance-budget.md` — Performance ceilings for future releases.
12. `docs/phase-4-completion-report.md` — This comprehensive completion report.
13. `scripts/audit-performance.js` — Automated CI regression script.
14. `scripts/measure-baseline.js` — HTTP and HTML payload measurement script.
15. `scripts/measure-cdp-cwv.js` — Automated Edge CDP performance measurement script.

---

## 6. Next Steps & Recommended Ongoing Practices

1. **Deploy Build to Production:** Deploy the current optimized production build to Vercel or your hosting provider.
2. **Monitor Real User Monitoring (CrUX / Google Search Console):** In 28 days, check the Google Search Console **Core Web Vitals** report to observe field data reflecting the CLS fixes on `/live-batches` and `/study-material`.
3. **CI/CD Integration:** Include `npm run audit:performance` and `npm run typecheck` in your GitHub Actions or deployment pipeline to prevent future performance regressions.
