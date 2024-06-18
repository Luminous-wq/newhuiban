//路由管理
import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../pages/MainLayout.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../pages/Home.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../pages/About.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../pages/User.vue')
      },
      {
        path: '',
        name: 'Title',
        component: () => import('../pages/Title.vue')
      },
    ]
  },
  {
    path: '/login',
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('../pages/Login.vue')
      },
      {
        path: '/regist',
        name: 'Regist',
        component: () => import('../pages/Regist.vue')
      },
    ]
  }
  ]
})

export default router
