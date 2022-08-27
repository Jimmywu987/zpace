const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          color1: "#5455a9"

        },
        link: {
          normal: "#0f3057",
          bgHover: "#f5f5f5"
        },
        line: {
          normal: "#cecece"
        }
      }
    }
  },
  extend: {

  },
  plugins: [],
}