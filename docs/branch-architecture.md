# MSK Institute — Multi-Branch & Franchise Architecture (Phase 5)

## 1. Executive Summary

This document specifies the technical architecture for the multi-branch, franchise-ready expansion of **MSK Institute (Mastering Software Knowledge)**.

As MSK Institute scales from its flagship headquarters in **Shikohabad, Uttar Pradesh** to regional educational hubs across northern India (beginning with **Agra**), the web platform must support multi-campus operations without compromising:
1. **Domain Authority & SEO Equity:** Preserving the primary canonical domain `https://www.mskinstitute.in` with clean URL directories (`/locations/[city]`) rather than fragmenting authority across subdomains or separate web properties.
2. **One-City-One-Franchise Rule:** Enforcing geographic exclusivity at the data, business logic, and validation levels so that only **one active MSK Institute branch** can ever operate in any single city.
3. **Global Educational Core:** Preserving the single source of truth for Course entities, curriculum roadmaps, and online certifications while enabling local branch schedules, classroom capacities, and facilities.
4. **Performance & Core Web Vitals:** Retaining sub-120 KB First Load JS, sub-50ms TTFB, zero CLS, and instant static site pre-rendering across all campus portals.

---

## 2. High-Level Architecture Diagram

```text
                                +-----------------------------+
                                |    MSK Institute Platform   |
                                | (https://www.mskinstitute.in) |
                                +--------------+--------------+
                                               |
             +---------------------------------+---------------------------------+
             |                                 |                                 |
+------------v------------+       +------------v------------+       +------------v------------+
|  Global Curriculum Core |       | Central Campus Directory|       | Franchise Governance    |
|   - 66 Canonical Courses|       |      - /locations       |       |  - City Exclusivity     |
|   - Reusable Syllabi    |       |  - Interactive Filter   |       |  - Territorial Lock     |
|   - Global Certificates |       |  - Franchise Inquiries  |       |  - Partner Onboarding   |
+------------+------------+       +------------+------------+       +------------+------------+
             |                                 |                                 |
             +------------------------+--------+---------------------------------+
                                      |
                         +------------v------------+
                         |  Dynamic Location Hubs |
                         |   (/locations/[city])   |
                         +------------+------------+
                                      |
             +------------------------+------------------------+
             |                                                 |
+------------v------------+                       +------------v------------+
|  Shikohabad Campus (HQ) |                       |   Agra Regional Campus  |
|  - Status: OPEN         |                       |  - Status: COMING_SOON  |
|  - Physical Lab Specs   |                       |  - Pre-launch Inquiries |
|  - 4 Live Batches       |                       |  - Territory Reserved   |
|  - Verified Local NAP   |                       |  - Localized Syllabus   |
+-------------------------+                       +-------------------------+
```

---

## 3. Core Architectural Pillars

### Pillar 1: Single Domain, Subdirectory-Based Locality
All branch pages reside under the primary domain:
- Main Locations Directory: `https://www.mskinstitute.in/locations`
- Flagship Campus: `https://www.mskinstitute.in/locations/shikohabad`
- Upcoming Regional Hubs: `https://www.mskinstitute.in/locations/agra`

**Why Not Subdomains (`shikohabad.mskinstitute.in` or `agra.mskinstitute.in`)?**
- Subdomains split Google search rank, domain rating, and backlink authority into separate silos.
- Subdirectories consolidate all local and regional topical relevance into `www.mskinstitute.in`, amplifying ranking power for competitive queries like *"computer classes near me"* across Uttar Pradesh.
- Single SSL certificate, unified Edge caching, and consolidated GA4/GTM measurement.

### Pillar 2: Relational Course-Branch Decoupling
- **Courses are Global Entities:** A course like Python Programming or MERN Stack Web Development is created once with standard modules, outcomes, and syllabus.
- **Branches are Physical Execution Nodes:** Each branch specifies its `availableCourseIds` list. If a branch does not offer a specific niche course (e.g. advanced AI or cloud architecture), it simply omits that ID from its availability array.
- **Batches are Scheduled Deployments:** Each batch in `live-batches.json` references an optional `branchId` (e.g., `"branch-shikohabad-001"`). Online-only batches set `branchId: null` for nationwide enrollment.

### Pillar 3: Geographic Exclusivity by Design
- City normalization strips whitespace, case, and geographical qualifiers (e.g., "Agra Cantt", "Agra Junction", "Agra City" normalize to `agra`).
- Territorial validation asserts that only **one active branch** (`OPEN` or `COMING_SOON`) can occupy a normalized city at any time.

---

## 4. Technology Stack & SSG Strategy

| Layer | Implementation | Details |
|---|---|---|
| **Framework** | Next.js 15.5 (App Router) | React 19 server components by default |
| **Rendering** | Static Site Generation (SSG) | `generateStaticParams()` pre-renders all published branches at build time |
| **Data Layer** | Repository Pattern | `src/lib/branches/repository.ts` abstracts file and database operations |
| **Validation** | Automated Script Suite | `validate:branches`, `validate:locations`, `validate:branch-schema`, `validate:branch-content` |
| **SEO & Schema** | Schema.org Graph | Combined `EducationalOrganization` + `LocalBusiness` referencing parent organization |
| **Analytics** | Dual Tagging (GA4 + GTM) | First-party contextual tracking with `branch_id`, `branch_slug`, and zero PII |

---

## 5. Directory Structure Overview

```text
src/
├── app/
│   ├── locations/
│   │   ├── page.tsx               # SSG Central locations directory
│   │   └── [city]/
│   │       ├── page.tsx           # Dynamic branch landing page with SSG
│   │       └── not-found.tsx      # Branded 404 for unrecognized branch slugs
├── components/
│   └── branches/
│       ├── BranchCard.tsx         # Directory campus card
│       ├── BranchHero.tsx         # Rich local hero with status badges
│       ├── BranchCourses.tsx      # Filtered courses available at campus
│       ├── BranchBatches.tsx      # Active classroom schedules
│       ├── BranchFacilities.tsx   # Verified lab and equipment specs
│       ├── BranchContact.tsx      # Semantic NAP, hours, and deferred map
│       ├── BranchFaqs.tsx         # Localized FAQs
│       ├── BranchSelector.tsx     # Dropdown / modal campus switcher
│       └── LocationsDirectoryClient.tsx # Search and filter client component
├── lib/
│   └── branches/
│       ├── index.ts               # Central module exports
│       ├── normalization.ts       # City string sanitization & geo keys
│       ├── validation.ts          # Territory exclusivity enforcement
│       ├── repository.ts          # Storage-agnostic branch query engine
│       └── seo.ts                 # LocalBusiness & breadcrumb schema generators
public/
└── data/
    └── branches.json              # Canonical source of truth for branch records
```
