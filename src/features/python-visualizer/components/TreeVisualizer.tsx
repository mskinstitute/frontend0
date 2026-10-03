'use client';

import React from 'react';
import { HeapObject, CallFrame, SerializedVariable } from '../types';
import { GitBranch, ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';

interface TreeVisualizerProps {
  heap: Record<string, HeapObject>;
  callStack: CallFrame[];
  globals: Record<string, SerializedVariable>;
  onLoadTemplate?: (templateId: string) => void;
}

export default function TreeVisualizer({
  heap,
  callStack,
  globals,
  onLoadTemplate,
}: TreeVisualizerProps) {
  // Collect all active variable names pointing to heap IDs
  const pointerNamesByHeapId: Record<string, string[]> = {};
  const registerPointer = (name: string, serVar?: SerializedVariable) => {
    if (serVar && serVar.heapId) {
      if (!pointerNamesByHeapId[serVar.heapId]) {
        pointerNamesByHeapId[serVar.heapId] = [];
      }
      if (!pointerNamesByHeapId[serVar.heapId].includes(name)) {
        pointerNamesByHeapId[serVar.heapId].push(name);
      }
    }
  };

  // Inspect active locals and globals
  if (callStack.length > 0) {
    Object.entries(callStack[0].locals).forEach(([name, ser]) => registerPointer(name, ser));
  }
  Object.entries(globals).forEach(([name, ser]) => registerPointer(name, ser));

  // Detect linked list nodes
  const linkedListNodes = Object.values(heap).filter((o) => o.isLinkedListNode);
  const treeNodes = Object.values(heap).filter((o) => o.isTreeNode);

  // If linked list nodes found, let's trace from head or find root
  const hasLinkedList = linkedListNodes.length > 0;
  const hasTree = treeNodes.length > 0;

  // Render a simple linked list traversal chain
  const renderLinkedListChains = () => {
    // Find all nodes that are not referenced as .next by any other node (the heads)
    const nextIds = new Set(linkedListNodes.map((n) => n.linkedListNextId).filter(Boolean));
    const potentialHeads = linkedListNodes.filter((n) => !nextIds.has(n.id));
    const heads = potentialHeads.length > 0 ? potentialHeads : [linkedListNodes[0]];

    return (
      <div className="flex flex-col gap-4">
        {heads.map((head, chainIdx) => {
          const chain: HeapObject[] = [];
          const visited = new Set<string>();
          let curr: HeapObject | undefined = head;

          while (curr && !visited.has(curr.id) && chain.length < 15) {
            visited.add(curr.id);
            chain.push(curr);
            const nextId: string | null | undefined = curr.linkedListNextId;
            curr = (nextId && heap[nextId]) ? heap[nextId] : undefined;
          }

          return (
            <div key={head.id + chainIdx} className="flex flex-col gap-2 p-3 bg-[#1e1e1e] rounded-xl border border-[#2e2e2e]">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Linked List Chain #{chainIdx + 1}
              </span>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {chain.map((node, nodeIdx) => {
                  const pointers = pointerNamesByHeapId[node.id] || [];
                  const isCurrent = pointers.some((p) => ['curr', 'current', 'head', 'prev'].includes(p.toLowerCase()));

                  return (
                    <React.Fragment key={node.id}>
                      <div className="flex flex-col items-center gap-1">
                        {/* Variable Pointers pointing to this node */}
                        {pointers.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mb-0.5">
                            {pointers.map((p) => (
                              <span
                                key={p}
                                className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                                  p === 'head'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                    : p === 'curr' || p === 'current'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : p === 'prev'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                }`}
                              >
                                {p} ↓
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="h-4" />
                        )}

                        {/* Node Box */}
                        <div
                          className={`flex items-center rounded-lg border px-3 py-2 font-mono text-sm font-bold shadow-md transition-all ${
                            isCurrent
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/40'
                              : 'bg-[#282828] border-slate-700 text-white'
                          }`}
                        >
                          <span className="text-secondary mr-2">val:</span>
                          <span>{node.linkedListVal ?? '?'}</span>
                        </div>
                      </div>

                      {/* Arrow to Next Node */}
                      <div className="flex items-center text-slate-500 pt-4">
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </React.Fragment>
                  );
                })}

                <div className="pt-4">
                  <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-rose-400">
                    None
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render a binary tree recursively
  const renderBinaryTree = () => {
    // Find tree root (node not referenced as left or right child)
    const childIds = new Set<string>();
    treeNodes.forEach((n) => {
      if (n.treeLeftId) childIds.add(n.treeLeftId);
      if (n.treeRightId) childIds.add(n.treeRightId);
    });
    const potentialRoots = treeNodes.filter((n) => !childIds.has(n.id));
    const root = potentialRoots[0] || treeNodes[0];

    const renderNode = (nodeId: string | null | undefined, depth: number = 0): React.ReactNode => {
      if (!nodeId || !heap[nodeId]) {
        return (
          <span className="text-[10px] font-mono text-slate-600 italic">None</span>
        );
      }
      const node = heap[nodeId];
      const pointers = pointerNamesByHeapId[node.id] || [];

      return (
        <div className="flex flex-col items-center gap-2">
          {/* Node pill */}
          <div className="flex flex-col items-center">
            {pointers.length > 0 && (
              <div className="flex gap-1 mb-1">
                {pointers.map((p) => (
                  <span key={p} className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {p} ↓
                  </span>
                ))}
              </div>
            )}
            <div className="px-3 py-1.5 rounded-full bg-cyan-950/60 border-2 border-cyan-400 text-cyan-200 font-mono text-xs font-bold shadow-md">
              {node.treeVal ?? '?'}
            </div>
          </div>

          {/* Children container */}
          {(node.treeLeftId || node.treeRightId) && (
            <div className="flex items-start gap-4 pt-2 border-t border-slate-800">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-slate-500 mb-1">L</span>
                {renderNode(node.treeLeftId, depth + 1)}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-slate-500 mb-1">R</span>
                {renderNode(node.treeRightId, depth + 1)}
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center p-4 bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-x-auto">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4 self-start">
          Binary Search Tree Hierarchy
        </span>
        {renderNode(root.id)}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#181818] p-3 gap-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-[#2d2d2d] pb-1.5">
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase tracking-wider text-[11px]">Tree & Linked List Visualizer</span>
        </div>
      </div>

      {!hasLinkedList && !hasTree ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d] text-center text-slate-500 gap-3">
          <GitBranch className="w-8 h-8 opacity-40 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">
            No Linked List or Tree Data Structures Detected
          </span>
          <p className="text-[11px] text-slate-500 max-w-sm">
            Classes with attributes like <code className="text-cyan-400">.val</code> and{' '}
            <code className="text-cyan-400">.next</code> (Linked List) or{' '}
            <code className="text-cyan-400">.left / .right</code> (Binary Tree) will automatically render here!
          </p>
          {onLoadTemplate && (
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onLoadTemplate('linked_list')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>Load Linked List Code</span>
              </button>
              <button
                type="button"
                onClick={() => onLoadTemplate('binary_tree')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Load Binary Tree Code</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {hasLinkedList && renderLinkedListChains()}
          {hasTree && renderBinaryTree()}
        </div>
      )}
    </div>
  );
}
