'use client';

import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Sparkles,
  Play,
  Quote,
  Flame,
  CheckSquare,
  Square,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { slugify } from '@/lib/markdown';
import { highlightCode, getLanguageDisplayName } from '@/lib/prism-highlighter';
import PlaygroundModal from '@/components/playground/PlaygroundModal';
import { SupportedLanguage } from '@/components/playground/types';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline formatting:
 * - `code` or `<tag>` -> <code>...</code>
 * - **bold** -> <strong>...</strong>
 * - *italic* -> <em>...</em>
 * - ~~strikethrough~~ -> <del>...</del>
 * - [text](url) -> <a>...</a>
 */
export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  // Regex matches: `inline code`, **bold**, ~~strikethrough~~, [link](url), *italic*
  const regex = /(`[^`\n]+`|\*\*[^*\n]+\*\*|~~[^~\n]+~~|\[[^\]\n]+\]\([^)\n]+\)|\*[^*\n]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];

    if (token.startsWith('`') && token.endsWith('`')) {
      const codeContent = token.slice(1, -1);
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-mono font-semibold mx-0.5 inline-block shadow-2xs"
        >
          {codeContent}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      const inner = token.slice(2, -2);
      parts.push(
        <strong key={match.index} className="font-bold text-primary">
          {renderFormattedText(inner)}
        </strong>
      );
    } else if (token.startsWith('~~') && token.endsWith('~~')) {
      const inner = token.slice(2, -2);
      parts.push(
        <del key={match.index} className="line-through opacity-70">
          {renderFormattedText(inner)}
        </del>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const inner = token.slice(1, -1);
      parts.push(
        <em key={match.index} className="italic text-primary/90">
          {renderFormattedText(inner)}
        </em>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const isExternal = linkMatch[2].startsWith('http');
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-secondary underline hover:text-secondary-light font-semibold transition-colors"
          >
            {renderFormattedText(linkMatch[1])}
          </a>
        );
      } else {
        parts.push(token);
      }
    } else {
      parts.push(token);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const PLAYGROUND_SUPPORTED_LANGS: Record<string, SupportedLanguage> = {
  python: 'python',
  py: 'python',
  python3: 'python',
  py3: 'python',
  html: 'html',
  htm: 'html',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  css: 'css',
  cpp: 'cpp',
  'c++': 'cpp',
  c: 'c',
  java: 'java',
  sql: 'sql',
};

type Block =
  | { type: 'hr' }
  | { type: 'heading'; level: number; text: string; cleanId: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'mcq-answer'; answer: string }
  | { type: 'mcq-explanation'; explanation: string }
  | { type: 'paragraph'; lines: string[] };

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [playgroundModal, setPlaygroundModal] = useState<{
    isOpen: boolean;
    language: SupportedLanguage;
    code: string;
    title: string;
  }>({
    isOpen: false,
    language: 'python',
    code: '',
    title: 'Code Playground',
  });

  const handleCopy = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Structured Block Tokenizer: Separates headers, code blocks, tables, blockquotes, lists, and paragraphs cleanly
  const parsedBlocks = useMemo<Block[]>(() => {
    const blocks: Block[] = [];
    const lines = content.split(/\r?\n/);
    let currentBlock: string[] = [];
    let currentType: 'paragraph' | 'blockquote' | 'table' | 'ordered-list' | 'unordered-list' | null = null;
    let inCode = false;
    let codeLang = 'text';
    let codeLines: string[] = [];

    const flushCurrent = () => {
      if (currentBlock.length === 0) return;

      if (currentType === 'table') {
        const tableLines = currentBlock.filter((l) => l.trim().startsWith('|') && l.trim().endsWith('|'));
        if (tableLines.length >= 2) {
          const headers = tableLines[0]
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim());
          // tableLines[1] is delimiter (|---|---|)
          const rows = tableLines.slice(2).map((r) =>
            r
              .slice(1, -1)
              .split('|')
              .map((c) => c.trim())
          );
          blocks.push({ type: 'table', headers, rows });
        } else {
          blocks.push({ type: 'paragraph', lines: currentBlock });
        }
      } else if (currentType === 'blockquote') {
        blocks.push({ type: 'blockquote', lines: currentBlock });
      } else if (currentType === 'ordered-list') {
        // Parse list items
        const items: string[] = [];
        let curItem: string[] = [];
        for (const l of currentBlock) {
          if (/^\d+\.\s/.test(l.trim())) {
            if (curItem.length > 0) items.push(curItem.join(' '));
            curItem = [l.trim().replace(/^\d+\.\s*/, '')];
          } else if (curItem.length > 0) {
            curItem.push(l.trim());
          }
        }
        if (curItem.length > 0) items.push(curItem.join(' '));
        blocks.push({ type: 'ordered-list', items });
      } else if (currentType === 'unordered-list') {
        const items: string[] = [];
        let curItem: string[] = [];
        for (const l of currentBlock) {
          if (/^[-*]\s+/.test(l.trim())) {
            if (curItem.length > 0) items.push(curItem.join(' '));
            curItem = [l.trim().replace(/^[-*]\s+/, '')];
          } else if (curItem.length > 0) {
            curItem.push(l.trim());
          }
        }
        if (curItem.length > 0) items.push(curItem.join(' '));
        blocks.push({ type: 'unordered-list', items });
      } else {
        // Paragraph / MCQ check
        const text = currentBlock.join('\n').trim();
        if (text.startsWith('**Answer:**') || text.startsWith('Answer:')) {
          blocks.push({ type: 'mcq-answer', answer: text });
        } else if (text.startsWith('**Explanation:**') || text.startsWith('Explanation:')) {
          blocks.push({
            type: 'mcq-explanation',
            explanation: text.replace(/^\*\*Explanation:\*\*\s*|^Explanation:\s*/, ''),
          });
        } else {
          blocks.push({ type: 'paragraph', lines: currentBlock });
        }
      }

      currentBlock = [];
      currentType = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Fenced Code Blocks (```)
      if (trimmed.startsWith('```')) {
        if (!inCode) {
          flushCurrent();
          inCode = true;
          const match = trimmed.match(/^```(\w+)?/);
          codeLang = (match?.[1] || 'text').toLowerCase();
          codeLines = [];
        } else {
          inCode = false;
          blocks.push({ type: 'code', lang: codeLang, code: codeLines.join('\n') });
          codeLines = [];
        }
        continue;
      }

      if (inCode) {
        codeLines.push(line);
        continue;
      }

      // Blank line -> boundary
      if (!trimmed) {
        flushCurrent();
        continue;
      }

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        flushCurrent();
        blocks.push({ type: 'hr' });
        continue;
      }

      // Headings (#, ##, ###, ####)
      if (trimmed.startsWith('#')) {
        flushCurrent();
        const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const rawText = headerMatch[2];
          const cleanId = slugify(rawText.replace(/`([^`]+)`/g, '$1').replace(/\*\*/g, ''));
          blocks.push({ type: 'heading', level, text: rawText, cleanId });
          continue;
        }
      }

      // Table Row (| ... |)
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (currentType !== 'table') {
          flushCurrent();
          currentType = 'table';
        }
        currentBlock.push(line);
        continue;
      }

      // Blockquote (> ...)
      if (trimmed.startsWith('>')) {
        if (currentType !== 'blockquote') {
          flushCurrent();
          currentType = 'blockquote';
        }
        currentBlock.push(line);
        continue;
      }

      // Ordered List (1. , 2. )
      if (/^\d+\.\s/.test(trimmed)) {
        if (currentType !== 'ordered-list') {
          flushCurrent();
          currentType = 'ordered-list';
        }
        currentBlock.push(line);
        continue;
      }

      // Unordered List (- , * )
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (currentType !== 'unordered-list') {
          flushCurrent();
          currentType = 'unordered-list';
        }
        currentBlock.push(line);
        continue;
      }

      // Regular Paragraph Continuation or Switch
      if (currentType && currentType !== 'paragraph') {
        flushCurrent();
      }
      currentType = 'paragraph';
      currentBlock.push(line);
    }

    flushCurrent();
    return blocks;
  }, [content]);

  let codeBlockCounter = 0;

  return (
    <div className="prose-custom space-y-6 text-text-main leading-relaxed text-base sm:text-lg">
      {parsedBlocks.map((block, idx) => {
        // 1. Horizontal Rule
        if (block.type === 'hr') {
          return <hr key={idx} className="my-8 border-t border-border-subtle" />;
        }

        // 2. Headings
        if (block.type === 'heading') {
          switch (block.level) {
            case 1:
              return (
                <h1
                  key={idx}
                  id={block.cleanId}
                  className="text-3xl sm:text-4xl font-black text-primary tracking-tight mt-10 mb-4 scroll-mt-24 border-b border-border-subtle/70 pb-3"
                >
                  {renderFormattedText(block.text)}
                </h1>
              );
            case 2:
              return (
                <h2
                  key={idx}
                  id={block.cleanId}
                  className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-8 mb-3 scroll-mt-24 flex items-center gap-2"
                >
                  <span>{renderFormattedText(block.text)}</span>
                </h2>
              );
            case 3:
              return (
                <h3
                  key={idx}
                  id={block.cleanId}
                  className="text-xl sm:text-2xl font-bold text-primary tracking-tight mt-6 mb-2 scroll-mt-24"
                >
                  {renderFormattedText(block.text)}
                </h3>
              );
            default:
              return (
                <h4
                  key={idx}
                  id={block.cleanId}
                  className="text-lg sm:text-xl font-bold text-primary tracking-tight mt-5 mb-2 scroll-mt-24"
                >
                  {renderFormattedText(block.text)}
                </h4>
              );
          }
        }

        // 3. Fenced Code Block
        if (block.type === 'code') {
          codeBlockCounter++;
          const codeIdx = codeBlockCounter;
          const lang = block.lang;
          const code = block.code;
          const highlightedHtml = highlightCode(code, lang);
          const displayName = getLanguageDisplayName(lang);

          const getLangBadgeStyle = (l: string) => {
            switch (l) {
              case 'python':
              case 'py':
                return 'text-amber-300 bg-amber-400/10 border-amber-400/30';
              case 'html':
              case 'markup':
                return 'text-rose-300 bg-rose-400/10 border-rose-400/30';
              case 'css':
                return 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30';
              case 'javascript':
              case 'js':
                return 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30';
              case 'typescript':
              case 'ts':
                return 'text-blue-300 bg-blue-400/10 border-blue-400/30';
              case 'c':
              case 'cpp':
                return 'text-sky-300 bg-sky-400/10 border-sky-400/30';
              case 'java':
                return 'text-orange-300 bg-orange-400/10 border-orange-400/30';
              default:
                return 'text-slate-300 bg-slate-800 border-slate-700';
            }
          };

          return (
            <div
              key={idx}
              className="relative my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl"
            >
              {/* Code Editor Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800/90 text-xs font-mono">
                {/* Left: macOS dots + Language Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md border text-[11px] font-bold uppercase tracking-wider font-mono ${getLangBadgeStyle(
                      lang
                    )}`}
                  >
                    {displayName}
                  </span>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {PLAYGROUND_SUPPORTED_LANGS[lang] && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPlaygroundModal({
                          isOpen: true,
                          language: PLAYGROUND_SUPPORTED_LANGS[lang],
                          code,
                          title: `Interactive Playground (${displayName})`,
                        });
                      }}
                      className="flex items-center gap-1.5 text-secondary hover:text-white bg-secondary/15 hover:bg-secondary transition-all cursor-pointer py-1 px-2.5 rounded-lg active:scale-95 text-xs font-sans font-semibold border border-secondary/40 shadow-xs"
                      title="Open and run in Playground"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline">Try in Playground</span>
                      <span className="sm:hidden">Try</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(codeIdx, code)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10 active:scale-95"
                    aria-label="Copy code"
                  >
                    {copiedIndex === codeIdx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-xs font-sans">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-xs font-sans">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="overflow-x-auto p-4 sm:p-5">
                <pre
                  tabIndex={0}
                  suppressHydrationWarning
                  className={`font-mono text-xs sm:text-sm leading-relaxed language-${lang}`}
                >
                  <code
                    className={`language-${lang}`}
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                  />
                </pre>
              </div>
            </div>
          );
        }

        // 4. Tables with Formatted Markdown Cells
        if (block.type === 'table') {
          return (
            <div key={idx} className="my-6 overflow-hidden rounded-2xl border border-border-subtle shadow-xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-border-subtle">
                      {block.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-primary font-mono border-r border-border-subtle/50 last:border-r-0"
                        >
                          {renderFormattedText(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/60">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-amber-50/20 even:bg-slate-50/30 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-5 py-3.5 text-xs sm:text-sm border-r border-border-subtle/40 last:border-r-0 leading-relaxed ${
                              cIdx === 0 ? 'font-semibold text-primary bg-slate-50/30' : 'text-text-muted'
                            }`}
                          >
                            {renderFormattedText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        // 5. Callouts & Blockquotes
        if (block.type === 'blockquote') {
          const rawLines = block.lines.map((l) => l.replace(/^>\s*/, ''));
          const fullText = rawLines.join('\n').trim();
          const firstLineLower = rawLines[0]?.toLowerCase() || '';

          // Note Callout
          if (firstLineLower.includes('📌') || firstLineLower.includes('note')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:[A-Za-z0-9\s]+)?Note:?\*\*|(?:[A-Za-z0-9\s]+)?Note:?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-5 p-4 sm:p-5 rounded-2xl bg-blue-50/70 border-l-4 border-l-blue-500 border border-blue-200/70 shadow-2xs flex items-start gap-3.5"
              >
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono block">
                    Note
                  </span>
                  <div className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                    {renderFormattedText(body || fullText)}
                  </div>
                </div>
              </div>
            );
          }

          // Tip Callout
          if (firstLineLower.includes('💡') || firstLineLower.includes('tip')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:[A-Za-z0-9\s]+)?Tip(?:\s*\d+)?:?\*\*|(?:[A-Za-z0-9\s]+)?Tip(?:\s*\d+)?:?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-5 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-l-amber-500 border border-amber-200/70 shadow-2xs flex items-start gap-3.5"
              >
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono block">
                    Pro Tip
                  </span>
                  <div className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                    {renderFormattedText(body || fullText)}
                  </div>
                </div>
              </div>
            );
          }

          // Warning Callout
          if (firstLineLower.includes('⚠️') || firstLineLower.includes('warning') || firstLineLower.includes('caution')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:[A-Za-z0-9\s]+)?(?:Warning|Caution):?\*\*|(?:[A-Za-z0-9\s]+)?(?:Warning|Caution):?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-5 p-4 sm:p-5 rounded-2xl bg-rose-50/70 border-l-4 border-l-rose-500 border border-rose-200/70 shadow-2xs flex items-start gap-3.5"
              >
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-900 font-mono block">
                    Important Warning
                  </span>
                  <div className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
                    {renderFormattedText(body || fullText)}
                  </div>
                </div>
              </div>
            );
          }

          // Best Practices
          if (firstLineLower.includes('✅') || firstLineLower.includes('best practice')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:[A-Za-z0-9\s]+)?Best Practice:?\*\*|(?:[A-Za-z0-9\s]+)?Best Practice:?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium flex-1">
                  {renderFormattedText(body || fullText)}
                </div>
              </div>
            );
          }

          // Common Mistakes
          if (firstLineLower.includes('❌') || firstLineLower.includes('mistake')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:Common )?Mistake:?\*\*|(?:Common )?Mistake:?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-red-50/70 border border-red-200/80 shadow-2xs flex items-start gap-3"
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium flex-1">
                  {renderFormattedText(body || fullText)}
                </div>
              </div>
            );
          }

          // Fun Fact
          if (firstLineLower.includes('🎉') || firstLineLower.includes('fun fact')) {
            const body = fullText
              .replace(
                /^(?:[📌💡ℹ️⚠️✅❌🎉:]|\s)*(\*\*(?:[A-Za-z0-9\s]+)?Fun Fact:?\*\*|(?:[A-Za-z0-9\s]+)?Fun Fact:?)?\s*/iu,
                ''
              )
              .trim();
            return (
              <div
                key={idx}
                className="my-5 p-5 rounded-2xl bg-gradient-to-r from-purple-50/90 to-indigo-50/90 border border-purple-200 shadow-2xs flex items-start gap-3.5"
              >
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-900 font-mono block">
                    Fun Fact
                  </span>
                  <div className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
                    {renderFormattedText(body || fullText)}
                  </div>
                </div>
              </div>
            );
          }

          // Standard Blockquote (e.g. author quotation)
          return (
            <div
              key={idx}
              className="my-5 p-5 rounded-2xl bg-surface border-l-4 border-l-secondary border border-border-subtle shadow-2xs flex items-start gap-3"
            >
              <Quote className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 opacity-70" />
              <div className="text-sm sm:text-base font-medium text-primary leading-relaxed italic flex-1">
                {renderFormattedText(fullText)}
              </div>
            </div>
          );
        }

        // 6. Numbered Lists (Step-by-step ordered items)
        if (block.type === 'ordered-list') {
          return (
            <ol key={idx} className="my-5 space-y-3 list-none pl-0">
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-surface/70 border border-border-subtle/80 hover:border-border-subtle transition-colors text-text-main text-sm sm:text-base leading-relaxed"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-secondary/15 text-secondary font-bold text-xs mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    {renderFormattedText(item)}
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        // 7. Bullet Lists
        if (block.type === 'unordered-list') {
          return (
            <ul key={idx} className="my-4 space-y-2.5 text-text-muted text-sm sm:text-base">
              {block.items.map((item, itemIdx) => {
                const isTaskDone = item.startsWith('[x] ') || item.startsWith('[X] ');
                const isTaskPending = item.startsWith('[ ] ');
                const isCheck = !isTaskDone && !isTaskPending && (item.startsWith('✅') || item.startsWith('✔'));
                const isCross = item.startsWith('❌');
                const clean = isTaskDone
                  ? item.replace(/^\[[xX]\]\s*/, '')
                  : isTaskPending
                  ? item.replace(/^\[ \]\s*/, '')
                  : item.replace(/^[✅✔❌]\s*/u, '');

                return (
                  <li key={itemIdx} className={`flex items-start gap-2.5 ${isTaskDone ? 'line-through opacity-75' : ''}`}>
                    {isTaskDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    ) : isTaskPending ? (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    ) : isCheck ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    ) : isCross ? (
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2.5" />
                    )}
                    <span className="leading-relaxed flex-1">{renderFormattedText(clean)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 8. MCQ Answer Box
        if (block.type === 'mcq-answer') {
          return (
            <div
              key={idx}
              className="my-3 p-3.5 bg-emerald-50/80 border border-emerald-300/80 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium flex items-center gap-2.5 shadow-2xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>{renderFormattedText(block.answer)}</div>
            </div>
          );
        }

        // 9. MCQ Explanation Box
        if (block.type === 'mcq-explanation') {
          return (
            <div
              key={idx}
              className="my-2 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-text-muted leading-relaxed"
            >
              <span className="font-bold text-primary mr-1">Explanation:</span>
              {renderFormattedText(block.explanation)}
            </div>
          );
        }

        // 10. Normal Paragraph
        const paraText = block.lines.join(' ').trim();
        return (
          <p key={idx} className="text-text-muted text-base sm:text-lg leading-relaxed">
            {renderFormattedText(paraText)}
          </p>
        );
      })}

      {/* Interactive Code Playground Modal */}
      {playgroundModal.isOpen && (
        <PlaygroundModal
          isOpen={playgroundModal.isOpen}
          onClose={() => setPlaygroundModal((prev) => ({ ...prev, isOpen: false }))}
          initialLanguage={playgroundModal.language}
          initialCode={playgroundModal.code}
          title={playgroundModal.title}
        />
      )}
    </div>
  );
}
