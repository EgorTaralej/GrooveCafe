/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Vinyl-black backgrounds
        ink: '#0b0b0c',
        charcoal: '#151515',
        graphite: '#1f1f21',
        smoke: '#2b2b2e',
        // Warm brass / amber accents (café lighting)
        amber: {
          300: '#f3d28a',
          400: '#e9b95a',
          500: '#d99a2b',
          600: '#b87a1a',
        },
        cream: '#f2e9d8',
        mute: '#9a9488',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(217,154,43,0.45)',
      },
      keyframes: {
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 14s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
