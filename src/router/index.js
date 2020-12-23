import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/Header.vue'
Vue.use(Router)

let baseRoutes = [
  {
    path:'/',
    name:"header",
    component:Header
  }
]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: baseRoutes
})

export default router
