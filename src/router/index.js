import Vue from 'vue'
import Router from 'vue-router'
import ListGV from '../components/DanhSachGiangVien/ListGV'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'ListGV',
    component: ListGV
  },
]

const router = new Router({
  routes
})

export default router
