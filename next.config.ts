import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./public/**/*', './content/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/notes',
        destination: '/study-material',
        permanent: true,
      },
      {
        source: '/course',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/tutorials/css',
        destination: '/tutorials/css-for-beginners',
        permanent: true,
      },
      {
        source: '/tutorials/css-mastery/:topicSlug*',
        destination: '/tutorials/css-for-intermediate/:topicSlug*',
        permanent: true,
      },
      {
        source: '/tutorials/css-mastery',
        destination: '/tutorials/css-for-intermediate',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-masterclass/:topicSlug*',
        destination: '/tutorials/html5-complete-course/:topicSlug*',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-masterclass',
        destination: '/tutorials/html5-complete-course',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/colors',
        destination: '/tutorials/html5-complete-course/html-colors-rgb',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/html-colors-color-codes',
        destination: '/tutorials/html5-complete-course/html-colors-rgb',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/links-navigation-lists',
        destination: '/tutorials/html5-complete-course/links-hyperlinks',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/lists',
        destination: '/tutorials/html5-complete-course/unordered-ordered-lists',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/tables-structured-data',
        destination: '/tutorials/html5-complete-course/html-tables',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/tables',
        destination: '/tutorials/html5-complete-course/html-tables',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/block-and-inline',
        destination: '/tutorials/html5-complete-course/block-vs-inline-elements',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/images-multimedia-embeds',
        destination: '/tutorials/html5-complete-course/images-responsive-art',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/forms-inputs-validations',
        destination: '/tutorials/html5-complete-course/forms-input-types',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/html5-semantic-architecture',
        destination: '/tutorials/html5-complete-course/semantic-layout-elements',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-course/accessibility-aria-seo',
        destination: '/tutorials/html5-complete-course/accessibility-aria',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        source: '/(brand|icons|images|content)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
