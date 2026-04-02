/**
 * Next.js 15 Configuration — Nexus AI Design Template
 * Frontend-only configuration for the design template.
 * Backend/security headers live in the platform repo.
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization domains
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.nexus-ai.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },

  // No trailing slashes
  trailingSlash: false,

  // Ignore ESLint during build (lint separately)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors during build (check separately)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
