import { MetadataRoute } from 'next';
import { fetchCourses, fetchBlogs, fetchTutorials, fetchLiveBatches } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mskinstitute.in';

  // Base static routes
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

    return [...routes, ...courseRoutes, ...batchRoutes, ...blogRoutes, ...tutorialRoutes];
  } catch (error) {
    console.error('Error generating dynamic routes for sitemap:', error);
    return routes;
  }
}
