import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({})
  const isLoggedIn = ref(!!token.value)

  // 登录方法
  const login = async (username, password) => {
    try {
      const res = await userApi.login({ username, password })
      if (res.code === 200) {
        token.value = res.data.token
        userInfo.value = res.data.user
        isLoggedIn.value = true
        localStorage.setItem('token', res.data.token)
        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const res = await userApi.getUserInfo()
      if (res.code === 200) {
        userInfo.value = res.data
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  // 退出登录方法
  const logout = async () => {
    try {
      await userApi.logout()
    } finally {
      token.value = ''
      userInfo.value = {}
      isLoggedIn.value = false
      localStorage.removeItem('token')
    }
  }

  // 注册方法
  const register = async (username, password) => {
    try {
      const res = await userApi.register({ username, password })
      return true
    } catch (error) {
      return false
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    getUserInfo,
    logout,
    register
  }
})
