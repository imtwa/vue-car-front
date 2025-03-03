import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
    name: 'Vue 3 + TypeScript'
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
