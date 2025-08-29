import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Helper: normalize various backend shapes to canonical { data:[Post], meta }
function normalizeList(resp) {
  if (!resp) return { data: [], meta: undefined }
  // Accept either { data:[...] } or { posts:[...] }
  const data = resp.data?.data || resp.data || resp.posts || []
  const list = Array.isArray(data) ? data : (data.posts || [])
  const meta = resp.meta || resp.data?.meta || resp.metaData
  return { data: list, meta }
}

export const PostsService = {
  async homeFeed(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { data: [], meta: { page: 1, limit: 0, total: 0, last_page: 1 } }
    }
    const { data } = await http.get(API_CONFIG.feed.home, { params })
    return normalizeList(data)
  },
  async exploreFeed(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { data: [], meta: { page: 1, limit: 0, total: 0, last_page: 1 } }
    }
    const { data } = await http.get(API_CONFIG.feed.explore, { params })
    return normalizeList(data)
  },
  async trending(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { data: [], meta: { page: 1, limit: 0, total: 0, last_page: 1 } }
    }
    const { data } = await http.get(API_CONFIG.feed.trendingPosts, { params })
    return normalizeList(data)
  },
  async create(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return {
        post: {
          id: Date.now(),
          content: payload?.content || '',
          media: payload?.media || [],
          user: { id: 1, username: 'you', first_name: 'You', profile_image_url: '/images/me.png' },
          created_at: new Date().toISOString(),
    stats: { likes: 0, comments: 0 },
          liked: false
        }
      }
    }
    // Auto-convert to FormData if any File/Blob found
    let body = payload
    if (payload && !(payload instanceof FormData)) {
      const hasFile = Object.values(payload).some(v => v instanceof File || v instanceof Blob || (Array.isArray(v) && v.some(x => x instanceof File || x instanceof Blob)))
      if (hasFile) {
        const fd = new FormData()
        Object.entries(payload).forEach(([k, v]) => {
          if (Array.isArray(v)) v.forEach(item => fd.append(k + (k.endsWith('[]') ? '' : '[]'), item))
          else if (v !== undefined && v !== null) fd.append(k, v)
        })
        body = fd
      }
    }
    const { data } = await http.post(API_CONFIG.posts.create, body, body instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined)
    return data
  },
  async update(postId, payload) {
    // Backend expects POST to /api/Y/posts/{id}/update (not PUT)
    let body = payload
    if (payload && !(payload instanceof FormData)) {
      const hasFile = Object.values(payload).some(v => v instanceof File || v instanceof Blob || (Array.isArray(v) && v.some(x => x instanceof File || x instanceof Blob)))
      if (hasFile) {
        const fd = new FormData()
        Object.entries(payload).forEach(([k, v]) => {
          if (Array.isArray(v)) v.forEach(item => fd.append(k + (k.endsWith('[]') ? '' : '[]'), item))
          else if (v !== undefined && v !== null) fd.append(k, v)
        })
        body = fd
      }
    }
    const { data } = await http.post(API_CONFIG.posts.update(postId), body, body instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined)
    return data
  },
  async remove(postId) {
    const { data } = await http.delete(API_CONFIG.posts.delete(postId))
    return data
  },
  async userPosts(userId, params = {}) {
    const { data } = await http.get(API_CONFIG.users.posts(userId), { params })
    // Accept backend shape { success, data:{ posts:[...], pagination:{...} } } or direct posts list
    const raw = data?.data?.posts || data?.posts || data?.data || []
    const posts = Array.isArray(raw) ? raw : []
    return { posts, pagination: data?.data?.pagination || data?.pagination }
  },
  async like(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { liked: true, likes: 1 }
    }
    const { data } = await http.post(API_CONFIG.posts.like(postId))
    return data
  },
  async addComment(postId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, comment: { id: Date.now(), content: payload?.content, created_at: new Date().toISOString(), user: { id: 1, username: 'you' } } }
    }
    const { data } = await http.post(API_CONFIG.posts.comments(postId), payload)
    return data
  },
  async saved(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { data: [], meta: { page: 1, limit: 0, total: 0, last_page: 1 } }
    }
    const { data } = await http.get(API_CONFIG.posts.saved, { params })
    return normalizeList(data)
  }
}

export default PostsService
