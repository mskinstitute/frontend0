import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import PythonVisualizerApp from '@/features/python-visualizer';
import PythonVisualizerSeoContent from '@/features/python-visualizer/PythonVisualizerSeoContent';

export const metadata: Metadata = {
  title: 'Online Python Code Visualizer & Step-by-Step Execution Tutor | MSK Institute',
  description:
    'Free in-browser Python Code Visualizer and execution tutor. Step forward and backward through Python code line-by-line. Visualize Call Stack frames, Heap memory pointers, object aliasing, Linked Lists, Binary Trees, 2D Matrices, and Recursion Trees with zero setup.',
  keywords: [
    'Python Visualizer Online',
    'Python Tutor In Browser',
    'Step by Step Python Execution',
    'Python Memory Visualizer',
    'Call Stack Visualizer',
    'Heap Memory Pointers Python',
    'Python Recursion Tree Visualizer',
    'Linked List Visualizer Python',
    'Binary Tree Visualizer Python',
    'Python 3 WebAssembly Visualizer',
    'Pyodide Python Visualizer',
    'Learn Python Visually',
    'MSK Python Visualizer',
    'Er Sumit Kumar Python Tools',
    'Free Online Python Debugger',
  ],
  alternates: {
    canonical: 'https://www.mskinstitute.in/tools/python-visualizer',
  },
  openGraph: {
    title: 'Online Python Code Visualizer & Step-by-Step Execution Tutor | MSK Institute',
    description:
      'Step through Python code line-by-line in your browser. Visualize Call Stacks, Heap Objects, Pointer Aliasing, Trees, and Recursion with Pyodide WebAssembly. 100% free and private.',
    url: 'https://www.mskinstitute.in/tools/python-visualizer',
    siteName: 'MSK Institute',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.mskinstitute.in/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'MSK Institute Online Python Code Visualizer & Step Execution Tutor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Python Code Visualizer & Memory Tutor | MSK Institute',
    description:
      'Inspect Python code execution step-by-step: Call Stack, Heap Memory, Pointers, Linked Lists, Binary Trees, and Recursion in your browser.',
    images: ['https://www.mskinstitute.in/logo.jpg'],
  },
};

export default function PythonVisualizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://www.mskinstitute.in/tools/python-visualizer#webapp',
        name: 'MSK Online Python Code Visualizer & Step-by-Step Tutor',
        url: 'https://www.mskinstitute.in/tools/python-visualizer',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Works in Chrome, Firefox, Edge, Safari.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Free in-browser Python execution visualizer supporting call stack inspection, heap memory references, linked list chains, binary search trees, 2D matrices, and recursion trees powered by Pyodide WebAssembly.',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'MSK Institute of Computer Technology',
          url: 'https://www.mskinstitute.in',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.mskinstitute.in/tools/python-visualizer#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.mskinstitute.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://www.mskinstitute.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Python Visualizer',
            item: 'https://www.mskinstitute.in/tools/python-visualizer',
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://www.mskinstitute.in/tools/python-visualizer#howto',
        name: 'How to Step Through and Visualize Python Code',
        description:
          'Step-by-step guide to run and inspect Python execution, stack frames, and heap memory using the MSK Python Visualizer.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Enter or Choose Python Code',
            text: 'Write Python code in the Monaco Editor or select an educational template (Object Aliasing, Linked Lists, Binary Trees, Recursion, 2D Matrix).',
            position: 1,
          },
          {
            '@type': 'HowToStep',
            name: 'Click Visualize',
            text: 'Press the Visualize button to compile and trace execution steps client-side using Pyodide WebAssembly.',
            position: 2,
          },
          {
            '@type': 'HowToStep',
            name: 'Step and Inspect Memory',
            text: 'Use the playback controls or arrow keys to step forward and backward. Switch between Memory & Stack, Tree & Linked List, 2D Matrix, and Recursion Tree tabs to inspect program state.',
            position: 3,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.mskinstitute.in/tools/python-visualizer#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I visualize any Python code with this tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can visualize primitives, lists, dictionaries, custom classes, object pointers, linked lists, binary trees, 2D coordinate matrices, and recursive functions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does my code run on a remote server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The visualizer runs Pyodide WebAssembly inside your browser. Your code never leaves your device, ensuring maximum privacy and zero latency.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-900 bg-slate-950/90 px-4 py-3 relative z-10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ol className="flex items-center gap-2 text-xs text-slate-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools" className="hover:text-white transition-colors">
                Tools
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-secondary font-semibold">Python Visualizer</span>
            </li>
          </ol>

          <div className="flex items-center gap-3">
            <Link
              href="/playground"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-light transition-colors"
            >
              <span>Code Playground</span>
              <span>&rarr;</span>
            </Link>
            <span className="text-slate-800">|</span>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Tools</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 md:p-6 flex flex-col">
        {/* Visualizer Hero Title */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Python Code Visualizer</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                All-in-One Engine
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Step through Python execution, inspect Stack Frames & Heap Object Pointers, and watch Linked Lists, Trees, Matrices, and Recursion come alive.
            </p>
          </div>
        </div>

        {/* Visualizer Workspace Window */}
        <div className="flex-1 w-full h-[76vh] min-h-[620px] flex flex-col mb-12">
          <Suspense
            fallback={
              <div className="w-full h-full min-h-[600px] bg-[#1e1e1e] rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                <span className="text-xs font-mono text-slate-400">
                  Initializing Python Code Visualizer...
                </span>
              </div>
            }
          >
            <PythonVisualizerApp />
          </Suspense>
        </div>

        {/* Educational SEO & Knowledge Base Content */}
        <PythonVisualizerSeoContent />
      </main>
    </div>
  );
}
