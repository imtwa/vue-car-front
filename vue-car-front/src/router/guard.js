import { useUserStore } from '@/stores/user'

// 白名单路由
const whiteList = ['/', '/login']

export function setupRouterGuard(router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (!whiteList.includes(to.path) && !userStore.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  })
}
