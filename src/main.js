import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { LoaderPlugin } from 'vue-google-login';
//scss của footer
import './assets/css/footer.scss';
//scss của appvue
import './assets/css/appvue.scss';
//scss của header
import './assets/css/header.scss';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
