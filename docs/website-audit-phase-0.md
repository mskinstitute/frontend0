# MSK Institute Website — Phase 0 Repository Audit Summary

**Date:** September 2026  
**Auditor:** Senior Next.js / Technical SEO / Performance Architect  
**Repository:** MSK Institute Website (`https://www.mskinstitute.in/`)  
**Physical Location:** Gali No. 3, Near Gyan Jyoti Public School / Arya Samaj Mandir, Station Road, Shikohabad, Uttar Pradesh 283135, India  

---

## 1. Executive Architecture Overview

| Parameter | Current Value / Implementation |
|---|---|
| **Framework** | Next.js 15.5.24 (App Router) |
| **Runtime / React** | React 19.0.0 & React DOM 19.0.0 |
| **Language** | TypeScript 5.5.3 (Strict mode, ES2017 target) |
| **Styling** | Tailwind CSS 4.0.0 with `@tailwindcss/postcss` |
| **Routing Architecture** | Next.js App Router (`src/app/`) |
| **Rendering Strategy** | SSG (Static Site Generation with `generateStaticParams`) + ISR (`revalidate: 60` on live schedules) |
| **Total Pre-rendered Pages** | 1,688 static pages generated at build time |
| **Data Sources** | Local JSON files in `public/data/` (Courses, Tutorials, Study Materials, Careers, Certificates, Instructors, Notes); Markdown files in `content/blogs/`; Google Sheets fallback/live sync for live batches & students |
| **Analytics & GTM** | GA4 (`G-6CQ1F72VS0`) + Google Tag Manager (`GTM-WTZ5VP6M`) via `AnalyticsTracker.tsx` and `dataLayer.ts` |
| **SEO Metadata** | Root `layout.tsx` metadata with page-level `generateMetadata` exports; Structured Data (JSON-LD) across key templates |

---

## 2. Directory Structure & Key Subsystems

```text
├── content/
│   └── blogs/                  # 13 rich markdown articles with YAML frontmatter
├── docs/                       # Audit, validation, and architecture documentation
├── public/
│   ├── brand/                  # Favicons, PWA icons, manifest icons
│   ├── data/                   # Single source of truth data files
│   │   ├── all-courses.json    # 66 comprehensive course definitions (667 KB)
│   │   ├── study-materials.json# 25 study materials (notes, handbooks, cheatsheets)
│   │   ├── tutorials.json      # 41 interactive tutorial subjects
│   │   ├── careers.json        # Career & internship postings
│   │   ├── instructors.json    # Verified instructor profiles
│   │   └── certificates.json   # Verifiable student graduation records
│   ├── images/                 # Static course and tutorial diagrams
│   └── manifest.json           # PWA web manifest
├── scripts/                    # Automation, screenshot generation, data validation scripts
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── courses/            # Course listing & [slug] detail pages
│   │   ├── live/               # Live classroom schedules & upcoming sessions
│   │   ├── live-batches/       # Batch admissions & [id] detail pages
│   │   ├── study-material/     # Central study material directory
│   │   ├── tutorials/          # [slug] and [slug]/[topicSlug] interactive reader
│   │   ├── blogs/              # Blog listing & [slug] reader
│   │   ├── verify-certificate/ # Online certificate verification portal
│   │   ├── layout.tsx          # Root layout with NAP Schema & PWA Provider
│   │   ├── page.tsx            # High-conversion homepage
│   │   ├── sitemap.ts          # Dynamic XML sitemap generator
│   │   └── robots.ts           # Crawl directives & sitemap declaration
│   ├── components/             # Reusable UI & Client components
│   ├── features/               # Playground (Monaco Editor) & TypeQuest typing tool
│   ├── lib/                    # Batch utilities, Markdown parser, data layer
│   ├── services/api.ts         # Central data retrieval & normalization layer
│   └── types/index.ts          # TypeScript domain interfaces
```

---

## 3. Discovered Vulnerabilities & Defects

### A. Critical Issues (Data Integrity & Route Resolution)
1. **Batch Course Slug Disconnect:**
   - In `src/services/api.ts`, fallback batch `batch-mern-full-stack` references `courseSlug: "full-stack-web-development"`.
   - In `all-courses.json`, the course slug is `full-stack-development` (Grand Mastery) or `full-stack-web-dev-bootcamp` (Bootcamp) or `full-stack-mern-mastery--12-months`. The batch could not resolve its parent course during static generation, failing to generate its detail page or showing fallback data.
2. **Course Status Inconsistency:**
   - `course-markdown-mastery` has `"status": "PUBLISHED"` instead of `"status": "PUBLISH"`.
   - As a consequence, `courses.filter(c => c.status === 'PUBLISH')` in `sitemap.ts` and `courses/page.tsx` dropped Markdown Mastery from the indexable course catalog and sitemap.
3. **Course Detail Template Corruption (Generic Web Outcomes):**
   - 53 of 66 courses currently lack explicit `learningOutcomes` in `all-courses.json`.
   - In `src/app/courses/[slug]/page.tsx`, the fallback logic defaulted non-matching courses to web design outcomes:
     `"Clean, industry-standard syntax following international W3C specifications"`,
     `"Mobile responsiveness, accessibility (WCAG/ARIA) & SEO best practices"`.
   - As a result, MS Office, MS Word, Power BI, NIELIT CCC, ADCA, and C Programming were displaying HTML/CSS/W3C learning outcomes!

### B. High-Priority Issues (Technical SEO & URL Integrity)
1. **Duplicate Routes:**
   - `/contact` and `/contact-us` exist simultaneously. `/contact-us/page.tsx` directly re-exports `/contact/page.tsx`, creating an indexable duplicate route without a 301 redirect.
   - `/career` and `/careers` both exist (`/career` redirects client-side via Next.js navigation rather than a proper permanent HTTP 301 redirect in `next.config.ts`).
   - `/notes` exists as a duplicate page component despite having a redirect in `next.config.ts`.
2. **Sitemap Defects:**
   - `/notes` was explicitly included in `sitemap.ts` even though `next.config.ts` declares a 301 redirect from `/notes` to `/study-material`. Redirected routes must never be listed in an XML sitemap.
   - Hostname inconsistency: `sitemap.ts` used `https://www.mskinstitute.in` while `layout.tsx` metadataBase used `https://mskinstitute.in`.
   - `robots.ts` listed two separate sitemaps (`www` and non-`www`).
3. **Hardcoded Stats & Inconsistent Course Counts:**
   - Homepage displayed `"Active Courses: 12+"` while 65 published courses exist in `all-courses.json`.
   - Unverified claim `"Success Rate: 98%"` was hardcoded without verification or source attribution.

### C. Medium-Priority Issues (Performance & Analytics)
1. **Heavy Interactive Feature Bundle Size:**
   - `/playground` imports `@monaco-editor/react` (121 kB page bundle, 262 kB first load JS).
   - `/tools/typing` (TypeQuest) has a 191 kB page bundle and 303 kB first load JS.
   - Code splitting and dynamic imports must be used to ensure these heavy dependencies do not impact main landing page LCP/INP.
2. **Missing Automated Validation Scripts:**
   - No `validate:courses`, `validate:batches`, `validate:seo`, or `audit:urls` scripts existed in `package.json`.
3. **Linting Configuration Missing:**
   - `npm run lint` failed due to missing ESLint configuration.

---

## 4. Remediation Plan by Priority

1. **Phase 1 (Data Integrity):** Fix `all-courses.json` status for `course-markdown-mastery`. Ensure course canonical model consistency.
2. **Phase 2 (URL Integrity & Redirects):** Add permanent 301 redirects in `next.config.ts` for `/contact-us` -> `/contact`, `/career` -> `/careers`, and all historical course slug variations. Remove redundant duplicate route folders.
3. **Phase 3 (Course Template Correctness):** Populate genuine, course-specific `learningOutcomes` in `all-courses.json` for all 66 courses. Enhance template fallback to never emit web-dev outcomes for non-web courses.
4. **Phase 4 (Batch Data Architecture):** Establish `public/data/live-batches.json` as canonical batch repository with validated lifecycle statuses (`UPCOMING`, `OPEN`, `FULL`, `RUNNING`, `COMPLETED`, `ARCHIVED`) and correct course references.
5. **Phase 5 (Technical SEO):** Unify canonical domain to `https://www.mskinstitute.in`, clean sitemap, optimize `robots.ts`, validate JSON-LD structured data.
6. **Phase 6 & 7 (Crawlability & CWV Performance):** Ensure semantic anchor tags, optimize images, measure Core Web Vitals before and after.
7. **Phase 8 (Analytics & Conversion Tracking):** Implement clean event emission without PII across all CTAs (WhatsApp, Demo, Phone, Enroll).
8. **Phase 9 & 10 (Internal Linking & Local SEO):** Strengthen Shikohabad local authority, link Courses <-> Batches <-> Tutorials <-> Study Materials.
9. **Phase 11 & 12 (Validation Scripts & Final QA):** Provide `npm run validate:courses`, `npm run validate:batches`, `npm run validate:seo`, `npm run audit:urls`, and full documentation.
