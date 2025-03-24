import { createRouter, createWebHashHistory } from 'vue-router'
import Library from '../views/Library.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'Library',
    props:true,
    component: Library
  },
  {
    path: '/Detail/:id',
    name: 'Detail',
    component: Detail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
