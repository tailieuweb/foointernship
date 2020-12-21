import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListGroupInterShip',
    component: () => import('../views/ListGroupInterShip.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
