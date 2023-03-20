import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@formkit/nuxt'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'event-list'
    }
  },
  css: ['@/assets/css/fonts.css'],
  imports: {
    autoImport: false
  }
})
