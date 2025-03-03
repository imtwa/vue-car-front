import request from './request'

export const userApi = {
  // 用户登录
  login(data) {
    return request({
      url: '/api/login',
      method: 'post',
      data
    })
  },

  // 用户注册
  register(data) {
    return request({
      url: '/api/register',
      method: 'post',
      data
    })
  },

  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/api/user/info',
      method: 'get'
    })
  },

  // 退出登录
  logout() {
    return request({
      url: '/api/logout',
      method: 'post'
    })
  }
}
