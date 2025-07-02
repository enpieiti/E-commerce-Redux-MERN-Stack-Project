/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7e9c90",
        secondary: "#bfcb7f",
      },
    },
  },
  plugins: [],
};
