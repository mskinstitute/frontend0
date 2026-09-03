import { Metadata } from 'next';
import { fetchLiveSchedule } from '@/services/api';
import LiveScheduleClient from '@/components/LiveScheduleClient';

export const metadata: Metadata = {
  title: "Live Computer Classes, Coding Sessions & Batches in Shikohabad | MSK Institute",
  description: "Attend daily interactive live coding classes in Shikohabad by Er. Sumit Kumar. Check today's live lecture timetable, 7-day upcoming schedules for Python, Full-Stack MERN, Frontend & NIELIT CCC, and enroll in upcoming live cohorts.",
  keywords: [
    "Live Computer Classes Shikohabad",
    "MSK Institute Live Schedule",
    "Python Live Coding Classes Shikohabad",
    "MERN Stack Live Training Shikohabad",
    "NIELIT CCC Live Batch Shikohabad",
    "Er. Sumit Kumar Live Lecture",
    "Best Computer Institute in Shikohabad",
    "Google Meet Live Coding Class",
    "YouTube Live Coding Lecture",
    "Online Computer Institute UP",
    "Computer Institute Near Station Road Shikohabad"
  ],
  alternates: {
    canonical: "https://mskinstitute.in/live",
  },
  openGraph: {
    title: "Live Computer Classes & Programming Schedule | MSK Institute Shikohabad",
    description: "Daily interactive live computer training, real-time timetable, topics covered, and enrollment for upcoming coding cohorts in Shikohabad.",
    url: "https://mskinstitute.in/live",
    siteName: "MSK Institute",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://mskinstitute.in/logo.jpg",
        width: 1200,
        height: 630,
        alt: "MSK Institute Live Classes Schedule Shikohabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Computer Classes & Coding Schedule | MSK Institute",
    description: "Join real-time interactive lectures, check daily class topics, and enroll in new live batches in Shikohabad.",
    images: ["https://mskinstitute.in/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LivePage() {
  const { classes, batches } = await fetchLiveSchedule();

  // Helper to calculate exact date strings for JSON-LD from date and startTime/endTime
  const getClassISO = (dateStr?: string, timeStr?: string) => {
    try {
      if (!dateStr || !timeStr) return new Date().toISOString();
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const [timeVal, modifier] = timeStr.trim().split(' ');
      let [hours, minutes] = (timeVal || '0:0').split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      date.setHours(hours, minutes, 0, 0);
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const faqItems = [
    {
      q: "What live computer classes are held at MSK Institute Shikohabad?",
      a: "MSK Institute conducts daily real-time live classes covering Python Programming, Full-Stack MERN Development (React, Node.js, Express, MongoDB), Responsive Frontend Engineering (HTML5, Tailwind CSS, JavaScript), and NIELIT CCC preparation. Every lecture features practical coding demonstrations and instant doubt resolution."
    },
    {
      q: "How can students join a live online class?",
      a: "Students can join active sessions directly through the Live Schedule page (https://mskinstitute.in/live). Sessions marked 'LIVE NOW' feature a direct 'Join Now' button linking to Google Meet, YouTube Live, or Zoom. Upcoming sessions show exact start times, topics covered, and countdown clocks."
    },
    {
      q: "Who conducts the live programming sessions at MSK Institute?",
      a: "All live classes and programming cohorts are led by Er. Sumit Kumar, Senior Software Engineer and Lead Instructor with over 8 years of industry experience in web architecture, software development, and technical mentoring in Shikohabad."
    },
    {
      q: "How do browser reminder notifications work?",
      a: "Clicking 'Set Reminder' on any class in the 7-day schedule registers a browser-level alert. You will automatically receive a desktop or mobile push notification when the mentor begins the live classroom stream."
    },
    {
      q: "Can students attend classes offline at the Shikohabad centre?",
      a: "Yes! MSK Institute operates a hybrid education model. Students in and around Shikohabad (Firozabad, UP) can attend live lectures in person at our fully-equipped computer laboratory with 1-on-1 mentor guidance."
    },
    {
      q: "How do I enroll in new upcoming live batches?",
      a: "Review the 'Upcoming Live Batches' section on the Live page, select your desired batch, and click 'View Details' to submit your registration. You can also visit our Shikohabad centre near Station Road or call our coordinator at +91 83930 42166."
    }
  ];

  // Compile Comprehensive JSON-LD schema for AI agents, crawlers & search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization Details
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": "https://mskinstitute.in/#organization",
        "name": "MSK Institute",
        "alternateName": ["MSK Computer Institute", "MSK Institute Shikohabad", "MSK Live Classroom"],
        "url": "https://mskinstitute.in",
        "logo": "https://mskinstitute.in/logo.jpg",
        "image": "https://mskinstitute.in/logo.jpg",
        "description": "Premier Computer Institute in Shikohabad offering live interactive coding classes, full-stack software development cohorts, and certified computer courses.",
        "telephone": "+91-8393042166",
        "email": "mskshikohabad@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Arya Samaj Mandir, Station Road",
          "addressLocality": "Shikohabad",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "283135",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1084,
          "longitude": 78.5846
        },
        "founder": {
          "@type": "Person",
          "name": "Er. Sumit Kumar",
          "jobTitle": "Lead Instructor & Software Engineer"
        }
      },
      // 2. WebPage Entity
      {
        "@type": "WebPage",
        "@id": "https://mskinstitute.in/live#webpage",
        "url": "https://mskinstitute.in/live",
        "name": "Live Computer Classes & Programming Schedule | MSK Institute",
        "description": "Attend live coding lectures, check 7-day upcoming class agendas, and register for new batches in Shikohabad.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://mskinstitute.in/#website",
          "url": "https://mskinstitute.in",
          "name": "MSK Institute"
        },
        "about": [
          { "@type": "Thing", "name": "Computer Programming" },
          { "@type": "Thing", "name": "Full-Stack Web Development" },
          { "@type": "Thing", "name": "Python Programming" },
          { "@type": "Thing", "name": "NIELIT CCC Course" }
        ],
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "@id": "https://mskinstitute.in/live#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://mskinstitute.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Live Classroom Schedule",
              "item": "https://mskinstitute.in/live"
            }
          ]
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".live-hero-desc", ".live-faq-answer"]
        }
      },
      // 3. ItemList of Scheduled Classes
      {
        "@type": "ItemList",
        "name": "MSK Live Classes Timetable",
        "description": "Daily and upcoming 7-day live classroom sessions",
        "itemListElement": classes.map((c, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": c.title || c.courseTitle || 'Live Interactive Class',
          "description": c.topics ? `Topics: ${c.topics.join(', ')}` : c.description
        }))
      },
      // 4. EducationEvents for each class
      ...classes.map(c => ({
        "@type": "EducationEvent",
        "name": c.title || c.courseTitle || 'Live Interactive Class',
        "description": `Topics covered: ${(c.topics || []).join(', ')}. Taught live by ${c.instructor || 'Er. Sumit Kumar'} at MSK Institute Shikohabad.`,
        "startDate": getClassISO(c.date, c.startTime),
        "endDate": getClassISO(c.date, c.endTime),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
          "@type": "VirtualLocation",
          "url": c.joinUrl || "https://mskinstitute.in/live",
          "name": c.platform || "Online Live Classroom"
        },
        "organizer": {
          "@id": "https://mskinstitute.in/#organization"
        },
        "performer": {
          "@type": "Person",
          "name": c.instructor || 'Er. Sumit Kumar',
          "jobTitle": "Lead Mentor",
          "image": c.instructorPicture || "https://mskinstitute.in/logo.jpg"
        },
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://mskinstitute.in/live"
        }
      })),
      // 5. CourseInstances for each batch
      ...batches.map(b => ({
        "@type": "CourseInstance",
        "name": b.title,
        "description": b.description || b.title,
        "startDate": b.startDate,
        "courseMode": ["Online", "Offline Classroom"],
        "instructor": {
          "@type": "Person",
          "name": b.instructor,
          "image": b.instructorPicture
        },
        "provider": {
          "@id": "https://mskinstitute.in/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": b.price.replace(/[^\d]/g, ''),
          "priceCurrency": "INR",
          "availability": "https://schema.org/LimitedAvailability",
          "url": `https://mskinstitute.in/live-batches/${b.id}`
        }
      })),
      // 6. FAQPage Schema for AI Search Engines & Google Rich Results
      {
        "@type": "FAQPage",
        "@id": "https://mskinstitute.in/live#faq",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-[#B83A00]/10 text-[#B83A00]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live Classroom Schedule
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
            Live Coding & Computer Training Classes
          </h1>
          <p className="live-hero-desc text-text-muted text-base sm:text-lg leading-relaxed">
            Attend interactive live computer lectures in Shikohabad by <strong>Er. Sumit Kumar</strong>. Join active sessions on Google Meet, YouTube Live, or Zoom, review 7-day upcoming class topics, and enroll in upcoming live cohorts.
          </p>
        </header>

        <LiveScheduleClient initialClasses={classes} initialBatches={batches} />
      </div>
    </>
  );
}

