# MSK Institute — Complete Google Tag Manager (GTM) Configuration Guide

**Container ID:** `GTM-WTZ5VP6M`  
**Target GA4 Measurement ID:** `G-6CQ1F72VS0`  
**Container:** `www.mskinstitute.in`  

---

## 1. Existing Setup Analysis (From Screenshots)

| Section | Currently in GTM | Status |
|---|---|---|
| **Google Tag** | `GA4 - Google Tag Base` | Active on All Pages |
| **Active Event Tags** | `page_view`, `course_view`, `batch_view`, `batch_register`, `course_enquiry`, `generate_lead`, `form_start`, `whatsapp_click`, `phone_click`, `email_click`, `file_download` (11 tags) | Active |
| **Orphan Triggers** | `Custom - course_register`, `Custom - form_submit` | **0 Tags Attached** (Needs tags) |
| **Existing Variables** | 15 variables (`batch_id`, `batch_name`, `batch_start_date`, `button_text`, `course_category`, `course_duration`, `course_id`, `course_mode`, `course_name`, `course_price`, `download_type`, `file_name`, `form_name`, `link_url`, `const - GA4 Measurement ID`) | Working |

---

## 2. New Variables to Add in GTM

Navigate to **Variables** > **User-Defined Variables** > **New**.  
Choose **Variable Type:** `Data Layer Variable`.

### A. Multi-Branch & Campus Variables (Phase 5)

| Variable Name in GTM | Data Layer Variable Name | Data Layer Version | Description |
|---|---|---|---|
| `dlv - branch_id` | `branch_id` | Version 2 | Campus ID (e.g. `branch-shikohabad-001`) |
| `dlv - branch_slug` | `branch_slug` | Version 2 | Campus URL slug (e.g. `shikohabad`, `agra`) |
| `dlv - branch_name` | `branch_name` | Version 2 | Campus Name (e.g. `MSK Institute Shikohabad`) |
| `dlv - branch_status` | `branch_status` | Version 2 | Status (`OPEN`, `COMING_SOON`) |
| `dlv - city` | `city` | Version 2 | City name (e.g. `Shikohabad`, `Agra`) |
| `dlv - cta_type` | `cta_type` | Version 2 | Action type (`direction`, `whatsapp`, `phone`) |

### B. Navigation, CTA Location & Funnel Context

| Variable Name in GTM | Data Layer Variable Name | Data Layer Version | Description |
|---|---|---|---|
| `dlv - cta_location` | `cta_location` | Version 2 | Where button was clicked (`header`, `hero`, `footer`, `course_card`, `floating_button`) |
| `dlv - page_type` | `page_type` | Version 2 | Page category (`course`, `batch`, `location`, `blog`, `tutorial`, `home`) |
| `dlv - lead_type` | `lead_type` | Version 2 | Type of lead (`demo_request`, `batch_enrollment`, `contact_form`) |
| `dlv - cta_text` | `cta_text` | Version 2 | Text on CTA button (`Join Live Batch`, etc.) |

### C. Search & Interactive Tools

| Variable Name in GTM | Data Layer Variable Name | Data Layer Version | Description |
|---|---|---|---|
| `dlv - search_term` | `search_term` | Version 2 | Search query typed by user |
| `dlv - results_count` | `results_count` | Version 2 | Number of search results found |
| `dlv - search_category` | `search_category` | Version 2 | Active filter in search modal |
| `dlv - is_valid` | `is_valid` | Version 2 | Boolean flag for certificate verification |
| `dlv - destination` | `destination` | Version 2 | Outbound click target (e.g. `google_maps`) |

### D. Educational Tutorials

| Variable Name in GTM | Data Layer Variable Name | Data Layer Version | Description |
|---|---|---|---|
| `dlv - tutorial_slug` | `tutorial_slug` | Version 2 | Tutorial track slug (`html5-complete-course`) |
| `dlv - topic_slug` | `topic_slug` | Version 2 | Specific lesson slug |
| `dlv - lesson_title` | `lesson_title` | Version 2 | Lesson heading |

---

## 3. New Triggers to Add in GTM

Navigate to **Triggers** > **New**.  
Choose **Trigger Type:** `Custom Event`.

| Trigger Name in GTM | Event Name | This trigger fires on |
|---|---|---|
| `Custom - branch_view` | `branch_view` | All Custom Events |
| `Custom - branch_cta_click` | `branch_cta_click` | All Custom Events |
| `Custom - search` | `search` | All Custom Events |
| `Custom - certificate_verify` | `certificate_verify` | All Custom Events |
| `Custom - tutorial_view` | `tutorial_view` | All Custom Events |
| `Custom - batch_cta_click` | `batch_cta_click` | All Custom Events |
| `Custom - outbound_click` | `outbound_click` | All Custom Events |

*(Note: `Custom - form_submit` and `Custom - course_register` are already present in your Triggers tab).*

---

## 4. New Tags to Add in GTM

Navigate to **Tags** > **New**.  
- **Tag Type:** `Google Analytics: GA4 Event`  
- **Measurement ID:** `{{const - GA4 Measurement ID}}` (or select `GA4 - Google Tag Base`)

---

### Tag 1: Form Submit (Connects your existing orphan trigger)
- **Tag Name:** `GA4 - Event - form_submit`
- **Event Name:** `form_submit`
- **Firing Trigger:** `Custom - form_submit`
- **Event Parameters:**
  - `form_name` ➔ `{{dlv - form_name}}`
  - `course_name` ➔ `{{dlv - course_name}}`
  - `batch_id` ➔ `{{dlv - batch_id}}`
  - `page_type` ➔ `{{dlv - page_type}}`

---

### Tag 2: Course Register (Connects your existing orphan trigger)
- **Tag Name:** `GA4 - Event - course_register`
- **Event Name:** `course_register`
- **Firing Trigger:** `Custom - course_register`
- **Event Parameters:**
  - `course_id` ➔ `{{dlv - course_id}}`
  - `course_name` ➔ `{{dlv - course_name}}`
  - `course_price` ➔ `{{dlv - course_price}}`
  - `course_mode` ➔ `{{dlv - course_mode}}`

---

### Tag 3: Branch / Campus Page View (Phase 5)
- **Tag Name:** `GA4 - Event - branch_view`
- **Event Name:** `branch_view`
- **Firing Trigger:** `Custom - branch_view`
- **Event Parameters:**
  - `branch_id` ➔ `{{dlv - branch_id}}`
  - `branch_slug` ➔ `{{dlv - branch_slug}}`
  - `branch_name` ➔ `{{dlv - branch_name}}`
  - `city` ➔ `{{dlv - city}}`
  - `branch_status` ➔ `{{dlv - branch_status}}`
  - `page_type` ➔ `{{dlv - page_type}}`

---

### Tag 4: Branch CTA Action (Directions, WhatsApp, Phone, Courses)
- **Tag Name:** `GA4 - Event - branch_cta_click`
- **Event Name:** `branch_cta_click`
- **Firing Trigger:** `Custom - branch_cta_click`
- **Event Parameters:**
  - `branch_slug` ➔ `{{dlv - branch_slug}}`
  - `branch_id` ➔ `{{dlv - branch_id}}`
  - `cta_type` ➔ `{{dlv - cta_type}}`
  - `button_text` ➔ `{{dlv - button_text}}`

---

### Tag 5: Site Search Execution
- **Tag Name:** `GA4 - Event - search`
- **Event Name:** `search`
- **Firing Trigger:** `Custom - search`
- **Event Parameters:**
  - `search_term` ➔ `{{dlv - search_term}}`
  - `results_count` ➔ `{{dlv - results_count}}`
  - `search_category` ➔ `{{dlv - search_category}}`

---

### Tag 6: Certificate Verification Check
- **Tag Name:** `GA4 - Event - certificate_verify`
- **Event Name:** `certificate_verify`
- **Firing Trigger:** `Custom - certificate_verify`
- **Event Parameters:**
  - `is_valid` ➔ `{{dlv - is_valid}}`
  - `page_type` ➔ `{{dlv - page_type}}`

---

### Tag 7: Tutorial Lesson View
- **Tag Name:** `GA4 - Event - tutorial_view`
- **Event Name:** `tutorial_view`
- **Firing Trigger:** `Custom - tutorial_view`
- **Event Parameters:**
  - `tutorial_slug` ➔ `{{dlv - tutorial_slug}}`
  - `topic_slug` ➔ `{{dlv - topic_slug}}`
  - `lesson_title` ➔ `{{dlv - lesson_title}}`
  - `course_name` ➔ `{{dlv - course_name}}`

---

### Tag 8: Batch CTA Button Click
- **Tag Name:** `GA4 - Event - batch_cta_click`
- **Event Name:** `batch_cta_click`
- **Firing Trigger:** `Custom - batch_cta_click`
- **Event Parameters:**
  - `batch_id` ➔ `{{dlv - batch_id}}`
  - `batch_name` ➔ `{{dlv - batch_name}}`
  - `cta_location` ➔ `{{dlv - cta_location}}`
  - `cta_text` ➔ `{{dlv - cta_text}}`

---

### Tag 9: Outbound & Google Maps Clicks
- **Tag Name:** `GA4 - Event - outbound_click`
- **Event Name:** `outbound_click`
- **Firing Trigger:** `Custom - outbound_click`
- **Event Parameters:**
  - `destination` ➔ `{{dlv - destination}}`
  - `link_url` ➔ `{{dlv - link_url}}`
  - `cta_location` ➔ `{{dlv - cta_location}}`
  - `button_text` ➔ `{{dlv - button_text}}`

---

## 5. Existing Tags Enhancement (Recommended)

In your existing tags, you can add these parameters to get richer reports:

| Existing Tag Name | Recommended Parameters to Add |
|---|---|
| `GA4 - Event - whatsapp_click` | `cta_location` ➔ `{{dlv - cta_location}}`<br>`branch_id` ➔ `{{dlv - branch_id}}`<br>`branch_slug` ➔ `{{dlv - branch_slug}}` |
| `GA4 - Event - phone_click` | `cta_location` ➔ `{{dlv - cta_location}}`<br>`branch_id` ➔ `{{dlv - branch_id}}`<br>`branch_slug` ➔ `{{dlv - branch_slug}}` |
| `GA4 - Event - email_click` | `cta_location` ➔ `{{dlv - cta_location}}`<br>`branch_id` ➔ `{{dlv - branch_id}}` |
| `GA4 - Event - generate_lead` | `lead_type` ➔ `{{dlv - lead_type}}`<br>`branch_id` ➔ `{{dlv - branch_id}}`<br>`branch_slug` ➔ `{{dlv - branch_slug}}` |

---

## 6. Verification in GTM Preview Mode

1. Click **Preview** in GTM top-right.
2. Enter `https://www.mskinstitute.in` (or `http://localhost:3000`).
3. In Tag Assistant:
   - Navigate to `/locations/shikohabad` ➔ `branch_view` fires!
   - Click "Open in Google Maps" ➔ `branch_cta_click` & `outbound_click` fire!
   - Click WhatsApp icon ➔ `whatsapp_click` fires with `cta_location: floating_button`!
   - Open Search (Cmd+K) & type ➔ `search` fires!
   - Verify a Certificate ➔ `certificate_verify` fires!
4. Once verified, click **Submit** in GTM to publish the container changes.
