'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Layers, ChevronDown, Check, Download, 
  Play, Clock, ArrowRight, ExternalLink, PackageCheck, 
  FileText, Video 
} from 'lucide-react';
import { Course, Chapter } from '@/types';

interface CourseCurriculumAccordionProps {
  isCombo: boolean;
  courseTitle: string;
  courseSlug?: string;
  includedCourses?: Course[];
  chapters?: Chapter[];
}

function resolveTopicTutorialUrl(
  courseSlug: string | undefined,
  chapterTitle: string,
  topicTitle: string,
  existingNotes?: { title: string; url: string }[]
): string | null {
  // Check if existing notes point to an internal tutorial route
  if (existingNotes) {
    const internal = existingNotes.find((n) => n.url.startsWith('/tutorials/'));
    if (internal) return internal.url;
  }

  const rawSlug = topicTitle
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  const cSlug = (courseSlug || '').toLowerCase();
  const chTitle = chapterTitle.toLowerCase();

  let tutorialSlug: string | null = null;

  if (cSlug.includes('html5-complete') || (cSlug.includes('html') && !chTitle.includes('css') && !chTitle.includes('tailwind'))) {
    tutorialSlug = 'html5-complete-course';
  } else if (cSlug.includes('python')) {
    tutorialSlug = 'python-for-beginners';
  } else if (cSlug.includes('javascript') || cSlug.includes('react')) {
    tutorialSlug = 'javascript-essentials';
  } else if (cSlug.includes('css-for-beginners') || cSlug.includes('css') || chTitle.includes('css') || chTitle.includes('tailwind')) {
    tutorialSlug = 'css-for-beginners';
  } else if (cSlug.includes('full-stack') || cSlug.includes('bootcamp')) {
    if (chTitle.includes('html')) tutorialSlug = 'html5-complete-course';
    else if (chTitle.includes('css') || chTitle.includes('tailwind')) tutorialSlug = 'css-for-beginners';
    else if (chTitle.includes('javascript') || chTitle.includes('js') || chTitle.includes('react')) tutorialSlug = 'javascript-essentials';
    else if (chTitle.includes('python')) tutorialSlug = 'python-for-beginners';
  }

  if (!tutorialSlug) return null;

  let topicSlug = rawSlug;
  if (tutorialSlug === 'python-for-beginners') {
    if (rawSlug === 'introduction' || rawSlug === 'introduction-to-python' || rawSlug === 'python-introduction') topicSlug = 'python-introduction';
    else if (rawSlug === 'vscode-setup' || rawSlug === 'vs-code-setup') topicSlug = 'vs-code-setup';
  } else if (tutorialSlug === 'html5-complete-course') {
    if (rawSlug === 'introduction' || rawSlug.includes('introduction-to-html') || rawSlug.includes('introduction')) {
      topicSlug = 'introduction-to-html';
    } else if (rawSlug === 'basic-document-structure' || rawSlug === 'basic-document-structure-boilerplate') {
      topicSlug = 'basic-document-structure';
    } else if (rawSlug === 'vscode-setup' || rawSlug === 'vs-code-setup') {
      topicSlug = 'vs-code-setup';
    } else if (rawSlug === 'elements' || rawSlug === 'html-elements') {
      topicSlug = 'elements';
    } else if (rawSlug === 'attributes' || rawSlug === 'html-attributes') {
      topicSlug = 'attributes';
    } else if (rawSlug === 'html-headings' || rawSlug === 'headings') {
      topicSlug = 'html-headings';
    } else if (rawSlug === 'paragraphs-line-breaks' || rawSlug === 'paragraphs') {
      topicSlug = 'paragraphs-line-breaks';
    } else if (rawSlug === 'text-formatting-elements' || rawSlug === 'text-elements-formatting' || rawSlug.includes('formatting')) {
      topicSlug = 'text-formatting-elements';
    } else if (rawSlug === 'quotations-citations' || rawSlug === 'quotations' || rawSlug.includes('quotation')) {
      topicSlug = 'quotations-citations';
    } else if (rawSlug === 'html-entities-symbols' || rawSlug.includes('entity') || rawSlug.includes('symbol') || rawSlug.includes('emoji')) {
      topicSlug = 'html-entities-symbols';
    } else if (rawSlug === 'html-comments' || rawSlug === 'comments' || rawSlug.includes('comment')) {
      topicSlug = 'html-comments';
    } else if (rawSlug === 'html-colors-rgb' || rawSlug === 'colors' || rawSlug === 'html-colors' || rawSlug === 'html-colors-color-codes') {
      topicSlug = 'html-colors-rgb';
    } else if (rawSlug === 'hex-hsl-color-codes' || rawSlug.includes('hex') || rawSlug.includes('hsl')) {
      topicSlug = 'hex-hsl-color-codes';
    } else if (rawSlug === 'links-hyperlinks' || rawSlug === 'links' || rawSlug === 'hyperlinks' || rawSlug === 'links-navigation-lists') {
      topicSlug = 'links-hyperlinks';
    } else if (rawSlug === 'target-attributes-security' || rawSlug.includes('target') || rawSlug.includes('security')) {
      topicSlug = 'target-attributes-security';
    } else if (rawSlug === 'unordered-ordered-lists' || rawSlug === 'lists' || rawSlug.includes('unordered') || rawSlug.includes('ordered')) {
      topicSlug = 'unordered-ordered-lists';
    } else if (rawSlug === 'description-lists' || rawSlug.includes('description')) {
      topicSlug = 'description-lists';
    } else if (rawSlug === 'html-tables' || rawSlug === 'tables' || rawSlug === 'table' || rawSlug === 'tables-structured-data') {
      topicSlug = 'html-tables';
    } else if (rawSlug === 'colspan-rowspan' || rawSlug.includes('colspan') || rawSlug.includes('rowspan')) {
      topicSlug = 'colspan-rowspan';
    } else if (rawSlug === 'block-vs-inline-elements' || rawSlug === 'block-and-inline' || rawSlug.includes('block') || rawSlug.includes('inline')) {
      topicSlug = 'block-vs-inline-elements';
    } else if (rawSlug === 'div-span-containers' || rawSlug.includes('div') || rawSlug.includes('span')) {
      topicSlug = 'div-span-containers';
    } else if (rawSlug === 'images-responsive-art' || rawSlug === 'images-multimedia-embeds' || rawSlug.includes('image')) {
      topicSlug = 'images-responsive-art';
    } else if (rawSlug === 'audio-video' || rawSlug.includes('audio') || rawSlug.includes('video') || rawSlug.includes('media')) {
      topicSlug = 'audio-video';
    } else if (rawSlug === 'iframes-web-embeds' || rawSlug.includes('iframe') || rawSlug.includes('embed')) {
      topicSlug = 'iframes-web-embeds';
    } else if (rawSlug === 'html5-svg-canvas' || rawSlug.includes('svg') || rawSlug.includes('canvas')) {
      topicSlug = 'html5-svg-canvas';
    } else if (rawSlug === 'forms-input-types' || rawSlug === 'forms' || rawSlug === 'form' || rawSlug === 'forms-inputs-validations') {
      topicSlug = 'forms-input-types';
    } else if (rawSlug === 'form-controls-validations' || rawSlug.includes('validation') || rawSlug.includes('control')) {
      topicSlug = 'form-controls-validations';
    } else if (rawSlug === 'semantic-layout-elements' || rawSlug === 'html5-semantic-architecture' || rawSlug.includes('semantic') || rawSlug.includes('layout')) {
      topicSlug = 'semantic-layout-elements';
    } else if (rawSlug === 'accessibility-aria' || rawSlug === 'accessibility-aria-seo' || rawSlug.includes('accessibility') || rawSlug.includes('aria')) {
      topicSlug = 'accessibility-aria';
    } else if (rawSlug === 'interactive-elements-dialog' || rawSlug.includes('dialog') || rawSlug.includes('interactive') || rawSlug.includes('detail')) {
      topicSlug = 'interactive-elements-dialog';
    } else if (rawSlug === 'html5-apis-storage-best-practices' || rawSlug.includes('api') || rawSlug.includes('storage')) {
      topicSlug = 'html5-apis-storage-best-practices';
    }
  } else if (tutorialSlug === 'css-for-beginners') {
    if (rawSlug === 'what-is-css-and-why-it-matters' || rawSlug === 'what-is-css' || rawSlug.includes('what-is-css')) {
      topicSlug = 'what-is-css-and-why-it-matters';
    } else if (rawSlug === 'how-css-works-with-html' || rawSlug === 'how-css-works' || rawSlug.includes('how-css-works')) {
      topicSlug = 'how-css-works-with-html';
    } else if (rawSlug === 'inline-internal-external-css' || rawSlug.includes('inline') || rawSlug.includes('internal') || rawSlug.includes('external')) {
      topicSlug = 'inline-internal-external-css';
    } else if (rawSlug === 'css-syntax-comments-and-structure' || rawSlug.includes('syntax') || rawSlug.includes('comment')) {
      topicSlug = 'css-syntax-comments-and-structure';
    } else if (rawSlug === 'universal-and-element-selectors' || rawSlug.includes('universal') || rawSlug.includes('element')) {
      topicSlug = 'universal-and-element-selectors';
    } else if (rawSlug === 'class-and-id-selectors' || (rawSlug.includes('class') && rawSlug.includes('id')) || rawSlug === 'basic-selectors-element-class-id') {
      topicSlug = 'class-and-id-selectors';
    } else if (rawSlug === 'grouping-and-combinator-selectors' || rawSlug.includes('grouping') || rawSlug.includes('combin')) {
      topicSlug = 'grouping-and-combinator-selectors';
    } else if (rawSlug === 'color-formats-names-hex-rgb-hsl' || rawSlug.includes('color-format') || rawSlug.includes('hex') || rawSlug.includes('rgb') || rawSlug.includes('hsl')) {
      topicSlug = 'color-formats-names-hex-rgb-hsl';
    } else if (rawSlug === 'background-color-image-position-size' || rawSlug.includes('background') || rawSlug.includes('position') || (rawSlug.includes('image') && rawSlug.includes('background'))) {
      topicSlug = 'background-color-image-position-size';
    } else if (rawSlug === 'css-gradients-linear-radial' || rawSlug.includes('gradient')) {
      topicSlug = 'css-gradients-linear-radial';
    } else if (rawSlug === 'css-box-model-content-padding-border-margin' || rawSlug.includes('box-model') || (rawSlug.includes('content') && rawSlug.includes('padding')) || (rawSlug.includes('margin') && rawSlug.includes('border'))) {
      topicSlug = 'css-box-model-content-padding-border-margin';
    } else if (rawSlug === 'width-height-max-min-dimensions' || rawSlug.includes('width') || rawSlug.includes('height') || rawSlug.includes('dimension')) {
      topicSlug = 'width-height-max-min-dimensions';
    } else if (rawSlug === 'box-sizing-border-box-vs-content-box' || rawSlug.includes('box-sizing') || rawSlug.includes('border-box') || rawSlug.includes('content-box')) {
      topicSlug = 'box-sizing-border-box-vs-content-box';
    } else if (rawSlug === 'font-families-web-safe-fonts' || rawSlug.includes('font-famil') || rawSlug.includes('web-safe')) {
      topicSlug = 'font-families-web-safe-fonts';
    } else if (rawSlug === 'font-size-weight-style-line-height' || rawSlug.includes('font-size') || rawSlug.includes('weight') || rawSlug.includes('line-height')) {
      topicSlug = 'font-size-weight-style-line-height';
    } else if (rawSlug === 'text-align-decoration-transform-spacing' || rawSlug.includes('text-align') || rawSlug.includes('transform') || rawSlug.includes('decoration')) {
      topicSlug = 'text-align-decoration-transform-spacing';
    } else if (rawSlug === 'css-units-absolute-px-pt' || rawSlug.includes('absolute') || rawSlug.includes('px-pt')) {
      topicSlug = 'css-units-absolute-px-pt';
    } else if (rawSlug === 'css-units-relative-percentages-rem-em-vh-vw' || rawSlug.includes('relative') || rawSlug.includes('vh-vw') || (rawSlug.includes('rem') && rawSlug.includes('em'))) {
      topicSlug = 'css-units-relative-percentages-rem-em-vh-vw';
    } else if (rawSlug === 'responsive-units-and-calc-function' || rawSlug.includes('calc') || rawSlug.includes('best-practice') || (rawSlug.includes('responsive') && rawSlug.includes('unit'))) {
      topicSlug = 'responsive-units-and-calc-function';
    } else if (rawSlug === 'border-styles-colors-shorthand' || (rawSlug.includes('border') && (rawSlug.includes('style') || rawSlug.includes('shorthand')))) {
      topicSlug = 'border-styles-colors-shorthand';
    } else if (rawSlug === 'border-radius-rounded-corners-circles' || rawSlug.includes('border-radius') || rawSlug.includes('rounded') || rawSlug.includes('circle')) {
      topicSlug = 'border-radius-rounded-corners-circles';
    } else if (rawSlug === 'box-shadows-and-text-shadows' || rawSlug.includes('shadow')) {
      topicSlug = 'box-shadows-and-text-shadows';
    } else if (rawSlug === 'styling-links-pseudo-classes' || (rawSlug.includes('link') && (rawSlug.includes('pseudo') || rawSlug.includes('style')))) {
      topicSlug = 'styling-links-pseudo-classes';
    } else if (rawSlug === 'styling-ordered-unordered-lists' || rawSlug.includes('list') || rawSlug.includes('ordered') || rawSlug.includes('unordered')) {
      topicSlug = 'styling-ordered-unordered-lists';
    } else if (rawSlug === 'styling-tables-borders-striping' || rawSlug.includes('table') || rawSlug.includes('striping')) {
      topicSlug = 'styling-tables-borders-striping';
    } else if (rawSlug === 'display-block-inline-inline-block' || (rawSlug.includes('block') && rawSlug.includes('inline'))) {
      topicSlug = 'display-block-inline-inline-block';
    } else if (rawSlug === 'display-none-vs-visibility-hidden' || (rawSlug.includes('visibility') || (rawSlug.includes('display') && rawSlug.includes('none')))) {
      topicSlug = 'display-none-vs-visibility-hidden';
    } else if (rawSlug === 'css-overflow-visible-hidden-scroll-auto' || rawSlug.includes('overflow')) {
      topicSlug = 'css-overflow-visible-hidden-scroll-auto';
    } else if (rawSlug === 'position-static-relative-absolute' || (rawSlug.includes('position') && (rawSlug.includes('static') || rawSlug.includes('relative') || rawSlug.includes('absolute')))) {
      topicSlug = 'position-static-relative-absolute';
    } else if (rawSlug === 'position-fixed-and-sticky' || rawSlug.includes('fixed') || rawSlug.includes('sticky')) {
      topicSlug = 'position-fixed-and-sticky';
    } else if (rawSlug === 'z-index-and-stacking-context' || rawSlug.includes('z-index') || rawSlug.includes('stacking')) {
      topicSlug = 'z-index-and-stacking-context';
    } else if (rawSlug === 'float-and-clear-basics' || rawSlug.includes('float') || rawSlug.includes('clear')) {
      topicSlug = 'float-and-clear-basics';
    } else if (rawSlug === 'aligning-elements-text-align-and-margin' || (rawSlug.includes('align') && (rawSlug.includes('margin') || rawSlug.includes('text-align')))) {
      topicSlug = 'aligning-elements-text-align-and-margin';
    } else if (rawSlug === 'intro-to-flexbox-basics' || rawSlug.includes('flex')) {
      topicSlug = 'intro-to-flexbox-basics';
    } else if (rawSlug === 'project-styled-profile-card' || rawSlug.includes('profile') || rawSlug.includes('id-card')) {
      topicSlug = 'project-styled-profile-card';
    } else if (rawSlug === 'project-simple-landing-page-layout' || rawSlug.includes('landing')) {
      topicSlug = 'project-simple-landing-page-layout';
    } else if (rawSlug === 'project-navigation-bar-styling' || (rawSlug.includes('navigation') && rawSlug.includes('bar')) || rawSlug.includes('navbar')) {
      topicSlug = 'project-navigation-bar-styling';
    }
  }

  return `/tutorials/${tutorialSlug}/${topicSlug}`;
}

export default function CourseCurriculumAccordion({
  isCombo,
  courseTitle,
  courseSlug,
  includedCourses = [],
  chapters = [],
}: CourseCurriculumAccordionProps) {
  // State for which Course is expanded (Combo mode)
  // Default to the first course open for great UX
  const [activeCourseId, setActiveCourseId] = useState<string | null>(
    isCombo && includedCourses.length > 0 ? includedCourses[0].id : null
  );

  // State for which Chapter is expanded
  // Default to the first chapter of the active course open
  const [activeChapterId, setActiveChapterId] = useState<string | null>(() => {
    if (isCombo) {
      return includedCourses[0]?.chapters?.[0]?.id || null;
    } else {
      return chapters[0]?.id || null;
    }
  });

  // Handler to toggle Course in Combo mode
  const handleToggleCourse = (courseId: string) => {
    if (activeCourseId === courseId) {
      // If clicking the currently open course, toggle it closed
      setActiveCourseId(null);
      setActiveChapterId(null);
    } else {
      // Open the new course and close any previously opened course
      setActiveCourseId(courseId);
      // Automatically open the first chapter of the newly opened course
      const targetCourse = includedCourses.find((c) => c.id === courseId);
      const firstChapterId = targetCourse?.chapters?.[0]?.id || null;
      setActiveChapterId(firstChapterId);
    }
  };

  // Handler to toggle Chapter
  const handleToggleChapter = (chapterId: string) => {
    if (activeChapterId === chapterId) {
      // Toggle closed if clicking currently open chapter
      setActiveChapterId(null);
    } else {
      // Open this chapter and close any previously opened chapter
      setActiveChapterId(chapterId);
    }
  };

  // COMBO COURSE RENDER (with bundled subcourses)
  if (isCombo && includedCourses.length > 0) {
    return (
      <section className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
              <PackageCheck className="w-6 h-6 text-secondary" />
              Courses Included in this Combo
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Click on any course below to explore its chapters, practical lab modules, notes, and topics.
            </p>
          </div>
          <span className="text-xs font-black uppercase text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg shadow-sm w-fit flex-shrink-0">
            {includedCourses.length} Courses Bundled
          </span>
        </div>

        <div className="space-y-4">
          {includedCourses.map((courseItem, courseIndex) => {
              const isCourseOpen = activeCourseId === courseItem.id;
              const courseChapters = courseItem.chapters || [];

              return (
                <div
                  key={courseItem.id}
                  className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${
                    isCourseOpen
                      ? 'border-secondary ring-1 ring-secondary/20 shadow-md'
                      : 'border-border-subtle hover:border-gray-300'
                  }`}
                >
                  {/* Course Accordion Header Bar */}
                  <button
                    type="button"
                    onClick={() => handleToggleCourse(courseItem.id)}
                    className={`w-full flex flex-col md:flex-row md:items-center justify-between p-5 text-left transition-colors cursor-pointer gap-4 select-none ${
                      isCourseOpen ? 'bg-surface/80 border-b border-border-subtle' : 'hover:bg-surface/50'
                    }`}
                    aria-expanded={isCourseOpen}
                  >
                    {/* Left: Course Number & Title */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-secondary text-white text-xs font-black flex-shrink-0 shadow-sm">
                        {String(courseIndex + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase text-[#B83A00] tracking-wider bg-orange-100 px-2 py-0.5 rounded">
                            {courseItem.categories[0] || 'Course'}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted bg-gray-100 px-2 py-0.5 rounded">
                            {courseItem.level}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-primary hover:text-secondary transition-colors">
                          {courseItem.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Meta stats & Chevron */}
                    <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-secondary" />
                          {courseItem.duration.value} {courseItem.duration.unit}
                        </span>
                        <span className="text-text-muted">•</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Layers className="w-3.5 h-3.5 text-secondary" />
                          {courseChapters.length} Modules
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-full bg-surface border border-border-subtle text-primary">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isCourseOpen ? 'rotate-180 text-secondary' : 'text-text-muted'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Course Body (Chapters List) */}
                  {isCourseOpen && (
                    <div className="p-5 bg-surface/30 space-y-4 animate-in fade-in duration-200">
                      {/* Standalone course quick summary bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-xl border border-border-subtle gap-3">
                        <p className="text-xs text-text-muted leading-relaxed max-w-xl">
                          {courseItem.shortDescription}
                        </p>
                        <Link
                          href={`/courses/${courseItem.slug}`}
                          className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-secondary text-white text-xs font-bold shadow-sm transition-colors flex-shrink-0 cursor-pointer"
                        >
                          <span>Full Course Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Chapters Accordion */}
                      {courseChapters.length > 0 ? (
                        <div className="space-y-2.5">
                          <div className="text-xs font-black uppercase tracking-wider text-text-muted flex items-center gap-1.5 px-1 pt-1">
                            <Layers className="w-3.5 h-3.5 text-secondary" />
                            <span>Modules & Chapters ({courseChapters.length})</span>
                          </div>

                          {courseChapters
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((chapter) => {
                              const isChapterOpen = activeChapterId === chapter.id;

                              return (
                                <div
                                  key={chapter.id}
                                  className={`border rounded-xl bg-white shadow-xs overflow-hidden transition-all duration-150 ${
                                    isChapterOpen ? 'border-secondary/60 shadow-sm' : 'border-border-subtle'
                                  }`}
                                >
                                  {/* Chapter Header button */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleChapter(chapter.id)}
                                    className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors cursor-pointer select-none text-sm ${
                                      isChapterOpen
                                        ? 'bg-secondary/5 text-primary'
                                        : 'text-primary hover:bg-surface/70'
                                    }`}
                                    aria-expanded={isChapterOpen}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span
                                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black transition-colors ${
                                          isChapterOpen
                                            ? 'bg-secondary text-white'
                                            : 'bg-primary/5 text-primary'
                                        }`}
                                      >
                                        {chapter.sortOrder}
                                      </span>
                                      <span className="text-sm font-bold text-primary">
                                        {chapter.title}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <span className="text-[11px] font-semibold text-text-muted bg-surface px-2 py-0.5 rounded border border-border-subtle">
                                        {chapter.topics.length} Topics
                                      </span>
                                      <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${
                                          isChapterOpen ? 'rotate-180 text-secondary' : 'text-text-muted'
                                        }`}
                                      />
                                    </div>
                                  </button>

                                  {/* Chapter Topics list */}
                                  {isChapterOpen && (
                                    <div className="p-4 border-t border-border-subtle bg-surface/50 space-y-3 animate-in fade-in duration-150">
                                      <ul className="space-y-2.5">
                                        {chapter.topics
                                          .sort((a, b) => a.sortOrder - b.sortOrder)
                                          .map((topic) => (
                                            <li
                                              key={topic.id}
                                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-lg border border-border-subtle text-xs text-text-main gap-2 hover:border-gray-300 transition-colors"
                                            >
                                              <span className="flex items-center gap-2 font-medium">
                                                <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                                                <span className="font-mono text-[11px] text-slate-400 font-bold flex-shrink-0">
                                                  {chapter.sortOrder}.{topic.sortOrder}
                                                </span>
                                                <span className="font-semibold text-text-main">{topic.title}</span>
                                              </span>

                                              <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                                                {(() => {
                                                  const tutorialUrl = resolveTopicTutorialUrl(
                                                    courseItem.slug,
                                                    chapter.title,
                                                    topic.title,
                                                    topic.notes
                                                  );
                                                  return (
                                                    <>
                                                      {tutorialUrl && (
                                                        <Link
                                                          href={tutorialUrl}
                                                          className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary-light text-white text-[11px] font-bold gap-1 shadow-xs transition-all duration-150 cursor-pointer active:scale-95"
                                                          title={`Read notes and tutorial for ${topic.title}`}
                                                        >
                                                          <BookOpen className="w-3 h-3" />
                                                          Notes
                                                        </Link>
                                                      )}
                                                      {topic.notes &&
                                                        topic.notes
                                                          .filter((n) => !n.url.startsWith('/tutorials/'))
                                                          .map((note, idx) => (
                                                            <a
                                                              key={idx}
                                                              href={note.url}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="inline-flex items-center px-2 py-1 rounded-md bg-surface hover:bg-slate-100 text-text-muted hover:text-text-main border border-border-subtle text-[11px] font-bold gap-1 shadow-xs transition-all duration-150 cursor-pointer"
                                                              title={note.title}
                                                            >
                                                              <Download className="w-3 h-3 text-secondary" />
                                                              Cheatsheet
                                                            </a>
                                                          ))}
                                                    </>
                                                  );
                                                })()}
                                                {topic.videos && topic.videos.map((vid, idx) => (
                                                  vid.preview ? (
                                                    <a
                                                      key={idx}
                                                      href={vid.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold gap-1 shadow-xs transition-all duration-150 cursor-pointer"
                                                    >
                                                      <Play className="w-3 h-3" />
                                                      Preview
                                                    </a>
                                                  ) : (
                                                    <span
                                                      key={idx}
                                                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold gap-1"
                                                    >
                                                      Lab Video
                                                    </span>
                                                  )
                                                ))}
                                              </div>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <p className="text-xs text-text-muted italic p-3 bg-white rounded-lg border border-border-subtle">
                          Modules for this course are currently being updated.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>
    );
  }

  // COMBO COURSE RENDER (when no bundled subcourses and no chapters yet)
  if (isCombo && (!chapters || chapters.length === 0)) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-3 gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
              <PackageCheck className="w-6 h-6 text-secondary" />
              Courses Included in this Combo
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Course syllabus and curriculum modules are being compiled.
            </p>
          </div>
        </div>
        <div className="p-8 bg-surface rounded-xl border border-border-subtle text-center text-text-muted">
          <PackageCheck className="w-8 h-8 text-secondary mx-auto mb-2 opacity-60" />
          <p className="font-semibold text-sm">Included course curricula details are being compiled.</p>
        </div>
      </section>
    );
  }

  // SINGLE COURSE RENDER (Syllabus Breakdown with controlled single-open accordion)
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2">
        <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
          <Layers className="w-5 h-5 text-secondary" />
          Syllabus Breakdown
        </h2>
        <span className="text-xs font-black uppercase text-secondary bg-secondary/10 px-2.5 py-1 rounded-md shadow-sm">
          {chapters.length} Modules
        </span>
      </div>

      <div className="space-y-3">
        {chapters
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((chapter) => {
            const isChapterOpen = activeChapterId === chapter.id;

            return (
              <div
                key={chapter.id}
                className={`border rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${
                  isChapterOpen ? 'border-secondary ring-1 ring-secondary/20' : 'border-border-subtle hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleChapter(chapter.id)}
                  className={`w-full flex items-center justify-between p-5 font-bold text-left transition-colors cursor-pointer select-none ${
                    isChapterOpen ? 'bg-secondary/5 text-primary' : 'text-primary hover:bg-surface'
                  }`}
                  aria-expanded={isChapterOpen}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black transition-colors ${
                        isChapterOpen ? 'bg-secondary text-white' : 'bg-primary/5 text-primary'
                      }`}
                    >
                      {chapter.sortOrder}
                    </span>
                    <span className="text-base font-bold text-primary">{chapter.title}</span>
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-text-muted bg-surface px-2.5 py-1 rounded-md border border-border-subtle">
                      {chapter.topics.length} Topics
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isChapterOpen ? 'rotate-180 text-secondary' : 'text-text-muted'
                      }`}
                    />
                  </div>
                </button>

                {isChapterOpen && (
                  <div className="p-5 border-t border-border-subtle bg-surface/50 space-y-4 animate-in fade-in duration-150">
                    <ul className="space-y-3">
                      {chapter.topics
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((topic) => (
                          <li
                            key={topic.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-lg border border-border-subtle text-sm text-text-main gap-2 hover:border-gray-300 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="font-mono text-xs text-slate-400 font-bold flex-shrink-0">
                                {chapter.sortOrder}.{topic.sortOrder}
                              </span>
                              <span className="font-semibold text-text-main">{topic.title}</span>
                            </span>
                            <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                              {(() => {
                                const tutorialUrl = resolveTopicTutorialUrl(
                                  courseSlug,
                                  chapter.title,
                                  topic.title,
                                  topic.notes
                                );
                                return (
                                  <>
                                    {tutorialUrl && (
                                      <Link
                                        href={tutorialUrl}
                                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary-light text-white text-xs font-bold gap-1.5 shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
                                        title={`Read notes and tutorial for ${topic.title}`}
                                      >
                                        <BookOpen className="w-3.5 h-3.5" />
                                        Notes
                                      </Link>
                                    )}
                                    {topic.notes &&
                                      topic.notes
                                        .filter((n) => !n.url.startsWith('/tutorials/'))
                                        .map((note, idx) => (
                                          <a
                                            key={idx}
                                            href={note.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-2.5 py-1.5 rounded-md bg-surface hover:bg-slate-100 text-text-muted hover:text-text-main border border-border-subtle text-xs font-bold gap-1 shadow-xs transition-all duration-150 cursor-pointer"
                                            title={note.title}
                                          >
                                            <Download className="w-3.5 h-3.5 text-secondary" />
                                            Cheatsheet
                                          </a>
                                        ))}
                                  </>
                                );
                              })()}
                              {topic.videos && topic.videos.map((vid, idx) => (
                                vid.preview ? (
                                  <a
                                    key={idx}
                                    href={vid.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white text-xs font-bold gap-1 shadow-sm transition-all duration-150 cursor-pointer"
                                  >
                                    <Play className="w-3.5 h-3.5" />
                                    Watch Preview
                                  </a>
                                ) : (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-bold gap-1"
                                  >
                                    Lab Video
                                  </span>
                                )
                              ))}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
