/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  },
  // Allow unoptimized images (for development)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;