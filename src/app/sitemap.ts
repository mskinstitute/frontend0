import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { fetchCourses, fetchBlogs, fetchTutorials, fetchLiveBatches } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mskinstitute.in';

  // Base static routes - Canonical 200 OK routes only (excluding redirects like /notes)
  const routes = [
    '',
    '/courses',
    '/verify-certificate',
    '/study-material',
    '/careers',
    '/blogs',
    '/live',
    '/live-batches',
    '/tools',
    '/tools/typing',
    '/playground',
    '/contact',
    '/about',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : route === '/courses' || route === '/live-batches' ? 0.9 : 0.8,
  }));

  try {
    const [courses, blogs, tutorials, batches] = await Promise.all([
      fetchCourses(),
      fetchBlogs().catch(() => []),
      fetchTutorials().catch(() => []),
      fetchLiveBatches().catch(() => []),
    ]);

    const courseRoutes = courses
      .filter((course) => course.status === 'PUBLISH')
      .map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }));

    const batchRoutes = batches.map((batch) => ({
      url: `${baseUrl}/live-batches/${batch.id}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));

    const tutorialRoutes = tutorials.map((tut) => ({
      url: `${baseUrl}/tutorials/${tut.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const tutorialTopicRoutes: MetadataRoute.Sitemap = [];
    const tutorialsDir = path.join(process.cwd(), 'public', 'content', 'tutorials');
    if (fs.existsSync(tutorialsDir)) {
      for (const tut of tutorials) {
        const tutDir = path.join(tutorialsDir, tut.slug);
        if (fs.existsSync(tutDir)) {
          const files = fs.readdirSync(tutDir);
          for (const file of files) {
            if (file.endsWith('.md')) {
              const topicSlug = file.replace(/\.md$/, '');
              tutorialTopicRoutes.push({
                url: `${baseUrl}/tutorials/${tut.slug}/${topicSlug}`,
                lastModified: new Date().toISOString().split('T')[0],
                changeFrequency: 'monthly' as const,
                priority: 0.7,
              });
            }
          }
        }
      }
    }

    return [
      ...routes,
      ...courseRoutes,
      ...batchRoutes,
      ...blogRoutes,
      ...tutorialRoutes,
      ...tutorialTopicRoutes,
    ];
  } catch (error) {
    console.error('Error generating dynamic routes for sitemap:', error);
    return routes;
  }
}
