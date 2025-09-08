import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsItems: [],
    // Category-specific news for CategoryDetail pages
    categoryNews: {}
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
