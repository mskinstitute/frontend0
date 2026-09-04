'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ConsoleMessage } from './types';
import {
  Terminal,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ConsoleOutputProps {
  logs: ConsoleMessage[];
  onClear: () => void;
  isRunning?: boolean;
  stdin?: string;
  onStdinChange?: (newStdin: string) => void;
}

export default function ConsoleOutput({
  logs,
  onClear,
  isRunning = false,
  stdin = '',
  onStdinChange,
}: ConsoleOutputProps) {
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'stdin'>('output');

  // Automatically scroll to bottom when new logs arrive and output tab is active
  useEffect(() => {
    if (activeConsoleTab === 'output') {
      scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeConsoleTab]);

  // If user clicks Run and logs arrive, switch to output tab
  useEffect(() => {
    if (isRunning) {
      setActiveConsoleTab('output');
    }
  }, [isRunning]);

  const handleCopyAll = () => {
    if (logs.length === 0) return;
    const text = logs
      .map((l) => `[${l.timestamp}] [${l.type.toUpperCase()}] ${l.content}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Console output copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />;
      case 'warn':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />;
      case 'info':
        return <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />;
      default:
        return (
          <span className="text-slate-500 font-mono text-[11px] select-none flex-shrink-0">&gt;</span>
        );
    }
  };

  const getLogTextColor = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return 'text-rose-300 font-medium';
      case 'warn':
        return 'text-amber-300';
      case 'info':
        return 'text-sky-300';
      case 'success':
        return 'text-emerald-300 font-semibold';
      default:
        return 'text-slate-200';
    }
  };

  const hasStdin = Boolean(stdin && stdin.trim().length > 0);

  return (
    <div className="w-full h-full flex flex-col bg-[#0d1117] text-slate-300 overflow-hidden font-mono text-xs">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-slate-800 select-none">
        {/* Left: Tab Switcher (Output vs Stdin) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveConsoleTab('output')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer text-xs font-medium ${
              activeConsoleTab === 'output'
                ? 'bg-[#21262d] text-emerald-400 font-bold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminal Output</span>
            {logs.length > 0 && (
              <span className="text-[10px] px-1 py-0.2 bg-[#2d333b] text-slate-300 rounded">
                {logs.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveConsoleTab('stdin')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer text-xs font-medium ${
              activeConsoleTab === 'stdin'
                ? 'bg-[#21262d] text-amber-400 font-bold border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Input (stdin)</span>
            {hasStdin && (
              <span
                className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"
                title="Custom stdin active"
              />
            )}
          </button>

          {isRunning && (
            <span className="ml-1.5 flex items-center gap-1 text-[10px] text-amber-400 font-sans font-medium px-1.5 py-0.5 bg-amber-400/10 rounded border border-amber-400/20 animate-pulse">
              Running...
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {activeConsoleTab === 'output' && logs.length > 0 && (
            <>
              <button
                onClick={handleCopyAll}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors flex items-center gap-1 px-1.5 text-[10px] cursor-pointer"
                title="Copy terminal output"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                onClick={onClear}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition-colors flex items-center gap-1 px-1.5 text-[10px] cursor-pointer"
                title="Clear console"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </>
          )}

          {activeConsoleTab === 'stdin' && hasStdin && (
            <button
              onClick={() => onStdinChange?.('')}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition-colors flex items-center gap-1 px-1.5 text-[10px] cursor-pointer"
              title="Clear stdin"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Input</span>
            </button>
          )}
        </div>
      </div>

      {/* Terminal Content or Stdin Textarea */}
      {activeConsoleTab === 'stdin' ? (
        <div className="flex-1 p-3 flex flex-col gap-2 bg-[#0a0d12]">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Provide input for <code className="text-amber-300">input()</code>, <code className="text-amber-300">cin</code>, or <code className="text-amber-300">scanf()</code>:</span>
            <span className="text-[10px] text-slate-500 font-sans">Each line represents one input prompt</span>
          </div>
          <textarea
            value={stdin}
            onChange={(e) => onStdinChange?.(e.target.value)}
            placeholder={`e.g.\n10\n20\nJohn Doe\n(Enter each input value on a new line)`}
            className="flex-1 w-full p-3 bg-[#11161d] border border-slate-700/80 rounded-lg text-slate-100 font-mono text-xs resize-none focus:outline-none focus:border-amber-400/60 leading-relaxed placeholder:text-slate-600"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 selection:bg-secondary/30 selection:text-white">
          {hasStdin && (
            <div
              onClick={() => setActiveConsoleTab('stdin')}
              className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded text-[10px] flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-colors mb-2"
            >
              <span>⚙️ Custom Stdin Active (Click to view/edit input values)</span>
              <span className="font-sans underline text-[9px]">Edit Input</span>
            </div>
          )}

          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-4 space-y-2 select-none">
              <Terminal className="w-8 h-8 opacity-40 text-secondary" />
              <p className="text-xs">Terminal is idle.</p>
              <p className="text-[11px] text-slate-600">
                Click <strong className="text-slate-400">Run Code</strong> or press{' '}
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px] text-slate-300">
                  Ctrl + Enter
                </kbd>{' '}
                to execute.
              </p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2 leading-relaxed hover:bg-white/5 px-1 py-0.5 rounded transition-colors"
              >
                {renderIcon(log.type)}
                <span className="text-slate-500 text-[10px] select-none font-sans mt-0.5">
                  {log.timestamp}
                </span>
                <pre
                  className={`flex-1 whitespace-pre-wrap break-all ${getLogTextColor(
                    log.type
                  )} font-mono`}
                >
                  {log.content}
                </pre>
              </div>
            ))
          )}
          <div ref={scrollBottomRef} />
        </div>
      )}
    </div>
  );
}
