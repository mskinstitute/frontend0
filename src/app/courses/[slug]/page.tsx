import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, Award, Users, User, BookOpen, Layers, MessageSquare, 
  Globe, Laptop, HelpCircle, ChevronDown, Check, Download, 
  Play, PackageCheck, ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';
import { fetchCourses } from '@/services/api';
import DemoBookingForm from '@/components/DemoBookingForm';
import CourseCurriculumAccordion from '@/components/CourseCurriculumAccordion';
import { Course } from '@/types';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  try {
    const courses = await fetchCourses();
    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params for courses:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const courses = await fetchCourses();
    const course = courses.find((c) => c.slug === slug);

    if (!course) {
      return {
        title: 'Course Not Found | MSK Institute',
        description: 'The requested course could not be found.',
      };
    }

    return {
      title: `${course.title} in Shikohabad | MSK Institute`,
      description: course.shortDescription,
      alternates: {
        canonical: `https://mskinstitute.in/courses/${course.slug}`,
      },
      openGraph: {
        title: `${course.title} - Learn Practical Coding | MSK Institute`,
        description: course.shortDescription,
        url: `https://mskinstitute.in/courses/${course.slug}`,
        images: [{ url: course.featuredImageUrl }],
      },
    };
  } catch (error) {
    return {
      title: 'Course Details | MSK Institute',
    };
  }
}

export default async function CourseDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  let course: Course | undefined;
  let allCourses: Course[] = [];

  try {
    allCourses = await fetchCourses();
    course = allCourses.find((c) => c.slug === slug);
  } catch (error) {
    console.error('Error fetching course:', error);
  }

  if (!course) {
    notFound();
  }

  const isCombo = course.courseType === 'COMBO';

  // For combo courses, resolve the included courses in order
  const includedCourses: Course[] = isCombo && course.includedCourseIds
    ? course.includedCourseIds
        .map((id) => allCourses.find((c) => c.id === id))
        .filter((c): c is Course => Boolean(c))
    : [];

  // Inject Structured JSON-LD Schema Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': course.title,
    'description': course.shortDescription,
    'educationalLevel': course.level,
    'about': course.categories,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'MSK Institute',
      'sameAs': 'https://mskinstitute.in',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Gali No. 3, Near Gyan Jyoti Public School',
        'addressLocality': 'Shikohabad',
        'addressRegion': 'Firozabad, Uttar Pradesh',
        'postalCode': '283135',
        'addressCountry': 'IN',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Breadcrumb */}
        <nav className="text-sm font-semibold text-text-muted mb-8 no-print flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="text-secondary hover:text-secondary-light hover:underline transition-colors">
            Home
          </Link>
          <span className="text-text-muted">/</span>
          <Link href="/courses" className="text-secondary hover:text-secondary-light hover:underline transition-colors">
            Courses
          </Link>
          <span className="text-text-muted">/</span>
          {isCombo && (
            <>
              <span className="px-2 py-0.5 bg-orange-100 text-[#B83A00] text-xs font-bold rounded">
                Combo Package
              </span>
              <span className="text-text-muted">/</span>
            </>
          )}
          <span className="text-text-main font-bold truncate max-w-xs sm:max-w-md">{course.title}</span>
        </nav>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Course Details (Left Column, 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {isCombo && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-secondary to-amber-600 text-white text-xs font-extrabold rounded-md shadow-sm uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Combo Bundle Package
                  </span>
                )}
                {course.categories.map((cat, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#B83A00]/10 text-[#B83A00] text-xs font-black rounded-md uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
                {course.title}
              </h1>
              <p className="text-lg text-text-muted leading-relaxed font-medium">
                {course.shortDescription}
              </p>
            </div>

            {/* Course Banner */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-border-subtle shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.featuredImageUrl}
                alt={course.title}
                width={1200}
                height={600}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              {isCombo && (
                <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-md border border-white/20 text-xs font-black flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-secondary" />
                  {includedCourses.length} Courses Included
                </div>
              )}
            </div>

            {/* Course Description overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-extrabold text-primary border-b border-border-subtle pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                Course Overview
              </h2>
              <div className="text-text-muted text-base leading-relaxed space-y-4">
                <p>
                  This program is structured to provide an immersive, hands-on learning experience. At MSK Institute, we believe in learning by doing. Every concept introduced is followed by structured lab assignments in our classroom, ensuring students develop practical logic alongside technical vocabulary.
                </p>
                {isCombo ? (
                  <p>
                    By enrolling in the <strong>{course.title}</strong>, you receive access to <strong>{includedCourses.length} complete specialized courses</strong> under a unified learning path. Explore each included curriculum below to review individual modules, notes, and lab assignments.
                  </p>
                ) : (
                  <p>
                    By enrolling in the <strong>{course.title}</strong>, you will gain access to detailed step-by-step guides, interactive notes, classroom computer labs, and review mentorship led by experienced instructors.
                  </p>
                )}
              </div>
            </section>

            {/* What You Will Learn (Key Outcomes) */}
            <section className="space-y-4 bg-surface rounded-2xl p-6 border border-border-subtle">
              <h3 className="text-xl font-extrabold text-primary flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                What You Will Master in this Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Clean, industry-standard syntax following international W3C specifications',
                  'Live lab implementation with real-time mentor code reviews',
                  'Deep-dive debugging with Chrome DevTools and browser inspectors',
                  'Mobile responsiveness, accessibility (WCAG/ARIA) & SEO best practices',
                  'Hands-on portfolio projects ready for tech resumes and freelance work',
                  'Verifiable Certificate of Completion with instant QR code validation',
                ].map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-text-main">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Tutorial & Notes Discovery Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs font-black uppercase text-secondary tracking-wider">Free Study Resources Included</span>
                </div>
                <h4 className="text-base font-black text-primary">
                  Interactive Chapter Notes & Self-Study Guides Available
                </h4>
                <p className="text-xs text-text-muted">
                  Click the <strong className="text-secondary font-bold">Notes</strong> button on any syllabus topic below to open its comprehensive tutorial with code examples.
                </p>
              </div>
              <a
                href="#curriculum-section"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-light text-white font-bold text-xs shadow-sm transition-all flex-shrink-0 cursor-pointer"
              >
                <span>View Syllabus Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Course Curriculum (Interactive Accordion for Combo Included Courses & Single Syllabus) */}
            <div id="curriculum-section" className="scroll-mt-24">
              <CourseCurriculumAccordion
                isCombo={isCombo}
                courseTitle={course.title}
                courseSlug={course.slug}
                includedCourses={includedCourses || []}
                chapters={course.chapters || []}
              />
            </div>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border-subtle p-6 shadow-sm space-y-6 sticky top-24">
              <h3 className="font-extrabold text-xl text-primary border-b border-border-subtle pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Course Highlights
              </h3>

              {/* Stats table */}
              <div className="space-y-4">
                {[
                  { 
                    label: 'Course Type', 
                    value: isCombo ? `Combo Bundle (${includedCourses.length} Courses)` : 'Single Specialized Course', 
                    icon: isCombo ? PackageCheck : Layers 
                  },
                  { label: 'Lead Mentor', value: 'Er. Sumit Kumar (8+ Yrs Exp)', icon: User },
                  { label: 'Duration', value: `${course.duration.value} ${course.duration.unit}`, icon: Clock },
                  {
                    label: 'Learning Mode',
                    value: course.mode === 'BOTH' ? 'Online & Offline' : course.mode === 'OFFLINE' ? 'Offline Classroom' : 'Online Learning',
                    icon: course.mode === 'ONLINE' ? Globe : Laptop,
                  },
                  { label: 'Level', value: course.level, icon: Layers },
                  { label: 'Languages', value: course.language.join(', '), icon: MessageSquare },
                  { label: 'Certificate', value: course.certificate ? 'Verifiable Certificate' : 'Certificate Unavailable', icon: Award },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 py-1 text-sm">
                      <div className="p-2 bg-surface rounded-lg text-secondary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted font-bold uppercase tracking-wider">{item.label}</div>
                        <div className="text-text-main font-semibold mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action booking embedded lead form */}
              <div className="pt-4 border-t border-border-subtle">
                <DemoBookingForm courseTitle={course.title} isEmbedded={true} />
                <p className="text-xs text-center text-text-muted mt-3 leading-relaxed">
                  * Demo batches run weekly in our Shikohabad coding facility. Registration is free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

