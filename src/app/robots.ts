import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Google-Extended', 'Anthropic-AI'],
        allow: ['/', '/courses/', '/about', '/contact'],
        disallow: ['/verify-certificate?id=*', '/admin'], // Protect private certificate details
      }
    ],
    sitemap: 'https://mskinstitute.in/sitemap.xml',
  };
}
