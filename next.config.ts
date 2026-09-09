import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/**': ['./public/**/*'],
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
        source: '/tutorials/html5-complete-masterclass/:topicSlug*',
        destination: '/tutorials/html5-complete-course/:topicSlug*',
        permanent: true,
      },
      {
        source: '/tutorials/html5-complete-masterclass',
        destination: '/tutorials/html5-complete-course',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
