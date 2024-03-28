/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#55efc4',
        'green-dark': '#00b894',
        'blue-light': '#BDDEFF',
        'blue-dark': '#0984E3',
        'orange-light': '#ffeaa7',
        'orange-dark': '#fdcb6e',
        'red-light': '#ff7675',
        'red-dark': '#d63031',
        'gray-light': '#636e72',
        'gray-dark': '#2d3436'
      },
    },
  },
  plugins: [],
};
