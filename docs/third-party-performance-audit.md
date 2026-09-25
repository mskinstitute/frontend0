# MSK Institute — Third-Party Performance Audit

**Date:** September 25, 2026  
**Website:** [https://www.mskinstitute.in/](https://www.mskinstitute.in/)  

---

## 1. Third-Party Services Inventory & Impact Matrix

| Service | Host / Source | Pages Used | Purpose | Loading Strategy | Main-Thread Cost | Network Weight | Optimization Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Google Tag Manager** | `googletagmanager.com/gtm.js?id=GTM-WTZ5VP6M` | All Pages | Tag management & analytics events | `afterInteractive` | ~15ms - 25ms | ~28 KB (gzip) | **Optimal.** Zero CWV blocking. |
| **Google Analytics 4** | `googletagmanager.com/gtag/js?id=G-6CQ1F72VS0` | All Pages | Telemetry, funnel tracking | `afterInteractive` | ~10ms - 20ms | ~45 KB (gzip) | **Optimal.** `send_page_view: false` prevents SPA duplicate counts. |
| **Google Maps Embed** | `maps.google.com/maps?...output=embed` | `/contact` | Physical campus location map | Synchronous `<iframe>` | **~120ms - 250ms** ⚠️ | **~1,100 KB** ⚠️ (scripts + tiles) | **Deferred Interaction Needed.** Replace with static preview card. |
| **Google Fonts (Plus Jakarta Sans)** | `next/font/google` | All Pages | Primary typography | Self-hosted by Next.js | 0ms runtime | ~35 KB (woff2) | **Optimal.** Self-hosted with `display: 'swap'`. |
| **WhatsApp Direct Link** | `wa.me/918393042166` | All Pages | Direct student admissions inquiry | Native link (`<a>`) | 0ms | 0 KB | **Optimal.** No external SDK or script widget loaded. |
| **Social Media Profiles** | `facebook.com`, `instagram.com` | Footer, About | Institutional social proof | Plain external links | 0ms | 0 KB | **Optimal.** No tracking pixels or social iframe widgets. |

---

## 2. Third-Party Loading Strategy Assessment

### GTM & GA4 Dual-Tagging
* Both scripts use Next.js's `<Script strategy="afterInteractive" />`.
* Injected into the DOM after page hydration completes, ensuring **zero interference** with First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
* Zero-PII sanitization pipeline runs in memory before any `dataLayer.push()` event is emitted.

### Google Maps Iframe Optimization
* Embedding the full Google Maps iframe on initial page load downloads over 1 MB of JavaScript libraries, geometry utilities, and tile graphics, executing substantial script evaluation on the main thread.
* **Architecture Fix:**
  * Render an attractive, brand-aligned visual map card with the campus address, landmark, and a prominent "View Live Interactive Map" button.
  * Clicking the button activates the live iframe on demand.
  * Direct "Open in Google Maps App" deep-link is provided for mobile users, delivering instant navigation without loading any web iframe.
