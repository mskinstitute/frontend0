'use client';

import React from 'react';
import { SerializedVariable, VariableType } from '../types';
import { Link2, ArrowRight } from 'lucide-react';

interface VariableInspectorProps {
  variable: SerializedVariable;
  isChanged?: boolean;
  onSelectHeapObject?: (heapId: string) => void;
}

const TYPE_COLORS: Record<VariableType, { bg: string; text: string; border: string }> = {
  int: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  float: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  str: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  bool: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  none: { bg: 'bg-slate-700/30', text: 'text-slate-400', border: 'border-slate-600/40' },
  list: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  dict: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  set: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  tuple: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  object: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
  function: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  other: { bg: 'bg-slate-700/20', text: 'text-slate-300', border: 'border-slate-700' },
};

export default function VariableInspector({
  variable,
  isChanged = false,
  onSelectHeapObject,
}: VariableInspectorProps) {
  const color = TYPE_COLORS[variable.type] || TYPE_COLORS.other;

  return (
    <div
      className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border transition-all text-xs ${
        isChanged
          ? 'bg-amber-500/15 border-amber-500/60 shadow-xs'
          : 'bg-[#222222] border-[#333333] hover:border-slate-600'
      }`}
    >
      {/* Variable Name & Type Badge */}
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="font-mono font-semibold text-slate-200 truncate">{variable.name}</span>
        <span
          className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${color.bg} ${color.text} ${color.border}`}
        >
          {variable.typeStr}
        </span>
      </div>

      {/* Value Preview or Pointer Link */}
      <div className="flex items-center gap-1.5 overflow-hidden font-mono">
        {variable.isPrimitive ? (
          <span className={`text-[11px] font-medium truncate ${color.text}`}>
            {variable.repr}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => variable.heapId && onSelectHeapObject?.(variable.heapId)}
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 px-1.5 py-0.5 rounded border border-cyan-800/50 transition-colors cursor-pointer"
            title={`Pointer to Heap Object @ 0x${variable.heapId?.slice(-4) || '...'}`}
          >
            <Link2 className="w-3 h-3" />
            <span className="truncate">{variable.repr}</span>
            <ArrowRight className="w-2.5 h-2.5 opacity-60" />
          </button>
        )}
      </div>
    </div>
  );
}
