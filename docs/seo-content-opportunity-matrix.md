# MSK Institute — SEO Content Opportunity Matrix

**Platform:** `https://www.mskinstitute.in`  
**Prioritization Standard:** P0 (Critical Existing Page Improvement) | P1 (High-Value Content Gap) | P2 (Strategic Expansion) | P3 (Optional)  

---

## 1. Prioritized Opportunity Matrix

| Topic | Search Intent | Existing URL / Asset | Content Gap Identified | Recommended Action & Target URL | Priority | Connected Course | Related Educational Resource |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Course Page Internal Linking** | Commercial / Navigation | `/courses/[slug]` | Course detail pages lack direct widgets linking to related tutorials, blogs, and upcoming batches. | Implement `<CourseRelatedContent>` component on `/courses/[slug]` linking to topical tutorials, blogs, and live batches. | **P0** | All 66 Courses | `/tutorials/...`, `/blogs/...`, `/live-batches/...` |
| **Python Practice Exercises** | Educational / Practical | `/tutorials/python-for-beginners` | Learners need downloadable practice exercises and code challenges alongside syntax lessons. | Add downloadable Python Practice Problem Set & solution notebooks on `/study-material`. | **P1** | Python Programming Masterclass | Python Cheatsheet |
| **SQL JOIN Visual Guide** | Informational / How-To | `/tutorials/sql-for-beginners/joins` | SQL JOIN queries are high-dropoff concepts requiring visual Venn/table diagrams. | Enhance lesson with SVG relational join diagrams and realistic practice datasets (Employees & Departments). | **P1** | SQL Database Mastery | SQL Cheatsheet |
| **Excel Financial Modeling** | Commercial / Practical | `/courses/advanced-excel-business-analytics` | Working professionals seek business dashboard models and GST invoicing templates. | Add practical downloadable Excel exercise dataset (`msk-sales-data.xlsx`) for hands-on practice. | **P1** | Advanced Excel Business Analytics | Top 10 Excel Formulas Blog |
| **Full-Stack Project Showcase**| Commercial / Social Proof | `/courses/full-stack-web-development-bootcamp` | Prospective students need to see actual student-built web applications before enrolling. | Add dedicated "Featured Lab Projects" section detailing student-built MERN e-commerce and task apps. | **P1** | Full-Stack Web Development Bootcamp | Full-Stack Roadmap Blog |
| **CCC Mock Test Exam Lab** | Educational / Practice | `/tools/typing` | CCC aspirants in Shikohabad need interactive computerized mock tests matching the NIELIT interface. | Create interactive CCC Objective Quiz module inside `/tools` or `/study-material`. | **P1** | NIELIT CCC Certification Course | CCC Exam Preparation Blog |
| **Power BI DAX Cheatsheet** | Resource / Reference | `/tutorials/power-bi-for-beginners` | Students learning DAX measures lack a single-page downloadable reference sheet. | Publish "Power BI DAX Essential Formulas" printable cheatsheet on `/study-material`. | **P2** | Data Analytics with Python & Excel | Power BI Tutorial Series |
| **Git & GitHub Workflow Lab** | Informational / Practical | `/tutorials/git--github-basics` | Students struggle with merge conflicts, pull requests, and branching strategies. | Add interactive Git command flowchart and terminal simulation to `/tutorials/git--github-basics`. | **P2** | Full-Stack Web Development Bootcamp | Git Cheatsheet |
| **React Hooks Deep Dive** | Informational / Advanced | `/tutorials/react-js-for-advanced` | Modern React learners need practical `useMemo`, `useCallback`, and custom hook real-world patterns. | Expand advanced React tutorial topics with custom hook patterns and performance benchmarks. | **P2** | React Modern Web Development | Code Playground Sandbox |
| **Cyber Security Lab Basics** | Educational / Awareness | `/blogs/demystifying-cyber-security...`| Practical steps for setting up Kali Linux in VirtualBox for educational defense training. | Publish "VirtualBox Linux Lab Setup for Beginners" educational guide. | **P2** | Cyber Security Fundamentals | Cyber Security Blog |
| **Hindi Touch Typing Lab** | Utility / Local Prep | `/tools/typing` | Local government exam aspirants need KrutiDev / Mangal typing layout practice. | Expand TypeQuest to include dedicated Hindi Remington/Inscript keyboard drills. | **P3** | NIELIT CCC & ADCA Courses | TypeQuest Typing Lab |
| **Web Dev Viva Flashcards** | Career / Exam Prep | `/blogs/html5-css3-top-50-viva...` | College diploma students seek quick-flip flashcards before practical external viva examinations. | Create interactive viva question accordion filter on `/study-material`. | **P3** | HTML5 & CSS3 Modern UI Design | HTML5 Viva Blog |

---

## 2. Priority Action Summary

- **P0 Priority (Immediate Code Implementation):**
  - Implement a dynamic **Related Content Engine** in `src/components/CourseRelatedContent.tsx` that links every course landing page to its topical tutorial series, related blogs, and active live cohorts.
  - Implement an intelligent **SEO Metadata Utility** in `src/lib/seo.ts` providing standard schema, canonical, and OpenGraph defaults with manual overrides.
- **P1 Priority (Month 1 Roadmap):**
  - Enrich top commercial courses with downloadable practice problem datasets.
  - Enhance high-traffic tutorial lessons (Python loops, SQL joins, Excel lookups) with direct answer summaries and diagrams.
- **P2 Priority (Month 2 Roadmap):**
  - Expand DAX and Git reference cheat sheets in Study Material Hub.
- **P3 Priority (Month 3 Roadmap):**
  - Add interactive exam quizzes and typing drills for regional job seekers.
