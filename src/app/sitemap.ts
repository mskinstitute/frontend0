import { MetadataRoute } from 'next';
import { fetchCourses, fetchBlogs, fetchTutorials } from '@/services/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mskinstitute.in';

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const [courses, blogs, tutorials] = await Promise.all([
      fetchCourses(),
      fetchBlogs().catch(() => []),
      fetchTutorials().catch(() => []),
    ]);

    const courseRoutes = courses
      .filter(course => course.status === 'PUBLISH')
      .map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const tutorialRoutes = tutorials.map((tut) => ({
      url: `${baseUrl}/tutorials/${tut.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...routes, ...courseRoutes, ...blogRoutes, ...tutorialRoutes];
  } catch (error) {
    console.error('Error generating dynamic routes for sitemap:', error);
    return routes;
  }
}
