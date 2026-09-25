# MSK Institute — Branch Data Model Specification (Phase 5)

## 1. Overview

The MSK Institute branch data model provides a structured, relational schema for managing physical campuses, regional training centers, and franchise branches.

It is defined in TypeScript in [`src/types/index.ts`](file:///d:/Sumit/MSK-Institute-Website/src/types/index.ts) and persisted canonically in [`public/data/branches.json`](file:///d:/Sumit/MSK-Institute-Website/public/data/branches.json).

---

## 2. TypeScript Entity Definition

```typescript
export type BranchStatus =
  | 'PLANNED'
  | 'COMING_SOON'
  | 'OPEN'
  | 'TEMPORARILY_CLOSED'
  | 'CLOSED'
  | 'ARCHIVED';

export type BranchType = 'CORPORATE' | 'FRANCHISE' | 'PARTNER';

export interface BranchOpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface BranchGalleryItem {
  url: string;
  alt: string;
  caption?: string;
}

export interface BranchFaq {
  question: string;
  answer: string;
}

export interface Branch {
  id: string;                      // e.g. "branch-shikohabad-001"
  code?: string;                   // e.g. "SKB-01"
  name: string;                    // e.g. "MSK Institute Shikohabad"
  displayName: string;             // e.g. "Shikohabad Campus (Headquarters)"
  slug: string;                    // e.g. "shikohabad"
  organizationId: string;          // "msk-institute"
  city: string;                    // e.g. "Shikohabad"
  normalizedCity: string;          // e.g. "shikohabad"
  state: string;                   // e.g. "Uttar Pradesh"
  country: string;                 // e.g. "India"
  countryCode: string;             // "IN"
  postalCode: string;              // "283135"
  address: string;                 // "Gali No. 3, Near Gyan Jyoti Public School"
  landmark?: string;               // Landmark for local navigation
  latitude: number;                // e.g. 27.1157743
  longitude: number;               // e.g. 78.5829716
  phone: string;                   // E.164 formatted "+918393042166"
  formattedPhone: string;          // Human readable "+91 83930 42166"
  whatsapp: string;                // "+918393042166"
  email: string;                   // "mskshikohabad@gmail.com"
  website: string;                 // Canonical page URL
  openingHours: BranchOpeningHours[];
  status: BranchStatus;
  branchType: BranchType;
  openingDate?: string;            // ISO Date string
  isHeadquarters?: boolean;        // True only for Shikohabad
  franchise?: {
    enabled: boolean;
    partnerId?: string;
    partnerName?: string;
  };
  googleBusiness?: {
    profileUrl?: string;
    placeId?: string;
  };
  availableCourseIds: string[];    // Array of Course.id or Course.slug values
  activeBatchIds: string[];        // Array of LiveBatch.id values
  facultyIds?: string[];           // Optional assigned faculty
  facilities?: string[];           // List of campus amenities
  gallery?: BranchGalleryItem[];   // Photo gallery
  localDescription: string;        // In-depth localized copy
  localSeo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
    indexable?: boolean;
  };
  faqs?: BranchFaq[];              // Localized FAQs
  createdAt?: string;
  updatedAt?: string;
}
```

---

## 3. Relational Mapping

### 3.1 Course-to-Branch Relationship (Many-to-Many)
- **Global Course Pool:** Stored in `public/data/all-courses.json`. Each course has a permanent canonical URL (`/courses/[slug]`).
- **Branch Selection:** In `branches.json`, each branch declares `availableCourseIds: ["course-ccc-nielit", "course-adca", ...]`.
- **Bidirectional Querying:**
  - `getCoursesForBranch(branchId)`: Resolves full Course objects available at a specific campus.
  - `getBranchesForCourse(courseId)`: Resolves which campuses deliver classroom training for that course.

### 3.2 Batch-to-Branch Relationship (Many-to-One)
- Batches in `public/data/live-batches.json` feature:
  - `branchId?: string`: References a valid `id` in `branches.json`.
  - `branchSlug?: string`: URL slug for quick linking.
  - `branchName?: string`: Display label.
- When `branchId` is omitted or `null`, the batch is an **Online Nationwide** cohort.

---

## 4. Canonical Branch Records

### Record 1: Shikohabad Headquarters (`branch-shikohabad-001`)
- **Status:** `OPEN`
- **Type:** `CORPORATE` / `isHeadquarters: true`
- **Location:** Gali No. 3, Near Gyan Jyoti Public School, Shikohabad (PIN 283135)
- **Coordinates:** `27.1157743, 78.5829716`
- **Curriculum:** 66 courses available locally.
- **Active Cohorts:** 4 active live batches.

### Record 2: Agra Regional Hub (`branch-agra-001`)
- **Status:** `COMING_SOON`
- **Type:** `CORPORATE` (Regional Expansion Hub)
- **Location:** Sanjay Place Commercial Complex (Upcoming Learning Center), Agra (PIN 282002)
- **Coordinates:** `27.1766701, 78.0080745`
- **Curriculum:** Core software tracks (Python, MERN, Data Analytics, CCC, ADCA).
- **Function:** Pre-launch student inquiries and franchise territory reservation.
