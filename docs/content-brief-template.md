# MSK Institute — Editorial Content Brief & Production Template

**Standard:** E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) & People-First Content  
**Target Platform:** MSK Institute Publications (`/blogs`) & Tutorial Hubs (`/tutorials`)  
**Audience:** College students, job seekers, career switchers, and government diploma aspirants in Shikohabad and Western UP.  

---

## 1. Content Brief Metadata Specification

```yaml
# ============================================================================
# CONTENT BRIEF SPECIFICATION
# ============================================================================
article_id: "brief-[topic-slug]"
target_query: "[Primary user search query, e.g. 'how to prepare for nielit ccc exam']"
search_intent: "[Informational | Career / Viva | How-To / Code | Resource]"
primary_keyword: "[Core keyword, natural phrasing]"
secondary_keywords:
  - "[Semantic keyword 1]"
  - "[Semantic keyword 2]"
  - "[Semantic keyword 3]"
target_audience: "[Beginner / College student / Working professional]"
reading_time: "[Estimated read time, e.g. '6 min read']"
language: "Bilingual (Clear English with Hindi contextual explanations)"

# ============================================================================
# METADATA & CANONICAL TARGETS
# ============================================================================
recommended_url: "https://www.mskinstitute.in/blogs/[slug]"
meta_title: "[Primary Topic | Benefit or Outcome | MSK Institute]"
meta_description: "[140-155 characters summarizing key takeaway without keyword stuffing]"
canonical_url: "https://www.mskinstitute.in/blogs/[slug]"

# ============================================================================
# KNOWLEDGE GRAPH & INTERNAL LINKING RELATIONSHIPS
# ============================================================================
primary_course_connection: "[Slug of primary commercial course, e.g. 'nielit-ccc-course-on-computer-concepts']"
supporting_tutorial_slugs:
  - "[Slug of related tutorial series, e.g. 'ccc']"
supporting_cheatsheet_id: "[ID of matching cheatsheet, e.g. 'cheat-excel-top50']"
active_batch_connection: "[ID of active cohort, e.g. 'batch-python-summer-2026']"
```

---

## 2. Structural Content Outline (Headings & Questions to Answer)

### Introduction (No Fluff)
- **Problem Statement:** What specific problem does this guide solve for the student?
- **Direct Answer Box (Snippet-Ready):** 2–3 sentences defining the core answer immediately below the H1 for Google featured snippets.
- **Who Needs This:** Clarify who benefits (e.g. 1st-year BCA students, CCC applicants).

### Section 1: Foundational Concept & Practical Breakdown (H2)
- Plain-language explanation using real-world analogies.
- Visual diagram, code syntax box, or comparison table.

### Section 2: Step-by-Step Practical Lab Walkthrough (H2)
- Code implementation or hands-on procedure.
- Common errors students make in the lab and how to debug them.

### Section 3: Original MSK Practice Exercise or Dataset (H2)
- A realistic coding exercise or downloadable dataset created by MSK faculty.
- Self-assessment questions or quiz prompt.

### Section 4: External Viva & Interview Questions (H2)
- Top 3–5 real questions external examiners or technical recruiters ask on this topic with concise model answers.

### Section 5: Next Steps & Practical Lab Training (H2)
- Contextual link to the full course curriculum at MSK Institute Shikohabad.
- Free 2-day demo class booking invitation.

---

## 3. Editorial Quality Gate & Pre-Publish Checklist

Before setting `status: "PUBLISH"`, verify the following standards:

- [ ] **People-First Evaluation:** Does this article provide genuine educational value, or was it written merely to rank for a keyword?
- [ ] **Originality Check:** Does the article include original code examples or MSK lab insights rather than rewritten Wikipedia summaries?
- [ ] **Accurate Sourcing:** Are software versions, exam dates, or certification rules verified against official documentation (e.g., Python 3.12+, NIELIT official circulars, W3C standards)?
- [ ] **Zero Fabricated Outcomes:** Does the article strictly avoid promising guaranteed salaries, fake placement statistics, or exaggerated exam pass rates?
- [ ] **Valid Internal Links:** Are all links pointing to live, 200 OK canonical routes (no redirects, no broken paths)?
- [ ] **Author Transparency:** Is the article attributed to an actual MSK instructor (e.g., Er. Sumit Kumar) with verifiable credentials?
- [ ] **Mobile & Formatting:** Are code blocks styled with syntax highlighting and tables mobile-responsive?
