# MSK Institute — 30-Day SEO Execution Plan (Month 1)

**Theme:** Existing Page Optimization, Technical Foundation & Internal Linking Graph  
**Period:** Days 1 – 30  
**Focus:** Quality over quantity. Zero low-value programmatic page generation.  

---

## 1. Weekly Execution Breakdown

### Week 1: Search Console Verification & Local Foundation
- **Task 1.1:** Add DNS TXT record for `mskinstitute.in` or configure `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the production environment.
- **Task 1.2:** Submit `https://www.mskinstitute.in/sitemap.xml` in Search Console.
- **Task 1.3:** Manually request indexing for the 8 Tier-1 Priority URLs using the URL Inspection tool.
- **Task 1.4:** Update Google Business Profile (GBP) with exact canonical address (`Gali No. 3, Near Gyan Jyoti Public School, Shikohabad, UP 283135`) and UTM-tagged website links.
- **Task 1.5:** Run automated CI suites: `npm run validate:seo`, `npm run validate:local`, `npm run audit:urls`.

### Week 2: Tier-1 Flagship Course Landing Page Polish
- **Task 2.1:** Review the top 5 commercial courses for intent precision:
  1. `/courses/python-programming-masterclass`
  2. `/courses/full-stack-web-development-bootcamp`
  3. `/courses/nielit-ccc-course-on-computer-concepts`
  4. `/courses/advanced-diploma-computer-applications-adca`
  5. `/courses/data-analytics-python-excel`
- **Task 2.2:** Verify that `<CourseRelatedContent>` dynamically displays related tutorial lessons, viva blogs, and live batches on all 5 flagship pages.
- **Task 2.3:** Enhance module descriptions to emphasize practical portfolio project outcomes.
- **Task 2.4:** Validate that lead booking forms (`DemoBookingForm`) properly fire `generate_lead` and `demo_request` with zero PII.

### Week 3: Tutorial Lessons & Featured Snippet Optimization
- **Task 3.1:** Optimize the top 10 most critical tutorial lessons with direct answer summary boxes immediately below the H1:
  - `/tutorials/python-for-beginners/loops` (Python Loops)
  - `/tutorials/python-for-beginners/functions` (Python Functions)
  - `/tutorials/sql-for-beginners/joins` (SQL JOINs)
  - `/tutorials/html5-complete-course/forms` (HTML5 Forms)
  - `/tutorials/ms-excel-for-beginners/formulas` (Excel Formulas)
- **Task 3.2:** Verify that all 13 educational blog posts declare valid `relatedCourseSlugs` to cross-link back to relevant courses.
- **Task 3.3:** Audit cheatsheet download buttons in `TutorialReader.tsx` to ensure zero broken resource links.

### Week 4: First Monthly Crawl Review & Ranking Audit
- **Task 4.1:** Review Search Console **Page Indexing Report** for new exclusions, 404s, or crawl anomalies.
- **Task 4.2:** Analyze GSC **Performance Report** to identify "striking distance" queries ranking between positions 4–20 for meta description and title tag refinements.
- **Task 4.3:** Run full validation regression:
  ```bash
  npm run validate:courses
  npm run validate:batches
  npm run validate:seo
  npm run audit:urls
  npm run validate:analytics
  npm run validate:local
  npm run validate:seo-growth
  npm run typecheck
  ```
- **Task 4.4:** Compile Month 1 Executive SEO Scorecard.
