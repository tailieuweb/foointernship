import Vue from 'vue'
import VueRouter from 'vue-router'
import DiaryDetails from '../components/NhatKyThucTap/DiaryDetails'
Vue.use(VueRouter)

const routes = [

    {
        path: '/diaryDetails/:id',
        name: 'DiaryDetails',
        component: DiaryDetails
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router