# MSK Institute — Branch Redirect & URL Canonicalization Map (Phase 5)

## 1. Overview

To protect against 404 errors, conserve link equity from external marketing flyers or social media campaigns, and maintain canonical indexation, permanent HTTP 301 redirects are configured for common aliases.

---

## 2. Configured & Recommended Redirects

| Source URL | Target Canonical URL | Status | Rationale |
|---|---|---|---|
| `/campuses` | `/locations` | 301 Permanent | Common user synonym for locations directory |
| `/branches` | `/locations` | 301 Permanent | Direct alias for locations directory |
| `/shikohabad` | `/locations/shikohabad` | 301 Permanent | Print collateral & local advertisement shortcut |
| `/agra` | `/locations/agra` | 301 Permanent | Regional expansion launch flyer shortcut |
| `/center` | `/locations` | 301 Permanent | Common typing variant |
| `/centres` | `/locations` | 301 Permanent | British English spelling variant |

---

## 3. Branch Retirement / Closure Redirect Protocol

In the event that an MSK Institute franchise agreement terminates or a branch temporarily closes:

1. **Temporary Closure (`status: TEMPORARILY_CLOSED`):**
   - The page remains live at `/locations/[city]`.
   - The status badge displays `Temporarily Closed`.
   - Action buttons redirect inquiries to online live batches or nearest campus.
   - Page remains indexed to prevent loss of local ranking upon reopening.

2. **Permanent Closure (`status: CLOSED` / `ARCHIVED`):**
   - The URL `/locations/[city]` issues a permanent HTTP 301 redirect to:
     - The nearest active regional branch in Uttar Pradesh, OR
     - The primary headquarters `/locations/shikohabad`, OR
     - The central directory `/locations`.
   - Removes canonical link from `sitemap.xml`.
