import Prism from 'prismjs';

// Import essential languages
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup'; // html, xml
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

// Normalize language names to Prism grammar keys
function normalizeLanguage(lang: string): string {
  const l = (lang || '').toLowerCase().trim();
  switch (l) {
    case 'py':
    case 'python':
      return 'python';
    case 'c':
      return 'c';
    case 'cpp':
    case 'c++':
      return 'cpp';
    case 'java':
      return 'java';
    case 'js':
    case 'javascript':
      return 'javascript';
    case 'ts':
    case 'typescript':
      return 'typescript';
    case 'jsx':
      return 'jsx';
    case 'tsx':
      return 'tsx';
    case 'html':
    case 'xml':
      return 'markup';
    case 'css':
      return 'css';
    case 'sh':
    case 'bash':
    case 'shell':
    case 'zsh':
      return 'bash';
    case 'sql':
      return 'sql';
    case 'json':
      return 'json';
    default:
      return l;
  }
}

export function highlightCode(code: string, language: string): string {
  const normLang = normalizeLanguage(language);
  const grammar = Prism.languages[normLang];

  if (!grammar) {
    // Fallback: safe HTML escaping for plain text/output
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  try {
    return Prism.highlight(code, grammar, normLang);
  } catch {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

export function getLanguageDisplayName(lang: string): string {
  const l = (lang || '').toLowerCase().trim();
  switch (l) {
    case 'c':
      return 'C';
    case 'cpp':
    case 'c++':
      return 'C++';
    case 'java':
      return 'Java';
    case 'python':
    case 'py':
      return 'Python';
    case 'javascript':
    case 'js':
      return 'JavaScript';
    case 'typescript':
    case 'ts':
      return 'TypeScript';
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    case 'bash':
    case 'sh':
    case 'shell':
      return 'Bash / Terminal';
    case 'sql':
      return 'SQL';
    case 'json':
      return 'JSON';
    case 'text':
      return 'Output';
    default:
      return lang ? lang.toUpperCase() : 'Code';
  }
}
