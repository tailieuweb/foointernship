import Vue from 'vue'
import Router from 'vue-router'
import Dangky from '../components/DangKy/SignUp.vue'
Vue.use(Router)

let baseRoutes = [
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
