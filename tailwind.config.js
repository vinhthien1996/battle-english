/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hacker: '#00ff00', // Adding custom 'hacker' green color
        dark: '#00140A',
        hred: '#ff0000'
      },
    },
  },
  plugins: [],
}
