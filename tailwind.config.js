// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#059669', // Slightly brighter Emerald
        'brand-primary-dark': '#047857',
        'brand-primary-light': '#a7f3d0', // Light mint for accents/bgs
        'brand-secondary': '#f59e0b', // Amber/Gold
        'brand-secondary-dark': '#d97706',
        'brand-bg': '#fdfdfd',      // Almost white, very clean
        'brand-bg-alt': '#f1f5f9', // Slightly off-white for contrast sections
        'brand-text': '#1e293b',    // Dark Slate Gray
        'brand-text-light': '#475569', // Lighter Slate Gray
        'brand-accent': '#ec4899', // Optional: A pop color (e.g., pink/rose) - use sparingly
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -15px rgba(0, 0, 0, 0.15)',
        'premium-lg': '0 20px 50px -20px rgba(0, 0, 0, 0.2)',
      },
      letterSpacing: {
        'wide-lg': '0.03em', // Slightly wider spacing for headings
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, #fdfdfd 0%, #f1f5f9 100%)', // Subtle bg gradient
      }
    },
  },
  plugins: [],
}