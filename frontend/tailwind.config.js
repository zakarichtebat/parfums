/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#162a35',
          light: '#1d3846',
          dark: '#0f1f28',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#e0c069',
          soft: '#b8955a',
          dark: '#8c6d2f',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        // Particules de sillage : montent, derivent lateralement puis s'eteignent.
        drift: {
          '0%': { opacity: 0, transform: 'translate3d(0,0,0) scale(0.5)' },
          '15%': { opacity: 0.85 },
          '70%': { opacity: 0.35 },
          '100%': {
            opacity: 0,
            transform: 'translate3d(var(--drift-x,0), -150px, 0) scale(1.15)',
          },
        },
        // Le halo dore "respire" au moment du changement de flacon.
        halo: {
          '0%': { opacity: 0.35, transform: 'scale(0.9)' },
          '45%': { opacity: 1, transform: 'scale(1.06)' },
          '100%': { opacity: 0.6, transform: 'scale(1)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeUp: 'fadeUp .7s ease-out both',
        drift: 'drift 3s ease-out forwards',
        halo: 'halo 2.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
