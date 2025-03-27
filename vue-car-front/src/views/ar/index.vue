<template>
  <div class="ar">
    <div class="ar-header">
      <h1>3D展示</h1>
      <div class="ar-controls">
        <el-select v-model="selectedModel" placeholder="选择车型">
          <el-option
            v-for="model in carModels"
            :key="model.id"
            :label="model.name"
            :value="model.modelPath"
          />
        </el-select>
      </div>
    </div>

    <div class="ar-display" v-loading="isLoading">
      <ModelShow
        v-if="selectedModel"
        :model-path="selectedModel"
        @loading="isLoading = true"
        @loaded="isLoading = false"
      />
      <div v-else class="placeholder">请选择要展示的车型</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModelShow from './ModelShow.vue'
import { ElLoading } from 'element-plus'

const CARMODEL_PATH = '/car/A6Avant.FBX'
const GLTFMODEL_PATH = '/car/BenzS650.glb'

const selectedModel = ref('')
const isLoading = ref(false)
const carModels = ref([
  { id: 1, name: '奔驰 G500', modelPath: GLTFMODEL_PATH },
  { id: 2, name: '奥迪 A6', modelPath: CARMODEL_PATH }
])
</script>

<style lang="scss" scoped>
.ar {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .ar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 2.5rem;
      color: #303133;
      flex: 0 0 auto;
    }

    .ar-controls {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      gap: 20px;
      padding-left: 40px;

      .el-select {
        width: 300px;
      }
    }
  }

  .ar-display {
    width: 100%;
    height: calc(100vh - 180px);
    background: #f5f7fa;
    border-radius: 12px;
    overflow: hidden;
    position: relative;

    .placeholder {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #909399;
    }
  }
}
</style>
