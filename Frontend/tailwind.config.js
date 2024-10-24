/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        themeBlue: '#003049',
      },
      backgroundImage:{
        blurbg: 'url(/src/assets/blurbg.jpg)'
      }
    },
  },
  plugins: [],
}

