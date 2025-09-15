import ProductsService from '@/services/productsService'
import { useProductsStore } from '@/store/products'
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
      const productsStore = useProductsStore()
      this.setIsSearching(true)
      this.clearError()
      try {
        const q = (query || '').toLowerCase().trim()
        if (!q) {
          this.setSearchResults({ products: [], categories: [], brands: [] })
          return
        }

        // Prefer backend search for live suggestions (limit to 5)
        let productMatches = []
        try {
          const { products } = await ProductsService.search({ q, page: 1, per_page: 5 })
          productMatches = products || []
        } catch (e) {
          // Fallback: filter locally if backend fails
          productMatches = productsStore.products.filter(p =>
            (p.name || '').toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q) ||
            (p.brand || '').toLowerCase().includes(q)
          ).slice(0, 5)
        }

        // Category matches derived from store categories with counts
        const categories = (productsStore.categories || [])
          .filter(name => (name || '').toLowerCase().includes(q))
          .map((name, idx) => ({
            id: idx + 1,
            name,
            icon: 'fas fa-tags',
            productCount: productsStore.products.filter(p => (p.category || '') === name).length
          }))

        // Brand matches derived from store brands with counts and simple logos
        const brands = (productsStore.brands || [])
          .filter(name => (name || '').toLowerCase().includes(q))
          .map((name, idx) => ({
            id: idx + 1,
            name,
            logo: `https://logo.clearbit.com/${name.replace(/\s+/g, '').toLowerCase()}.com`,
            productCount: productsStore.products.filter(p => (p.brand || '').toLowerCase() === name.toLowerCase()).length
          }))

        this.setSearchResults({
          products: productMatches,
          categories,
          brands
        })
      } catch (error) {
        this.setError('Failed to fetch search results.')
      } finally {
        this.setIsSearching(false)
      }
    }
  }
})
