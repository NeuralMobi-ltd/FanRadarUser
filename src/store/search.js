import NewsDataService from '@/services/newsDataService'
import SearchService from '@/services/searchService'
import { defineStore } from 'pinia'

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
  // News results via public API
  newsResults: [],
  newsPagination: { page: 1, per_page: 10, total: 0, last_page: 1, has_more: false, nextPage: null },
  newsLoading: false,
  currentQueries: { users: '', posts: '', fandoms: '', news: '' },
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
    // News via NewsData.io public API (client-side). Note: rate limits may apply.
    async fetchNews({ q, page = 1, limit = 10, append = false, debounce = 0, language = 'en', country, category } = {}) {
      return this._debounced('news', debounce, async () => {
        this.newsLoading = true
        this.currentQueries.news = q || ''
        try {
          // Newsdata API uses nextPage token for pagination; we map it into our pagination structure
          const resp = await NewsDataService.fetchLatestNews({ q, language, country, category, nextPage: append ? this.newsPagination.nextPage : undefined })
          const results = Array.isArray(resp?.results) ? resp.results : []
          // Normalize article shape to our NewsPost props
          const articles = results.map(n => ({
            id: n.article_id || n.link || `${n.title}-${n.pubDate}`,
            title: n.title,
            summary: n.description || n.summary,
            image: n.image_url || n.image || n.thumbnail,
            link: n.link || n.url,
            source: n.source_id || n.source || n.source_id,
            sourceLogo: null,
            date: n.pubDate || n.pub_date || n.published_at,
            category: Array.isArray(n.category) ? n.category[0] : n.category,
            breaking: false,
            views: Math.floor(Math.random() * 9000) + 100 // fake views for UI
          }))
          const total = typeof resp?.totalResults === 'number' ? resp.totalResults : (resp?.totalResults ? Number(resp.totalResults) : 0)
          const nextPage = resp?.nextPage || null
          // Update pagination
          const pageNum = append ? (this.newsPagination.page + 1) : 1
          const has_more = !!nextPage
          this.newsPagination = { page: pageNum, per_page: limit, total, last_page: has_more ? pageNum + 1 : pageNum, has_more, nextPage }
          if (append) this.newsResults.push(...articles)
          else this.newsResults = articles
          return { articles, pagination: this.newsPagination }
        } finally {
          this.newsLoading = false
        }
      })
    },
    async fetchMoreNews() {
      if (!this.newsPagination.has_more) return
      return this.fetchNews({ q: this.currentQueries.news, append: true, limit: this.newsPagination.per_page || 10 })
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
  hasMoreFandoms: (state) => state.fandomPagination.has_more,
  hasMoreNews: (state) => state.newsPagination.has_more
  }
})
