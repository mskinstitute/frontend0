import { Metadata } from 'next';
import { fetchCourses } from '@/services/api';
import CourseCatalogClient from '@/components/CourseCatalogClient';
import { Course } from '@/types';

export const revalidate = 3600; // Cache for 1 hour (ISR)

export const metadata: Metadata = {
  title: 'Computer & Coding Courses in Shikohabad | Python, Web Dev, CCC & ADCA | MSK Institute',
  description: 'Explore industry-standard computer and software engineering courses in Shikohabad at MSK Institute. Learn Python Programming, Full-Stack MERN Stack, Frontend UI Design, NIELIT CCC, and ADCA with 100% practical lab training, verifiable certificates, and mentorship by Er. Sumit Kumar.',
  keywords: [
    'Computer Courses in Shikohabad',
    'Coding Classes Shikohabad',
    'Python Course in Shikohabad',
    'Full Stack Web Development Shikohabad',
    'MERN Stack Course Shikohabad',
    'NIELIT CCC Coaching Shikohabad',
    'ADCA Course Shikohabad',
    'Best Computer Institute in Shikohabad',
    'Computer Training Centre Near Station Road',
    'MSK Institute Courses',
    'Software Engineering Courses UP',
    'Web Design Course Shikohabad',
    'React JS Training Shikohabad'
  ],
  alternates: {
    canonical: 'https://mskinstitute.in/courses',
  },
  openGraph: {
    title: 'Computer & Coding Courses in Shikohabad | MSK Institute',
    description: 'Practical computer syllabi covering Python, Full-Stack Web Development, Frontend Engineering, NIELIT CCC, and ADCA with 100% hands-on lab training in Shikohabad.',
    url: 'https://mskinstitute.in/courses',
    siteName: 'MSK Institute',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://mskinstitute.in/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'MSK Institute Course Catalog Shikohabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Computer & Coding Courses in Shikohabad | MSK Institute',
    description: 'Learn Python, MERN Stack, HTML5/CSS3, NIELIT CCC & ADCA with practical lab assignments and certified mentorship in Shikohabad.',
    images: ['https://mskinstitute.in/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function CoursesPage() {
  let courses: Course[] = [];
  let errorMsg = '';

  try {
    const allCourses = await fetchCourses();
    courses = allCourses.filter((course) => course.status === 'PUBLISH');
  } catch (error) {
    console.error('Failed to load courses:', error);
    errorMsg = 'Unable to load the course catalog. Please try again later.';
  }

  const courseFaqs = [
    {
      q: "What computer and programming courses are available at MSK Institute Shikohabad?",
      a: "MSK Institute offers industry-aligned programs including Python Programming Masterclass, Full-Stack Web Development Bootcamp (MERN Stack: React, Node.js, Express, MongoDB), HTML5 & Tailwind CSS UI Design, JavaScript & React Frontend Engineering, NIELIT CCC (Course on Computer Concepts), and 1-Year ADCA (Advanced Diploma in Computer Applications)."
    },
    {
      q: "Which course is best for beginners with zero coding background?",
      a: "Beginners can start with either the Python Programming Masterclass (for logic, scripting, and backend programming) or HTML5 & CSS3 Modern UI Design (for website creation). For fundamental computer literacy, typing, office tools, and government job qualification, NIELIT CCC or ADCA is the top recommendation."
    },
    {
      q: "Are certificates from MSK Institute verifiable online?",
      a: "Yes! Every student who successfully completes their course and project practicals receives a certificate with a unique Verification ID that can be authenticated 24/7 on our online Certificate Verification Portal (https://mskinstitute.in/verify-certificate)."
    },
    {
      q: "What is the learning mode (online vs. offline) for courses?",
      a: "Courses are offered in a flexible Hybrid mode. Students can attend hands-on practical lab sessions at our Shikohabad computer centre (Near Station Road, Firozabad district, UP) or join interactive online live sessions with screen sharing, live doubt clearance, and digital notes."
    },
    {
      q: "What practical projects are included in the Full-Stack Web Development curriculum?",
      a: "Students build production-grade web applications including e-commerce platforms, task management dashboards, secure user authentication systems, RESTful API servers, and responsive portfolio websites using modern React, Tailwind CSS, Node.js, and MongoDB."
    },
    {
      q: "How can I book a free demo class or enroll in a course?",
      a: "You can click 'View Syllabus & Enroll' on any course card to submit a free demo booking form, visit MSK Institute near Station Road in Shikohabad, or contact our admissions coordinator directly at +91 83930 42166."
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
        "alternateName": ["MSK Computer Institute", "MSK Institute Shikohabad"],
        "url": "https://mskinstitute.in",
        "logo": "https://mskinstitute.in/logo.jpg",
        "image": "https://mskinstitute.in/logo.jpg",
        "description": "Premier Computer Institute in Shikohabad offering career-oriented programming bootcamps, web development tracks, and government certified computer courses.",
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
      // 2. CollectionPage Entity
      {
        "@type": ["CollectionPage", "WebPage"],
        "@id": "https://mskinstitute.in/courses#webpage",
        "url": "https://mskinstitute.in/courses",
        "name": "Computer & Coding Courses Catalog | MSK Institute Shikohabad",
        "description": "Explore beginner and advanced computer science programs in Shikohabad tailored to industry standards, complete with certificate validation.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://mskinstitute.in/#website",
          "url": "https://mskinstitute.in",
          "name": "MSK Institute"
        },
        "about": [
          { "@type": "Thing", "name": "Computer Programming" },
          { "@type": "Thing", "name": "Web Development" },
          { "@type": "Thing", "name": "Python" },
          { "@type": "Thing", "name": "React" },
          { "@type": "Thing", "name": "MERN Stack" },
          { "@type": "Thing", "name": "NIELIT CCC" },
          { "@type": "Thing", "name": "ADCA Diploma" }
        ],
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "@id": "https://mskinstitute.in/courses#breadcrumb",
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
              "name": "Courses",
              "item": "https://mskinstitute.in/courses"
            }
          ]
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".courses-hero-desc", ".course-faq-answer"]
        }
      },
      // 3. ItemList of Course Entities
      {
        "@type": "ItemList",
        "name": "MSK Institute Course Catalog",
        "description": "Comprehensive list of computer, programming and diploma courses in Shikohabad",
        "itemListElement": courses.map((c, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Course",
            "@id": `https://mskinstitute.in/courses/${c.slug}`,
            "url": `https://mskinstitute.in/courses/${c.slug}`,
            "name": c.title,
            "description": c.shortDescription,
            "provider": {
              "@id": "https://mskinstitute.in/#organization"
            },
            "educationalLevel": c.level,
            "about": c.categories,
            "inLanguage": c.language,
            "timeRequired": `P${c.duration.value}${c.duration.unit === 'MONTHS' ? 'M' : 'D'}`,
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": c.mode === 'BOTH' ? ["Online", "Offline Classroom"] : [c.mode === 'ONLINE' ? "Online" : "Offline Classroom"],
              "instructor": {
                "@type": "Person",
                "name": "Er. Sumit Kumar",
                "jobTitle": "Lead Instructor"
              }
            }
          }
        }))
      },
      // 4. FAQPage Schema for AI Search Engines & Google Rich Results
      {
        "@type": "FAQPage",
        "@id": "https://mskinstitute.in/courses#faq",
        "mainEntity": courseFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
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
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-[#B83A00]/10 text-[#B83A00] rounded-full">
              Industry Ready Curriculum
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-surface border border-border-subtle text-text-muted rounded-full">
              100% Practical Labs
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              Govt & ISO Certified
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
            Computer & Programming Courses in Shikohabad
          </h1>
          <p className="courses-hero-desc text-text-muted text-base sm:text-lg leading-relaxed">
            Select from beginner and advanced programs tailored to industry standards, complete with live mentorship by <strong>Er. Sumit Kumar</strong>, practical project building, and online certificate verification.
          </p>
        </header>

        {errorMsg ? (
          <div className="text-center py-12 bg-red-50 text-red-700 border border-red-200 rounded-xl">
            <p className="font-semibold">{errorMsg}</p>
          </div>
        ) : (
          <CourseCatalogClient initialCourses={courses} />
        )}
      </div>
    </>
  );
}

