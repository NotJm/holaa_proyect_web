const { addDynamicIconSelectors } = require('@iconify/tailwind');
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {


      backgroundColor: {
        platinum: "#E0E0E0",
        cerise: "#E91E63",
        
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      textColor : {
        cerise: "#E91E63",
      },
      ringColor: {
        cerise: "#E91E63",
      },
      borderColor: {
        cerise: "#E91E63",
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
    addDynamicIconSelectors(),
  ],
};
