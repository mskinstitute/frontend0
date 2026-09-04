import { SupportedLanguage } from './types';

export interface RemoteExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  compilerError?: string;
  exitCode: number;
  elapsedMs: number;
}

const WANDBOX_COMPILERS: Partial<Record<SupportedLanguage, string>> = {
  c: 'gcc-13.2.0-c',
  cpp: 'gcc-13.2.0',
  java: 'openjdk-jdk-21+35',
};

/**
 * Execute C, C++, or Java code via Wandbox public online compiler API
 */
export async function runRemoteCode(
  language: SupportedLanguage,
  code: string,
  stdin: string = ''
): Promise<RemoteExecutionResult> {
  const compiler = WANDBOX_COMPILERS[language];
  if (!compiler) {
    throw new Error(`Remote compilation not configured for ${language}`);
  }

  // Pre-process Java: Wandbox compiles a file named prog.java.
  // A top-level 'public class Main' causes javac to require 'Main.java'.
  // Replacing 'public class' with 'class' allows smooth execution.
  let preparedCode = code;
  if (language === 'java') {
    preparedCode = code.replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)/g, 'class $1');
  }

  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        compiler,
        code: preparedCode,
        stdin: stdin || '',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Compiler API responded with HTTP status ${response.status}`);
    }

    const data = await response.json();
    const elapsedMs = Math.round(performance.now() - startTime);

    const exitCode = parseInt(data.status ?? '0', 10);
    const compilerError = (data.compiler_error || data.compiler_message || '').trim();
    const stdout = (data.program_output || '').trimEnd();
    const stderr = (data.program_error || '').trimEnd();

    return {
      success: exitCode === 0 && !compilerError,
      stdout,
      stderr,
      compilerError: compilerError || undefined,
      exitCode,
      elapsedMs,
    };
  } catch (err: unknown) {
    const elapsedMs = Math.round(performance.now() - startTime);
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        success: false,
        stdout: '',
        stderr: 'Execution timed out after 25 seconds.',
        exitCode: -1,
        elapsedMs,
      };
    }
    return {
      success: false,
      stdout: '',
      stderr: `Execution failed: ${err instanceof Error ? err.message : String(err)}`,
      exitCode: -1,
      elapsedMs,
    };
  }
}
