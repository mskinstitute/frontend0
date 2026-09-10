'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  X,
  Terminal,
  Trash2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { buildCompositeWebSrcDoc } from '@/lib/webPreviewUtils';

interface ConsoleLogItem {
  id: string;
  level: 'log' | 'warn' | 'error' | 'info';
  text: string;
  timestamp: string;
}

interface InlineCodePreviewProps {
  lang: string;
  code: string;
  companionLang?: string;
  companionCode?: string;
  title?: string;
  onClose?: () => void;
  onOpenPlayground?: () => void;
}

export default function InlineCodePreview({
  lang,
  code,
  companionLang,
  companionCode,
  title,
  onClose,
  onOpenPlayground,
}: InlineCodePreviewProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [reloadNonce, setReloadNonce] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogItem[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate composite HTML for iframe
  const srcDoc = useMemo(() => {
    return buildCompositeWebSrcDoc(lang, code, companionLang, companionCode);
  }, [lang, code, companionLang, companionCode, reloadNonce]);

  // Listen for console logs emitted from inside the sandboxed iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'MSK_INLINE_CONSOLE') {
        const item: ConsoleLogItem = {
          id: Math.random().toString(36).slice(2, 9),
          level: event.data.level || 'log',
          text: event.data.text || '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };
        setConsoleLogs((prev) => [...prev.slice(-49), item]); // keep up to 50 logs
        // Auto-expand console if error occurs
        if (event.data.level === 'error') {
          setIsConsoleOpen(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Reload iframe
  const handleReload = () => {
    setConsoleLogs([]);
    setReloadNonce((n) => n + 1);
  };

  const getContainerMaxWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  const hasCompanion = Boolean(companionCode && companionCode.trim());

  return (
    <div className="border-t border-slate-800 bg-slate-950/95 flex flex-col transition-all duration-200 animate-in slide-in-from-top-2">
      {/* Mini Browser Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        {/* Left: Window Dots & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="hidden xs:inline">Live Preview:</span>
              <span className="text-secondary uppercase font-mono font-bold text-[11px]">
                {lang}
              </span>
            </span>

            {hasCompanion && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-mono">
                + {companionLang?.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Right: Controls (Device Switcher, Reload, Full Playground, Close) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Device Viewport Switcher */}
          <div className="hidden md:flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 mr-1">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Width (Desktop)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                deviceMode === 'tablet'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet Width (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Width (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reload / Re-run */}
          <button
            type="button"
            onClick={handleReload}
            className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer border border-slate-800"
            title="Reload live preview"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px]">Reload</span>
          </button>

          {/* Open in full Playground Modal */}
          {onOpenPlayground && (
            <button
              type="button"
              onClick={onOpenPlayground}
              className="flex items-center gap-1 px-2 py-1 text-secondary hover:text-white bg-secondary/15 hover:bg-secondary rounded-md transition-all cursor-pointer border border-secondary/30 font-medium"
              title="Open in full interactive playground editor"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline text-[11px]">Full Editor</span>
            </button>
          )}

          {/* Close Preview */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer ml-0.5"
              title="Hide live preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Frame Viewport Container */}
      <div className="w-full bg-slate-900/60 p-2 sm:p-4 flex flex-col items-center justify-center overflow-x-auto min-h-[220px]">
        <div
          className={`w-full ${getContainerMaxWidth()} transition-all duration-200 rounded-xl overflow-hidden shadow-lg border border-slate-700/60 bg-white`}
        >
          <iframe
            key={reloadNonce}
            ref={iframeRef}
            srcDoc={srcDoc}
            title={title || 'Inline Live Code Preview'}
            sandbox="allow-scripts allow-modals allow-forms"
            className="w-full h-[260px] sm:h-[320px] border-0 bg-white block"
          />
        </div>
      </div>

      {/* Console Drawer (collapsible at bottom) */}
      {consoleLogs.length > 0 && (
        <div className="border-t border-slate-800 bg-slate-950 text-xs">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-slate-800/80">
            <button
              type="button"
              onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer font-mono"
            >
              <Terminal className="w-3.5 h-3.5 text-secondary" />
              <span>Console ({consoleLogs.length})</span>
              <span className="text-[10px] text-slate-500">
                {isConsoleOpen ? '▲ Hide' : '▼ View'}
              </span>
            </button>

            {isConsoleOpen && (
              <button
                type="button"
                onClick={() => setConsoleLogs([])}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer"
                title="Clear console output"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {isConsoleOpen && (
            <div className="max-h-36 overflow-y-auto p-2.5 font-mono space-y-1 bg-slate-950">
              {consoleLogs.map((log) => {
                let badgeClass = 'text-slate-300';
                if (log.level === 'error') badgeClass = 'text-rose-400 bg-rose-500/10 px-1 rounded';
                else if (log.level === 'warn') badgeClass = 'text-amber-400 bg-amber-500/10 px-1 rounded';
                else if (log.level === 'info') badgeClass = 'text-sky-400';

                return (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[10px] text-slate-600 shrink-0">{log.timestamp}</span>
                    <span className={`break-all ${badgeClass}`}>{log.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
