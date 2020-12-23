import Vue from 'vue'
import Router from 'vue-router'
import DangKyDangnhap from '../components/DangKyDangnhap/SignUp.vue'
import Header from '../components/Header.vue'
Vue.use(Router)

let baseRoutes = [
  {
    path:'/header',
    name:"header",
    component:Header
  },
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
