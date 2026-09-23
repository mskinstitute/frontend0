'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { LiveBatch } from '@/types';
import CountdownTimer from '@/components/CountdownTimer';
import { parseBatchStartTimestamp } from '@/lib/batchUtils';

interface HomeHeroBatchCardProps {
  initialBatches: LiveBatch[];
}

export default function HomeHeroBatchCard({ initialBatches }: HomeHeroBatchCardProps) {
  // Sort all batches chronologically
  const sortedBatches = useMemo(() => {
    return [...initialBatches].sort((a, b) => {
      return parseBatchStartTimestamp(a) - parseBatchStartTimestamp(b);
    });
  }, [initialBatches]);

  // Determine the next upcoming batch relative to a given timestamp
  const findNextUpcomingBatch = useCallback((nowTs: number): LiveBatch | null => {
    if (sortedBatches.length === 0) return null;
    const upcoming = sortedBatches.filter((b) => parseBatchStartTimestamp(b) > nowTs);
    if (upcoming.length > 0) {
      return upcoming[0];
    }
    // If all batches have started and no upcoming batch exists, return null
    return null;
  }, [sortedBatches]);

  // Initial batch for SSR
  const [currentBatch, setCurrentBatch] = useState<LiveBatch | null>(() => {
    return findNextUpcomingBatch(Date.now());
  });

  const [, setTick] = useState(0);

  // Check on client mount and every 10 seconds if active batch has passed
  useEffect(() => {
    const checkActiveBatch = () => {
      const now = Date.now();
      const nextUpcoming = findNextUpcomingBatch(now);
      if (nextUpcoming?.id !== currentBatch?.id) {
        setCurrentBatch(nextUpcoming);
      }
      setTick((t) => t + 1);
    };

    checkActiveBatch();
    const interval = setInterval(checkActiveBatch, 10000);
    return () => clearInterval(interval);
  }, [findNextUpcomingBatch, currentBatch?.id]);

  // Handler when countdown timer reaches zero
  const handleBatchExpire = useCallback(() => {
    // Immediately look for next upcoming batch
    const now = Date.now();
    const next = findNextUpcomingBatch(now);
    setCurrentBatch(next);
  }, [findNextUpcomingBatch]);

  if (!currentBatch) return null;

  // Build target date string for countdown
  const startTs = parseBatchStartTimestamp(currentBatch);
  const countdownDateString = currentBatch.startDateTime || (startTs ? new Date(startTs).toISOString() : `${currentBatch.startDate}T09:00:00`);
  const isStarted = startTs > 0 && startTs <= Date.now();

  const formattedStartDate = (() => {
    try {
      if (startTs) {
        const d = new Date(startTs);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      const d = new Date(currentBatch.startDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    } catch {}
    return currentBatch.startDate;
  })();

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-secondary/5 rounded-3xl blur-3xl -z-10" />
      <div className="border border-border-subtle bg-white p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col gap-5">
        {/* Top Header Badge & Price */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#B83A00] bg-[#B83A00]/10 px-3 py-1 rounded-md">
            {isStarted ? 'In Session' : `Starting ${formattedStartDate}`}
          </span>
          <span className="text-xs sm:text-sm font-black text-secondary bg-secondary/10 px-3 py-1 rounded-lg border border-secondary/15">
            {currentBatch.price || '₹4,999'}
          </span>
        </div>

        {/* Batch Titles */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-primary tracking-tight">
            {currentBatch.title || 'Live Interactive Batch'}
          </h2>
          <p className="text-xs font-semibold text-text-muted">
            {currentBatch.courseTitle || 'Live Computer & Coding Course'}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
          {currentBatch.description || 'Start your coding journey with our intensive live training batch. Hands-on projects, doubt solving, and personalized mentorship.'}
        </p>

        {/* Live Countdown Timer */}
        <div className="bg-surface/80 border border-border-subtle p-3.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-text-muted px-1">
            <span className="font-bold text-primary flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isStarted ? 'bg-emerald-500' : 'bg-secondary animate-ping'}`} />
              {isStarted ? 'Batch In Progress:' : 'Batch Starts In:'}
            </span>
            <span className="text-[11px] font-semibold text-secondary">
              {isStarted ? 'Limited Late Seats' : 'Admissions Open'}
            </span>
          </div>
          <CountdownTimer targetDate={countdownDateString} onComplete={handleBatchExpire} />
        </div>

        {/* Instructor & Schedule Info with Instructor Picture */}
        <div className="flex items-center gap-3 pt-3 border-t border-border-subtle">
          {currentBatch.instructorPicture ? (
            <div className="relative flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentBatch.instructorPicture}
                alt={currentBatch.instructor}
                width={44}
                height={44}
                loading="lazy"
                className="w-11 h-11 rounded-full object-cover border-2 border-secondary shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border border-white" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black text-sm flex-shrink-0">
              {currentBatch.instructor?.[0] || 'S'}
            </div>
          )}
          <div className="text-xs space-y-0.5 min-w-0">
            <div className="font-bold text-primary flex items-center gap-1.5">
              <span className="truncate">{currentBatch.instructor || 'Er. Sumit Kumar'}</span>
              <span className="text-[10px] font-medium text-text-muted bg-surface px-1.5 py-0.2 rounded border border-border-subtle flex-shrink-0">
                Lead Mentor
              </span>
            </div>
            <div className="text-text-muted text-[11px] truncate">
              <strong>Schedule:</strong> {currentBatch.schedule || 'Mon, Wed, Fri (05:00 PM - 06:30 PM)'}
            </div>
          </div>
        </div>

        {/* Urgency & Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-border-subtle gap-3">
          <span className="text-xs text-red-500 font-bold flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Only {currentBatch.leftSeats || 4} of {currentBatch.totalSeats || 20} Seats Left
          </span>

          <Link
            href={`/live-batches/${currentBatch.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all text-center cursor-pointer flex-shrink-0"
          >
            <span>View Live Batch Details</span>
            <span className="text-sm">➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
