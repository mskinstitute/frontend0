'use client';

import React from 'react';
import Link from 'next/link';
import { List, Clock, ChevronRight } from 'lucide-react';
import { TutorialItem } from '@/types';

interface TutorialCardProps {
  tutorial: TutorialItem;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  // Determine technology icon
  const renderIcon = () => {
    switch (tutorial.icon?.toLowerCase()) {
      case 'python':
        return (
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
            {/* Python Snake Icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.016 2.008c-3.13 0-5.016 1.34-5.016 3.793v2.85h5.016v.95H4.258C2.106 9.601 1 11.238 1 13.791c0 2.68 1.488 4.209 4.148 4.209h2.383v-3.082c0-2.453 1.886-3.793 5.016-3.793h4.945v-.95h-7.328V8.65h7.328V5.801c0-2.453-1.886-3.793-5.016-3.793h-.46zm-1.886 1.9a.95.95 0 110 1.9.95.95 0 010-1.9zm1.886 18.084c3.13 0 5.016-1.34 5.016-3.793v-2.85h-5.016v-.95h7.758c2.152 0 3.258-1.637 3.258-4.19 0-2.68-1.488-4.209-4.148-4.209h-2.383v3.082c0 2.453-1.886 3.793-5.016 3.793H6.54v.95h7.328v1.525H6.54v2.85c0 2.453 1.886 3.792 5.016 3.792h.46zm1.886-1.9a.95.95 0 110-1.9.95.95 0 010 1.9z" />
            </svg>
          </div>
        );
      case 'html':
        return (
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
            {/* Globe / Web Icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        );
      case 'css':
        return (
          <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shadow-2xs">
            {/* Palette Icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-2xs font-mono font-black text-sm">
            JS
          </div>
        );
    }
  };

  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="bg-white border border-border-subtle rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between gap-6 group cursor-pointer"
    >
      <div className="space-y-4">
        {/* Top Icon & Badge Row */}
        <div className="flex items-center justify-between">
          {renderIcon()}
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg">
            {tutorial.badge || 'Beginner'}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
            {tutorial.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
            {tutorial.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer Metrics Row */}
      <div className="pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs text-text-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <List className="w-3.5 h-3.5 text-text-muted" />
            {tutorial.lessonsCount || 9} lessons
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-text-muted" />
            {tutorial.totalHours || '40h'}
          </span>
        </div>

        <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-bold text-xs">
          Explore
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
