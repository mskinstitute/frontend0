import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, Award, GraduationCap, CheckCircle2, ChevronRight, 
  MapPin, Users, Calendar, Trophy, Sparkles, ShieldCheck, 
  HelpCircle, PhoneCall, Laptop, Clock, ArrowRight, Video, Code2 
} from 'lucide-react';
import { fetchCourses, fetchLiveBatches } from '@/services/api';
import CountdownTimer from '@/components/CountdownTimer';
import HomeFaqAccordion from '@/components/HomeFaqAccordion';
import { Course, LiveBatch } from '@/types';

export const revalidate = 86400; // Static generation with 24 hours ISR caching

export const metadata: Metadata = {
  title: 'MSK Institute | Premier Computer Training & Coding Academy in Shikohabad',
  description: 'Learn Python programming, Full-Stack MERN Web Development, NIELIT CCC, and ADCA with hands-on lab training at MSK Institute Shikohabad. Live mentorship by Er. Sumit Kumar and verifiable graduation certificates.',
  keywords: [
    'MSK Institute',
    'Computer Institute Shikohabad',
    'Best Coding Classes in Shikohabad',
    'Computer Training Centre Shikohabad',
    'Python Coaching Shikohabad',
    'MERN Stack Development Shikohabad',
    'NIELIT CCC Course Shikohabad',
    'ADCA Diploma Shikohabad',
    'Er. Sumit Kumar Shikohabad',
    'Computer Center Near Station Road Shikohabad',
    'Web Development Institute UP',
    'Online Computer Classes UP'
  ],
  alternates: {
    canonical: 'https://mskinstitute.in',
  },
  openGraph: {
    title: 'MSK Institute | Computer Training & Coding Academy in Shikohabad',
    description: 'Learn Python, Full-Stack Web Development, CCC, and MS Office with practical labs and mentorship at MSK Institute Shikohabad.',
    url: 'https://mskinstitute.in',
    siteName: 'MSK Institute',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://mskinstitute.in/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'MSK Institute Shikohabad Computer & Coding Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSK Institute | Computer Training & Coding Academy',
    description: 'Learn Python, Web Development, CCC, and ADCA with practical offline lab sessions at MSK Institute, Shikohabad.',
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

export default async function HomePage() {
  let featuredCourses: Course[] = [];
  let nextBatch: LiveBatch | null = null;

  try {
    const [courses, batches] = await Promise.all([
      fetchCourses(),
      fetchLiveBatches(),
    ]);
    featuredCourses = courses.filter(c => c.status === 'PUBLISH').slice(0, 3);
    
    if (batches && batches.length > 0) {
      // Find the next earliest upcoming live batch
      nextBatch = [...batches].sort((a, b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      })[0];
    }
  } catch (error) {
    console.error('Failed to load courses or live batches for homepage', error);
  }

  const batchStartDate = nextBatch?.startDate || '2026-09-15';
  const countdownDateString = `${batchStartDate}T09:00:00`;
  const formattedStartDate = (() => {
    try {
      const d = new Date(batchStartDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    } catch {}
    return batchStartDate;
  })();

  const stats = [
    { id: 1, name: 'Students Trained', value: '1,200+', icon: Users },
    { id: 2, name: 'Success Rate', value: '98%', icon: Trophy },
    { id: 3, name: 'Active Courses', value: '12+', icon: BookOpen },
    { id: 4, name: 'Verified Graduates', value: '500+', icon: Award },
  ];

  const features = [
    {
      title: 'Practical Labs & Offline Classes',
      description: 'Hands-on learning directly in our smart computer labs with individual focus on each student in Shikohabad.',
      icon: GraduationCap,
    },
    {
      title: 'Industry-Standard Certification',
      description: 'Acquire official MSK Institute & NIELIT recognized certificates, verifiable anywhere online in one click.',
      icon: Award,
    },
    {
      title: 'Flexible Morning & Evening Batches',
      description: 'Convenient weekday and weekend schedules for school students, college undergraduates, and working professionals.',
      icon: Calendar,
    },
    {
      title: 'Lifetime Study Material Access',
      description: 'Get free, persistent access to digital revision sheets, PDF notes archives, and GitHub coding repositories.',
      icon: CheckCircle2,
      href: '/study-material',
    },
  ];

  const homeFaqs = [
    {
      q: "What is MSK Institute and where is it located in Shikohabad?",
      a: "MSK Institute is Shikohabad's premier computer training and software coding academy. It is located at Gali No. 3, Near Gyan Jyoti Public School / Arya Samaj Mandir, Station Road, Shikohabad (Firozabad District, Uttar Pradesh). We offer modern air-conditioned computer labs with high-speed internet and power backup."
    },
    {
      q: "What computer and coding courses are offered at MSK Institute?",
      a: "We offer career-oriented software tracks including Python Programming Masterclass, Full-Stack Web Development Bootcamp (MERN Stack: React, Node.js, Express, MongoDB), Responsive Frontend Design (HTML5, Tailwind CSS), NIELIT CCC (Course on Computer Concepts), and 1-Year ADCA (Advanced Diploma in Computer Applications)."
    },
    {
      q: "Who teaches the classes and conducts mentorship at MSK Institute?",
      a: "All software engineering courses and live bootcamps are mentored by Er. Sumit Kumar, Senior Software Engineer and Lead Instructor with over 8 years of industry experience in programming and full-stack web architecture."
    },
    {
      q: "How does online certificate verification work for MSK graduates?",
      a: "Every graduate receives a unique Certificate Verification ID printed on their official award. Anyone (employers, universities, students) can authenticate the certificate 24/7 on our online portal at https://mskinstitute.in/verify-certificate."
    },
    {
      q: "Can prospective students attend a free demo class before enrollment?",
      a: "Yes! MSK Institute offers free trial demo classes for both online live batches and offline classroom labs in Shikohabad. You can book a free demo session online or visit our centre."
    },
    {
      q: "Are live online classes available for remote students?",
      a: "Yes! Remote students can join real-time interactive lectures via Google Meet, YouTube Live, and Zoom with screen sharing, live audio doubt clearance, and countdown schedules on our Live portal (https://mskinstitute.in/live)."
    }
  ];

  // Comprehensive JSON-LD Schema Graph for AI Agents, Perplexity, Google, ChatGPT & Search Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Root Organization Entity
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": "https://mskinstitute.in/#organization",
        "name": "MSK Institute",
        "alternateName": ["MSK Computer Institute", "MSK Institute Shikohabad", "MSK Coding Academy"],
        "url": "https://mskinstitute.in",
        "logo": "https://mskinstitute.in/logo.jpg",
        "image": "https://mskinstitute.in/logo.jpg",
        "description": "Premier Computer & Coding Training Institute in Shikohabad providing practical software engineering bootcamps, Python programming, MERN full-stack development, and government certified computer courses.",
        "telephone": "+91-8393042166",
        "email": "mskshikohabad@gmail.com",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gali No. 3, Near Gyan Jyoti Public School, Station Road",
          "addressLocality": "Shikohabad",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "283135",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1157743,
          "longitude": 78.5829716
        },
        "hasMap": "https://maps.google.com/?q=MSK+Institute+Shikohabad",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "founder": {
          "@type": "Person",
          "name": "Er. Sumit Kumar",
          "jobTitle": "Lead Instructor & Software Engineer"
        }
      },
      // 2. WebSite Entity with SearchAction
      {
        "@type": "WebSite",
        "@id": "https://mskinstitute.in/#website",
        "url": "https://mskinstitute.in",
        "name": "MSK Institute",
        "publisher": {
          "@id": "https://mskinstitute.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://mskinstitute.in/courses?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      // 3. WebPage Entity
      {
        "@type": "WebPage",
        "@id": "https://mskinstitute.in/#webpage",
        "url": "https://mskinstitute.in",
        "name": "MSK Institute | Premier Computer Training & Coding Academy in Shikohabad",
        "description": "Learn Python programming, Full-Stack MERN Web Development, NIELIT CCC, and ADCA with hands-on lab training at MSK Institute Shikohabad.",
        "isPartOf": {
          "@id": "https://mskinstitute.in/#website"
        },
        "about": [
          { "@type": "Thing", "name": "Computer Programming" },
          { "@type": "Thing", "name": "Software Engineering" },
          { "@type": "Thing", "name": "Full-Stack Web Development" },
          { "@type": "Thing", "name": "Python" },
          { "@type": "Thing", "name": "NIELIT CCC" }
        ],
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".home-hero-desc", ".home-faq-answer", ".home-about-summary"]
        }
      },
      // 4. Featured Course List
      {
        "@type": "ItemList",
        "name": "Popular Courses at MSK Institute",
        "itemListElement": featuredCourses.map((c, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Course",
            "@id": `https://mskinstitute.in/courses/${c.slug}`,
            "name": c.title,
            "description": c.shortDescription,
            "provider": {
              "@id": "https://mskinstitute.in/#organization"
            }
          }
        }))
      },
      // 5. FAQPage Schema for AI Engines
      {
        "@type": "FAQPage",
        "@id": "https://mskinstitute.in/#faq",
        "mainEntity": homeFaqs.map((faq) => ({
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

      <div className="space-y-16 pb-16">
        {/* 1. Hero Section */}
        <section className="relative bg-gradient-to-br from-surface to-white border-b border-border-subtle overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-[#B83A00]/10 text-[#B83A00]">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Shikohabad's No. 1 Coding Academy
                </span>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Now Hiring: Internships & Jobs
                </Link>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-surface border border-border-subtle text-text-muted rounded-full">
                  100% Practical Labs
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight">
                Empower Your Career with <span className="text-secondary">Practical Coding</span> Skills
              </h1>
              <p className="home-hero-desc text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                Join <strong>MSK Institute</strong> in Shikohabad to learn Python, Full-Stack Web Development, and essential computer concepts with hands-on lab projects and direct mentorship by <strong>Er. Sumit Kumar</strong>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  Explore Courses
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex items-center justify-center px-5 py-3.5 border border-secondary/40 bg-secondary/10 hover:bg-secondary text-secondary hover:text-white font-bold rounded-xl transition-all duration-200 gap-2 shadow-sm"
                >
                  <Code2 className="w-4 h-4" />
                  Try Code Playground
                </Link>
                <Link
                  href="/verify-certificate"
                  className="inline-flex items-center justify-center px-5 py-3.5 border border-border-subtle text-text-muted hover:text-primary hover:bg-surface font-semibold rounded-xl transition-colors duration-200 text-sm"
                >
                  Verify Certificate
                </Link>
              </div>
            </header>

            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/5 rounded-3xl blur-3xl -z-10" />
              <div className="border border-border-subtle bg-white p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col gap-5">
                {/* Top Header Badge & Price */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#B83A00] bg-[#B83A00]/10 px-3 py-1 rounded-md">
                    Starting {formattedStartDate}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-secondary bg-secondary/10 px-3 py-1 rounded-lg border border-secondary/15">
                    {nextBatch?.price || '₹4,999'}
                  </span>
                </div>

                {/* Batch Titles */}
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight">
                    {nextBatch?.title || 'Python Developer Fast-Track Live Batch'}
                  </h2>
                  <p className="text-xs font-semibold text-text-muted">
                    {nextBatch?.courseTitle || 'Python Programming Masterclass'}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {nextBatch?.description || 'Start your coding journey with our new weekday evening batch. Learn scripting, OOP, and automation under expert mentorship.'}
                </p>

                {/* Live Countdown Timer */}
                <div className="bg-surface/80 border border-border-subtle p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted px-1">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                      Batch Starts In:
                    </span>
                    <span className="text-[11px] font-semibold text-secondary">
                      Admissions Open
                    </span>
                  </div>
                  <CountdownTimer targetDate={countdownDateString} />
                </div>

                {/* Instructor & Schedule Info with Instructor Picture */}
                <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
                  {nextBatch?.instructorPicture ? (
                    <div className="relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={nextBatch.instructorPicture}
                        alt={nextBatch.instructor}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover border-2 border-secondary shadow-xs"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border border-white" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black text-sm flex-shrink-0">
                      {nextBatch?.instructor?.[0] || 'S'}
                    </div>
                  )}
                  <div className="text-xs space-y-0.5 min-w-0">
                    <div className="font-bold text-primary flex items-center gap-1.5">
                      <span className="truncate">{nextBatch?.instructor || 'Er. Sumit Kumar'}</span>
                      <span className="text-[10px] font-medium text-text-muted bg-surface px-1.5 py-0.2 rounded border border-border-subtle flex-shrink-0">
                        Lead Mentor
                      </span>
                    </div>
                    <div className="text-text-muted text-[11px] truncate">
                      <strong>Schedule:</strong> {nextBatch?.schedule || 'Mon, Wed, Fri (04:30 PM - 06:00 PM)'}
                    </div>
                  </div>
                </div>

                {/* Urgency & Primary CTA Button */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-border-subtle gap-3">
                  <span className="text-xs text-red-500 font-bold flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Only {nextBatch?.leftSeats || 4} of {nextBatch?.totalSeats || 20} Seats Left
                  </span>

                  <Link
                    href={`/live-batches/${nextBatch?.id || 'batch-python-fasttrack'}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer flex-shrink-0"
                  >
                    <span>View Live Batch Details</span>
                    <span className="text-sm">➔</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Stats Dashboard */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-2xl border border-border-subtle shadow-sm">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="text-center p-4 border-r last:border-r-0 border-border-subtle flex flex-col items-center justify-center">
                  <div className="p-3 bg-secondary/10 rounded-full text-secondary mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-sm font-medium text-text-muted mt-1">{stat.name}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Live Course Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-2xl overflow-hidden shadow-lg border border-primary-light flex flex-col md:flex-row items-center justify-center p-8 md:p-12 gap-8 md:gap-16 lg:gap-24 relative">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold uppercase rounded-full">
                Admissions Open
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Enroll in Upcoming Live Coding Cohorts
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Registration closes soon for our premium online & offline coding batches in Shikohabad. Limited batch seats to maintain optimal student-to-instructor guidance.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">Time remaining:</span>
              <CountdownTimer targetDate={countdownDateString} />
              <Link
                href="/live"
                className="mt-2 w-full text-center px-5 py-2.5 bg-secondary hover:bg-secondary-light text-white font-bold text-sm rounded-xl transition-colors shadow"
              >
                View Live Classes Schedule ➔
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Course Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Career-Ready Tracks
            </span>
            <h2 className="text-3xl font-extrabold text-primary">Our Popular Programs</h2>
            <p className="text-text-muted leading-relaxed">
              Explore our curated curricula built according to modern industry expectations. Build real-world portfolio projects and get certified upon completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.featuredImageUrl}
                    alt={`${course.title} at MSK Institute`}
                    width={600}
                    height={340}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 right-4 bg-primary/95 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {course.level}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {course.categories.slice(0, 2).map((cat, i) => (
                        <span key={i} className="text-[10px] uppercase font-black text-[#B83A00] tracking-wider px-2 py-0.5 bg-[#B83A00]/10 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-3 mt-auto pt-4 border-t border-border-subtle">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        {course.duration.value} {course.duration.unit}
                      </span>
                      <span className="text-[10px] font-bold text-text-muted uppercase px-2 py-0.5 bg-gray-100 rounded">
                        {course.mode === 'BOTH' ? 'Online & Offline' : course.mode}
                      </span>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full text-center py-2.5 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-sm transition-colors block"
                    >
                      Syllabus Details ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle hover:bg-surface text-primary font-bold text-sm rounded-xl transition-colors"
            >
              <span>Explore All Computer & Coding Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 5. Features Grid */}
        <section className="bg-surface border-y border-border-subtle py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                The MSK Advantage
              </span>
              <h2 className="text-3xl font-extrabold text-primary">Why Study at MSK Institute?</h2>
              <p className="text-text-muted leading-relaxed">
                We focus on building practical coding competencies, real projects, and logical reasoning rather than just rote memorization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-border-subtle shadow-xs">
                    <div className="p-3 bg-secondary/10 rounded-xl text-secondary flex-shrink-0 h-fit">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-bold text-lg text-primary">{feature.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
                      {feature.href && (
                        <Link
                          href={feature.href}
                          className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-secondary-light transition-colors pt-1"
                        >
                          Browse Study Material Hub
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Frequently Asked Questions (GEO / AI Search Engine Optimization) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-primary">Frequently Asked Questions</h2>
            <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
              Everything you need to know about MSK Institute, computer courses, certificates, and demo admissions in Shikohabad.
            </p>
          </div>

          <HomeFaqAccordion faqs={homeFaqs} />
        </section>

        {/* 7. Local Trust, Campus & Google Maps Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-secondary font-bold text-sm">
                <MapPin className="w-4.5 h-4.5" />
                Physical Campus Location
              </div>
              <h2 className="text-3xl font-extrabold text-primary">
                Visit our Offline Training Lab
              </h2>
              <p className="home-about-summary text-text-muted leading-relaxed">
                We are located in Shikohabad at <strong>Gali No. 3, Near Gyan Jyoti Public School / Arya Samaj Mandir, Station Road</strong>. Our campus is open Monday through Saturday from 9:00 AM to 6:00 PM for demo sessions, practical lab practice, and new admissions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="font-medium">Air-conditioned modern classrooms & smart lab setups</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="font-medium">High-speed optical fiber Wi-Fi & continuous generator backup</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="font-medium">Dedicated individual PC coding stations for offline practicals</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="tel:+918393042166"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Us: +91 83930 42166</span>
                </a>
                <a
                  href="https://maps.google.com/?q=MSK+Institute+Shikohabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border-subtle hover:bg-surface text-primary font-bold text-xs rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-96 w-full rounded-2xl overflow-hidden border border-border-subtle shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3551.2868286012636!2d78.5829716!3d27.1157743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39744bce0745fc55%3A0xaca626641b821c20!2sMSK%20Institute!5e0!3m2!1sen!2sin!4v1787736706091!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MSK Institute Location Map Shikohabad"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

