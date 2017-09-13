// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import('../node_modules/vuetify/dist/vuetify.min.css')
import('./styles/main.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueResource)

export const EventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
