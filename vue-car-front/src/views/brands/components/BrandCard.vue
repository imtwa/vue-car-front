<template>
  <div class="brand-card" @click="$emit('click')">
    <div class="brand-logo">
      <img :src="brand.logo" :alt="brand.name" />
    </div>
    <div class="brand-info">
      <h3>{{ brand.name }}</h3>
      <p>{{ brand.description }}</p>
    </div>
    <div class="model-preview">
      <div class="model-item" v-for="model in brand.models.slice(0, 2)" :key="model.id">
        <img :src="model.image" :alt="model.name" />
        <span class="model-name">{{ model.name }}</span>
        <span class="model-price">{{ model.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.brand-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  margin-bottom: 30px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  .brand-logo {
    padding: 20px;
    background: #f5f7fa;
    text-align: center;

    img {
      height: 60px;
      object-fit: contain;
    }
  }

  .brand-info {
    padding: 20px;
    text-align: center;

    h3 {
      margin: 0 0 10px;
      color: #303133;
    }

    p {
      color: #909399;
      font-size: 14px;
      line-height: 1.4;
    }
  }

  .model-preview {
    padding: 15px;
    background: #f8f9fb;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    .model-item {
      text-align: center;

      img {
        width: 100%;
        height: 80px;
        object-fit: contain;
      }

      .model-name {
        display: block;
        color: #303133;
        font-size: 14px;
        margin-top: 5px;
      }

      .model-price {
        display: block;
        color: #f56c6c;
        font-size: 12px;
      }
    }
  }
}
</style>
