/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
fontFamily: {
  heading: ['Oswald', 'sans-serif'],
  ui: ['Syne', 'sans-serif'],
  ops: ['"Black Ops One"', 'system-ui'], // 🪖 New Military Stencil Font
},
  },
},
  plugins: [],
}