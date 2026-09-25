# DataLayer Specification & Pipeline Engineering

**Website:** `https://www.mskinstitute.in`  
**Container:** `GTM-WTZ5VP6M`  
**Primary Engine:** `src/lib/analytics/dataLayer.ts`  
**Type Definitions:** `src/lib/analytics/types.ts`  

---

## 1. DataLayer Initialization & Execution Flow

MSK Institute implements a standardized Google Tag Manager dataLayer array on the `window` global object:

```typescript
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (command: string, ...args: any[]) => void;
  }
}
```

When an event is dispatched through `pushToDataLayer(event, params)`:
1. **Safety Check:** Verifies client-side environment (`typeof window !== 'undefined'`).
2. **Zero-PII Filter:** Executes `sanitizeAnalyticsParams(params)` to strip blacklisted PII keys and scan string values for pattern leaks.
3. **DataLayer Push:** Pushes `{ event: eventName, ...cleanParams }` to `window.dataLayer`.
4. **Direct GA4 Fallback:** If `window.gtag` is present, simultaneously forwards the event via `gtag('event', eventName, cleanParams)`.

---

## 2. Zero-PII Sanitization Engine

### Blacklisted Object Keys
The sanitizer inspects all keys recursively (case-insensitive) and removes any matching:

```typescript
const PII_KEYS = new Set([
  'name', 'fullname', 'full_name', 'student_name',
  'phone', 'mobile', 'telephone', 'phone_number', 'mobile_number',
  'email', 'email_address', 'password', 'query', 'message',
  'whatsapp_message', 'applicant_statement', 'note',
  'card', 'upi', 'token', 'aadhaar', 'address', 'street',
]);
```

### Regular Expression Scanners
Any string value that matches an email address pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) or telephone number pattern (`/^(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/`) is replaced with `"[REDACTED_PII]"`.

---

## 3. Rate-Limiting & Deduplication Engine

In high-interaction SPA environments, users may repeatedly click buttons or trigger multiple synthetic events. To guarantee clean GA4 reporting, `shouldDedupe(key, windowMs)` maintains an in-memory timestamp registry:

```typescript
const dedupeRegistry = new Map<string, number>();

export function shouldDedupe(key: string, windowMs = 400): boolean {
  const now = Date.now();
  const lastTime = dedupeRegistry.get(key) || 0;
  if (now - lastTime < windowMs) {
    return true; // Drop duplicate event
  }
  dedupeRegistry.set(key, now);
  return false;
}
```

### Configured Deduplication Windows
- `page_view`: Evaluated per unique URL path.
- `whatsapp_click`: 400ms per location and target.
- `phone_click`: 400ms per CTA location.
- `form_view`: 1,000ms per form name.
- `generate_lead`: 2,000ms per form name.
- `search`: 2,000ms per clean query term (debounced at UI layer by 600ms).
- `view_item_list`: 2,000ms per list name.

---

## 4. Attribution Context Layer

The attribution module (`src/lib/analytics/attribution.ts`) captures incoming campaign parameters on first arrival:

```typescript
export interface UtmAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
}
```

### Storage Mechanism
- Parameters are persisted in `window.sessionStorage` under key `msk_attribution_session`.
- First touch is preserved across the entire tab session.
- Submissions (`generate_lead`, `whatsapp_click`, `phone_click`) automatically merge this attribution context into their payload.
- Query parameters are never appended to URLs or exposed to third parties.

---

## 5. Backward Compatibility Layer

Existing legacy components importing from `@/lib/dataLayer` or `@/lib/tracking` are supported transparently:

```typescript
// src/lib/dataLayer.ts
export * from './analytics';

export function trackCourseEnquiry(data: Partial<{ ... }>): void {
  pushToDataLayer('course_enquiry', { ... });
}

export function trackBatchRegister(data: { ... }): void {
  pushToDataLayer('batch_register', { ... });
}
```

No legacy component breaks; all calls flow through the zero-PII sanitization and rate-limiting pipeline.
