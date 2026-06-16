/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
fontFamily: {
  heading: ['"Saira Condensed"', 'sans-serif'], // 🏋️‍♂️ Home Page Headings (Heavy Square Look)
  ui: ['Saira', 'sans-serif'],                 // ⚡ Home Page Descriptions & Cards
  nav: ['Syne', 'sans-serif'],                // 🎨 Navbar Elements (Stays Protected)
  ops: ['"Black Ops One"', 'system-ui'],       // 🪖 Brand Logo (Stays Protected)
},
  },
},
  plugins: [],
}