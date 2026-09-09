import fs from 'fs/promises';
import path from 'path';
import { parseFrontmatter } from '@/lib/markdown';
import { fetchTutorialBySlug } from '@/services/api';
import { TutorialTopicFrontmatter, Course, TutorialItem } from '@/types';

export async function fetchTutorialTopic(
  tutorialSlug: string,
  topicSlug: string
): Promise<{
  frontmatter: TutorialTopicFrontmatter;
  content: string;
  course: Course;
  tutorial: TutorialItem;
  prevTopic: { title: string; slug: string } | null;
  nextTopic: { title: string; slug: string } | null;
} | null> {
  const tutorialData = await fetchTutorialBySlug(tutorialSlug);
  if (!tutorialData) return null;

  const { tutorial, course } = tutorialData;

  // Flatten course topics to find current, previous, and next
  const flatTopics: { title: string; slug: string }[] = [];
  course.chapters?.forEach((ch) => {
    ch.topics?.forEach((t) => {
      const s =
        (t as any).slug ||
        t.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      flatTopics.push({ title: t.title, slug: s });
    });
  });

  const normalizedSlug = topicSlug.toLowerCase().trim();

  const currentIndex = flatTopics.findIndex((t) => {
    const s = t.slug.toLowerCase();
    return (
      s === normalizedSlug ||
      s.replace(/-/g, '') === normalizedSlug.replace(/-/g, '') ||
      (normalizedSlug === 'introduction' && (s === 'introduction-to-python' || s === 'introduction-to-html' || s === 'python-introduction')) ||
      (normalizedSlug === 'introduction-to-python' && (s === 'introduction' || s === 'introduction-to-python' || s === 'python-introduction')) ||
      (normalizedSlug === 'python-introduction' && (s === 'introduction' || s === 'introduction-to-python' || s === 'python-introduction')) ||
      (normalizedSlug === 'introduction-to-html' && (s === 'introduction' || s === 'introduction-to-html')) ||
      (normalizedSlug === 'vs-code-setup' && s === 'vscode-setup') ||
      (normalizedSlug === 'vscode-setup' && s === 'vs-code-setup')
    );
  });

  const prevTopic = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex !== -1 && currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;

  // Candidate file names to try
  const currentTopic = currentIndex !== -1 ? flatTopics[currentIndex] : null;
  const currentTopicFile = currentTopic
    ? `${currentTopic.slug}.md`
    : null;
  const currentTopicRawTitleFile = currentTopic
    ? `${currentTopic.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}.md`
    : null;

  const candidates = [
    `${normalizedSlug}.md`,
    currentTopicFile,
    currentTopicRawTitleFile,
    normalizedSlug === 'python-introduction' ? 'introduction-to-python.md' : null,
    normalizedSlug === 'python-introduction' ? 'introduction.md' : null,
    normalizedSlug === 'introduction-to-python' ? 'python-introduction.md' : null,
    normalizedSlug === 'introduction-to-python' ? 'introduction.md' : null,
    normalizedSlug === 'introduction' ? 'python-introduction.md' : null,
    normalizedSlug === 'introduction' ? 'introduction-to-python.md' : null,
    normalizedSlug === 'introduction-to-html' ? 'introduction.md' : null,
    normalizedSlug === 'introduction' ? 'introduction-to-html.md' : null,
    normalizedSlug === 'vs-code-setup' ? 'vscode-setup.md' : null,
    normalizedSlug === 'vscode-setup' ? 'vs-code-setup.md' : null,
    normalizedSlug === 'elements' || normalizedSlug === 'html-elements' ? 'elements.md' : null,
    normalizedSlug === 'attributes' || normalizedSlug === 'html-attributes' ? 'attributes.md' : null,
    normalizedSlug.includes('document-structure') ? 'basic-document-structure.md' : null,
    normalizedSlug.includes('document-structure') ? 'basic-document-structure-boilerplate.md' : null,
    normalizedSlug.includes('heading') ? 'html-headings.md' : null,
    normalizedSlug.includes('paragraph') ? 'paragraphs-line-breaks.md' : null,
    normalizedSlug.includes('formatting') ? 'text-elements-formatting.md' : null,
    normalizedSlug.includes('comment') ? 'html-comments.md' : null,
    normalizedSlug.includes('comment') ? 'comments.md' : null,
    normalizedSlug.includes('color') ? 'html-colors-color-codes.md' : null,
    normalizedSlug.includes('color') ? 'colors.md' : null,
    normalizedSlug.includes('link') ? 'links-navigation-lists.md' : null,
    normalizedSlug.includes('list') ? 'links-navigation-lists.md' : null,
    normalizedSlug.includes('table') ? 'tables-structured-data.md' : null,
    normalizedSlug.includes('inline') || normalizedSlug.includes('block') ? 'block-vs-inline-elements.md' : null,
    normalizedSlug.includes('inline') || normalizedSlug.includes('block') ? 'block-and-inline.md' : null,
    normalizedSlug.includes('media') || normalizedSlug.includes('image') || normalizedSlug.includes('video') ? 'images-multimedia-embeds.md' : null,
    normalizedSlug.includes('form') ? 'forms-inputs-validations.md' : null,
    normalizedSlug.includes('semantic') ? 'html5-semantic-architecture.md' : null,
    normalizedSlug.includes('accessibility') || normalizedSlug.includes('aria') ? 'accessibility-aria-seo.md' : null,
    'introduction.md',
    'introduction-to-html.md',
    'introduction-to-python.md',
  ].filter(Boolean) as string[];

  // Read the markdown file from disk
  let rawMarkdown = '';
  for (const filename of candidates) {
    try {
      const filePath = path.join(
        process.cwd(),
        'public',
        'content',
        'tutorials',
        tutorial.slug,
        filename
      );
      rawMarkdown = await fs.readFile(filePath, 'utf8');
      if (rawMarkdown) break;
    } catch {
      // Continue to next candidate
    }
  }

  if (!rawMarkdown) {
    return null;
  }

  const { frontmatter, content } = parseFrontmatter<TutorialTopicFrontmatter>(rawMarkdown);

  return {
    frontmatter: {
      ...frontmatter,
      title: frontmatter.title || flatTopics[currentIndex]?.title || 'Lesson',
      slug: topicSlug,
    },
    content,
    course,
    tutorial,
    prevTopic,
    nextTopic,
  };
}
