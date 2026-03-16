/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#08090c',
        surface: '#0f1117',
        surface2: '#161a24',
        border: '#1e2535',
        accent: '#00e5ff',
        accent2: '#7c3aed',
        accent3: '#f59e0b',
        muted: '#6b7494',
        success: '#10b981',
        danger: '#ef4444',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}