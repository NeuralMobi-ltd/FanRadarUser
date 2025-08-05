<template>
  <div class="p-6">
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 mb-8 overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-white">
        <h1 class="text-4xl font-bold mb-4">{{ heroContent.title }}</h1>
        <p class="text-xl mb-6">{{ heroContent.subtitle }}</p>
        <div class="flex flex-wrap gap-4">
          <span 
            v-for="feature in heroFeatures" 
            :key="feature.text"
            class="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm"
          >
            {{ feature.icon }} {{ feature.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- Filter and Sort -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Category Dropdown -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select 
              v-model="selectedCategory" 
              class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <!-- Price Range Dropdown -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
            <select 
              v-model="priceRange" 
              class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
            >
              <option v-for="range in MART_PRICE_RANGES" :key="range.value" :value="range.value">{{ range.label }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <!-- Brand Dropdown -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
            <select 
              v-model="selectedBrand" 
              class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
            >
              <option value="">All Brands</option>
              <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <!-- Clear Filters Button -->
          <div class="pt-6">
            <button 
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear Filters
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Results</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</p>
          </div>
          
          <!-- Sort Dropdown -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
            <select 
              v-model="sortBy" 
              class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
            >
              <option v-for="option in MART_SORT_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
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
import { useProductsStore } from '@/store/products'
import { 
  MART_CATEGORIES,
  MART_PRICE_RANGES,
  MART_SORT_OPTIONS,
  MART_CONFIG,
  MART_HERO_FEATURES,
  MART_HERO_CONTENT
} from '@/constants/martConstants'

// Initialize store
const productsStore = useProductsStore()

const selectedCategory = ref(MART_CONFIG.DEFAULT_CATEGORY)
const priceRange = ref(MART_CONFIG.DEFAULT_PRICE_RANGE)
const selectedBrand = ref('')
const sortBy = ref(MART_CONFIG.DEFAULT_SORT)
const currentPage = ref(1)
const itemsPerPage = MART_CONFIG.DEFAULT_ITEMS_PER_PAGE

// Use constants for options
const categories = ref(MART_CATEGORIES)
const heroFeatures = ref(MART_HERO_FEATURES)
const heroContent = ref(MART_HERO_CONTENT)

// Get available brands from store
const availableBrands = computed(() => {
  const brands = [...new Set(productsStore.products.map(p => p.brand))]
  return brands.sort()
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return selectedCategory.value !== '' || 
         priceRange.value !== '' || 
         selectedBrand.value !== ''
})

// Clear all filters
const clearAllFilters = () => {
  selectedCategory.value = MART_CONFIG.DEFAULT_CATEGORY
  priceRange.value = MART_CONFIG.DEFAULT_PRICE_RANGE
  selectedBrand.value = ''
  currentPage.value = 1
}

const filteredProducts = computed(() => {
  // Get filtered products from store
  const filtered = productsStore.filterMartProducts({
    category: selectedCategory.value,
    priceRange: priceRange.value,
    brand: selectedBrand.value
  })

  // Apply sorting
  return productsStore.sortMartProducts(filtered, sortBy.value)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const toggleWishlist = (productId) => {
  productsStore.toggleWishlist(productId)
}

const addToCart = (product) => {
  console.log('Added to cart:', product.name)
  // TODO: Use cart store when implemented
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>