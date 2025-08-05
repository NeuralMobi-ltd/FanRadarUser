import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Attack on Titan Survey Corps Hoodie',
        category: 'Apparel',
        brand: 'Anime Central',
        price: 45.99,
        originalPrice: 59.99,
        discount: 23,
        rating: 4.8,
        reviews: 324,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        isNew: false,
        isWishlisted: false
      },
      {
        id: 2,
        name: 'Marvel Avengers Logo T-Shirt',
        category: 'Apparel',
        brand: 'Marvel Official',
        price: 24.99,
        rating: 4.6,
        reviews: 512,
        stock: 28,
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop',
        isNew: true,
        isWishlisted: false
      },
      {
        id: 3,
        name: 'League of Legends Championship Trophy Replica',
        category: 'Collectibles',
        brand: 'Riot Games',
        price: 89.99,
        rating: 4.9,
        reviews: 89,
        stock: 7,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
        isNew: false,
        isWishlisted: true
      },
      {
        id: 4,
        name: 'K-Pop BTS Photocard Set',
        category: 'Collectibles',
        brand: 'Big Hit Music',
        price: 19.99,
        rating: 4.7,
        reviews: 756,
        stock: 42,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        isNew: true,
        isWishlisted: false
      },
      {
        id: 5,
        name: 'Gaming Chair Supreme RGB',
        category: 'Tech Gadgets',
        brand: 'GamerHub',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        rating: 4.5,
        reviews: 128,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop',
        isNew: false,
        isWishlisted: false
      },
      {
        id: 6,
        name: 'Anime Character Wall Poster Set',
        category: 'Posters',
        brand: 'AnimePrint',
        price: 15.99,
        rating: 4.4,
        reviews: 89,
        stock: 156,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        isNew: false,
        isWishlisted: false
      },
      {
        id: 7,
        name: 'Marvel Comics Classic Collection',
        category: 'Books',
        brand: 'Marvel Comics',
        price: 39.99,
        rating: 4.9,
        reviews: 234,
        stock: 23,
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop',
        isNew: true,
        isWishlisted: true
      },
      {
        id: 8,
        name: 'Mechanical Gaming Keyboard RGB',
        category: 'Tech Gadgets',
        brand: 'TechMaster',
        price: 129.99,
        originalPrice: 159.99,
        discount: 19,
        rating: 4.7,
        reviews: 445,
        stock: 34,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop',
        isNew: false,
        isWishlisted: false
      }
    ],
    
    categories: [
      'Apparel', 'Accessories', 'Home & Living', 'Tech Gadgets', 'Collectibles', 'Books', 'Posters'
    ],
    
    brands: [
      'Anime Central', 'Marvel Official', 'Riot Games', 'Big Hit Music', 'GamerHub', 'AnimePrint', 'Marvel Comics', 'TechMaster'
    ],
    
    priceRanges: [
      { id: 1, label: 'Under $25', min: 0, max: 25 },
      { id: 2, label: '$25 - $50', min: 25, max: 50 },
      { id: 3, label: '$50 - $100', min: 50, max: 100 },
      { id: 4, label: '$100 - $200', min: 100, max: 200 },
      { id: 5, label: 'Over $200', min: 200, max: Infinity }
    ],
    
    ratings: [
      { value: 4.5, label: '4.5 & Up' },
      { value: 4.0, label: '4.0 & Up' },
      { value: 3.5, label: '3.5 & Up' },
      { value: 3.0, label: '3.0 & Up' }
    ]
  }),
  
  getters: {
    featuredProducts: (state) => state.products.filter(p => p.rating >= 4.7),
    newProducts: (state) => state.products.filter(p => p.isNew),
    discountedProducts: (state) => state.products.filter(p => p.discount),
    wishlistedProducts: (state) => state.products.filter(p => p.isWishlisted),
    
    productsByCategory: (state) => (category) => 
      category ? state.products.filter(p => p.category === category) : state.products,
    
    productsByBrand: (state) => (brand) =>
      brand ? state.products.filter(p => p.brand === brand) : state.products,
    
    productsByPriceRange: (state) => (min, max) =>
      state.products.filter(p => p.price >= min && p.price <= max),
    
    productsByRating: (state) => (minRating) =>
      state.products.filter(p => p.rating >= minRating),
    
    searchProducts: (state) => (query) => {
      if (!query) return state.products
      const lowercaseQuery = query.toLowerCase()
      return state.products.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery)
      )
    }
  },
  
  actions: {
    toggleWishlist(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isWishlisted = !product.isWishlisted
      }
    },
    
    updateStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId)
      if (product && product.stock >= quantity) {
        product.stock -= quantity
      }
    },
    
    addProduct(product) {
      const newProduct = {
        id: Date.now(),
        isNew: true,
        isWishlisted: false,
        rating: 0,
        reviews: 0,
        stock: 0,
        ...product
      }
      this.products.push(newProduct)
    },
    
    updateProduct(productId, updates) {
      const index = this.products.findIndex(p => p.id === productId)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates }
      }
    },
    
    deleteProduct(productId) {
      this.products = this.products.filter(p => p.id !== productId)
    },
    
    filterProducts(filters) {
      let filtered = this.products
      
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category)
      }
      
      if (filters.brand) {
        filtered = filtered.filter(p => p.brand === filters.brand)
      }
      
      if (filters.priceRange) {
        const { min, max } = filters.priceRange
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
      }
      
      if (filters.rating) {
        filtered = filtered.filter(p => p.rating >= filters.rating)
      }
      
      if (filters.search) {
        const query = filters.search.toLowerCase()
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        )
      }
      
      // Sort products
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case 'newest':
            filtered.sort((a, b) => b.isNew - a.isNew)
            break
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          default:
            // Featured/relevance - keep original order or sort by rating
            filtered.sort((a, b) => b.rating - a.rating)
        }
      }
      
      return filtered
    }
  }
})
