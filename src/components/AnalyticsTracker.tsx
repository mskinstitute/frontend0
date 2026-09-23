'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  trackPageView,
  trackWhatsAppClick,
  trackPhoneClick,
  trackEmailClick,
  trackFileDownload,
} from '@/lib/dataLayer';

/**
 * Global Analytics & Telemetry Tracker
 *
 * 1. Handles Next.js SPA route transitions for accurate page_view telemetry.
 * 2. Provides global event delegation for:
 *    - WhatsApp CTAs (wa.me, api.whatsapp.com, web.whatsapp.com)
 *    - Telephone links (tel:)
 *    - Email links (mailto:)
 *    - Download links (.pdf, .zip, etc.)
 *
 * Zero PII is emitted to analytics.
 */

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const query = searchParams?.toString();
      const url = pathname + (query ? `?${query}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsTracker() {
  useEffect(() => {
    // Global delegation for click events
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const buttonText = (target.textContent || target.getAttribute('aria-label') || target.getAttribute('title') || '').trim();

      // 1. WhatsApp Links
      if (
        href.includes('wa.me') ||
        href.includes('api.whatsapp.com') ||
        href.includes('web.whatsapp.com')
      ) {
        trackWhatsAppClick({
          buttonText: buttonText || 'WhatsApp Contact',
          linkUrl: href.split('?')[0], // Strip message queries to preserve privacy
        });
        return;
      }

      // 2. Telephone Links
      if (href.startsWith('tel:')) {
        trackPhoneClick({
          buttonText: buttonText || 'Phone Contact',
        });
        return;
      }

      // 3. Email Links
      if (href.startsWith('mailto:')) {
        trackEmailClick({
          buttonText: buttonText || 'Email Contact',
        });
        return;
      }

      // 4. File / Document Downloads
      if (
        target.hasAttribute('download') ||
        /\.(pdf|zip|tar|gz|docx?|xlsx?|pptx?|epub)$/i.test(href)
      ) {
        const fileName = target.getAttribute('download') || href.split('/').pop() || 'document';
        const isNote = href.includes('note') || href.includes('study-material');
        const isCheatsheet = href.includes('cheatsheet');
        const isSyllabus = href.includes('syllabus') || href.includes('curriculum');
        const isBrochure = href.includes('brochure');

        const downloadType = isNote
          ? 'notes'
          : isCheatsheet
          ? 'cheatsheet'
          : isSyllabus
          ? 'syllabus'
          : isBrochure
          ? 'brochure'
          : 'other';

        trackFileDownload({
          fileName,
          downloadType,
        });
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <RouteTracker />
    </Suspense>
  );
}
