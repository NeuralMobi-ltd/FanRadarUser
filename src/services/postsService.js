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
      return { posts: [], pagination: { page: 1, limit: 0, total: 0, pages: 1, hasNext: false } }
    }
    const { data } = await http.get(API_CONFIG.feed.home, { params })
    // Expected shape: { success, data: { posts:[...], pagination:{ page, limit, hasNext, ... } } }
    const root = data?.data || data
    const posts = root?.posts || root?.data?.posts || []
    const pagination = root?.pagination || root?.data?.pagination || null
    return { posts, pagination }
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
  async followingFeed(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [], pagination: { page: 1, limit: 0, hasNext: false } }
    }
    const { data } = await http.get(API_CONFIG.feed.following, { params })
    // Expected shape similar to sample: { success, data: { posts:[...], following_count, pagination:{ current_page, total_pages, total_items, per_page, has_more, from, to } } }
    const root = data?.data || data
    const posts = root?.posts || []
    const p = root?.pagination || {}
    // Normalize pagination keys to our store's { page, limit, hasNext }
    const pagination = {
      page: p.current_page ?? p.page ?? 1,
      limit: p.per_page ?? p.limit ?? params.limit ?? 20,
      hasNext: p.has_more ?? p.hasNext ?? (p.current_page && p.total_pages ? p.current_page < p.total_pages : false)
    }
    return { posts, pagination }
  },
  async trendingTop(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [], pagination: { page: 1, limit: 0, hasNext: false } }
    }
    const { data } = await http.get(API_CONFIG.posts.trendingTop, { params })
    // Expected shape from backend: { success, data: { posts:[...], pagination:{ page, limit, hasNext } } }
    const root = data?.data || data
    return {
      posts: root?.posts || [],
      pagination: root?.pagination || null
    }
  },
  async create(payload, config = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return {
        post: {
          id: Date.now(),
          content: payload?.content || '',
          media: payload?.media || [],
          user: { id: 1, username: 'you', first_name: 'You', profile_image_url: '' },
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
  const axiosConfig = body instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' }, ...config } : { ...config }
  const { data } = await http.post(API_CONFIG.posts.create, body, axiosConfig)
    return data
  },
  async update(postId, payload, config = {}) {
    // Accept composite IDs like '2025-09-01T...-123' from UI; extract trailing numeric part
    if (typeof postId === 'string') {
      const tail = postId.split('-').pop()
      if (/^\d+$/.test(tail)) postId = tail
    }
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
  const axiosConfig = body instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' }, ...config } : { ...config }
  const { data } = await http.post(API_CONFIG.posts.update(postId), body, axiosConfig)
    return data
  },
  async remove(postId) {
    // Accept composite or synthetic IDs; extract numeric tail if present
    if (typeof postId === 'string') {
      const tail = postId.split('-').pop()
      if (/^\d+$/.test(tail)) postId = tail
    }
    if (typeof postId === 'string' && /^\d+$/.test(postId)) postId = Number(postId)
    // Perform DELETE; if backend uses POST fallback
    try {
      const { data } = await http.delete(API_CONFIG.posts.delete(postId))
      return data || { success: true }
    } catch (err) {
      const status = err?.response?.status
      // Some backends implement deletion as POST /{id}/delete
      if (status === 405 || status === 404) {
        try {
          const { data } = await http.post(API_CONFIG.posts.delete(postId))
          return data || { success: true }
        } catch (err2) {
          throw err2
        }
      }
      throw err
    }
  },
  async userPosts(userId, params = {}) {
    const { data } = await http.get(API_CONFIG.users.posts(userId), { params })
    // Accept backend shape { success, data:{ posts:[...], pagination:{...} } } or direct posts list
    const raw = data?.data?.posts || data?.posts || data?.data || []
    const posts = Array.isArray(raw) ? raw : []
    return { posts, pagination: data?.data?.pagination || data?.pagination }
  },
  async favorite(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, favorited: true }
    }
    const { data } = await http.post(API_CONFIG.posts.favorite(postId))
    return data
  },
  async save(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, message: 'Post saved (mock)' }
    }
    const payload = { post_id: postId }
    const { data } = await http.post(API_CONFIG.posts.save, payload)
    return data
  },
  async unsave(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, message: 'Post unsaved (mock)' }
    }
    // Use dedicated save/unsave endpoints (favorites here mean bookmarks)
    const payload = { post_id: postId }
    const { data } = await http.post(API_CONFIG.posts.unsave, payload)
    return data
  },
  async unfavorite(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, favorited: false }
    }
    const primary = API_CONFIG.posts.removeFavorite(postId)
    const alternatives = [
      `/Y/posts/${postId}/unfavorite`,
      `/Y/posts/${postId}/removeFavorite`
    ]
    const tryPaths = [primary, ...alternatives]
    let lastErr
    for (const url of tryPaths) {
      try {
        const { data } = await http.delete(url)
        return data
      } catch (errDel) {
        lastErr = errDel
        // Retry via method override for environments that block DELETE
        try {
          const headers = { 'X-HTTP-Method-Override': 'DELETE' }
          const { data } = await http.post(url, { _method: 'DELETE' }, { headers })
          return data
        } catch (errPost) {
          lastErr = errPost
          // Try query param override
          try {
            const { data } = await http.post(url + (url.includes('?') ? '&' : '?') + '_method=DELETE')
            return data
          } catch (errQuery) {
            lastErr = errQuery
          }
          // Try x-www-form-urlencoded body
          try {
            const body = new URLSearchParams({ _method: 'DELETE' })
            const { data } = await http.post(url, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            return data
          } catch (errForm) {
            lastErr = errForm
          }
          continue
        }
      }
    }
    throw lastErr
  },
  // Backward compatibility for any old calls
  async like(postId) { return this.favorite(postId) },
  async addComment(postId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, comment: { id: Date.now(), content: payload?.content, created_at: new Date().toISOString(), user: { id: 1, username: 'you' } } }
    }
    const { data } = await http.post(API_CONFIG.posts.comments(postId), payload)
    return data
  },
  async getComments(postId, params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { comments: [], pagination: { current_page: 1, total_pages: 1, has_more: false }, count: 0 }
    }
    const { data } = await http.get(API_CONFIG.posts.comments(postId), { params })
    const root = data?.data || data
    return {
      comments: root?.comments || [],
      pagination: root?.pagination || null,
      count: root?.comments_count ?? (root?.comments ? root.comments.length : 0)
    }
  },
  async saved(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { data: [], meta: { page: 1, limit: 0, total: 0, last_page: 1 } }
    }
    const { data } = await http.get(API_CONFIG.posts.saved, { params })
    return normalizeList(data)
  },
  async savedPosts(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [], pagination: { page: 1, limit: 0, total: 0, pages: 1, hasNext: false } }
    }
    const { data } = await http.get(API_CONFIG.posts.savedPosts, { params })
    // Expected shape { success, data:{ posts:[], pagination:{} } }
    const posts = data?.data?.posts || data?.posts || []
    const pagination = data?.data?.pagination || data?.pagination || null
    return { posts, pagination }
  }
}

// Fetch current user's favorites (liked) posts
export async function getMyFavorites(params = {}) {
  const { data } = await http.get(API_CONFIG.posts.myFavorites, { params })
  const root = data?.data || data
  return {
    posts: root?.posts || [],
    pagination: root?.pagination || null
  }
}

export default PostsService
