/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101A2E",
          50: "#F2F4F8",
          100: "#DEE3ED",
          200: "#B8C2D9",
          300: "#8E9DBF",
          400: "#5C6C8F",
          500: "#374763",
          600: "#243452",
          700: "#182543",
          800: "#101A2E",
          900: "#0A1120",
        },
        paper: {
          DEFAULT: "#F3F3EF",
          dim: "#E9E9E2",
        },
        marigold: {
          DEFAULT: "#E2A73E",
          light: "#F3C978",
          dark: "#B9832A",
        },
        teal: {
          deep: "#1F6F63",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,26,46,0.06), 0 4px 14px rgba(16,26,46,0.06)",
      },
    },
  },
  plugins: [],
};
