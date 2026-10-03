'use client';

import React from 'react';
import { RecursionNode } from '../types';
import { Network, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface RecursionTreeVisualizerProps {
  recursionTree?: RecursionNode[];
  onLoadTemplate?: (templateId: string) => void;
}

export default function RecursionTreeVisualizer({
  recursionTree = [],
  onLoadTemplate,
}: RecursionTreeVisualizerProps) {
  // Filter out any root <module>
  const functionNodes = recursionTree.filter((n) => n.funcName !== '<module>');

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#181818] p-3 gap-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
        <div className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-purple-400" />
          <span className="uppercase tracking-wider text-[11px]">Recursion Call Tree</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          {functionNodes.length} calls recorded
        </span>
      </div>

      {functionNodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d] text-center text-slate-500 gap-3">
          <Network className="w-8 h-8 opacity-40 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">
            No Recursive Calls Detected
          </span>
          <p className="text-[11px] text-slate-500 max-w-sm">
            When a function calls itself (like <code className="text-purple-400">fib(n - 1)</code>), each call branch, argument, and returned value will visually expand here.
          </p>
          {onLoadTemplate && (
            <button
              type="button"
              onClick={() => onLoadTemplate('recursion_fib')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer mt-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Load Fibonacci Recursion Code</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {functionNodes.map((node) => {
            const indentPx = Math.min(node.depth * 24, 180);
            const argsStr = Object.entries(node.args)
              .map(([k, v]) => `${k}=${v}`)
              .join(', ');

            return (
              <div
                key={node.id}
                style={{ marginLeft: `${indentPx}px` }}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs ${
                  node.isActive
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200 ring-2 ring-amber-400/30 shadow-md'
                    : node.isCompleted
                    ? 'bg-[#222222] border-emerald-500/30 text-slate-300'
                    : 'bg-[#1c1c1c] border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {node.isActive ? (
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  ) : node.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600" />
                  )}

                  <span className="font-mono font-bold text-white">
                    {node.funcName}({argsStr})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {node.isCompleted && node.returnValue !== undefined ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                      ➔ {node.returnValue}
                    </span>
                  ) : node.isActive ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500 text-slate-950 font-bold">
                      Executing
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">Waiting</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
