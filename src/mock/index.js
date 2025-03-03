import Mock from 'mockjs'

// 设置全局延迟
Mock.setup({
  timeout: '200-600'
})

// 打开控制台查看请求拦截情况
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
    console.log('Mock 拦截到请求：', this.custom.url, this.custom.method)
  }
  this.proxy_send(...arguments)
}

// 引入模块
import './user'

export default Mock
