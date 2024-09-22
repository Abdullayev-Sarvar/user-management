/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'bannerImg': 'url("/assets/background.eps")',
    },
  },
  plugins: [],
}