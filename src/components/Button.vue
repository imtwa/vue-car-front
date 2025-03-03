<template>
  <button :class="['custom-button', variant]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
}>()
</script>

<style lang="scss" scoped>
@use 'sass:color';

.custom-button {
  padding: $spacing-small $spacing-medium;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }

  &.secondary {
    background-color: $secondary-color;
    color: white;

    &:hover {
      background-color: color.adjust($secondary-color, $lightness: -10%);
    }
  }
}
</style>
