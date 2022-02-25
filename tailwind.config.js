module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./ui-kit/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: '#root',
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
}
