/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/storage",
      //   permanent: true,
      // },
      {
        source: "/share",
        destination: "/share/user",
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
