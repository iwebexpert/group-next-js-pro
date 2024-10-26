await import("./src/libs/check.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TOKEN: process.env.TOKEN,
  },
}

export default nextConfig
