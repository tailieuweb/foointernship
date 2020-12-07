import Vue from 'vue'
import VueRouter from 'vue-router'
import dstuan from '../components/NhatKyThucTap/DsTuan'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dstuan',
    component: dstuan
  },
  {
    path: '/chitietnhatky/:id',
    name: 'chitietnhatky',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/NhatKyThucTap/ChiTietNhatKy')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
