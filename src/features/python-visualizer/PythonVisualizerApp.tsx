'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  VisualizerStep,
  ActiveVisualizationTab,
} from './types';
import { VISUALIZER_TEMPLATES, VisualizerTemplate } from './templates';
import { getPyodideInstance } from './pyodideLoader';
import { PYTHON_TRACER_CODE } from './tracerScript';
import VisualizerHeader from './components/VisualizerHeader';
import PlaybackControls from './components/PlaybackControls';
import CodeEditorPanel from './components/CodeEditorPanel';
import CallStackPanel from './components/CallStackPanel';
import HeapGraphPanel from './components/HeapGraphPanel';
import TreeVisualizer from './components/TreeVisualizer';
import MatrixVisualizer from './components/MatrixVisualizer';
import RecursionTreeVisualizer from './components/RecursionTreeVisualizer';
import ConsoleOutputPanel from './components/ConsoleOutputPanel';
import { Loader2, AlertTriangle, Sparkles } from 'lucide-react';

interface PythonVisualizerAppProps {
  initialCode?: string;
  isEmbedded?: boolean;
}

export default function PythonVisualizerApp({
  initialCode,
  isEmbedded = false,
}: PythonVisualizerAppProps) {
  // Main State
  const defaultTemplate = VISUALIZER_TEMPLATES[0];
  const [code, setCode] = useState<string>(initialCode || defaultTemplate.code);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    initialCode ? '' : defaultTemplate.id
  );
  const [steps, setSteps] = useState<VisualizerStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(750);
  const [activeTab, setActiveTab] = useState<ActiveVisualizationTab>('memory');
  const [highlightedHeapId, setHighlightedHeapId] = useState<string | null>(null);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to visualize');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isEditorReadOnly, setIsEditorReadOnly] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active step
  const currentStep = steps[currentStepIndex];
  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : undefined;

  // Run Visualizer Trace
  const handleVisualizeCode = useCallback(
    async (codeToRun: string = code) => {
      if (!codeToRun.trim()) return;

      setIsExecuting(true);
      setErrorMessage(null);
      setIsPlaying(false);
      setStatusMessage('Initializing Python 3.12 WebAssembly runtime...');

      try {
        const pyodide = await getPyodideInstance((msg) => setStatusMessage(msg));

        setStatusMessage('Tracing execution steps and heap references...');
        // 1. Inject Tracer Helper in Pyodide
        await pyodide.runPythonAsync(PYTHON_TRACER_CODE);

        // 2. Escape code string safely into Python
        const escapedCode = JSON.stringify(codeToRun);
        const traceJsonResult = await pyodide.runPythonAsync(
          `_msk_run_visualizer(${escapedCode})`
        );

        const parsedResult = JSON.parse(traceJsonResult);
        const traceSteps: VisualizerStep[] = parsedResult.steps || [];

        if (traceSteps.length === 0) {
          throw new Error('No execution steps were captured.');
        }

        setSteps(traceSteps);
        setCurrentStepIndex(0);
        setIsExecuting(false);
        setStatusMessage(`Captured ${traceSteps.length} execution steps.`);

        // Auto-detect optimal tab based on captured objects across all steps
        const hasMatrix = traceSteps.some((s) => Object.values(s.heap).some((o) => o.is2DMatrix));
        const hasTreeOrList = traceSteps.some((s) =>
          Object.values(s.heap).some((o) => o.isLinkedListNode || o.isTreeNode)
        );
        const hasRecursion = traceSteps.some((s) => (s.recursionTree?.length || 0) > 1);

        if (hasMatrix) {
          setActiveTab('matrix');
        } else if (hasTreeOrList) {
          setActiveTab('tree_graph');
        } else if (hasRecursion) {
          setActiveTab('recursion');
        }
      } catch (err: any) {
        console.error('Python visualizer execution error:', err);
        setErrorMessage(err?.message || String(err));
        setIsExecuting(false);
        setStatusMessage('Execution halted due to an error.');
      }
    },
    [code]
  );

  // Auto-run on mount once
  useEffect(() => {
    handleVisualizeCode(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle template selection
  const handleSelectTemplate = (template: VisualizerTemplate) => {
    setSelectedTemplateId(template.id);
    setCode(template.code);
    setActiveTab(template.recommendedTab);
    handleVisualizeCode(template.code);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in a textarea or input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentStepIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length]);

  // Autoplay Timer
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col w-full h-full bg-[#181818] border border-[#2d2d2d] rounded-2xl overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[620px]'
      }`}
    >
      {/* Top Header */}
      <VisualizerHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={handleSelectTemplate}
        currentStep={currentStep}
        totalSteps={steps.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isEmbedded={isEmbedded}
      />

      {/* Playback Scrubber and Controls */}
      <PlaybackControls
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        onStepChange={setCurrentStepIndex}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setPlaybackSpeed}
        onReset={() => {
          setIsPlaying(false);
          setCurrentStepIndex(0);
        }}
        disabled={isExecuting || steps.length === 0}
      />

      {/* Status or Error Banner */}
      {errorMessage && (
        <div className="flex items-center justify-between px-4 py-2 bg-rose-950/70 border-b border-rose-900 text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-xs text-rose-400 hover:text-white underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Column: Monaco Code Editor */}
        <div className="w-full lg:w-[46%] h-[320px] lg:h-full flex flex-col">
          <CodeEditorPanel
            code={code}
            onChange={(val) => {
              setCode(val);
              setSelectedTemplateId('');
            }}
            currentLine={currentStep?.line}
            prevLine={prevStep?.line}
            isExecuting={isExecuting}
            onVisualize={() => handleVisualizeCode(code)}
            isTraced={steps.length > 0}
            isReadOnly={isEditorReadOnly}
            onToggleReadOnly={() => setIsEditorReadOnly(!isEditorReadOnly)}
          />
        </div>

        {/* Right Column: Visualization Panels */}
        <div className="w-full lg:w-[54%] h-full flex flex-col overflow-hidden bg-[#181818]">
          {isExecuting ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-secondary" />
              <span className="text-xs font-mono tracking-wider">{statusMessage}</span>
            </div>
          ) : (
            <div className="flex-1 overflow-hidden">
              {activeTab === 'memory' && (
                <div className="grid grid-cols-1 md:grid-cols-2 h-full divide-y md:divide-y-0 md:divide-x divide-[#2d2d2d] overflow-hidden">
                  {/* Left sub-pane: Call Stack & Scope */}
                  <div className="h-full overflow-hidden">
                    <CallStackPanel
                      callStack={currentStep?.callStack || []}
                      globals={currentStep?.globals || {}}
                      changedVarName={currentStep?.changedVarName}
                      onSelectHeapObject={(id) => {
                        setHighlightedHeapId(id);
                        const el = document.getElementById(`heap-${id}`);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>

                  {/* Right sub-pane: Object Heap Memory */}
                  <div className="h-full overflow-hidden">
                    <HeapGraphPanel
                      heap={currentStep?.heap || {}}
                      highlightedHeapId={highlightedHeapId}
                      onSelectHeapObject={setHighlightedHeapId}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'tree_graph' && (
                <TreeVisualizer
                  heap={currentStep?.heap || {}}
                  callStack={currentStep?.callStack || []}
                  globals={currentStep?.globals || {}}
                  onLoadTemplate={(tmplId) => {
                    const tmpl = VISUALIZER_TEMPLATES.find((t) => t.id === tmplId);
                    if (tmpl) handleSelectTemplate(tmpl);
                  }}
                />
              )}

              {activeTab === 'matrix' && (
                <MatrixVisualizer
                  heap={currentStep?.heap || {}}
                  callStack={currentStep?.callStack || []}
                  onLoadTemplate={(tmplId) => {
                    const tmpl = VISUALIZER_TEMPLATES.find((t) => t.id === tmplId);
                    if (tmpl) handleSelectTemplate(tmpl);
                  }}
                />
              )}

              {activeTab === 'recursion' && (
                <RecursionTreeVisualizer
                  recursionTree={currentStep?.recursionTree}
                  onLoadTemplate={(tmplId) => {
                    const tmpl = VISUALIZER_TEMPLATES.find((t) => t.id === tmplId);
                    if (tmpl) handleSelectTemplate(tmpl);
                  }}
                />
              )}

              {activeTab === 'console' && (
                <ConsoleOutputPanel
                  stdout={currentStep?.stdout || ''}
                  explanation={currentStep?.explanation}
                  error={currentStep?.error}
                  currentStepIndex={currentStepIndex}
                />
              )}
            </div>
          )}

          {/* Bottom Micro-Bar: Step Explanation Summary */}
          {currentStep?.explanation && activeTab !== 'console' && (
            <div className="px-3 py-1.5 bg-[#141414] border-t border-[#2d2d2d] flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2 overflow-hidden">
                <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate font-mono text-[11px] text-slate-300">
                  {currentStep.explanation}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('console')}
                className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer shrink-0 ml-2"
              >
                View Console
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
