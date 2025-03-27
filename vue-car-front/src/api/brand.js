import request from './request'

export const brandApi = {
  // 获取品牌列表
  getBrands() {
    return request({
      url: '/api/brands',
      method: 'get'
    })
  },

  // 获取品牌详情
  getBrandDetail(id) {
    return request({
      url: `/api/brands/${id}`,
      method: 'get'
    })
  }
}
