'use client';

import React from 'react';
import {
  ActiveVisualizationTab,
  VisualizerStep,
} from '../types';
import { VISUALIZER_TEMPLATES, VisualizerTemplate } from '../templates';
import {
  Layers,
  GitBranch,
  Grid,
  Network,
  Terminal,
  BookOpen,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface VisualizerHeaderProps {
  activeTab: ActiveVisualizationTab;
  onTabChange: (tab: ActiveVisualizationTab) => void;
  selectedTemplateId: string;
  onSelectTemplate: (template: VisualizerTemplate) => void;
  currentStep?: VisualizerStep;
  totalSteps: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  isEmbedded?: boolean;
}

export default function VisualizerHeader({
  activeTab,
  onTabChange,
  selectedTemplateId,
  onSelectTemplate,
  currentStep,
  totalSteps,
  isFullscreen = false,
  onToggleFullscreen,
  isEmbedded = false,
}: VisualizerHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between px-3 py-2 bg-[#1b1b1b] border-b border-[#2d2d2d] gap-2 select-none">
      {/* Left: Branding & Template Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-secondary/20 border border-secondary/40 flex items-center justify-center text-sm shadow-xs">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Python Code Visualizer
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                Pyodide 3.12
              </span>
            </div>
          </div>
        </div>

        {/* Templates Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#252525] px-2 py-1 rounded-lg border border-[#383838]">
          <BookOpen className="w-3.5 h-3.5 text-secondary" />
          <select
            value={selectedTemplateId}
            onChange={(e) => {
              const tmpl = VISUALIZER_TEMPLATES.find((t) => t.id === e.target.value);
              if (tmpl) onSelectTemplate(tmpl);
            }}
            className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer max-w-[130px] sm:max-w-[200px] truncate"
          >
            <option value="" disabled className="bg-[#252525]">
              Select Example Code...
            </option>
            {VISUALIZER_TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id} className="bg-[#202020] text-slate-200">
                {tmpl.title} ({tmpl.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: View Mode Tabs */}
      <div className="flex items-center bg-[#141414] p-1 rounded-xl border border-[#2d2d2d] overflow-x-auto gap-0.5">
        <button
          type="button"
          onClick={() => onTabChange('memory')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'memory'
              ? 'bg-secondary text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Memory & Stack</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('tree_graph')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'tree_graph'
              ? 'bg-secondary text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Tree & Linked List</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('matrix')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'matrix'
              ? 'bg-secondary text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>2D Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('recursion')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'recursion'
              ? 'bg-secondary text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Recursion Tree</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('console')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'console'
              ? 'bg-secondary text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Console</span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {isEmbedded && (
          <Link
            href="/tools/python-visualizer"
            target="_blank"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#252525] hover:bg-[#303030] border border-[#383838] text-slate-300 hover:text-white text-xs rounded-lg transition-colors"
            title="Open Dedicated Fullscreen Tool"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Standalone</span>
          </Link>
        )}

        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
            className="p-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    </header>
  );
}
