import Mock from 'mockjs'

// 模拟用户数据
const users = {
  admin: {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'admin'
  }
}

// 注册接口
Mock.mock(new RegExp('/api/register'), 'post', options => {
  const { username, password } = JSON.parse(options.body)

  // 检查用户名是否已存在
  if (users[username]) {
    return {
      code: 400,
      message: '用户名已存在'
    }
  }

  // 创建新用户
  const newUser = {
    id: Object.keys(users).length + 1,
    username,
    password,
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'user'
  }

  // 保存用户数据
  users[username] = newUser

  return {
    code: 200,
    message: '注册成功'
  }
})

// 登录接口
Mock.mock(new RegExp('/api/login'), 'post', options => {
  const { username, password } = JSON.parse(options.body)
  const user = users[username]

  if (user && user.password === password) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: `mock-token-${username}`,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          role: user.role
        }
      }
    }
  }
  return {
    code: 401,
    message: '用户名或密码错误'
  }
})

// 获取用户信息接口
Mock.mock(new RegExp('/api/user/info'), 'get', () => {
  const token = localStorage.getItem('token')
  const username = token?.split('-')[2]
  const user = users[username]

  if (user) {
    return {
      code: 200,
      message: '获取成功',
      data: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        role: user.role
      }
    }
  }
  return {
    code: 401,
    message: '获取用户信息失败'
  }
})

// 退出登录接口
Mock.mock(new RegExp('/api/logout'), 'post', () => {
  return {
    code: 200,
    message: '退出成功'
  }
})
