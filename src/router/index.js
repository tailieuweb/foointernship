import Vue from 'vue'
import Router from 'vue-router'
import WeekDetails from '../components/NhatKyThucTap/WeekDetails'
import ExportDairyDetail from '../components/ExportList/ExportDairyDetail'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.use(Router)

const routes = [{
        path: '/WeekDetails',
        name: 'WeekDetails',
        component: WeekDetails
    },
    {
        path: '/ExportDairyDetail',
        name: 'ExportDairyDetail',
        component: ExportDairyDetail
    },
    {
        path: '/diaryDetails/:id',
        name: 'DiaryDetails'
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router