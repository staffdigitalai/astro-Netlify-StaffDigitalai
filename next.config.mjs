/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.staffdigital.ai',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/car-dealerships',
        destination: '/sectores/concesionarios',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
