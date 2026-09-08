'use client';

import React, { useEffect, useRef } from 'react';
import PlaygroundClient from './PlaygroundClient';
import { SupportedLanguage } from './types';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: SupportedLanguage;
  initialCode?: string;
  title?: string;
}

export default function PlaygroundModal({
  isOpen,
  onClose,
  initialLanguage = 'python',
  initialCode,
}: PlaygroundModalProps) {
  const scrollPositionRef = useRef<number>(0);

  // Preserve background scroll position and lock background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Capture the exact vertical scroll position of the tutorial page
    scrollPositionRef.current = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Return exactly to where the student was reading the tutorial
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        // Close modal when clicking on backdrop outside the editor card
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-7xl h-[94vh] max-h-[960px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-slate-700/80 animate-in zoom-in-95 duration-200">
        <PlaygroundClient
          initialLanguage={initialLanguage}
          initialCode={initialCode}
          isModal={true}
          onCloseModal={onClose}
        />
      </div>
    </div>
  );
}
