/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.postara.one",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;


module.exports = module.exports || {}; module.exports.headers = async () => ([{ source: '/api/postara/analytics/summary', headers: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }] }]);