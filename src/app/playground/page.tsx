import { Metadata } from 'next';
import { Suspense } from 'react';
import PlaygroundApp from '@/features/playground';

export const metadata: Metadata = {
  title: 'Interactive Online Code Playground & Compiler | MSK Institute',
  description:
    'Practice Python, HTML, CSS, JavaScript, SQL, and C/C++ with real-time in-browser code execution powered by Monaco Editor (VS Code) and Pyodide WebAssembly at MSK Institute Shikohabad.',
  keywords: [
    'Online Python Compiler',
    'Monaco Editor Online',
    'Interactive Code Playground',
    'MSK Institute Playground',
    'Web Development Sandbox',
    'Python WebAssembly Pyodide',
    'C C++ Online Compiler',
    'MySQL In-Browser Playground',
    'Shikohabad Coding Academy',
  ],
  alternates: {
    canonical: 'https://www.mskinstitute.in/playground',
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
              <div className="w-full h-full min-h-[600px] bg-[#1e1e1e] rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-slate-400">Initializing MSK Code Playground...</span>
              </div>
            }
          >
            <PlaygroundApp />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
