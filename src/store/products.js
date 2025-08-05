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
      },
      // Search Results Products
      {
        id: 9,
        name: 'Gaming Mechanical Keyboard RGB',
        category: 'Electronics',
        price: 129.99,
        rating: 5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
        description: 'High-quality mechanical keyboard with RGB lighting',
        isWishlisted: false,
        brand: 'Razer',
        stock: 25
      },
      {
        id: 10,
        name: 'Gaming Headset Pro Wireless',
        category: 'Electronics',
        price: 149.99,
        rating: 5,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        description: 'Premium wireless gaming headset with 7.1 surround sound',
        isWishlisted: false,
        brand: 'SteelSeries',
        stock: 18
      },
      {
        id: 11,
        name: 'Gaming Headset RGB Wired',
        category: 'Electronics',
        price: 89.99,
        rating: 4,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        description: 'RGB gaming headset with crystal clear microphone',
        isWishlisted: false,
        brand: 'Razer',
        stock: 12
      },
      {
        id: 12,
        name: 'Professional Gaming Headset',
        category: 'Electronics',
        price: 199.99,
        rating: 5,
        reviews: 423,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
        description: 'Professional esports gaming headset with noise cancellation',
        isWishlisted: true,
        brand: 'HyperX',
        stock: 8
      },
      {
        id: 13,
        name: 'Anime Character Figure Collection',
        category: 'Collectibles',
        price: 34.99,
        rating: 4,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        description: 'Premium quality anime figure with detailed craftsmanship',
        isWishlisted: true,
        brand: 'Good Smile',
        stock: 15
      },
      {
        id: 14,
        name: 'Gaming Ergonomic Chair',
        category: 'Home & Living',
        price: 299.99,
        rating: 5,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        description: 'Comfortable gaming chair with lumbar support',
        isWishlisted: false,
        brand: 'Secretlab',
        stock: 5
      },
      {
        id: 15,
        name: 'Wireless Gaming Mouse',
        category: 'Electronics',
        price: 79.99,
        rating: 4,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        description: 'High precision wireless gaming mouse',
        isWishlisted: false,
        brand: 'Corsair',
        stock: 22
      },
      {
        id: 16,
        name: 'Gaming Headset Stand RGB',
        category: 'Accessories',
        price: 29.99,
        rating: 4,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        description: 'RGB headset stand with USB charging ports',
        isWishlisted: false,
        brand: 'Corsair',
        stock: 30
      },
      {
        id: 17,
        name: 'Band Merchandise T-Shirt',
        category: 'Clothing',
        price: 24.99,
        rating: 4,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Official band merchandise t-shirt',
        isWishlisted: false,
        brand: 'Official',
        stock: 40
      },
      {
        id: 18,
        name: 'Gaming Monitor 144Hz',
        category: 'Electronics',
        price: 349.99,
        rating: 5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop',
        description: '27-inch gaming monitor with 144Hz refresh rate',
        isWishlisted: false,
        brand: 'ASUS',
        stock: 7
      },
      {
        id: 19,
        name: 'Gaming Desk RGB LED',
        category: 'Home & Living',
        price: 189.99,
        rating: 4,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
        description: 'Gaming desk with built-in RGB LED lighting',
        isWishlisted: false,
        brand: 'IKEA Gaming',
        stock: 10
      },
      {
        id: 20,
        name: 'Collectible Gaming Figurine',
        category: 'Collectibles',
        price: 45.99,
        rating: 5,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        description: 'Limited edition gaming character figurine',
        isWishlisted: false,
        brand: 'Funko',
        stock: 12
      }
    ],
    
    categories: [
      'Apparel', 'Accessories', 'Home & Living', 'Tech Gadgets', 'Collectibles', 'Books', 'Posters', 'Electronics', 'Clothing'
    ],
    
    brands: [
      'Anime Central', 'Marvel Official', 'Riot Games', 'Big Hit Music', 'GamerHub', 'AnimePrint', 'Marvel Comics', 'TechMaster',
      'Razer', 'SteelSeries', 'HyperX', 'Good Smile', 'Secretlab', 'Corsair', 'Official', 'ASUS', 'IKEA Gaming', 'Funko'
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

    toggleWishlist(productId) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isWishlisted = !product.isWishlisted
      }
    },
    
    deleteProduct(productId) {
      this.products = this.products.filter(p => p.id !== productId)
    },

    // Search-specific methods
    filterByPriceRange(products, priceRanges) {
      if (!priceRanges.length) return products
      
      return products.filter(product => {
        return priceRanges.some(range => {
          if (range === '0-25') return product.price < 25
          if (range === '25-50') return product.price >= 25 && product.price < 50
          if (range === '50-100') return product.price >= 50 && product.price < 100
          if (range === '100-200') return product.price >= 100 && product.price < 200
          if (range === '200+') return product.price >= 200
          return false
        })
      })
    },

    filterByCategories(products, categoryIds) {
      if (!categoryIds.length) return products
      
      return products.filter(product => 
        categoryIds.includes(product.category)
      )
    },

    filterByRating(products, ratings) {
      if (!ratings.length) return products
      
      const minRating = Math.min(...ratings)
      return products.filter(product => product.rating >= minRating)
    },

    sortProducts(products, sortBy) {
      const sorted = [...products]
      
      switch (sortBy) {
        case 'price-low':
          return sorted.sort((a, b) => a.price - b.price)
        case 'price-high':
          return sorted.sort((a, b) => b.price - a.price)
        case 'rating':
          return sorted.sort((a, b) => b.rating - a.rating)
        case 'newest':
          return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        case 'relevance':
        default:
          return sorted.sort((a, b) => b.rating - a.rating)
      }
    },

    // Mart-specific methods
    getMartProducts() {
      // Return all products for the mart page
      return this.products
    },

    filterMartProducts(filters) {
      let filtered = this.products

      // Filter by category
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category)
      }

      // Filter by brand
      if (filters.brand) {
        filtered = filtered.filter(p => p.brand === filters.brand)
      }

      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(v => v === '+' ? Infinity : parseFloat(v))
        if (min !== undefined) {
          filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true))
        }
      }

      return filtered
    },

    sortMartProducts(products, sortBy) {
      const sorted = [...products]

      switch (sortBy) {
        case 'price-low':
          return sorted.sort((a, b) => a.price - b.price)
        case 'price-high':
          return sorted.sort((a, b) => b.price - a.price)
        case 'rating':
          return sorted.sort((a, b) => b.rating - a.rating)
        case 'newest':
          return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        case 'featured':
        default:
          // Featured - sort by rating and new status
          return sorted.sort((a, b) => {
            if (a.isNew !== b.isNew) return b.isNew - a.isNew
            return b.rating - a.rating
          })
      }
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
