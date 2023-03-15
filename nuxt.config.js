export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  googleFonts: {
    families: {
      Montserrat: true,
      "Lexend+Deca": true,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "event-list",
    },
  }
});
