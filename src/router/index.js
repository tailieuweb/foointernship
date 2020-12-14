import Vue from 'vue'
import Router from 'vue-router'
import ListKhoa from '../components/khoa/ListKhoa'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'ListKhoa',
    component: ListKhoa
  },
]

const router = new Router({
  routes
})

export default router
