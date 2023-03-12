export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Montserrat: true,
      'Lexend+Deca': true,
    },
  },
});
