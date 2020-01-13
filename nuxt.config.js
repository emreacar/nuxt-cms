require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap&subset=latin-ext' },
      { rel: 'stylesheet', href: '/css/fa.min.css' },
      { rel: 'stylesheet', href: '/css/quill.core.css' }
    ]
  },
  router: {
    middleware: 'stats'
  },
  /*
  ** Customize the progress-bar color
  ** I dont't know why, but when using custom loading screen, page transition brokes
  */
  //loading: '~/components/loading.vue',
  loading: {
    color: '#1d4895'
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/custom.scss',
    'swiper/dist/css/swiper.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/global',
    '~/plugins/vue-lazysizes.client.js',
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: "~/plugins/gmap.js", ssr: true }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],
  moment: {
    defaultLocale: 'tr',
    locales: ['tr']
  },
  eslint: {
    quite: true
  },
  /*
  ** Nuxt.js modules
  */
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    transpile: [/^vue2-google-maps($|\/)/],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    }
  }
}
