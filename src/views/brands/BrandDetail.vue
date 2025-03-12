<template>
  <div class="brand-detail">
    <div class="brand-intro">
      <img :src="brand?.logo" :alt="brand?.name" class="brand-logo" />
      <div class="brand-info">
        <h1>{{ brand?.name }}</h1>
        <p class="description">{{ brand?.description }}</p>
      </div>
    </div>

    <div class="model-list">
      <h2>车型展示</h2>
      <el-row :gutter="30">
        <el-col v-for="model in brand?.models" :key="model.id" :span="8">
          <model-card :model="model" @view3d="view3D(model)" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { brandApi } from '@/api/brand'
import { ElMessage } from 'element-plus'
import ModelCard from './components/ModelCard.vue'

// ... 其他代码保持不变
</script>
