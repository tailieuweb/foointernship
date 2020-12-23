import Vue from 'vue'
import Router from 'vue-router'
import Dangky from '../components/DangKy/SignUp.vue'
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
    component:Dangky
  }
]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: baseRoutes
})

export default router
