const { addDynamicIconSelectors } = require('@iconify/tailwind')

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      serif: ['Lexend Deca', 'serif']
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    addDynamicIconSelectors(),
    require('@formkit/themes/tailwindcss')
  ],
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs'
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#5540BF'
        }
      }
    ]
  }
}
