import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'brands',
        name: 'Brands',
        component: () => import('@/views/Brands.vue')
      },
      {
        path: 'ar',
        name: 'AR',
        component: () => import('@/views/AR.vue')
      },
      {
        path: 'forum',
        name: 'Forum',
        component: () => import('@/views/forum/Forum.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'forum/post',
        name: 'ForumPost',
        component: () => import('@/views/forum/Post.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
