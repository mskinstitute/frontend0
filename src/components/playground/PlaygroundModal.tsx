'use client';

import React, { useEffect } from 'react';
import PlaygroundClient from './PlaygroundClient';
import { SupportedLanguage } from './types';
import { X } from 'lucide-react';

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
  title = 'Interactive Code Playground',
}: PlaygroundModalProps) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[900px] flex flex-col bg-[#12161f] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">{title}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Close Playground (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden p-2 sm:p-3">
          <PlaygroundClient
            initialLanguage={initialLanguage}
            initialCode={initialCode}
            isModal={true}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
}
