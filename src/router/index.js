import Vue from 'vue'
import Router from 'vue-router'
import AddSinhVien from '../components/AddSinhVien'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'AddSinhVien',
    component: AddSinhVien
  },
]

const router = new Router({
  routes
})

export default router
