import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import DanhSachSinhVien from '../views/DanhSachSinhVien'
import ExportDanhSachSinhVien from '../views/ExportDanhSachSinhVien'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ListStudents',
    name: 'ListStudents',
    component: DanhSachSinhVien
  },
  {
    path: '/ExportStudents',
    name: 'ExportStudents',
    component: ExportDanhSachSinhVien
  }
  ,
  {
    path: '/diaryDetails/:id',
    name: 'DiaryDetails'
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
