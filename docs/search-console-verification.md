# Search Console Ownership Verification Playbook

**Target Property:** `https://www.mskinstitute.in/` & `mskinstitute.in`  
**Brand:** MSK Institute  
**Platform:** Next.js 15 (App Router, SSG/SSR)  
**Container:** Google Tag Manager (`GTM-WTZ5VP6M`) | GA4 (`G-6CQ1F72VS0`)  

---

## 1. Supported Verification Methods Matrix

| Method | Target Property | Implementation Effort | Resilience | Recommended |
| :--- | :--- | :--- | :--- | :--- |
| **DNS TXT Record** | Domain (`mskinstitute.in`) | Low (DNS Registrar) | Highest (Survives site redeployments) | **Primary (Method 1)** |
| **HTML Meta Tag** | URL-Prefix (`https://www.mskinstitute.in/`) | Low (Env Var `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) | High | **Secondary (Method 2)** |
| **Google Tag Manager** | URL-Prefix | None (GTM container already embedded in `<head>`) | Medium | **Fallback (Method 3)** |
| **Google Analytics 4** | URL-Prefix | None (`gtag.js` active in `<head>`) | Medium | **Fallback (Method 4)** |
| **HTML File Upload** | URL-Prefix | Low (Place `google<token>.html` in `/public`) | High | **Alternative (Method 5)** |

---

## 2. Step-by-Step Implementation Guides

### Method 1: DNS TXT Verification (Domain Property — Recommended)
1. In Search Console, select **Add Property** and choose **Domain** with value: `mskinstitute.in`.
2. GSC provides a verification TXT record:
   ```text
   google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. Open DNS Management (Cloudflare / Hostinger / GoDaddy):
   - **Type:** `TXT`
   - **Name:** `@` (or leave empty depending on host)
   - **Content:** `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - **TTL:** `Auto` or `300`
4. Wait 2–5 minutes for DNS propagation, then click **Verify** in GSC.

---

### Method 2: HTML Meta Tag Verification (URL-Prefix Property)
The website's root layout (`src/app/layout.tsx`) dynamically renders Google's verification tag:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  // ...
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};
```

1. Copy the token string from GSC (e.g. `AbCdEfG1234567890`).
2. Add to `.env.local` or production environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="AbCdEfG1234567890"
   ```
3. Trigger a production build/deployment. The resulting HTML `<head>` will include:
   ```html
   <meta name="google-site-verification" content="AbCdEfG1234567890" />
   ```
4. Click **Verify** in Search Console.

---

### Method 3: Google Tag Manager (GTM) Container Verification
MSK Institute has GTM Container `GTM-WTZ5VP6M` installed in `src/app/layout.tsx`:
- `<script>` snippet in `<head>` (via Next.js `Script` with `afterInteractive` strategy).
- `<noscript>` iframe snippet immediately after `<body>` opening tag.

**Requirement:** The Google account attempting verification must possess **Publish** or **Admin** permissions on GTM container `GTM-WTZ5VP6M`. If permissions are met, simply click **Verify via Google Tag Manager**.

---

### Method 4: Google Analytics (GA4) Tracking Tag Verification
GA4 Measurement ID `G-6CQ1F72VS0` is initialized in `<head>` via `src/components/Analytics.tsx`.
**Requirement:** The Google account attempting verification must have **Edit** permission on the GA4 property. Click **Verify via Google Analytics**.

---

### Method 5: HTML Verification File Upload
1. Download the verification file provided by GSC (e.g., `google1a2b3c4d5e6f.html`).
2. Move the file into the repository's `public/` directory:
   ```bash
   cp ~/Downloads/google1a2b3c4d5e6f.html public/
   ```
3. Next.js statically serves any file in `/public` at the root path:
   `https://www.mskinstitute.in/google1a2b3c4d5e6f.html`
4. Deploy and verify.

---

## 3. Verification Troubleshooting & Safeguards

| Symptom | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Could not find verification meta tag"** | SSR/Edge cache serving previous build, or environment variable not loaded during `next build`. | Ensure `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set in production deployment settings. Clear CDN / Cloudflare cache. |
| **"Verification file redirects"** | Non-www to www redirect chain on root files or trailing slash rewrite. | Ensure the URL tested is `https://www.mskinstitute.in/google[hash].html` (with www). Public files bypass trailing slash redirects. |
| **"Verification failed: Connection timed out"** | Strict firewall or bot protection blocking Googlebot verification user-agent. | Check Cloudflare WAF or host security rules. Allow Google Verification user agents. |
| **"Permissions lost after 30 days"** | DNS record deleted during DNS transfer or meta tag removed during codebase refactor. | Keep DNS TXT record permanently in DNS records. Add automated check to `scripts/validate-seo.js`. |
