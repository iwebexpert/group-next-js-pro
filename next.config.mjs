await import("./src/libs/check.js")

/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    TOKEN: process.env.TOKEN,
  },
  sassOptions: {
    implementation: "sass-embedded",
  },
}

export default nextConfig
