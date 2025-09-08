import { defineStore } from 'pinia'
import { TagsService } from '@/services/tagsService'
import { usePostsStore } from '@/store/posts'
// Local helper to resolve a hashtag image
function getHashtagImage(tag = '') {
  const key = String(tag || '').toLowerCase()
  const map = {
  }
  return map[key] || '/images/FanRadar.png'
}

export const useHashtagsStore = defineStore('hashtags', {
  state: () => ({
    // Hashtag-specific posts
    hashtagPosts: {
    },
    // Backend posts keyed by hashtagId
    postsById: {
      // [id]: { items: Post[], pagination: { page, limit, hasNext } }
    },

    // Hashtag-specific news
    hashtagNews: {
    },

    // Related hashtags data
    relatedHashtags: [
     
    ],

    // Inlined hashtag descriptions and stats (from constants)
    descriptions: {
    
    },
    stats: {
    }
  }),

  getters: {
    // Get posts by hashtag
    getPostsByHashtag: (state) => (hashtag) => {
      return state.hashtagPosts[hashtag] || []
    },
    // Get posts by hashtag numeric id
    getPostsByHashtagId: (state) => (id) => {
      const key = String(id)
      return state.postsById[key]?.items || []
    },

    // Get news by hashtag
    getNewsByHashtag: (state) => (hashtag) => {
      return state.hashtagNews[hashtag] || []
    },

    // Generate default posts for hashtags without specific data
    getDefaultPostsForHashtag: (state) => (hashtag) => {
      return [
      ]
    },

    // Generate default news for hashtags without specific data
    getDefaultNewsForHashtag: (state) => (hashtag) => {
      return [
        
      ]
    },

    // Get all related hashtags
    getAllRelatedHashtags: (state) => {
      return state.relatedHashtags
    },

    // New getters for inlined descriptions and stats
    getHashtagDescription: (state) => (hashtag) => state.descriptions[hashtag] || `Join the conversation about #${hashtag} and connect with like-minded fans.`,
    getHashtagStats: (state) => (hashtag) => state.stats[hashtag] || { posts: '500K', growth: '10' }
  },

  actions: {
    // Fetch posts by backend hashtag id and cache them
    async fetchPostsById(id, { page = 1, limit = 10 } = {}) {
      if (!id) return { success: false, error: 'missing id' }
      try {
        const payload = await TagsService.postsById(id, { page, limit })
        const arr = payload?.posts || payload?.data?.posts || payload?.data || payload || []
        const postsStore = usePostsStore()
        const mapped = Array.isArray(arr) ? arr.map(p => postsStore.mapBackendPost(p)).filter(Boolean) : []
        const key = String(id)
        const rawPag = payload?.pagination || {}
        const norm = {
          page: Number(rawPag.page ?? rawPag.current_page ?? page ?? 1),
          limit: Number(rawPag.per_page ?? rawPag.limit ?? limit ?? 10),
          total: Number(rawPag.total ?? 0),
          lastPage: Number(rawPag.last_page ?? rawPag.total_pages ?? 1),
          hasNext: Boolean(
            rawPag.hasNext ?? rawPag.has_more ?? ((Number(rawPag.page ?? 1)) < (Number(rawPag.last_page ?? 1)))
          )
        }
        const pagination = norm
        this.postsById[key] = { items: mapped, pagination }
        return { success: true, count: mapped.length, pagination }
      } catch (e) {
        return { success: false, error: e?.message || 'fetch failed' }
      }
    },
    async loadMoreById(id) {
      const key = String(id)
      const slot = this.postsById[key]
      if (!slot?.pagination?.hasNext) return { success: true, count: 0, done: true }
      const nextPage = (Number(slot.pagination.page) || 1) + 1
      try {
        const payload = await TagsService.postsById(id, { page: nextPage, limit: slot.pagination.limit || 10 })
        const arr = payload?.posts || payload?.data?.posts || payload?.data || payload || []
        const postsStore = usePostsStore()
        const mapped = Array.isArray(arr) ? arr.map(p => postsStore.mapBackendPost(p)).filter(Boolean) : []
        slot.items.push(...mapped)
        const rawPag = payload?.pagination || {}
        slot.pagination = {
          page: Number(rawPag.page ?? rawPag.current_page ?? nextPage),
          limit: Number(rawPag.per_page ?? rawPag.limit ?? (slot.pagination.limit || 10)),
          total: Number(rawPag.total ?? slot.pagination.total ?? 0),
          lastPage: Number(rawPag.last_page ?? rawPag.total_pages ?? slot.pagination.lastPage ?? nextPage),
          hasNext: Boolean(
            rawPag.hasNext ?? rawPag.has_more ?? ((Number(rawPag.page ?? nextPage)) < (Number(rawPag.last_page ?? nextPage)))
          )
        }
        this.postsById[key] = { ...slot }
        return { success: true, count: mapped.length, pagination: slot.pagination }
      } catch (e) {
        return { success: false, error: e?.message || 'fetch failed' }
      }
    },
    // Add new hashtag post
    addHashtagPost(hashtag, post) {
      if (!this.hashtagPosts[hashtag]) {
        this.hashtagPosts[hashtag] = []
      }
      const newId = Date.now()
      this.hashtagPosts[hashtag].unshift({
        id: newId,
        ...post
      })
    },

    // Like hashtag post
    likeHashtagPost(hashtag, postId) {
      const posts = this.hashtagPosts[hashtag]
      if (posts) {
        const post = posts.find(p => p.id === postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likes += post.isLiked ? 1 : -1
        }
      }
    },

  // shareHashtagPost removed

    // Add related hashtag
    addRelatedHashtag(hashtag) {
      if (!this.relatedHashtags.find(h => h.name === hashtag.name)) {
        this.relatedHashtags.push(hashtag)
      }
    }
  }
})
