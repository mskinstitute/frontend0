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
    ];
  },
};

export default nextConfig;
