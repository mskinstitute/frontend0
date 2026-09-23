# Google Tag Manager (GTM) Configuration Guide — MSK Institute

This guide provides step-by-step instructions for setting up your Google Tag Manager Web Container to capture every visitor interaction, course engagement, and lead conversion on **MSK Institute** ([https://www.mskinstitute.in/](https://www.mskinstitute.in/)).

---

## 1. Prerequisites & Account Setup

1. **GTM Account & Container:**
   - Account: `MSK Institute`
   - Container Name: `www.mskinstitute.in`
   - Container ID: **`GTM-WTZ5VP6M`** (Connected)
2. **Google Tag / GA4 Stream:**
   - Tag Name: `MSK Institute`
   - Tag IDs: **`G-6CQ1F72VS0`**, **`GT-WKT4G778`** (Connected)
3. Configured in your website environment:
   ```env
   NEXT_PUBLIC_GTM_ID="GTM-WTZ5VP6M"
   NEXT_PUBLIC_GA_ID="G-6CQ1F72VS0"
   ```

---

## 2. GTM Variables to Create

Navigate to **Variables > User-Defined Variables > New**:

| Variable Name | Variable Type | Data Layer Variable Name | Default Value |
|---|---|---|---|
| `dlv - course_id` | Data Layer Variable | `course_id` | *empty* |
| `dlv - course_name` | Data Layer Variable | `course_name` | *empty* |
| `dlv - course_category` | Data Layer Variable | `course_category` | *empty* |
| `dlv - course_duration` | Data Layer Variable | `course_duration` | *empty* |
| `dlv - course_price` | Data Layer Variable | `course_price` | `0` |
| `dlv - course_mode` | Data Layer Variable | `course_mode` | *empty* |
| `dlv - batch_id` | Data Layer Variable | `batch_id` | *empty* |
| `dlv - batch_name` | Data Layer Variable | `batch_name` | *empty* |
| `dlv - batch_start_date` | Data Layer Variable | `batch_start_date` | *empty* |
| `dlv - form_name` | Data Layer Variable | `form_name` | *empty* |
| `dlv - page_title` | Data Layer Variable | `page_title` | *empty* |
| `dlv - button_text` | Data Layer Variable | `button_text` | *empty* |
| `dlv - link_url` | Data Layer Variable | `link_url` | *empty* |
| `dlv - file_name` | Data Layer Variable | `file_name` | *empty* |
| `dlv - download_type` | Data Layer Variable | `download_type` | *empty* |
| `const - GA4 Measurement ID` | Constant | *Value:* `G-6CQ1F72VS0` | *N/A* |

---

## 3. GTM Triggers to Create

Navigate to **Triggers > New**:

| Trigger Name | Trigger Type | Event Name | Fires On |
|---|---|---|---|
| `Custom - page_view` | Custom Event | `page_view` | All Custom Events |
| `Custom - whatsapp_click` | Custom Event | `whatsapp_click` | All Custom Events |
| `Custom - phone_click` | Custom Event | `phone_click` | All Custom Events |
| `Custom - email_click` | Custom Event | `email_click` | All Custom Events |
| `Custom - form_start` | Custom Event | `form_start` | All Custom Events |
| `Custom - form_submit` | Custom Event | `form_submit` | All Custom Events |
| `Custom - generate_lead` | Custom Event | `generate_lead` | All Custom Events |
| `Custom - course_view` | Custom Event | `course_view` | All Custom Events |
| `Custom - course_enquiry` | Custom Event | `course_enquiry` | All Custom Events |
| `Custom - course_register` | Custom Event | `course_register` | All Custom Events |
| `Custom - batch_view` | Custom Event | `batch_view` | All Custom Events |
| `Custom - batch_register` | Custom Event | `batch_register` | All Custom Events |
| `Custom - file_download` | Custom Event | `file_download` | All Custom Events |

---

## 4. GTM Tags to Create

Navigate to **Tags > New**:

### Tag 1: Google Tag (GA4 Base Configuration)
- **Tag Name:** `GA4 - Google Tag Base`
- **Tag Type:** `Google Tag`
- **Tag ID:** `{{const - GA4 Measurement ID}}`
- **Configuration Settings:**
  - `send_page_view`: `false` (handled dynamically by SPA custom page_view trigger)
- **Trigger:** `Initialization - All Pages`
- **Testing Method:** Open GTM Preview mode and confirm Google Tag fires on container load.

---

### Tag 2: GA4 SPA Page View
- **Tag Name:** `GA4 - Event - page_view`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `page_view`
- **Event Parameters:**
  - `page_location`: `{{Page URL}}`
  - `page_path`: `{{Page Path}}`
  - `page_title`: `{{dlv - page_title}}` *(or simply remove this parameter row, as GA4 automatically reads document.title)*
> **Note on `page_title`:** GTM has **no** built-in variable named `Page Title` (it only has `Page URL`, `Page Hostname`, `Page Path`, and `Referrer`). Do NOT type `{{Page Title}}`. Either select the User-Defined Variable `{{dlv - page_title}}` created in Step 2, or delete the `page_title` parameter row completely.
- **Trigger:** `Custom - page_view`
- **Testing Method:** Click through routes (`/`, `/courses`, `/live-batches`) in GTM Preview mode and verify that `GA4 - Event - page_view` fires on each navigation without duplicate tags.

---

### Tag 3: WhatsApp Click Tracking
- **Tag Name:** `GA4 - Event - whatsapp_click`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `whatsapp_click`
- **Event Parameters:**
  - `button_text`: `{{dlv - button_text}}`
  - `course_name`: `{{dlv - course_name}}`
  - `link_url`: `{{dlv - link_url}}`
  - `page_location`: `{{Page URL}}`
- **Trigger:** `Custom - whatsapp_click`
- **Testing Method:** Click any WhatsApp CTA button or link on the site. Confirm the event fires with the button label and does not contain personal contact numbers.

---

### Tag 4: Phone Click Tracking
- **Tag Name:** `GA4 - Event - phone_click`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `phone_click`
- **Event Parameters:**
  - `button_text`: `{{dlv - button_text}}`
  - `page_location`: `{{Page URL}}`
- **Trigger:** `Custom - phone_click`
- **Testing Method:** Click any telephone link in the footer or contact section. Verify event fires and does not send phone numbers to GA4.

---

### Tag 5: Email Click Tracking
- **Tag Name:** `GA4 - Event - email_click`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `email_click`
- **Event Parameters:**
  - `button_text`: `{{dlv - button_text}}`
  - `page_location`: `{{Page URL}}`
- **Trigger:** `Custom - email_click`
- **Testing Method:** Click `mskshikohabad@gmail.com` link. Verify event fires without transmitting the email address string as parameter.

---

### Tag 6: Form Start Tracking
- **Tag Name:** `GA4 - Event - form_start`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `form_start`
- **Event Parameters:**
  - `form_name`: `{{dlv - form_name}}`
- **Trigger:** `Custom - form_start`
- **Testing Method:** Focus on the first field of the demo booking or batch enrollment form. Check GTM Preview for `form_start`.

---

### Tag 7: Verified Lead Generation (Primary Conversion)
- **Tag Name:** `GA4 - Event - generate_lead`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `generate_lead`
- **Event Parameters:**
  - `form_name`: `{{dlv - form_name}}`
  - `course_name`: `{{dlv - course_name}}`
  - `batch_id`: `{{dlv - batch_id}}`
  - `batch_name`: `{{dlv - batch_name}}`
- **Trigger:** `Custom - generate_lead`
- **Testing Method:** Complete a demo booking or batch enrollment test. Verify this tag fires **only** after the success toast appears, and confirm no student names or phone numbers are present in the payload.

---

### Tag 8: Course View Tracking
- **Tag Name:** `GA4 - Event - course_view`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `course_view`
- **Event Parameters:**
  - `course_id`: `{{dlv - course_id}}`
  - `course_name`: `{{dlv - course_name}}`
  - `course_category`: `{{dlv - course_category}}`
  - `course_duration`: `{{dlv - course_duration}}`
  - `course_price`: `{{dlv - course_price}}`
  - `course_mode`: `{{dlv - course_mode}}`
- **Trigger:** `Custom - course_view`
- **Testing Method:** Navigate to any course page (e.g. `/courses/python-programming-masterclass`). Verify in GTM Preview that `course_view` fires with dynamic course data.

---

### Tag 9: Course Enquiry Tracking
- **Tag Name:** `GA4 - Event - course_enquiry`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `course_enquiry`
- **Event Parameters:**
  - `course_name`: `{{dlv - course_name}}`
- **Trigger:** `Custom - course_enquiry`
- **Testing Method:** Submit a trial demo booking on a course page.

---

### Tag 10: Batch View Tracking
- **Tag Name:** `GA4 - Event - batch_view`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `batch_view`
- **Event Parameters:**
  - `batch_id`: `{{dlv - batch_id}}`
  - `batch_name`: `{{dlv - batch_name}}`
  - `course_name`: `{{dlv - course_name}}`
  - `batch_start_date`: `{{dlv - batch_start_date}}`
  - `course_price`: `{{dlv - course_price}}`
  - `course_mode`: `{{dlv - course_mode}}`
- **Trigger:** `Custom - batch_view`
- **Testing Method:** Navigate to any live batch page (e.g. `/live-batches/batch-python-mastery-beginner-to-advanced-3-months`).

---

### Tag 11: Batch Register Tracking
- **Tag Name:** `GA4 - Event - batch_register`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `batch_register`
- **Event Parameters:**
  - `batch_id`: `{{dlv - batch_id}}`
  - `batch_name`: `{{dlv - batch_name}}`
  - `course_name`: `{{dlv - course_name}}`
  - `batch_start_date`: `{{dlv - batch_start_date}}`
- **Trigger:** `Custom - batch_register`
- **Testing Method:** Submit the batch enrollment form and verify `batch_register` fires upon confirmation.

---

### Tag 12: File & Notes Download Tracking
- **Tag Name:** `GA4 - Event - file_download`
- **Tag Type:** `Google Analytics: GA4 Event`
- **Measurement ID:** `{{const - GA4 Measurement ID}}`
- **Event Name:** `file_download`
- **Event Parameters:**
  - `file_name`: `{{dlv - file_name}}`
  - `download_type`: `{{dlv - download_type}}`
- **Trigger:** `Custom - file_download`
- **Testing Method:** Click "Download PDF" on any cheatsheet or study material. Verify `file_download` fires with the file name.

---

## 5. Google Ads Conversion Linking (Free Feature)

If running Google Ads campaigns to promote MSK Institute batches in Shikohabad and Uttar Pradesh:
1. Create a **Conversion Linker** tag in GTM:
   - **Tag Name:** `Ads - Conversion Linker`
   - **Tag Type:** `Conversion Linker`
   - **Trigger:** `All Pages`
2. Link your GA4 account to your Google Ads account:
   - In **Google Ads > Tools & Settings > Linked Accounts > Google Analytics (GA4)**, connect your GA4 property.
   - Import `generate_lead`, `whatsapp_click`, `phone_click`, and `batch_register` as primary conversion actions.
   - Enable Enhanced Conversions for Leads without needing third-party paid tools.

---

## 6. How to Test Before Publishing Container

1. In GTM, click **Preview** in the top right corner.
2. Enter your development or staging URL (e.g. `http://localhost:3000` or `https://www.mskinstitute.in`).
3. Tag Assistant will open in a new tab with the debugger ribbon.
4. Perform key actions:
   - Route transitions -> Check `page_view`
   - View course -> Check `course_view`
   - Click WhatsApp -> Check `whatsapp_click`
   - Click phone -> Check `phone_click`
   - Submit trial demo -> Check `generate_lead`
5. Verify in the DataLayer tab that all values are populated and **zero PII** is displayed.
6. Once verified, click **Submit** in GTM to publish version 1.0 of your container.
