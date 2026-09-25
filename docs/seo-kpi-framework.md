# SEO & Conversion KPI Measurement Framework

**Brand:** MSK Institute (Mastering Software Knowledge)  
**Website:** `https://www.mskinstitute.in`  
**Measurement Engines:** Google Search Console + Google Analytics 4 (`G-6CQ1F72VS0`)  
**Reporting Interval:** Monthly Performance Reviews  

---

## 1. High-Level KPI Matrix

The MSK Institute performance measurement model balances technical crawl health, organic search discovery, and commercial conversion yield:

```text
[ Technical Crawl Health ] ──► [ Organic Search Reach ] ──► [ Admissions Funnel Yield ]
    • 0 5xx/404 errors            • Impressions & Clicks         • WhatsApp inquiries
    • 100% Good CWV               • Top 3 Local 3-Pack           • Free demo bookings
    • Clean Sitemap Index         • Rich Results CTR             • Cohort registrations
```

---

## 2. Technical SEO & Indexation KPIs

| Metric | Measurement Source | Target / Benchmark | Review Frequency | Action Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **Indexed Canonical Ratio** | GSC Page Indexing | **> 95% of sitemap** | Weekly | Indexation drops below 90% |
| **5xx Server Errors** | GSC Indexing Report | **0 errors** | Weekly | Any 5xx occurrence |
| **Internal Broken Links (404)** | `npm run audit:urls` | **0 errors** | Per deployment | Any broken internal URL |
| **Largest Contentful Paint (LCP)**| GSC Core Web Vitals / PSI | **< 2.2 seconds** | Bi-weekly | LCP > 2.5s on 75th percentile |
| **Interaction to Next Paint (INP)**| GSC Core Web Vitals | **< 150 ms** | Bi-weekly | INP > 200ms |
| **Cumulative Layout Shift (CLS)** | GSC Core Web Vitals | **< 0.05** | Bi-weekly | CLS > 0.1 |
| **Rich Result Validity** | GSC Enhancements | **100% Valid (0 Errors)**| Monthly | Any Course or FAQ schema error |

---

## 3. Organic Discovery & Local Search KPIs

| Metric | Measurement Source | 6-Month Target | 12-Month Target |
| :--- | :--- | :--- | :--- |
| **Monthly Organic Clicks** | GSC Performance | **1,500+ clicks/mo** | **5,000+ clicks/mo** |
| **Monthly Search Impressions**| GSC Performance | **40,000+ imp/mo** | **120,000+ imp/mo** |
| **Average Organic CTR** | GSC Performance | **> 3.5%** | **> 4.5%** |
| **Google Local 3-Pack Rank** | Google Maps (Shikohabad) | **Rank #1–#2** for "computer center shikohabad" | **Rank #1** across all 5 target clusters |
| **Top 10 Keyword Portfolio** | GSC Query Report | **15+ commercial keywords in Top 5** | **40+ commercial keywords in Top 5** |
| **Google Business Profile Views**| GBP Performance | **800+ profile interactions/mo** | **2,500+ profile interactions/mo** |

---

## 4. Conversion & Admissions Funnel KPIs

Every visitor interaction maps to a discrete telemetry event in GA4:

```text
Visitor Arrival (page_view)
       │  [ ~35% visit catalog / course ]
       ▼
Course Consideration (view_item / batch_view)
       │  [ ~10% trigger inquiry CTA ]
       ▼
Inquiry Interaction (whatsapp_click / phone_click / form_start)
       │  [ ~25% complete submission ]
       ▼
Verified Admission Lead (generate_lead / demo_request / enrollment_submit)
```

| Funnel Metric | GA4 Event Name | Target Monthly Volume | Conversion Definition |
| :--- | :--- | :--- | :--- |
| **Direct WhatsApp Leads** | `whatsapp_click` | **75 – 120 leads/mo** | Unique clicks to wa.me with course/batch intent |
| **Inbound Phone Inquiries** | `phone_click` | **40 – 60 calls/mo** | Mobile clicks on `tel:+918393042166` |
| **Web Contact Leads** | `generate_lead` (form: `contact_us_form`) | **30 – 50 leads/mo** | Validated server lead submissions |
| **Free Trial Bookings** | `demo_request` | **25 – 40 bookings/mo** | Free 2-day trial registrations |
| **Live Batch Enrollments** | `enrollment_submit` | **15 – 30 enrollments/mo**| Direct cohort registration form submissions |
| **Total Qualified Leads** | Aggregate Conversions | **180 – 300 inquiries/mo**| Total monthly high-intent admissions pipeline |

---

## 5. Monthly Executive Review Dashboard Template

On the first Monday of each calendar month, compile the following KPI scorecard:

```markdown
# MSK Institute — Monthly Performance Scorecard [Month, Year]

### 1. Organic Traffic & Rankings (GSC)
- Total Organic Clicks: [X] (MoM: +[Y]%)
- Total Impressions: [X] (MoM: +[Y]%)
- Avg Position on "computer center shikohabad": [X.X]
- Avg Position on "python course shikohabad": [X.X]
- Core Web Vitals Status: [Good / Needs Improvement]

### 2. Conversions & Admission Leads (GA4)
- Direct WhatsApp Inquiries: [X]
- Telephone Calls: [X]
- Web Form Inquiries: [X]
- Free Demo Requests: [X]
- Cohort Registrations: [X]
- **Total Pipeline Leads:** [X]

### 3. Top-Performing Course Landing Pages
1. /courses/[slug-1]: [X] views, [Y] leads
2. /courses/[slug-2]: [X] views, [Y] leads
3. /live-batches: [X] views, [Y] leads

### 4. Technical Health & Indexing Check
- Valid Sitemaps: 1/1 (sitemap.xml)
- Discovered & Indexed Pages: [X] / 1,688
- Crawl Errors: 0
```
