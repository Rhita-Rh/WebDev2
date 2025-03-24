import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'
import FilterNav from '../views/FilterNav.vue'
import JobDetail from '../views/JobDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'JobDetail/:id',
        component: JobDetail,
        props: true,
        name:'JobDetail'
      },
      {
        path: 'FilterNav',
        component: FilterNav
      }
    ]
  },
  {
    path: '/add',
    name: 'addjob',
    component: AddJob
  },
  {
    path: '/Jobs/:id',
    name: 'EditJob',
    component: EditJob
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
