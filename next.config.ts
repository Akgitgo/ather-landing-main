import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(m3u8|ts)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
