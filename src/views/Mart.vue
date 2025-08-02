<template>
  <div class="p-6">
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 mb-8 overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-white">
        <h1 class="text-4xl font-bold mb-4">FanRadar Official Store</h1>
        <p class="text-xl mb-6">Discover exclusive merchandise from your favorite fandoms</p>
        <div class="flex flex-wrap gap-4">
          <span class="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm">✨ New Arrivals</span>
          <span class="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm">🚚 Free Shipping</span>
          <span class="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm">💎 Premium Quality</span>
        </div>
      </div>
    </div>

    <!-- Filter and Sort -->
    <div class="flex flex-wrap items-center justify-between mb-6 gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <select v-model="selectedCategory" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="priceRange" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="">All Prices</option>
          <option value="0-25">$0 - $25</option>
          <option value="25-50">$25 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100+">$100+</option>
        </select>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-gray-600 dark:text-gray-400">{{ filteredProducts.length }} products</span>
        <select v-model="sortBy" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in paginatedProducts" :key="product.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <!-- Product Image -->
        <div class="relative aspect-square overflow-hidden">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            <span v-if="product.isNew" class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">New</span>
            <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">-{{ product.discount }}%</span>
          </div>
          <div class="absolute top-3 right-3">
            <button @click="toggleWishlist(product.id)" class="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
              <svg class="w-5 h-5" :class="product.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="addToCart(product)" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{{ product.category }}</span>
            <span class="text-xs text-gray-500">{{ product.brand }}</span>
          </div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ product.name }}</h3>
          <div class="flex items-center gap-1 mb-2">
            <div class="flex">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">({{ product.reviews }})</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-green-600">${{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">${{ product.originalPrice }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ product.stock }} left</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8" v-if="totalPages > 1">
      <div class="flex items-center gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50">
          Previous
        </button>
        <span v-for="page in totalPages" :key="page" @click="currentPage = page" 
              :class="['px-3 py-2 border rounded-lg cursor-pointer', currentPage === page ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700']">
          {{ page }}
        </span>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('')
const priceRange = ref('')
const sortBy = ref('featured')
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ref([
  'Apparel', 'Accessories', 'Home & Living', 'Tech Gadgets', 'Collectibles', 'Books', 'Posters'
])

const products = ref([
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
    name: 'Gaming RGB Mechanical Keyboard',
    category: 'Tech Gadgets',
    brand: 'GamerPro',
    price: 129.99,
    originalPrice: 149.99,
    discount: 13,
    rating: 4.5,
    reviews: 203,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    isNew: false,
    isWishlisted: false
  },
  {
    id: 6,
    name: 'Studio Ghibli Totoro Plushie',
    category: 'Collectibles',
    brand: 'Studio Ghibli',
    price: 34.99,
    rating: 4.8,
    reviews: 445,
    stock: 23,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    isNew: false,
    isWishlisted: false
  },
  {
    id: 7,
    name: 'Harry Potter Hogwarts House Scarf',
    category: 'Accessories',
    brand: 'Warner Bros',
    price: 29.99,
    rating: 4.4,
    reviews: 298,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    isNew: false,
    isWishlisted: false
  },
  {
    id: 8,
    name: 'Dragon Ball Z Funko Pop Collection',
    category: 'Collectibles',
    brand: 'Funko',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.6,
    reviews: 167,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    isNew: true,
    isWishlisted: false
  }
])

const filteredProducts = computed(() => {
  let filtered = products.value

  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  if (priceRange.value) {
    const [min, max] = priceRange.value.split('-').map(v => v === '+' ? Infinity : parseFloat(v))
    filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true))
  }

  // Sort products
  switch (sortBy.value) {
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
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const toggleWishlist = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.isWishlisted = !product.isWishlisted
  }
}

const addToCart = (product) => {
  console.log('Added to cart:', product.name)
  // Add to cart logic here
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>