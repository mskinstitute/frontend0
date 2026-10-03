'use client';

// Shared Pyodide WebAssembly Loader singleton

export interface PyodideInterface {
  runPython: (code: string) => any;
  runPythonAsync: (code: string) => Promise<any>;
  globals: any;
  FS: {
    writeFile: (path: string, data: string | Uint8Array, opts?: any) => void;
    readFile: (path: string, opts?: any) => string | Uint8Array;
    unlink: (path: string) => void;
    mkdir: (path: string) => void;
    mkdirTree?: (path: string) => void;
  };
  loadPackage?: (packages: string | string[]) => Promise<void>;
}

export async function getPyodideInstance(
  onProgress?: (status: string) => void
): Promise<PyodideInterface> {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide can only be initialized in the browser.');
  }

  const win = window as any;

  // 1. If already initialized, return it immediately
  if (win.__mskPyodideInstance) {
    return win.__mskPyodideInstance;
  }

  // 2. If already loading, await the existing promise
  if (win.__mskPyodideLoadingPromise) {
    return win.__mskPyodideLoadingPromise;
  }

  // 3. Initiate loading
  win.__mskPyodideLoadingPromise = (async () => {
    try {
      if (!win.loadPyodide) {
        onProgress?.('Fetching Python 3.12 WebAssembly binary...');
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly engine from CDN. Check your internet connection.'));
          document.head.appendChild(script);
        });
      }

      onProgress?.('Instantiating Python virtual machine...');
      if (!win.loadPyodide) {
        throw new Error('window.loadPyodide was not found after loading script.');
      }

      const pyodide = await win.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });

      win.__mskPyodideInstance = pyodide;
      onProgress?.('Python WebAssembly runtime is ready!');
      return pyodide;
    } catch (err) {
      win.__mskPyodideLoadingPromise = undefined;
      throw err;
    }
  })();

  return win.__mskPyodideLoadingPromise;
}
