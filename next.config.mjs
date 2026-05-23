/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        // Supabase storage — for all product images
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        // Supabase storage fallback (custom domain projects)
        protocol: 'https',
        hostname: '*.supabase.in',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Cache optimised images for 1 week
    minimumCacheTTL: 604800,
    // Modern formats only
    formats: ['image/webp'],
  },
};

export default nextConfig;
