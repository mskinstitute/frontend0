'use client';

import React from 'react';
import { Files, Search, Keyboard, Settings } from 'lucide-react';
import { SidebarView } from './types';

interface ActivityBarProps {
  activeView: SidebarView;
  onToggleView: (view: SidebarView) => void;
  onOpenShortcuts: () => void;
  onOpenSettings: () => void;
}

export default function ActivityBar({
  activeView,
  onToggleView,
  onOpenShortcuts,
  onOpenSettings,
}: ActivityBarProps) {
  return (
    <div className="hidden sm:flex flex-col justify-between w-11 bg-[#181818] border-r border-[#2b2b2b] select-none z-10 py-1">
      {/* Top Section: Explorer & Search */}
      <div className="flex flex-col items-center gap-1">
        {/* Explorer Button */}
        <button
          type="button"
          onClick={() => onToggleView(activeView === 'explorer' ? null : 'explorer')}
          className={`w-11 h-11 flex items-center justify-center transition-colors cursor-pointer relative ${
            activeView === 'explorer'
              ? 'text-white border-l-2 border-white bg-[#252526]'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Explorer (Ctrl + Shift + E)"
        >
          <Files className="w-5 h-5" />
        </button>

        {/* Search Button */}
        <button
          type="button"
          onClick={() => onToggleView(activeView === 'search' ? null : 'search')}
          className={`w-11 h-11 flex items-center justify-center transition-colors cursor-pointer relative ${
            activeView === 'search'
              ? 'text-white border-l-2 border-white bg-[#252526]'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Search in Files (Ctrl + Shift + F)"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Section: Shortcuts & Settings */}
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={onOpenShortcuts}
          className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Keyboard Shortcuts"
        >
          <Keyboard className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Settings (Preferences)"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
