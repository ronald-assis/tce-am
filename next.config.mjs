/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tceam-dashboard',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tceam-dashboard',
        basePath: false,
        permanent: false,
      },
    ]
  },
  transpilePackages: ['lucide-react'],
}

export default nextConfig
