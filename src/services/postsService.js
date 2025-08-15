import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const PostsService = {
  async homeFeed(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.feed.home, { params })
    return data
  },
  async exploreFeed(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.feed.explore, { params })
    return data
  },
  async trending(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.feed.trendingPosts, { params })
    return data
  },
  async create(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return {
        post: {
          id: Date.now(),
          content: payload?.content || '',
          media: payload?.media || [],
          author: { name: 'You', avatar: '/images/me.png' },
          createdAt: new Date().toISOString()
        }
      }
    }
    const { data } = await http.post(API_CONFIG.posts.create, payload)
    return data
  },
  async like(postId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.post(API_CONFIG.posts.like(postId))
    return data
  },
  async addComment(postId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true, comment: { id: Date.now(), ...payload } }
    }
    const { data } = await http.post(API_CONFIG.posts.comments(postId), payload)
    return data
  },
  async share(postId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.post(API_CONFIG.posts.share(postId), payload)
    return data
  },
  async saved() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { posts: [] }
    }
    const { data } = await http.get(API_CONFIG.posts.saved)
    return data
  }
}

export default PostsService
