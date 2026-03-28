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
      colors: {
        pdc: {
          bg: '#09090b',
          surface: '#18181b',
          border: 'rgba(255,255,255,0.08)',
          text: '#fafafa',
          overlay: 'rgba(0,0,0,0.5)',
          muted: '#71717a',
          accent: '#a78bfa',
          'accent-glow': 'rgba(167,139,250,0.15)',
          success: '#34d399',
          danger: '#f87171',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
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
        },
        "jump":{
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(0.5em)' },
          '100%': { transform: 'translateY(0em)'},
        },
      },
      animation: {
        "glowSpinL":"glowSpinL 4s ease-in-out infinite",
        "glowSpinR":"glowSpinR 4s ease-in-out infinite",
        "jump":"jump 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}