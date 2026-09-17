'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  GraduationCap,
  Sparkles,
  Code2,
  Clock,
  Type,
  FileEdit,
  Volume2,
  VolumeX,
  Keyboard as KeyboardIcon,
  Hand,
  RotateCcw,
  Maximize2,
  Minimize2,
  CheckCircle,
  Eye,
  BarChart3,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Sliders,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

import {
  PracticeMode,
  AcademyStage,
  CodeLanguage,
  TimedDuration,
  SoundEffectType,
  TestResult,
} from '../types';

import { ACADEMY_LESSONS } from '../data/lessons';
import { CODE_SNIPPETS } from '../data/codeSnippets';
import { getRandomWords, getRandomQuote } from '../data/wordLists';
import { tokenizeCode } from '../utils/codeHighlighter';
import { useTypingAudio } from '../hooks/useTypingAudio';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useTypingStorage } from '../hooks/useTypingStorage';
import { useGamification } from '../hooks/useGamification';
import { generateWeakKeyDrill } from '../utils/weakKeyDrill';
import { KeyHealthStat } from '../types';

import VirtualKeyboard from './VirtualKeyboard';
import FingerGuide from './FingerGuide';
import LiveStatsBar from './LiveStatsBar';
import ResultsModal from './ResultsModal';
import CustomTextModal from './CustomTextModal';
import TypeQuestSidebar from './TypeQuestSidebar';
import GamificationHUD from './GamificationHUD';
import AchievementsModal from './AchievementsModal';
import TypingCertificateModal from './TypingCertificateModal';
import ClassroomRaceArena from './ClassroomRaceArena';

export interface CodeLineStructure {
  lineNum: number;
  tokens: {
    char: string;
    globalIndex: number;
    color: string;
  }[];
}

export default function TypeQuestApp() {
  // Persistence and settings
  const {
    stats,
    preferences,
    isLoaded,
    updatePreferences,
    recordTestResult,
  } = useTypingStorage();

  // Gamification & Badges
  const {
    gamification,
    newlyUnlockedBadges,
    clearUnlockedNotice,
    processTestCompletion,
    setStudentName,
    setStudentProfile,
  } = useGamification();

  // Primary mode states
  const [mode, setMode] = useState<PracticeMode>('code');
  const [stage, setStage] = useState<AcademyStage>('stage-1-anchors-fj');
  const [codeLang, setCodeLang] = useState<CodeLanguage>('python');
  const [codeLevel, setCodeLevel] = useState<number>(1);
  const [timedDuration, setTimedDuration] = useState<TimedDuration>(60);
  const [customText, setCustomText] = useState<string>('');
  const [weakDrillText, setWeakDrillText] = useState<string>('');

  // Layout states: Sidebar & Focus Mode
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showLiveStats, setShowLiveStats] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('large');

  // UI Modals
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  // DOM Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingBoxRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Sound Engine
  const { playClick, playError, playCompleteChime } = useTypingAudio(
    preferences.soundType,
    preferences.soundVolume
  );

  // Automatically close sidebar on small screens on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Filter snippets for current language
  const currentLangSnippets = useMemo(() => {
    return CODE_SNIPPETS.filter((s) => s.language === codeLang);
  }, [codeLang]);

  // Current active snippet based on selected level
  const activeSnippet = useMemo(() => {
    const found = currentLangSnippets.find((s) => s.levelNumber === codeLevel);
    return found || currentLangSnippets[0] || CODE_SNIPPETS[0];
  }, [currentLangSnippets, codeLevel]);

  // Compute active target text based on mode and selections
  const { targetText, modeLabel } = useMemo(() => {
    if (mode === 'academy') {
      const lesson = ACADEMY_LESSONS.find((l) => l.id === stage) || ACADEMY_LESSONS[0];
      return { targetText: lesson.text, modeLabel: `Academy: ${lesson.title}` };
    }
    if (mode === 'code') {
      return {
        targetText: activeSnippet.code,
        modeLabel: `${codeLang.toUpperCase()} L${codeLevel}: ${activeSnippet.title.replace(/^Level \d+:\s*/, '')}`,
      };
    }
    if (mode === 'race') {
      return {
        targetText:
          'Accelerate your fingers across the keyboard with velocity and precision. In the digital grand prix of typing, every clean keystroke boosts your engine and propels you toward victory. Stay calm, maintain rhythm, and dominate the classroom track!',
        modeLabel: 'Classroom Battle Race',
      };
    }
    if (mode === 'weak-keys') {
      return {
        targetText:
          weakDrillText || 'practice target keys with focused repetitive drills and bigram patterns',
        modeLabel: 'Weak-Key Targeted Drill',
      };
    }
    if (mode === 'words') {
      return { targetText: getRandomWords(35), modeLabel: 'Top Common Words' };
    }
    if (mode === 'sentences') {
      return { targetText: getRandomQuote(), modeLabel: 'Inspirational Passage' };
    }
    if (mode === 'timed') {
      return { targetText: getRandomWords(90), modeLabel: `${timedDuration}s Speed Challenge` };
    }
    if (mode === 'custom') {
      return {
        targetText: customText || 'Type your custom practice text here by opening the Custom Editor modal.',
        modeLabel: 'Custom Text Practice',
      };
    }
    return { targetText: ACADEMY_LESSONS[0].text, modeLabel: 'Touch Typing Practice' };
  }, [mode, stage, activeSnippet, codeLang, codeLevel, timedDuration, customText, weakDrillText]);

  // Structured row-by-row lines for Code Mode
  const structuredCodeLines = useMemo<CodeLineStructure[]>(() => {
    if (mode !== 'code') return [];

    const tokens = tokenizeCode(targetText, codeLang);
    const lines: CodeLineStructure[] = [];
    let currentLineTokens: CodeLineStructure['tokens'] = [];
    let lineNum = 1;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.char === '\n') {
        currentLineTokens.push({
          char: '\n',
          globalIndex: i,
          color: '#475569',
        });
        lines.push({
          lineNum,
          tokens: currentLineTokens,
        });
        currentLineTokens = [];
        lineNum++;
      } else {
        currentLineTokens.push({
          char: token.char,
          globalIndex: i,
          color: token.color,
        });
      }
    }

    if (currentLineTokens.length > 0) {
      lines.push({
        lineNum,
        tokens: currentLineTokens,
      });
    }

    return lines;
  }, [mode, targetText, codeLang]);

  // Test complete callback
  const handleTestComplete = useCallback(
    (result: TestResult) => {
      playCompleteChime();
      setLastResult(result);

      let nextLessonId: string | undefined = undefined;
      if (mode === 'academy') {
        const currentIndex = ACADEMY_LESSONS.findIndex((l) => l.id === stage);
        if (currentIndex !== -1 && currentIndex < ACADEMY_LESSONS.length - 1) {
          nextLessonId = ACADEMY_LESSONS[currentIndex + 1].id;
        }
      }

      recordTestResult(result, nextLessonId);
      processTestCompletion(result, stats);
    },
    [playCompleteChime, mode, stage, recordTestResult, processTestCompletion, stats]
  );

  // Practice Weak Keys callback
  const handlePracticeWeakKeys = useCallback(
    (weakKeys: { key: string }[]) => {
      const generatedDrill = generateWeakKeyDrill(weakKeys);
      setWeakDrillText(generatedDrill.text);
      setMode('weak-keys');
      setLastResult(null);
    },
    []
  );

  // Initialize Typing Engine
  const {
    userInput,
    isActive,
    isCompleted,
    activeKey,
    nextChar,
    currentIndex,
    elapsedSeconds,
    timeLeft,
    totalKeystrokes,
    correctKeystrokes,
    errorKeystrokes,
    liveWpm,
    liveAccuracy,
    keyStats,
    handleKeyInput,
    resetEngine,
  } = useTypingEngine({
    targetText,
    mode,
    modeLabel,
    timedDuration,
    strictMode: preferences.strictMode,
    onPlayClick: (isSpecial) => playClick(isSpecial),
    onPlayError: () => playError(),
    onComplete: handleTestComplete,
  });

  // Check if any modal is currently active
  const isAnyModalOpen = isCertificateOpen || isCustomModalOpen || isAchievementsOpen || !!lastResult;

  // Re-focus hidden input on container click (only when no modal is open)
  const focusInput = useCallback((e?: React.MouseEvent) => {
    if (isAnyModalOpen) {
      return;
    }
    if (e && e.target instanceof HTMLElement) {
      if (e.target.closest('input, textarea, button, select, [role="dialog"], a, .modal-interactive')) {
        return;
      }
    }
    inputRef.current?.focus();
    setIsFocused(true);
  }, [isAnyModalOpen]);

  // Blur and disable hidden input whenever any modal opens
  useEffect(() => {
    if (isAnyModalOpen) {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  }, [isAnyModalOpen]);

  // Reset when text changes
  useEffect(() => {
    resetEngine();
    if (!isAnyModalOpen) {
      focusInput();
    }
    if (typingBoxRef.current) {
      typingBoxRef.current.scrollTop = 0;
    }
  }, [targetText, resetEngine, isAnyModalOpen, focusInput]);

  // Auto-scroll: Keeps active character vertically centered without visible scrollbars
  useEffect(() => {
    if (activeCharRef.current && typingBoxRef.current) {
      const container = typingBoxRef.current;
      const activeEl = activeCharRef.current;

      const containerHeight = container.clientHeight;
      const activeTop = activeEl.offsetTop;
      const activeHeight = activeEl.offsetHeight;

      const targetScrollTop = activeTop - containerHeight / 2 + activeHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  // Global keyboard shortcuts
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isAnyModalOpen) {
      return;
    }

    if (e.key === 'Escape') {
      if (isFocusMode) {
        setIsFocusMode(false);
        return;
      }
      resetEngine();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (mode === 'code') {
        handleKeyInput('Tab', e.ctrlKey, e.altKey);
      } else {
        resetEngine();
      }
      return;
    }

    handleKeyInput(e.key, e.ctrlKey, e.altKey);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Advance to next lesson/level
  const handleNextItem = () => {
    if (mode === 'academy') {
      const idx = ACADEMY_LESSONS.findIndex((l) => l.id === stage);
      if (idx < ACADEMY_LESSONS.length - 1) {
        setStage(ACADEMY_LESSONS[idx + 1].id);
        setLastResult(null);
        resetEngine();
      }
    } else if (mode === 'code') {
      if (codeLevel < 6) {
        setCodeLevel(codeLevel + 1);
        setLastResult(null);
        resetEngine();
      }
    }
  };

  const progressPercent = Math.round((currentIndex / Math.max(targetText.length, 1)) * 100);

  // Dynamic font sizing classes
  const fontClass =
    fontSize === 'xl'
      ? 'text-xl sm:text-2xl md:text-3xl leading-loose'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl md:text-2xl leading-relaxed'
      : 'text-base sm:text-lg md:text-xl leading-normal';

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (!isAnyModalOpen) {
          focusInput(e);
        }
      }}
      className={`relative w-full bg-slate-950 text-slate-100 flex flex-col rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : 'min-h-[720px]'
      }`}
    >
      {/* Gamification Top Banner HUD */}
      {!isFocusMode && (
        <GamificationHUD
          gamification={gamification}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />
      )}

      {/* Main Workspace Row */}
      <div className="flex-1 flex overflow-hidden">
        {/* Hidden input to capture physical keyboard & mobile inputs */}
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none -top-96"
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (!isAnyModalOpen) {
              setIsFocused(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          disabled={isAnyModalOpen}
          autoFocus={!isAnyModalOpen}
        />

        {/* Collapsible Left Sidebar (Hidden in Focus Mode) */}
        {!isFocusMode && (
          <TypeQuestSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            mode={mode}
            onSelectMode={(m) => {
              setMode(m);
              resetEngine();
            }}
            stage={stage}
            onSelectStage={(s) => {
              setStage(s);
              resetEngine();
            }}
            codeLang={codeLang}
            onSelectCodeLang={(l) => {
              setCodeLang(l);
              setCodeLevel(1);
              resetEngine();
            }}
            codeLevel={codeLevel}
            onSelectCodeLevel={(lvl) => {
              setCodeLevel(lvl);
              resetEngine();
            }}
            timedDuration={timedDuration}
            onSelectTimedDuration={(dur) => {
              setTimedDuration(dur);
              resetEngine();
            }}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
            stats={stats}
            soundType={preferences.soundType}
            onUpdateSoundType={(type) => updatePreferences({ soundType: type })}
            soundVolume={preferences.soundVolume}
            onUpdateSoundVolume={(vol) => updatePreferences({ soundVolume: vol })}
            strictMode={preferences.strictMode}
            onToggleStrictMode={() => updatePreferences({ strictMode: !preferences.strictMode })}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* Main Center Typing Workspace */}
        <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 md:p-6 min-w-0 transition-all duration-300 overflow-y-auto">
        {/* Workspace Top Navigation Bar */}
        {!isFocusMode ? (
          <div className="flex flex-col gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center justify-between gap-2">
              {/* Left Group: Sidebar Toggle & Active Level Title */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Sidebar Open/Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                    isSidebarOpen
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-secondary/15 border-secondary/40 text-secondary font-bold hover:bg-secondary/25 shadow-sm'
                  }`}
                  title={isSidebarOpen ? 'Hide Sidebar (Focus View)' : 'Open Curriculum & Menu'}
                >
                  {isSidebarOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <>
                      <PanelLeftOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Menu</span>
                    </>
                  )}
                </button>

                {/* Active Mode / Level Badge */}
                <div className="flex items-center gap-2 truncate">
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {modeLabel}
                  </span>
                  {mode === 'code' && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase hidden sm:inline-block ${
                        activeSnippet.difficulty === 'Beginner'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : activeSnippet.difficulty === 'Intermediate'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                      }`}
                    >
                      {activeSnippet.difficulty}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Group: Action Controls (Responsive Icons for Mobile) */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                {/* Font Size Selector */}
                <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
                  {(['normal', 'large', 'xl'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFontSize(sz);
                      }}
                      className={`px-2 py-1 rounded-md transition-colors cursor-pointer capitalize ${
                        fontSize === sz ? 'bg-secondary text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>

                {/* Focus Mode (Zen Mode) Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFocusMode(true);
                    focusInput();
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-secondary/15 border border-secondary/30 hover:bg-secondary/25 text-xs font-mono text-secondary flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  title="Activate Full Focus Mode"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="font-bold hidden md:inline">Focus Mode</span>
                </button>

                {/* Live Stats Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLiveStats(!showLiveStats);
                  }}
                  className={`p-2 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                    showLiveStats
                      ? 'bg-slate-900 border-slate-800 text-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                  title={showLiveStats ? 'Live Stats: ON (Click to hide while typing)' : 'Live Stats: OFF (Showing after completion only)'}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>

                {/* Sound Style Selector */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const types: SoundEffectType[] = ['mechanical', 'typewriter', 'bubble', 'off'];
                    const next = types[(types.indexOf(preferences.soundType) + 1) % types.length];
                    updatePreferences({ soundType: next });
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                  title={`Audio Theme: ${preferences.soundType}`}
                >
                  {preferences.soundType === 'off' ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  )}
                </button>

                {/* Keyboard Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updatePreferences({ showKeyboard: !preferences.showKeyboard });
                  }}
                  className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                    preferences.showKeyboard
                      ? 'bg-secondary/15 border-secondary/30 text-secondary'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle On-Screen Keyboard"
                >
                  <KeyboardIcon className="w-4 h-4" />
                </button>

                {/* Finger Guide Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updatePreferences({ showHands: !preferences.showHands });
                  }}
                  className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                    preferences.showHands
                      ? 'bg-secondary/15 border-secondary/30 text-secondary'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Finger Hands Guide"
                >
                  <Hand className="w-4 h-4" />
                </button>

                {/* Restart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetEngine();
                    focusInput();
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                  title="Restart Test (Esc)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Level Pill Bar (When in Code Mode) */}
            {mode === 'code' && (
              <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline mr-1">Levels:</span>
                  {[1, 2, 3, 4, 5, 6].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setCodeLevel(lvl);
                        resetEngine();
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        codeLevel === lvl
                          ? 'bg-secondary text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      L{lvl}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 font-mono truncate hidden md:inline">
                  {codeLang.toUpperCase()}: {activeSnippet.description}
                </div>
              </div>
            )}

            {/* Live Stats HUD Bar */}
            {showLiveStats ? (
              <LiveStatsBar
                wpm={liveWpm}
                accuracy={liveAccuracy}
                elapsedSeconds={elapsedSeconds}
                timeLeft={timeLeft}
                errorCount={errorKeystrokes}
                mode={mode}
                progressPercent={progressPercent}
              />
            ) : (
              <div className="w-full bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Focused Typing Session • Live stats hidden for maximum concentration</span>
                </div>
                <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Focus Mode Top Minimalist Bar */
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-900 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">
                Focus Mode (Zen Typing)
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">• {modeLabel}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">{progressPercent}% done</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFocusMode(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Focus (Esc)</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Typing Arena Container */}
        <div className="relative my-auto py-4 flex flex-col justify-center">
          {/* Classroom Battle Track Arena if in Race Mode */}
          {mode === 'race' && (
            <ClassroomRaceArena
              userProgress={progressPercent}
              userWpm={liveWpm}
              isActive={isActive}
              isCompleted={isCompleted}
            />
          )}

          {/* Click to Focus Overlay */}
          {!isFocused && (
            <div
              onClick={focusInput}
              className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-[2px] rounded-2xl flex items-center justify-center cursor-pointer border border-secondary/30 transition-opacity"
            >
              <div className="bg-slate-900 px-5 py-2.5 rounded-xl border border-secondary/40 shadow-xl flex items-center gap-2 text-sm text-secondary font-semibold animate-pulse">
                <KeyboardIcon className="w-4 h-4" /> Click anywhere to focus and type
              </div>
            </div>
          )}

          {/* Typing Display Box with hidden scrollbars and smooth auto-scrolling */}
          <div
            ref={typingBoxRef}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className={`relative bg-slate-900/95 rounded-2xl border ${
              isFocused ? 'border-slate-700 shadow-2xl' : 'border-slate-800'
            } font-mono overflow-hidden overflow-y-auto select-none transition-all duration-200 no-scrollbar [&::-webkit-scrollbar]:hidden ${
              isFocusMode
                ? 'p-6 sm:p-10 min-h-[480px] sm:min-h-[560px] max-h-[600px]'
                : 'p-4 sm:p-6 max-h-[380px] min-h-[260px]'
            }`}
          >
            {/* CODE MODE: Row-by-Row Line Formatting with Line Numbers */}
            {mode === 'code' ? (
              <div className="flex flex-col gap-1 w-full font-mono">
                {structuredCodeLines.map((line) => {
                  const isLineActive = line.tokens.some((t) => t.globalIndex === currentIndex);

                  return (
                    <div
                      key={line.lineNum}
                      className={`flex items-start rounded-lg transition-colors duration-100 ${
                        isLineActive ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
                      }`}
                    >
                      {/* Line Number Gutter */}
                      <div className="w-8 sm:w-10 flex-shrink-0 text-right pr-3 sm:pr-4 select-none text-slate-600 font-mono text-xs sm:text-sm pt-0.5 border-r border-slate-800/70">
                        {line.lineNum}
                      </div>

                      {/* Formatted Code Tokens */}
                      <div className={`flex-1 pl-3 sm:pl-4 whitespace-pre font-mono tracking-wider ${fontClass}`}>
                        {line.tokens.map((token) => {
                          const isTyped = token.globalIndex < userInput.length;
                          const isCurrent = token.globalIndex === currentIndex;
                          const userChar = userInput[token.globalIndex];
                          const isCorrect = isTyped && userChar === token.char;
                          const isIncorrect = isTyped && userChar !== token.char;

                          let textColor = token.color;
                          let bgColor = 'transparent';
                          let opacity = 'opacity-75';

                          if (isCorrect) {
                            textColor = '#4ade80'; // Bright Emerald Green
                            opacity = 'opacity-100 font-bold';
                          } else if (isIncorrect) {
                            textColor = '#f87171'; // Rose Red
                            bgColor = 'rgba(239, 68, 68, 0.3)';
                            opacity = 'opacity-100 underline decoration-rose-500 font-bold';
                          } else if (isCurrent) {
                            textColor = '#ffffff';
                            opacity = 'opacity-100 font-extrabold';
                          }

                          return (
                            <span
                              key={token.globalIndex}
                              ref={isCurrent ? activeCharRef : undefined}
                              className={`relative inline-block transition-colors ${opacity}`}
                              style={{ color: textColor, backgroundColor: bgColor }}
                            >
                              {/* Visual Blinking Cursor Caret */}
                              {isCurrent && (
                                <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 sm:w-1 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_#ff6b00]" />
                              )}

                              {token.char === ' ' ? (
                                <span className="text-slate-700"> </span>
                              ) : token.char === '\n' ? (
                                <span className="text-slate-600 text-xs inline-block font-sans select-none opacity-50">
                                  ↵
                                </span>
                              ) : (
                                token.char
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* STANDARD TEXT / WORDS / PASSAGES STREAM */
              <div className={`whitespace-pre-wrap tracking-wider ${fontClass}`}>
                {targetText.split('').map((char, index) => {
                  const isTyped = index < userInput.length;
                  const isCurrent = index === userInput.length;
                  const userChar = userInput[index];
                  const isCorrect = isTyped && userChar === char;
                  const isIncorrect = isTyped && userChar !== char;

                  let charColor = 'text-slate-500';
                  let bgColor = 'transparent';

                  if (isCorrect) {
                    charColor = 'text-emerald-400 font-semibold';
                  } else if (isIncorrect) {
                    charColor = 'text-rose-400 underline decoration-rose-500 decoration-2 font-bold';
                    bgColor = 'bg-rose-500/20';
                  } else if (isCurrent) {
                    charColor = 'text-white font-extrabold';
                  }

                  return (
                    <span
                      key={index}
                      ref={isCurrent ? activeCharRef : undefined}
                      className={`relative inline-block rounded transition-colors ${charColor}`}
                      style={{ backgroundColor: bgColor }}
                    >
                      {/* Visual Blinking Cursor Caret */}
                      {isCurrent && (
                        <span className="absolute -left-0.5 top-0 bottom-0 w-0.5 sm:w-1 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_#ff6b00]" />
                      )}
                      {char === ' ' ? ' ' : char === '\n' ? '↵\n' : char}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Auxiliary Guides (Keyboard & Hands) */}
        {!isFocusMode && (
          <div className="flex flex-col gap-2.5 pt-2">
            {preferences.showHands && <FingerGuide nextChar={nextChar} />}

            {preferences.showKeyboard && (
              <VirtualKeyboard activeKey={activeKey} nextChar={nextChar} keyStats={keyStats} />
            )}

            {/* Bottom Status Row */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
              <div className="flex items-center gap-3">
                <span>
                  Best: <strong className="text-secondary font-mono">{stats.bestWpm} WPM</strong>
                </span>
                <span>
                  Avg Acc: <strong className="text-emerald-400 font-mono">{stats.averageAccuracy}%</strong>
                </span>
                <span>
                  Tests: <strong className="text-slate-300 font-mono">{stats.totalTests}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <span><kbd className="px-1 py-0.2 bg-slate-900 border border-slate-800 rounded">Tab</kbd> indent/restart</span>
                <span>•</span>
                <span><kbd className="px-1 py-0.2 bg-slate-900 border border-slate-800 rounded">Esc</kbd> reset</span>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Results Modal */}
      {lastResult && (
        <ResultsModal
          result={lastResult}
          hasNextLesson={
            mode === 'academy'
              ? ACADEMY_LESSONS.findIndex((l) => l.id === stage) < ACADEMY_LESSONS.length - 1
              : mode === 'code'
              ? codeLevel < 6
              : false
          }
          onRetry={() => {
            setLastResult(null);
            resetEngine();
            focusInput();
          }}
          onNextLesson={handleNextItem}
          onClose={() => setLastResult(null)}
          onPracticeWeakKeys={handlePracticeWeakKeys}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />
      )}

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        unlockedBadgeIds={gamification.unlockedBadgeIds}
      />

      {/* Official Printable Certificate Modal */}
      <TypingCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        result={lastResult}
        gamification={gamification}
        bestWpm={stats.bestWpm}
        averageAccuracy={stats.averageAccuracy}
        onUpdateStudentProfile={setStudentProfile}
        onUpdateStudentName={setStudentName}
      />

      {/* Custom Text Modal */}
      <CustomTextModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmit={(newText) => {
          setCustomText(newText);
          setMode('custom');
          resetEngine();
          focusInput();
        }}
      />

      {/* New Badge Unlock Notification Toast */}
      {newlyUnlockedBadges.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-secondary text-slate-950 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border-2 border-amber-300">
          <span className="text-2xl">{newlyUnlockedBadges[0].icon}</span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider">Achievement Unlocked!</div>
            <div className="text-sm font-bold text-slate-950">{newlyUnlockedBadges[0].title}</div>
            <div className="text-[11px] text-slate-900">{newlyUnlockedBadges[0].description}</div>
          </div>
          <button
            type="button"
            onClick={clearUnlockedNotice}
            className="ml-2 p-1 bg-black/20 hover:bg-black/30 rounded-lg text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
