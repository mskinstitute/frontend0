import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchTutorials } from '@/services/api';
import { fetchTutorialTopic } from '@/lib/server-tutorial';
import TutorialReader from '@/components/TutorialReader';

export const revalidate = 3600; // Cache for 1 hour (ISR)

interface TutorialTopicPageProps {
  params: Promise<{ slug: string; topicSlug: string }>;
}

export async function generateStaticParams() {
  const tutorials = await fetchTutorials();
  const paramsList: { slug: string; topicSlug: string }[] = [];

  for (const tut of tutorials) {
    try {
      const dirPath = path.join(process.cwd(), 'public', 'content', 'tutorials', tut.slug);
      const files = await fs.readdir(dirPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          paramsList.push({
            slug: tut.slug,
            topicSlug: file.replace(/\.md$/, ''),
          });
        }
      }
    } catch {
      // Fallback defaults if directory doesn't exist
      if (tut.slug === 'python-for-beginners') {
        paramsList.push({ slug: tut.slug, topicSlug: 'introduction-to-python' });
        paramsList.push({ slug: tut.slug, topicSlug: 'vscode-setup' });
      }
    }
  }

  return paramsList;
}

export async function generateMetadata({ params }: TutorialTopicPageProps): Promise<Metadata> {
  const { slug, topicSlug } = await params;
  const topicData = await fetchTutorialTopic(slug, topicSlug);
  if (!topicData) return { title: 'Lesson Not Found | MSK Institute' };

  const { frontmatter, tutorial } = topicData;
  return {
    title: `${frontmatter.title} - ${tutorial.title} Tutorial | MSK Notes`,
    description: frontmatter.description || `Read ${frontmatter.title} lesson with code examples, explanations, and practice quiz at MSK Institute.`,
    keywords: frontmatter.keywords || [tutorial.title?.toLowerCase() || 'code', 'tutorial', frontmatter.slug],
    alternates: {
      canonical: `https://mskinstitute.in/tutorials/${slug}/${topicSlug}`,
    },
    openGraph: {
      title: `${frontmatter.title} | ${tutorial.title} Tutorial`,
      description: frontmatter.description,
      url: `https://mskinstitute.in/tutorials/${slug}/${topicSlug}`,
    },
  };
}

export default async function TutorialTopicPage({ params }: TutorialTopicPageProps) {
  const { slug, topicSlug } = await params;
  const topicData = await fetchTutorialTopic(slug, topicSlug);

  if (!topicData) {
    notFound();
  }

  return (
    <TutorialReader
      tutorial={topicData.tutorial}
      course={topicData.course}
      frontmatter={topicData.frontmatter}
      markdownContent={topicData.content}
      prevTopic={topicData.prevTopic}
      nextTopic={topicData.nextTopic}
    />
  );
}
