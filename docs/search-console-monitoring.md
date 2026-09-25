# Search Console Technical SEO Monitoring Protocol

**Target Property:** `https://www.mskinstitute.in/`  
**Brand:** MSK Institute Shikohabad  
**Update Frequency:** Weekly & Monthly  

---

## 1. Monitoring Cadence & Responsibilities

| Frequency | Checkpoint | Focus Areas | Action Threshold |
| :--- | :--- | :--- | :--- |
| **Weekly** | **Page Indexing Report** | New exclusions, 5xx server errors, sudden 404 spikes. | Any unexpected index drop > 5% or spike in 5xx errors. |
| **Weekly** | **Performance (Queries)** | Impression drops on priority keywords, CTR anomalies. | Sudden rank drop on "computer center shikohabad" or "python course". |
| **Bi-Weekly** | **Core Web Vitals** | LCP, INP, CLS status on Mobile & Desktop. | Any URL moving into "Poor" or "Needs Improvement". |
| **Monthly** | **Rich Results Status** | Course schema, LocalBusiness schema, FAQPage schema. | Any critical error that invalidates rich snippets. |
| **Monthly** | **Redirect Health** | Verified 301 redirect paths, canonical consistency. | Any 301 redirect chain or loop. |
| **Quarterly** | **Security & Manual Actions**| Security alerts, hacked content, manual spam actions. | Immediate escalations. |

---

## 2. Page Indexing Status Classification & Remediation

Search Console classifies all discovered URLs into specific indexing states. Below are the protocols for MSK Institute:

### A. "Crawled — currently not indexed"
- **Cause:** Google crawled the URL but evaluated it as insufficient in content depth or thin compared to established pages.
- **MSK Audit Strategy:**
  - Check whether the URL is a thin tutorial stub or empty category.
  - Review internal linking from high-authority pages (`/courses`, `/study-material`).
  - Add comprehensive practical code snippets, FAQs, and syllabus breakdowns.
- **Expected Volume:** < 2% of total tutorial inventory.

### B. "Discovered — currently not indexed"
- **Cause:** Google has placed the URL in its crawl queue but has not crawled it yet due to crawl budget pacing.
- **MSK Audit Strategy:**
  - Verify the URL is included in `sitemap.xml`.
  - Strengthen internal linking from homepage or course hubs.
  - No code fix needed if recent (< 30 days after initial sitemap submission).

### C. "Page with redirect"
- **Expected URLs:** The 31 intentional 301 redirects configured in `next.config.ts` (e.g. `/notes` → `/study-material`, `/contact-us` → `/contact`, `/career` → `/careers`).
- **Audit Verification:** Verify that sitemap (`sitemap.xml`) contains **zero** of these redirected URLs. Confirm all internal links on the website point directly to the destination canonical.

### D. "Duplicate without user-selected canonical"
- **Cause:** URL variants with parameters (`?search=`, `?page=`) discovered without an explicit canonical tag.
- **MSK Standard:** All pages in `src/app` declare `alternates.canonical: 'https://www.mskinstitute.in/...'`.
- **Validation:** Run `npm run validate:seo` to guarantee canonical tag generation across all routes.

### E. "Not found (404)"
- **Action:** Any 404 originating from an external backlink or legacy route should be mapped to the closest relevant canonical page via 301 in `next.config.ts`. Run `npm run audit:urls` to ensure zero internal 404 links exist.

---

## 3. Core Web Vitals (CWV) Field Monitoring

MSK Institute targets **100% "Good"** ratings across Mobile and Desktop in Search Console CWV reports:

| Metric | Target | Optimization Strategy |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **< 2.5s** | Static Site Generation (SSG), Next.js font optimization (`Plus_Jakarta_Sans` with `display: swap`), priority hero image preloading, WebP/AVIF images. |
| **Interaction to Next Paint (INP)** | **< 200ms** | Debounced search inputs (600ms), zero heavy main-thread blocking scripts, lightweight lucide icons, asynchronous analytics dispatch. |
| **Cumulative Layout Shift (CLS)** | **< 0.1** | Explicit image aspect ratios (`width` & `height`), reserved layout containers, stable top navigation bar. |

---

## 4. Rich Results & Structured Data Health

Search Console validates structured data against Google's rich result requirements:

| Rich Result Type | Target Routes | Mandatory Properties |
| :--- | :--- | :--- |
| **Course** | `/courses/[slug]` | `name`, `description`, `provider`, `offers`, `courseCode`, `hasCourseInstance` |
| **LocalBusiness / EducationalOrganization** | `/`, `/contact` | `name`, `address` (with postalCode 283135), `telephone`, `geo`, `openingHoursSpecification` |
| **FAQPage** | `/`, `/courses`, `/contact` | `mainEntity` with `Question` and `AcceptedAnswer` |
| **BreadcrumbList** | `/courses/[slug]`, `/study-material/...` | `itemListElement` with ordered position and item URL |

**Prohibited Schema Practice:** Fabricated `AggregateRating` without verifiable third-party review collection is strictly forbidden to prevent manual action penalties.

---

## 5. High-Priority Keyword Rank Tracking

Track weekly impressions, clicks, and average position in GSC for core commercial and local search intents:

```text
1. "computer center in shikohabad"
2. "coding classes shikohabad"
3. "python coaching near me"
4. "web development course shikohabad"
5. "ccc computer course shikohabad"
6. "adca course in shikohabad"
7. "best computer institute near firozabad"
8. "msk institute shikohabad"
9. "er sumit kumar msk"
10. "certificate verification msk institute"
```
