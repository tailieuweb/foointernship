import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let baseRoutes = [
 
]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: baseRoutes
})

export default router
