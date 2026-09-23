'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';
import { pushToDataLayer } from '@/lib/dataLayer';

const WHATSAPP_NUMBER = '918393042166';

export default function FloatingWhatsAppCTA() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Auto-dismiss tooltip after 8 seconds so it doesn't distract
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  // Don't display in admin dashboard or printable certificate views
  if (pathname.startsWith('/admin') || pathname.startsWith('/verify-certificate')) {
    return null;
  }

  // Generate contextual message based on current page
  let contextualMessage = 'Hi MSK Institute, I want to inquire about coding courses and free demo classes in Shikohabad.';
  let tooltipText = 'Book a Free Demo Class';

  if (pathname.includes('/python')) {
    contextualMessage = 'Hi MSK Institute, I would like to book a free demo class for Python Programming at your Shikohabad center.';
    tooltipText = 'Free Python Demo';
  } else if (pathname.includes('/web') || pathname.includes('/full-stack')) {
    contextualMessage = 'Hi MSK Institute, I want to book a free demo for Full-Stack Web Development at the Shikohabad lab.';
    tooltipText = 'Web Dev Demo';
  } else if (pathname.includes('/ccc') || pathname.includes('/nielit')) {
    contextualMessage = 'Hi MSK Institute, I need details about the NIELIT CCC exam preparation batch and fees.';
    tooltipText = 'CCC Batch Info';
  } else if (pathname.startsWith('/courses/')) {
    contextualMessage = 'Hi MSK Institute, I am viewing this course on your website and want to schedule a free demo session.';
    tooltipText = 'Free Demo Session';
  } else if (pathname.startsWith('/live-batches')) {
    contextualMessage = 'Hi MSK Institute, I want to check seat availability and timing for upcoming live batches.';
    tooltipText = 'Check Batch Seats';
  } else if (pathname.startsWith('/tutorials') || pathname.startsWith('/study-material')) {
    contextualMessage = 'Hi MSK Institute, I am studying your notes/tutorials and want information on hands-on practical lab batches.';
    tooltipText = 'Ask a Question';
  }

  const encodedMessage = encodeURIComponent(contextualMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const handleClick = () => {
    pushToDataLayer('whatsapp_click', {
      button_text: 'Floating WhatsApp Bubble',
      link_url: `https://wa.me/${WHATSAPP_NUMBER}`,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    });
  };

  return (
    <aside 
      aria-label="Direct Admissions WhatsApp Chat"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex items-end gap-2 group no-print select-none"
    >
      {/* Floating Prompt Pill / Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white text-gray-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-lg border border-gray-100 animate-in fade-in slide-in-from-right-3 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{tooltipText}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with MSK Institute Admissions on WhatsApp"
      >
        {/* Subtle breathing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10" />

        {/* Small Online Indicator Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>
    </aside>
  );
}
