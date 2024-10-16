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
      fill: {
        platinum: "#E0E0E0",
        cerise: "#E91E63",
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    // addIconSelectors(['mdi', 'mdi-light', 'map']),
  ],
};
