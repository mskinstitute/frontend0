# MSK Institute — Branch Analytics & Telemetry (Phase 5)

## 1. Overview

The analytics architecture developed in Phase 2 has been systematically expanded to support multi-branch and franchise performance attribution.

Every user interaction on `/locations` or `/locations/[city]` carries first-party location attribution into Google Tag Manager (GTM) and Google Analytics 4 (GA4) without collecting Personally Identifiable Information (PII).

---

## 2. Event Taxonomy Expansion

### 2.1 New Events

| Event Name | Trigger | Payload Parameters |
|---|---|---|
| `branch_view` | When a user views `/locations/[city]` | `branch_id`, `branch_slug`, `branch_name`, `branch_status`, `branch_city`, `courses_count`, `batches_count` |
| `branch_cta_click` | When a user clicks a branch CTA (Call, WhatsApp, Get Directions, Course Filter) | `branch_id`, `branch_slug`, `branch_name`, `cta_name`, `cta_location`, `link_url` |

### 2.2 Enriched Conversion Events
Existing conversion tracking methods automatically ingest active branch context:

- `trackWhatsAppClick(payload)`: Attaches `branch_id` and `branch_slug`.
- `trackPhoneClick(payload)`: Attaches `branch_id` and `branch_slug`.
- `trackEmailClick(payload)`: Attaches `branch_id` and `branch_slug`.
- `trackGenerateLead(payload)`: Attaches `branch_id` and `branch_slug`.
- `trackBatchView(payload)`: Attaches `branch_id` and `branch_slug` when a batch is held at a physical campus.
- `trackBatchCtaClick(payload)`: Attaches `branch_id` and `branch_slug`.

---

## 3. DataLayer Payload Example

```javascript
window.dataLayer.push({
  event: 'branch_view',
  branch_id: 'branch-shikohabad-001',
  branch_slug: 'shikohabad',
  branch_name: 'MSK Institute Shikohabad',
  branch_status: 'OPEN',
  branch_city: 'Shikohabad',
  courses_count: 66,
  batches_count: 4,
  page_type: 'location',
  timestamp: 1787736900000
});
```

---

## 4. Privacy & Zero-PII Compliance

- **No Student Data in DataLayer:** Names, phone numbers, email addresses, and form text fields are strictly stripped before event dispatch via `sanitizePayload()`.
- **First-Party Attribution:** Preserves UTM parameters and referrer across campus pages for lead conversion attribution.
