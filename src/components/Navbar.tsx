'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, Home, Video, Search, Briefcase, Code2, PhoneCall, MapPin } from 'lucide-react';

import InstallAppButton from '@/components/InstallAppButton';
import SearchModal from '@/components/SearchModal';

interface Announcement {
  id: string;
  icon: string;
  badge: string;
  text: string;
  active: boolean;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const res = await fetch('/data/announcements.json');
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data);
        }
      } catch (err) {
        console.error('Failed to load announcements registry:', err);
      }
    }
    loadAnnouncements();
  }, []);

  // Global keyboard listener for Ctrl + K / Cmd + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter active announcements within date ranges dynamically
  const todayStr = new Date().toISOString().split('T')[0];
  const activeAnnouncements = announcements.filter(ann => {
    if (!ann.active) return false;
    if (ann.startDate && todayStr < ann.startDate) return false;
    if (ann.endDate && todayStr > ann.endDate) return false;
    return true;
  });

  // Prioritized navigation links:
  // 1. Home
  // 2. Courses (primary academic offering)
  // 3. Live (high-intent live interactive batches & admissions)
  // 4. Locations (physical Shikohabad & regional centers)
  // 5. Tools (developer tools & speed lab)
  // 6. Careers (hiring & internships)
  // 7. Contact (admissions helpline & demo booking)
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Live', href: '/live', icon: Video, badge: 'LIVE' },
    { name: 'Locations', href: '/locations', icon: MapPin },
    { name: 'Tools', href: '/tools', icon: Code2 },
    { name: 'Careers', href: '/careers', icon: Briefcase, badge: 'Hiring' },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 no-print shadow-sm">
      <nav className="bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="MSK Institute Logo"
                width={40}
                height={40}
                fetchPriority="high"
                className="w-10 h-10 object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-xl font-bold tracking-tight text-primary">
                MSK<span className="text-secondary font-black">.</span>Institute
              </span>
            </Link>
          </div>

          {/* Desktop Search Trigger - Extra Large Screens (1280px+) */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs mx-4 2xl:mx-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              type="button"
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-text-muted bg-surface hover:bg-slate-100 border border-border-subtle hover:border-slate-300 rounded-lg transition-all shadow-2xs cursor-pointer group"
              aria-label="Search resources (Ctrl + K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                <span className="font-medium text-text-muted/80 truncate">Search courses, material...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-white border border-border-subtle rounded shadow-2xs flex-shrink-0 ml-2">
                <span className="text-[9px]">Ctrl</span> K
              </kbd>
            </button>
          </div>

          {/* Compact Search Trigger - Laptop Screens (1024px to 1279px) */}
          <div className="hidden lg:flex xl:hidden items-center mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-muted bg-surface hover:bg-slate-100 border border-border-subtle hover:border-slate-300 rounded-lg transition-all cursor-pointer"
              aria-label="Search resources (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <span className="font-medium">Search</span>
              <kbd className="px-1 py-0.2 text-[9px] font-mono text-text-muted bg-white border border-border-subtle rounded">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Tablet Screen Compact Search Icon (768px to 1023px) */}
          <div className="hidden md:flex lg:hidden items-center ml-auto mr-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              type="button"
              className="p-2 text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors cursor-pointer"
              aria-label="Search resources"
              title="Search resources (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-2 py-1.5 lg:px-2.5 lg:py-2 xl:px-3 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? 'text-secondary font-semibold border-b-2 border-secondary rounded-none pb-1'
                      : 'text-text-muted hover:text-primary hover:bg-surface'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span>{link.name}</span>
                  {link.badge === 'LIVE' && (
                    <span className="relative flex h-2 w-2 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Quick Demo CTA Button - Desktop */}
            <Link
              href="/#book-demo"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap ml-1"
            >
              <span>Book Demo</span>
              <span className="text-[11px]">➔</span>
            </Link>
          </div>

          {/* Mobile top actions: Search icon, Install App button & Hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-surface focus:outline-none cursor-pointer"
              aria-label="Search resources"
            >
              <Search className="w-5 h-5" />
            </button>
            <InstallAppButton variant="mobile-header" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-surface focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border-subtle animate-in slide-in-from-top-4 duration-200">
          <div className="px-3 pt-2 pb-2">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsSearchOpen(true);
              }}
              type="button"
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-text-muted bg-surface border border-border-subtle rounded-xl cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-text-muted" />
                <span>Search courses, materials, blogs...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-white border border-border-subtle rounded">
                Ctrl K
              </kbd>
            </button>
          </div>
          <div className="px-2 pt-1 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-secondary/10 text-secondary font-semibold'
                      : 'text-text-muted hover:bg-surface hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      link.badge === 'LIVE' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-secondary/15 text-secondary'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 px-3 pb-1">
              <Link
                href="/#book-demo"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Book Free Demo Class</span>
                <span>➔</span>
              </Link>
            </div>
            <div className="pt-2 px-3">
              <InstallAppButton variant="full" />
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Dynamic Announcement Bar - Only shown on Home Page */}
      {pathname === '/' && activeAnnouncements.length > 0 && (
        <div className="bg-primary text-white py-1 border-b border-border-subtle text-xs font-semibold overflow-hidden relative select-none">
          <div className="whitespace-nowrap flex gap-8 justify-start w-fit animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {activeAnnouncements.map((ann, idx) => (
              <span key={ann.id} className={`inline-flex items-center gap-2.5 ${idx === 0 ? 'pl-4' : ''}`} >
                <span className="text-sm select-none">{ann.icon}</span>
                <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-secondary/10">
                  {ann.badge}
                </span>
                <span className="text-gray-100 font-medium tracking-tight">
                  {ann.text}
                </span>
                {ann.link && (
                  <Link 
                    href={ann.link} 
                    className="inline-flex items-center gap-0.5 text-secondary-light hover:text-white underline font-bold tracking-normal transition-colors text-[11px]"
                  >
                    Learn More
                    <span className="text-[10px]">→</span>
                  </Link>
                )}
                <span className="ml-8 text-secondary/35 font-bold select-none">•</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search Modal Component */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
