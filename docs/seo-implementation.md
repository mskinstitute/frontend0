# MSK Institute Website — Technical & Local SEO Implementation Guide

**Canonical Site URL:** https://www.mskinstitute.in/  
**Campus Location:** Shikohabad, Uttar Pradesh, India  
**Auditor Script:** `scripts/validate-seo.js` (`npm run validate:seo`)  
**Status:** 100% Compliant

---

## 1. Domain Canonicalization & URL Hygiene
- **Uniform Domain:** All canonical tags, OpenGraph URLs, Twitter metadata, JSON-LD Schema IDs, sitemap URLs, and share buttons have been unified to `https://www.mskinstitute.in`.
- **Elimination of Apex/WWW Conflict:** Previously, 171 instances pointed to `https://mskinstitute.in` without `www.`, creating canonical divergence in Google Search Console. Every instance is now aligned.
- **Permanent 301 Redirects:** Configured in `next.config.ts` for all legacy course URLs and duplicate routes (`/contact-us` -> `/contact`, `/career` -> `/careers`, `/notes` -> `/study-material`).

---

## 2. Dynamic XML Sitemap Architecture (`src/app/sitemap.ts`)
- **Zero 301 Redirects in Sitemap:** The legacy `/notes` redirect was completely removed from the static sitemap route list. Sitemaps only contain 200 OK canonical destinations.
- **Deep Indexation of 1,400+ Tutorial Lessons:** Added dynamic scanning of all markdown tutorial topic files under `public/content/tutorials/`. Google and AI search engines can now index and rank every individual lesson (e.g., `/tutorials/python-for-beginners/vscode-setup`, `/tutorials/html5-complete-course/semantic-layout-elements`).
- **Priority & ChangeFrequency Hierarchy:**
  - Home (`/`): `1.0`, `daily`
  - Catalog hubs (`/courses`, `/live-batches`): `0.9`, `daily`
  - Course pages (`/courses/[slug]`): `0.85`, `weekly`
  - Live batch pages (`/live-batches/[id]`): `0.8`, `weekly`
  - Tutorial hubs (`/tutorials/[slug]`): `0.8`, `weekly`
  - Blog articles (`/blogs/[slug]`): `0.75`, `weekly`
  - Individual lessons (`/tutorials/[slug]/[topicSlug]`): `0.7`, `monthly`

---

## 3. Crawler Control (`src/app/robots.ts`)
- **Single Canonical Sitemap:** Unified robots.txt sitemap directive to:
  `sitemap: 'https://www.mskinstitute.in/sitemap.xml'`
- **Protected Paths:** Disallows `/admin`, `/api`, and private certificate query parameters `/verify-certificate?id=*`.
- **Optimized for AI Agents:** Grants structured access to PerplexityBot, GPTBot, ClaudeBot, Applebot, and search crawlers for courses, tutorials, blogs, study materials, and `llms.txt`.

---

## 4. Local SEO & NAP Schema Consistency

### 4.1 Root Organization & LocalBusiness Graph (`src/app/layout.tsx` & `src/app/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "MSK Institute",
  "alternateName": "MSK Computer Training & Coding Academy",
  "url": "https://www.mskinstitute.in",
  "logo": "https://www.mskinstitute.in/logo.jpg",
  "image": "https://www.mskinstitute.in/logo.jpg",
  "telephone": "+918393042166",
  "email": "mskshikohabad@gmail.com",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gali No. 3, Near Gyan Jyoti Public School",
    "addressLocality": "Shikohabad",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "283135",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.1157743,
    "longitude": 78.5829716
  },
  "founder": {
    "@type": "Person",
    "name": "Er. Sumit Kumar",
    "jobTitle": "Founder & Lead Technical Trainer"
  },
  "areaServed": ["Shikohabad", "Firozabad", "Sirsaganj", "Jasrana", "Uttar Pradesh"]
}
```

### 4.2 Rich Results Schemas Implemented
1. **Course Schema:** Rendered on all 66 course pages with syllabus sections, provider information, and free demo offer availability.
2. **FAQPage Schema:** Embedded on homepage and course pages for Google Search expandable accordion rich snippets.
3. **BreadcrumbList Schema:** Configured on course pages and tutorial pages for hierarchical SERP breadcrumbs.
4. **SpeakableSpecification:** Configured for Google Assistant and voice search crawlers.

---

## 5. Verification Command
To verify SEO compliance:
```bash
npm run validate:seo
```
Output:
```
--- MSK INSTITUTE TECHNICAL SEO & SCHEMA VALIDATION ---
[PASS] layout.tsx: metadataBase is https://www.mskinstitute.in
[PASS] robots.ts: Single canonical sitemap configured
[PASS] sitemap.ts: Free of redirected routes
[PASS] layout.tsx: Schema LocalBusiness NAP fully verified
SEO Validation PASSED: 100% compliant with Technical & Local SEO standards!
```
