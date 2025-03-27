/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00d1b2',
        dark: {
          DEFAULT: '#1a1a1a',
          card: '#242424'
        }
      }
    }
  },
  plugins: []
}
