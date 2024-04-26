/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "glowSpinL":{
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '25%': { transform: 'translateY(0.5em) translateX(-0.5em)' },
          '50%': { transform: 'translateY(0.8em) translateX(-0.5em)' },
          '75%': { transform: 'translateY(0.5em) translateX(0.5em)' },
          '100%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
        },
        "glowSpinR":{
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '25%': { transform: 'translateY(-0.5em) translateX(0.5em)' },
          '50%': { transform: 'translateY(0em) translateX(0.5em)' },
          '75%': { transform: 'translateY(0.5em) translateX(0em)' },
          '100%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
        }
      },
      animation: {
        "glowSpinL":"glowSpinL 4s ease-in-out infinite",
        "glowSpinR":"glowSpinR 4s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}