import Vue from 'vue'
import Router from 'vue-router'
import Dangky from '../components/DangKy/SignUp.vue'
import dstuan from '../components/NhatKyThucTap/DsTuan'
import HeaderFooter from '../components/HeaderFooter.vue'
Vue.use(Router)

let baseRoutes = [
  {
    path:'/',
    name:"header",
    component:HeaderFooter
  },
  {
    path:'/hi',
    name:"hi",
    component:Dangky
  },
  {
    path: '/dstuan',
    name: 'dstuan',
    component: dstuan
  },
  {
    path: '/chitietnhatky/:id',
    name: 'chitietnhatky',
    component: () => import(/* webpackChunkName: "about" */ '../components/NhatKyThucTap/ChiTietNhatKy')
  }

]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: baseRoutes
})

export default router
