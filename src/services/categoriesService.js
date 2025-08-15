import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const CategoriesService = {
  async all() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { categories: [] }
    }
    const { data } = await http.get(API_CONFIG.categories.all)
    return data
  },
  async content(category) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.categories.contentByCategory(category))
    return data
  }
}

export default CategoriesService
