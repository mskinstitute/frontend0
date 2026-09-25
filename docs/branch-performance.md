# MSK Institute — Branch Performance & Core Web Vitals (Phase 5)

## 1. Performance Overview

Branch pages are frequently visited on 3G and 4G mobile networks by students across semi-urban and regional areas. Delivering instant page loads and zero layout shifts is essential for both conversion rates and Google Core Web Vitals compliance.

---

## 2. Next.js Production Build Metrics

Measured during Next.js 15.5 production build (`npm run build`):

| Route | Page Size | First Load JS | Pre-rendering Mode |
|---|---|---|---|
| `/locations` | 4.01 kB | 110 kB | Static (SSG) |
| `/locations/shikohabad` | 4.96 kB | 114 kB | SSG (with 60s ISR) |
| `/locations/agra` | 4.96 kB | 114 kB | SSG (with 60s ISR) |

Both routes fall well within the strict **<= 140 kB First Load JS** performance budget established in Phase 4.

---

## 3. Core Web Vitals Strategy

### 3.1 Largest Contentful Paint (LCP < 1.8s)
- Branch hero headings and badges are rendered server-side as pure HTML and styled via Tailwind CSS utility classes.
- No client-side layout blockers or font-display delays.

### 3.2 Cumulative Layout Shift (CLS = 0.00)
- **Map Iframe Container:** Pre-assigned fixed aspect ratio classes (`h-96 w-full rounded-2xl`) preventing layout jumps when Google Maps initializes.
- **Card Grids:** CSS Grid layout with explicit row heights and flex alignments prevents content reflow as images or text render.

### 3.3 Interaction to Next Paint (INP < 100ms)
- Interactive features (status filter on `/locations` and campus selector) are isolated in lightweight Client Components without heavy dependencies.
- Third-party map embeds are set to `loading="lazy"` and defer execution until the user scrolls into view.
