# MSK Institute — Internal Linking Architecture & Graph Strategy

**Platform:** `https://www.mskinstitute.in`  
**Topology:** Hybrid Hub-and-Spoke + Contextual Mesh  
**Status:** Implemented in Production  

---

## 1. Architectural Topology: Hub-and-Spoke Cluster Model

Internal links pass crawl equity, establish topical relevance hierarchies, and guide prospective students along a seamless educational journey toward admissions.

```text
                                  [ HOMEPAGE: / ]
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  [ COURSE CATALOG ]            [ STUDY MATERIAL HUB ]             [ BLOGS PORTAL ]
   /courses                      /study-material                   /blogs
        │                                │                                │
        ▼                                ▼                                ▼
[ Course Detail Pages ]         [ Tutorial Hubs & Lessons ]       [ Editorial & Roadmaps ]
 /courses/[slug]                 /tutorials/[slug]/[topic]         /blogs/[slug]
        │                                │                                │
        └─────────────────┬──────────────┴────────────────────────────────┘
                          ▼
                 [ LIVE COHORT BATCHES ]
                  /live-batches/[id]
                          ▼
                 [ ADMISSIONS CONVERSION ]
                  /contact (Free Demo / Lead)
```

---

## 2. Page Type Interlinking Specifications

### A. Course Landing Pages (`/courses/[slug]`)
Every single course detail page now features the `<CourseRelatedContent>` engine mounted above the footer:
- **Upstream Link:** Breadcrumb back to `/courses` (Course Catalog) and `/` (Homepage).
- **Lateral Educational Links:** 3–4 direct links to matching interactive tutorial series (`/tutorials/[slug]`).
- **Lateral Editorial Links:** Direct links to related viva interview guides and career roadmaps (`/blogs/[slug]`).
- **Downstream Commercial Links:** Direct links to active cohorts (`/live-batches/[id]`) with dates and status badges.
- **Direct Lead CTAs:** Embedded free demo booking form (`DemoBookingForm`) and floating WhatsApp bubble.

### B. Interactive Tutorial Lessons (`/tutorials/[slug]/[topicSlug]`)
- **Upstream Hub Link:** Header breadcrumb linking to `/tutorials/[slug]` (Series Index) and `/study-material`.
- **Sequential Navigation:** Previous Lesson (`← prevTopic`) and Next Lesson (`nextTopic →`) with chapter title anchors.
- **Reference Cheatsheet Link:** Direct link to matching quick-reference cheatsheet on `/study-material` (e.g. `cheat-python-beginners`).
- **Parent Course Link:** Prominent sidebar card linking to the associated commercial course with lead counselor info.
- **Interactive Practice Link:** Embedded Monaco editor sandbox (`/playground`) and self-assessment quiz modal.

### C. Educational Blog Posts (`/blogs/[slug]`)
- **Breadcrumb Link:** Upstream link to `/blogs` (Publications Hub).
- **Featured Course Card:** Embedded sidebar and in-content recommendation box linking to `blog.relatedCourseSlugs` (e.g. Full-Stack Roadmap linking to Full-Stack Bootcamp).
- **Author Entity Link:** Verified author card linking to Er. Sumit Kumar and the MSK About page (`/about`).
- **Topic Tags:** Categorical links to related study materials.

### D. Global Header & Footer Navigation
- **Header:** Sticky desktop & mobile menu with direct links to Home, All Courses, Live Batches, Study Material, Publications, Tools, and Contact.
- **Footer:** Structured 4-column directory linking to Core Pages, Course Categories, Study Resources, Tools (TypeQuest, Code Playground), Legal pages, and direct Click-to-Call / Google Maps links.

---

## 3. Anchor Text Best Practices & Spam Prevention

To maintain full compliance with Google's search spam policies, MSK Institute strictly prohibits mechanical, repetitive exact-match anchor text:

| Recommended Natural Anchors (Contextual) | Prohibited Unnatural Anchors (Spam Risk) |
| :--- | :--- |
| "Explore Python Programming Masterclass syllabus" | "best python course in shikohabad" (repeated 15 times) |
| "Review SQL multi-table JOIN practical examples" | "click here" / "read more" (uninformative) |
| "Check upcoming weekend cohort dates" | "top computer institute coaching center" |
| "Read our complete Full-Stack Web Development roadmap" | "cheap computer classes" |

### Anchor Text Rules
1. Anchor text must describe the target page's specific educational topic or outcome.
2. Every link must provide genuine navigational utility to a human learner.
3. No artificial link farms or reciprocal link rings are permitted.
