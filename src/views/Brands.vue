<template>
  <div class="brands">
    <h1>品牌专区</h1>
    <el-row :gutter="20">
      <el-col v-for="brand in brands" :key="brand.id" :span="6">
        <el-card :body-style="{ padding: '0px' }" class="brand-card">
          <img :src="brand.logo" class="brand-image" />
          <div class="brand-info">
            <h3>{{ brand.name }}</h3>
            <p>{{ brand.description }}</p>
            <el-button type="primary" @click="viewBrand(brand)">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const brands = ref([
  {
    id: 1,
    name: '奔驰',
    logo: 'https://example.com/benz-logo.png',
    description: '德国豪华汽车品牌'
  },
  {
    id: 2,
    name: '宝马',
    logo: 'https://example.com/bmw-logo.png',
    description: '德国豪华汽车品牌'
  }
  // 可以添加更多品牌
])

const viewBrand = brand => {
  router.push(`/brands/${brand.id}`)
}
</script>

<style lang="scss" scoped>
.brands {
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }

  .brand-card {
    margin-bottom: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .brand-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .brand-info {
    padding: 14px;

    h3 {
      margin: 0 0 10px;
    }

    p {
      color: #666;
      margin-bottom: 10px;
    }
  }
}
</style>
