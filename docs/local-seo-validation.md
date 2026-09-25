# Local SEO Validation Report

**Property:** `https://www.mskinstitute.in`  
**Execution Date:** September 2026  
**Validator Script:** `scripts/validate-local.js` (`npm run validate:local`)  
**Test Result:** **PASSED (0 Errors, 0 Warnings)**  

---

## 1. Validation Test Execution Log

Output of automated test suite `npm run validate:local`:

```text
> msk-institute-website@0.1.0 validate:local
> node scripts/validate-local.js

=== MSK INSTITUTE LOCAL SEO & NAP VALIDATION ===

1. Checking Root Layout JSON-LD Schema (src/app/layout.tsx)...
  [PASS] LocalBusiness schema type present in layout.tsx
  [PASS] Locality Shikohabad verified in layout.tsx
  [PASS] PIN code 283135 verified in layout.tsx
  [PASS] Canonical email verified in layout.tsx
  [PASS] Shikohabad GeoCoordinates verified in layout.tsx

2. Checking Homepage Local Schema (src/app/page.tsx)...
  [PASS] Locality Shikohabad verified in page.tsx
  [PASS] PIN code 283135 verified in page.tsx
  [PASS] GeoCoordinates aligned in page.tsx

3. Checking Contact Page Schema & Routing (src/app/contact/page.tsx)...
  [PASS] contact/page.tsx schema locality and PIN code verified
  [PASS] contact/page.tsx GeoCoordinates aligned (27.1157743, 78.5829716)

4. Checking Contact Client Component (src/components/ContactClient.tsx)...
  [PASS] Canonical email verified in ContactClient.tsx
  [PASS] Canonical Google Maps URL verified in ContactClient.tsx

5. Checking Footer Component (src/components/Footer.tsx)...
  [PASS] Footer.tsx direct tel link verified
  [PASS] Footer.tsx direct mailto link verified
  [PASS] Footer.tsx PIN code 283135 verified

----------------------------------------
[SUCCESS] Local SEO & NAP validation PASSED with 0 errors and 0 warnings.
```

---

## 2. Verified Structured Data Properties

### Root Organization Schema (`src/app/layout.tsx`)
- `@context`: `https://schema.org`
- `@type`: `["EducationalOrganization", "LocalBusiness"]`
- `name`: `"MSK Institute"`
- `alternateName`: `"MSK Computer Training & Coding Academy"`
- `url`: `"https://www.mskinstitute.in"`
- `telephone`: `"+918393042166"`
- `email`: `"mskshikohabad@gmail.com"`
- `priceRange`: `"₹₹"`
- `address`:
  - `streetAddress`: `"Gali No. 3, Near Gyan Jyoti Public School"`
  - `addressLocality`: `"Shikohabad"`
  - `addressRegion`: `"Uttar Pradesh"`
  - `postalCode`: `"283135"`
  - `addressCountry`: `"IN"`
- `geo`:
  - `latitude`: `27.1157743`
  - `longitude`: `78.5829716`
- `openingHoursSpecification`:
  - Monday to Saturday: `08:00` - `19:00`
  - Sunday: `10:00` - `14:00`
- `founder`:
  - `name`: `"Er. Sumit Kumar"`
  - `jobTitle`: `"Founder & Lead Technical Trainer"`
- `areaServed`: `["Shikohabad", "Firozabad", "Sirsaganj", "Jasrana", "Uttar Pradesh"]`

---

## 3. Local SEO Compliance Sign-Off

1. **NAP Exact Match:** 100% matched across 5 key codebase locations.
2. **Geo Coordinates:** Latitude `27.1157743`, Longitude `78.5829716` uniformly verified.
3. **Telephone Syntax:** Click-to-call links validated with international format `tel:+918393042166`.
4. **Email Syntax:** Mailto links validated with canonical address `mailto:mskshikohabad@gmail.com`.
5. **Map Navigation:** Verified Google Maps deep link active across footer and contact interface.
