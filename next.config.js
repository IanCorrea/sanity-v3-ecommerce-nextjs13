/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ["cdn.sanity.io", "cdn.shopify.com"],
  }
}

module.exports = nextConfig
