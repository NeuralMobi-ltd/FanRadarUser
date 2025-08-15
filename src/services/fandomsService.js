import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const FandomsService = {
  async list(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandoms: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.all, { params })
    return data
  },
  async trending() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandoms: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.trending)
    return data
  },
  async categories() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { categories: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.categories)
    return data
  },
  async search(query, extra = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { results: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.search(query), { params: extra })
    return data
  },
  async get(idOrHandle) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandom: null }
    }
    const { data } = await http.get(API_CONFIG.fandoms.byId(idOrHandle))
    return data
  },
  async getPosts(idOrHandle, params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.posts(idOrHandle), { params })
    return data
  },
  async getMembers(idOrHandle, params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { members: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.members(idOrHandle), { params })
    return data
  },
  async join(idOrHandle) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.post(API_CONFIG.fandoms.join(idOrHandle))
    return data
  },
  async create(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandom: { id: Date.now(), ...payload } }
    }
    const { data } = await http.post(API_CONFIG.fandoms.create, payload)
    return data
  },
  async uploadImage(formData) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { url: '/images/FanRadar.png' }
    }
    const { data } = await http.post(API_CONFIG.fandoms.uploadImage, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async update(idOrHandle, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.fandoms.update(idOrHandle), payload)
    return data
  },
  async changeRole(idOrHandle, userId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.fandoms.changeRole(idOrHandle, userId), payload)
    return data
  },
  async hashtags(idOrHandle) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { hashtags: [] }
    }
    const { data } = await http.get(API_CONFIG.fandoms.hashtags(idOrHandle))
    return data
  }
}

export default FandomsService
