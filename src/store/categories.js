import { fetchCategories, fetchSubcategories } from '@/services/categoriesApi'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    // Inlined categories (previously from constants/communityCategories)
    categories: [
    ],
    lastFetched: null,
    loading: false,
    error: null,

    // Inlined descriptions (previously from constants/categoryDescriptions)
    descriptions: {
      
    },

    // Inlined category colors (previously from constants/categoryColors)
    colors: {
      
    },

    // Inlined category statistics (previously from constants/categoryStats)
    stats: {
     
  },

  // Subcategories cache: { [categoryId]: [{id, name, category_id}] }
  subcategories: {},
  subLoading: {},
  subError: {}
  }),
  getters: {
    getCategories: (state) => state.categories,
  getCategoryByName: (state) => (name) => {
    if (!name) return null
    const needle = String(name).toLowerCase()
    return state.categories.find(c => String(c.name || '').toLowerCase() === needle) || null
  },
  categoryIdByName: (state) => (name) => {
    if (!name) return null
    const needle = String(name).toLowerCase()
    const isSlug = needle.includes('-')
    for (const c of state.categories) {
      const cname = String(c.name || '').toLowerCase()
      const cslug = cname.replace(/\s+/g, '-')
      if (cname === needle) return c.id
      if (isSlug && cslug === needle) return c.id
    }
    return null
  },
  getSubcategories: (state) => (categoryId) => state.subcategories[categoryId] || [],
  hasSubcategories: (state) => (categoryId) => (state.subcategories[categoryId] || []).length > 0,
    getCategoryDescription: (state) => (categoryName, formattedName) => {
      const cat = state.categories.find(c => String(c.name || '').toLowerCase() === String(categoryName||'').toLowerCase())
      return cat?.description || state.descriptions[categoryName] || `Join the ${formattedName || categoryName} community and connect with fellow enthusiasts.`
    },
    getCategoryColor: (state) => (categoryName) => {
      return state.colors[categoryName] || 'bg-blue-600'
    },
    getCategoryImage: (state) => (categoryName) => {
      const cat = state.categories.find(c => String(c.name || '').toLowerCase() === String(categoryName||'').toLowerCase())
      return cat?.image || null
    },
    getCategoryStats: (state) => (categoryName) => {
      return state.stats[categoryName] || { communities: '250+', members: '1.2M+' }
    }
  }
  , actions: {
    async fetchCategoriesIfNeeded(force = false) {
      if (this.loading) return
      const stale = !this.lastFetched || (Date.now() - this.lastFetched) > 5 * 60 * 1000
      if (!force && !stale) return
      try {
        this.loading = true
        this.error = null
        const apiCategories = await fetchCategories()
        if (Array.isArray(apiCategories) && apiCategories.length) {
          // Merge colors/icons if names match fallback
            this.categories = apiCategories.map(c => {
              const fallback = this.categories.find(f => f.name.toLowerCase() === c.name.toLowerCase()) || {}
              return {
                id: c.id,
                name: c.name,
                image: c.image || fallback.image || null,
                description: c.description || fallback.description || null,
                color: fallback.color || '#3B82F6',
                faIcon: fallback.faIcon || 'fas fa-tag'
              }
            })
          this.lastFetched = Date.now()
        }
      } catch (e) {
        this.error = e?.message || 'Failed to load categories'
      } finally {
        this.loading = false
      }
    },
    async fetchSubcategoriesFor(categoryId, force = false) {
      if (!categoryId) return []
      if (this.subLoading[categoryId]) return this.subcategories[categoryId] || []
      const cached = this.subcategories[categoryId]
      if (cached && !force) return cached
      try {
        this.subLoading[categoryId] = true
        this.subError[categoryId] = null
        const subs = await fetchSubcategories(categoryId)
        this.subcategories[categoryId] = subs
        return subs
      } catch (e) {
        this.subError[categoryId] = e?.message || 'Failed to load subcategories'
        return []
      } finally {
        this.subLoading[categoryId] = false
      }
    }
  }
})
