import { defineStore } from 'pinia'
import { fetchLatestNews } from '@/services/newsDataService'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsItems: [],
    // Category-specific news for CategoryDetail pages
    categoryNews: {},
    loading: false,
    error: null,
    nextPageToken: null,
    hasMore: true,
    // last used filters
    lastQuery: {
      q: '',
      language: '',
      country: '',
      category: '',
    }
  }),
  
  getters: {
  breakingNews: (state) => state.newsItems.filter(news => news.breaking),
  recentNews: (state) => state.newsItems.slice().sort((a, b) => {
      const dateA = typeof a.date === 'string' ? new Date() : a.date
      const dateB = typeof b.date === 'string' ? new Date() : b.date
      return dateB - dateA
    }),
    
    // Get news by category for CategoryDetail pages
    getNewsByCategory: (state) => (category) => {
      return state.categoryNews[category] || []
    },
    
    // Generate default news for categories without specific data
  getDefaultNewsForCategory: () => () => []
  },
  
  actions: {
    setError(err) { this.error = err?.message || err || 'Failed to load news' },
    clearError() { this.error = null },

    // Map Newsdata.io item -> app shape consumed by components
    mapItem(item) {
      // Convert pubDate to Date
      const date = item.pubDate ? new Date(item.pubDate.replace(' ', 'T') + 'Z') : new Date()
      return {
        id: item.article_id || item.link || Date.now() + Math.random(),
        title: item.title || '',
        summary: item.description || '',
        description: item.description || '',
        image: item.image_url || '',
        source: item.source_name || item.source_id || item.source_url || 'Source',
        sourceLogo: item.source_icon || '',
        link: item.link,
        category: Array.isArray(item.category) ? item.category[0] : item.category || '',
        keywords: item.keywords || [],
        language: item.language,
        country: Array.isArray(item.country) ? item.country[0] : item.country,
        date,
        views: Math.floor(Math.random() * 9000) + 1000, // mock views for UI
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 120),
        isLiked: false,
        breaking: (Array.isArray(item.category) ? item.category : [item.category]).some((c) => String(c).toLowerCase() === 'top'),
      }
    },

  async fetchNews({ q, language, country, category } = {}) {
      if (this.loading) return
      this.loading = true
      this.clearError()
      try {
    const data = await fetchLatestNews({ q, language, country, category })
        const items = (data?.results || []).map(this.mapItem)
        this.newsItems = items
        this.nextPageToken = data?.nextPage || null
        this.hasMore = !!this.nextPageToken
        this.lastQuery = { q: q || '', language: language || '', country: country || '', category: category || '' }
      } catch (e) {
        // Fallback: some plans reject certain param combos; try with minimal filters
        if (e?.code === 'UnsupportedParameter') {
          try {
            const data = await fetchLatestNews({ q, language })
            const items = (data?.results || []).map(this.mapItem)
            this.newsItems = items
            this.nextPageToken = data?.nextPage || null
            this.hasMore = !!this.nextPageToken
            this.lastQuery = { q: q || '', language: language || '', country: '', category: '' }
          } catch (inner) {
            this.setError(inner)
          }
        } else {
          this.setError(e)
        }
      } finally {
        this.loading = false
      }
    },

    async loadMore() {
      if (this.loading || !this.hasMore) return
      this.loading = true
      try {
        const data = await fetchLatestNews({
          ...this.lastQuery,
          nextPage: this.nextPageToken,
        })
  const items = (data?.results || []).map(this.mapItem)
  // de-duplicate by id
  const existing = new Set(this.newsItems.map((n) => n.id))
  const fresh = items.filter((n) => !existing.has(n.id))
  this.newsItems.push(...fresh)
        this.nextPageToken = data?.nextPage || null
        this.hasMore = !!this.nextPageToken
      } catch (e) {
        this.setError(e)
      } finally {
        this.loading = false
      }
    },

    addNews(news) {
      const newNews = {
        id: Date.now(),
        ...news,
        date: new Date(),
        timeAgo: 'Just now',
        views: 0,
        likes: 0,
        isLiked: false,
        isNew: true
      }
      this.newsItems.unshift(newNews)
    },
    
    updateViews(newsId) {
      const news = this.newsItems.find(item => item.id === newsId)
      if (news && typeof news.views === 'number') {
        news.views += 1
      }
      
      // Also check category news
      Object.values(this.categoryNews).forEach(categoryItems => {
        const categoryNews = categoryItems.find(item => item.id === newsId)
        if (categoryNews && typeof categoryNews.views === 'number') {
          categoryNews.views += 1
        }
      })
    },
    
    toggleLike(newsId) {
      const news = this.newsItems.find(item => item.id === newsId)
      if (news) {
        news.isLiked = !news.isLiked
        if (news.isLiked) {
          news.likes += 1
        } else {
          news.likes = Math.max(0, news.likes - 1)
        }
      }
      
      // Also check category news
      Object.values(this.categoryNews).forEach(categoryItems => {
        const categoryNews = categoryItems.find(item => item.id === newsId)
        if (categoryNews) {
          categoryNews.isLiked = !categoryNews.isLiked
          if (categoryNews.isLiked) {
            categoryNews.likes += 1
          } else {
            categoryNews.likes = Math.max(0, categoryNews.likes - 1)
          }
        }
      })
    }
  }
})
