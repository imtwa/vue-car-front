<template>
  <div ref="containerRef" class="model-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GUI } from 'dat.gui'

const containerRef = ref(null)
let scene, camera, renderer, controls, gui
let currentModel = null // 用于存储当前加载的模型

// 定义通用材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0,
  metalness: 0.8,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03
})

const carbonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#000000',
  metalness: 0.9,
  roughness: 0.3,
  clearcoat: 0.0,
  clearcoatRoughness: 0.0
})

const chromeMaterial = new THREE.MeshPhysicalMaterial({
  color: '#c0c0c0',
  metalness: 1.0,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0
})

const stainlesssteelMaterial = new THREE.MeshPhysicalMaterial({
  color: '#c0c0c0',
  metalness: 1.0,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0
})

const props = defineProps({
  modelPath: {
    type: String,
    required: true
  }
})

// 监听模型路径变化
watch(
  () => props.modelPath,
  newPath => {
    if (currentModel) {
      // 清除旧模型
      scene.remove(currentModel)
      // 清除材质和几何体
      currentModel.traverse(obj => {
        if (obj.isMesh) {
          obj.geometry.dispose()
          obj.material.dispose()
        }
      })
    }
    // 加载新模型
    loadModel(newPath)
  },
  { immediate: false }
)

// 初始化场景
const initScene = () => {
  scene = new THREE.Scene()
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
  camera.position.set(0, 1, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor('#428bca', 1)
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)
}

// 添加环境光和灯光
const addLights = () => {
  const ambient = new THREE.AmbientLight(0xffffff, 1)
  ambient.position.set(0, 300, 0)
  scene.add(ambient)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight1.position.set(1, 0.7, 1)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(-1, 0.7, 1)
  scene.add(directionalLight2)

  const spotLight1 = new THREE.SpotLight(0xffffff, 1)
  spotLight1.position.set(0, 30, 0)
  scene.add(spotLight1)

  const spotLight2 = new THREE.SpotLight(0xffffff, 0.5)
  spotLight2.position.set(0, 20, -50)
  scene.add(spotLight2)
}

// 加载天空球
const loadSkybox = () => {
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load(
    'sky3.hdr',
    envMap => {
      scene.environment = envMap
      envMap.mapping = THREE.EquirectangularReflectionMapping
      scene.background = envMap
    },
    undefined,
    error => {
      console.error('HDR加载错误:', error)
    }
  )
}

// 根据文件后缀选择加载器
const loadModel = modelPath => {
  const extension = modelPath.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'fbx':
      loadFBXModel(modelPath)
      break
    case 'glb':
    case 'gltf':
      loadGLTFModel(modelPath)
      break
    default:
      console.error('不支持的文件格式:', extension)
  }
}

// 加载 FBX 模型
const loadFBXModel = modelPath => {
  const leftdoors = []
  const rightdoors = []

  new FBXLoader().load(modelPath, fbx => {
    const carModel = fbx
    currentModel = carModel // 保存当前模型引用
    carModel.position.set(0, 0, 0)
    carModel.scale.set(0.01, 0.01, 0.01)
    carModel.traverse(function (obj) {
      if (obj.isMesh) {
        obj.material.side = THREE.DoubleSide
        obj.material.emissiveIntensity = 1
        obj.material.emissiveMap = obj.material.map
      }
    })
    carModel.traverse(obj => {
      if (
        obj.name == 'body_05' ||
        obj.name == 'body_12' ||
        obj.name == 'body_08' ||
        obj.name == 'body_11' ||
        obj.name == 'body_01' ||
        obj.name == 'body_02' ||
        obj.name == 'body_06' ||
        obj.name == 'body_07' ||
        obj.name == 'body_09' ||
        obj.name == 'body_10' ||
        obj.name == 'black_m_01' ||
        obj.name == 'body_03' ||
        obj.name == 'gum_01' ||
        obj.name == 'black_m_06' ||
        obj.name == 'black_02'
      ) {
        obj.material = bodyMaterial
      } else if (
        obj.name == 'gum_08' ||
        obj.name == 'chrome_09' ||
        obj.name == 'chrome_13' ||
        obj.name == 'gum_07' ||
        obj.name == 'gum_16' ||
        obj.name == 'black_m_04' ||
        obj.name == 'black_m_05' ||
        obj.name == 'black_03' ||
        obj.name == 'black_02' ||
        obj.name == 'black_01'
      ) {
        obj.material = carbonMaterial
      } else if (
        obj.name == 'chrome_12' ||
        obj.name == 'gum_06' ||
        obj.name == 'chrome_03' ||
        obj.name == 'chrome_30' ||
        obj.name == 'chrome_20' ||
        obj.name == 'chrome_22'
      ) {
        obj.material = stainlesssteelMaterial
      }
    })
    scene.add(carModel)
    setupGUI(leftdoors, rightdoors)
  })
}

// 加载 GLTF 模型
const loadGLTFModel = modelPath => {
  const leftdoors = []
  const rightdoors = []

  new GLTFLoader().load(modelPath, gltf => {
    const carModel = gltf.scene
    currentModel = carModel // 保存当前模型引用
    carModel.position.set(0, 0, 0)
    carModel.scale.set(1, 1, 1)
    carModel.traverse(function (obj) {
      if (obj.isMesh) {
        obj.material.side = THREE.DoubleSide
        obj.material.emissiveIntensity = 1
        obj.material.emissiveMap = obj.material.map
      }
    })
    carModel.traverse(obj => {
      if (
        obj.name == '网格' ||
        obj.name == '网格008' ||
        obj.name == '网格001' ||
        obj.name == '网格002' ||
        obj.name == '网格003' ||
        obj.name == '网格004' ||
        obj.name == '网格006' ||
        obj.name == '网格014'
      ) {
        obj.material = bodyMaterial
      } else if (obj.name == '网格_2' || obj.name == '网格_3') {
        obj.material = carbonMaterial
      } else if (
        obj.name == '网格_4' ||
        obj.name == '网格001_3' ||
        obj.name == '网格004_3' ||
        obj.name == '网格002_2' ||
        obj.name == '网格003_3' ||
        obj.name == '网格014_13'
      ) {
        obj.material = chromeMaterial
      } else if (obj.name == 'DoorFrLeft' || obj.name == 'DoorRearLeft') {
        leftdoors.push(obj)
      } else if (obj.name == 'DoorFrRight' || obj.name == 'DoorReaRight') {
        rightdoors.push(obj)
      }
    })
    scene.add(carModel)
    setupGUI(leftdoors, rightdoors)
  })
}

// 设置 GUI 控制
const setupGUI = (leftdoors, rightdoors) => {
  const options = {
    color: 0x0,
    carOpen: () => {
      leftdoors.forEach(door => setAnimationDoor({ y: 0 }, { y: -Math.PI / 4 }, door))
      rightdoors.forEach(door => setAnimationDoor({ y: 0 }, { y: Math.PI / 4 }, door))
    },
    carClose: () => {
      leftdoors.forEach(door => setAnimationDoor({ y: -Math.PI / 4 }, { y: 0 }, door))
      rightdoors.forEach(door => setAnimationDoor({ y: Math.PI / 4 }, { y: 0 }, door))
    },
    carFirstIn: () => {
      setAnimationCamera(
        { cx: 2.25, cy: 1.4, cz: 4, ox: 0, oy: 0.5, oz: 0 },
        { cx: 0, cy: 0.95, cz: 0, ox: 0, oy: 0.5, oz: 3 }
      )
    },
    carSecondIn: () => {
      setAnimationCamera(
        { cx: 2.25, cy: 1.4, cz: 4, ox: 0, oy: 0.5, oz: 0 },
        { cx: 0, cy: 1.2, cz: -1.2, ox: 0, oy: 0.5, oz: 3 }
      )
    },
    carOut: () => {
      setAnimationCamera(
        { cx: 0, cy: 0.95, cz: 0, ox: 0, oy: 0.5, oz: 3 },
        { cx: 2.25, cy: 1.4, cz: 4, ox: 0, oy: 0.5, oz: 0 }
      )
    }
  }

  // 创建 GUI 容器
  const guiContainer = document.createElement('div')
  guiContainer.style.position = 'absolute'
  guiContainer.style.top = '0px'
  guiContainer.style.right = '0px'
  containerRef.value.appendChild(guiContainer)

  gui = new GUI({ autoPlace: false })
  guiContainer.appendChild(gui.domElement)

  gui.addColor(options, 'color').onChange(value => {
    bodyMaterial.color.set(value)
  })
  gui.add(options, 'carOpen').name('打开车门')
  gui.add(options, 'carClose').name('关闭车门')
  gui.add(options, 'carFirstIn').name('车内第一视角')
  gui.add(options, 'carSecondIn').name('车内第二视角')
  gui.add(options, 'carOut').name('车外视角')
}

// 动画辅助函数
const setAnimationDoor = (start, end, mesh) => {
  const tween = new TWEEN.Tween(start)
    .to(end, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(that => {
      mesh.rotation.y = that.y
    })
    .start()
}

const setAnimationCamera = (start, end) => {
  const tween = new TWEEN.Tween(start)
    .to(end, 3000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(that => {
      camera.position.set(that.cx, that.cy, that.cz)
      controls.target.set(that.ox, that.oy, that.oz)
    })
    .start()
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  TWEEN.update()
  controls?.update()
}

// 窗口大小调整
const handleResize = () => {
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initScene()
  addLights()
  loadSkybox()
  loadModel(props.modelPath) // 初始加载模型

  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // 添加网格
  const grid = new THREE.GridHelper(20, 40, 'red', 0xffffff)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene.add(grid)

  // 添加坐标轴
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  animate()
  // 使用 ResizeObserver 监听容器大小变化
  const resizeObserver = new ResizeObserver(() => {
    handleResize()
  })
  resizeObserver.observe(containerRef.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  // 清理模型资源
  if (currentModel) {
    scene.remove(currentModel)
    currentModel.traverse(obj => {
      if (obj.isMesh) {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
  }
  gui?.destroy()
  renderer?.dispose()
})
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 100%;
  position: relative; /* 添加相对定位以支持绝对定位的子元素 */
}

:deep(.dg .c input[type='text']) {
  width: 45% !important; /* 调整颜色文本输入框的宽度 */
}

:deep(.dg .c .slider) {
  width: 45% !important; /* 调整滑块的宽度 */
}
</style>
