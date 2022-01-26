export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  loading : true, 
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AGIRPO',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/node_modules/ag-grid-community/dist/styles/ag-grid.css',
    '@/node_modules/ag-grid-community/dist/styles/ag-theme-material.css',
    '@/node_modules/ag-grid-community/dist/styles/webfont/agGridMaterialFont.css',
    // '@/node-modules/splitpanes/dist/splitpanes.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vueImport.js',
    {src: '~plugins/api_agipro.js'},
    {src:'~plugins/vue-js-modal.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    component: 'FaIcon',
    suffix: false,
    icons: {
      solid: true,
      brands: true
    }
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //Add axios like a module 
    '@nuxtjs/axios'
  ],

  styleResources:{
    scss:[
      '~/assets/SCSS/_colors.scss',
      '~/assets/SCSS/_fonts.scss'
    ]
  },
    //Configuration axios avec la base  url de l'api Agipro 
    axios :{
      baseURL :'http://localhost:5000/api/'
    },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}

}
