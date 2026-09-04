import { Metadata } from 'next';
import { Suspense } from 'react';
import PlaygroundClient from '@/components/playground/PlaygroundClient';
import { Sparkles, Terminal, ShieldCheck, Zap, Laptop, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Interactive Online Code Playground & Compiler | MSK Institute',
  description:
    'Practice Python, HTML, CSS, JavaScript, and C++ with real-time in-browser code execution powered by Monaco Editor (VS Code) and Pyodide WebAssembly at MSK Institute Shikohabad.',
  keywords: [
    'Online Python Compiler',
    'Monaco Editor Online',
    'Interactive Code Playground',
    'MSK Institute Playground',
    'Web Development Sandbox',
    'Python WebAssembly Pyodide',
    'Shikohabad Coding Academy',
  ],
  alternates: {
    canonical: 'https://mskinstitute.in/playground',
  },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>MSK Code Playground</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30">
                  Interactive Lab
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Powered by Microsoft Monaco Editor & Pyodide WebAssembly. Zero installations required.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Client Execution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe Sandboxed Runtime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 flex flex-col">
        <div className="flex-1 w-full h-[75vh] min-h-[600px] flex flex-col">
          <Suspense
            fallback={
              <div className="w-full h-full min-h-[600px] bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <span className="text-xs font-mono">Initializing Code Playground...</span>
              </div>
            }
          >
            <PlaygroundClient />
          </Suspense>
        </div>

        {/* Feature Highlights beneath Playground */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-slate-400">
          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Terminal className="w-4 h-4 text-secondary" />
              <span>Python with Pyodide</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Run complete Python scripts directly inside your browser via WebAssembly. Standard library, loops, math, and data structures execute natively with zero latency.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Live Web Preview</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Build and preview responsive HTML, modern CSS, and JavaScript widgets in real-time within an isolated, sandboxed environment.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>VS Code Monaco Engine</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Experience industry-standard editing features including IntelliSense, syntax highlighting, bracket pairing, formatting, and custom themes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
