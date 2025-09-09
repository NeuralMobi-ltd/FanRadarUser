import { defineStore } from 'pinia'

export const useStoreSidebarStore = defineStore('storeSidebar', {
  state: () => ({
    priceRange: {
      min: '',
      max: ''
    },
    appliedFilters: {
      priceMin: null,
      priceMax: null,
      category: '',
  // Only subcategory and price
    },
    isFilterActive: false
  }),

  getters: {
    hasActiveFilters() {
  return this.appliedFilters.priceMin !== null || 
             this.appliedFilters.priceMax !== null ||
     this.appliedFilters.category !== ''
    },

    getActiveFilterCount() {
      let count = 0
      if (this.appliedFilters.priceMin !== null || this.appliedFilters.priceMax !== null) count++
      if (this.appliedFilters.category !== '') count++
      return count
    }
  },

  actions: {
    updatePriceRange(min, max) {
      this.priceRange.min = min
      this.priceRange.max = max
    },

    setCategory(category) {
      this.appliedFilters.category = category
    },

    applyFilters() {
      this.appliedFilters.priceMin = this.priceRange.min ? parseFloat(this.priceRange.min) : null
      this.appliedFilters.priceMax = this.priceRange.max ? parseFloat(this.priceRange.max) : null
      this.isFilterActive = true
    },

    clearAllFilters() {
      this.priceRange = { min: '', max: '' }
      this.appliedFilters = {
        priceMin: null,
        priceMax: null,
        category: '',
      }
      this.isFilterActive = false
    },

    clearPriceFilter() {
      this.priceRange = { min: '', max: '' }
      this.appliedFilters.priceMin = null
      this.appliedFilters.priceMax = null
    },

    clearCategoryFilter() {
      this.appliedFilters.category = ''
    }
  }
})
