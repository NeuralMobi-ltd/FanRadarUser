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
  async get(id) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandom: null }
    }
  const { data } = await http.get(API_CONFIG.fandoms.byId(id))
    return data
  },
  async getPosts(id, params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
  const { data } = await http.get(API_CONFIG.fandoms.posts(id), { params })
    return data
  },
  async createPost(id, payload) {
    // multipart form required
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, post: { id: Date.now(), ...payload } }
    }
    const isForm = payload instanceof FormData
    const { data } = await http.post(API_CONFIG.fandoms.createPost(id), payload, isForm ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined)
    return data
  },
  async updatePost(fid, pid, body) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, post: { id: pid, ...body } }
    }
    // Support both JSON and multipart (FormData) bodies
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData
    const method = isForm ? 'post' : 'put' // some servers accept POST for multipart updates
    const url = API_CONFIG.fandoms.updatePost(fid, pid)
    const { data } = await http[method](url, body, isForm ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined)
    return data
  },
  async deletePost(fid, pid) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.delete(API_CONFIG.fandoms.deletePost(fid, pid))
    return data
  },
  async getMembers(id, params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { members: [] }
    }
  const { data } = await http.get(API_CONFIG.fandoms.members(id), { params })
    return data
  },
  async join(id) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
  const { data } = await http.post(API_CONFIG.fandoms.join(id))
    return data
  },
  async leave(id) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.delete(API_CONFIG.fandoms.leave(id))
    return data
  },
  async create(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandom: { id: Date.now(), ...payload } }
    }
  const isForm = typeof FormData !== 'undefined' && payload instanceof FormData
  const { data } = await http.post(API_CONFIG.fandoms.create, payload, isForm ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined)
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
  async update(id, payload) {
    // Requirement: POST /api/Y/fandoms/{fandom_id} (admin only) with any subset of: name, description, subcategory_id, cover_image, logo_image
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const form = new FormData()
    const allowed = ['name','description','subcategory_id','cover_image','logo_image']
    // Accept camelCase variants and map
    const map = { subcategoryId: 'subcategory_id', coverImage: 'cover_image', logoImage: 'logo_image' }
    Object.entries(payload || {}).forEach(([k,v]) => {
      if (v == null) return
      const key = map[k] || k
      if (allowed.includes(key)) form.append(key, v)
    })
    const { data } = await http.post(API_CONFIG.fandoms.update(id), form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async changeRole(id, userId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
  const { data } = await http.put(API_CONFIG.fandoms.changeRole(id, userId), payload)
    return data
  },
  async hashtags(id) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { hashtags: [] }
    }
  const { data } = await http.get(API_CONFIG.fandoms.hashtags(id))
    return data
  },
  async myFandoms(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { fandoms: [] }
    }
    // Endpoint lives under users namespace
    const { data } = await http.get(API_CONFIG.users.myFandoms, { params })
    return data
  }
}

export default FandomsService
