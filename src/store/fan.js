import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFanStore = defineStore('fan', () => {
  const trendingFandoms = ref([])
  const fanContent = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchTrendingFandoms() {
    try {
      isLoading.value = true
      // TODO: Replace with actual API call
      trendingFandoms.value = []
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { trendingFandoms, fanContent, isLoading, error, fetchTrendingFandoms }
}) 