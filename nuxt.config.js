export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'be-bul',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  serverMiddleware: ['~/api/index.js'], // [TODO] 미들웨어를 추가할 수 있는 연결 인스턴스를 내부적으로 생성
  // https://fkkmemi.github.io/nuxt/nuxt-003-routing/
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
