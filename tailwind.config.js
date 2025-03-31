/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shire-green': {
          light: '#A3BDA4',
          DEFAULT: '#4A6A51',
          dark: '#2E4735',
        },
        'shire-gold': {
          light: '#FDEBC8',
          DEFAULT: '#E8B86B',
          dark: '#B5853C',
        },
      },
      fontFamily: {
         // Add the new fonts
         'sans': ['Lato', 'sans-serif'], // Body text
         'serif': ['Cormorant Garamond', 'serif'], // Headings
      }
    },
  },
  plugins: [],
}