# Local SEO & NAP Consistency Audit

**Business Entity:** MSK Institute (Mastering Software Knowledge)  
**Primary Market:** Shikohabad, Firozabad District, Uttar Pradesh, India  
**Postal Code:** 283135  
**Audit Date:** September 2026  
**Validator Script:** `scripts/validate-local.js` (`npm run validate:local`)  
**Status:** **100% UNIFIED & VERIFIED**  

---

## 1. Canonical NAP Baseline (Single Source of Truth)

To rank effectively in Google's Local 3-Pack and Google Maps, all digital references must match the exact standard format:

| NAP Field | Canonical Specification | Permitted Format Variants | Disallowed / Legacy Variants |
| :--- | :--- | :--- | :--- |
| **Business Name** | **MSK Institute** | MSK Institute of Technology & Coding, MSK Computer Training & Coding Academy | "MSK Tech", "MSK Coaching" |
| **Street Address**| **Gali No. 3, Near Gyan Jyoti Public School** | Gali No. 3, Near Gyan Jyoti Public School, Station Road | Incomplete street names without Gali No. 3 |
| **Locality (City)**| **Shikohabad** | Shikohabad | "Sko", "SKB" abbreviations |
| **District** | **Firozabad** | Firozabad District | None |
| **State / Region** | **Uttar Pradesh** | UP, Uttar Pradesh | Incomplete state names |
| **Postal Code** | **283135** | 283135 | Any 6-digit variant other than 283135 |
| **Country** | **India** | IN, India | None |
| **Phone Number** | **+91 83930 42166** | `+91-8393042166`, `+918393042166`, `083930 42166` | Old or personal unmonitored numbers |
| **Email Address** | **mskshikohabad@gmail.com** | `mskshikohabad@gmail.com` | Personal Gmail accounts |
| **Geo Coordinates**| **27.1157743, 78.5829716** | Latitude: `27.1157743`, Longitude: `78.5829716` | Approximations deviating from campus pin |
| **Google Maps Pin**| `https://maps.google.com/?q=MSK+Institute+Shikohabad` | Clean search query query-string | Redirect links or shorteners |
| **Opening Hours** | **Mon–Sat: 08:00–19:00, Sun: 10:00–14:00** | Mon–Sat: 8 AM–7 PM, Sun: 10 AM–2 PM | Outdated or mismatched Sunday hours |

---

## 2. Codebase Implementation Audit Matrix

| File Path | Location on Site | Name | Address | Phone | Email | Hours | GeoCoordinates | Audit Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/app/layout.tsx` | Root JSON-LD Schema | MSK Institute | Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, UP 283135 | `+918393042166` | `mskshikohabad@gmail.com` | Mon–Sat 8-19, Sun 10-14 | 27.1157743, 78.5829716 | **100% Match** |
| `src/app/page.tsx` | Homepage JSON-LD Schema | MSK Institute | Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, UP 283135 | `+91-8393042166` | `mskshikohabad@gmail.com` | Mon–Sat 8-19, Sun 10-14 | 27.1157743, 78.5829716 | **100% Match** |
| `src/app/contact/page.tsx` | Contact JSON-LD Schema | MSK Institute of Technology & Coding | Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, UP 283135 | `+91-8393042166` | `mskshikohabad@gmail.com` | Mon–Sat 8-19, Sun 10-14 | 27.1157743, 78.5829716 | **100% Match** |
| `src/components/ContactClient.tsx`| Contact UI & Help Desk | MSK Institute | Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, Firozabad, UP - 283135 | `+91 83930 42166` | `mskshikohabad@gmail.com` | Mon–Sat 8-19, Sun 10-14 | N/A (UI) | **100% Match** |
| `src/components/Footer.tsx` | Site-wide Global Footer | MSK Institute | Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, Firozabad, UP-283135 | `+91 83930 42166` | `mskshikohabad@gmail.com` | Displayed via Contact link | Direct Maps Link | **100% Match** |

---

## 3. Semantic Link Architecture

All contact channels utilize semantic HTML protocols:
- **Phone Click-to-Call:** `<a href="tel:+918393042166">` (Proper international E.164 dialing prefix with zero dial errors).
- **Email Link:** `<a href="mailto:mskshikohabad@gmail.com">`.
- **Google Maps Navigation:** `<a href="https://maps.google.com/?q=MSK+Institute+Shikohabad" target="_blank" rel="noopener noreferrer">`.

---

## 4. Google Review Snippet Policy Compliance

- **Policy:** Google Search Central strictly disallows self-serving reviews and fabricated `AggregateRating` structured data for LocalBusiness and EducationalOrganization entities.
- **Audit Findings:**
  1. Student quotes presented on the website are real student testimonials highlighting specific course practicals (Python automation, CCC exam grades).
  2. No misleading schema ratings are injected that could trigger manual action penalties in Google Search Console.
  3. Real Google reviews are collected directly on the Google Business Profile (GBP) listing.
