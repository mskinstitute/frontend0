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
import 'prismjs/components/prism-markdown';

// Normalize language names to Prism grammar keys
export function normalizeLanguage(lang: string): string {
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
    case 'md':
    case 'markdown':
      return 'markdown';
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
    case 'md':
    case 'markdown':
      return 'Markdown';
    default:
      return lang ? lang.toUpperCase() : 'Code';
  }
}

export interface CodeToken {
  text: string;
  type?: string;
}

export type TokenizedLine = CodeToken[];

function flattenTokens(
  tokens: (string | Prism.Token)[],
  parentType?: string
): { text: string; type?: string }[] {
  const result: { text: string; type?: string }[] = [];
  for (const token of tokens) {
    if (typeof token === 'string') {
      result.push({ text: token, type: parentType });
    } else if (typeof token.content === 'string') {
      result.push({ text: token.content, type: token.type || parentType });
    } else if (Array.isArray(token.content)) {
      result.push(...flattenTokens(token.content, token.type || parentType));
    } else if (typeof token.content === 'object' && token.content !== null) {
      result.push(...flattenTokens([token.content as Prism.Token], token.type || parentType));
    }
  }
  return result;
}

function splitTokensIntoLines(tokens: { text: string; type?: string }[]): TokenizedLine[] {
  const lines: TokenizedLine[] = [[]];
  for (const tok of tokens) {
    const parts = tok.text.split('\n');
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        lines.push([]);
      }
      if (parts[i].length > 0) {
        lines[lines.length - 1].push({
          text: parts[i],
          type: tok.type,
        });
      }
    }
  }
  return lines;
}

/**
 * Tokenizes arbitrary code into per-line token arrays for exact syntax-highlighted rendering
 */
export function tokenizeCodeToLines(code: string, language: string): TokenizedLine[] {
  const normLang = normalizeLanguage(language);
  const grammar = Prism.languages[normLang] || Prism.languages.javascript || Prism.languages.clike;

  if (!grammar) {
    return code.split('\n').map((line) => [{ text: line }]);
  }

  try {
    const rawTokens = Prism.tokenize(code, grammar);
    const flatTokens = flattenTokens(rawTokens);
    return splitTokensIntoLines(flatTokens);
  } catch (err) {
    console.warn('Prism tokenize error:', err);
    return code.split('\n').map((line) => [{ text: line }]);
  }
}

/**
 * Provides vibrant One Dark / VS Code Dark syntax colors for each token type
 */
export function getTokenColor(type?: string, text?: string): string {
  const trimmed = (text || '').trim();

  // Known built-in functions & standard objects
  if (
    /^(print|len|range|enumerate|input|str|int|float|bool|list|dict|set|tuple|type|open|sum|min|max|abs|round|zip|map|filter|super|isinstance|issubclass)$/.test(
      trimmed
    )
  ) {
    return '#e5c07b'; // Golden yellow built-in function
  }
  if (
    /^(console|log|warn|error|Math|JSON|Promise|Array|Object|String|Number|Boolean|window|document)$/.test(
      trimmed
    )
  ) {
    return '#e5c07b';
  }

  if (!type) return '#e6edf3'; // Default clean off-white text

  switch (type) {
    case 'comment':
    case 'prolog':
    case 'doctype':
    case 'cdata':
      return '#768390'; // Muted slate gray for comments

    case 'string':
    case 'char':
    case 'attr-value':
      return '#98c379'; // Crisp vibrant green for strings

    case 'keyword':
    case 'boolean':
    case 'important':
      return '#c678dd'; // Radiant purple for keywords (for, in, def, class, return, etc.)

    case 'function':
    case 'function-variable':
    case 'builtin':
      return '#e5c07b'; // Golden yellow for function calls

    case 'number':
    case 'constant':
      return '#d19a66'; // Warm peach orange for numbers

    case 'operator':
      return '#56b6c2'; // Soft cyan for operators (=, +, -, etc.)

    case 'punctuation':
      return '#abb2bf'; // Muted gray for brackets and delimiters

    case 'class-name':
      return '#e5c07b'; // Golden amber for class names

    case 'tag':
      return '#e06c75'; // Soft coral red for HTML tags

    case 'attr-name':
    case 'property':
      return '#d19a66'; // Warm orange for attributes & object keys

    case 'variable':
    case 'interpolation':
      return '#e06c75'; // Soft coral for f-string variables / interpolations

    case 'regex':
      return '#98c379';

    case 'url':
    case 'link':
      return '#61afef';

    default:
      return '#e6edf3';
  }
}

