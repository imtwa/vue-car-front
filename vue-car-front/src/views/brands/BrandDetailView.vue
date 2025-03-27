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
import ModelCard from '@/views/brands/components/ModelCard.vue'

const route = useRoute()
const router = useRouter()
const brand = ref(null)

onMounted(async () => {
  try {
    const res = await brandApi.getBrandDetail(route.params.id)
    brand.value = res.data
  } catch (error) {
    ElMessage.error('获取品牌详情失败')
  }
})

const view3D = model => {
  router.push(`/3d-view/${model.id}`)
}
</script>

<style lang="scss" scoped>
.brand-detail {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;

  .brand-intro {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    padding: 40px;
    background: #f5f7fa;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .brand-logo {
      height: 100px;
      margin-right: 40px;
    }

    .brand-info {
      h1 {
        font-size: 2.5rem;
        color: #303133;
        margin: 0 0 20px;
      }

      .description {
        font-size: 1.2rem;
        color: #606266;
        margin: 0;
        line-height: 1.6;
      }
    }
  }

  .model-list {
    h2 {
      font-size: 2rem;
      color: #303133;
      margin-bottom: 30px;
      text-align: center;
    }
  }
}
</style>
