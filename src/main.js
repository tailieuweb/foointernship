import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./assets/listStudents.scss";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
