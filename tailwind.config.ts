import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF4FF",
          100: "#D4E9FF",
          200: "#A8D2FF",
          300: "#7CBCFF",
          400: "#5EA8FF",
          500: "#2F6BFF",
          600: "#2555D4",
          700: "#1B3BA8",
          800: "#12304A",
          900: "#0A1F32",
        },
        secondary: {
          100: "#BEE9FF",
          200: "#8ACFFF",
          300: "#5EA8FF",
          400: "#3D8FFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 42, 0.08)",
      },
      spacing: {
        section: "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;

