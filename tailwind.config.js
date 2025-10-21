/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red': '#da3b3b',
        'beige': '#F5EFE6',
        'dark-slate': '#2B2F3B',
        'card-bg': '#393E4A',
      },
    },
  },
  plugins: [],
}
