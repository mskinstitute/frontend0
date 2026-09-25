# MSK Institute — New Branch Onboarding Checklist (Phase 5)

## 1. Pre-Onboarding Due Diligence

- [ ] **City Exclusivity Verification:** Run `checkCityAvailability(targetCity)` to guarantee that no active MSK Institute branch currently operates in the normalized municipality.
- [ ] **Franchise Agreement Execution:** Ensure formal franchise contract signed and territorial rights assigned.
- [ ] **Physical Lab Inspection:**
  - Minimum 15 dedicated student PCs with 8GB+ RAM and SSD storage.
  - Dedicated high-speed optical fiber internet (minimum 50 Mbps).
  - Uninterrupted power supply (inverter/generator backup) capable of powering the lab for 4+ hours.
  - Air-conditioned classroom with instructor projector or large display monitor.
- [ ] **Faculty Certification:** Instructors trained and certified on MSK Institute standard coding pedagogy.

---

## 2. Technical Data Preparation

Prepare the following metadata for entry into `public/data/branches.json`:

- [ ] `id`: Uniform slug-based identifier (`branch-[city]-[sequence]`, e.g., `branch-jaipur-001`).
- [ ] `code`: Short code for internal receipts and certificates (e.g., `JPR-01`).
- [ ] `name`: Official display name (`MSK Institute [City]`).
- [ ] `slug`: Kebab-case URL slug matching the city name (e.g., `jaipur`).
- [ ] `address`: Full street address without abbreviation.
- [ ] `city`, `state`, `postalCode`, `countryCode`: Postal-accurate geographic fields.
- [ ] `latitude`, `longitude`: Accurate GPS coordinates verified via Google Maps.
- [ ] `phone`: Dedicated campus phone starting with `+91`.
- [ ] `email`: Dedicated campus email address (`[city]@mskinstitute.in` or official Gmail).
- [ ] `openingHours`: Complete weekly schedule including Saturday and Sunday timings.
- [ ] `facilities`: List of verified campus amenities.
- [ ] `availableCourseIds`: Array of course IDs offered at this branch.
- [ ] `localDescription`: Unique, non-duplicate 150-250 word campus overview mentioning local landmarks and transit connections.
- [ ] `localSeo`: Localized title, meta description (150-165 chars), and targeted keywords.
- [ ] `faqs`: At least 3 genuine localized FAQs addressing local transport, batch times, and enrollment.

---

## 3. Code & Build Verification Steps

1. Add the branch object to [`public/data/branches.json`](file:///d:/Sumit/MSK-Institute-Website/public/data/branches.json).
2. Execute the verification suite:
   ```bash
   npm run validate:branches
   npm run validate:locations
   npm run validate:branch-schema
   npm run validate:branch-content
   npm run typecheck
   npm run build
   ```
3. Verify that `/locations/[city]` is statically generated in the build output.
4. Verify sitemap entry exists in `/sitemap.xml`.
5. Submit the new branch URL to Google Search Console for priority indexing.
