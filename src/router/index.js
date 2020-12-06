import Vue from 'vue'
import VueRouter from 'vue-router'
import DsTuan from '../components/NhatKyThucTap/DsTuan'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'danhsachtuan',
    component: 
      DsTuan
  },
  {
    path: '/chitietnhatky/:id',
    name: 'Chitietnhatky',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/NhatKyThucTap/ChiTietNhatKy')
  }
]

const router = new VueRouter({
  routes
})

export default router
