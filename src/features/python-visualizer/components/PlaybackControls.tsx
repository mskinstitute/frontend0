'use client';

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Gauge
} from 'lucide-react';

interface PlaybackControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number; // in milliseconds per step (e.g. 1000 = 1x, 500 = 2x, 250 = 4x)
  onStepChange: (newIndex: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (newSpeed: number) => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function PlaybackControls({
  currentStepIndex,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onStepChange,
  onTogglePlay,
  onSpeedChange,
  onReset,
  disabled = false,
}: PlaybackControlsProps) {
  const hasSteps = totalSteps > 0;
  const isFirst = currentStepIndex <= 0;
  const isLast = currentStepIndex >= totalSteps - 1;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onStepChange(val);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2.5 sm:p-3 bg-[#1e1e1e] border-b border-[#2d2d2d] select-none text-slate-200">
      {/* Top Row: Buttons, Step indicator, Speed */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Playback Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onStepChange(0)}
            disabled={disabled || !hasSteps || isFirst}
            title="Jump to Start"
            className="p-1.5 rounded-lg bg-[#282828] hover:bg-[#333] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onStepChange(Math.max(0, currentStepIndex - 1))}
            disabled={disabled || !hasSteps || isFirst}
            title="Step Backward (Left Arrow)"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-[#3a3a3a]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            disabled={disabled || !hasSteps}
            title={isPlaying ? 'Pause Autoplay' : 'Play / Autoplay'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-secondary hover:bg-secondary/90 text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStepIndex + 1))}
            disabled={disabled || !hasSteps || isLast}
            title="Step Forward (Right Arrow)"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333] text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-[#3a3a3a]"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onStepChange(totalSteps - 1)}
            disabled={disabled || !hasSteps || isLast}
            title="Jump to End"
            className="p-1.5 rounded-lg bg-[#282828] hover:bg-[#333] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            title="Reset Visualizer"
            className="p-1.5 rounded-lg bg-[#282828] hover:bg-[#333] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer ml-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Step Count Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#151515] rounded-full border border-slate-700/80 text-xs font-mono">
            <span className="text-secondary font-bold">Step</span>
            <span className="text-white font-extrabold">{hasSteps ? currentStepIndex + 1 : 0}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalSteps}</span>
          </div>
        </div>

        {/* Right: Speed Selector */}
        <div className="flex items-center gap-1 text-xs">
          <Gauge className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Speed:</span>
          {[
            { label: '0.5x', ms: 1400 },
            { label: '1x', ms: 750 },
            { label: '2x', ms: 350 },
            { label: '4x', ms: 150 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onSpeedChange(item.ms)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                playbackSpeed === item.ms
                  ? 'bg-secondary text-white font-bold'
                  : 'bg-[#282828] text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Row: Scrubber Slider */}
      <div className="flex items-center gap-3 pt-1">
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={hasSteps ? currentStepIndex : 0}
          onChange={handleSliderChange}
          disabled={disabled || !hasSteps}
          className="w-full h-1.5 bg-[#2d2d2d] rounded-lg appearance-none cursor-pointer accent-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
