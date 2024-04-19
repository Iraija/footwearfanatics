/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f4f4f4",
        "secondary": "#242424",
      }
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    container: {
      padding: "3rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "1024px",
    },
  },
  plugins: [],
}