import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  HelpCircle,
  BookOpen,
  GitBranch,
  Network,
  Grid,
} from 'lucide-react';

export default function PythonVisualizerSeoContent() {
  const faqs = [
    {
      q: 'How does the in-browser Python Code Visualizer work without a backend server?',
      a: 'The MSK Python Code Visualizer runs Pyodide WebAssembly (Python 3.12 compiled directly to Wasm). When you click Visualize, a Python tracing harness uses sys.settrace() to inspect every variable, scope frame, and heap reference microsecond-by-microsecond. Everything runs 100% locally in your browser with zero server latency and complete privacy.',
    },
    {
      q: 'Can it visualize any type of Python code?',
      a: 'Yes! The visualizer supports primitives (integers, floats, strings, booleans), collections (lists, tuples, dictionaries, sets), nested 2D matrices, pointer references (aliasing and mutability), custom object-oriented classes, linked lists, binary search trees, and recursive function calls.',
    },
    {
      q: 'How does it help students learn Python memory management and pointers?',
      a: 'Unlike static compilers, this visualizer shows the Object Heap with memory IDs. When you assign `b = a` where `a` is a list, you visually see both pointers pointing to the exact same heap memory block. When `b.append(10)` runs, students instantly see why `a` changes as well — demystifying mutability vs immutability.',
    },
    {
      q: 'What is the Recursion Tree visualizer?',
      a: 'When executing recursive algorithms like Fibonacci or Factorial, the visualizer maps each recursive call depth, tracks parameters passed into each branch, and shows returned values during the backtracking phase.',
    },
    {
      q: 'Is there a limit to how many steps can be visualized?',
      a: 'To protect your browser against infinite loops (such as `while True:` without a break condition), the execution tracer safely caps execution at 500 steps.',
    },
  ];

  return (
    <section className="mt-12 space-y-12 text-slate-300">
      {/* Visualizer Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Call Stack & Scope Tracking</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inspect active function call frames, local variables, parameter bindings, and global scope in real time as the execution pointer moves through your script.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Heap Memory & Pointer Aliasing</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            See how lists, dictionaries, sets, and custom class instances are allocated in the heap. Understand pointer aliasing, shallow copying, and object mutability visually.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Network className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Trees, Lists & Recursion Views</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Auto-detects data structures! Watch singly linked lists connect with <code className="text-purple-300">.next</code>, binary trees branch with left/right nodes, and recursive functions build call trees.
          </p>
        </div>
      </div>

      {/* Deep-Dive Guide Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-secondary" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Mastering Python Code Execution Step-by-Step
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-400 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1. Step Forward & Backward (Time-Travel Debugging)
            </h3>
            <p>
              Traditional debuggers make it difficult to revisit previous states when you step too far. With MSK Python Visualizer, you can step forward and backward or scrub the slider to analyze variable modifications across any line of execution.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Synchronized Console Stdout
            </h3>
            <p>
              See exactly which <code className="text-cyan-300">print()</code> statements produce output on which line. As you step backward, the console output rolls back to match the exact program state at that moment.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              3. Visual Pointers on Data Structures (DSA)
            </h3>
            <p>
              When reversing a linked list or traversing an array, variable pointers like <code className="text-amber-300">curr</code>, <code className="text-amber-300">prev</code>, and <code className="text-amber-300">head</code> are tagged right above the corresponding node in memory.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              4. 2D Coordinate Grid Detection
            </h3>
            <p>
              Working on matrix multiplication, game development, or dynamic programming tables? The visualizer auto-detects uniform 2D lists and renders a coordinate grid with active <code className="text-purple-300">[row][col]</code> cell highlights.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2"
            >
              <h3 className="text-xs sm:text-sm font-semibold text-slate-200">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
