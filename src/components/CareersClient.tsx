'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Building2,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  User,
  Phone,
  Mail,
  FileText,
  Link2,
  Award,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CareerOpportunity, CareerType, WorkMode } from '@/types';

interface CareersClientProps {
  initialCareers: CareerOpportunity[];
}

const WHATSAPP_NUMBER = '918393042166';

export default function CareersClient({ initialCareers }: CareersClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'job'>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(null);

  // Application Modal state
  const [selectedCareerForApply, setSelectedCareerForApply] = useState<CareerOpportunity | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [applicantStatus, setApplicantStatus] = useState('College Student / Final Year');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantNote, setApplicantNote] = useState('');

  // Recruiter Inquiry Modal state
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [recruiterName, setRecruiterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recruiterPhone, setRecruiterPhone] = useState('');
  const [recruiterRoleRequired, setRecruiterRoleRequired] = useState('Trainers & Education Counselors');

  // Filtered list
  const filteredCareers = useMemo(() => {
    return initialCareers.filter((item) => {
      // Tab filter
      if (activeTab !== 'all' && item.type !== activeTab) {
        return false;
      }
      // Priority filter
      if (selectedPriority !== 'all') {
        if (selectedPriority === 'stage1' && !item.isStage1) {
          return false;
        } else if (selectedPriority !== 'stage1' && item.priority !== selectedPriority) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDept = item.department.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesSkills = item.skills?.some((s) => s.toLowerCase().includes(query));
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesWorkType = item.workType?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDept && !matchesDesc && !matchesSkills && !matchesLocation && !matchesWorkType) {
          return false;
        }
      }
      return true;
    });
  }, [initialCareers, activeTab, selectedPriority, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    const total = initialCareers.length;
    const internships = initialCareers.filter((c) => c.type === 'internship').length;
    const jobs = initialCareers.filter((c) => c.type === 'job').length;
    const stage1 = initialCareers.filter((c) => c.isStage1).length;
    return { total, internships, jobs, stage1 };
  }, [initialCareers]);

  // Handle Application Submit
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCareerForApply) return;

    if (!applicantName.trim() || !applicantPhone.trim() || !applicantEmail.trim()) {
      toast.error('Please enter your full name, phone number, and email.');
      return;
    }

    setIsApplying(true);
    try {
      // 1. Submit lead to server backup
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: applicantName,
          phone: applicantPhone,
          email: applicantEmail,
          city: applicantCity || 'Shikohabad',
          learningMode: 'OFFLINE',
          batchId: selectedCareerForApply.id,
          batchTitle: `Career Application: ${selectedCareerForApply.title}`,
          courseTitle: `${selectedCareerForApply.type === 'internship' ? 'Internship' : 'Job'} Application (${selectedCareerForApply.workType || 'On-site'})`,
          price: selectedCareerForApply.stipendOrSalary,
          query: `Status: ${applicantStatus} | Priority: ${selectedCareerForApply.priority || 'Standard'} | Portfolio: ${applicantPortfolio || 'N/A'} | Note: ${applicantNote || 'N/A'}`,
          utm_source: 'careers_page',
        }),
      });

      // 2. Format WhatsApp Application text
      const msg = `💼 *NEW ON-SITE CAREER APPLICATION - MSK CAREERS*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *Position:* ${selectedCareerForApply.title}
🏢 *Type:* ${selectedCareerForApply.workType || (selectedCareerForApply.type === 'internship' ? 'Internship' : 'Full-time Job')}
📍 *Location:* On-site (Shikohabad Campus)
💰 *Offered Pay:* ${selectedCareerForApply.stipendOrSalary}
⚡ *Hiring Priority:* ${selectedCareerForApply.priority ? `${selectedCareerForApply.priority} Priority` : 'Standard'}
👥 *Gender:* ${selectedCareerForApply.gender || 'Any'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *APPLICANT DETAILS:*
• *Full Name:* ${applicantName}
• *WhatsApp Phone:* ${applicantPhone}
• *Email:* ${applicantEmail}
• *Current Location / City:* ${applicantCity || 'Shikohabad'}
• *Profile / Status:* ${applicantStatus}
${applicantPortfolio ? `• *Portfolio / Resume Link:* ${applicantPortfolio}\n` : ''}${applicantNote ? `• *Applicant Statement:* ${applicantNote}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━
🏛️ *Campus:* MSK Institute, Station Road, Shikohabad (Firozabad, UP)
🚀 _Sent via MSK Institute Official Careers Portal_`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      toast.success('Application submitted! Redirecting to WhatsApp...');
      setSelectedCareerForApply(null);
      // Reset form
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
      setApplicantCity('');
      setApplicantPortfolio('');
      setApplicantNote('');

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Error submitting application:', err);
      toast.error('Network error. Opening WhatsApp directly.');
      const directMsg = `Hello MSK Institute, I want to apply for the position: ${selectedCareerForApply.title}. My name is ${applicantName}, Phone: ${applicantPhone}.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directMsg)}`, '_blank');
    } finally {
      setIsApplying(false);
    }
  };

  // Handle Recruiter Inquiries
  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterName.trim() || !companyName.trim() || !recruiterPhone.trim()) {
      toast.error('Please fill in your name, company, and phone number.');
      return;
    }

    const msg = `🤝 *RECRUITER / HIRING PARTNER INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *Company:* ${companyName}
👤 *Contact Person:* ${recruiterName}
📞 *Phone:* ${recruiterPhone}
🎯 *Talent Needed:* ${recruiterRoleRequired}
━━━━━━━━━━━━━━━━━━━━━━━━━━
We are looking to hire skilled students and graduates from MSK Institute. Please share candidate portfolios and schedule an interaction.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    toast.success('Thank you! Redirecting to MSK Placement Cell...');
    setIsRecruiterModalOpen(false);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-surface-alt/50 pb-20">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-primary text-white py-16 sm:py-24 border-b border-primary-light">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              MSK Institute Placement & Internship Portal
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Build Your Career with <span className="text-secondary">On-Site Tech Roles</span> & Live Internships
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Join the academic, technical, and counseling team at MSK Institute Shikohabad Campus. Explore verified on-site trainer roles, student counseling, sales, digital marketing, and industry internship tracks.
            </p>

            {/* Metrics Ribbon */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/15">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{counts.total}+</div>
                <div className="text-xs text-slate-400 font-medium">Active Openings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-secondary">₹12,000/mo</div>
                <div className="text-xs text-slate-400 font-medium">Max Internship Stipend</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100% On-Site</div>
                <div className="text-xs text-slate-400 font-medium">Shikohabad Campus</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">Any Gender</div>
                <div className="text-xs text-slate-400 font-medium">Equal Opportunity</div>
              </div>
            </div>

            {/* Recruiter Quick Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('listings-container');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-light text-primary font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Openings
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsRecruiterModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-secondary" />
                Hiring Partner? Recruit From Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div id="listings-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-6">
        {/* Recommended Hiring Structure Callout */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl border border-white/20 p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                Stage 1 Recommended Hiring Track • On-site Shikohabad
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Active Priority Recruitment: Full-Time Core &amp; Internship Cohorts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Currently hiring for <strong>Education Counselor</strong>, <strong>Sales Executive</strong>, <strong>Digital Marketing Executive</strong>, <strong>Programming Trainer</strong>, and <strong>Data Analytics Trainer</strong>, plus our fast-track <strong>Internship Track</strong> (3–6 months).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => {
                  setSelectedPriority('stage1');
                  setActiveTab('all');
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                  selectedPriority === 'stage1'
                    ? 'bg-secondary text-primary ring-2 ring-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                View Stage 1 Roles ({counts.stage1})
              </button>
              {selectedPriority !== 'all' && (
                <button
                  onClick={() => setSelectedPriority('all')}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Show All ({counts.total})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Controls Card: Tabs & Search */}
        <div className="bg-white rounded-2xl border border-border-subtle p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Tab Pill Buttons */}
            <div className="flex items-center gap-2 bg-surface p-1 rounded-xl border border-border-subtle/80 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-primary text-white shadow-2xs'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                All Opportunities ({counts.total})
              </button>
              <button
                onClick={() => setActiveTab('internship')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'internship'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-text-muted hover:text-emerald-700'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Internships ({counts.internships})
              </button>
              <button
                onClick={() => setActiveTab('job')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'job'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-text-muted hover:text-blue-700'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Full-Time Jobs ({counts.jobs})
              </button>
            </div>

            {/* Priority Filter & Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Priority Dropdown */}
              <div className="flex-shrink-0">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  aria-label="Filter by hiring priority"
                  className="w-full sm:w-auto px-3 py-2 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50 cursor-pointer"
                >
                  <option value="all">All Hiring Priorities ({counts.total})</option>
                  <option value="stage1">⭐ Stage 1 Openings ({counts.stage1})</option>
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟠 Medium Priority</option>
                  <option value="Optional">🟡 Optional Roles</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by role, Python, Trainer, Sales..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid / Empty state */}
        <div className="mt-8 space-y-4">
          {filteredCareers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border-subtle p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mx-auto text-text-muted">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-primary">No opportunities found</h3>
              <p className="text-sm text-text-muted max-w-md mx-auto">
                No active openings match your current search or priority filters. Try resetting the filters or check back soon.
              </p>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSelectedPriority('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-light transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredCareers.map((item) => {
              const isExpanded = expandedCareerId === item.id;
              const isIntern = item.type === 'internship';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-border-subtle hover:border-slate-300 transition-all shadow-xs hover:shadow-md overflow-hidden group"
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Header Row: Title, Badges, Pay */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Priority Pill */}
                          {item.priority === 'High' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                              🔴 High Priority
                            </span>
                          )}
                          {item.priority === 'Medium' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              🟠 Medium Priority
                            </span>
                          )}
                          {item.priority === 'Optional' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              🟡 Optional
                            </span>
                          )}

                          {/* Stage 1 Hiring Tag */}
                          {item.isStage1 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Stage 1 Immediate
                            </span>
                          )}

                          {/* Type Pill */}
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wider ${
                              isIntern
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {isIntern ? (
                              <GraduationCap className="w-3.5 h-3.5" />
                            ) : (
                              <Briefcase className="w-3.5 h-3.5" />
                            )}
                            {item.workType || (isIntern ? 'Internship' : 'Full-Time')}
                          </span>

                          {/* Mode Pill */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-surface border border-border-subtle text-slate-700">
                            <MapPin className="w-3 h-3 text-secondary" />
                            On-site (Shikohabad)
                          </span>

                          {/* Gender Pill */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-surface border border-border-subtle text-slate-600">
                            <Users className="w-3 h-3 text-text-muted" />
                            Gender: {item.gender || 'Any'}
                          </span>

                          {/* Openings Pill */}
                          <span className="text-xs font-medium text-text-muted">
                            {item.openings} {item.openings === 1 ? 'Opening' : 'Openings'}
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-black text-primary group-hover:text-secondary transition-colors">
                          {item.title}
                        </h2>

                        <div className="flex items-center gap-3 text-xs text-text-muted font-medium flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-text-muted" />
                            {item.company || 'MSK Institute & Partners'}
                          </span>
                          <span>•</span>
                          <span>{item.department}</span>
                          <span>•</span>
                          <span>Exp: {item.experienceLevel}</span>
                        </div>
                      </div>

                      {/* Compensation Pill & Action */}
                      <div className="sm:text-right flex-shrink-0 space-y-1">
                        <div className="text-sm sm:text-base font-black text-emerald-600">
                          {item.stipendOrSalary}
                        </div>
                        {item.duration && (
                          <div className="text-xs text-text-muted flex sm:justify-end items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {item.shortDescription}
                    </p>

                    {/* Skills Tag Pills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold text-[11px] rounded-lg border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer Action Bar */}
                    <div className="pt-4 border-t border-border-subtle/80 flex items-center justify-between gap-3 flex-wrap">
                      <button
                        onClick={() => setExpandedCareerId(isExpanded ? null : item.id)}
                        className="text-xs font-bold text-text-muted hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            View Requirements & Perks
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedCareerForApply(item)}
                          className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary-light text-primary font-bold text-xs sm:text-sm shadow-2xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          Apply Now
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Job Specifications */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-dashed border-border-subtle space-y-4 animate-in fade-in duration-200">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                            Role Overview
                          </h4>
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        {item.responsibilities && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-text-muted">
                              {item.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Requirements */}
                        {item.requirements && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Eligibility & Requirements
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-text-muted">
                              {item.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Perks */}
                        {item.perks && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Perks & Benefits
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                              {item.perks.map((perk, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 p-2 bg-surface rounded-xl border border-border-subtle"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                                  <span className="font-medium">{perk}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bottom Quick Apply inside expander */}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => setSelectedCareerForApply(item)}
                            className="px-4 py-2 bg-primary hover:bg-primary-light text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            Proceed to Apply for {item.title}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Career Assistance & Placement Ecosystem Feature */}
        <section className="mt-16 bg-white rounded-3xl border border-border-subtle p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-black uppercase tracking-wider">
              MSK Placement Cell
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              Why Launch Your Tech Career Through MSK Institute?
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We do not just teach syntax; we prepare you for real technical assessments, commercial repository workflows, and corporate interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-surface rounded-2xl border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Resume & GitHub Polishing</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Receive personalized feedback on your CV, GitHub portfolio, and deployment links from Er. Sumit Kumar.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-2xl border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Mock Technical Interviews</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Practice Live coding evaluations, algorithmic problem-solving in Python & JS, and HR interview round simulations.
              </p>
            </div>

            <div className="p-5 bg-surface rounded-2xl border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-primary">Verified Certificate & LOR</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Earn verifiable internship credentials with QR codes recognized by IT firms and university evaluators.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Application Modal */}
      {selectedCareerForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-border-subtle max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedCareerForApply(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                Direct Application
              </span>
              <h3 className="text-xl font-black text-primary">
                Apply for {selectedCareerForApply.title}
              </h3>
              <p className="text-xs text-text-muted">
                {selectedCareerForApply.type === 'internship' ? 'Internship' : 'Full-time Position'} • {selectedCareerForApply.stipendOrSalary} • {selectedCareerForApply.location}
              </p>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shikohabad, Firozabad, Agra"
                    value={applicantCity}
                    onChange={(e) => setApplicantCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Status
                  </label>
                  <select
                    value={applicantStatus}
                    onChange={(e) => setApplicantStatus(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none cursor-pointer"
                  >
                    <option value="College Student / Final Year">College Student / Final Year</option>
                    <option value="Recent Graduate (BCA/B.Tech/B.Sc)">Recent Graduate (BCA/B.Tech/B.Sc)</option>
                    <option value="MSK Institute Certified Student">MSK Institute Student</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  GitHub / LinkedIn / Portfolio / Resume Link
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://github.com/your-profile or Google Drive link"
                    value={applicantPortfolio}
                    onChange={(e) => setApplicantPortfolio(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Why are you interested in this role?
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief overview of your projects, skills, and availability..."
                  value={applicantNote}
                  onChange={(e) => setApplicantNote(e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isApplying}
                  className="w-full py-3 bg-secondary hover:bg-secondary-light text-primary font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isApplying ? (
                    'Submitting Application...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application via WhatsApp
                    </>
                  )}
                </button>
                <p className="text-[11px] text-text-muted text-center mt-2">
                  🔒 Your application is recorded securely and sent to MSK Institute's hiring desk.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recruiter Modal */}
      {isRecruiterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-border-subtle max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setIsRecruiterModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                Recruiter Partnership
              </span>
              <h3 className="text-xl font-black text-primary">
                Hire Job-Ready Developers
              </h3>
              <p className="text-xs text-text-muted">
                Connect directly with trained developers in Python, MERN Stack, Frontend, and Cyber Security.
              </p>
            </div>

            <form onSubmit={handleRecruiterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Technologies Ltd."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recruiter / HR Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit Singhal"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={recruiterPhone}
                  onChange={(e) => setRecruiterPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Roles You Are Looking to Hire
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python Interns, React Developers, Lab Faculty"
                  value={recruiterRoleRequired}
                  onChange={(e) => setRecruiterRoleRequired(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface border border-border-subtle rounded-xl text-xs sm:text-sm text-primary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-secondary" />
                  Connect with MSK Placement Cell
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
