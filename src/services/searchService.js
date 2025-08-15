import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const SearchService = {
  async global(q, type) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      // Return shape compatible with store expectations
      return {
        results: { people: [], posts: [], news: [], fandoms: [] },
        total: 0
      }
    }
    const { data } = await http.get(API_CONFIG.search.global(q, type))
    return data
  },
  async suggestions(q) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { suggestions: [] }
    }
    const { data } = await http.get(API_CONFIG.search.suggestions(q))
    return data
  }
}

export default SearchService
