'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Video, FileText, Download, ShieldCheck } from 'lucide-react';
import { usePwa } from '@/context/PwaContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { isInstalled, installApp } = usePwa();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: BookOpen,
    },
    {
      name: 'Live',
      href: '/live',
      icon: Video,
      badge: 'LIVE',
    },
    {
      name: 'Material',
      href: '/study-material',
      icon: FileText,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border-subtle shadow-[0_-4px_16px_rgba(0,0,0,0.06)] no-print">
      <nav 
        className="max-w-md mx-auto px-2 flex items-center justify-around"
        style={{ paddingBottom: 'max(0.4rem, env(safe-area-inset-bottom))', paddingTop: '0.4rem' }}
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 select-none ${
                active
                  ? 'text-secondary font-bold'
                  : 'text-text-muted hover:text-primary hover:bg-surface/60'
              }`}
            >
              {/* Active Indicator Top Pill */}
              {active && (
                <span className="absolute -top-1 w-6 h-0.5 bg-secondary rounded-full" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                )}
              </div>

              <span className={`text-[11px] leading-tight mt-1 tracking-tight ${active ? 'font-bold text-secondary' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* 5th Tab: If NOT installed show Install App button; if INSTALLED show Verify Certificate tab */}
        {!isInstalled ? (
          <button
            onClick={() => installApp()}
            aria-label="Install App"
            className="relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-secondary select-none hover:bg-secondary/5 transition-all group"
          >
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center">
                <Download className="w-3.5 h-3.5 text-secondary animate-bounce" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-secondary leading-tight mt-1">
              Install
            </span>
          </button>
        ) : (
          <Link
            href="/verify-certificate"
            aria-label="Verify Certificate"
            className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl select-none transition-all ${
              isActive('/verify-certificate') ? 'text-secondary font-bold' : 'text-text-muted hover:text-primary'
            }`}
          >
            {isActive('/verify-certificate') && (
              <span className="absolute -top-1 w-6 h-0.5 bg-secondary rounded-full" />
            )}
            <div className="relative">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className={`text-[11px] leading-tight mt-1 tracking-tight ${isActive('/verify-certificate') ? 'font-bold text-secondary' : 'font-medium'}`}>
              Verify
            </span>
          </Link>
        )}
      </nav>
    </div>
  );
}
