/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Leaflet loads images from node_modules; Next needs this for default marker icons
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
