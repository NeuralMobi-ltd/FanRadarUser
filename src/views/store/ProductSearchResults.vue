<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Results Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Search Results for "{{ searchQuery }}"
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              {{ totalResults }} products found
            </p>
          </div>
          
          <!-- View Toggle -->
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = VIEW_MODES.GRID"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === VIEW_MODES.GRID 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <i class="fas fa-th w-4 h-4"></i>
            </button>
            <button
              @click="viewMode = VIEW_MODES.LIST"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === VIEW_MODES.LIST 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <i class="fas fa-list w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sort and Filter Bar -->
      <div class="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            v-model="sortBy"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalResults) }} of {{ totalResults }} results
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        <p class="text-gray-600 dark:text-gray-400 mt-4">Loading products...</p>
      </div>

      <!-- Products Grid/List -->
      <div v-else-if="filteredProducts.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === VIEW_MODES.GRID" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            @click="goToProduct(product)"
          >
            <div class="relative">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 right-2">
                <button
                  @click.stop="toggleWishlist(product)"
                  :class="[
                    'p-2 rounded-full transition-colors',
                    product.isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  ]"
                >
                  <i class="fas fa-heart w-4 h-4"></i>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                {{ product.name }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ product.category }}</p>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-green-600 dark:text-green-400">${{ product.price }}</span>
                <div class="flex items-center">
                  <span class="flex text-yellow-400 text-xs">
                    <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'fas fa-star' : 'far fa-star'"></i>
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ product.reviews }})</span>
                </div>
              </div>
              <button
                @click.stop="addToCart(product)"
                class="w-full mt-3 py-2 px-4 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="goToProduct(product)"
          >
            <div class="flex items-center space-x-6">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-24 h-24 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white text-lg mb-1">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.category }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {{ product.description }}
                </p>
                <div class="flex items-center">
                  <span class="flex text-yellow-400 text-sm">
                    <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'fas fa-star' : 'far fa-star'"></i>
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ product.reviews }} reviews)</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
                  ${{ product.price }}
                </div>
                <div class="space-y-2">
                  <button
                    @click.stop="toggleWishlist(product)"
                    :class="[
                      'p-2 rounded-full transition-colors',
                      product.isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    <i class="fas fa-heart w-4 h-4"></i>
                  </button>
                  <button
                    @click.stop="addToCart(product)"
                    class="block w-full py-2 px-6 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage = currentPage - 1"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <i class="fas fa-chevron-left w-4 h-4"></i>
            </button>
            <span
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 rounded-lg cursor-pointer',
                page === currentPage
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </span>
            <button
              @click="currentPage = currentPage + 1"
              :disabled="currentPage === totalPages"
              class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <i class="fas fa-chevron-right w-4 h-4"></i>
            </button>
          </nav>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Try adjusting your search criteria or removing some filters
        </p>
        <button
          @click="clearFilters"
          class="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products'
import { 
  PRICE_RANGES,
  PRODUCT_CATEGORIES,
  PRODUCT_BRANDS,
  RATING_FILTERS,
  VIEW_MODES,
  PAGINATION_CONFIG,
  SEARCH_CONFIG
} from '@/constants/productSearchConstants'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const searchQuery = ref('')
const isLoading = ref(false)
const viewMode = ref(SEARCH_CONFIG.DEFAULT_VIEW_MODE)
const sortBy = ref(SEARCH_CONFIG.DEFAULT_SORT)
const currentPage = ref(1)
const itemsPerPage = ref(PAGINATION_CONFIG.DEFAULT_ITEMS_PER_PAGE)

// Filter states
const selectedPriceRanges = ref([])
const selectedCategories = ref([])
const selectedBrands = ref([])
const selectedRatings = ref([])

// Filter options from constants
const priceRanges = ref(PRICE_RANGES)
const categories = ref(PRODUCT_CATEGORIES)
const brands = ref(PRODUCT_BRANDS)
const ratings = ref(RATING_FILTERS)

// Computed properties
const filteredProducts = computed(() => {
  // Start with search results from store
  let products = productsStore.searchProducts(searchQuery.value)

  // Apply price range filter
  products = productsStore.filterByPriceRange(products, selectedPriceRanges.value)

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    const selectedCategoryNames = categories.value
      .filter(cat => selectedCategories.value.includes(cat.id))
      .map(cat => cat.name)
    products = productsStore.filterByCategories(products, selectedCategoryNames)
  }

  // Apply rating filter
  products = productsStore.filterByRating(products, selectedRatings.value)

  // Apply sorting
  products = productsStore.sortProducts(products, sortBy.value)

  return products
})

const totalResults = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = PAGINATION_CONFIG.PAGINATION_DELTA

  const range = []
  const rangeWithDots = []

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (current + delta < total - 1) {
    rangeWithDots.push('...', total)
  } else {
    rangeWithDots.push(total)
  }

  return rangeWithDots.filter((item, index, array) => array.indexOf(item) === index)
})

// Methods
const loadSearchResults = () => {
  searchQuery.value = route.query.q || ''
  // In a real app, this would trigger an API call
}

const clearFilters = () => {
  selectedPriceRanges.value = []
  selectedCategories.value = []
  selectedBrands.value = []
  selectedRatings.value = []
  currentPage.value = 1
}

const goToProduct = (product) => {
  router.push(`/mart/product/${product.id}`)
}

const addToCart = (product) => {
  // Add to cart logic using store
  console.log('Added to cart:', product.name)
  // TODO: Use cart store when implemented
  // Show toast notification
}

const toggleWishlist = (product) => {
  productsStore.toggleWishlist(product.id)
}

// Watch for route changes
watch(() => route.query, () => {
  loadSearchResults()
}, { immediate: true })

// Reset pagination when filters change
watch([selectedPriceRanges, selectedCategories, selectedBrands, selectedRatings, sortBy], () => {
  currentPage.value = 1
})

onMounted(() => {
  loadSearchResults()
})
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
