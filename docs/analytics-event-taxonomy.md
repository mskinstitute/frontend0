# Analytics Event Taxonomy & Schema Reference

**Organization:** MSK Institute (Mastering Software Knowledge)  
**Location:** Shikohabad, UP, India  
**Target Systems:** GA4 (`G-6CQ1F72VS0`) & GTM (`GTM-WTZ5VP6M`)  
**Standard:** Google Analytics 4 Enhanced Ecommerce + Educational Admissions Funnel  
**Privacy:** Strict Zero-PII Policy  

---

## 1. Event Taxonomy Overview

| Event Name | Type | Funnel Stage | Primary Trigger Component | Deduplication Window |
| :--- | :--- | :--- | :--- | :--- |
| **`page_view`** | GA4 Standard | Awareness | `AnalyticsTracker.tsx` | Route transition |
| **`page_context`** | Custom MSK | System Context | `AnalyticsTracker.tsx` | Immediate |
| **`view_item_list`** | GA4 Ecommerce | Exploration | `CourseCatalogClient.tsx` | 2,000ms |
| **`select_item`** | GA4 Ecommerce | Interest | `CourseCatalogClient.tsx` | None |
| **`view_item`** | GA4 Ecommerce | Consideration | `CourseViewTracker.tsx` | Per course ID |
| **`batch_view`** | Custom MSK | Evaluation | `BatchViewTracker.tsx` | Per batch ID |
| **`batch_cta_click`** | Custom MSK | Intent | `LiveBatchesClient.tsx` | 500ms |
| **`whatsapp_click`** | Custom MSK | Direct Conversion | `FloatingWhatsAppCTA.tsx` | 400ms |
| **`phone_click`** | Custom MSK | Direct Conversion | `Footer.tsx` / `Navbar.tsx` | 400ms |
| **`email_click`** | Custom MSK | Direct Conversion | `ContactClient.tsx` | 400ms |
| **`form_view`** | Custom MSK | Consideration | Lead capture forms | 1,000ms |
| **`form_start`** | Custom MSK | Intent | Form first-field focus | Per form session |
| **`generate_lead`** | GA4 Standard | Macro-Conversion | Verified server submission | 2,000ms |
| **`demo_request`** | Custom MSK | Macro-Conversion | `DemoBookingForm.tsx` | 2,000ms |
| **`enrollment_start`** | Custom MSK | High-Intent | `BatchEnrollmentForm.tsx` | 1,000ms |
| **`enrollment_submit`**| Custom MSK | Macro-Conversion | `BatchEnrollmentForm.tsx` | 1,500ms |
| **`search`** | GA4 Standard | Discovery | Catalog / Tutorial search | 2,000ms (600ms debounce) |
| **`resource_download`**| Custom MSK | Engagement | Notes / Cheatsheet links | 500ms |
| **`certificate_verify`**| Custom MSK | Trust & Verification| `CertificateVerifier.tsx` | Per ID lookup |
| **`share`** | GA4 Standard | Viral Advocacy | `WebShareButton.tsx` | 500ms |

---

## 2. Event Payloads & Schema Specifications

### 1. `view_item_list` (GA4 Recommended)
Triggered when courses are displayed in the catalog or search results.
```json
{
  "event": "view_item_list",
  "item_list_name": "Course Catalog",
  "items": [
    {
      "item_id": "python-programming-masterclass",
      "item_name": "Python Programming Masterclass",
      "item_category": "Programming",
      "index": 1
    }
  ]
}
```

### 2. `select_item` (GA4 Recommended)
Triggered when a user clicks any course card or syllabus link.
```json
{
  "event": "select_item",
  "item_list_name": "Course Catalog",
  "items": [
    {
      "item_id": "full-stack-web-development-bootcamp",
      "item_name": "Full-Stack Web Development Bootcamp",
      "item_category": "Web Development",
      "index": 2
    }
  ]
}
```

### 3. `view_item` (GA4 Recommended)
Triggered on mounting a single course detail page (`/courses/[slug]`).
```json
{
  "event": "view_item",
  "currency": "INR",
  "value": 0,
  "course_id": "python-programming-masterclass",
  "course_slug": "python-programming-masterclass",
  "course_name": "Python Programming Masterclass",
  "course_category": "Programming",
  "course_duration": "3 MONTHS",
  "course_mode": "BOTH",
  "items": [
    {
      "item_id": "python-programming-masterclass",
      "item_name": "Python Programming Masterclass",
      "item_category": "Programming"
    }
  ]
}
```

### 4. `batch_view` (MSK Cohort Tracking)
Triggered when a live cohort batch detail card is viewed.
```json
{
  "event": "batch_view",
  "batch_id": "msk-py-2026-04",
  "batch_name": "Python Weekend Practical Lab Cohort",
  "course_name": "Python Programming Masterclass",
  "batch_status": "OPEN",
  "batch_start_date": "2026-04-12",
  "course_price": 4999,
  "mode": "OFFLINE",
  "page_type": "batch"
}
```

### 5. `whatsapp_click` (Direct Admission Lead)
Triggered when a user clicks the floating bubble or contextual WhatsApp button.
```json
{
  "event": "whatsapp_click",
  "button_text": "Book a Free Demo Class",
  "course_slug": "python-programming-masterclass",
  "course_name": "Python Programming Masterclass",
  "batch_id": "msk-py-2026-04",
  "page_type": "course_detail",
  "cta_location": "floating_button",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "shikohabad_coding_2026"
}
```

### 6. `phone_click` (Inbound Call Inquiry)
Triggered when a user taps a telephone CTA (`tel:+918393042166`).
```json
{
  "event": "phone_click",
  "button_text": "Call +91 83930 42166",
  "cta_location": "header",
  "page_type": "catalog",
  "utm_source": "direct"
}
```

### 7. `generate_lead` (Verified Macro Conversion)
Triggered ONLY after server responds with HTTP 200/201 and validated submission.
```json
{
  "event": "generate_lead",
  "form_name": "contact_us_form",
  "course_name": "Python Programming Masterclass",
  "learning_mode": "OFFLINE",
  "page_type": "contact",
  "cta_location": "contact_section",
  "utm_source": "facebook",
  "utm_medium": "social",
  "utm_campaign": "summer_batches"
}
```

### 8. `demo_request` (Free 2-Day Trial Booking)
Triggered when student registers for a free trial class.
```json
{
  "event": "demo_request",
  "course_name": "Full-Stack Web Development Bootcamp",
  "preferred_date": "2026-04-15",
  "cta_location": "modal",
  "page_type": "course_detail"
}
```

### 9. `search` (Internal Catalog / Knowledge Search)
Triggered when user searches across courses or tutorials (debounced 600ms).
```json
{
  "event": "search",
  "search_term": "python loops",
  "search_category": "tutorials",
  "results_count": 8
}
```

### 10. `certificate_verify` (Certificate Authentication)
Triggered when a student, recruiter, or college verifies a certificate ID.
```json
{
  "event": "certificate_verify",
  "certificate_id_hash": "c8a4b2...",
  "status": "VALID",
  "page_type": "general"
}
```

---

## 3. Strict Zero-PII Policy

Under no circumstances may any of the following fields be pushed to the dataLayer, transmitted to GA4, or appended to URL parameters:

```text
PROHIBITED PII ATTRIBUTES:
- Student Name / Full Name
- Phone Number / Mobile Number
- Email Address
- Passwords or Secret Keys
- Personal Identity Numbers (Aadhaar, PAN)
- Payment card / UPI details
- Raw inquiry message bodies or freeform feedback
```

The sanitizer in `src/lib/analytics/dataLayer.ts` automatically drops these attributes recursively before any event dispatch occurs.
