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
        cream: {
          50: "#fdf9f3",
          100: "#f9f0e1",
          200: "#f2dfc0",
          300: "#e8c98a",
          400: "#dcb057",
          500: "#c89535",
          600: "#a87828",
          700: "#885f22",
          800: "#6e4c20",
          900: "#5a3f1e",
        },
        olive: {
          50: "#f6f7f2",
          100: "#e9ece0",
          200: "#d3d9c3",
          300: "#b3be9b",
          400: "#93a073",
          500: "#768555",
          600: "#5d6a42",
          700: "#495436",
          800: "#3c452e",
          900: "#333b28",
        },
        warm: {
          50: "#faf8f5",
          100: "#f3ede4",
          200: "#e8d9c8",
          300: "#d8c0a5",
          400: "#c4a07e",
          500: "#b5875e",
          600: "#a57050",
          700: "#895b44",
          800: "#704b3b",
          900: "#5c3e33",
        },
        espresso: {
          50: "#f7f4f2",
          100: "#ede6e1",
          200: "#dccdc4",
          300: "#c5ac9e",
          400: "#ab8774",
          500: "#976d58",
          600: "#89594c",
          700: "#724940",
          800: "#5f3e38",
          900: "#3d2420",
          950: "#2a1814",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-up-slow": "fadeUp 1.2s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
