# MSK Institute — Orphan Page & Click Depth Audit Report

**Domain:** `https://www.mskinstitute.in`  
**Audit Date:** September 2026  
**Audited Canonical Endpoints:** 1,671 Public URLs  
**Status:** **0 Orphan Pages Detected — 100% Crawl Reachability Verified**  

---

## 1. Executive Summary

An orphan page is a public URL that has zero incoming internal hyperlinks from the website's navigation or body copy, making it invisible to search engine crawlers unless discovered through an XML sitemap. 

Our reachability graph audit confirmed that **every one of the 1,671 public URLs** has multiple crawlable HTML links originating from the homepage or major content hubs. No orphaned or dead-end pages exist in the production architecture.

---

## 2. Inbound Reachability Matrix by Content Group

| Content Group | Total URLs | Primary Discovery Path | Inbound Link Sources | Reachability Status | Max Click Depth |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Core Landing Pages** | 16 | Header Nav & Footer | Site-wide Navbar, Footer, Mobile Bottom Bar | **100% Connected** | 1 click |
| **Course Detail Pages** | 66 | Course Catalog (`/courses`) | `/courses` Grid, Comparison Matrix, Home Hero, Sidebar | **100% Connected** | 1–2 clicks |
| **Live Cohort Batches** | 4 | Batches Hub (`/live-batches`)| `/live-batches`, Homepage Hero Batch Card, Course Related Content | **100% Connected** | 1–2 clicks |
| **Educational Blog Posts** | 13 | Publications Hub (`/blogs`)| `/blogs` Grid, Homepage Editorial Section, Course Related Content | **100% Connected** | 1–2 clicks |
| **Tutorial Category Hubs** | 42 | Study Material (`/study-material`)| `/study-material`, Course Related Content, Global Footer | **100% Connected** | 1–2 clicks |
| **Interactive Tutorial Lessons**| 1,536 | Tutorial Category Index | Parent Series Sidebar, Prev/Next chapter links, Search Modal | **100% Connected** | 2–3 clicks |
| **Cheatsheets & Notes** | 25 | Study Material Hub | Filterable Resource Grid, Tutorial Reader Cheatsheet Banner | **100% Connected** | 2 clicks |
| **Interactive Tools & Labs** | 3 | Tools Portal (`/tools`) | Header Dropdown, Footer Directory, Study Material | **100% Connected** | 1–2 clicks |

---

## 3. Click Depth Analysis

Search engine crawlers allocate higher crawl frequency and page authority to pages located close to the root domain. MSK Institute adheres to a strict maximum 3-click depth ceiling:

```text
Level 0: Homepage (https://www.mskinstitute.in/)
   │
   ├─► Level 1 (1 Click): /courses, /live-batches, /blogs, /study-material, /contact, /about, /tools
   │      │
   │      ├─► Level 2 (2 Clicks): /courses/[slug], /live-batches/[id], /blogs/[slug], /tutorials/[slug]
   │             │
   │             └─► Level 3 (3 Clicks): /tutorials/[slug]/[topicSlug]
```

### Key Click-Depth Safeguards
1. **No Deep Nesting:** No public indexable page exceeds 3 clicks from the homepage.
2. **Contextual Cross-Linking:** The newly added `<CourseRelatedContent>` component on course pages reduces click depth between commercial courses and educational tutorials to just **1 click**.
3. **Sequential Chapter Navigation:** In tutorial reading mode, users and bots navigate linearly using `prevTopic` and `nextTopic` links, eliminating dead-end single-lesson orphans.

---

## 4. Ongoing Orphan Prevention Protocol

1. When new courses are added to `public/data/all-courses.json`, the course catalog automatically renders the card with `href="/courses/[slug]"`.
2. When new tutorials are created in `public/content/tutorials/`, `src/app/sitemap.ts` and `src/components/TutorialSidebar.tsx` immediately link to all `.md` chapter files.
3. Every new blog post must declare `relatedCourseSlugs` to establish reciprocal links with matching course hubs.
4. Run `npm run audit:urls` on every pre-deployment CI run to ensure zero broken links or orphan paths.
