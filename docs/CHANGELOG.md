# Changelog — MSK Institute Website Improvements

All notable changes, fixes, and architecture upgrades implemented during the Master Audit & Technical Overhaul.

---

## [Unreleased / Production Audit] — September 2026

### 1. Course Data & Template Integrity
- **Unified Course Statuses:** Fixed `course-markdown-mastery` status from `"PUBLISHED"` to `"PUBLISH"` in `public/data/all-courses.json` (all 66 courses now have status `"PUBLISH"`).
- **Repaired Combo Course Relationships:** Updated `includedCourseIds` in `course-web-dev` to point to canonical IDs (`course-html5-complete-course`, `course-javascript-for-beginners`, `course-react-js-for-beginners`, `course-backend-node`).
- **Eliminated Generic Learning Outcomes Fallback:** Created and executed `scripts/populate-learning-outcomes.js`, writing syllabus-specific outcomes for all 53 courses that previously lacked them. 100% of 66 courses now have course-specific outcomes rendered on `/courses/[slug]`.
- **Dynamic Active Course Count:** Replaced hardcoded `'Active Courses: 12+'` on the homepage with dynamically computed count reflecting all 66 courses.
- **Truthful Homepage Metrics:** Replaced unverified arbitrary `'Success Rate: 98%'` with verifiable `'100% Practical Lab Focus'`.

### 2. Live Batches Architecture
- **Canonical Batch Repository:** Created `public/data/live-batches.json` as the single source of truth for all live batches, eliminating hardcoded inconsistent fallbacks.
- **Lifecycle Status Management:** Introduced `BatchStatus` type union (`DRAFT`, `UPCOMING`, `OPEN`, `FULL`, `RUNNING`, `COMPLETED`, `CLOSED`, `ARCHIVED`) and added `status`, `endDate`, and `mode` to `LiveBatch` in `src/types/index.ts`.
- **Completed Cohort UX & SEO:** Updated `src/app/live-batches/[id]/page.tsx` and `src/components/LiveBatchesClient.tsx` to handle completed batches with notice banners, closed admissions messaging, links to next batch/curriculum, and Schema.org `availability: Discontinued`.

### 3. URL Integrity & Broken Internal Link Fixes
- **Catalog Comparison Table Fixes:** In `src/components/CourseCatalogClient.tsx`, mapped 6 stale comparison table slugs to canonical destinations:
  - `python-programming-masterclass` -> `python-mastery-beginner-to-advanced--3-months`
  - `full-stack-web-development-bootcamp` -> `full-stack-web-dev-bootcamp`
  - `html5-css3-modern-ui-design` -> `web-designing-complete-pathway--4-months`
  - `javascript-react-frontend-engineering` -> `frontend-development--8-months`
  - `ccc-course-on-computer-concepts` -> `ccc`
  - `adca-advanced-diploma-computer-applications` -> `adca`
- **Certificate Data Slugs:** Updated stale course slugs in `public/data/certificates.json` to canonical course slugs.
- **Admin Verification Fix:** Updated default certificate lookup state in `src/app/admin/page.tsx`.
- **Markdown Blog Fixes:** Updated stale course slugs and markdown links across 8 blog articles:
  - `full-stack-web-development-roadmap-2026.md`
  - `how-to-prepare-for-nielit-ccc-exam-first-attempt.md`
  - `html5-css3-top-50-viva-questions-frontend-lab-guide.md`
  - `nielit-o-level-vs-ccc-exam-comparison-guide-2026.md`
  - `python-vs-javascript-which-to-learn-first.md`
  - `top-10-excel-formulas-every-office-professional-must-know.md`
  - `top-10-free-ai-tools-for-computer-students-in-2026.md`
  - `top-40-c-programming-interview-and-viva-questions-with-answers.md`
- **Internal Link Audit Result:** Zero broken internal links across 1,676 routes.

### 4. Technical & Local SEO
- **Unified Domain Canonicalization:** Replaced 171 instances of `https://mskinstitute.in` with `https://www.mskinstitute.in` across all page metadata, canonical tags, OpenGraph URLs, Twitter metadata, JSON-LD Schema IDs, and client components.
- **Centralized Permanent 301 Redirects:** Configured 15 course and page 301 redirects in `next.config.ts`, along with 16 tutorial deep-link redirects.
- **Removed Duplicate Page Routes:** Removed duplicate directory wrappers `src/app/contact-us` and `src/app/career` in favor of server-level 301 redirects in `next.config.ts`.
- **Sitemap Optimization:**
  - Removed redirected route `/notes` from `sitemap.ts`.
  - Added dynamic discovery and indexation of 1,400+ tutorial lesson topics in `sitemap.ts`.
- **Robots.txt Cleanup:** Removed `/notes/` from allow list and unified to single canonical sitemap URL `https://www.mskinstitute.in/sitemap.xml`.
- **LocalBusiness Schema Alignment:** Verified Name, Address, Phone (NAP) consistency across `src/app/layout.tsx` and `src/app/page.tsx` for Shikohabad, Uttar Pradesh, India.

### 5. Analytics & Conversion Tracking
- **Canonical Telemetry Functions:** Added `trackDemoRequest`, `trackEnrollmentStart`, `trackEnrollmentSubmit`, `trackTutorialView`, `trackCertificateVerify`, and `trackNoteDownload` to `src/lib/dataLayer.ts` and `src/lib/tracking.ts`.
- **Form Integration:**
  - Integrated `trackDemoRequest` into `DemoBookingForm.tsx`.
  - Integrated `trackEnrollmentStart` (on input focus) and `trackEnrollmentSubmit` (on submission) into `BatchEnrollmentForm.tsx`.
  - Integrated `trackTutorialView` into `TutorialReader.tsx`.
  - Integrated `trackCertificateVerify` into `CertificateVerifier.tsx`.
- **Strict Privacy Guarantees:** All telemetry passes through `sanitizeAnalyticsParams()`, strictly scrubbing PII (names, phone numbers, emails, passwords) with memory deduplication to prevent React 19 double-firing.

### 6. Automated Validation Suite
Added automated validation scripts to `package.json`:
- `npm run validate:courses`: Validates all 66 courses, IDs, slugs, and learning outcomes.
- `npm run validate:batches`: Validates live batch data, statuses, dates, and course mappings.
- `npm run validate:seo`: Validates canonical URLs, sitemaps, robots.txt, and NAP schema.
- `npm run audit:urls`: Audits all internal links across markdown content and data files.
- `npm run typecheck`: Runs `tsc --noEmit` across all TypeScript files.
