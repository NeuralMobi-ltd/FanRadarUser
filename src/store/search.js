import { defineStore } from 'pinia'
import SearchService from '@/services/searchService'

export const useSearchStore = defineStore('search', {
  state: () => ({
  recentSearches: [],
  trendingSearches: [],
  // Server-backed search result state
  userResults: [],
  userPagination: { page: 1, per_page: 0, total: 0, last_page: 1, has_more: false },
  usersLoading: false,
  postResults: [],
  postPagination: { page: 1, per_page: 0, total: 0, last_page: 1, has_more: false },
  postsLoading: false,
  fandomResults: [],
  fandomPagination: { page: 1, per_page: 0, total: 0, last_page: 1, has_more: false },
  fandomsLoading: false,
  currentQueries: { users: '', posts: '', fandoms: '' },
  _debounceTimers: {}
  }),

  actions: {
    async globalSearch(query, type) {
      if (!query) return { results: [], total: 0 }
      const res = await SearchService.global(query, type)
      const payload = res?.data || res
      return payload
    },

    addToRecentSearches(searchTerm) {
      // Remove if already exists
      this.recentSearches = this.recentSearches.filter(term => term !== searchTerm)
      // Add to beginning
      this.recentSearches.unshift(searchTerm)
      // Keep only last 10 searches
      this.recentSearches = this.recentSearches.slice(0, 10)
    },

    removeRecentSearch(searchTerm) {
      this.recentSearches = this.recentSearches.filter(term => term !== searchTerm)
    },

    clearRecentSearches() {
      this.recentSearches = []
    },

  // All mock search helpers removed; rely on backend

    // ---- Server-backed search actions ----
    async fetchUsers({ q, page = 1, limit = 20, append = false, debounce = 0 }) {
      return this._debounced('users', debounce, async () => {
        this.usersLoading = true
        this.currentQueries.users = q
        try {
          const { users, pagination } = await SearchService.users({ q, page, limit })
          this.userPagination = pagination
          if (append) this.userResults.push(...users)
          else this.userResults = users
          return { users, pagination }
        } finally {
          this.usersLoading = false
        }
      })
    },
    async fetchMoreUsers() {
      if (!this.userPagination.has_more) return
      const next = this.userPagination.page + 1
      return this.fetchUsers({ q: this.currentQueries.users, page: next, limit: this.userPagination.per_page || 20, append: true })
    },
    async fetchPosts(params = {}, { append = false, debounce = 0 } = {}) {
      return this._debounced('posts', debounce, async () => {
        this.postsLoading = true
        this.currentQueries.posts = params.q || ''
        try {
          const { posts, pagination } = await SearchService.posts(params)
          this.postPagination = pagination
            if (append) this.postResults.push(...posts)
            else this.postResults = posts
          return { posts, pagination }
        } finally {
          this.postsLoading = false
        }
      })
    },
    async fetchMorePosts() {
      if (!this.postPagination.has_more) return
      const next = this.postPagination.page + 1
      return this.fetchPosts({ q: this.currentQueries.posts, page: next, limit: this.postPagination.per_page || 20 }, { append: true })
    },
    async fetchFandoms({ q, page = 1, limit = 20, append = false, debounce = 0 }) {
      return this._debounced('fandoms', debounce, async () => {
        this.fandomsLoading = true
        this.currentQueries.fandoms = q
        try {
          const { fandoms, pagination } = await SearchService.fandoms({ q, page, limit })
          this.fandomPagination = pagination
          if (append) this.fandomResults.push(...fandoms)
          else this.fandomResults = fandoms
          return { fandoms, pagination }
        } finally {
          this.fandomsLoading = false
        }
      })
    },
    async fetchMoreFandoms() {
      if (!this.fandomPagination.has_more) return
      const next = this.fandomPagination.page + 1
      return this.fetchFandoms({ q: this.currentQueries.fandoms, page: next, limit: this.fandomPagination.per_page || 20, append: true })
    },
    _debounced(key, wait, fn) {
      if (!wait) return fn()
      if (this._debounceTimers[key]) clearTimeout(this._debounceTimers[key])
      return new Promise((resolve, reject) => {
        this._debounceTimers[key] = setTimeout(async () => {
          try { resolve(await fn()) } catch (e) { reject(e) }
        }, wait)
      })
    }
  },

  getters: {
    getTrendingByCategory: (state) => (category) => {
      return state.trendingSearches.filter(trend => trend.category === category)
    },

    getRecentSearches: (state) => state.recentSearches,

  getTotalResults: () => () => 0,
  hasMoreUsers: (state) => state.userPagination.has_more,
  hasMorePosts: (state) => state.postPagination.has_more,
  hasMoreFandoms: (state) => state.fandomPagination.has_more
  }
})
