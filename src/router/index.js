import Vue from 'vue'
import Router from 'vue-router'
import ListStudents from '../components/DanhSachSinhVien/ListStudents'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'ListStudents',
    component: ListStudents
  },
]

const router = new Router({
  routes
})

export default router
