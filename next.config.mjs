import NextBundleAnalyzer from "@next/bundle-analyzer"

await import("./src/libs/check.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TOKEN: process.env.TOKEN,
  },
}

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
})(nextConfig)
