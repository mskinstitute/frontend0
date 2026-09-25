# MSK Institute — Branch Routing & URL Architecture (Phase 5)

## 1. Routing Structure

All branch pages utilize the Next.js App Router and are statically rendered under the root domain:

```text
https://www.mskinstitute.in/
  ├── locations/                     (Central campus directory)
  │    ├── shikohabad/               (Flagship campus landing page)
  │    └── agra/                     (Upcoming regional center page)
```

---

## 2. Dynamic Route Implementation: `src/app/locations/[city]/page.tsx`

### 2.1 Static Site Generation (SSG)
Every published branch is pre-rendered at build time via `generateStaticParams()`:

```typescript
export async function generateStaticParams() {
  const publishedBranches = await getPublishedBranches();
  return publishedBranches.map((branch) => ({
    city: branch.slug,
  }));
}
```

### 2.2 Revalidation & Caching
Branch pages specify:
```typescript
export const revalidate = 60; // Refresh live batch schedules every 60s
```
This enables Incremental Static Regeneration (ISR) so that newly scheduled classroom batches or updated seat counts appear on branch pages without requiring a full site redeployment.

### 2.3 Strict 404 Handling: `not-found.tsx`
When a user navigates to an unrecognized city slug (e.g. `/locations/mumbai`), the route handler calls `notFound()`, triggering the localized 404 page in [`src/app/locations/[city]/not-found.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/app/locations/[city]/not-found.tsx).
- Informs the visitor that no campus currently exists in that city.
- Offers an interactive "Explore Verified Campuses" button.
- Invites educational entrepreneurs to submit a franchise proposal for that city.

---

## 3. Site Navigation Integration

| Location | Component | Behavior |
|---|---|---|
| **Header Navbar** | [`src/components/Navbar.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/components/Navbar.tsx) | Features `Locations` link with `MapPin` icon in desktop and mobile nav. |
| **Footer** | [`src/components/Footer.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/components/Footer.tsx) | Direct links to `/locations` and top branch landing pages. |
| **Homepage** | [`src/app/page.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/app/page.tsx) | Physical Campus section includes direct CTA: *"View All Campuses (2)"*. |
| **Course Pages** | [`src/app/courses/[slug]/page.tsx`](file:///d:/Sumit/MSK-Institute-Website/src/app/courses/[slug]/page.tsx) | Displays *"Campus Availability"* badge card linking directly to branch pages where that course is taught in person. |

---

## 4. Canonical URL Rules

- **Self-Canonicalization:** Every branch page canonicalizes to its own permalink:
  - `https://www.mskinstitute.in/locations/shikohabad`
  - `https://www.mskinstitute.in/locations/agra`
- **No Trailing Slashes:** Enforced consistently across Next.js config and canonical headers.
- **Lowercased Kebab-Case:** Slugs must only contain `[a-z0-9-]`.
