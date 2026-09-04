'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface WebShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: 'icon' | 'button' | 'compact' | 'pill';
  label?: string;
  className?: string;
}

export default function WebShareButton({
  title = 'MSK Institute - Computer Training & Coding Academy',
  text = 'Learn Python, Full-Stack Web Development, and Computer Courses in Shikohabad.',
  url,
  variant = 'button',
  label = 'Share',
  className = '',
}: WebShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://mskinstitute.in');

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        // If user cancelled, don't show error
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!', { icon: '📋' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy link.');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`p-2 rounded-xl border border-border-subtle bg-white hover:bg-surface text-text-muted hover:text-primary transition-colors cursor-pointer ${className}`}
        aria-label={label}
        title={label}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-white hover:bg-surface text-xs font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer shadow-2xs ${className}`}
        aria-label={label}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied!' : label}</span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/20 bg-secondary/10 hover:bg-secondary text-secondary hover:text-white text-xs font-bold transition-all cursor-pointer ${className}`}
        aria-label={label}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
        <span>{copied ? 'Link Copied!' : label}</span>
      </button>
    );
  }

  // Default 'button' variant
  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-subtle bg-white hover:bg-surface text-primary font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer ${className}`}
      aria-label={label}
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
      <span>{copied ? 'Link Copied!' : label}</span>
    </button>
  );
}
