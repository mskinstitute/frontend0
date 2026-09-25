# Google Tag Manager (GTM) Container Specification

**Container ID:** `GTM-WTZ5VP6M`  
**Container Type:** Web  
**Primary Destination:** Google Analytics 4 (`G-6CQ1F72VS0`)  
**Architecture:** Next.js 15 App Router (`src/components/GoogleTagManager.tsx`)  

---

## 1. GTM Implementation in Next.js

MSK Institute integrates GTM using standard Next.js `<Script>` components with `afterInteractive` execution to maintain top performance without blocking First Contentful Paint (FCP):

### `<head>` Script Injection
Located in `src/components/GoogleTagManager.tsx` and mounted in `src/app/layout.tsx`:

```tsx
<Script
  id="gtm-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
  }}
/>
```

### `<body>` NoScript Fallback
Immediately following the opening `<body>` tag:

```tsx
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
    height="0"
    width="0"
    style={{ display: 'none', visibility: 'hidden' }}
  />
</noscript>
```

---

## 2. GTM Variable Configuration

Create the following **Data Layer Variables** in GTM under **Variables > User-Defined Variables > New > Data Layer Variable**:

| Variable Name in GTM | Data Layer Variable Name | Description |
| :--- | :--- | :--- |
| `dlv - course_name` | `course_name` | Title of course interacted with |
| `dlv - course_id` | `course_id` | Unique ID / slug of course |
| `dlv - course_category` | `course_category` | Primary category of course |
| `dlv - course_price` | `course_price` | Price/fee for course |
| `dlv - course_mode` | `course_mode` | Delivery mode (`ONLINE`, `OFFLINE`, `BOTH`) |
| `dlv - batch_id` | `batch_id` | Batch ID (e.g. `msk-py-2026-04`) |
| `dlv - batch_name` | `batch_name` | Title of live batch |
| `dlv - cta_location` | `cta_location` | Source element (`header`, `footer`, `floating_button`, `hero`, `modal`) |
| `dlv - form_name` | `form_name` | Form identifier (`contact_us_form`, `demo_booking`, `batch_enrollment`) |
| `dlv - search_term` | `search_term` | Search string entered by user |
| `dlv - page_type` | `page_type` | Page category (`catalog`, `course_detail`, `batch`, `contact`, `home`) |
| `dlv - utm_source` | `utm_source` | Attribution traffic source |
| `dlv - utm_medium` | `utm_medium` | Attribution medium |
| `dlv - utm_campaign` | `utm_campaign` | Attribution campaign name |

---

## 3. GTM Trigger Configuration

Configure **Custom Event Triggers** in GTM under **Triggers > New > Custom Event**:

| Trigger Name in GTM | Event Name | Trigger Condition |
| :--- | :--- | :--- |
| `CE - view_item_list` | `view_item_list` | All Custom Events |
| `CE - select_item` | `select_item` | All Custom Events |
| `CE - view_item` | `view_item` | All Custom Events |
| `CE - batch_view` | `batch_view` | All Custom Events |
| `CE - batch_cta_click` | `batch_cta_click` | All Custom Events |
| `CE - whatsapp_click` | `whatsapp_click` | All Custom Events |
| `CE - phone_click` | `phone_click` | All Custom Events |
| `CE - generate_lead` | `generate_lead` | All Custom Events |
| `CE - demo_request` | `demo_request` | All Custom Events |
| `CE - enrollment_submit` | `enrollment_submit` | All Custom Events |
| `CE - search` | `search` | All Custom Events |
| `CE - resource_download` | `resource_download` | All Custom Events |
| `CE - certificate_verify` | `certificate_verify` | All Custom Events |

---

## 4. GTM Tag Configuration (GA4 Event Tags)

Configure the following tags in GTM to route DataLayer pushes into Google Analytics 4:

### 1. GA4 Configuration Tag
- **Tag Type:** Google Tag
- **Tag ID:** `G-6CQ1F72VS0`
- **Trigger:** Initialization - All Pages

### 2. GA4 Event — `generate_lead`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `generate_lead`
- **Event Parameters:**
  - `form_name`: `{{dlv - form_name}}`
  - `course_name`: `{{dlv - course_name}}`
  - `course_mode`: `{{dlv - course_mode}}`
  - `batch_id`: `{{dlv - batch_id}}`
  - `cta_location`: `{{dlv - cta_location}}`
  - `utm_source`: `{{dlv - utm_source}}`
- **Trigger:** `CE - generate_lead`

### 3. GA4 Event — `whatsapp_click`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `whatsapp_click`
- **Event Parameters:**
  - `cta_location`: `{{dlv - cta_location}}`
  - `course_name`: `{{dlv - course_name}}`
  - `batch_id`: `{{dlv - batch_id}}`
  - `utm_source`: `{{dlv - utm_source}}`
- **Trigger:** `CE - whatsapp_click`

### 4. GA4 Event — `phone_click`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `phone_click`
- **Event Parameters:**
  - `cta_location`: `{{dlv - cta_location}}`
  - `page_type`: `{{dlv - page_type}}`
- **Trigger:** `CE - phone_click`

### 5. GA4 Event — `view_item`
- **Tag Type:** Google Analytics: GA4 Event
- **Event Name:** `view_item`
- **Event Parameters:**
  - `items`: `{{dlv - items}}`
  - `course_id`: `{{dlv - course_id}}`
  - `course_name`: `{{dlv - course_name}}`
  - `course_category`: `{{dlv - course_category}}`
- **Trigger:** `CE - view_item`

---

## 5. Preview & Testing Procedure

1. Open Google Tag Manager and click **Preview** in the top right corner.
2. Enter target URL: `https://www.mskinstitute.in/courses`.
3. In **Tag Assistant** (`tagassistant.google.com`), verify:
   - Container `GTM-WTZ5VP6M` connects successfully.
   - On clicking a course card: `select_item` fires.
   - On opening a course page: `view_item` fires with correct `course_name`.
   - On submitting a test enquiry: `generate_lead` fires with **zero PII**.
   - On clicking the floating WhatsApp button: `whatsapp_click` fires with `cta_location: 'floating_button'`.
4. Click **Submit** in GTM to publish version with descriptive release notes.
