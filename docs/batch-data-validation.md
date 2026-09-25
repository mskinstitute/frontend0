# MSK Institute Website — Batch Data Validation Report

**File:** `public/data/live-batches.json`  
**Total Batches:** 4 (3 Active, 1 Historical Completed)  
**Auditor Script:** `scripts/validate-batches.js` (`npm run validate:batches`)  
**Status:** 100% Validated & Passing

---

## 1. Executive Summary
Prior to this audit, live batches lacked a single source of truth:
- `public/data/batches.json` was empty (`[]`).
- Batches were intermittently hardcoded as fallbacks across `src/services/api.ts`, `src/app/live-batches/[id]/page.tsx`, and `LiveBatchesClient.tsx`.
- Completed cohorts were not cleanly supported in the UI, schema, or lifecycle models.

A canonical batch repository has been established in `public/data/live-batches.json` with full lifecycle management (`BatchStatus` union), valid course slug relationships, seat tracking, and automated Google Sheet sync support.

---

## 2. Batch Lifecycle Architecture & Schema

### 2.1 Batch Lifecycle Enum (`BatchStatus`)
```typescript
export type BatchStatus = 
  | 'DRAFT' 
  | 'UPCOMING' 
  | 'OPEN' 
  | 'FULL' 
  | 'RUNNING' 
  | 'COMPLETED' 
  | 'CLOSED' 
  | 'ARCHIVED';
```

### 2.2 Live Batch Entity
```typescript
export interface LiveBatch {
  id: string;
  courseSlug: string;
  courseId?: string;
  title: string;
  status?: BatchStatus;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD for completed batches
  startDateTime?: string; // ISO 8601
  schedule: string;
  mode?: 'ONLINE' | 'OFFLINE' | 'BOTH';
  instructorId?: string;
  instructor: string;
  instructorPicture: string;
  price: string;
  originalPrice?: string;
  totalSeats: number;
  leftSeats: number;
}
```

---

## 3. Current Live Batches Inventory

| Batch ID | Course Title | Start Date | Mode | Status | Seats Remaining |
|---|---|---|---|---|---|
| `batch-python-mastery-3-months` | Python Programming Mastery | 2026-10-01 | Hybrid (Online + Offline) | OPEN | 7 of 20 |
| `batch-mern-full-stack` | Full-Stack MERN Web Development | 2026-10-15 | Hybrid (Online + Offline) | OPEN | 8 of 25 |
| `batch-data-analysis-mastery` | Data Analysis Mastery | 2026-10-25 | Hybrid (Online + Offline) | OPEN | 9 of 20 |
| `batch-python-summer-2026` | Python Programming – Summer 2026 | 2026-06-01 | Hybrid (Online + Offline) | COMPLETED | 0 (Closed) |

---

## 4. Completed Cohort UX & SEO Handling
When a batch reaches `status: "COMPLETED"` or its start/end timestamp has passed:
1. **Notice Banner:** Displays an amber notice informing prospective students that admissions for this cohort are closed.
2. **Actionable Links:** Directs prospective students to view upcoming batches or explore the full curriculum.
3. **Form Disable:** The enrollment form is replaced with a prompt to join the next upcoming cohort.
4. **Structured Data:** The Schema.org `Offer` availability changes from `InStock` to `Discontinued`, preventing Google Rich Snippet crawl penalties for outdated offerings.

---

## 5. Verification Command
To re-verify at any point:
```bash
npm run validate:batches
```
Output:
```
--- MSK INSTITUTE LIVE BATCHES VALIDATION ---
Total live batches found: 4
Validation finished: 4 live batches checked.
Errors: 0, Warnings: 0
Validation PASSED: All batch data is 100% integral and complete!
```
