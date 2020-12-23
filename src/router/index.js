import Vue from 'vue'
import Router from 'vue-router'
import Dangky from '../components/DangKy/SignUp.vue'
import dstuan from '../components/NhatKyThucTap/DsTuan'
import Header from '../components/Header.vue'
import NHDan from '../components/DanhSachCongTy/DanhsachNHD.vue'
Vue.use(Router)

let baseRoutes = [{
        path: '/header',
        name: "header",
        component: Header
    },
    {
        path: '/',
        name: "hi",
        component: Dangky
    },
    {
        path: '/dstuan',
        name: 'dstuan',
        component: dstuan
    },
    {
        path: '/nguoihuongdan',
        name: 'nguoihuongdan',
        component: NHDan
    },
    {
        path: '/chitietnhatky/:id',
        name: 'chitietnhatky',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/NhatKyThucTap/ChiTietNhatKy')
    }

]

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: baseRoutes
})

export default router