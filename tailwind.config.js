/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'court-dark': '#0b140d',
        'court-green': '#16331f',
        'court-clay': '#d4673b',
      },
    },
  },
  plugins: [],
}
