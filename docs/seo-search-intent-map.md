# MSK Institute — Search Intent Classification & SERP Strategy

**Platform:** `https://www.mskinstitute.in`  
**Standard:** Google Search Quality Evaluator Guidelines & User Intent Categorization  
**Status:** Active Intent Architecture  

---

## 1. The Eight Educational Search Intents

Users searching for computer training and coding tutorials exhibit distinct informational and transactional expectations. Matching the wrong page type to an intent causes high bounce rates and ranking stagnation.

```text
[ Informational ] ──► Blogs, Guides, Explanations (What is X? How does Y work?)
[ How-To / Code ] ──► Tutorials (Syntax, Code Examples, Debugging)
[ Commercial ]    ──► Course Detail Pages (Syllabus, Duration, Lab Facilities, Certificate)
[ Local Intent ]  ──► Homepage, Contact Page (Shikohabad address, directions, phone number)
[ Career / Viva ] ──► Viva Questions, Interview Answers, Roadmap Blogs
[ Resource ]      ──► Cheatsheets, Handbooks, Practice Datasets
[ Transactional ] ──► Live Batches, Cohort Enrollment, Demo Class Booking
[ Navigational ]  ──► Homepage, Certificate Verification Portal
```

---

## 2. Intent Classification Matrix

| Search Intent | User Question / Mental Model | Appropriate Page Type | Inappropriate Page Type (Will Fail) | Expected SERP Features | Recommended Call-to-Action (CTA) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Commercial / Course** | "I want to join a structured Python course with offline practical labs." | `/courses/[slug]` | Plain tutorial or short blog without syllabus. | Course rich snippets, provider ratings. | "Request a Free 2-Day Demo Class" / "View Syllabus & Fees" |
| **2. Local / Institutional** | "Where is the best computer center near me in Shikohabad?" | `/` (Homepage) or `/contact` | Generic online-only tutorial without address. | Google Local 3-Pack, Google Maps, LocalBusiness card. | "Call +91 83930 42166" / "Get Lab Directions on Google Maps" |
| **3. Educational / How-To** | "How do I write a for-loop in Python with list comprehension?" | `/tutorials/[slug]/[topic]` | Sales page asking for payment upfront. | Code block snippet, syntax table, PAA (People Also Ask). | "Practice in Web Playground" / "Next Lesson: Functions" |
| **4. Career & Interview** | "What questions will the interviewer ask for a junior Python role?" | `/blogs/[slug]` | Course catalog with no interview questions. | Featured Snippet list, Table of Contents. | "Download Full 50-Question PDF" / "Explore Python Masterclass" |
| **5. Resource / Reference** | "I need a quick cheat sheet for SQL queries and commands." | `/study-material` | 3,000-word promotional article. | Direct download button, tabular cheatsheet. | "Download Free Printable PDF" / "Browse Interactive Tutorials" |
| **6. Transactional / Cohort**| "When does the next weekend Python batch start in Shikohabad?" | `/live-batches/[id]` | Expired blog from 2 years ago. | Event date snippets, seat availability badge. | "Reserve Your Seat (Limited Lab Workstations)" |
| **7. Educational Roadmap** | "What is the complete path from zero to full-stack developer in 2026?" | `/blogs/[slug]` | Single topic tutorial (e.g. just CSS margins). | Numbered steps, SVG architecture diagram. | "Read Next: Web Dev Course Details" / "Talk to Counselor" |
| **8. Trust / Verification** | "Is this student's MSK diploma authentic?" | `/verify-certificate` | Generic blog about certificates. | Form search input, verified badge. | "Verify Student Certificate ID" |

---

## 3. SERP Intent Alignment Guidelines

### Rule 1: No Transactional Hard Sells on First-Touch Informational Queries
When a learner searches *"what is sql join"*, they need a crisp 2-sentence definition followed by an illustrative diagram and syntax table. Forcing a full-screen registration popup causes immediate bounce. Instead:
- Provide the answer directly at the top of the lesson (featured-snippet ready).
- Offer an interactive Monaco playground or practice quiz.
- Provide a subtle contextual CTA at the bottom: *"Master database design in our hands-on SQL & MySQL practical lab in Shikohabad."*

### Rule 2: Dedicated Local Focus on Geographically Bound Queries
Queries containing *"in Shikohabad"*, *"near me"*, *"Station Road"*, or *"Firozabad district"* must resolve to pages containing genuine, verifiable local attributes:
- Physical campus address: `Gali No. 3, Near Gyan Jyoti Public School`.
- Exact landmark references and commuting instructions.
- Real lab photographs and offline classroom timings.
- Direct phone number: `+91 83930 42166`.

### Rule 3: Single Intent Ownership
If a query matches an existing course landing page, do not publish a duplicate doorway page targeting the identical query. Instead, optimize the existing canonical course page.
