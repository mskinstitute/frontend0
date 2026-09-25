# MSK Institute — Future Franchise Admin & Governance (Phase 5)

## 1. Overview

As MSK Institute expands beyond its Shikohabad headquarters, a centralized administrative dashboard will be introduced to govern franchise operations, manage partner credentials, and audit classroom capacity.

This document outlines the blueprint, Role-Based Access Control (RBAC), and database migration roadmap.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Capability | Super Admin (HQ / Er. Sumit Kumar) | Branch Manager / Franchise Partner | Course Instructor | Prospective Partner |
|---|---|---|---|---|
| Create / Approve New Branch | Full Access | No Access | No Access | No Access |
| Enforce City Exclusivity | Full Access | Read-Only | No Access | Read-Only |
| Publish / Unpublish Global Courses | Full Access | No Access | No Access | No Access |
| Select Available Courses for Branch | Full Access | Permitted for Local Branch | No Access | No Access |
| Schedule Branch Live Batches | Full Access | Permitted for Local Branch | Permitted for Assigned Batch | No Access |
| View Campus Lead Inquiries | All Branches | Local Branch Only | No Access | No Access |
| Issue Verifiable Certificates | Full Verification | Candidate Submission Only | Evaluation Only | No Access |

---

## 3. Branch Operational Lifecycle

```text
[PLANNED]
   │
   ▼ (Territory Reserved, Franchise Agreement Signed)
[COMING_SOON]
   │
   ▼ (Lab Fitted, Fiber & Power Backup Verified, Faculty Certified)
[OPEN]
   │
   ├──► [TEMPORARILY_CLOSED] (Renovation, Municipal Closure, Emergency)
   │        │
   │        └──► [OPEN] (Re-opened upon audit)
   ▼
[CLOSED / ARCHIVED] (Partnership Terminated, 301 Redirect to Headquarters)
```

---

## 4. Database Migration Roadmap (PostgreSQL / Supabase)

While Phase 5 utilizes repository-abstracted JSON (`public/data/branches.json`), the interface methods in [`src/lib/branches/repository.ts`](file:///d:/Sumit/MSK-Institute-Website/src/lib/branches/repository.ts) are strictly database-agnostic.

When migrating to PostgreSQL / Supabase:
1. Create `branches` table with a unique constraint on `(normalized_city)`:
   ```sql
   CREATE UNIQUE INDEX idx_branches_active_city_exclusive
   ON branches (normalized_city)
   WHERE status IN ('OPEN', 'COMING_SOON');
   ```
2. Replace JSON reader in `src/services/api.ts` with Supabase client query.
3. No frontend components or pages need modification due to the repository abstraction.
