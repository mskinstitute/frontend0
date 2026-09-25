# MSK Institute Website — Analytics & Conversion Tracking Architecture

**Implementation Files:** `src/lib/dataLayer.ts`, `src/lib/tracking.ts`, `src/components/GoogleTagManager.tsx`  
**GTM Container ID:** `GTM-WTZ5VP6M`  
**GA4 Measurement ID:** `G-6CQ1F72VS0`  
**Privacy Policy:** Zero PII transmission, client-side deduplication, structured parameters

---

## 1. Privacy Guarantees & PII Scrubbing
Before any payload is pushed to `window.dataLayer` or passed to `window.gtag`, it passes through `sanitizeAnalyticsParams()`:
- **Disallowed Keys Filtered:** `name`, `fullname`, `phone`, `mobile`, `email`, `password`, `message`, `whatsapp_message`, `card`, `upi`, `token`.
- **Pattern Stripping:** Any string value matching email addresses (`EMAIL_REGEX`) or phone numbers (`PHONE_REGEX`) is automatically discarded.
- **Render Deduplication:** Memory cache prevents duplicate event triggers within a 400ms React re-render window.

---

## 2. Event Specification & Parameters Table

| Event Name | Trigger Location / User Action | Required Parameters | Example Payload |
|---|---|---|---|
| `page_view` | Route change in App Router | `page_path`, `page_title` | `{ event: "page_view", page_path: "/courses/python-mastery-beginner-to-advanced--3-months", page_title: "Python Programming in Shikohabad" }` |
| `course_view` | Course detail page load | `course_id`, `course_name`, `course_category`, `course_price` | `{ event: "course_view", course_id: "course-python-mastery-beginner-to-advanced--3-months", course_name: "Python Mastery", course_price: 2999 }` |
| `batch_view` | Live batch detail page load | `batch_id`, `batch_name`, `batch_start_date`, `course_price` | `{ event: "batch_view", batch_id: "batch-python-mastery-3-months", batch_start_date: "2026-10-01" }` |
| `enrollment_start` | Focus on first field in batch enrollment form | `batch_id`, `batch_name`, `course_name` | `{ event: "enrollment_start", batch_id: "batch-mern-full-stack", batch_name: "Full-Stack MERN" }` |
| `enrollment_submit` | Batch enrollment form submitted successfully | `batch_id`, `batch_name`, `course_name`, `course_price`, `course_mode` | `{ event: "enrollment_submit", batch_id: "batch-mern-full-stack", course_price: "₹4,999", course_mode: "BOTH" }` |
| `demo_request` | Demo booking form submitted successfully | `course_name`, `preferred_date` | `{ event: "demo_request", course_name: "Python Programming Mastery", preferred_date: "2026-10-05" }` |
| `generate_lead` | Verified completion of any lead capture flow | `form_name`, `course_name` or `batch_id` | `{ event: "generate_lead", form_name: "batch_enrollment", batch_id: "batch-python-mastery-3-months" }` |
| `whatsapp_click` | Click on any official WhatsApp CTA | `button_text`, `course_name`, `link_url` | `{ event: "whatsapp_click", button_text: "WhatsApp Contact", course_name: "Python Programming" }` |
| `phone_click` | Click on phone call link (`tel:`) | `button_text` | `{ event: "phone_click", button_text: "Call Admissions" }` |
| `email_click` | Click on email link (`mailto:`) | `button_text` | `{ event: "email_click", button_text: "Email Us" }` |
| `note_download` | Free note or cheatsheet PDF downloaded | `file_name` | `{ event: "note_download", file_name: "Python Complete Cheatsheet" }` |
| `tutorial_view` | Tutorial lesson mounted in reader | `tutorial_slug`, `topic_slug`, `lesson_title`, `course_name` | `{ event: "tutorial_view", tutorial_slug: "python-for-beginners", topic_slug: "vscode-setup", lesson_title: "VS Code Setup" }` |
| `certificate_verify` | Certificate ID searched in verifier | `is_valid` | `{ event: "certificate_verify", is_valid: true }` |

---

## 3. Google Tag Manager (GTM) Configuration
- **Script Injection:** Implemented in `src/components/GoogleTagManager.tsx` using `next/script` with `strategy="afterInteractive"`.
- **NoScript Fallback:** Rendered in `src/app/layout.tsx` for non-JS web browsers.
- **Admin Offline Review:** The last 100 events are cached in `localStorage['msk_analytics_events']` for in-browser verification on `/admin`.
