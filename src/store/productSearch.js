import { defineStore } from 'pinia'

export const useProductSearchStore = defineStore('productSearch', {
  state: () => ({
    recentSearches: [
      'gaming keyboard',
      'anime figures',
      'band merchandise'
    ],
    searchResults: {
      products: [],
      categories: [],
      brands: []
    },
    isSearching: false
  }),
  actions: {
    setRecentSearches(searches) {
      this.recentSearches = searches
    },
    addRecentSearch(term) {
      const index = this.recentSearches.indexOf(term)
      if (index > -1) {
        this.recentSearches.splice(index, 1)
      }
      this.recentSearches.unshift(term)
      if (this.recentSearches.length > 5) {
        this.recentSearches = this.recentSearches.slice(0, 5)
      }
      localStorage.setItem('productRecentSearches', JSON.stringify(this.recentSearches))
    },
    removeRecentSearch(term) {
      const index = this.recentSearches.indexOf(term)
      if (index > -1) {
        this.recentSearches.splice(index, 1)
        localStorage.setItem('productRecentSearches', JSON.stringify(this.recentSearches))
      }
    },
    clearRecentSearches() {
      this.recentSearches = []
      localStorage.removeItem('productRecentSearches')
    },
    setSearchResults(results) {
      this.searchResults = results
    },
    setIsSearching(val) {
      this.isSearching = val
    },
    loadRecentSearches() {
      const saved = localStorage.getItem('productRecentSearches')
      if (saved) {
        try {
          this.recentSearches = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading recent searches:', e)
        }
      }
    }
  }
})
