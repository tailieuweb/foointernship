import Vue from 'vue'
import Router from 'vue-router'
// import AddSinhVien from '../components/AddSinhVien'
// import AddLeturer from '../components/AddLeturer.vue'
import ImportCSV from '../components/ImportCSV'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);

Vue.use(Router)

const routes = [
  {
    path: '/',
    // name: 'AddSinhVien',
    // component: AddSinhVien

    name: 'ImportCSV',
    component: ImportCSV

    // name: 'AddLeturer',
    // component: AddLeturer
  },
]

const router = new Router({
  routes
})

export default router
