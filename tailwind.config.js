/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'], // Import via Google Fonts in index.css
        'body': ['"Inter"', 'sans-serif'],
      },
      colors: {
        'mod1-bg': '#F5F5F0',
        'mod1-text': '#2A2A2A',
        'mod2-bg': '#0B1120',
        'mod2-accent': '#00F0FF',
        'mod3-bg': '#4A3B32',
        'mod3-gold': '#D4AF37',
        'mod4-start': '#2E1065',
        'mod4-end': '#BE185D',
        'mod5-bg': '#FFF1F2',
        'mod5-text': '#881337',
      },
      backgroundImage: {
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
