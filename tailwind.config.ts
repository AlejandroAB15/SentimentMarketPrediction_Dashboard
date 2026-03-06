import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "system-ui", "sans-serif"],
        roboto: ["Roboto Flex", "system-ui", "sans-serif"],
      },
      colors: {

        background: "#131416",

        surface: {
          1: "#1a1c1f",
          2: "#24272b",
          3: "#2e3237",
        },

        primary: "#177c7c",
        primaryDark: "#21383b",

        text: "#dee2e6",

        success: "#0fba81",
        warning: "#d7ab46",
        danger: "#e43b59",
      }
    },
  },
  plugins: [],
}

export default config