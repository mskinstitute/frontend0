'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Check, Camera, Sparkles, Layers, Sliders } from 'lucide-react';
import { SupportedLanguage } from './types';
import toast from 'react-hot-toast';

interface CodeScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: SupportedLanguage;
  filename?: string;
}

interface GradientPreset {
  id: string;
  name: string;
  background: string;
  stops: [string, string, string];
}

const GRADIENTS: GradientPreset[] = [
  {
    id: 'sunset',
    name: 'MSK Sunset',
    background: 'linear-gradient(135deg, #ff6b00 0%, #ff8e53 50%, #e040fb 100%)',
    stops: ['#ff6b00', '#ff8e53', '#e040fb'],
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    background: 'linear-gradient(135deg, #0A2540 0%, #007acc 50%, #00d2ff 100%)',
    stops: ['#0A2540', '#007acc', '#00d2ff'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    background: 'linear-gradient(135deg, #2b0054 0%, #7b1fa2 50%, #ff007f 100%)',
    stops: ['#2b0054', '#7b1fa2', '#ff007f'],
  },
  {
    id: 'emerald',
    name: 'Emerald',
    background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)',
    stops: ['#064e3b', '#059669', '#34d399'],
  },
  {
    id: 'midnight',
    name: 'Midnight',
    background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
    stops: ['#111827', '#1f2937', '#374151'],
  },
];

export default function CodeScreenshotModal({
  isOpen,
  onClose,
  code,
  language,
  filename = 'code.py',
}: CodeScreenshotModalProps) {
  const [selectedGradient, setSelectedGradient] = useState<GradientPreset>(GRADIENTS[0]);
  const [padding, setPadding] = useState<number>(32);
  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lines = code.trim().split('\n');

  // Render high-res Canvas from code card
  const generateCanvas = async (): Promise<HTMLCanvasElement> => {
    const dpr = 2; // retina scaling
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not available');

    const lineHeight = 22;
    const fontSize = 13;
    const font = `${fontSize * dpr}px 'Fira Code', 'Courier New', monospace`;
    ctx.font = font;

    // Calculate maximum code line width
    let maxLineLength = 0;
    for (const line of lines) {
      if (line.length > maxLineLength) maxLineLength = line.length;
    }
    const estimatedCharWidth = fontSize * 0.6;
    const gutterWidth = showLineNumbers ? 48 : 0;
    const innerCardWidth = Math.max(500, Math.min(1000, maxLineLength * estimatedCharWidth + gutterWidth + 48));
    const titleBarHeight = 38;
    const codeAreaHeight = lines.length * lineHeight + 28;
    const watermarkHeight = showWatermark ? 28 : 10;
    const innerCardHeight = titleBarHeight + codeAreaHeight + watermarkHeight;

    const canvasWidth = (innerCardWidth + padding * 2) * dpr;
    const canvasHeight = (innerCardHeight + padding * 2) * dpr;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.scale(dpr, dpr);

    const actualWidth = canvasWidth / dpr;
    const actualHeight = canvasHeight / dpr;

    // 1. Draw outer gradient background
    const grad = ctx.createLinearGradient(0, 0, actualWidth, actualHeight);
    grad.addColorStop(0, selectedGradient.stops[0]);
    grad.addColorStop(0.5, selectedGradient.stops[1]);
    grad.addColorStop(1, selectedGradient.stops[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, actualWidth, actualHeight);

    // 2. Draw card shadow & rounded card
    const cardX = padding;
    const cardY = padding;
    const cardW = innerCardWidth;
    const cardH = innerCardHeight;
    const radius = 16;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fillStyle = '#1e1e1e';
    ctx.fill();
    ctx.restore();

    // Card border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Draw Title Bar with macOS 3 dots
    const dotsY = cardY + 18;
    const dotRadius = 5.5;

    // Red
    ctx.beginPath();
    ctx.arc(cardX + 20, dotsY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff5f56';
    ctx.fill();

    // Yellow
    ctx.beginPath();
    ctx.arc(cardX + 38, dotsY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffbd2e';
    ctx.fill();

    // Green
    ctx.beginPath();
    ctx.arc(cardX + 56, dotsY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#27c93f';
    ctx.fill();

    // Filename Pill
    ctx.font = `bold ${11}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(filename, cardX + cardW / 2, cardY + 22);

    // Divider
    ctx.strokeStyle = '#2b2b2b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + titleBarHeight);
    ctx.lineTo(cardX + cardW, cardY + titleBarHeight);
    ctx.stroke();

    // 4. Draw Code Lines
    ctx.font = `${fontSize}px 'Fira Code', 'Courier New', monospace`;
    ctx.textAlign = 'left';

    const startY = cardY + titleBarHeight + 22;
    lines.forEach((lineText, idx) => {
      const lineY = startY + idx * lineHeight;

      // Line Number
      if (showLineNumbers) {
        ctx.fillStyle = '#52525b';
        ctx.textAlign = 'right';
        ctx.fillText(String(idx + 1), cardX + gutterWidth - 14, lineY);
      }

      // Syntax-tinted text
      ctx.textAlign = 'left';
      const textX = cardX + gutterWidth + 14;

      const trimmed = lineText.trim();
      if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('--') || trimmed.startsWith('/*')) {
        ctx.fillStyle = '#6b7280'; // Comments
      } else if (trimmed.startsWith('def ') || trimmed.startsWith('class ') || trimmed.startsWith('function ') || trimmed.startsWith('CREATE ') || trimmed.startsWith('SELECT ')) {
        ctx.fillStyle = '#38bdf8'; // Keywords
      } else if (trimmed.includes('print(') || trimmed.includes('console.log(') || trimmed.includes('System.out')) {
        ctx.fillStyle = '#fbbf24'; // Built-in functions
      } else {
        ctx.fillStyle = '#e2e8f0'; // Normal text
      }

      ctx.fillText(lineText, textX, lineY);
    });

    // 5. Watermark Badge
    if (showWatermark) {
      const wmY = cardY + cardH - 12;
      ctx.font = `bold 10px system-ui, -apple-system, sans-serif`;
      ctx.fillStyle = '#ff6b00';
      ctx.textAlign = 'right';
      ctx.fillText(`⚡ MSK Code Playground • mskinstitute.in`, cardX + cardW - 16, wmY);
    }

    return canvas;
  };

  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      const canvas = await generateCanvas();
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename.replace(/\.[^/.]+$/, '')}-snippet.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Screenshot downloaded as high-res PNG!', { icon: '📸' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to export screenshot image');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    setIsCopying(true);
    try {
      const canvas = await generateCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Could not create PNG blob');
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          toast.success('Code image copied to clipboard!', { icon: '📋' });
        } else {
          // Fallback to download
          handleDownloadPng();
        }
      }, 'image/png');
    } catch (err) {
      console.warn('Clipboard write image error, falling back to download:', err);
      handleDownloadPng();
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1e1e1e] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#252526] border-b border-[#333]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-secondary to-amber-400 flex items-center justify-center text-white shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Export Beautiful Code Snippet</h2>
              <p className="text-[11px] text-slate-400">
                Generate high-resolution social code cards with MSK branding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-[#2a2d2e] border-b border-[#333] text-xs">
          {/* Gradient Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Theme:
            </span>
            <div className="flex items-center gap-1.5">
              {GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGradient(g)}
                  className={`w-6 h-6 rounded-full transition-transform cursor-pointer border ${
                    selectedGradient.id === g.id
                      ? 'scale-115 border-white ring-2 ring-secondary'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ background: g.background }}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Padding & Options */}
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Padding:</span>
              {[16, 32, 48].map((pad) => (
                <button
                  key={pad}
                  onClick={() => setPadding(pad)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    padding === pad ? 'bg-secondary text-white' : 'bg-[#1e1e1e] text-slate-400 hover:text-white'
                  }`}
                >
                  {pad}px
                </button>
              ))}
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[11px]">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
                className="rounded accent-secondary w-3.5 h-3.5"
              />
              <span>Line Numbers</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[11px]">
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="rounded accent-secondary w-3.5 h-3.5"
              />
              <span>MSK Watermark</span>
            </label>
          </div>
        </div>

        {/* Live Code Card Preview Area */}
        <div className="flex-1 p-6 overflow-auto bg-[#141414] flex items-center justify-center min-h-[300px]">
          <div
            ref={cardRef}
            className="rounded-2xl transition-all shadow-2xl max-w-full overflow-hidden"
            style={{
              background: selectedGradient.background,
              padding: `${padding}px`,
            }}
          >
            {/* Inner Dark Code Window */}
            <div className="bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden min-w-[340px] sm:min-w-[500px]">
              {/* macOS Window Controls Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#2b2b2b]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wide font-mono">
                  {filename}
                </span>
                <span className="w-10" />
              </div>

              {/* Code Preview Body */}
              <div className="p-4 font-mono text-[12px] leading-relaxed overflow-x-auto select-none">
                {lines.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    {showLineNumbers && (
                      <span className="w-6 text-right text-slate-600 select-none shrink-0 font-mono text-[11px]">
                        {i + 1}
                      </span>
                    )}
                    <span className="text-slate-200 whitespace-pre">{line || ' '}</span>
                  </div>
                ))}
              </div>

              {/* Watermark Footer */}
              {showWatermark && (
                <div className="px-4 py-1.5 bg-[#181818]/60 border-t border-[#2b2b2b] flex items-center justify-between text-[10px] text-slate-500 font-sans">
                  <span className="font-semibold text-secondary">MSK Institute of Technology</span>
                  <span>mskinstitute.in/playground</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#252526] border-t border-[#333]">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Exported as crystal-clear 2x Retina PNG format
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToClipboard}
              disabled={isCopying}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2d2d2d] hover:bg-[#3c3c3c] text-slate-200 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isCopying ? 'Copying...' : 'Copy Image'}</span>
            </button>
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-secondary hover:bg-secondary-light text-white font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting...' : 'Download PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
