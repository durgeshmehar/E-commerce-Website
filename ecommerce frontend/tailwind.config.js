/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '350px', // Add this line
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
        backgroundImage: theme => ({
        'error-page': "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
      })
      },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),],
}