/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette claire : ivoire pour le fond, sable pour les aplats,
        // encre chaude pour le texte.
        ivory: {
          DEFAULT: '#faf7f2',
          dark: '#f3ede3',
        },
        sand: {
          DEFAULT: '#efe6d9',
          dark: '#e0d3bf',
        },
        ink: {
          DEFAULT: '#2f2a24',
          light: '#5f574b',
          soft: '#8d8376',
        },
        // Conserve pour les rares aplats sombres (pinceau du titre).
        night: {
          DEFAULT: '#2f2a24',
          light: '#463f36',
          dark: '#1e1a16',
        },
        gold: {
          DEFAULT: '#b08d2e',
          light: '#d9b95c',
          soft: '#c2a15a',
          dark: '#7d6220',
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
        // Balayage lumineux sur les boutons dores.
        shine: {
          '0%': { transform: 'translateX(-130%) skewX(-20deg)' },
          '100%': { transform: 'translateX(240%) skewX(-20deg)' },
        },
        // Petit rebond du compteur du panier.
        bump: {
          '0%, 100%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.45)' },
          '65%': { transform: 'scale(0.92)' },
        },
        // Panneau de confirmation qui glisse depuis la droite.
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(120%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        // Descente de la barre de navigation compacte.
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-100%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
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
        drift: 'drift 1.2s ease-out forwards',
        halo: 'halo 2.4s ease-out forwards',
        shine: 'shine 1.1s ease-out',
        bump: 'bump .5s ease-out',
        slideDown: 'slideDown .45s ease-out both',
        slideInRight: 'slideInRight .45s cubic-bezier(0.22,0.61,0.36,1) both',
      },
    },
  },
  plugins: [],
}
