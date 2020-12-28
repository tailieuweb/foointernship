import Vue from 'vue'
import Router from 'vue-router'
import ImportCSV from '../components/ImportCSV'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'ImportCSV',
    component: ImportCSV
  },
]

const router = new Router({
  routes
})

export default router
