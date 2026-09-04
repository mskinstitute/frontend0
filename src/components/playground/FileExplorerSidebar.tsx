'use client';

import React, { useState } from 'react';
import { FilePlus, Trash2, X, ChevronDown, FileCode, Check } from 'lucide-react';
import { PlaygroundFile, SupportedLanguage } from './types';
import toast from 'react-hot-toast';

interface FileExplorerSidebarProps {
  files: PlaygroundFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (fileName: string, language: SupportedLanguage) => void;
  onDeleteFile: (fileId: string) => void;
  onClose: () => void;
}

export function detectLanguageFromExtension(fileName: string): SupportedLanguage {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'py':
      return 'python';
    case 'html':
    case 'htm':
      return 'html';
    case 'js':
    case 'jsx':
    case 'mjs':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'cpp':
    case 'cc':
    case 'cxx':
      return 'cpp';
    case 'c':
    case 'h':
      return 'c';
    case 'java':
      return 'java';
    default:
      return 'python';
  }
}

export function getFileIcon(lang: SupportedLanguage): string {
  switch (lang) {
    case 'python':
      return '🐍';
    case 'html':
      return '🌐';
    case 'javascript':
      return '⚡';
    case 'typescript':
      return '🔷';
    case 'css':
      return '🎨';
    case 'cpp':
      return '⚙️';
    case 'c':
      return '🔧';
    case 'java':
      return '☕';
    default:
      return '📄';
  }
}

export default function FileExplorerSidebar({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onClose,
}: FileExplorerSidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleConfirmCreate = () => {
    const trimmed = newFileName.trim();
    if (!trimmed) {
      setIsCreating(false);
      return;
    }

    if (files.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error('A file with that name already exists');
      return;
    }

    const lang = detectLanguageFromExtension(trimmed);
    onCreateFile(trimmed, lang);
    setNewFileName('');
    setIsCreating(false);
    toast.success(`Created ${trimmed}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirmCreate();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewFileName('');
    }
  };

  return (
    <div className="w-52 sm:w-56 bg-[#252526] border-r border-[#1e1e1e] flex flex-col select-none text-xs text-slate-300 z-10">
      {/* Explorer Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1e1e1e] text-[11px] font-bold tracking-wider text-slate-400 uppercase">
        <span className="flex items-center gap-1">
          <ChevronDown className="w-3.5 h-3.5" />
          <span>Explorer</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="p-1 hover:text-white hover:bg-[#333] rounded transition-colors"
            title="New File"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:text-white hover:bg-[#333] rounded transition-colors sm:hidden"
            title="Close Explorer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto py-1">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          WORKSPACE FILES
        </div>

        {files.map((file) => {
          const isActive = file.id === activeFileId;
          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`group flex items-center justify-between px-3 py-1.5 cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#37373d] text-white font-semibold'
                  : 'text-slate-300 hover:bg-[#2a2d2e] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 truncate flex-1 mr-1">
                <span className="text-xs select-none">{getFileIcon(file.language)}</span>
                <span className="truncate font-mono text-[11px]">{file.name}</span>
              </div>

              {file.isRemovable && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(file.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-400 rounded transition-opacity"
                  title={`Delete ${file.name}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Inline Create Input */}
        {isCreating && (
          <div className="px-3 py-1 flex items-center gap-1">
            <span className="text-xs">📄</span>
            <input
              type="text"
              autoFocus
              value={newFileName}
              placeholder="filename.py"
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleConfirmCreate}
              className="flex-1 bg-[#1e1e1e] border border-secondary text-white text-[11px] font-mono px-1.5 py-0.5 rounded focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 border-t border-[#1e1e1e] text-[10px] text-slate-500">
        <span>{files.length} {files.length === 1 ? 'file' : 'files'}</span>
      </div>
    </div>
  );
}
