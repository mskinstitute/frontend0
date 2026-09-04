'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  SupportedLanguage, 
  ConsoleMessage, 
  PlaygroundSettings, 
  DEFAULT_PLAYGROUND_SETTINGS,
  CursorPosition,
  PlaygroundFile,
  SidebarView 
} from './types';
import { STARTER_TEMPLATES } from './templates';
import CodeEditor from './CodeEditor';
import WebPreview from './WebPreview';
import ConsoleOutput from './ConsoleOutput';
import PlaygroundSettingsModal from './PlaygroundSettingsModal';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';
import MobileSymbolsBar from './MobileSymbolsBar';
import ActivityBar from './ActivityBar';
import FileExplorerSidebar, { getFileIcon, detectLanguageFromExtension } from './FileExplorerSidebar';
import SearchSidebar from './SearchSidebar';
import { 
  Play, RotateCcw, Copy, Download, Maximize2, Minimize2, 
  Code2, Sparkles, Terminal, Eye, Check, Loader2, Settings, 
  Keyboard, SplitSquareHorizontal, SplitSquareVertical, 
  GitBranch, GripVertical, GripHorizontal, EyeOff, Layout,
  X, CheckCircle2, ChevronRight, FilePlus, Share2, Archive, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { editor } from 'monaco-editor';
import JSZip from 'jszip';
import ShareModal from './ShareModal';
import { runRemoteCode } from './compilerApi';

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  setStdout?: (options: { batched: (output: string) => void }) => void;
  setStderr?: (options: { batched: (output: string) => void }) => void;
  FS: {
    writeFile: (path: string, data: string | Uint8Array, options?: { encoding?: string }) => void;
    unlink: (path: string) => void;
  };
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
    __mskPyodideInstance?: PyodideInterface;
  }
}

interface PlaygroundClientProps {
  initialLanguage?: SupportedLanguage;
  initialCode?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

const SETTINGS_STORAGE_KEY = 'msk_vs_playground_settings';
const SPLIT_STORAGE_KEY = 'msk_playground_splitsize';

function buildInitialFiles(lang: SupportedLanguage, code: string): PlaygroundFile[] {
  switch (lang) {
    case 'html':
      return [
        {
          id: 'file-html-1',
          name: 'index.html',
          language: 'html',
          content: code,
          isRemovable: false,
        },
        {
          id: 'file-css-1',
          name: 'style.css',
          language: 'css',
          content: `/* Custom CSS for MSK Web Project */\n.card:hover {\n  box-shadow: 0 10px 30px rgba(2, 132, 199, 0.4);\n}\n`,
          isRemovable: true,
        },
        {
          id: 'file-js-1',
          name: 'script.js',
          language: 'javascript',
          content: `// Custom JavaScript\nconsole.log("Interactive script initialized!");\n`,
          isRemovable: true,
        },
      ];
    case 'python':
      return [
        {
          id: 'file-py-1',
          name: 'main.py',
          language: 'python',
          content: code,
          isRemovable: false,
        },
        {
          id: 'file-py-2',
          name: 'utils.py',
          language: 'python',
          content: `# MSK Institute - Reusable Helper Module\ndef greet(name="Student"):\n    return f"Welcome to MSK Institute, {name}!"\n\ndef calculate_discount(fee, percent):\n    return fee - (fee * percent / 100)\n`,
          isRemovable: true,
        },
      ];
    case 'javascript':
      return [
        {
          id: 'file-js-main',
          name: 'main.js',
          language: 'javascript',
          content: code,
          isRemovable: false,
        },
        {
          id: 'file-js-helper',
          name: 'helper.js',
          language: 'javascript',
          content: `// Helper module\nexport function formatINR(amount) {\n  return "₹" + Number(amount).toLocaleString("en-IN");\n}\n`,
          isRemovable: true,
        },
      ];
    case 'typescript':
      return [
        {
          id: 'file-ts-main',
          name: 'app.ts',
          language: 'typescript',
          content: code,
          isRemovable: false,
        },
      ];
    case 'cpp':
      return [
        {
          id: 'file-cpp-main',
          name: 'main.cpp',
          language: 'cpp',
          content: code,
          isRemovable: false,
        },
      ];
    case 'c':
      return [
        {
          id: 'file-c-main',
          name: 'main.c',
          language: 'c',
          content: code,
          isRemovable: false,
        },
      ];
    case 'java':
      return [
        {
          id: 'file-java-main',
          name: 'Main.java',
          language: 'java',
          content: code,
          isRemovable: false,
        },
      ];
    default:
      return [
        {
          id: 'file-default',
          name: 'code.txt',
          language: lang,
          content: code,
          isRemovable: false,
        },
      ];
  }
}

export default function PlaygroundClient({
  initialLanguage = 'python',
  initialCode,
  isModal = false,
  onCloseModal,
}: PlaygroundClientProps) {
  const searchParams = useSearchParams();

  // Read URL query params (?lang=python&code=...)
  const queryLang = searchParams?.get('lang') as SupportedLanguage | null;
  const queryCode = searchParams?.get('code');

  const resolvedInitialLang: SupportedLanguage =
    queryLang && STARTER_TEMPLATES[queryLang] ? queryLang : initialLanguage;
  const resolvedInitialCode = queryCode
    ? decodeURIComponent(queryCode)
    : initialCode || STARTER_TEMPLATES[resolvedInitialLang]?.[0]?.code || '';

  // Multi-file state
  const [language, setLanguage] = useState<SupportedLanguage>(resolvedInitialLang);
  const [files, setFiles] = useState<PlaygroundFile[]>(() =>
    buildInitialFiles(resolvedInitialLang, resolvedInitialCode)
  );
  const [activeFileId, setActiveFileId] = useState<string>(() => files[0]?.id || 'file-1');
  const [openTabIds, setOpenTabIds] = useState<string[]>(() => files.map((f) => f.id));

  // Sidebar view ('explorer', 'search', or closed/null)
  const [sidebarView, setSidebarView] = useState<SidebarView>(null);

  // Active terminal / preview tab
  const [activeTab, setActiveTab] = useState<'preview' | 'terminal'>(
    resolvedInitialLang === 'html' ? 'preview' : 'terminal'
  );
  const [logs, setLogs] = useState<ConsoleMessage[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    STARTER_TEMPLATES[resolvedInitialLang]?.[0]?.id || ''
  );

  // Custom Standard Input (stdin) for input(), scanf(), cin
  const [stdin, setStdin] = useState<string>('');

  // Share Modal & Download Menu State
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState<boolean>(false);

  // VS Code Settings
  const [settings, setSettings] = useState<PlaygroundSettings>(DEFAULT_PLAYGROUND_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Status bar cursor line & column
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ lineNumber: 1, column: 1 });

  // Output panel open/close state
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);

  // Mobile mode tab switch (editor vs output on screens < 768px)
  const [mobileActiveView, setMobileActiveView] = useState<'editor' | 'output'>('editor');

  // Draggable resizer state (percentage of container for editor)
  const [splitPercent, setSplitPercent] = useState<number>(55);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Fullscreen & Focus Mode
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Active file derivation
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];
  const activeCode = activeFile?.content || '';

  // Load saved settings & split percentage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
      const savedSplit = localStorage.getItem(SPLIT_STORAGE_KEY);
      if (savedSplit) {
        const parsed = parseFloat(savedSplit);
        if (!isNaN(parsed) && parsed >= 20 && parsed <= 80) {
          setSplitPercent(parsed);
        }
      }
    } catch (err) {
      console.warn('Could not read saved playground settings:', err);
    }

    // Check URL hash for shared code: #lang=python&code=...
    try {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hashStr = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hashStr);
        const sharedLang = hashParams.get('lang') as SupportedLanguage | null;
        const rawCode = hashParams.get('code');

        if (sharedLang && rawCode) {
          let decoded = rawCode;
          try {
            decoded = decodeURIComponent(escape(atob(rawCode)));
          } catch {
            decoded = decodeURIComponent(rawCode);
          }

          setLanguage(sharedLang);
          const newFiles = buildInitialFiles(sharedLang, decoded);
          setFiles(newFiles);
          setActiveFileId(newFiles[0].id);
          setOpenTabIds(newFiles.map((f) => f.id));
          toast.success(`Loaded shared ${sharedLang} workspace!`, { icon: '🔗' });
        }
      }
    } catch (hashErr) {
      console.warn('Could not parse shared URL hash:', hashErr);
    }
  }, []);

  // Global keyboard shortcuts (Ctrl+`, Ctrl+Shift+E, Ctrl+Shift+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ctrl + ` (backtick) -> toggle terminal
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.code === 'Backquote')) {
        e.preventDefault();
        setIsPanelOpen((prev) => !prev);
      }
      // 2. Ctrl + Shift + E -> toggle explorer
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setSidebarView((prev) => (prev === 'explorer' ? null : 'explorer'));
      }
      // 3. Ctrl + Shift + F -> toggle search
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setSidebarView((prev) => (prev === 'search' ? null : 'search'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persist settings changes
  const updateSettings = useCallback((newSettings: Partial<PlaygroundSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not save settings:', err);
      }
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_PLAYGROUND_SETTINGS);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_PLAYGROUND_SETTINGS));
      toast.success('Settings reset to defaults');
    } catch {
      // ignore
    }
  }, []);

  // Add log to console
  const addLog = useCallback((type: ConsoleMessage['type'], content: string) => {
    const newLog: ConsoleMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLogs((prev) => [...prev, newLog]);
  }, []);

  // Handle active file code edit
  const handleCodeChange = (newVal: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newVal } : f))
    );
  };

  // Insert symbol or text at current cursor (for mobile toolbar)
  const insertTextAtCursor = useCallback((text: string) => {
    if (!editorInstanceRef.current) return;
    const ed = editorInstanceRef.current;
    const selection = ed.getSelection();
    if (selection) {
      ed.executeEdits('mobile-symbols', [
        {
          range: selection,
          text,
          forceMoveMarkers: true,
        },
      ]);
      ed.focus();
    }
  }, []);

  const insertTab = useCallback(() => {
    const spaces = ' '.repeat(settings.tabSize);
    insertTextAtCursor(spaces);
  }, [insertTextAtCursor, settings.tabSize]);

  // File management
  const handleSelectFile = (fileId: string) => {
    setActiveFileId(fileId);
    if (!openTabIds.includes(fileId)) {
      setOpenTabIds((prev) => [...prev, fileId]);
    }
  };

  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openTabIds.length <= 1) return; // Keep at least one tab open
    const newTabs = openTabIds.filter((id) => id !== fileId);
    setOpenTabIds(newTabs);
    if (activeFileId === fileId) {
      setActiveFileId(newTabs[0]);
    }
  };

  const handleCreateFile = (name: string, lang: SupportedLanguage) => {
    const newFile: PlaygroundFile = {
      id: 'file-' + Math.random().toString(36).substring(2, 9),
      name,
      language: lang,
      content: lang === 'python' ? `# ${name}\n` : `/* ${name} */\n`,
      isRemovable: true,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setOpenTabIds((prev) => [...prev, newFile.id]);
  };

  const handleDeleteFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file || !file.isRemovable) return;

    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    setOpenTabIds((prev) => prev.filter((id) => id !== fileId));
    if (activeFileId === fileId) {
      const remaining = files.filter((f) => f.id !== fileId);
      if (remaining.length > 0) {
        setActiveFileId(remaining[0].id);
      }
    }
    toast.success(`Deleted ${file.name}`);
  };

  // Jump to line from Search result
  const handleSelectSearchResult = (fileId: string, lineNumber: number, column: number) => {
    handleSelectFile(fileId);
    setTimeout(() => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.revealLineInCenter(lineNumber);
        editorInstanceRef.current.setPosition({ lineNumber, column });
        editorInstanceRef.current.focus();
      }
    }, 50);
  };

  // When language changes from dropdown, re-build starter files
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    const templates = STARTER_TEMPLATES[newLang] || [];
    const initialTplCode = templates.length > 0 ? templates[0].code : '';
    if (templates.length > 0) {
      setSelectedTemplateId(templates[0].id);
    }
    const newFiles = buildInitialFiles(newLang, initialTplCode);
    setFiles(newFiles);
    setActiveFileId(newFiles[0].id);
    setOpenTabIds(newFiles.map((f) => f.id));

    if (newLang === 'html') {
      setActiveTab('preview');
    } else {
      setActiveTab('terminal');
    }
    setLogs([]);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const templates = STARTER_TEMPLATES[language] || [];
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl) {
      const newFiles = buildInitialFiles(language, tpl.code);
      setFiles(newFiles);
      setActiveFileId(newFiles[0].id);
      setOpenTabIds(newFiles.map((f) => f.id));
      setLogs([]);
      toast.success(`Loaded template: ${tpl.title}`);
    }
  };

  // Pyodide loader
  const initPyodide = useCallback(async (): Promise<PyodideInterface | null> => {
    if (typeof window === 'undefined') return null;
    if (window.__mskPyodideInstance) {
      return window.__mskPyodideInstance;
    }

    setIsPyodideLoading(true);
    addLog('info', '⚡ Initializing Python WebAssembly runtime (Pyodide v0.26)...');

    try {
      if (!window.loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Pyodide from CDN'));
          document.head.appendChild(script);
        });
      }

      if (window.loadPyodide) {
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        });
        window.__mskPyodideInstance = pyodide;
        addLog('success', '✅ Python runtime ready! Ready to execute Python code.');
        setIsPyodideLoading(false);
        return pyodide;
      }
      return null;
    } catch (err) {
      console.error('Pyodide initialization error:', err);
      addLog('error', `Failed to initialize Python runtime: ${err instanceof Error ? err.message : String(err)}`);
      setIsPyodideLoading(false);
      return null;
    }
  }, [addLog]);

  // Execute Code Logic
  const handleRunCode = async () => {
    setIsRunning(true);
    setIsPanelOpen(true);
    setMobileActiveView('output');
    const startTime = performance.now();

    if (language === 'html') {
      setActiveTab('preview');
      addLog('success', '🚀 Rendered Web Preview successfully.');
      setIsRunning(false);
      return;
    }

    setActiveTab('terminal');

    if (language === 'python') {
      try {
        const pyodide = await initPyodide();
        if (!pyodide) {
          throw new Error('Python runtime could not be loaded.');
        }

        // 1. Sync ALL workspace files to Pyodide's virtual in-memory filesystem!
        // This allows `import utils` and file reading to work naturally!
        for (const file of files) {
          try {
            pyodide.FS.writeFile(file.name, file.content);
          } catch (fsErr) {
            console.warn(`Could not sync ${file.name} to Pyodide FS:`, fsErr);
          }
        }

        // 2. Identify the main file to run (e.g. main.py or currently active file)
        const fileToRun = files.find((f) => f.name === 'main.py') || activeFile;

        const harness = `
import sys
from io import StringIO

_stdin_buffer = StringIO("""${stdin.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"')}""")
_stdout_buffer = StringIO()
_stderr_buffer = StringIO()
_original_stdin = sys.stdin
_original_stdout = sys.stdout
_original_stderr = sys.stderr

sys.stdin = _stdin_buffer
sys.stdout = _stdout_buffer
sys.stderr = _stderr_buffer

try:
${fileToRun.content.split('\n').map((line) => '    ' + line).join('\n')}
except Exception as e:
    import traceback
    sys.stderr.write(traceback.format_exc())
finally:
    sys.stdin = _original_stdin
    sys.stdout = _original_stdout
    sys.stderr = _original_stderr

_out_result = _stdout_buffer.getvalue()
_err_result = _stderr_buffer.getvalue()
(_out_result, _err_result)
`;

        const [stdoutResult, stderrResult] = (await pyodide.runPythonAsync(harness)) as [string, string];
        const elapsed = (performance.now() - startTime).toFixed(1);

        if (stdoutResult) {
          addLog('log', stdoutResult.trimEnd());
        }
        if (stderrResult) {
          addLog('error', stderrResult.trimEnd());
        }
        if (!stdoutResult && !stderrResult) {
          addLog('info', '(Program executed successfully with no printed output)');
        }

        addLog('success', `Done in ${elapsed}ms`);
      } catch (err) {
        addLog('error', String(err));
      } finally {
        setIsRunning(false);
      }
      return;
    }

    if (language === 'javascript' || language === 'typescript') {
      try {
        const capturedLogs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args: unknown[]) => {
          capturedLogs.push(
            args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
          );
        };
        console.error = (...args: unknown[]) => {
          capturedLogs.push(
            '[ERROR] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
          );
        };
        console.warn = (...args: unknown[]) => {
          capturedLogs.push(
            '[WARN] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ')
          );
        };

        const fileToRun = files.find((f) => f.name === 'main.js') || activeFile;
        // eslint-disable-next-line no-new-func
        const fn = new Function(fileToRun.content);
        const result = fn();

        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;

        const elapsed = (performance.now() - startTime).toFixed(1);

        if (capturedLogs.length > 0) {
          capturedLogs.forEach((line) => {
            if (line.startsWith('[ERROR]')) addLog('error', line.replace('[ERROR] ', ''));
            else if (line.startsWith('[WARN]')) addLog('warn', line.replace('[WARN] ', ''));
            else addLog('log', line);
          });
        }

        if (result !== undefined) {
          addLog('info', `Returned: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`);
        }

        if (capturedLogs.length === 0 && result === undefined) {
          addLog('info', '(Executed with no output. Use console.log() to view values)');
        }

        addLog('success', `Done in ${elapsed}ms`);
      } catch (err) {
        addLog('error', String(err));
      } finally {
        setIsRunning(false);
      }
      return;
    }

    if (language === 'c' || language === 'cpp' || language === 'java') {
      addLog('info', `⚡ Compiling and executing ${language.toUpperCase()} via GCC / OpenJDK online runtime...`);
      const fileToRun = files.find((f) => f.language === language) || activeFile;

      try {
        const result = await runRemoteCode(language, fileToRun.content, stdin);
        const elapsed = result.elapsedMs;

        if (result.compilerError) {
          addLog('error', result.compilerError);
        }
        if (result.stderr) {
          addLog('error', result.stderr);
        }
        if (result.stdout) {
          addLog('log', result.stdout);
        }

        if (result.success) {
          if (!result.stdout && !result.stderr) {
            addLog('info', '(Program completed successfully with no printed output)');
          }
          addLog('success', `Process exited with code ${result.exitCode} (${elapsed}ms)`);
        } else {
          if (!result.compilerError && !result.stderr) {
            addLog('error', `Process terminated with exit code ${result.exitCode} (${elapsed}ms)`);
          }
        }
      } catch (remoteErr) {
        addLog('error', `Execution failed: ${remoteErr instanceof Error ? remoteErr.message : String(remoteErr)}`);
      } finally {
        setIsRunning(false);
      }
      return;
    }

    const elapsed = (performance.now() - startTime).toFixed(1);
    addLog('success', `Parsed in ${elapsed}ms`);
    setIsRunning(false);
  };

  // Quick Save & Format (Ctrl + S)
  const handleSaveDocument = () => {
    toast.success(`Formatted & saved ${activeFile.name}`, {
      icon: '💾',
      duration: 2500,
    });
  };

  // Copy Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    toast.success(`Copied ${activeFile.name} code!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Download File
  const handleDownloadFile = () => {
    const filename = activeFile.name;
    const blob = new Blob([activeCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${filename}`);
    setIsDownloadMenuOpen(false);
  };

  // Download Entire Project as ZIP
  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file.content);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${language}-project-msk.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${files.length} files as ZIP!`);
      setIsDownloadMenuOpen(false);
    } catch (err) {
      console.error('Error generating zip:', err);
      toast.error('Failed to export ZIP file');
    }
  };

  // Reset Code
  const handleResetCode = () => {
    const templates = STARTER_TEMPLATES[language] || [];
    const tpl = templates.find((t) => t.id === selectedTemplateId) || templates[0];
    if (tpl) {
      const newFiles = buildInitialFiles(language, tpl.code);
      setFiles(newFiles);
      setActiveFileId(newFiles[0].id);
      setOpenTabIds(newFiles.map((f) => f.id));
      setLogs([]);
      toast.success('Workspace reset to template');
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Draggable Resizer Handler
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      let newPercent = splitPercent;
      if (settings.panelPosition === 'right') {
        const offset = clientX - rect.left;
        newPercent = (offset / rect.width) * 100;
      } else {
        const offset = clientY - rect.top;
        newPercent = (offset / rect.height) * 100;
      }

      // Clamp between 20% and 80%
      const clamped = Math.max(20, Math.min(80, newPercent));
      setSplitPercent(clamped);
      try {
        localStorage.setItem(SPLIT_STORAGE_KEY, clamped.toString());
      } catch {
        // ignore
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, settings.panelPosition, splitPercent]);

  // Combine HTML, CSS, and JS for Web Preview
  const getCompositeHtml = () => {
    const htmlFile = files.find((f) => f.name.endsWith('.html')) || activeFile;
    const cssFile = files.find((f) => f.name.endsWith('.css'));
    const jsFile = files.find((f) => f.name.endsWith('.js'));

    let content = htmlFile?.content || '';

    // Inject CSS if external CSS file exists and is not already inline
    if (cssFile && cssFile.content && !content.includes(cssFile.content)) {
      if (content.includes('</head>')) {
        content = content.replace('</head>', `<style>\n${cssFile.content}\n</style>\n</head>`);
      } else {
        content = `<style>\n${cssFile.content}\n</style>\n` + content;
      }
    }

    // Inject JS if external JS file exists and is not already inline
    if (jsFile && jsFile.content && !content.includes(jsFile.content)) {
      if (content.includes('</body>')) {
        content = content.replace('</body>', `<script>\n${jsFile.content}\n</script>\n</body>`);
      } else {
        content = content + `\n<script>\n${jsFile.content}\n</script>`;
      }
    }

    return content;
  };

  const templatesForLang = STARTER_TEMPLATES[language] || [];

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-[#1e1e1e] text-slate-200 overflow-hidden select-none ${
        settings.focusMode || isFullscreen
          ? 'fixed inset-0 z-[100] w-screen h-screen rounded-none'
          : 'w-full h-full rounded-xl border border-slate-800 shadow-2xl'
      } ${settings.theme === 'light' ? 'theme-light' : ''}`}
      style={{ minHeight: isModal ? '550px' : '650px' }}
    >
      {/* 1. TOP VS CODE TITLE & ACTION TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#181818] border-b border-[#2b2b2b] text-xs">
        {/* Left: Brand + Language Picker + Templates */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-2 pr-2 border-r border-[#333]">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-secondary to-orange-400 flex items-center justify-center text-white shadow-xs">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:inline">
              <span className="text-secondary font-extrabold">MSK</span> Code Playground
            </span>
          </div>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-[#252526] border border-[#3c3c3c] hover:border-[#007acc] text-slate-100 text-xs rounded px-2.5 py-1 font-medium focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer transition-colors"
          >
            <option value="python">🐍 Python (Pyodide)</option>
            <option value="html">🌐 Web (HTML / CSS / JS)</option>
            <option value="javascript">⚡ JavaScript (ES6+)</option>
            <option value="typescript">🔷 TypeScript</option>
            <option value="cpp">⚙️ C++ (OOP & DSA)</option>
            <option value="c">🔧 C Programming</option>
            <option value="java">☕ Java</option>
          </select>

          {/* Starter Templates */}
          {templatesForLang.length > 0 && (
            <select
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="hidden md:block bg-[#252526] border border-[#3c3c3c] hover:border-[#007acc] text-slate-300 text-xs rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer transition-colors max-w-[200px] truncate"
              title="Load Starter Template"
            >
              {templatesForLang.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Right: Primary Run Button & Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PRIMARY RUN CODE BUTTON */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isPyodideLoading}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1 bg-[#0e639c] hover:bg-[#1177bb] active:scale-95 text-white font-bold rounded shadow-xs transition-all cursor-pointer disabled:opacity-50 text-xs"
            title="Run Code (Ctrl + Enter)"
          >
            {isRunning || isPyodideLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isPyodideLoading ? 'Loading Pyodide...' : isRunning ? 'Running...' : 'Run'}</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 bg-[#094771] rounded text-[9px] font-mono text-slate-200">
              Ctrl+Enter
            </kbd>
          </button>

          {/* Panel Position Toggle: Right vs Bottom */}
          <button
            onClick={() =>
              updateSettings({
                panelPosition: settings.panelPosition === 'right' ? 'bottom' : 'right',
              })
            }
            title={
              settings.panelPosition === 'right'
                ? 'Move Panel to Bottom (Integrated Terminal)'
                : 'Move Panel to Right (Split View)'
            }
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer hidden sm:flex items-center gap-1"
          >
            {settings.panelPosition === 'right' ? (
              <SplitSquareVertical className="w-4 h-4" />
            ) : (
              <SplitSquareHorizontal className="w-4 h-4" />
            )}
          </button>

          {/* Focus Mode (Zen Mode) */}
          <button
            onClick={() => updateSettings({ focusMode: !settings.focusMode })}
            title={settings.focusMode ? 'Exit Focus Mode' : 'Focus Mode (Distraction-Free)'}
            className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 text-xs ${
              settings.focusMode
                ? 'bg-secondary text-white font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#2a2d2e]'
            }`}
          >
            {settings.focusMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden xl:inline">{settings.focusMode ? 'Zen: On' : 'Focus'}</span>
          </button>

          {/* Reset Template */}
          <button
            onClick={handleResetCode}
            title="Reset to original template"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Share Code & QR Code */}
          <button
            onClick={() => setIsShareOpen(true)}
            title="Share Code via Link & QR Code"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/30 rounded font-semibold text-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            title="Copy Editor Code"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
          >
            {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Download Menu (File vs ZIP) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
              title="Download Code File or ZIP"
              className="flex items-center gap-1 p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isDownloadMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-[#1e1e1e] border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in">
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-[11px] truncate">Download {activeFile.name}</span>
                    <span className="text-[10px] text-slate-400">Current active file</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  className="w-full flex items-center gap-2 px-2.5 py-2 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors text-left border-t border-slate-800/80 mt-1 cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-[11px] truncate">Download Project (.ZIP)</span>
                    <span className="text-[10px] text-slate-400">All {files.length} workspace files</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Dialog */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            title="Keyboard Shortcuts Cheat Sheet"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Settings Modal Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="VS Code Editor Settings"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Modal if inside dialog */}
          {isModal && onCloseModal && (
            <button
              onClick={onCloseModal}
              className="ml-1 px-2 py-1 text-slate-300 hover:text-white bg-[#333] hover:bg-[#444] rounded text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* 2. MOBILE VIEW SWITCHER TABS (on screens < 768px) */}
      <div className="md:hidden flex items-center bg-[#252526] border-b border-[#333] text-xs">
        <button
          type="button"
          onClick={() => setMobileActiveView('editor')}
          className={`flex-1 py-2 text-center font-semibold transition-colors ${
            mobileActiveView === 'editor'
              ? 'bg-[#1e1e1e] text-secondary border-b-2 border-secondary'
              : 'text-slate-400'
          }`}
        >
          💻 Code ({activeFile?.name})
        </button>
        <button
          type="button"
          onClick={() => setMobileActiveView('output')}
          className={`flex-1 py-2 text-center font-semibold transition-colors ${
            mobileActiveView === 'output'
              ? 'bg-[#1e1e1e] text-secondary border-b-2 border-secondary'
              : 'text-slate-400'
          }`}
        >
          ⚡ Output / Preview {logs.length > 0 && `(${logs.length})`}
        </button>
      </div>

      {/* 3. MAIN WORKSPACE WITH ACTIVITY BAR, SIDEBAR, EDITOR & OUTPUT */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Activity Bar (VS Code Left Strip) */}
        <ActivityBar
          activeView={sidebarView}
          onToggleView={(view) => setSidebarView(view)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Collapsible Sidebar: Explorer or Search */}
        {sidebarView === 'explorer' && (
          <FileExplorerSidebar
            files={files}
            activeFileId={activeFileId}
            onSelectFile={handleSelectFile}
            onCreateFile={handleCreateFile}
            onDeleteFile={handleDeleteFile}
            onClose={() => setSidebarView(null)}
          />
        )}

        {sidebarView === 'search' && (
          <SearchSidebar
            files={files}
            onSelectResult={handleSelectSearchResult}
            onClose={() => setSidebarView(null)}
          />
        )}

        {/* Workspace Split (Editor on Left/Top, Output on Right/Bottom) */}
        <div
          className={`flex-1 flex min-h-0 overflow-hidden relative ${
            settings.panelPosition === 'bottom' ? 'flex-col' : 'flex-col md:flex-row'
          }`}
        >
          {/* Editor & Multi-Tab Container */}
          <div
            className={`flex flex-col overflow-hidden ${
              mobileActiveView === 'output' ? 'hidden md:flex' : 'flex'
            }`}
            style={{
              flex: isPanelOpen
                ? typeof window !== 'undefined' && window.innerWidth < 768
                  ? '1 1 100%'
                  : `${splitPercent} 1 0%`
                : '1 1 100%',
            }}
          >
            {/* Multi-File Tab Bar */}
            <div className="flex items-center justify-between bg-[#252526] border-b border-[#1e1e1e] px-1 text-xs overflow-x-auto no-scrollbar">
              <div className="flex items-center">
                {openTabIds.map((tabId) => {
                  const file = files.find((f) => f.id === tabId);
                  if (!file) return null;
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`group flex items-center gap-2 px-3 py-1.5 cursor-pointer border-r border-[#2d2d2d] font-mono text-[11px] select-none transition-colors ${
                        isActive
                          ? 'bg-[#1e1e1e] border-t-2 border-t-secondary text-white font-semibold'
                          : 'bg-[#2d2d2d]/60 text-slate-400 hover:bg-[#2d2d2d] hover:text-slate-200'
                      }`}
                    >
                      <span>{getFileIcon(file.language)}</span>
                      <span>{file.name}</span>
                      {openTabIds.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => handleCloseTab(file.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white hover:bg-[#333] rounded"
                          title="Close Tab"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick action: toggle output panel */}
              <button
                onClick={() => setIsPanelOpen((prev) => !prev)}
                title={
                  isPanelOpen
                    ? 'Hide Terminal / Preview Panel (Ctrl + B)'
                    : 'Show Terminal / Preview Panel (Ctrl + B)'
                }
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#333] transition-colors hidden md:block"
              >
                {settings.panelPosition === 'right' ? (
                  <SplitSquareHorizontal className="w-3.5 h-3.5" />
                ) : (
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Editor Component */}
            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#1e1e1e]">
              <CodeEditor
                value={activeCode}
                onChange={handleCodeChange}
                language={activeFile?.language || language}
                settings={settings}
                onRun={handleRunCode}
                onSave={handleSaveDocument}
                onTogglePanel={() => setIsPanelOpen((prev) => !prev)}
                onToggleTerminal={() => {
                  setIsPanelOpen(true);
                  setActiveTab('terminal');
                }}
                onToggleExplorer={() =>
                  setSidebarView((prev) => (prev === 'explorer' ? null : 'explorer'))
                }
                onToggleSearch={() =>
                  setSidebarView((prev) => (prev === 'search' ? null : 'search'))
                }
                onCursorChange={(pos) => setCursorPos(pos)}
                onMountEditor={(ed) => {
                  editorInstanceRef.current = ed;
                }}
              />
            </div>

            {/* Mobile Quick Symbols Bar */}
            <MobileSymbolsBar
              onInsertSymbol={insertTextAtCursor}
              onInsertTab={insertTab}
            />
          </div>

          {/* DRAGGABLE RESIZER DIVIDER (Visible on Desktop when panel is open) */}
          {isPanelOpen && (
            <div
              onMouseDown={startDragging}
              onTouchStart={startDragging}
              title="Drag to resize panels"
              className={`hidden md:flex items-center justify-center bg-[#2b2b2b] hover:bg-secondary transition-colors z-20 select-none ${
                settings.panelPosition === 'right'
                  ? 'w-1.5 cursor-col-resize hover:w-2'
                  : 'h-1.5 cursor-row-resize hover:h-2'
              } ${isDragging ? 'bg-secondary w-2' : ''}`}
            >
              {settings.panelPosition === 'right' ? (
                <GripVertical className="w-3 h-3 text-slate-500 pointer-events-none opacity-40" />
              ) : (
                <GripHorizontal className="w-3 h-3 text-slate-500 pointer-events-none opacity-40" />
              )}
            </div>
          )}

          {/* RIGHT / BOTTOM: Terminal & Live Preview Output */}
          {isPanelOpen && (
            <div
              className={`flex flex-col bg-[#1e1e1e] overflow-hidden ${
                mobileActiveView === 'editor' ? 'hidden md:flex' : 'flex'
              }`}
              style={{
                flex:
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? '1 1 100%'
                    : `${100 - splitPercent} 1 0%`,
              }}
            >
              {/* Panel Tabs Bar (VS Code Integrated Terminal / Output Tab) */}
              <div className="flex items-center justify-between px-3 bg-[#252526] border-b border-[#1e1e1e] text-xs">
                <div className="flex items-center gap-1">
                  {language === 'html' && (
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors cursor-pointer text-xs ${
                        activeTab === 'preview'
                          ? 'text-white border-b-2 border-secondary font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-secondary" />
                      <span>Live Preview</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors cursor-pointer text-xs ${
                      activeTab === 'terminal'
                        ? 'text-white border-b-2 border-secondary font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Terminal Console</span>
                    {logs.length > 0 && (
                      <span className="px-1.5 py-0.2 bg-[#333] text-slate-300 rounded text-[10px]">
                        {logs.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Panel Actions: Move Right/Bottom + Close */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      updateSettings({
                        panelPosition: settings.panelPosition === 'right' ? 'bottom' : 'right',
                      })
                    }
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#333] transition-colors"
                    title={
                      settings.panelPosition === 'right' ? 'Move to Bottom' : 'Move to Right'
                    }
                  >
                    {settings.panelPosition === 'right' ? (
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                    ) : (
                      <SplitSquareHorizontal className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-[#333] transition-colors"
                    title="Close Panel (Ctrl + B)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Panel Tab Content */}
              <div className="flex-1 overflow-hidden relative">
                {activeTab === 'preview' && language === 'html' ? (
                  <WebPreview
                    htmlCode={getCompositeHtml()}
                    onConsoleLog={(msg) => addLog(msg.type, msg.content)}
                  />
                ) : (
                  <ConsoleOutput
                    logs={logs}
                    onClear={() => setLogs([])}
                    isRunning={isRunning || isPyodideLoading}
                    stdin={stdin}
                    onStdinChange={setStdin}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. VS CODE STATUS BAR (Bottom) */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] font-sans font-medium select-none overflow-x-auto no-scrollbar">
        {/* Left Side: Git Branch, Diagnostics, Line & Column */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>

          <div className="flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
            <CheckCircle2 className="w-3 h-3" />
            <span>0</span>
          </div>

          <div className="flex items-center gap-1 font-mono">
            <span>
              Ln {cursorPos.lineNumber}, Col {cursorPos.column}
            </span>
          </div>
        </div>

        {/* Right Side: Indent, Encoding, End-of-line, Language, Shortcuts, Settings */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateSettings({ tabSize: settings.tabSize === 4 ? 2 : 4 })}
            className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer"
            title="Click to toggle Spaces: 2 / 4"
          >
            Spaces: {settings.tabSize}
          </button>

          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">LF</span>

          <span className="capitalize font-semibold">{activeFile?.language || language}</span>

          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer"
            title="Shortcuts Cheat Sheet"
          >
            <Keyboard className="w-3 h-3" />
            <span className="hidden md:inline">Shortcuts</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hover:bg-white/20 p-1 rounded cursor-pointer"
            title="Settings"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 5. VS CODE SETTINGS MODAL */}
      <PlaygroundSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetDefaults={resetSettings}
      />

      {/* 6. KEYBOARD SHORTCUTS CHEAT SHEET MODAL */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* 7. SHARE CODE VIA URL & QR MODAL */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        language={language}
        code={activeCode}
        filename={activeFile?.name}
      />
    </div>
  );
}
