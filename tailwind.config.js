const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {
      animation: {
        pop: 'wiggle 1.5s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { opacity: 0 },
          '30%, 70%': { opacity: 1, transform: 'translateY(-2rem)' },
        },
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [forms, typography],
};
