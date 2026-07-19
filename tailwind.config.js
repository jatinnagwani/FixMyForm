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
keyframes: {
  scanline: {
    '0%': { top: '0%', opacity: '0' },
    '10%': { opacity: '1' },
    '90%': { opacity: '1' },
    '100%': { top: '100%', opacity: '0' },
  },
},
animation: {
  scanline: 'scanline 3s linear infinite',
},
  },
},
  plugins: [],
}