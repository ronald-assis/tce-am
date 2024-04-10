/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/tceam-dashboards',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tceam-dashboards',
        basePath: false,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
