import { defineStore } from 'pinia'

export const useStoreSidebarStore = defineStore('storeSidebar', {
  state: () => ({
    selectedBrands: [],
    priceRange: {
      min: '',
      max: ''
    },
    appliedFilters: {
      brands: [],
      priceMin: null,
      priceMax: null,
      category: '',
      quickFilters: [],
      search: ''
    },
    isFilterActive: false
  }),

  getters: {
    hasActiveFilters() {
      return this.appliedFilters.brands.length > 0 || 
             this.appliedFilters.priceMin !== null || 
             this.appliedFilters.priceMax !== null ||
             this.appliedFilters.category !== '' ||
             this.appliedFilters.quickFilters.length > 0 ||
             this.appliedFilters.search !== ''
    },

    getActiveFilterCount() {
      let count = 0
      if (this.appliedFilters.brands.length > 0) count++
      if (this.appliedFilters.priceMin !== null || this.appliedFilters.priceMax !== null) count++
      if (this.appliedFilters.category !== '') count++
      if (this.appliedFilters.quickFilters.length > 0) count += this.appliedFilters.quickFilters.length
      if (this.appliedFilters.search !== '') count++
      return count
    }
  },

  actions: {
    toggleBrand(brandSlug) {
      const index = this.selectedBrands.indexOf(brandSlug)
      if (index > -1) {
        this.selectedBrands.splice(index, 1)
      } else {
        this.selectedBrands.push(brandSlug)
      }
    },

    updatePriceRange(min, max) {
      this.priceRange.min = min
      this.priceRange.max = max
    },

    setCategory(category) {
      this.appliedFilters.category = category
    },

    setQuickFilters(filters) {
      this.appliedFilters.quickFilters = [...filters]
    },

    setSearchQuery(query) {
      this.appliedFilters.search = query
    },

    applyFilters() {
      this.appliedFilters.brands = [...this.selectedBrands]
      this.appliedFilters.priceMin = this.priceRange.min ? parseFloat(this.priceRange.min) : null
      this.appliedFilters.priceMax = this.priceRange.max ? parseFloat(this.priceRange.max) : null
      this.isFilterActive = true
    },

    clearAllFilters() {
      this.selectedBrands = []
      this.priceRange = { min: '', max: '' }
      this.appliedFilters = {
        brands: [],
        priceMin: null,
        priceMax: null,
        category: '',
        quickFilters: [],
        search: ''
      }
      this.isFilterActive = false
    },

    clearPriceFilter() {
      this.priceRange = { min: '', max: '' }
      this.appliedFilters.priceMin = null
      this.appliedFilters.priceMax = null
    },

    clearBrandFilters() {
      this.selectedBrands = []
      this.appliedFilters.brands = []
    },

    clearCategoryFilter() {
      this.appliedFilters.category = ''
    },

    clearQuickFilters() {
      this.appliedFilters.quickFilters = []
    },

    clearSearchFilter() {
      this.appliedFilters.search = ''
    }
  }
})
