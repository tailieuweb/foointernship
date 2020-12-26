import Vue from 'vue'
import Router from 'vue-router'
import ListStudents from '../components/DanhSachSinhVien/ListStudents'
import ExportStudentList from '../components/ExportList/ExportStudentList'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/ListStudents',
    name: 'ListStudents',
    component: ListStudents
  },
  {
    path: '/ExportStudents',
    name: 'ExportStudents',
    component: ExportStudentList
  }
  ,
  {
    path: '/diaryDetails',
    name: 'DiaryDetails'
  }
]

const router = new Router({
  routes
})

export default router
