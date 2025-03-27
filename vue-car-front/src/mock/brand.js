import Mock from 'mockjs'

const brandList = [
  {
    id: 1,
    name: '奔驰',
    logo: '/src/assets/images/brands/benz.png',
    description: '德国豪华汽车品牌，以卓越性能和优雅设计闻名',
    models: [
      {
        id: 101,
        name: 'C级',
        price: '31.98-48.98万',
        image: '/src/assets/images/cars/c-class.png'
      },
      {
        id: 102,
        name: 'E级',
        price: '42.98-62.98万',
        image: '/src/assets/images/cars/e-class.png'
      },
      {
        id: 103,
        name: 'S级',
        price: '89.98-199.98万',
        image: '/src/assets/images/cars/s-class.png'
      }
    ]
  },
  {
    id: 2,
    name: '宝马',
    logo: '/src/assets/images/brands/bmw.png',
    description: '德国豪华汽车品牌，以驾驶乐趣和运动性能著称',
    models: [
      {
        id: 201,
        name: '3系',
        price: '29.98-45.98万',
        image: '/src/assets/images/cars/3-series.png'
      },
      {
        id: 202,
        name: '5系',
        price: '44.98-66.98万',
        image: '/src/assets/images/cars/5-series.png'
      },
      {
        id: 203,
        name: '7系',
        price: '92.98-242.98万',
        image: '/src/assets/images/cars/7-series.png'
      }
    ]
  },
  {
    id: 3,
    name: '奥迪',
    logo: '/src/assets/images/brands/audi.png',
    description: '德国豪华汽车品牌，以先进科技和quattro四驱系统闻名',
    models: [
      { id: 301, name: 'A4L', price: '32.98-46.98万', image: '/src/assets/images/cars/a4l.png' },
      { id: 302, name: 'A6L', price: '45.98-68.98万', image: '/src/assets/images/cars/a6l.png' },
      { id: 303, name: 'A8L', price: '88.98-186.98万', image: '/src/assets/images/cars/a8l.png' }
    ]
  },
  {
    id: 4,
    name: '保时捷',
    logo: '/src/assets/images/brands/porsche.png',
    description: '德国顶级跑车品牌，以纯粹驾驶体验和卓越性能著称',
    models: [
      { id: 401, name: '911', price: '132.98-299.98万', image: '/src/assets/images/cars/911.png' },
      {
        id: 402,
        name: 'Cayenne',
        price: '88.98-182.98万',
        image: '/src/assets/images/cars/cayenne.png'
      },
      {
        id: 403,
        name: 'Panamera',
        price: '98.98-258.98万',
        image: '/src/assets/images/cars/panamera.png'
      }
    ]
  }
]

// 获取品牌列表
Mock.mock(new RegExp('/api/brands'), 'get', () => {
  return {
    code: 200,
    message: '获取成功',
    data: brandList
  }
})

// 获取品牌详情
Mock.mock(new RegExp('/api/brands/\\d+'), 'get', options => {
  const id = parseInt(options.url.split('/').pop())
  const brand = brandList.find(b => b.id === id)

  if (brand) {
    return {
      code: 200,
      message: '获取成功',
      data: brand
    }
  }
  return {
    code: 404,
    message: '品牌不存在'
  }
})
