/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

rewrites: async () => [
  {
    source: "/public/medicine_bow.html",
    destination: "/pages/api/pages.js",

    source: "/public/alien.html",
    destination: "/pages/api/pages.js",

    source: "/public/canyonlands.html",
    destination: "/pages/api/pages.js",

    source: "/public/crown.html",
    destination: "/pages/api/pages.js",

    source: "/public/cutting_board.html",
    destination: "/pages/api/pages.js",

    source: "/public/test.html",
    destination: "/pages/api/pages.js",
  },
],

module.exports = nextConfig
