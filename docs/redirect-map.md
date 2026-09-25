# MSK Institute Website — Canonical Redirect Map

**Website:** https://www.mskinstitute.in/  
**Implementation:** `next.config.ts` (`async redirects()`)  
**Status:** Permanent 301 / 308 Server-Side Redirects Active

---

## 1. Overview
This document specifies all canonical redirects configured in `next.config.ts` to preserve link equity, eliminate 404 crawl errors from legacy slugs, unify duplicate routes, and protect Google Search Console rankings.

---

## 2. Global Route & Legacy Slugs Redirect Table

| # | Incoming Legacy / Duplicate URL | HTTP Status | Canonical Destination | Rationale / Resolution |
|---|---|---|---|---|
| 1 | `/notes` | 301 (Permanent) | `/study-material` | Consolidates legacy notes route into rich study material portal |
| 2 | `/contact-us` | 301 (Permanent) | `/contact` | Eliminates duplicate route and canonicalizes contact inquiries |
| 3 | `/career` | 301 (Permanent) | `/careers` | Standardizes singular to plural career listings route |
| 4 | `/course` | 301 (Permanent) | `/courses` | Resolves singular typo route to main course catalog |
| 5 | `/courses/html5-complete-masterclass` | 301 (Permanent) | `/courses/html5-complete-course` | Maps legacy course slug to published canonical HTML5 course |
| 6 | `/courses/html-complete-course` | 301 (Permanent) | `/courses/html5-complete-course` | Maps shortened course slug to canonical HTML5 course |
| 7 | `/courses/javascript-react-frontend-engineering` | 301 (Permanent) | `/courses/frontend-development--8-months` | Maps old frontend slug to comprehensive 8-month diploma course |
| 8 | `/courses/ccc-computer-concepts` | 301 (Permanent) | `/courses/ccc` | Maps verbose CCC slug to canonical NIELIT CCC course |
| 9 | `/courses/ccc-course-on-computer-concepts` | 301 (Permanent) | `/courses/ccc` | Maps long-form CCC slug to canonical NIELIT CCC course |
| 10 | `/courses/master-computer-coding-diploma` | 301 (Permanent) | `/courses/full-stack-development` | Maps obsolete diploma slug to 1-year Full-Stack Development track |
| 11 | `/courses/python-programming-masterclass` | 301 (Permanent) | `/courses/python-mastery-beginner-to-advanced--3-months` | Maps marketing slug to canonical 3-month Python Mastery track |
| 12 | `/courses/full-stack-web-development-bootcamp` | 301 (Permanent) | `/courses/full-stack-web-dev-bootcamp` | Maps verbose bootcamp slug to canonical bootcamp slug |
| 13 | `/courses/full-stack-web-development` | 301 (Permanent) | `/courses/full-stack-development` | Maps legacy web development slug to full-stack diploma track |
| 14 | `/courses/html5-css3-modern-ui-design` | 301 (Permanent) | `/courses/web-designing-complete-pathway--4-months` | Maps legacy design slug to 4-month Web Designing Pathway |
| 15 | `/courses/adca-advanced-diploma-computer-applications` | 301 (Permanent) | `/courses/adca` | Maps verbose ADCA slug to canonical 1-Year ADCA course |

---

## 3. Tutorial Deep-Link Redirect Table

| # | Incoming Legacy / Old Tutorial URL | HTTP Status | Canonical Destination |
|---|---|---|---|
| 1 | `/tutorials/css` | 301 (Permanent) | `/tutorials/css-for-beginners` |
| 2 | `/tutorials/css-mastery` | 301 (Permanent) | `/tutorials/css-for-intermediate` |
| 3 | `/tutorials/css-mastery/:topicSlug*` | 301 (Permanent) | `/tutorials/css-for-intermediate/:topicSlug*` |
| 4 | `/tutorials/html5-complete-masterclass` | 301 (Permanent) | `/tutorials/html5-complete-course` |
| 5 | `/tutorials/html5-complete-masterclass/:topicSlug*` | 301 (Permanent) | `/tutorials/html5-complete-course/:topicSlug*` |
| 6 | `/tutorials/html5-complete-course/colors` | 301 (Permanent) | `/tutorials/html5-complete-course/html-colors-rgb` |
| 7 | `/tutorials/html5-complete-course/html-colors-color-codes` | 301 (Permanent) | `/tutorials/html5-complete-course/html-colors-rgb` |
| 8 | `/tutorials/html5-complete-course/links-navigation-lists` | 301 (Permanent) | `/tutorials/html5-complete-course/links-hyperlinks` |
| 9 | `/tutorials/html5-complete-course/lists` | 301 (Permanent) | `/tutorials/html5-complete-course/unordered-ordered-lists` |
| 10 | `/tutorials/html5-complete-course/tables-structured-data` | 301 (Permanent) | `/tutorials/html5-complete-course/html-tables` |
| 11 | `/tutorials/html5-complete-course/tables` | 301 (Permanent) | `/tutorials/html5-complete-course/html-tables` |
| 12 | `/tutorials/html5-complete-course/block-and-inline` | 301 (Permanent) | `/tutorials/html5-complete-course/block-vs-inline-elements` |
| 13 | `/tutorials/html5-complete-course/images-multimedia-embeds` | 301 (Permanent) | `/tutorials/html5-complete-course/images-responsive-art` |
| 14 | `/tutorials/html5-complete-course/forms-inputs-validations` | 301 (Permanent) | `/tutorials/html5-complete-course/forms-input-types` |
| 15 | `/tutorials/html5-complete-course/html5-semantic-architecture` | 301 (Permanent) | `/tutorials/html5-complete-course/semantic-layout-elements` |
| 16 | `/tutorials/html5-complete-course/accessibility-aria-seo` | 301 (Permanent) | `/tutorials/html5-complete-course/accessibility-aria` |

---

## 4. Verification & Testing
Run the automated URL auditor anytime before production deployment:
```bash
npm run audit:urls
```
Result: `0 broken internal links found across 1,676 routes and 31 redirects.`
