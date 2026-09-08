'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  Eye,
  Code2,
  Clock,
  Type,
  Hash,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { EditorTheme } from './types';
import ActionTooltip from './ActionTooltip';

interface MarkdownPreviewProps {
  content: string;
  fileName?: string;
  theme?: EditorTheme;
}

export default function MarkdownPreview({
  content,
  fileName = 'document.md',
  theme = 'vs-dark',
}: MarkdownPreviewProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Compute live document statistics
  const stats = useMemo(() => {
    const trimmed = content.trim();
    if (!trimmed) {
      return { words: 0, chars: 0, headings: 0, readTimeMinutes: 0 };
    }

    // Word count
    const wordsArray = trimmed.split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const chars = trimmed.length;

    // Headings count
    const headings = (content.match(/^#{1,6}\s+/gm) || []).length;

    // Estimated reading time (~200 words per minute)
    const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return { words, chars, headings, readTimeMinutes };
  }, [content]);

  // Generate clean exportable HTML
  const generatedHtml = useMemo(() => {
    // Basic conversion for export
    const title = fileName.replace(/\.[^/.]+$/, '');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - MSK Markdown Document</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.65;
      color: #24292e;
      max-width: 860px;
      margin: 40px auto;
      padding: 0 20px;
    }
    h1, h2, h3, h4, h5, h6 { color: #1f2328; margin-top: 24px; margin-bottom: 12px; font-weight: 700; }
    h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; font-family: monospace; }
    code { background: #f1f2f4; padding: 2px 5px; border-radius: 4px; font-size: 85%; font-family: monospace; }
    blockquote { border-left: 4px solid #0969da; color: #57606a; padding: 0 16px; margin: 16px 0; }
    table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    th, td { border: 1px solid #d0d7de; padding: 8px 12px; text-align: left; }
    th { background: #f6f8fa; font-weight: 600; }
    tr:nth-child(even) { background: #fbfbfc; }
    hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: #d0d7de; border: 0; }
    a { color: #0969da; text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  ${containerRef.current ? containerRef.current.innerHTML : content}
</body>
</html>`;
  }, [content, fileName]);

  // 1. Copy Rendered HTML to Clipboard
  const handleCopyHtml = async () => {
    try {
      const htmlToCopy = containerRef.current
        ? containerRef.current.innerHTML
        : generatedHtml;
      await navigator.clipboard.writeText(htmlToCopy);
      setCopiedHtml(true);
      toast.success('Rendered HTML copied to clipboard!', { icon: '📋' });
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      toast.error('Failed to copy HTML to clipboard.');
    }
  };

  // 2. Download Standalone HTML file
  const handleDownloadHtml = () => {
    try {
      const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace(/\.md$/i, '') + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${a.download}`, { icon: '💾' });
    } catch {
      toast.error('Could not download HTML file.');
    }
  };

  // 3. Print / Save as PDF
  const handlePrint = () => {
    window.print();
  };

  const isDark = theme === 'vs-dark' || theme === 'hc-black';

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-text bg-[#1e1e1e]">
      {/* 1. TOP HEADER TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-[#252526] border-b border-[#2d2d2d] text-xs select-none">
        {/* Left: Document Info & View Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300 font-semibold">
            <span className="text-base">📝</span>
            <span className="truncate max-w-[140px] sm:max-w-[200px]">{fileName}</span>
          </div>

          <div className="h-4 w-[1px] bg-[#3c3c3c] hidden sm:block" />

          {/* View Mode Toggle: Preview vs HTML Source */}
          <div className="flex items-center bg-[#1e1e1e] p-0.5 rounded-lg border border-[#333]">
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('html')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'html'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Raw HTML</span>
            </button>
          </div>
        </div>

        {/* Center: Live Stats Badges */}
        <div className="hidden md:flex items-center gap-2.5 font-mono text-[10px] text-slate-400 bg-[#1e1e1e] px-2.5 py-1 rounded-md border border-[#333]">
          <div className="flex items-center gap-1">
            <Type className="w-3 h-3 text-secondary" />
            <span>
              <strong className="text-slate-200">{stats.words}</strong> words
            </span>
          </div>
          <div className="w-[1px] h-3 bg-[#333]" />
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-amber-400" />
            <span>
              <strong className="text-slate-200">{stats.chars}</strong> chars
            </span>
          </div>
          <div className="w-[1px] h-3 bg-[#333]" />
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>
              ~<strong className="text-slate-200">{stats.readTimeMinutes}</strong> min read
            </span>
          </div>
        </div>

        {/* Right: Export Tools */}
        <div className="flex items-center gap-1">
          {/* Copy HTML */}
          <ActionTooltip label="Copy Rendered HTML" placement="bottom">
            <button
              type="button"
              onClick={handleCopyHtml}
              aria-label="Copy Rendered HTML"
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-[#333] rounded transition-colors cursor-pointer text-[11px]"
            >
              {copiedHtml ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy HTML</span>
                </>
              )}
            </button>
          </ActionTooltip>

          {/* Download HTML */}
          <ActionTooltip label="Download Standalone .html" placement="bottom">
            <button
              type="button"
              onClick={handleDownloadHtml}
              aria-label="Download Standalone HTML"
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-[#333] rounded transition-colors cursor-pointer text-[11px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export HTML</span>
            </button>
          </ActionTooltip>

          {/* Print / PDF */}
          <ActionTooltip label="Print / Save as PDF (Ctrl + P)" placement="bottom-end">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print Document as PDF"
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-[#333] rounded transition-colors cursor-pointer text-[11px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </ActionTooltip>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {viewMode === 'preview' ? (
          <div
            ref={containerRef}
            className={`max-w-4xl mx-auto rounded-xl p-4 sm:p-8 transition-colors ${
              isDark
                ? 'bg-[#181818] text-slate-100 shadow-xl border border-[#2a2a2a]'
                : 'bg-white text-slate-900 shadow-md border border-slate-200'
            }`}
          >
            {content.trim().length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <FileText className="w-10 h-10 mx-auto opacity-30" />
                <p className="font-semibold text-sm">Markdown document is empty.</p>
                <p className="text-xs text-slate-400">
                  Type markdown content in the editor on the left to see live formatting.
                </p>
              </div>
            ) : (
              <div className={isDark ? 'markdown-preview-dark' : 'markdown-preview-light'}>
                <MarkdownRenderer content={content} />
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#141414] border border-[#2d2d2d] rounded-xl p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-emerald-900 selection:text-white">
              {containerRef.current ? containerRef.current.innerHTML : generatedHtml}
            </div>
          </div>
        )}
      </div>

      {/* Embedded Scoped Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              .markdown-preview-root,
              .markdown-preview-dark,
              .markdown-preview-light,
              .markdown-preview-dark *,
              .markdown-preview-light * {
                visibility: visible !important;
              }
              .markdown-preview-dark,
              .markdown-preview-light {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: #ffffff !important;
                color: #000000 !important;
                padding: 20px !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}
