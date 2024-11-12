/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#F44321"
      },
      fontFamily: {
        main: ["Ubuntu", "sans-serif"],
        "main-ar": ["El Messiri", "serif"]
      },
    },
  },
  plugins: [],
}
