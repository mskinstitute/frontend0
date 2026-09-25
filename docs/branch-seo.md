# MSK Institute — Branch SEO & Schema Architecture (Phase 5)

## 1. Overview

Branch pages are high-intent landing destinations for local searches such as:
- *"Computer institute in Shikohabad"*
- *"Coding classes near me Agra"*
- *"Best Python training center in Uttar Pradesh"*

This specification governs the metadata, structured data schemas, and content differentiation for all branch pages.

---

## 2. Schema.org Structured Data Architecture

Every branch page outputs two comprehensive JSON-LD graphs via [`src/lib/branches/seo.ts`](file:///d:/Sumit/MSK-Institute-Website/src/lib/branches/seo.ts):

### 2.1 LocalBusiness Graph with Parent Organization Link
To communicate to search engines that the branch is an official physical location of MSK Institute:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.mskinstitute.in/locations/shikohabad#branch",
  "name": "MSK Institute Shikohabad",
  "description": "MSK Institute Shikohabad is our flagship headquarters and premier software engineering training center in Firozabad district...",
  "url": "https://www.mskinstitute.in/locations/shikohabad",
  "logo": "https://www.mskinstitute.in/logo.jpg",
  "image": "https://www.mskinstitute.in/logo.jpg",
  "telephone": "+918393042166",
  "email": "mskshikohabad@gmail.com",
  "priceRange": "₹₹",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "@id": "https://www.mskinstitute.in/#organization",
    "name": "MSK Institute",
    "alternateName": "Mastering Software Knowledge",
    "url": "https://www.mskinstitute.in",
    "logo": "https://www.mskinstitute.in/logo.jpg"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gali No. 3, Near Gyan Jyoti Public School",
    "addressLocality": "Shikohabad",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "283135",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.1157743,
    "longitude": 78.5829716
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "10:00",
      "closes": "14:00"
    }
  ]
}
```

### 2.2 BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.mskinstitute.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Locations",
      "item": "https://www.mskinstitute.in/locations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "MSK Institute Shikohabad",
      "item": "https://www.mskinstitute.in/locations/shikohabad"
    }
  ]
}
```

---

## 3. Review & Rating Policy (Anti-Spam Compliance)

- **Zero Fabricated Reviews:** No arbitrary 5-star ratings or fictitious testimonials may be emitted in JSON-LD schemas.
- **Root Verification:** Verified Google Review aggregates are only placed where third-party links are visible to users.

---

## 4. Content Differentiation Standards

To prevent duplicate content penalties from Google's helpful content algorithms:
1. **Unique Meta Titles & Descriptions:** Checked by `npm run validate:branch-content` to ensure distinct character counts and localized value propositions.
2. **Prominent Local Landmark References:** Shikohabad references Station Road, Gyan Jyoti School, and Arya Samaj Mandir; Agra references Sanjay Place, MG Road, and Bhagwan Talkies area.
3. **Localized FAQs:** FAQs must address branch-specific transportation, lab timings, and admission steps.
