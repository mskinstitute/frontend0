import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
