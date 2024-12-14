import NextBundleAnalyzer from "@next/bundle-analyzer"

await import("./src/libs/check.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TOKEN: process.env.TOKEN,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_HOST,
        pathname: `/${process.env.NEXT_PUBLIC_S3_BUCKET_ID}/images/**`,
      },
    ],
  },
}

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
})(nextConfig)
