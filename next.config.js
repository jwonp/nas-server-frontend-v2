/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/users/temporary",
      },
      {
        source: "/admin/users",
        destination: "/admin/users/temporary",
      },
      {
        source: "/admin/storages",
        destination: "/admin/storages/temp",
      },
      {
        source: "/admin/shares",
        destination: "/admin/shares/team",
      },
      {
        source: "/admin/subscribes",
        destination: "/admin/subscribes/tier",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/users/temporary",
        permanent: true,
      },

      {
        source: "/api/auth/error",
        destination: "/auth/signin",
        has: [
          {
            type: "query",
            key: "error",
          },
        ],
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BUCKET_HOSTNAME,
        pathname: "/**/**",
      },
    ],
  },
};

module.exports = nextConfig;
