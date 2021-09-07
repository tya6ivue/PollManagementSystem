import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { LayoutPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import { CardPlugin } from 'bootstrap-vue'
import { VBScrollspyPlugin } from 'bootstrap-vue'
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'




Vue.use(BootstrapVue, IconsPlugin)
Vue.use(LayoutPlugin, ModalPlugin, CardPlugin, VBScrollspyPlugin)
Vue.use(DropdownPlugin, TablePlugin)
Vue.config.productionTip = false

import {store} from './store/store'


Vue.use(VueRouter) 
const router  = new VueRouter({
  routes: routes,
  mode: "history"
})

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
