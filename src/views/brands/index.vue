<template>
  <div class="brands">
    <div class="brand-header">
      <h1>品牌专区</h1>
      <p class="subtitle">探索世界顶级汽车品牌</p>
    </div>

    <div class="brand-list">
      <el-row :gutter="30">
        <el-col v-for="brand in brands" :key="brand.id" :span="6">
          <brand-card :brand="brand" @click="router.push(`/brands/${brand.id}`)" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { brandApi } from '@/api/brand'
import { ElMessage } from 'element-plus'
import BrandCard from '@/views/brands/components/BrandCard.vue'

const router = useRouter()
const brands = ref([])

onMounted(async () => {
  try {
    const res = await brandApi.getBrands()
    brands.value = res.data
  } catch (error) {
    ElMessage.error('获取品牌列表失败')
  }
})
</script>

<style lang="scss" scoped>
.brands {
  padding: 40px;

  .brand-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2.5rem;
      color: #303133;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #909399;
      font-size: 1.2rem;
    }
  }
}
</style>
