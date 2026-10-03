'use client';

import React from 'react';
import { CallFrame, SerializedVariable } from '../types';
import VariableInspector from './VariableInspector';
import { Layers, Globe, Box, Terminal } from 'lucide-react';

interface CallStackPanelProps {
  callStack: CallFrame[];
  globals: Record<string, SerializedVariable>;
  changedVarName?: string;
  onSelectHeapObject?: (heapId: string) => void;
}

export default function CallStackPanel({
  callStack,
  globals,
  changedVarName,
  onSelectHeapObject,
}: CallStackPanelProps) {
  const globalEntries = Object.values(globals);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#1a1a1a] p-3 gap-3 text-slate-200">
      {/* Call Stack Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider text-[11px]">Call Stack Frames</span>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-800/40 px-1.5 py-0.5 rounded">
            {callStack.length} {callStack.length === 1 ? 'frame' : 'frames'}
          </span>
        </div>

        {callStack.length === 0 ? (
          <div className="p-3 rounded-lg bg-[#222222] border border-[#333333] text-center text-xs text-slate-500">
            No active stack frames
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-2.5">
            {callStack.map((frame, idx) => {
              const isTop = idx === 0;
              const localVars = Object.values(frame.locals);

              return (
                <div
                  key={frame.id + idx}
                  className={`flex flex-col rounded-xl border p-2.5 transition-all ${
                    isTop
                      ? 'bg-[#222222] border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                      : 'bg-[#1e1e1e] border-[#2f2f2f] opacity-80'
                  }`}
                >
                  {/* Frame Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Box className={`w-3.5 h-3.5 ${isTop ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="font-mono text-xs font-bold text-white">
                        {frame.funcName}()
                      </span>
                      {isTop && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-cyan-500 text-slate-950">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Line {frame.line}
                    </span>
                  </div>

                  {/* Frame Local Variables */}
                  <div className="flex flex-col gap-1.5">
                    {localVars.length === 0 ? (
                      <span className="text-[11px] text-slate-500 italic px-1">
                        No local variables
                      </span>
                    ) : (
                      localVars.map((v) => (
                        <VariableInspector
                          key={v.name}
                          variable={v}
                          isChanged={isTop && changedVarName === v.name}
                          onSelectHeapObject={onSelectHeapObject}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Global Scope Section */}
      <div className="flex flex-col gap-2 pt-2 border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider text-[11px]">Global Scope</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {globalEntries.length} variables
          </span>
        </div>

        {globalEntries.length === 0 ? (
          <div className="p-3 rounded-lg bg-[#222222] border border-[#333333] text-center text-xs text-slate-500">
            No global variables defined
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {globalEntries.map((v) => (
              <VariableInspector
                key={v.name}
                variable={v}
                isChanged={changedVarName === v.name}
                onSelectHeapObject={onSelectHeapObject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
