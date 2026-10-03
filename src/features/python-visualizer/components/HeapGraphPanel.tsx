'use client';

import React from 'react';
import { HeapObject } from '../types';
import { Database, Hash, List, Grid, Box, Cpu } from 'lucide-react';

interface HeapGraphPanelProps {
  heap: Record<string, HeapObject>;
  highlightedHeapId?: string | null;
  onSelectHeapObject?: (heapId: string) => void;
}

export default function HeapGraphPanel({
  heap,
  highlightedHeapId,
  onSelectHeapObject,
}: HeapGraphPanelProps) {
  const heapEntries = Object.values(heap);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#181818] p-3 gap-3 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
        <div className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span className="uppercase tracking-wider text-[11px]">Heap Memory Objects</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          {heapEntries.length} {heapEntries.length === 1 ? 'object' : 'objects'} in heap
        </span>
      </div>

      {heapEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d] text-center text-slate-500 gap-2">
          <Cpu className="w-8 h-8 opacity-40 text-slate-400" />
          <span className="text-xs">No complex objects allocated in heap yet</span>
          <span className="text-[11px] text-slate-600 max-w-xs">
            Lists, dictionaries, sets, and custom class instances will appear here as they are allocated.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {heapEntries.map((obj) => {
            const isHighlighted = highlightedHeapId === obj.id;
            const shortId = obj.id.length > 8 ? obj.id.slice(-6) : obj.id;

            return (
              <div
                key={obj.id}
                id={`heap-${obj.id}`}
                className={`flex flex-col rounded-xl border p-3 transition-all ${
                  isHighlighted
                    ? 'bg-[#222222] border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                    : 'bg-[#1e1e1e] border-[#2e2e2e] hover:border-slate-600'
                }`}
              >
                {/* Object Header: Type + Memory Address */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {obj.type === 'list' || obj.type === 'tuple' ? (
                      <List className="w-3.5 h-3.5 text-amber-400" />
                    ) : obj.type === 'dict' ? (
                      <Grid className="w-3.5 h-3.5 text-orange-400" />
                    ) : (
                      <Box className="w-3.5 h-3.5 text-teal-400" />
                    )}
                    <span className="font-mono text-xs font-bold text-white capitalize">
                      {obj.typeStr}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({obj.repr})
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-400">
                    ID: @0x{shortId}
                  </span>
                </div>

                {/* Object Content: Lists/Tuples */}
                {(obj.type === 'list' || obj.type === 'tuple') && obj.items && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {obj.items.length === 0 ? (
                      <span className="text-[11px] text-slate-500 italic">Empty collection</span>
                    ) : (
                      obj.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center bg-[#282828] border border-[#383838] rounded-md overflow-hidden text-center min-w-[42px]"
                        >
                          <span className="text-[9px] font-mono text-slate-500 bg-[#202020] w-full px-1 border-b border-[#383838]">
                            [{item.index}]
                          </span>
                          <span className="text-xs font-mono font-medium text-amber-300 px-2 py-1">
                            {item.value.isPrimitive ? (
                              item.value.repr
                            ) : (
                              <button
                                type="button"
                                onClick={() => item.value.heapId && onSelectHeapObject?.(item.value.heapId)}
                                className="text-cyan-400 underline decoration-dotted text-[11px] cursor-pointer"
                              >
                                {item.value.repr}
                              </button>
                            )}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Object Content: Dictionaries */}
                {obj.type === 'dict' && obj.items && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {obj.items.length === 0 ? (
                      <span className="text-[11px] text-slate-500 italic">Empty dictionary</span>
                    ) : (
                      obj.items.map((entry, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-2 py-1 bg-[#282828] border border-[#383838] rounded text-xs font-mono"
                        >
                          <span className="text-orange-300 font-semibold truncate mr-2">
                            {entry.key}:
                          </span>
                          <span className="text-slate-300 truncate">
                            {entry.value.isPrimitive ? (
                              entry.value.repr
                            ) : (
                              <button
                                type="button"
                                onClick={() => entry.value.heapId && onSelectHeapObject?.(entry.value.heapId)}
                                className="text-cyan-400 underline decoration-dotted cursor-pointer"
                              >
                                {entry.value.repr}
                              </button>
                            )}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Object Content: Custom Classes / Objects */}
                {obj.type === 'object' && obj.attributes && (
                  <div className="flex flex-col gap-1 pt-1">
                    {Object.keys(obj.attributes).length === 0 ? (
                      <span className="text-[11px] text-slate-500 italic">No public instance attributes</span>
                    ) : (
                      Object.entries(obj.attributes).map(([attrName, attrVal]) => (
                        <div
                          key={attrName}
                          className="flex items-center justify-between px-2 py-1 bg-[#282828] border border-[#383838] rounded text-xs font-mono"
                        >
                          <span className="text-teal-300 font-medium">{attrName}:</span>
                          <span className="text-slate-300">
                            {attrVal.isPrimitive ? (
                              attrVal.repr
                            ) : (
                              <button
                                type="button"
                                onClick={() => attrVal.heapId && onSelectHeapObject?.(attrVal.heapId)}
                                className="text-cyan-400 underline decoration-dotted cursor-pointer"
                              >
                                {attrVal.repr}
                              </button>
                            )}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
