/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          customColors: {
            lightViolet: '#5c32d5',
            lightVioletTransparent: 'rgba(167, 139, 250, 0.5)'
          },
        },
      },
  },
  plugins: [],
};