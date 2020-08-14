import Vue from 'vue'
import App from './App.vue'
import VTooltip from 'v-tooltip'
import VueHighlightJS from 'vue-highlightjs'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/theme.css'
import {router} from './router'
import VueCodemirror from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'

// import more codemirror resource...

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)

Vue.use(VueMaterial)
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)
var VueScrollTo = require('vue-scrollto');

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})


Vue.config.productionTip = false
Vue.use(VTooltip)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
