'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  Video,
  FileCode,
  FileText,
  Bookmark,
  Layers,
  Newspaper,
  ArrowRight,
  CornerDownLeft,
  Command,
  Flame,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Course, LiveBatch, StudyMaterial, BlogPost, SearchResultItem } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = 'all' | 'courses' | 'live' | 'study-material' | 'careers' | 'blogs';

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Cached resource datasets
  const [courses, setCourses] = useState<Course[]>([]);
  const [liveBatches, setLiveBatches] = useState<LiveBatch[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [tutorials, setTutorials] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch datasets when opened for the first time
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [cRes, bRes, sRes, blRes, tRes, carRes] = await Promise.all([
          fetch('/data/all-courses.json').catch(() => null),
          fetch('/data/live-batches.json').catch(() => null),
          fetch('/data/study-materials.json').catch(() => null),
          fetch('/data/blogs.json').catch(() => null),
          fetch('/data/tutorials.json').catch(() => null),
          fetch('/data/careers.json').catch(() => null),
        ]);

        if (cRes?.ok) {
          const cData = await cRes.json();
          if (isMounted) setCourses(cData);
        }
        if (bRes?.ok) {
          const bData = await bRes.json();
          if (isMounted) setLiveBatches(bData);
        }
        if (sRes?.ok) {
          const sData = await sRes.json();
          if (isMounted) setStudyMaterials(sData);
        }
        if (blRes?.ok) {
          const blData = await blRes.json();
          if (isMounted) setBlogs(blData);
        }
        if (tRes?.ok) {
          const tData = await tRes.json();
          if (isMounted) setTutorials(tData);
        }
        if (carRes?.ok) {
          const carData = await carRes.json();
          if (isMounted) setCareers(carData);
        }
      } catch (err) {
        console.error('Failed to load search index data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    // Auto-focus input after modal transition
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Convert raw datasets into uniform SearchResultItems
  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // Courses
    courses.forEach((c) => {
      if (c.status === 'PUBLISH') {
        items.push({
          id: `course-${c.id}`,
          type: 'course',
          title: c.title,
          description: c.shortDescription || `Level: ${c.level} • Duration: ${c.duration.value} ${c.duration.unit}`,
          category: c.categories?.join(', ') || 'Coding Course',
          url: `/courses/${c.slug}`,
          badge: 'Course',
          actionLabel: 'View Course',
        });
      }
    });

    // Live Batches
    liveBatches.forEach((b) => {
      items.push({
        id: `live-${b.id}`,
        type: 'live',
        title: b.title,
        description: `Starts: ${b.startDate} • Schedule: ${b.schedule} • Seats Left: ${b.leftSeats}`,
        category: 'Live Batch',
        url: `/live-batches/${b.id}`,
        badge: 'Live Batch',
        actionLabel: 'Check Batch',
      });
    });

    // Study Materials (Tutorials, Cheatsheets, Notes, Handbooks)
    studyMaterials.forEach((m) => {
      let badge = 'Study Material';
      let actionLabel = 'Open Material';
      if (m.type === 'tutorial') {
        badge = 'Tutorial';
        actionLabel = 'Read Tutorial';
      } else if (m.type === 'cheatsheet') {
        badge = 'Cheatsheet';
        actionLabel = 'View Cheatsheet';
      } else if (m.type === 'note') {
        badge = 'PDF Note';
        actionLabel = 'Get Notes';
      } else if (m.type === 'handbook') {
        badge = 'Handbook';
        actionLabel = 'Explore Handbook';
      }

      items.push({
        id: `mat-${m.id}`,
        type: m.type,
        title: m.title,
        description: m.description,
        category: `${m.category} • ${m.level}`,
        url: `/study-material?id=${m.id}&type=${m.type}`,
        badge,
        actionLabel,
      });
    });

    // Blogs
    blogs.forEach((bl) => {
      items.push({
        id: `blog-${bl.id}`,
        type: 'blog',
        title: bl.title,
        description: bl.excerpt,
        category: `${bl.category} • ${bl.readTime}`,
        url: `/blogs/${bl.slug}`,
        badge: 'Blog',
        actionLabel: 'Read Article',
      });
    });

    // Tutorials
    tutorials.forEach((tut) => {
      items.push({
        id: `tut-${tut.id}`,
        type: 'tutorial',
        title: `${tut.title} Tutorial & Notes`,
        description: tut.shortDescription || 'Interactive documentation and lessons.',
        category: `${tut.title} • ${tut.badge || 'Beginner'}`,
        url: `/tutorials/${tut.slug}`,
        badge: 'Tutorial',
        actionLabel: 'Explore Tutorial',
      });
    });

    // Careers & Internships
    careers.forEach((c) => {
      items.push({
        id: `career-${c.id}`,
        type: 'career',
        title: c.title,
        description: `${c.type === 'internship' ? 'Internship' : 'Job'} • ${c.stipendOrSalary} • ${c.location}`,
        category: `${c.department} • ${c.mode}`,
        url: `/careers`,
        badge: c.type === 'internship' ? 'Internship' : 'Job Opening',
        actionLabel: 'View & Apply',
      });
    });

    return items;
  }, [courses, liveBatches, studyMaterials, blogs, tutorials, careers]);

  // Filter items based on activeCategory and search query
  const filteredResults = useMemo(() => {
    let list = allSearchItems;

    // Apply category filter
    if (activeCategory === 'courses') {
      list = list.filter((i) => i.type === 'course');
    } else if (activeCategory === 'live') {
      list = list.filter((i) => i.type === 'live');
    } else if (activeCategory === 'study-material') {
      list = list.filter((i) => ['tutorial', 'cheatsheet', 'note', 'handbook'].includes(i.type));
    } else if (activeCategory === 'careers') {
      list = list.filter((i) => i.type === 'career');
    } else if (activeCategory === 'blogs') {
      list = list.filter((i) => i.type === 'blog');
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // When empty query, return top 10 recommended items
      return list.slice(0, 10);
    }

    // Split search into words for multi-term matching
    const searchTerms = trimmed.split(/\s+/).filter(Boolean);

    return list.filter((item) => {
      const targetText = `${item.title} ${item.description} ${item.category || ''} ${item.badge}`.toLowerCase();
      return searchTerms.every((term) => targetText.includes(term));
    });
  }, [allSearchItems, activeCategory, query]);

  // Keep selected index in bounds whenever results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (filteredResults.length > 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex, filteredResults.length]);

  // Navigate to item
  const handleSelect = useCallback(
    (item: SearchResultItem) => {
      onClose();
      router.push(item.url);
    },
    [router, onClose]
  );

  // Keyboard navigation handler inside modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredResults, selectedIndex, handleSelect, onClose]
  );

  // Helper for rendering icons based on type
  const renderTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'live':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'tutorial':
        return <FileCode className="w-4 h-4 text-emerald-500" />;
      case 'cheatsheet':
        return <Layers className="w-4 h-4 text-purple-500" />;
      case 'note':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'handbook':
        return <Bookmark className="w-4 h-4 text-indigo-500" />;
      case 'blog':
        return <Newspaper className="w-4 h-4 text-teal-500" />;
      case 'career':
        return <Briefcase className="w-4 h-4 text-emerald-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  // Helper for type pill styles
  const getBadgeStyle = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'course':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'live':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'tutorial':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cheatsheet':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'note':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'handbook':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'blog':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'career':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-primary/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Search Palette"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-subtle bg-white">
          <Search className="w-5 h-5 text-text-muted mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, live batches, study materials, tutorials, blogs..."
            className="w-full text-base sm:text-lg text-primary placeholder:text-text-muted/60 bg-transparent border-none outline-none font-medium"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-text-muted hover:text-primary hover:bg-surface mr-2 cursor-pointer transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 bg-surface border border-border-subtle text-text-muted hover:text-primary rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface/70 border-b border-border-subtle overflow-x-auto text-xs no-scrollbar">
          <span className="text-text-muted font-medium mr-1 hidden sm:inline">Filter:</span>
          {(
            [
              { id: 'all', label: 'All Resources' },
              { id: 'courses', label: 'Courses' },
              { id: 'live', label: 'Live Schedule' },
              { id: 'study-material', label: 'Study Material' },
              { id: 'careers', label: 'Internships & Jobs' },
              { id: 'blogs', label: 'Blogs' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-white text-text-muted border border-border-subtle hover:text-primary hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-border-subtle/50"
        >
          {isLoading ? (
            <div className="py-16 text-center text-text-muted space-y-2">
              <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium">Indexing resources...</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-surface border border-border-subtle flex items-center justify-center mx-auto text-text-muted">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-primary">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Try searching for keywords like &ldquo;Python&rdquo;, &ldquo;React&rdquo;, &ldquo;Excel&rdquo;, &ldquo;Cheatsheet&rdquo;, &ldquo;CCC&rdquo;, or &ldquo;Batch&rdquo;.
              </p>
            </div>
          ) : (
            <>
              {!query && (
                <div className="px-3 pt-2 pb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-muted">
                  <Flame className="w-3.5 h-3.5 text-secondary" />
                  Popular & Recommended Resources
                </div>
              )}

              {filteredResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-100 flex items-center justify-between gap-3 group cursor-pointer ${
                      isSelected
                        ? 'bg-secondary/10 border-l-4 border-l-secondary shadow-sm text-primary pl-3.5'
                        : 'hover:bg-surface text-text-muted hover:text-primary border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="p-2 rounded-lg bg-white border border-border-subtle shadow-2xs mt-0.5 flex-shrink-0">
                        {renderTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm sm:text-base text-primary group-hover:text-secondary transition-colors truncate">
                            {item.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${getBadgeStyle(
                              item.type
                            )}`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                        {item.category && (
                          <div className="flex items-center gap-1 mt-1 text-[11px] text-text-muted/80">
                            <span>{item.category}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.actionLabel || 'Select'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      {isSelected && (
                        <span className="p-1 rounded bg-secondary text-white hidden sm:flex items-center justify-center">
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Command Palette Keyboard Hints Footer */}
        <div className="px-4 py-2.5 bg-surface border-t border-border-subtle flex flex-wrap items-center justify-between text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border-subtle rounded font-mono shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-border-subtle rounded font-mono shadow-2xs">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border-subtle rounded font-mono shadow-2xs">↵</kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border-subtle rounded font-mono shadow-2xs">esc</kbd>
              <span>to close</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-text-muted/80">
            <span>MSK Institute Unified Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
