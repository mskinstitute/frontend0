# MSK Institute Website — Production Deployment Checklist

**Production Domain:** https://www.mskinstitute.in/  
**Framework:** Next.js 15.5 (App Router), React 19, TypeScript 5.5, Tailwind CSS 4

---

## 1. Pre-Deployment Automated Verification

Run each command in sequence. Every command must exit with code 0:

- [ ] **Typecheck:**
  ```bash
  npm run typecheck
  ```
  *Expected Output:* Zero TypeScript compiler errors.

- [ ] **Course Data Validation:**
  ```bash
  npm run validate:courses
  ```
  *Expected Output:* `Validation PASSED: All course data is 100% integral and complete!` (66 courses).

- [ ] **Batch Data Validation:**
  ```bash
  npm run validate:batches
  ```
  *Expected Output:* `Validation PASSED: All batch data is 100% integral and complete!`.

- [ ] **Technical SEO Validation:**
  ```bash
  npm run validate:seo
  ```
  *Expected Output:* `SEO Validation PASSED: 100% compliant with Technical & Local SEO standards!`.

- [ ] **URL Integrity & Broken Link Audit:**
  ```bash
  npm run audit:urls
  ```
  *Expected Output:* `Audit PASSED: 0 broken internal links found!`.

- [ ] **Production Build Test:**
  ```bash
  npm run build
  ```
  *Expected Output:* All static pages successfully generated without errors.

---

## 2. Environment Variables Verification

Ensure the following environment variables are configured in the hosting environment (e.g., Vercel, VPS):

| Variable Name | Required | Recommended Production Value | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://www.mskinstitute.in` | Canonical website base URL |
| `NEXT_PUBLIC_GTM_ID` | Yes | `GTM-WTZ5VP6M` | Google Tag Manager Container ID |
| `NEXT_PUBLIC_GA_ID` | Optional | `G-6CQ1F72VS0` | Direct Google Analytics 4 ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | *(GSC token)* | Google Search Console HTML verification |

---

## 3. Server & DNS Configuration

- [ ] **DNS Uniformity:** Ensure apex domain `mskinstitute.in` permanently 301 redirects to `www.mskinstitute.in` at the DNS/CDN level (Cloudflare / Vercel Domain Settings).
- [ ] **SSL/TLS Certificate:** Active and valid for both `mskinstitute.in` and `www.mskinstitute.in`.
- [ ] **HTTP to HTTPS:** Enforce automatic HTTPS upgrade for all incoming requests.

---

## 4. Post-Deployment Smoke Test (Live URL Verification)

- [ ] Verify `https://www.mskinstitute.in/` loads with 200 OK.
- [ ] Verify `https://www.mskinstitute.in/robots.txt` points to `https://www.mskinstitute.in/sitemap.xml`.
- [ ] Verify `https://www.mskinstitute.in/sitemap.xml` returns valid XML containing all courses and tutorial lessons.
- [ ] Test legacy redirect: `https://www.mskinstitute.in/notes` redirects to `https://www.mskinstitute.in/study-material` with 301.
- [ ] Test course redirect: `https://www.mskinstitute.in/courses/full-stack-web-development` redirects to `https://www.mskinstitute.in/courses/full-stack-development`.
- [ ] Verify Certificate Verifier: Test verification with ID `MSK-2026-0001` on `/verify-certificate`.
- [ ] Verify GTM DataLayer: Inspect browser console `window.dataLayer` on page load to confirm `page_view` and zero PII.
- [ ] Verify WhatsApp Floating CTA: Confirm click triggers WhatsApp contact number `+918393042166`.
