# MSK Institute — Branch Migration & Backward Compatibility (Phase 5)

## 1. Executive Summary

A core requirement of Phase 5 was that transforming MSK Institute into a multi-branch, franchise-ready platform must **never break existing production functionality, SEO equity, or live operations**.

The primary campus in **Shikohabad, Uttar Pradesh** continues operating seamlessly as the recognized Headquarters and flagship physical center.

---

## 2. Backward Compatibility Matrix

| Asset / Endpoint | Pre-Phase 5 Behavior | Phase 5 Behavior | Integrity Status |
|---|---|---|---|
| **Root Homepage (`/`)** | Local Shikohabad NAP & Schema | Same Shikohabad NAP + Link to Campuses Directory | **100% Preserved** |
| **Contact Page (`/contact`)** | Shikohabad office address & form | Same Shikohabad office address & form | **100% Preserved** |
| **Course URLs (`/courses/[slug]`)** | 66 Canonical course syllabi | Same 66 URLs + Campus Availability badges | **100% Preserved** |
| **Batch URLs (`/live-batches/[id]`)** | Live batch enrollment | Linked to `branch-shikohabad-001` with campus context | **100% Preserved** |
| **Certificate Verification (`/verify-certificate`)** | Global QR validation | Global QR validation unaffected | **100% Preserved** |
| **Sitemap (`/sitemap.xml`)** | All course, batch, tutorial URLs | Includes `/locations` and `/locations/[city]` | **Enhanced** |
| **LocalBusiness Schema** | Root Shikohabad entity | Parent EducationalOrganization with linked branch entities | **Enhanced** |

---

## 3. Data Integrity & Mapping

1. **Course Preservation:** None of the 66 courses in `all-courses.json` were duplicated or modified. Courses remain global assets.
2. **Live Batches Association:** In `live-batches.json`, all 4 active cohorts were explicitly mapped to `branchId: "branch-shikohabad-001"`, `branchSlug: "shikohabad"`, and `branchName: "MSK Institute Shikohabad"`.
3. **Automated Verification:** Verified by `npm run validate:courses`, `npm run validate:batches`, and `npm run validate:local`.

---

## 4. Future Supabase / SQL Migration Script Blueprint

When moving from JSON storage to PostgreSQL:

```sql
-- 1. Create Branches Table with Exclusivity Constraint
CREATE TABLE branches (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(16) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    slug VARCHAR(64) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    normalized_city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code VARCHAR(2) NOT NULL DEFAULT 'IN',
    postal_code VARCHAR(10) NOT NULL,
    address TEXT NOT NULL,
    landmark TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone VARCHAR(32) NOT NULL,
    formatted_phone VARCHAR(32) NOT NULL,
    whatsapp VARCHAR(32) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'OPEN',
    branch_type VARCHAR(32) NOT NULL DEFAULT 'CORPORATE',
    is_headquarters BOOLEAN NOT NULL DEFAULT FALSE,
    local_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enforce Exactly One Active Branch Per City
CREATE UNIQUE INDEX idx_branches_one_active_per_city
ON branches (normalized_city)
WHERE status IN ('OPEN', 'COMING_SOON');

-- 3. Branch Courses Relational Join Table
CREATE TABLE branch_courses (
    branch_id VARCHAR(64) REFERENCES branches(id) ON DELETE CASCADE,
    course_id VARCHAR(64) REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (branch_id, course_id)
);
```
