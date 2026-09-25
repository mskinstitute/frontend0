# MSK Institute Website — Phase 2 Current Tracking & Infrastructure Audit

**Website:** https://www.mskinstitute.in/  
**Audit Date:** September 2026  
**Auditor:** Senior Analytics & Technical SEO Architect  
**Status:** Audit Completed — Baseline Established

---

## 1. Executive Summary
A comprehensive scan of the repository was conducted to inspect all existing tracking IDs, analytics components, Google Tag Manager containers, Search Console hooks, structured data schemas, and environment configurations before making any Phase 2 additions.

No duplicate tag managers, duplicate GA4 containers, or conflicting third-party tracking libraries were discovered. The existing setup provides a solid baseline that will be unified into a production-grade, privacy-first conversion tracking and technical SEO system.

---

## 2. Inventory of Existing Tracking Assets

### 2.1 Identifiers Discovered
| System | Identifier Found | Configuration Location | Status |
|---|---|---|---|
| **Google Tag Manager** | `GTM-WTZ5VP6M` | `.env.local`, `src/components/GoogleTagManager.tsx`, `src/components/Analytics.tsx`, `src/lib/tracking.ts` | Configured as primary web container |
| **Google Analytics 4** | `G-6CQ1F72VS0` | `.env.local`, `src/components/Analytics.tsx`, `src/lib/tracking.ts` | Configured as GA4 data stream |
| **Google Search Console** | Variable Hook `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `.env.example`, `.env.local` (commented), `src/app/layout.tsx` (`verification.google`) | Hook wired in root metadata; awaits owner verification token |
| **Meta Pixel / Facebook** | *None* (only social links `https://www.facebook.com/mskinstitute`) | N/A | Not implemented (clean baseline) |
| **Google Ads Conversion** | *None* | N/A | Not implemented (clean baseline) |

---

## 3. Architecture & Data Layer Audit

### 3.1 Current Analytics Component Structure
- **`src/app/layout.tsx`**:
  - Injects JSON-LD schema (`EducationalOrganization`, `LocalBusiness`).
  - Injects `GoogleTagManagerNoScript` iframe inside `<body>`.
  - Injects `<Analytics />` component.
  - Injects `<FloatingWhatsAppCTA />`.
  - Configures `metadataBase: new URL('https://www.mskinstitute.in')`.
  - Configures `verification.google` reading from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

- **`src/components/Analytics.tsx`**:
  - Initializes `window.dataLayer = window.dataLayer || []` and `window.gtag` via `beforeInteractive` script.
  - Mounts `<GoogleTagManager />` (`strategy="afterInteractive"`).
  - Also mounts `<Script src="https://www.googletagmanager.com/gtag/js?id=${measurementId}">` directly.
  - Mounts `<AnalyticsTracker />`.
  - *Finding:* Having direct `gtag.js` AND GTM loaded simultaneously can result in duplicate pageviews if GTM also fires a GA4 config tag. In Phase 2, we will ensure single-tag stream orchestration.

- **`src/components/AnalyticsTracker.tsx`**:
  - Subscribes to `usePathname()` and `useSearchParams()` to trigger `trackPageView(url)` on Next.js SPA client-side route transitions.
  - Implements global click event delegation for:
    - WhatsApp links (`wa.me`, `api.whatsapp.com`)
    - Telephone links (`tel:`)
    - Email links (`mailto:`)
    - File downloads (`.pdf`, `.zip`, notes, cheatsheets, syllabi)

- **`src/lib/dataLayer.ts`**:
  - Privacy-first foundation: `sanitizeAnalyticsParams()` scrubs all PII (`name`, `phone`, `email`, `password`, `message`, `whatsapp_message`, etc.).
  - Deduplication cache: 400ms memory window to prevent React re-renders from double-firing events.
  - Provides tracking methods for `page_view`, `course_view`, `batch_view`, `generate_lead`, `demo_request`, `whatsapp_click`, `phone_click`, `email_click`, `enrollment_start`, `enrollment_submit`, `note_download`, `tutorial_view`, `certificate_verify`.

---

## 4. Local SEO & Structured Data Audit

### 4.1 Schemas Currently Implemented
1. **Root Organization & LocalBusiness** in `src/app/layout.tsx`:
   - Name: `MSK Institute`
   - Location: `Shikohabad, Uttar Pradesh, 283135, IN`
   - Phone: `+918393042166`
   - Email: `mskshikohabad@gmail.com`
   - Coordinates: Lat `27.1157743`, Long `78.5829716`
   - Founder: `Er. Sumit Kumar`
2. **Homepage Entity Graph** in `src/app/page.tsx`:
   - Organization, WebSite (`SearchAction`), WebPage, ItemList, FAQPage.
3. **Course Schema** in `src/app/courses/[slug]/page.tsx`:
   - Course, Syllabus, Offer (Free Demo), FAQPage, BreadcrumbList.
4. **Batch Schema** in `src/app/live-batches/[id]/page.tsx`:
   - CourseInstance, Offer (`InStock` or `Discontinued`), BreadcrumbList.

### 4.2 Gaps Identified for Phase 2
- **Missing Standard GA4 Ecommerce Events:** GA4 recommended events for educational catalogs include `view_item_list`, `select_item`, and `view_item`.
- **Page Context Data Layer:** No standardized `page_type` or unified page context object pushed on page transitions.
- **Attribution Preservation:** UTM query parameters (`utm_source`, `utm_medium`, `utm_campaign`) are not captured into session storage to attribute downstream conversions (like floating WhatsApp clicks or offline admissions).
- **Internal Search Tracking:** Internal search on course catalog / tutorials does not emit a standard GA4 `search` event with `search_term`.
- **Course Selection Tracking:** Clicking a course card in the catalog does not emit `select_item`.
- **Local Landing Page Intent:** No dedicated high-intent local syllabus pages (e.g., Python Course in Shikohabad, NIELIT CCC in Shikohabad) with localized FAQ, lab directions, and transit guidance.

---

## 5. Next Steps for Phase 2 Implementation
1. **Environment Configuration:** Support both `NEXT_PUBLIC_GA4_MEASUREMENT_ID` and `NEXT_PUBLIC_GA_ID`, define `NEXT_PUBLIC_SITE_URL`.
2. **Centralized Analytics Architecture:** Create `src/lib/analytics/` with strict TypeScript types, single dataLayer push mechanism, and first-party UTM session persistence.
3. **Page Context Injection:** Inject `page_type`, entity IDs, and non-PII metadata on all route transitions.
4. **Standard GA4 Events:** Implement `view_item_list`, `select_item`, `view_item`, `batch_view`, `generate_lead`, `search`, `resource_download`.
5. **Attribution & Form Deduplication:** Ensure zero double counting of conversions.
6. **Local SEO & NAP Enhancement:** Audit Contact page, refine LocalBusiness JSON-LD, create GBP action plan.
7. **Documentation & Validation:** Build validation scripts (`npm run validate:analytics`, `npm run validate:local`) and complete all Phase 2 documentation.
