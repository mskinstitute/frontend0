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

      </main>
    </div>
  );
}
