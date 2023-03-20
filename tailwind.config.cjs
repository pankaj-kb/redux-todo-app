/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'todoNavy' : '#111C2F',
      'todoYellow' : '#FEF970',
      'todoBlue':  '#9DECFF',
      'todoPurple': '#597CCB',
    },
    extend: {},
  },
  plugins: [],
}