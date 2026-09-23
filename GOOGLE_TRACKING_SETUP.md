# Google Tracking, Analytics & Search Ecosystem Setup — MSK Institute

**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  
**Brand:** MSK Institute (Mastering Software Knowledge)  
**Location:** Shikohabad, Uttar Pradesh, India  
**Lead Mentorship:** Er. Sumit Kumar  

---

## 1. Executive Summary & Website Technology

This setup establishes a production-grade, privacy-first, 100% **FREE** Google analytics and search ecosystem for MSK Institute.

### Technology Architecture
- **Framework:** Next.js 15.1.0 / 15.5.x (React 19, TypeScript)
- **Routing:** Next.js App Router (`src/app`)
- **Rendering:** Static Site Generation (SSG) & Incremental Static Regeneration (ISR)
- **Styling:** Tailwind CSS v4
- **Container Architecture:** Google Tag Manager (GTM) with unified dataLayer fallback
- **Analytics Platform:** Google Analytics 4 (GA4) via GTM
- **Search Platforms:** Google Search Console, Google Business Profile, Schema.org Graph

---

## 2. Environment Variables & Placeholders

The tracking subsystem is designed to run safely out-of-the-box using clean configuration placeholders. No real credentials or secrets are committed to Git.

Configured in [.env.example](file:///d:/Sumit/MSK-Institute-Website/.env.example) and [.env.local](file:///d:/Sumit/MSK-Institute-Website/.env.local):

```env
# ==============================================================================
# Google Ecosystem & Tracking Configuration
# ==============================================================================
# Google Tag Manager Container ID (Connected Web Container)
NEXT_PUBLIC_GTM_ID="GTM-WTZ5VP6M"

# Google Analytics 4 Measurement ID (Connected Google Tag)
NEXT_PUBLIC_GA_ID="G-6CQ1F72VS0"

# Google Search Console HTML Verification Token
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="YOUR_GOOGLE_SITE_VERIFICATION_TOKEN"
```

> **Connected Status:** 
> - **GTM Web Container:** `GTM-WTZ5VP6M` (Active)
> - **Google Tag / GA4:** `G-6CQ1F72VS0` / `GT-WKT4G778` (Active)

---

## 3. Google Tag Manager (GTM) Implementation

- **Component:** [`src/components/GoogleTagManager.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/components/GoogleTagManager.tsx)
- **Injected into:** [`src/app/layout.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/app/layout.tsx)
- **Loading Strategy:** Next.js `Script` with `strategy="afterInteractive"`, ensuring zero blocking on Largest Contentful Paint (LCP) and zero impact on Cumulative Layout Shift (CLS).
- **Fallback:** `<noscript>` iframe injected directly at the top of `<body>` for non-JavaScript visitors.
- **De-duplication Protection:** GTM checks whether `NEXT_PUBLIC_GTM_ID` is valid. If it is a placeholder or not provided, script injection is safely skipped to avoid 404 network errors or console noise.

---

## 4. Google Analytics 4 (GA4) Implementation

- **Component:** [`src/components/Analytics.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/components/Analytics.tsx)
- **Zero Duplicate Tag Guarantee:**
  - When GTM is configured (`NEXT_PUBLIC_GTM_ID`), GA4 tags are managed exclusively through GTM. Direct `gtag.js` is suppressed to prevent duplicate tags and duplicate page views.
  - When GTM is not yet deployed, direct GA4 fallback is activated if a valid `NEXT_PUBLIC_GA_ID` is present.
  - Single Page Application (SPA) route changes are tracked automatically by [`AnalyticsTracker.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/components/AnalyticsTracker.tsx) with automatic deduplication.

---

## 5. Privacy Guarantees & Zero-PII Policy

In compliance with Google's Terms of Service and global data protection guidelines:
- **No PII is ever pushed to GA4/GTM:**
  - Student full names are **stripped**.
  - Mobile/WhatsApp phone numbers are **stripped**.
  - Email addresses are **stripped**.
  - Form notes, messages, and passwords are **stripped**.
- **Sanitization Layer:** All payloads pass through `sanitizeAnalyticsParams()` in [`src/lib/dataLayer.ts`](file:///d:/Sumit/MSK-Institute-Website/src/lib/dataLayer.ts) before reaching `window.dataLayer`.

---

## 6. Events Implemented & DataLayer Schema

All events use standard `snake_case` naming and are pushed to `window.dataLayer`.

| Event Name | Trigger Location | Purpose | Key Parameters |
|---|---|---|---|
| `page_view` | Every route transition (`AnalyticsTracker`) | Pageview telemetry | `page_path`, `page_title`, `page_location` |
| `whatsapp_click` | Any WhatsApp CTA link (`wa.me` or `whatsapp.com`) | Track direct chat enquiries | `button_text`, `course_name`, `link_url`, `page_location` |
| `phone_click` | Any `tel:` link click | Track incoming phone enquiries | `button_text`, `page_location` |
| `email_click` | Any `mailto:` link click | Track email enquiries | `button_text`, `page_location` |
| `form_start` | First focus on any lead or registration form | Form engagement rate | `form_name`, `page_location` |
| `form_submit` | Click submit on validated forms | Form submission intent | `form_name`, `page_location`, contextual course/batch |
| `generate_lead` | **Only on verified successful submission** | Primary conversion tracking | `form_name`, `course_name`, `batch_id`, `preferred_date` |
| `course_view` | Course detail page mount (`/courses/[slug]`) | Measure course interest | `course_id`, `course_name`, `course_category`, `course_duration`, `course_mode`, `course_price` |
| `course_enquiry` | Free demo booking submission on course page | Measure course demand | `course_id`, `course_name`, `course_category` |
| `course_register` | Course registration completion | Course conversions | `course_id`, `course_name`, `course_category` |
| `batch_view` | Live batch detail page mount (`/live-batches/[id]`) | Measure batch interest | `batch_id`, `batch_name`, `course_name`, `batch_start_date`, `course_price`, `course_mode` |
| `batch_register` | Live batch admission submission | Batch conversions | `batch_id`, `batch_name`, `course_name`, `batch_start_date`, `course_price`, `course_mode` |
| `file_download` | PDF notes, cheatsheet, or syllabus downloads | Content engagement | `file_name`, `file_extension`, `download_type` |
| `cheatsheet_download` | Free cheatsheet PDF generation | Cheatsheet engagement | `file_name` |
| `notes_download` | Revision notes download | Study material engagement | `file_name` |

### Sample DataLayer Payloads

#### Course View
```javascript
window.dataLayer.push({
  event: "course_view",
  course_id: "course-python-mastery",
  course_name: "Python Programming Masterclass",
  course_category: "Programming",
  course_duration: "3 MONTHS",
  course_price: 0,
  course_mode: "BOTH",
  page_location: "https://www.mskinstitute.in/courses/python-programming-masterclass",
  page_path: "/courses/python-programming-masterclass"
});
```

#### WhatsApp Click
```javascript
window.dataLayer.push({
  event: "whatsapp_click",
  button_text: "Reserve Seat & Chat on WhatsApp",
  course_name: "Python Programming Masterclass",
  link_url: "https://wa.me/918393042166",
  page_location: "https://www.mskinstitute.in/live-batches/batch-python-mastery-beginner-to-advanced-3-months"
});
```

#### Verified Lead Generation
```javascript
window.dataLayer.push({
  event: "generate_lead",
  form_name: "batch_enrollment",
  batch_id: "batch-python-mastery-beginner-to-advanced-3-months",
  batch_name: "Python Programming Masterclass (Offline & Online)",
  course_name: "Python Programming Masterclass",
  course_mode: "OFFLINE",
  course_price: "₹3,499",
  page_location: "https://www.mskinstitute.in/live-batches/batch-python-mastery-beginner-to-advanced-3-months"
});
```

---

## 7. Ecommerce & Online Payments Audit

- **Audit Finding:** The website currently accepts admissions and inquiries through trial demo booking, live batch seat reservations, and WhatsApp/counselor interactions. It does **not** contain an integrated online payment gateway (e.g. Razorpay, Stripe, PayU, UPI QR auto-settlement).
- **Rule Adherence:** Per instructions, **no fake purchase events** are dispatched.
- **Future Activation:** When an online payment gateway is integrated in the future, standard GA4 ecommerce events (`begin_checkout`, `purchase`) can be enabled in `src/lib/dataLayer.ts` using verified server transaction IDs (never firing on mere button clicks).

---

## 8. Google Search Console & SEO Readiness

- **Robots.txt URL:** [https://www.mskinstitute.in/robots.txt](https://www.mskinstitute.in/robots.txt)
- **Sitemap.xml URL:** [https://www.mskinstitute.in/sitemap.xml](https://www.mskinstitute.in/sitemap.xml)
- **HTML Verification:** Added to `layout.tsx` metadata. Set token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Dynamic Sitemap:** Generated by [`src/app/sitemap.ts`](file:///d:/Sumit/MSK-Institute-Website/src/app/sitemap.ts), serving over 1,600+ indexed URLs (courses, live batches, tutorials, blogs, study materials, and tools).
- **Structured Data:** Schema.org JSON-LD graphs active for `EducationalOrganization`, `LocalBusiness`, `Course`, `CourseInstance`, `WebSite`, `BreadcrumbList`, and `FAQPage`.

---

## 9. Google Business Profile Alignment

The website metadata and Schema.org graphs match the official Google Business Profile for MSK Institute:
- **Business Name:** MSK Institute
- **Website:** https://www.mskinstitute.in/
- **Address:** Gali No. 3, Near Gyan Jyoti Public School, Station Road, Shikohabad, UP 283135, IN
- **Phone:** +91 83930 42166
- **Hours:** Monday to Saturday, 09:00 AM – 06:00 PM
- **Geo-Coordinates:** Lat 27.1157743, Lng 78.5829716

---

## 10. GA4 Conversion Events to Mark as Conversions

In **Google Analytics > Admin > Events > Mark as conversion**, mark the following:
1. `generate_lead` (Primary Lead Conversion)
2. `course_register` (Course Admission Conversion)
3. `batch_register` (Live Batch Admission Conversion)
4. `whatsapp_click` (Direct High-Intent Chat Conversion)
5. `phone_click` (Direct Call Conversion)
6. `course_enquiry` (Trial Demo Request)

---

## 11. Testing & Verification Checklist

- [x] Production build passes (`npm run build`) with 0 errors.
- [x] No duplicate GTM scripts injected.
- [x] No duplicate GA4 pageviews on client navigation.
- [x] `window.dataLayer` initializes before page interactive.
- [x] Zero PII sent in event parameters.
- [x] WhatsApp click tracking triggers on both `wa.me` and `api.whatsapp.com` links.
- [x] Telephone links (`tel:`) trigger `phone_click` without exposing phone numbers.
- [x] Email links (`mailto:`) trigger `email_click` without exposing emails.
- [x] Form submission only fires `generate_lead` upon verified API/fallback completion.
- [x] Dynamic sitemap generates at `/sitemap.xml` with all 1,600+ URLs.
- [x] Valid `robots.txt` points to `https://www.mskinstitute.in/sitemap.xml`.
