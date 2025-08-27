/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/Aryan-Walia',
  assetPrefix: '/Aryan-Walia/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
