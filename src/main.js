
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router'
import router from './router'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
