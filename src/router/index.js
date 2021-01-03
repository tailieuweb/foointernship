import Vue from 'vue'
import Router from 'vue-router'
import DiaryDetails from '../components/NhatKyThucTap/DiaryDetails'
Vue.use(Router)

const routes = [

    {
        path: '/diaryDetails/:id',
        name: 'DiaryDetails',
        component: DiaryDetails
    },
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router