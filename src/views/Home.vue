<template>
  <div class="home">
    <h1 class="title">{{ store.name }}</h1>
    <div class="counter-section">
      <p>Count: {{ store.count }}</p>
      <Button variant="primary" @click="store.increment()"> Increment </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores'
import Button from '@/components/Button.vue'

const store = useMainStore()
</script>

<style lang="scss" scoped>
.home {
  padding: $spacing-large;

  .title {
    font-size: 2rem;
    color: $primary-color;
    margin-bottom: $spacing-medium;
    text-align: center;
  }

  .counter-section {
    text-align: center;

    p {
      margin-bottom: $spacing-medium;
      font-size: 1.2rem;
    }
  }
}
</style>
