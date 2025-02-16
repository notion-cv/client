import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    proxyTimeout: 1000 * 60 * 3, // 추후 lambda 호출 api만 처리
  },
};

export default nextConfig;
