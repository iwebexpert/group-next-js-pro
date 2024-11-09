import type { Config } from "tailwindcss"
import flowbite from "flowbite-react/tailwind"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  safelist: ["text-blue-400"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#3490dc",
      },
      fontSize: {
        "custom-size": "1.25rem",
      },
      borderWidth: {
        "custom-width": "2px",
      },
    },
  },
  plugins: [flowbite.plugin()],
}
export default config
