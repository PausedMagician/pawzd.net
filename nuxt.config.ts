// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@nuxt/hints',
    '@nuxt/image',
    '@artmizu/nuxt-prometheus',
    '@nuxt/content'
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    disableTransition: false
  },
  ui: {
    prose: true
  },

  runtimeConfig: {
    public: {
      hostUrl: process.env.HOST_URL
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/todo': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    preset: 'bun'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  image: {

  },
  prometheus: {
    verbose: false
  }
})
