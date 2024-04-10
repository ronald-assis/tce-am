/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tceam-bi',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tceam-bi',
        basePath: false,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
