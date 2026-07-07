import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/:path*`,
      },
    ];
  },
};

export default nextConfig;
