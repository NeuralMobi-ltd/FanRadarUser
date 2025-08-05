
import { defineStore } from 'pinia'

export const useProductSearchStore = defineStore('productSearch', {
  state: () => ({
    recentSearches: [],
    searchResults: {
      products: [],
      categories: [],
      brands: []
    },
    isSearching: false,
    error: null
  }),
  getters: {
    hasResults: (state) =>
      state.searchResults.products.length > 0 ||
      state.searchResults.categories.length > 0 ||
      state.searchResults.brands.length > 0
  },
  actions: {
    setRecentSearches(searches) {
      this.recentSearches = searches
      localStorage.setItem('productRecentSearches', JSON.stringify(searches))
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
    setError(error) {
      this.error = error
    },
    clearError() {
      this.error = null
    },
    loadRecentSearches() {
      const saved = localStorage.getItem('productRecentSearches')
      if (saved) {
        try {
          this.recentSearches = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading recent searches:', e)
        }
      } else {
        // Default demo data
        this.recentSearches = [
          'gaming keyboard',
          'anime figures',
          'band merchandise'
        ]
      }
    },
    async fetchSearchResults(query) {
      this.setIsSearching(true)
      this.clearError()
      try {
        // Replace this with your real API endpoint
        // Example: const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        // const data = await response.json()
        // this.setSearchResults(data)

        // Demo: Simulate API delay and use mock constants
        await new Promise(resolve => setTimeout(resolve, 400))
        const { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } = await import('@/constants/productSearchConstants')
        this.setSearchResults({
          products: MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
          categories: MOCK_CATEGORIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase())),
          brands: MOCK_BRANDS.filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
        })
      } catch (error) {
        this.setError('Failed to fetch search results.')
      } finally {
        this.setIsSearching(false)
      }
    }
  }
})
