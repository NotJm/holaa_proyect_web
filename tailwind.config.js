const { addDynamicIconSelectors } = require('@iconify/tailwind');
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
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
    // addIconSelectors(['mdi', 'mdi-light', 'map']),
  ],
};
