import { defineNuxtConfig } from 'nuxt/config'
import { searchForWorkspaceRoot } from 'vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'event-list'
    }
  },
  css: ['@/assets/css/fonts.css'],
  imports: {
    autoImport: false
  },
  vite: {
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/Users/jamesmartin/Workspace/gc-event-list/packages/gc-event-list/dist'
        ]
      }
    }
  }
})
