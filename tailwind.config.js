/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      },
      height: {
        'screen/2': '50vh',
        'screen/3': '33.333333vh',
        'screen/4': '25vh',
        'screen/5': '20vh',
        'min-[]': '[]'
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
        'layout-2': 'auto 1fr',
      },
    },
  },
  plugins: [],
}
