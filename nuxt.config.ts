// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image-edge', '@nuxtjs/supabase'],
  build: {
    transpile: ['@heroicons/vue']
  }
})
