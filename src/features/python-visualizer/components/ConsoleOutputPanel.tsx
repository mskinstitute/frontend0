'use client';

import React from 'react';
import { Terminal, AlertCircle, Info, Sparkles } from 'lucide-react';

interface ConsoleOutputPanelProps {
  stdout: string;
  explanation?: string;
  error?: {
    type: string;
    message: string;
  };
  currentStepIndex: number;
}

export default function ConsoleOutputPanel({
  stdout,
  explanation,
  error,
  currentStepIndex,
}: ConsoleOutputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#151515] text-slate-200 select-text">
      {/* Top Banner: Natural Language Step Explanation */}
      {explanation && (
        <div className="flex items-start gap-2 p-2.5 bg-[#202020] border-b border-[#2d2d2d] text-xs">
          <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-slate-300">Step Explanation:</span>
            <span className="text-slate-400 font-mono">{explanation}</span>
          </div>
        </div>
      )}

      {/* Runtime Exception Alert if present */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-rose-950/40 border-b border-rose-900/60 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-rose-300">
              {error.type} Exception
            </span>
            <span className="text-rose-200 font-mono mt-0.5">{error.message}</span>
          </div>
        </div>
      )}

      {/* Stdout Console Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#181818] border-b border-[#252525] text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase tracking-wider text-[11px]">Program Stdout</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          Synchronized to Step {currentStepIndex + 1}
        </span>
      </div>

      {/* Console Content */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 bg-[#121212]">
        {stdout ? (
          <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300/90 font-mono">
            {stdout}
          </pre>
        ) : (
          <span className="text-slate-600 italic">No output printed yet</span>
        )}
      </div>
    </div>
  );
}
