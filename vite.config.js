import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // Vue 插件支持
  assetsInclude: ['**/*.glb', '**/*.FBX', '**/*.fbx', '**/*.hdr', '**/*.gltf'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables.scss" as *;`
      }
    }
  },
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
    proxy: {
      '/car': {
        target: 'http://blog.imtwa.top/usr/uploads/car',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/car/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
