/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

module.exports = nextConfig;
