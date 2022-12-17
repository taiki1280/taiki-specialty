export default {
  router: {
    base: '/specialty/'
  },
  target: 'static',
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: 'たいきのほ～むぺ～じ',
    meta: [
      { name: 'google-site-verification', content: 'jAODd4kt_yrxVY5UsmJ-I_kSozhlEPO8p3TGj6Exkak' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      { hid: 'description', name: 'description', content: '初めてのたいきのホームページです。将棋・オセロが出来たり、たいきの事を少し知ることが出来ます。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/vue-scrollto'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  manifest: {
    name: "specialty",
    lang: 'ja',
  },
  styleResources: {
    stylus: [
      '~/assets/stylus/common.styl',
      '~/assets/stylus/mixin.styl'
    ]
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {},
}
