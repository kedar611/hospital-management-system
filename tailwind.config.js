/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hospital: {
          primary: '#007BFF',
          secondary: '#10B981',
          dark: '#1E293B',
          light: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}