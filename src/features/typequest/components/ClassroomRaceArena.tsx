'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Users,
  Bot,
  Zap,
  Flag,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
} from 'lucide-react';
import { RaceCompetitor } from '../types';

interface ClassroomRaceArenaProps {
  userProgress: number; // 0 to 100
  userWpm: number;
  isActive: boolean;
  isCompleted: boolean;
  onRaceFinished?: (rank: number) => void;
}

type BotDifficulty = 'rookie' | 'pro' | 'elite';

export default function ClassroomRaceArena({
  userProgress,
  userWpm,
  isActive,
  isCompleted,
  onRaceFinished,
}: ClassroomRaceArenaProps) {
  const [roomCode] = useState(() => `MSK-${Math.floor(100 + Math.random() * 900)}`);
  const [copied, setCopied] = useState(false);
  const [difficulty, setDifficulty] = useState<BotDifficulty>('pro');

  // Competitors setup
  const [competitors, setCompetitors] = useState<RaceCompetitor[]>([
    {
      id: 'player',
      name: 'You (Student)',
      isAi: false,
      speedWpm: 0,
      progressPercent: 0,
      rank: 1,
      color: '#ff6b00', // MSK secondary
      avatar: '🏎️',
    },
    {
      id: 'bot-1',
      name: 'NovaRacer (AI)',
      isAi: true,
      speedWpm: 38,
      progressPercent: 0,
      rank: 2,
      color: '#38bdf8', // Sky blue
      avatar: '🚀',
    },
    {
      id: 'bot-2',
      name: 'TurboPixel (AI)',
      isAi: true,
      speedWpm: 56,
      progressPercent: 0,
      rank: 3,
      color: '#a855f7', // Purple
      avatar: '⚡',
    },
    {
      id: 'bot-3',
      name: 'VeloGhost (AI)',
      isAi: true,
      speedWpm: 72,
      progressPercent: 0,
      rank: 4,
      color: '#10b981', // Emerald
      avatar: '🏎️',
    },
  ]);

  // Adjust bot target speeds based on difficulty
  const botTargetSpeeds = React.useMemo(() => {
    switch (difficulty) {
      case 'rookie':
        return [28, 36, 44];
      case 'elite':
        return [65, 78, 92];
      case 'pro':
      default:
        return [42, 54, 66];
    }
  }, [difficulty]);

  const raceStartTimeRef = useRef<number | null>(null);
  const finishReportedRef = useRef(false);

  // Reset when test resets
  useEffect(() => {
    if (!isActive && !isCompleted) {
      raceStartTimeRef.current = null;
      finishReportedRef.current = false;
      setCompetitors((prev) =>
        prev.map((c) => ({
          ...c,
          progressPercent: 0,
          speedWpm: c.isAi ? 0 : 0,
          rank: 1,
        }))
      );
    }
  }, [isActive, isCompleted]);

  // Handle active race tick for bots
  useEffect(() => {
    if (!isActive || isCompleted) return;

    if (!raceStartTimeRef.current) {
      raceStartTimeRef.current = Date.now();
    }

    const interval = setInterval(() => {
      if (!raceStartTimeRef.current) return;
      const elapsedMinutes = (Date.now() - raceStartTimeRef.current) / 1000 / 60;

      // Update competitors
      setCompetitors((prev) => {
        const updated = prev.map((comp, idx) => {
          if (!comp.isAi) {
            return {
              ...comp,
              progressPercent: Math.min(100, Math.max(0, userProgress)),
              speedWpm: userWpm,
            };
          }

          // Bot progress calculation based on difficulty WPM
          const targetWpm = botTargetSpeeds[idx - 1] || 45;
          // Approximate words typed: targetWpm * elapsedMinutes
          // Assuming an average text has around 40 words
          const simulatedProgress = Math.min(100, Math.round((targetWpm * elapsedMinutes * 100) / 38));

          // Small random jitter
          const jittered = Math.min(100, Math.max(0, simulatedProgress));

          return {
            ...comp,
            progressPercent: comp.progressPercent >= 100 ? 100 : jittered,
            speedWpm: targetWpm,
          };
        });

        // Compute rankings sorted by progress descending
        const sorted = [...updated].sort((a, b) => b.progressPercent - a.progressPercent);
        return updated.map((comp) => {
          const rank = sorted.findIndex((s) => s.id === comp.id) + 1;
          return { ...comp, rank };
        });
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isActive, isCompleted, userProgress, userWpm, botTargetSpeeds]);

  // When race finishes, notify parent
  useEffect(() => {
    if (isCompleted && !finishReportedRef.current) {
      finishReportedRef.current = true;
      const playerComp = competitors.find((c) => c.id === 'player');
      if (playerComp && onRaceFinished) {
        onRaceFinished(playerComp.rank ?? 1);
      }
    }
  }, [isCompleted, competitors, onRaceFinished]);

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playerComp = competitors.find((c) => c.id === 'player') || competitors[0];

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-5 shadow-xl backdrop-blur-md mb-4 select-none">
      {/* Race Arena Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Classroom Battle Track
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full animate-pulse">
                Live
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Race in real-time against classroom peers or smart AI pacesetters
            </p>
          </div>
        </div>

        {/* Room Code & Bot Difficulty Settings */}
        <div className="flex items-center gap-2">
          {/* Difficulty Tier */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['rookie', 'pro', 'elite'] as BotDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                  difficulty === d
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Room Code Pill */}
          <button
            type="button"
            onClick={handleCopyRoom}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl text-xs font-mono text-slate-300 transition-colors"
            title="Click to copy Classroom Room Code"
          >
            <span>Room: {roomCode}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* 4-Lane Speedway Track */}
      <div className="relative flex flex-col gap-2.5 bg-slate-950/80 rounded-xl p-3 sm:p-4 border border-slate-800/90 overflow-hidden">
        {/* Finish Line Ribbon */}
        <div className="absolute right-8 top-0 bottom-0 w-3 flex flex-col items-center justify-between border-l-2 border-dashed border-amber-400/60 pointer-events-none z-10 opacity-70">
          <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000,#000_6px,#fff_6px,#fff_12px)] opacity-40" />
        </div>

        {competitors.map((comp) => {
          const isLead = comp.rank === 1;
          return (
            <div
              key={comp.id}
              className={`relative h-12 rounded-lg p-1.5 flex items-center border transition-colors ${
                comp.id === 'player'
                  ? 'bg-secondary/10 border-secondary/40 ring-1 ring-secondary/20'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {/* Lane Info Label */}
              <div className="flex items-center gap-2 w-32 sm:w-44 shrink-0 z-20">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    comp.rank === 1
                      ? 'bg-amber-400 text-slate-950'
                      : comp.rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{comp.rank}
                </span>

                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold truncate flex items-center gap-1 ${
                      comp.id === 'player' ? 'text-secondary font-mono' : 'text-slate-300'
                    }`}
                  >
                    {comp.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                    <span>{comp.speedWpm} WPM</span>
                    <span>•</span>
                    <span>{Math.round(comp.progressPercent)}%</span>
                  </div>
                </div>
              </div>

              {/* Race Track Highway */}
              <div className="relative flex-1 h-full flex items-center px-4 overflow-hidden">
                {/* Lane Track Center Line */}
                <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-slate-800" />

                {/* Animated Vehicle / Avatar */}
                <div
                  className="absolute transition-all duration-300 ease-out flex items-center gap-1.5 z-20"
                  style={{
                    left: `${Math.min(92, Math.max(2, comp.progressPercent))}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {/* Fire exhaust if moving */}
                  {isActive && comp.progressPercent > 2 && (
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 -rotate-90 animate-pulse" />
                  )}

                  {/* Vehicle Body */}
                  <div
                    className={`relative px-2 py-1 rounded-md text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1 transition-transform ${
                      isLead ? 'scale-110' : ''
                    }`}
                    style={{
                      backgroundColor: comp.color,
                      color: '#ffffff',
                    }}
                  >
                    <span>{comp.avatar}</span>
                    <span className="text-[9px] font-mono hidden sm:inline">
                      {comp.speedWpm}
                    </span>
                  </div>
                </div>
              </div>

              {/* Finish Checkpoint Flag */}
              <div className="shrink-0 pl-2 z-20">
                {comp.progressPercent >= 100 ? (
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded-md uppercase">
                    Done!
                  </span>
                ) : (
                  <Flag className="w-4 h-4 text-slate-600" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Podium Message if Completed */}
      {isCompleted && (
        <div className="mt-3 p-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border border-amber-500/40 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            <div>
              <div className="text-sm font-bold text-white">
                {playerComp.rank === 1
                  ? '🏆 1st Place Champion! Outstanding Speed!'
                  : `🏁 Race Finished! You placed #${playerComp.rank}`}
              </div>
              <div className="text-xs text-slate-300">
                Battle complete at {userWpm} WPM with {Math.round(userProgress)}% track coverage.
              </div>
            </div>
          </div>

          <span className="text-xs font-bold font-mono px-3 py-1 bg-amber-400 text-slate-950 rounded-lg shadow">
            +{playerComp.rank === 1 ? 120 : 60} XP Earned
          </span>
        </div>
      )}
    </div>
  );
}
