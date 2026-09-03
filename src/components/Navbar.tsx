'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, FileText, Home, Video, Search, Newspaper, Briefcase } from 'lucide-react';

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

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Live', href: '/live', icon: Video },
    { name: 'Study Material', href: '/study-material', icon: FileText },
    { name: 'Careers', href: '/careers', icon: Briefcase },
    { name: 'Blogs', href: '/blogs', icon: Newspaper },
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

          {/* Desktop Search Box Button */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Medium screen compact search trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-text-muted bg-surface hover:bg-slate-100 border border-border-subtle rounded-lg cursor-pointer"
                aria-label="Search resources"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="font-medium">Search</span>
              </button>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-secondary font-semibold border-b-2 border-secondary rounded-none pb-1.5'
                      : 'text-text-muted hover:text-primary hover:bg-surface'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
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
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-secondary/10 text-secondary font-semibold'
                      : 'text-text-muted hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 px-3">
              <InstallAppButton variant="full" />
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Search Modal Component */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Dynamic Announcement Bar */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-primary text-white py-1 border-b border-border-subtle text-xs font-semibold overflow-hidden relative select-none">
          <div className="whitespace-nowrap flex gap-8 justify-start w-fit animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {activeAnnouncements.map((ann, idx) => (
              <span key={ann.id} className={`inline-flex items-center gap-2.5 ${idx === 0 ? 'pl-4' : ''}`} >
                {/* Icon */}
                <span className="text-sm select-none">{ann.icon}</span>
                
                {/* Badge Pill */}
                <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-secondary/10">
                  {ann.badge}
                </span>
                
                {/* Text Content */}
                <span className="text-gray-100 font-medium tracking-tight">
                  {ann.text}
                </span>

                {/* Optional CTA Link */}
                {ann.link && (
                  <Link 
                    href={ann.link} 
                    className="inline-flex items-center gap-0.5 text-secondary-light hover:text-white underline font-bold tracking-normal transition-colors text-[11px]"
                  >
                    Learn More
                    <span className="text-[10px]">→</span>
                  </Link>
                )}

                {/* Looping Separator Bullet */}
                <span className="ml-8 text-secondary/35 font-bold select-none">•</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
