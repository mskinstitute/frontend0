'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Code2, Play, Lock, Edit3 } from 'lucide-react';
import type { editor } from 'monaco-editor';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-[#1e1e1e] flex flex-col items-center justify-center text-slate-400 gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-secondary" />
      <span className="text-xs font-mono">Loading Monaco Editor...</span>
    </div>
  ),
});

interface CodeEditorPanelProps {
  code: string;
  onChange: (value: string) => void;
  currentLine?: number;
  prevLine?: number;
  isExecuting: boolean;
  onVisualize: () => void;
  isTraced: boolean;
  isReadOnly?: boolean;
  onToggleReadOnly?: () => void;
}

export default function CodeEditorPanel({
  code,
  onChange,
  currentLine,
  prevLine,
  isExecuting,
  onVisualize,
  isTraced,
  isReadOnly = false,
  onToggleReadOnly,
}: CodeEditorPanelProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<any>(null);
  const decorationsCollectionRef = useRef<any>(null);

  // Update line highlighting whenever currentLine or prevLine changes
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editorInstance = editorRef.current;
    const monacoInstance = monacoRef.current;

    const newDecorations: editor.IModelDeltaDecoration[] = [];

    // Highlight previously executed line
    if (prevLine && prevLine > 0 && prevLine !== currentLine) {
      newDecorations.push({
        range: new monacoInstance.Range(prevLine, 1, prevLine, 1),
        options: {
          isWholeLine: true,
          className: 'msk-visualizer-prev-line',
          glyphMarginClassName: 'msk-visualizer-prev-glyph',
        },
      });
    }

    // Highlight currently executing line (glowing line with pointer)
    if (currentLine && currentLine > 0) {
      newDecorations.push({
        range: new monacoInstance.Range(currentLine, 1, currentLine, 1),
        options: {
          isWholeLine: true,
          className: 'msk-visualizer-curr-line',
          glyphMarginClassName: 'msk-visualizer-curr-glyph',
        },
      });

      // Keep active line scrolled in view
      editorInstance.revealLineInCenterIfOutsideViewport(currentLine);
    }

    // Apply decorations
    try {
      if (decorationsCollectionRef.current) {
        decorationsCollectionRef.current.set(newDecorations);
      } else if (typeof editorInstance.createDecorationsCollection === 'function') {
        decorationsCollectionRef.current = editorInstance.createDecorationsCollection(newDecorations);
      } else if (typeof (editorInstance as any).deltaDecorations === 'function') {
        (decorationsCollectionRef as any).currentIds = (editorInstance as any).deltaDecorations(
          (decorationsCollectionRef as any).currentIds || [],
          newDecorations
        );
      }
    } catch (e) {
      console.warn('Error updating visualizer editor decorations:', e);
    }
  }, [currentLine, prevLine]);

  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monacoInstance: any) => {
    editorRef.current = editorInstance;
    monacoRef.current = monacoInstance;

    editorInstance.updateOptions({
      glyphMargin: true,
      folding: true,
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace",
      renderLineHighlight: 'all',
      automaticLayout: true,
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-r border-[#2d2d2d] overflow-hidden">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">Python 3 Script</span>
          {isTraced && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ● Traced
            </span>
          )}
          {currentLine && currentLine > 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Line {currentLine}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onToggleReadOnly && (
            <button
              type="button"
              onClick={onToggleReadOnly}
              title={isReadOnly ? 'Switch to Edit Mode' : 'Lock Code Editor'}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-slate-300 hover:text-white bg-[#2e2e2e] hover:bg-[#383838] transition-colors cursor-pointer"
            >
              {isReadOnly ? (
                <>
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Locked</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">Editable</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onVisualize}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Tracing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Visualize</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 w-full h-full relative">
        <MonacoEditor
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            readOnly: isReadOnly,
            contextmenu: true,
            tabSize: 4,
            insertSpaces: true,
          }}
        />
      </div>

      <style jsx global>{`
        .msk-visualizer-curr-line {
          background: rgba(245, 158, 11, 0.22) !important;
          border-left: 3px solid #f59e0b !important;
        }
        .msk-visualizer-prev-line {
          background: rgba(16, 185, 129, 0.12) !important;
          border-left: 3px solid #10b981 !important;
        }
        .msk-visualizer-curr-glyph {
          background: #f59e0b;
          border-radius: 50%;
          transform: scale(0.6);
        }
        .msk-visualizer-prev-glyph {
          background: #10b981;
          border-radius: 50%;
          transform: scale(0.4);
        }
      `}</style>
    </div>
  );
}
