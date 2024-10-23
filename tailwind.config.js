const { addDynamicIconSelectors } = require('@iconify/tailwind');

// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      // Definir colores personalizados
      backgroundColor: {
        platinum: "#E0E0E0",
        cerise: "#E91E63",
        // Colores para modo oscuro
        'dark-background': '#1a202c', // Fondo en modo oscuro existente
        'dark-surface': '#2d3748', // Otro color de superficie oscuro existente
        'dark-alt-background': '#0d1117', // Nuevo color oscuro alternativo
      },
      textColor: {
        cerise: "#E91E63",
        // Colores de texto para modo oscuro
        'dark-text': '#f7fafc', // Texto claro en modo oscuro
      },
      ringColor: {
        cerise: "#E91E63",
      },
      borderColor: {
        cerise: "#E91E63",
        // Borde para modo oscuro
        'dark-border': '#4a5568', // Borde oscuro para componentes
      },
      fill: {
        platinum: "#E0E0E0",
        cerise: "#E91E63",
      },
      colors: {
        cerise: "#E91E63",
        gold: "#D4AF37",
        champagne: "#F7E7CE",
        pearl_gray: "#B0B0B0",
        blush_pink: "#F2C2D1",
        burgundy: "#800020",
        navy_blue: "#2C3E50",
        soft_mauve: "#D8BFD8",
        taupe: "#B38B6D",
        plum: "#8E4585",
        deepBurgundy: "#660016",
        strongCerise: "#D00050",
        darkCerise: "#A01744", 
        // Colores adicionales para modo oscuro
        'dark-cerise': '#7a0e30', // Variante oscura de cerise
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'slide-out': 'slideOut 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(), // Plugin para íconos
  ],
};
