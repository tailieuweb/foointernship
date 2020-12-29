import Vue from 'vue'
import Router from 'vue-router'
import DangKyDangnhap from '../components/DangKyDangnhap/SignUp.vue'
Vue.use(Router)

let baseRoutes = [
  {
    path:'/',
    name:"hi",
    component:DangKyDangnhap
  }
]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: baseRoutes
})

export default router
