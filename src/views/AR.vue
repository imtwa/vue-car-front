<template>
  <div class="ar">
    <h1>增强现实展示</h1>
    <div class="ar-content">
      <div class="ar-controls">
        <el-select v-model="selectedModel" placeholder="选择车型">
          <el-option
            v-for="model in carModels"
            :key="model.id"
            :label="model.name"
            :value="model.id"
          />
        </el-select>
        <el-button type="primary" @click="startAR">开始AR体验</el-button>
      </div>
      <div class="ar-display">
        <!-- 这里后续可以集成 AR.js 或其他 AR 库 -->
        <div class="placeholder">AR 展示区域</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedModel = ref('')
const carModels = ref([
  { id: 1, name: '奔驰 C级' },
  { id: 2, name: '宝马 3系' }
  // 可以添加更多车型
])

const startAR = () => {
  // TODO: 实现 AR 功能
  console.log('启动 AR 展示:', selectedModel.value)
}
</script>

<style lang="scss" scoped>
.ar {
  padding: 20px;

  .ar-content {
    margin-top: 20px;
  }

  .ar-controls {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
  }

  .ar-display {
    width: 100%;
    height: 600px;
    background: #f5f7fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 24px;
      color: #909399;
    }
  }
}
</style>
