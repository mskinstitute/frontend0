# Google Search Console Setup & Property Strategy

**Property:** `https://www.mskinstitute.in/`  
**Brand:** MSK Institute (Mastering Software Knowledge)  
**Location:** Shikohabad, Uttar Pradesh, India  
**Date:** September 2026  
**Status:** Ready for Production Verification & Sitemap Ingestion  

---

## 1. Property Type Architecture

To ensure 100% visibility over indexing, crawl errors, and canonical search traffic, MSK Institute utilizes a two-tier Google Search Console (GSC) property strategy:

| Property Type | Target Identifier | Primary Purpose | Verification Method |
| :--- | :--- | :--- | :--- |
| **Domain Property (Recommended Primary)** | `mskinstitute.in` | Aggregates all subdomains (`www`, root, mobile, staging), protocols (`http`, `https`), and DNS-level crawl reporting. | DNS TXT Record via Domain Registrar (Namecheap / GoDaddy / Cloudflare). |
| **URL-Prefix Property (Operational Secondary)** | `https://www.mskinstitute.in/` | Direct integration with Google Analytics 4 (`G-6CQ1F72VS0`), URL Inspection API, Core Web Vitals field data, and XML Sitemap submission. | HTML Meta Tag / Next.js metadata verification. |

> [!IMPORTANT]
> **Canonical Domain Rule:** All traffic, internal links, and sitemaps resolve exclusively to `https://www.mskinstitute.in/`. The non-www domain (`https://mskinstitute.in`) redirects via permanent 301 to the `www` canonical.

---

## 2. Property Verification Procedure

### Method A: DNS TXT Record (Domain Property — `mskinstitute.in`)
1. Log into domain registrar / DNS provider for `mskinstitute.in`.
2. Add a new `TXT` record:
   - **Host / Name:** `@` (or `mskinstitute.in`)
   - **Type:** `TXT`
   - **TTL:** `3600` (or Automatic)
   - **Value:** `google-site-verification=<TOKEN_FROM_SEARCH_CONSOLE>`
3. Click **Verify** in Google Search Console.

### Method B: HTML Meta Tag (URL-Prefix Property — `https://www.mskinstitute.in`)
Next.js App Router root layout (`src/app/layout.tsx`) is dynamically configured to inject the Google Site Verification meta tag from environment variables:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  // ...
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};
```

1. Retrieve token string from GSC.
2. Add to `.env.local` or hosting provider environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-verification-token"
   ```
3. Deploy to production and verify in GSC.

---

## 3. Sitemap Submission

Submit the primary index sitemap in Search Console under **Sitemaps > Add a new sitemap**:

```text
URL: https://www.mskinstitute.in/sitemap.xml
```

### Sitemap Structure & Health
- **Endpoint:** `src/app/sitemap.ts` (dynamically builds at edge / build time)
- **Status:** 100% free of redirects, dead URLs, or non-canonical prefixes
- **Coverage:**
  - `https://www.mskinstitute.in/` (Priority: 1.0, daily)
  - `https://www.mskinstitute.in/courses` (Priority: 0.9, weekly)
  - 66 Canonical Course Landing Pages `/courses/[slug]` (Priority: 0.8, weekly)
  - `https://www.mskinstitute.in/live-batches` (Priority: 0.9, weekly)
  - `https://www.mskinstitute.in/contact` (Priority: 0.8, monthly)
  - `https://www.mskinstitute.in/study-material` (Priority: 0.8, weekly)
  - 1,400+ Interactive Tutorial Topics `/study-material/tutorials/[tutorialSlug]/[topicSlug]` (Priority: 0.7, monthly)
  - Total Indexed Endpoints: ~1,688 unique canonical pages.

---

## 4. Crawl Control & Robots.txt Verification

The robots configuration is maintained in `src/app/robots.ts` and outputs at `https://www.mskinstitute.in/robots.txt`:

```text
User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /certificate/preview/
Disallow: /offline
Disallow: /verify-certificate?*

Sitemap: https://www.mskinstitute.in/sitemap.xml
```

### Audit Rules Verified:
- [x] Admin routes (`/admin/`) disallowed from crawl budget.
- [x] Internal APIs (`/api/`) disallowed from indexation.
- [x] Query-string search parameters on certificate verification blocked from thin crawl duplication.
- [x] Redirected legacy route `/notes/` is disallowed/removed from sitemaps to prevent crawl waste.
- [x] Single canonical XML sitemap link explicitly declared.

---

## 5. Google Analytics 4 Search Console Link

To enable organic query data directly within GA4 reporting:
1. In Google Analytics 4, navigate to **Admin > Product Links > Search Console Links**.
2. Click **Link**.
3. Select the Search Console property: `https://www.mskinstitute.in/`.
4. Choose the active Web Data Stream: `MSK Institute Website Stream` (`G-6CQ1F72VS0`).
5. Review and Submit.
6. Verify under **Reports > Search Console > Queries / Google Organic Search Traffic**.
