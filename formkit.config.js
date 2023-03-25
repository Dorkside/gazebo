import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import genesis from '@formkit/themes/tailwindcss/genesis?inline'
import genesisPro from '@formkit/pro/genesis?inline'

import { createProPlugin, inputs } from '@formkit/pro'

export default {
  icons: {
    ...genesisIcons
  },
  config: {
    classes: generateClasses(genesis, genesisPro)
  },
  plugins: [
    createProPlugin('fk-495f738bf5', inputs)
  ]
}
