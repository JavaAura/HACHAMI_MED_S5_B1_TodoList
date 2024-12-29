/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{
      'xs': '350px',
    },
    extend: {
      colors: {

      },
      fontFamily: {
        'montserrat': ['Montserrat','sans-serif'],
        'poppins': ['Poppins','sans-serif'],

      },
      fontSize: {
        'xxs': '.65rem'
      },

    }
  },
  plugins: [],
}
