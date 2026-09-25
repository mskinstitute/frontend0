# Google Analytics 4 (GA4) Implementation & Configuration Guide

**Property Name:** MSK Institute Website  
**Measurement ID:** `G-6CQ1F72VS0`  
**Web Data Stream:** `https://www.mskinstitute.in` (MSK Institute Production Web Stream)  
**Container Architecture:** Direct `gtag.js` + Google Tag Manager (`GTM-WTZ5VP6M`) Coordinated  
**Privacy Standard:** Zero PII (Personally Identifiable Information)  

---

## 1. Core Architecture in Next.js 15 App Router

The telemetry system solves two common single-page application (SPA) analytics pitfalls:
1. **Duplicate Pageviews:** By default, loading both GTM and direct `gtag.js` causes every initial page load to count twice. We disabled automatic pageviews in direct `gtag('config')`:
   ```typescript
   gtag('config', 'G-6CQ1F72VS0', { send_page_view: false });
   ```
2. **Missing Client-Side Route Transitions:** Next.js App Router navigates without hard browser reloads. The centralized `AnalyticsTracker.tsx` component listens to `usePathname()` and `useSearchParams()` to dispatch a single, verified `page_view` event on every route change.

### Telemetry Pipeline

```text
[ Browser Event / Navigation ]
             │
             ▼
[ AnalyticsTracker / UI Trigger ]
             │
             ▼
[ @/lib/analytics/dataLayer ]
     ├── Zero-PII Sanitization (drops names, phones, emails, passwords)
     ├── Rate Limiting & Memory Deduplication (400ms – 2000ms window)
     └── Attribution Enrichment (utm_source, utm_medium, referrer)
             │
             ├──► window.dataLayer.push({ event: '...' }) ──► [ GTM-WTZ5VP6M ]
             │
             └──► window.gtag('event', '...', params) ──────► [ GA4: G-6CQ1F72VS0 ]
```

---

## 2. GA4 Custom Definitions (Dimensions & Metrics)

To analyze the MSK Institute admissions funnel, configure the following custom definitions under **GA4 Admin > Data Display > Custom Definitions**:

### Custom Dimensions (Event-Scoped)

| Dimension Name | Scope | Event Parameter | Description |
| :--- | :--- | :--- | :--- |
| **Course Name** | Event | `course_name` | Name of course viewed, enquired, or enrolled in (e.g. "Python Masterclass"). |
| **Course Category** | Event | `course_category` | High-level course category (e.g. "Programming", "Web Dev"). |
| **Course Mode** | Event | `course_mode` | Learning delivery mode (`ONLINE`, `OFFLINE`, `BOTH`). |
| **Batch ID** | Event | `batch_id` | Canonical identifier for live cohort batch (e.g. `msk-py-2026-04`). |
| **Batch Name** | Event | `batch_name` | Title of the live batch. |
| **CTA Location** | Event | `cta_location` | Placement of interaction (`header`, `footer`, `floating_button`, `course_card`, `batch_card`, `hero`, `contact_section`). |
| **Page Type** | Event | `page_type` | Semantic page template (`home`, `catalog`, `course_detail`, `batch`, `contact`, `study_material`, `tutorial`, `tool`, `general`). |
| **First-Seen Source** | Event | `first_seen_source` | Persisted first-touch traffic source stored in first-party session. |
| **Search Term** | Event | `search_term` | Internal course or tutorial search query. |
| **Resource Type** | Event | `resource_type` | Download asset category (`notes`, `cheatsheet`, `syllabus`). |

### Custom Metrics

| Metric Name | Scope | Event Parameter | Unit | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Course Price** | Event | `course_price` | Currency (INR) | Value of course or batch for inquiry evaluation. |
| **Search Results Count** | Event | `results_count` | Standard | Number of courses matching internal search query. |

---

## 3. Key Conversion Events Configuration

In GA4, navigate to **Admin > Data Display > Events** and mark the following events as **Key Events** (Conversions):

| Event Name | Business Significance | Trigger Condition |
| :--- | :--- | :--- |
| **`generate_lead`** | **Primary Macro-Conversion** | Fires when a contact inquiry, demo booking, or batch registration is successfully accepted by the server. |
| **`whatsapp_click`** | **Primary Direct Lead** | Fires when student clicks the floating WhatsApp bubble or card WhatsApp CTA to start admission chat. |
| **`phone_click`** | **Direct Phone Call** | Fires when student clicks `tel:+918393042166` from header, footer, or counselor cards. |
| **`demo_request`** | **Free Trial Request** | Fires when a user completes the 2-day free demo class booking form. |
| **`enrollment_submit`** | **Cohort Registration** | Fires upon successful batch registration form completion. |

---

## 4. First-Party Attribution Storage

Marketing attribution parameters from Google Ads, Meta Ads, and organic referrers are captured upon arrival and held in client-side `sessionStorage` (`msk_attribution_session`):

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `referrer` (e.g. `google.com`, `instagram.com`)
- `landing_page` (e.g. `/courses/python-programming-masterclass`)
- `first_seen` (ISO timestamp)

When the user later submits a lead or clicks WhatsApp, the attribution data is attached to the conversion event payload, preserving multi-touch campaign attribution without exposing sensitive details.

---

## 5. Mandatory GA4 Administrative Settings

1. **Data Retention:**
   - Go to **Admin > Data Settings > Data Retention**.
   - Change **Event data retention** from default **2 months** to **14 months** (maximum allowed).
   - Save changes.
2. **Google Signals:**
   - Enable under **Data Settings > Data Collection** for cross-device reporting and demographic insights if compliant with local policies.
3. **Internal Traffic Filter:**
   - In **Data Streams > More Tagging Settings > Define internal traffic**, create rule for institute office static IP addresses to exclude internal development testing from conversion counts.
