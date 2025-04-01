// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        'shire-green': {
          light: '#8FBC8F', // DarkSeaGreen - Softer, natural light green
          DEFAULT: '#556B2F', // DarkOliveGreen - Earthy, sophisticated main green
          dark: '#2F4F4F',   // DarkSlateGray - Deep, slightly muted green/gray for text/accents
        },
        'shire-gold': {
          light: '#F5F5DC', // Beige - Soft, neutral, elegant light accent (replaces creamy gold)
          DEFAULT: '#C0A080', // Muted Bronze/Champagne - Sophisticated metallic accent (replaces mustardy gold)
          dark: '#8B4513',   // SaddleBrown - Rich, deep brown/bronze accent
        },
        'water-blue': {
          // Slightly softer blues for the gradients
          light: '#B0E0E6', // PowderBlue - Softer light blue
          DEFAULT: '#4682B4', // SteelBlue - Muted, sophisticated mid-blue
          dark: '#2C5B7B',   // Darker SteelBlue/Slate - Deep blue for accents/text
        },
        'cream': '#F8F6F0', // Warm off-white, slightly richer than pure white
        'charcoal': '#333333', // Dark gray for primary text, softer than pure black
        'white': '#FFFFFF',   // Pure white for high contrast elements (buttons, etc.)
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        'sans': ['"Lato"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'), // Uncomment if you use the typography plugin
  ],
}