'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { Chapter, ChapterTopic } from '@/types';

interface TutorialSidebarProps {
  tutorialSlug: string;
  tutorialTitle: string;
  chapters: Chapter[];
  currentTopicSlug?: string;
  completedTopics: string[];
}

export default function TutorialSidebar({
  tutorialSlug,
  tutorialTitle,
  chapters,
  currentTopicSlug,
  completedTopics,
}: TutorialSidebarProps) {
  // Keep chapters expanded if current topic is inside it
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    chapters.forEach((ch, idx) => {
      const hasActive = ch.topics.some((t) => {
        const s = (t as any).slug || t.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return (
          s === currentTopicSlug ||
          (currentTopicSlug === 'introduction' && s === 'introduction-to-python') ||
          (currentTopicSlug === 'introduction-to-python' && s === 'introduction') ||
          Boolean(currentTopicSlug && currentTopicSlug.replace(/-/g, '') === s.replace(/-/g, ''))
        );
      });
      state[ch.id] = idx === 0 || hasActive;
    });
    return state;
  });

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate overall completion percentage
  const totalTopics = chapters.reduce((acc, ch) => acc + ch.topics.length, 0);
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  // Render Technology Logo / Icon
  const renderTechIcon = () => {
    if (tutorialTitle.toLowerCase().includes('python')) {
      return (
        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.016 2.008c-3.13 0-5.016 1.34-5.016 3.793v2.85h5.016v.95H4.258C2.106 9.601 1 11.238 1 13.791c0 2.68 1.488 4.209 4.148 4.209h2.383v-3.082c0-2.453 1.886-3.793 5.016-3.793h4.945v-.95h-7.328V8.65h7.328V5.801c0-2.453-1.886-3.793-5.016-3.793h-.46zm-1.886 1.9a.95.95 0 110 1.9.95.95 0 010-1.9zm1.886 18.084c3.13 0 5.016-1.34 5.016-3.793v-2.85h-5.016v-.95h7.758c2.152 0 3.258-1.637 3.258-4.19 0-2.68-1.488-4.209-4.148-4.209h-2.383v3.082c0 2.453-1.886 3.793-5.016 3.793H6.54v.95h7.328v1.525H6.54v2.85c0 2.453 1.886 3.792 5.016 3.792h.46zm1.886-1.9a.95.95 0 110-1.9.95.95 0 010 1.9z" />
        </svg>
      );
    }
    if (tutorialTitle.toLowerCase().includes('html')) {
      return (
        <svg className="w-5 h-5 text-[#E34F26] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.463L11.977 24l-8.564-2.538L1.5 0zm7.031 9.75l-.232-2.718 10.059-.001.237-2.67H5.281l.707 8.059h9.387l-.312 3.493-3.086.833-3.084-.834-.197-2.213H6.18l.386 4.346 5.411 1.502 5.405-1.502.736-8.309H8.531z" />
        </svg>
      );
    }
    return <BookOpen className="w-5 h-5 text-secondary flex-shrink-0" />;
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-white border-r border-border-subtle flex flex-col h-full select-none">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 border-b border-border-subtle/80 space-y-3">
        <Link
          href={`/tutorials/${tutorialSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-primary transition-colors mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {tutorialTitle}
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderTechIcon()}
            <span className="font-bold text-base text-primary">{tutorialTitle}</span>
          </div>
          <span className="text-xs font-semibold text-text-muted">
            Progress <strong className="text-primary">{progressPercent}%</strong>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Chapters & Topics List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chapters.map((chapter, chapterIndex) => {
          const isExpanded = expandedChapters[chapter.id] !== false;

          return (
            <div key={chapter.id} className="space-y-1">
              {/* Chapter Header Button - Left Aligned with Counting */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-secondary hover:bg-surface rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-left flex-1 min-w-0">
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-secondary flex-shrink-0">
                    {chapterIndex + 1}.
                  </span>
                  <span className="truncate text-left font-bold">
                    {chapter.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                )}
              </button>

              {/* Topics List with Hierarchical Numbering */}
              {isExpanded && (
                <div className="space-y-0.5 pl-2">
                  {chapter.topics.map((topic, topicIndex) => {
                    const topicSlug =
                      (topic as any).slug ||
                      topic.title
                        .toLowerCase()
                        .trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/\s+/g, '-');
                    const isActive =
                      currentTopicSlug === topicSlug ||
                      (currentTopicSlug === 'introduction' && topicSlug === 'introduction-to-python') ||
                      (currentTopicSlug === 'introduction-to-python' && topicSlug === 'introduction') ||
                      (currentTopicSlug && currentTopicSlug.replace(/-/g, '') === topicSlug.replace(/-/g, ''));
                    const isCompleted =
                      completedTopics.includes(topicSlug) ||
                      (topicSlug === 'introduction-to-python' && completedTopics.includes('introduction')) ||
                      (topicSlug === 'introduction' && completedTopics.includes('introduction-to-python'));

                    return (
                      <Link
                        key={topic.id}
                        href={`/tutorials/${tutorialSlug}/${topicSlug}`}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs sm:text-sm transition-all duration-150 ${
                          isActive
                            ? 'bg-orange-50 text-secondary font-bold border-l-4 border-l-secondary pl-2 shadow-2xs'
                            : 'text-text-muted hover:text-primary hover:bg-surface border-l-4 border-l-transparent font-medium'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Circle
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                              isActive ? 'text-secondary' : 'text-slate-300'
                            }`}
                          />
                        )}
                        <span className="font-mono text-[11px] text-slate-400 font-semibold flex-shrink-0">
                          {chapterIndex + 1}.{topicIndex + 1}
                        </span>
                        <span className="truncate text-left">{topic.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
