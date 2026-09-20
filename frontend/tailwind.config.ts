import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            DEFAULT: "#F4D35E",
            50: "#FEFDF8",
            100: "#FDF9E7",
            200: "#FAF1C5",
            300: "#F7E69B",
            400: "#F4D35E",
            500: "#E8C238",
            600: "#C69F1B",
            700: "#9A7A0F",
          },
          green: {
            DEFAULT: "#587A4C",
            50: "#F3F7F1",
            100: "#E3EFE0",
            200: "#C7DEC1",
            300: "#A3C79A",
            400: "#7CA972",
            500: "#587A4C",
            600: "#44613B",
            700: "#32482B",
            800: "#22311D",
          },
          bg: "#FAF9F4",
          surface: "#FFFFFF",
          text: {
            DEFAULT: "#1F2933",
            secondary: "#667085",
            muted: "#9AA4B2",
          },
          border: "#E5E1D8",
          danger: {
            DEFAULT: "#C94C4C",
            light: "#FDF2F2",
          },
          warning: {
            DEFAULT: "#D89B28",
            light: "#FEF9EE",
          },
          success: {
            DEFAULT: "#587A4C",
            light: "#F3F7F1",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        card: "0 2px 6px rgba(31, 41, 51, 0.04), 0 1px 3px rgba(31, 41, 51, 0.02)",
        elevated: "0 10px 25px -5px rgba(31, 41, 51, 0.07), 0 8px 10px -6px rgba(31, 41, 51, 0.04)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
