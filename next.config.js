/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async redirects(){
return [{
  source:"/",
  destination:"/storage",
  permanent:true
}]
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
}

module.exports = nextConfig
