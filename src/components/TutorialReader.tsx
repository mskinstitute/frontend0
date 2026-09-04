'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Printer,
  Share2,
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Brain,
  CheckCircle2,
  Circle,
  Menu,
  X,
  DownloadCloud
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TutorialItem, Course, TutorialTopicFrontmatter } from '@/types';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TutorialSidebar from '@/components/TutorialSidebar';
import PracticeQuizModal, { QuizQuestion } from '@/components/PracticeQuizModal';
import { extractQuizQuestions } from '@/lib/markdown';
import {
  isTutorialSavedOffline,
  saveTutorialOffline,
  removeTutorialOffline,
} from '@/lib/offlineTutorials';

interface TutorialReaderProps {
  tutorial: TutorialItem;
  course: Course;
  frontmatter: TutorialTopicFrontmatter;
  markdownContent: string;
  prevTopic?: { title: string; slug: string } | null;
  nextTopic?: { title: string; slug: string } | null;
}

export default function TutorialReader({
  tutorial,
  course,
  frontmatter,
  markdownContent,
  prevTopic,
  nextTopic,
}: TutorialReaderProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [isDownloadingOffline, setIsDownloadingOffline] = useState(false);

  // Track scroll percentage for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollPercent(percent);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load completion state, saved state, and offline status
  useEffect(() => {
    try {
      const savedKey = `saved_tut_${tutorial.slug}_${frontmatter.slug}`;
      setIsSaved(localStorage.getItem(savedKey) === 'true');

      const completedKey = `completed_${tutorial.slug}`;
      const list = JSON.parse(localStorage.getItem(completedKey) || '[]');
      if (Array.isArray(list)) {
        setCompletedTopics(list);
      }
    } catch {}

    isTutorialSavedOffline(tutorial.slug, frontmatter.slug)
      .then(setIsOfflineReady)
      .catch(() => null);
  }, [tutorial.slug, frontmatter.slug]);

  // Toggle Save for Offline Reading
  const toggleOfflineDownload = async () => {
    if (isDownloadingOffline) return;
    setIsDownloadingOffline(true);

    try {
      if (isOfflineReady) {
        await removeTutorialOffline(tutorial.slug, frontmatter.slug);
        setIsOfflineReady(false);
        toast('Lesson removed from offline storage');
      } else {
        await saveTutorialOffline(tutorial.slug, frontmatter.slug, frontmatter.title);
        setIsOfflineReady(true);
        toast.success('Saved! This lesson is now available completely offline.', {
          icon: '⚡',
          duration: 4000,
        });
      }
    } catch {
      toast.error('Could not save lesson offline. Please check network.');
    } finally {
      setIsDownloadingOffline(false);
    }
  };

  // Toggle Mark as Complete
  const toggleComplete = () => {
    try {
      const completedKey = `completed_${tutorial.slug}`;
      const isAlready = completedTopics.includes(frontmatter.slug);
      let updated: string[];

      if (isAlready) {
        updated = completedTopics.filter((s) => s !== frontmatter.slug);
        toast('Lesson marked as incomplete');
      } else {
        updated = [...completedTopics, frontmatter.slug];
        toast.success('Lesson marked as completed! 🎉');
      }

      setCompletedTopics(updated);
      localStorage.setItem(completedKey, JSON.stringify(updated));
    } catch {}
  };

  // Toggle Save / Bookmark
  const toggleSave = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);
    try {
      localStorage.setItem(`saved_tut_${tutorial.slug}_${frontmatter.slug}`, String(nextState));
    } catch {}
    toast.success(nextState ? 'Lesson saved to your bookmarks!' : 'Lesson removed from bookmarks');
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${frontmatter.title} | ${tutorial.title} Tutorial`,
          text: frontmatter.description,
          url: window.location.href,
        })
        .catch(() => null);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lesson link copied to clipboard!');
    }
  };

  // Extract or fallback quiz questions
  const quizQuestions: QuizQuestion[] = React.useMemo(() => {
    const parsed = extractQuizQuestions(markdownContent);
    if (parsed.length > 0) return parsed;

    // Fallback standard questions for this topic
    return [
      {
        question: `What is the primary focus of ${frontmatter.title}?`,
        options: [
          { label: 'A', text: 'To understand fundamental programming concepts and syntax' },
          { label: 'B', text: 'To memorize hardware architecture only' },
          { label: 'C', text: 'To replace all existing operating systems' },
          { label: 'D', text: 'None of the above' },
        ],
        correctAnswer: 'A',
        explanation: `${frontmatter.title} focuses on core programming logic and practical execution.`,
      },
    ];
  }, [markdownContent, frontmatter.title]);

  const isCurrentCompleted = completedTopics.includes(frontmatter.slug);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none no-print">
        <div
          className="h-full bg-secondary shadow-xs transition-all duration-100 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Mobile Sidebar Toggle Header */}
      <div className="lg:hidden p-3 border-b border-border-subtle bg-surface flex items-center justify-between no-print sticky top-0 z-40">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-border-subtle rounded-xl text-xs font-bold text-primary shadow-2xs cursor-pointer"
        >
          <Menu className="w-4 h-4 text-secondary" />
          Course Curriculum
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-muted truncate max-w-[150px] sm:max-w-[200px]">
            {frontmatter.title}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-border-subtle rounded-md text-secondary">
            {scrollPercent}%
          </span>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        {/* Left Sidebar (Desktop: Sticky, Mobile: Modal Overlay) */}
        <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-hidden no-print">
          <TutorialSidebar
            tutorialSlug={tutorial.slug}
            tutorialTitle={tutorial.title || course.title}
            chapters={course.chapters || []}
            currentTopicSlug={frontmatter.slug}
            completedTopics={completedTopics}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex no-print">
            <div
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-text-muted hover:text-primary hover:bg-surface transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
              <TutorialSidebar
                tutorialSlug={tutorial.slug}
                tutorialTitle={tutorial.title || course.title}
                chapters={course.chapters || []}
                currentTopicSlug={frontmatter.slug}
                completedTopics={completedTopics}
              />
            </div>
          </div>
        )}

        {/* Center Main Reading Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-12 space-y-8">
          {/* Breadcrumb & Quick Next Navigation (Image 3) */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted no-print">
            <nav className="flex items-center gap-1.5 font-medium">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/courses" className="hover:text-primary">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/tutorials/${tutorial.slug}`} className="hover:text-primary font-semibold text-primary">
                {tutorial.title || course.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-text-muted">{frontmatter.title}</span>
            </nav>

            {nextTopic && (
              <Link
                href={`/tutorials/${tutorial.slug}/${nextTopic.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-secondary transition-colors"
              >
                {nextTopic.title}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Lesson Header (Image 3) */}
          <header className="space-y-4 border-b border-border-subtle/80 pb-6">
            <h1 className="text-3xl sm:text-5xl font-black text-primary tracking-tight">
              {frontmatter.title}
            </h1>

            {/* Badges & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-md capitalize">
                  {frontmatter.difficulty || 'Beginner'}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-text-muted" />
                  {frontmatter.readingTime || 12} min read
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-text-muted" />
                  Updated: {frontmatter.lastUpdated || 'Jul 11, 2026'}
                </span>
              </div>

              {/* Action Buttons: Font Size, Save, Print, Share */}
              <div className="flex items-center gap-2 no-print flex-wrap">
                {/* Font Size Toggle */}
                <div className="flex items-center rounded-xl border border-border-subtle bg-white p-0.5 text-xs font-bold text-text-muted shadow-2xs">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      fontSize === 'normal'
                        ? 'bg-surface text-primary font-black shadow-2xs'
                        : 'hover:text-primary'
                    }`}
                    title="Standard text size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2.5 py-1 rounded-lg transition-colors text-sm cursor-pointer ${
                      fontSize === 'large'
                        ? 'bg-surface text-primary font-black shadow-2xs'
                        : 'hover:text-primary'
                    }`}
                    title="Larger text size"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={toggleSave}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-secondary/10 border-secondary text-secondary font-bold'
                      : 'bg-white border-border-subtle hover:bg-surface text-text-muted hover:text-primary'
                  }`}
                  aria-label="Bookmark lesson"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-secondary' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                {/* Save for Offline Reading Button (PWA Offline Capability) */}
                <button
                  onClick={toggleOfflineDownload}
                  disabled={isDownloadingOffline}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isOfflineReady
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold shadow-2xs'
                      : 'bg-white border-border-subtle hover:bg-surface text-text-muted hover:text-primary'
                  }`}
                  title={isOfflineReady ? 'Available offline without internet' : 'Download lesson for offline reading'}
                  aria-label="Save lesson for offline reading"
                >
                  {isOfflineReady ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Offline Ready</span>
                    </>
                  ) : (
                    <>
                      <DownloadCloud className={`w-3.5 h-3.5 ${isDownloadingOffline ? 'animate-bounce text-secondary' : ''}`} />
                      <span>{isDownloadingOffline ? 'Saving...' : 'Save Offline'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="p-2 bg-white border border-border-subtle hover:bg-surface text-text-muted hover:text-primary rounded-xl text-xs transition-colors cursor-pointer"
                  aria-label="Print lesson"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 bg-white border border-border-subtle hover:bg-surface text-text-muted hover:text-primary rounded-xl text-xs transition-colors cursor-pointer"
                  aria-label="Share lesson"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Rendered Markdown Body */}
          <div className={`py-2 transition-all duration-150 ${fontSize === 'large' ? 'text-lg leading-relaxed' : ''}`}>
            <MarkdownRenderer content={markdownContent} />
          </div>

          {/* Next Lesson Preview Box (Image 5) */}
          {nextTopic && (
            <div className="p-6 bg-surface rounded-2xl border border-border-subtle space-y-2 no-print">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Next Lesson</span>
              <h3 className="text-xl font-bold text-primary">{nextTopic.title}</h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Continue learning with hands-on practice, examples, and exercises in the upcoming topic.
              </p>
            </div>
          )}

          {/* Related Lessons Table (Image 4 & 5) */}
          <div className="space-y-3 pt-4 no-print">
            <h3 className="text-lg font-bold text-primary">Related Lessons</h3>
            <div className="overflow-hidden rounded-2xl border border-border-subtle shadow-2xs">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-surface text-primary font-bold border-b border-border-subtle">
                  <tr>
                    <th className="px-5 py-3 w-1/2">Previous Lesson</th>
                    <th className="px-5 py-3 w-1/2">Next Lesson</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle bg-white">
                  <tr>
                    <td className="px-5 py-3.5 text-text-muted">
                      {prevTopic ? (
                        <Link
                          href={`/tutorials/${tutorial.slug}/${prevTopic.slug}`}
                          className="text-primary hover:text-secondary font-semibold transition-colors"
                        >
                          {prevTopic.title}
                        </Link>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-text-muted">
                      {nextTopic ? (
                        <Link
                          href={`/tutorials/${tutorial.slug}/${nextTopic.slug}`}
                          className="text-primary hover:text-secondary font-semibold transition-colors"
                        >
                          {nextTopic.title}
                        </Link>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Practice Quiz Interactive Card (Image 4) */}
          <div className="bg-gradient-to-r from-orange-50/70 to-amber-50/70 border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs no-print">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-orange-200 text-secondary flex items-center justify-center shadow-xs flex-shrink-0 mt-1">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-primary">Practice Quiz</h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed">
                  Test your understanding of this lesson with {quizQuestions.length} questions. Each question has one correct answer.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-bold text-sm rounded-xl shadow transition-colors cursor-pointer flex-shrink-0"
            >
              Start Quiz
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Lesson Navigation Bar (Image 4 & 5) */}
          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            {/* Mark as Complete Pill */}
            <button
              onClick={toggleComplete}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                isCurrentCompleted
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-primary text-white border-primary hover:bg-primary-light'
              }`}
            >
              {isCurrentCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark as complete</span>
                </>
              )}
            </button>

            {/* Prev & Next Buttons */}
            <div className="flex items-center gap-3">
              {prevTopic && (
                <Link
                  href={`/tutorials/${tutorial.slug}/${prevTopic.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-border-subtle hover:bg-surface text-primary font-bold text-xs sm:text-sm rounded-xl shadow-2xs transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Link>
              )}

              {nextTopic && (
                <Link
                  href={`/tutorials/${tutorial.slug}/${nextTopic.slug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sticky Bottom Floating Quick-Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-border-subtle shadow-xl z-40 flex items-center justify-between gap-2 no-print">
        {prevTopic ? (
          <Link
            href={`/tutorials/${tutorial.slug}/${prevTopic.slug}`}
            className="flex-1 text-center py-2 px-3 bg-surface hover:bg-slate-100 text-primary font-bold text-xs rounded-xl border border-border-subtle truncate flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="truncate">Prev</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <button
          onClick={toggleComplete}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
            isCurrentCompleted
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-primary text-white'
          }`}
        >
          {isCurrentCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
          <span>{isCurrentCompleted ? 'Completed' : 'Mark Done'}</span>
        </button>

        {nextTopic ? (
          <Link
            href={`/tutorials/${tutorial.slug}/${nextTopic.slug}`}
            className="flex-1 text-center py-2 px-3 bg-secondary hover:bg-secondary-light text-white font-bold text-xs rounded-xl shadow-xs truncate flex items-center justify-center gap-1"
          >
            <span className="truncate">Next</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Practice Quiz Modal */}
      <PracticeQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        title={frontmatter.title}
        questions={quizQuestions}
      />
    </div>
  );
}
