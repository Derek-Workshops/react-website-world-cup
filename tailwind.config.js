/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wc-red': '#c8102e',
        'wc-blue': '#003087',
        'wc-gold': '#f5a623',
        'wc-dark': '#0a0a1a',
      },
    },
  },
  plugins: [],
}
