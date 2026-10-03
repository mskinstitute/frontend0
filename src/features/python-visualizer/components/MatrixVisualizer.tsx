'use client';

import React from 'react';
import { HeapObject, CallFrame } from '../types';
import { Grid, Sparkles } from 'lucide-react';

interface MatrixVisualizerProps {
  heap: Record<string, HeapObject>;
  callStack: CallFrame[];
  onLoadTemplate?: (templateId: string) => void;
}

export default function MatrixVisualizer({
  heap,
  callStack,
  onLoadTemplate,
}: MatrixVisualizerProps) {
  // Find all 2D matrices in heap
  const matrices = Object.values(heap).filter((o) => o.is2DMatrix);

  // Extract loop variables from current active frame
  let activeRow: number | null = null;
  let activeCol: number | null = null;

  if (callStack.length > 0) {
    const locals = callStack[0].locals;
    const rVar = locals['r'] || locals['row'] || locals['i'];
    const cVar = locals['c'] || locals['col'] || locals['j'];

    if (rVar && rVar.type === 'int') {
      activeRow = parseInt(rVar.repr, 10);
    }
    if (cVar && cVar.type === 'int') {
      activeCol = parseInt(cVar.repr, 10);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#181818] p-3 gap-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
        <div className="flex items-center gap-1.5">
          <Grid className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase tracking-wider text-[11px]">2D Grid & Matrix Visualizer</span>
        </div>
        {activeRow !== null && activeCol !== null && (
          <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
            Target Cell: [{activeRow}][{activeCol}]
          </span>
        )}
      </div>

      {matrices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d] text-center text-slate-500 gap-3">
          <Grid className="w-8 h-8 opacity-40 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">
            No 2D Matrix Detected in Heap
          </span>
          <p className="text-[11px] text-slate-500 max-w-sm">
            Variables defined as 2D lists like <code className="text-emerald-400">grid = [[1, 2], [3, 4]]</code> will automatically be rendered as coordinate tables here with active row/col highlights.
          </p>
          {onLoadTemplate && (
            <button
              type="button"
              onClick={() => onLoadTemplate('matrix_grid')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer mt-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Load 2D Matrix Traversal Code</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {matrices.map((matrix, mIdx) => {
            const numRows = matrix.matrixDimensions ? matrix.matrixDimensions[0] : (matrix.items?.length || 0);
            const numCols = matrix.matrixDimensions ? matrix.matrixDimensions[1] : 0;

            return (
              <div
                key={matrix.id + mIdx}
                className="flex flex-col gap-2 p-3 bg-[#1e1e1e] rounded-xl border border-[#2e2e2e]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">
                    Matrix #{mIdx + 1} ({numRows} × {numCols})
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: @0x{matrix.id.slice(-4)}
                  </span>
                </div>

                {/* Table representation */}
                <div className="overflow-x-auto pt-2">
                  <table className="border-collapse text-center mx-auto">
                    <thead>
                      <tr>
                        <th className="p-1 text-[10px] font-mono text-slate-600">R\C</th>
                        {Array.from({ length: numCols }).map((_, c) => (
                          <th
                            key={c}
                            className={`p-1.5 text-xs font-mono font-semibold ${
                              activeCol === c ? 'text-emerald-400 bg-emerald-500/10 rounded' : 'text-slate-500'
                            }`}
                          >
                            [{c}]
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.items?.map((rowItem, r) => {
                        const rowHeapId = rowItem.value.heapId;
                        const rowObj = rowHeapId ? heap[rowHeapId] : null;
                        const rowValues = rowObj?.items || [];

                        return (
                          <tr key={r}>
                            <td
                              className={`p-1.5 text-xs font-mono font-semibold ${
                                activeRow === r ? 'text-emerald-400 bg-emerald-500/10 rounded' : 'text-slate-500'
                              }`}
                            >
                              [{r}]
                            </td>
                            {rowValues.map((cellItem, c) => {
                              const isActive = activeRow === r && activeCol === c;
                              return (
                                <td
                                  key={c}
                                  className={`p-2 border border-[#2d2d2d] transition-all font-mono text-xs ${
                                    isActive
                                      ? 'bg-emerald-500/30 text-emerald-200 font-bold ring-2 ring-emerald-400 shadow-md scale-105'
                                      : activeRow === r || activeCol === c
                                      ? 'bg-[#252525] text-slate-200'
                                      : 'bg-[#202020] text-slate-300'
                                  }`}
                                >
                                  {cellItem.value.repr}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
