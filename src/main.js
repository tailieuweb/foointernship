import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./assets/css/style.scss";
import "./assets/css/listStudents.scss";
import './assets/css/footer.scss';
import './assets/css/header.scss'

import JsonExcel from "vue-json-excel";

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import LayoutDefault from './layouts/LayoutDefault.vue';

Vue.component("downloadExcel", JsonExcel);

Vue.component("Header", Header);
Vue.component("Footer", Footer);

Vue.component("LayoutDefault", LayoutDefault);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
