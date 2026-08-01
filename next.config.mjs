/** @type {import('next').NextEncoding} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build as well if needed
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;