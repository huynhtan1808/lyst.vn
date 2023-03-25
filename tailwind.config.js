/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        background: {
          DEFAULT: "#000000",
          200: "#666666",
          300: "#595959",
          400: "#4d4d4d",
          500: "#404040",
          600: "#333333",
          700: "#262626",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },
        typography: {
          DEFAULT: "#000000",
          secondary: colors.stone["300"],
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}