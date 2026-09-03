'use client';

import React, { useState } from 'react';
import {
  Check,
  Copy,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { slugify } from '@/lib/markdown';
import { highlightCode, getLanguageDisplayName } from '@/lib/prism-highlighter';

interface MarkdownRendererProps {
  content: string;
}

function renderFormattedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-slate-100 text-secondary border border-slate-200 text-xs font-mono font-bold mx-0.5 inline-block"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-primary">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-primary/90">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
            rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-secondary underline hover:text-secondary-light font-semibold"
          >
            {linkMatch[1]}
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

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Pre-split content into blocks (paragraphs, headers, tables, codeblocks, blockquotes, lists)
  const blocks = React.useMemo(() => {
    const rawBlocks: string[] = [];
    const lines = content.split(/\r?\n/);
    let currentBlock: string[] = [];
    let inCode = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        inCode = !inCode;
        currentBlock.push(line);
        if (!inCode) {
          rawBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        continue;
      }

      if (inCode) {
        currentBlock.push(line);
        continue;
      }

      // If line is empty and current block has content, flush it
      if (!line.trim()) {
        if (currentBlock.length > 0) {
          rawBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        continue;
      }

      // If line starts a header, flush previous and start new
      if (line.startsWith('#')) {
        if (currentBlock.length > 0) {
          rawBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        rawBlocks.push(line);
        continue;
      }

      // If line is horizontal rule
      if (line.trim() === '---' || line.trim() === '***') {
        if (currentBlock.length > 0) {
          rawBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        rawBlocks.push('---');
        continue;
      }

      currentBlock.push(line);
    }

    if (currentBlock.length > 0) {
      rawBlocks.push(currentBlock.join('\n'));
    }

    return rawBlocks;
  }, [content]);

  let codeBlockCounter = 0;
  let mcqCounter = 0;

  return (
    <div className="prose-custom space-y-6 text-text-main leading-relaxed text-base sm:text-lg">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // 1. Horizontal Rule
        if (trimmed === '---') {
          return <hr key={idx} className="my-8 border-t border-border-subtle" />;
        }

        // 2. Headings
        if (trimmed.startsWith('# ')) {
          const text = trimmed.replace(/^#\s+/, '').replace(/\*\*/g, '');
          const id = slugify(text);
          return (
            <h1
              key={idx}
              id={id}
              className="text-3xl sm:text-4xl font-black text-primary tracking-tight mt-10 mb-4 scroll-mt-24 border-b border-border-subtle/50 pb-2"
            >
              {text}
            </h1>
          );
        }

        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '');
          const id = slugify(text);
          return (
            <h2
              key={idx}
              id={id}
              className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mt-8 mb-3 scroll-mt-24 flex items-center gap-2"
            >
              <span>{text}</span>
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '');
          const id = slugify(text);
          return (
            <h3
              key={idx}
              id={id}
              className="text-xl sm:text-2xl font-bold text-primary tracking-tight mt-6 mb-2 scroll-mt-24"
            >
              {text}
            </h3>
          );
        }

        // 3. Fenced Code Blocks
        if (trimmed.startsWith('```')) {
          codeBlockCounter++;
          const codeIdx = codeBlockCounter;
          const match = trimmed.match(/^```(\w+)?\s*\n([\s\S]*?)```$/);
          const lang = (match?.[1] || 'text').toLowerCase();
          const code = match?.[2]?.trim() || '';

          const highlightedHtml = highlightCode(code, lang);
          const displayName = getLanguageDisplayName(lang);

          const getLangBadgeStyle = (l: string) => {
            switch (l) {
              case 'python':
              case 'py':
                return 'text-amber-300 bg-amber-400/10 border-amber-400/30';
              case 'c':
              case 'cpp':
                return 'text-sky-300 bg-sky-400/10 border-sky-400/30';
              case 'java':
                return 'text-orange-300 bg-orange-400/10 border-orange-400/30';
              case 'javascript':
              case 'js':
                return 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30';
              case 'typescript':
              case 'ts':
                return 'text-blue-300 bg-blue-400/10 border-blue-400/30';
              case 'html':
              case 'markup':
                return 'text-rose-300 bg-rose-400/10 border-rose-400/30';
              case 'css':
                return 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30';
              case 'bash':
              case 'sh':
                return 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30';
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
                {/* Left: macOS window dots + Language Badge */}
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

                {/* Right: Copy Code Button */}
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

              {/* Code Editor Body with Prism Syntax Highlighting */}
              <div className="overflow-x-auto p-4 sm:p-5">
                <pre className={`font-mono text-xs sm:text-sm leading-relaxed language-${lang}`}>
                  <code
                    className={`language-${lang}`}
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                  />
                </pre>
              </div>
            </div>
          );
        }

        // 4. Tables
        if (trimmed.includes('|') && trimmed.includes('\n')) {
          const rows = trimmed
            .split('\n')
            .map((r) => r.trim())
            .filter((r) => r.startsWith('|') && r.endsWith('|'));
          if (rows.length >= 2) {
            const headerCells = rows[0]
              .slice(1, -1)
              .split('|')
              .map((c) => c.trim());
            // row[1] is delimiter |---|---|
            const dataRows = rows.slice(2).map((r) =>
              r
                .slice(1, -1)
                .split('|')
                .map((c) => c.trim())
            );

            return (
              <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-border-subtle shadow-2xs">
                <table className="w-full text-left text-sm divide-y divide-border-subtle">
                  <thead className="bg-surface text-primary font-bold text-xs uppercase tracking-wider">
                    <tr>
                      {headerCells.map((header, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 border-r border-border-subtle/50 last:border-r-0">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/60 bg-white">
                    {dataRows.map((dRow, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface/50 transition-colors">
                        {dRow.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 text-text-muted text-xs sm:text-sm border-r border-border-subtle/40 last:border-r-0 ${
                              cIdx === 0 ? 'font-semibold text-primary' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 5. Callouts & Blockquotes
        if (trimmed.startsWith('>')) {
          const calloutText = trimmed.replace(/^>\s*/gm, '').trim();

          // Check callout type
          if (calloutText.includes('📌') || calloutText.toLowerCase().includes('note')) {
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-blue-50/70 border-l-4 border-l-blue-500 border border-blue-200/60 flex items-start gap-3 shadow-2xs"
              >
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                  {renderFormattedText(calloutText.replace('📌', '').trim())}
                </div>
              </div>
            );
          }

          if (calloutText.includes('💡') || calloutText.toLowerCase().includes('tip')) {
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-amber-50/70 border-l-4 border-l-amber-500 border border-amber-200/60 flex items-start gap-3 shadow-2xs"
              >
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {renderFormattedText(calloutText.replace('💡', '').trim())}
                </div>
              </div>
            );
          }

          if (calloutText.includes('⚠️') || calloutText.toLowerCase().includes('warning')) {
            return (
              <div
                key={idx}
                className="my-4 p-4 rounded-xl bg-red-50/70 border-l-4 border-l-red-500 border border-red-200/60 flex items-start gap-3 shadow-2xs"
              >
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium">
                  {renderFormattedText(calloutText.replace('⚠️', '').trim())}
                </div>
              </div>
            );
          }

          if (calloutText.includes('✅')) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5 shadow-2xs"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-emerald-950 font-medium">
                  {renderFormattedText(calloutText.replace('✅', '').trim())}
                </span>
              </div>
            );
          }

          if (calloutText.includes('❌')) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start gap-2.5 shadow-2xs"
              >
                <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-rose-950 font-medium">
                  {renderFormattedText(calloutText.replace('❌', '').trim())}
                </span>
              </div>
            );
          }

          // General Definition Quote Block
          return (
            <div
              key={idx}
              className="my-5 p-4 sm:p-5 rounded-2xl bg-secondary/5 border-l-4 border-l-secondary border border-secondary/20 shadow-2xs"
            >
              <div className="text-sm sm:text-base font-semibold text-primary leading-relaxed">
                {renderFormattedText(calloutText)}
              </div>
            </div>
          );
        }

        // 6. Fun Fact / Highlights
        if (trimmed.includes('🎉') || trimmed.toLowerCase().includes('fun fact')) {
          return (
            <div
              key={idx}
              className="my-5 p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Fun Fact</span>
              </div>
              <div className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
                {renderFormattedText(trimmed.replace('🎉', '').trim())}
              </div>
            </div>
          );
        }

        // 7. Answer & Explanation Callout for MCQs
        if (trimmed.startsWith('**Answer:**') || trimmed.startsWith('Answer:')) {
          return (
            <div
              key={idx}
              className="my-3 p-3.5 bg-emerald-50/80 border border-emerald-300/80 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium flex items-center gap-2.5 shadow-2xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>{renderFormattedText(trimmed)}</div>
            </div>
          );
        }

        if (trimmed.startsWith('**Explanation:**') || trimmed.startsWith('Explanation:')) {
          return (
            <div
              key={idx}
              className="my-2 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-text-muted leading-relaxed"
            >
              <span className="font-bold text-primary mr-1">Explanation:</span>
              {renderFormattedText(trimmed.replace(/^\*\*Explanation:\*\*\s*|^Explanation:\s*/, ''))}
            </div>
          );
        }

        // 8. Numbered Lists (1. item, 2. item)
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed
            .split('\n')
            .filter((l) => /^\d+\.\s/.test(l.trim()))
            .map((line) => line.replace(/^\d+\.\s*/, '').trim());

          if (items.length > 0) {
            return (
              <ol key={idx} className="my-3 space-y-2 text-text-muted text-sm sm:text-base list-decimal pl-6">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed pl-1">
                    {renderFormattedText(item)}
                  </li>
                ))}
              </ol>
            );
          }
        }

        // 9. Bullet Lists (- item or * item)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed
            .split('\n')
            .map((line) => line.replace(/^[-*]\s+/, '').trim())
            .filter(Boolean);

          return (
            <ul key={idx} className="my-3 space-y-2 text-text-muted text-sm sm:text-base">
              {items.map((item, itemIdx) => {
                const isCheck = item.startsWith('✅') || item.startsWith('✔');
                const isCross = item.startsWith('❌');
                const clean = item.replace(/^[✅✔❌]\s*/, '');

                return (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    {isCheck ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    ) : isCross ? (
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2.5" />
                    )}
                    <span className="leading-relaxed">{renderFormattedText(clean)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 10. Normal Paragraphs
        return (
          <p key={idx} className="text-text-muted text-base sm:text-lg leading-relaxed">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
