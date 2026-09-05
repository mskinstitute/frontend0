'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, SlidersHorizontal, BookOpen, Clock, Globe, Laptop, 
  ArrowRight, CheckCircle2, Award, ShieldCheck, GraduationCap, 
  HelpCircle, ChevronDown, Sparkles, User, MapPin, PhoneCall,
  X, RotateCcw, Check
} from 'lucide-react';
import { Course } from '@/types';
import WebShareButton from '@/components/WebShareButton';

export default function CourseCatalogClient({ initialCourses }: { initialCourses: Course[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'duration-asc' | 'duration-desc' | 'alphabetical'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Extract all levels dynamically
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Compute level counts
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialCourses.length };
    initialCourses.forEach((c) => {
      counts[c.level] = (counts[c.level] || 0) + 1;
    });
    return counts;
  }, [initialCourses]);

  // Extract all modes dynamically
  const modes = [
    { key: 'All', label: 'All Modes' },
    { key: 'BOTH', label: 'Online & Offline' },
    { key: 'OFFLINE', label: 'Classroom Lab' },
    { key: 'ONLINE', label: 'Online Only' },
  ];

  // Filter and sort courses based on selections
  const filteredCourses = useMemo(() => {
    const result = initialCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

      const matchesMode =
        selectedMode === 'All' ||
        course.mode === selectedMode ||
        (selectedMode === 'ONLINE' && course.mode === 'BOTH') ||
        (selectedMode === 'OFFLINE' && course.mode === 'BOTH');

      return matchesSearch && matchesLevel && matchesMode;
    });

    const toDays = (d: { value: number; unit: 'HOURS' | 'DAYS' | 'MONTHS' }) => {
      if (d.unit === 'MONTHS') return d.value * 30;
      if (d.unit === 'DAYS') return d.value;
      return d.value / 24;
    };

    // Apply sorting
    if (sortBy === 'duration-asc') {
      result.sort((a, b) => toDays(a.duration) - toDays(b.duration));
    } else if (sortBy === 'duration-desc') {
      result.sort((a, b) => toDays(b.duration) - toDays(a.duration));
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [initialCourses, searchQuery, selectedLevel, selectedMode, sortBy]);

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedLevel !== 'All' ||
    selectedMode !== 'All'
  );

  const activeFilterCount = [
    Boolean(searchQuery),
    selectedLevel !== 'All',
    selectedMode !== 'All',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('All');
    setSelectedMode('All');
    setSortBy('featured');
  };

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

  const comparisonData = [
    {
      title: "Python Masterclass",
      slug: "python-programming-masterclass",
      duration: "3 Months",
      mode: "Online & Offline",
      level: "Beginner",
      certificate: "Verifiable Certificate",
      bestFor: "Software Development, Automation, Scripting & Backend Logic"
    },
    {
      title: "Full-Stack Web Dev (MERN)",
      slug: "full-stack-web-development-bootcamp",
      duration: "6 Months",
      mode: "Online & Offline",
      level: "Comprehensive",
      certificate: "Full-Stack Engineer Diploma",
      bestFor: "React Frontend, Node.js APIs, MongoDB, Real-World Web Apps"
    },
    {
      title: "HTML5 & Modern UI Design",
      slug: "html5-css3-modern-ui-design",
      duration: "2 Months",
      mode: "Online & Offline",
      level: "Beginner",
      certificate: "UI Developer Certificate",
      bestFor: "Responsive Layouts, Tailwind CSS, Flexbox/Grid, Web Design"
    },
    {
      title: "JS & React Engineering",
      slug: "javascript-react-frontend-engineering",
      duration: "3 Months",
      mode: "Online & Offline",
      level: "Intermediate",
      certificate: "Frontend React Certificate",
      bestFor: "Interactive SPAs, React Hooks, State Management, API Fetching"
    },
    {
      title: "NIELIT CCC Certification",
      slug: "ccc-course-on-computer-concepts",
      duration: "3 Months",
      mode: "Online & Offline",
      level: "Beginner",
      certificate: "Govt Recognized Certificate",
      bestFor: "Office Tools, Digital Banking, Cyber Safety, Govt Job Prep"
    },
    {
      title: "ADCA (1-Yr Diploma)",
      slug: "adca-advanced-diploma-computer-applications",
      duration: "12 Months",
      mode: "Offline & Online",
      level: "Complete Diploma",
      certificate: "1-Year Diploma Certificate",
      bestFor: "Advanced Office Suite, Accounting Tally Prime, DTP Photoshop & Web"
    }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Main Course Catalog Section (Left Sidebar on Desktop, Responsive Drawer on Mobile) */}
      <section className="space-y-6">
        {/* Mobile-Only Top Search & Filter Bar (< lg) */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-grow">
              <label htmlFor="mobile-catalog-search" className="sr-only">Search courses</label>
              <Search className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
              <input
                id="mobile-catalog-search"
                type="text"
                placeholder="Search courses (e.g. Python, MERN, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 bg-white border border-border-subtle rounded-xl text-xs sm:text-sm text-text-main focus:outline-none focus:border-secondary transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 p-0.5 text-text-muted hover:text-primary transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Drawer Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
              aria-label="Open filter options"
            >
              <SlidersHorizontal className="w-4 h-4 text-secondary" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center font-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick-Scroll Difficulty Level Pills on Phone */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {levels.map((lvl) => {
              const isSel = selectedLevel === lvl;
              const count = lvl === 'All' ? initialCourses.length : levelCounts[lvl] || 0;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSel
                      ? 'bg-primary text-white font-bold shadow-2xs'
                      : 'bg-white border border-border-subtle text-text-muted hover:text-primary hover:bg-surface'
                  }`}
                >
                  {lvl} <span className="opacity-75 text-[10px] ml-0.5">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop & Tablet Main Content: Left Sidebar + Right Catalog Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ===================== LEFT SIDEBAR (Desktop: lg:block) ===================== */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 space-y-6 sticky top-24 select-none">
            {/* Main Filters Box */}
            <div className="bg-white rounded-2xl border border-border-subtle p-5 shadow-xs space-y-5">
              {/* Header with Title & Reset Button */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <SlidersHorizontal className="w-4 h-4 text-secondary" />
                  <span>Filter Courses</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-secondary-light transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* Search Field */}
              <div className="space-y-1.5">
                <label htmlFor="desktop-catalog-search" className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                  <input
                    id="desktop-catalog-search"
                    type="text"
                    placeholder="Python, MERN, React..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-surface border border-border-subtle rounded-xl text-xs text-primary focus:outline-none focus:border-secondary transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-text-muted hover:text-primary transition-colors cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Difficulty Level Filter */}
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Difficulty Level
                  </span>
                  {selectedLevel !== 'All' && (
                    <button
                      onClick={() => setSelectedLevel('All')}
                      className="text-[10px] font-bold text-secondary hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {levels.map((lvl) => {
                    const isSel = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs transition-all text-center cursor-pointer ${
                          isSel
                            ? 'bg-primary text-white font-bold shadow-2xs'
                            : 'bg-surface hover:bg-slate-100 text-text-muted hover:text-primary font-medium border border-border-subtle/60'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Learning Mode Filter */}
              <div className="space-y-2 pt-3 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Learning Mode
                  </span>
                  {selectedMode !== 'All' && (
                    <button
                      onClick={() => setSelectedMode('All')}
                      className="text-[10px] font-bold text-secondary hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {modes.map((md) => {
                    const isSel = selectedMode === md.key;
                    return (
                      <button
                        key={md.key}
                        onClick={() => setSelectedMode(md.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSel
                            ? 'bg-secondary/10 text-secondary font-bold border-l-4 border-l-secondary pl-2 shadow-2xs'
                            : 'text-text-muted hover:text-primary hover:bg-surface font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {md.key === 'ONLINE' ? (
                            <Globe className="w-3.5 h-3.5" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5" />
                          )}
                          <span>{md.label}</span>
                        </div>
                        {isSel && <Check className="w-3.5 h-3.5 text-secondary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Career Advisory Card in Left Sidebar */}
            <div className="bg-gradient-to-br from-primary to-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-secondary">
                <PhoneCall className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Need Guidance?</span>
              </div>
              <h4 className="font-bold text-sm">Talk to Er. Sumit Kumar</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Confused between Python, Web Development, or CCC? Get free 1-on-1 course counseling.
              </p>
              <a
                href="tel:+918393042166"
                className="inline-flex items-center justify-center w-full py-2 bg-secondary hover:bg-secondary-light text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Call +91 83930 42166
              </a>
            </div>
          </aside>

          {/* ===================== RIGHT MAIN CATALOG AREA ===================== */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Top Status & Sort Bar */}
            <div className="bg-white rounded-2xl border border-border-subtle p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-primary">
                  Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
                </span>
                {hasActiveFilters && (
                  <span className="text-xs text-text-muted">
                    (filtered from {initialCourses.length})
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="catalog-sort" className="text-xs font-semibold text-text-muted shrink-0">
                  Sort:
                </label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-1.5 px-2 bg-surface border border-border-subtle rounded-xl text-xs font-medium text-primary focus:outline-none focus:border-secondary cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                  <option value="alphabetical">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Active Filter Tags Bar (Removable Pills) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-text-muted">Active:</span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface border border-border-subtle rounded-lg text-xs text-primary font-medium">
                    <span>Keyword: &quot;{searchQuery}&quot;</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-secondary cursor-pointer"
                      aria-label="Remove search filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}


                {selectedLevel !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface border border-border-subtle rounded-lg text-xs text-primary font-medium">
                    <span>Level: {selectedLevel}</span>
                    <button
                      onClick={() => setSelectedLevel('All')}
                      className="hover:text-secondary cursor-pointer"
                      aria-label="Remove level filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedMode !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface border border-border-subtle rounded-lg text-xs text-primary font-medium">
                    <span>Mode: {selectedMode === 'BOTH' ? 'Online & Offline' : selectedMode}</span>
                    <button
                      onClick={() => setSelectedMode('All')}
                      className="hover:text-secondary cursor-pointer"
                      aria-label="Remove mode filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-secondary hover:underline cursor-pointer ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Course Grid Results */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <Link
                      href={`/courses/${course.slug}`}
                      className="relative h-44 sm:h-48 w-full bg-gray-100 overflow-hidden block"
                      aria-label={course.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={course.featuredImageUrl}
                        alt={`${course.title} at MSK Institute Shikohabad`}
                        width={600}
                        height={340}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary/95 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-md shadow-sm backdrop-blur-xs">
                        {course.level}
                      </span>
                    </Link>

                    <div className="p-4 sm:p-5 flex-grow flex flex-col gap-3.5 sm:gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {course.categories.slice(0, 2).map((cat, i) => (
                            <span
                              key={i}
                              className="text-[10px] uppercase font-black text-[#B83A00] tracking-wider px-2 py-0.5 bg-[#B83A00]/10 rounded"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                          <Link href={`/courses/${course.slug}`} className="hover:underline">
                            {course.title}
                          </Link>
                        </h2>
                        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                          {course.shortDescription}
                        </p>
                      </div>

                      <div className="space-y-3 mt-auto pt-3 sm:pt-4 border-t border-border-subtle">
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-4 h-4 text-secondary shrink-0" />
                            <span>{course.duration.value} {course.duration.unit}</span>
                          </span>
                          <span className="flex items-center gap-1 font-semibold">
                            {course.mode === 'BOTH' ? (
                              <>
                                <Laptop className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span>Online & Offline</span>
                              </>
                            ) : course.mode === 'OFFLINE' ? (
                              <>
                                <Laptop className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span>Offline Lab</span>
                              </>
                            ) : (
                              <>
                                <Globe className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span>Online Only</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Card Action Row: Enroll CTA + Share Button */}
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer text-center"
                          >
                            <span className="truncate">View Syllabus & Enroll</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </Link>
                          <WebShareButton
                            variant="icon"
                            title={`${course.title} | MSK Institute Shikohabad`}
                            text={`Explore ${course.title} course at MSK Institute Shikohabad: ${course.shortDescription}`}
                            url={`/courses/${course.slug}`}
                            label={`Share ${course.title}`}
                            className="h-[38px] w-[38px] p-0 flex items-center justify-center rounded-xl border border-border-subtle bg-surface hover:bg-white text-text-muted hover:text-secondary shadow-2xs hover:border-secondary/40 transition-all shrink-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-border-subtle rounded-2xl shadow-sm space-y-4">
                <SlidersHorizontal className="w-12 h-12 text-text-muted mx-auto opacity-60" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-primary">No Courses Matching Filters</h3>
                  <p className="text-text-muted text-xs max-w-sm mx-auto leading-relaxed">
                    We couldn&apos;t find any courses matching your current search or filter combination.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================== MOBILE SLIDE-OUT FILTER DRAWER MODAL (< lg) ===================== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-primary">
                <SlidersHorizontal className="w-4 h-4 text-secondary" />
                <span>Filters & Sort</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Sort selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2.5 bg-surface border border-border-subtle rounded-xl text-xs font-medium focus:outline-none focus:border-secondary cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                  <option value="alphabetical">Name: A to Z</option>
                </select>
              </div>


              {/* Difficulty Level */}
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Difficulty Level
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {levels.map((lvl) => {
                    const isSel = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-2 rounded-xl text-xs transition-all text-center cursor-pointer ${
                          isSel
                            ? 'bg-primary text-white font-bold'
                            : 'bg-surface hover:bg-slate-100 text-text-muted font-medium border border-border-subtle/60'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Learning Mode */}
              <div className="space-y-2 pt-2 border-t border-border-subtle">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Learning Mode
                </span>
                <div className="space-y-1">
                  {modes.map((md) => {
                    const isSel = selectedMode === md.key;
                    return (
                      <button
                        key={md.key}
                        onClick={() => setSelectedMode(md.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isSel
                            ? 'bg-secondary/10 text-secondary font-bold border-l-4 border-l-secondary pl-2'
                            : 'text-text-muted hover:text-primary hover:bg-surface font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {md.key === 'ONLINE' ? (
                            <Globe className="w-3.5 h-3.5" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5" />
                          )}
                          <span>{md.label}</span>
                        </div>
                        {isSel && <Check className="w-3.5 h-3.5 text-secondary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-border-subtle bg-surface flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 px-3 bg-white border border-border-subtle hover:bg-slate-50 text-text-muted font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 py-2.5 px-3 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Show {filteredCourses.length} Courses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Educational Highlights & Learning Ecosystem */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Why Learn at MSK Institute Shikohabad?</h2>
            <p className="text-xs text-text-muted">Structured pedagogy combining real-world development with verified government credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <User className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Expert Mentorship</span>
            </div>
            <h3 className="font-bold text-sm text-primary">Er. Sumit Kumar</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Guided by a seasoned Software Engineer with 8+ years experience in production web platforms and programming logic.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">100% Practical Labs</span>
            </div>
            <h3 className="font-bold text-sm text-primary">Project-Driven Learning</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every theoretical lecture is paired with hands-on lab code assignments, debugging sessions, and portfolio builds.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Verifiable Credentials</span>
            </div>
            <h3 className="font-bold text-sm text-primary">Online Verification</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Students receive ISO & MSK verified certificates with 24/7 online ID authentication portal support.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Modern Campus</span>
            </div>
            <h3 className="font-bold text-sm text-primary">Shikohabad Facility</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Fully air-conditioned computer labs with high-speed internet located near Station Road, Shikohabad (Firozabad, UP).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Course Comparison Matrix (GEO / AI Comparison Data & Decision Table) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Course Comparison & Career Matrix</h2>
            <p className="text-xs text-text-muted">Compare learning paths, durations, and career outcomes across our computer programs</p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-surface/80 border-b border-border-subtle text-[11px] font-bold uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="py-3.5 px-6">Course Program</th>
                  <th className="py-3.5 px-6">Duration</th>
                  <th className="py-3.5 px-6">Mode</th>
                  <th className="py-3.5 px-6">Level</th>
                  <th className="py-3.5 px-6">Key Focus & Outcome</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {comparisonData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-primary">
                      <Link href={`/courses/${item.slug}`} className="hover:text-secondary transition-colors">
                        {item.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-xs text-text-muted font-semibold">
                      {item.duration}
                    </td>
                    <td className="py-4 px-6 text-xs">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-text-muted font-medium">
                        {item.mode}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs font-bold text-primary">
                      {item.level}
                    </td>
                    <td className="py-4 px-6 text-xs text-text-muted max-w-xs">
                      {item.bestFor}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/courses/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-secondary-light transition-colors"
                      >
                        <span>Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-3">
          {comparisonData.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2.5">
              <div className="flex justify-between items-start gap-2">
                <Link href={`/courses/${item.slug}`} className="font-bold text-primary text-sm hover:text-secondary">
                  {item.title}
                </Link>
                <span className="text-[10px] font-bold text-[#B83A00] bg-[#B83A00]/10 px-2 py-0.5 rounded uppercase">
                  {item.duration}
                </span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.bestFor}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-xs">
                <span className="text-text-muted">{item.mode}</span>
                <Link href={`/courses/${item.slug}`} className="font-bold text-secondary flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Frequently Asked Questions (AI Answer Engine & Student Guide) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
            <p className="text-xs text-text-muted">Common queries regarding curriculum, certificates, demo batches, and admissions</p>
          </div>
        </div>

        <div className="space-y-3">
          {courseFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-border-subtle shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-primary hover:text-secondary transition-colors cursor-pointer gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-black flex-shrink-0">
                      Q
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-text-muted leading-relaxed border-t border-border-subtle/50 course-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Counseling & Demo Booking Callout */}
      <section className="bg-primary text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-md">
        <div className="max-w-2xl space-y-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Need help choosing the right course?</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Get 1-on-1 career counseling from Er. Sumit Kumar or visit our Shikohabad centre for a free demo session in our smart computer laboratory.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="tel:+918393042166" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary-light text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Admissions: +91 83930 42166</span>
            </a>
            <Link 
              href="/live" 
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-colors"
            >
              View Today's Live Schedule
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <BookOpen className="w-full h-full object-contain" />
        </div>
      </section>
    </div>
  );
}

