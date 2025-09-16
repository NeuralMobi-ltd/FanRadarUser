<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
      <!-- Search Results Header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex items-start sm:items-center justify-between flex-wrap gap-3 sm:gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {{ $t('common.searchResultsFor', { q: searchQuery }) }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              {{ $t('store.productSearch.productsFound', { count: serverTotal }) }}
            </p>
          </div>
          
          <!-- View Toggle -->
          <div class="flex items-center space-x-1 sm:space-x-2">
            <button
              @click="viewMode = VIEW_MODES.GRID"
              :class=" [
                'p-1.5 sm:p-2 rounded-lg transition-colors',
                viewMode === VIEW_MODES.GRID 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
              :aria-label="$t('common.gridView')"
            >
              <i class="fas fa-th w-3 h-3 sm:w-4 sm:h-4"></i>
            </button>
            <button
              @click="viewMode = VIEW_MODES.LIST"
              :class=" [
                'p-1.5 sm:p-2 rounded-lg transition-colors',
                viewMode === VIEW_MODES.LIST 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
              :aria-label="$t('common.listView')"
            >
              <i class="fas fa-list w-3 h-3 sm:w-4 sm:h-4"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sort and Filter Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div class="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full sm:w-auto">
          <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{{ $t('store.productSearch.sortBy') }}</span>
          <select
            v-model="sortBy"
            class="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-48 lg:w-56"
          >
            <option value="relevance">{{ $t('store.sortOptions.relevance') }}</option>
            <option value="price-low">{{ $t('store.sortOptions.priceLow') }}</option>
            <option value="price-high">{{ $t('store.sortOptions.priceHigh') }}</option>
            <option value="rating">{{ $t('store.sortOptions.rating') }}</option>
            <option value="newest">{{ $t('store.sortOptions.newest') }}</option>
          </select>
        </div>
        
        <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 w-full sm:w-auto text-center sm:text-right">
          {{ $t('store.productSearch.showingRange', { from: serverFrom, to: serverTo, total: serverTotal }) }}
        </div>
      </div>

      <!-- Loading -->
        <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p class="text-gray-600 dark:text-gray-400 mt-4">{{ $t('store.productSearch.loadingProducts') }}</p>
      </div>

      <!-- Products Grid/List -->
  <div v-else-if="filteredProducts.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === VIEW_MODES.GRID" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
                class="w-full h-36 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-2 right-2">
                <button
                  @click.stop="toggleWishlist(product)"
                  :class=" [
                    'p-1.5 sm:p-2 rounded-full transition-colors',
                    product.isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  ]"
                >
                  <i class="fas fa-heart w-3 h-3 sm:w-4 sm:h-4"></i>
                </button>
              </div>
            </div>
            <div class="p-3 sm:p-4">
              <h3 class="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1 line-clamp-2">
                {{ product.name }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">{{ product.category }}</p>
              <div class="flex items-center justify-between mb-2 sm:mb-3">
                <span class="text-sm sm:text-lg font-bold text-green-600 dark:text-green-400">${{ product.price }}</span>
                <div class="flex items-center">
                  <span class="flex text-yellow-400 text-xs">
                    <i v-for="i in 5" :key="i" :class="i <= product.rating ? 'fas fa-star' : 'far fa-star'"></i>
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ $t('common.reviewsCount', { count: product.reviews }) }})</span>
                </div>
              </div>
              <button
                @click.stop="addToCart(product)"
                class="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
              >
                {{ $t('common.addToCart') }}
              </button>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-3 sm:space-y-4">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="goToProduct(product)"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full sm:w-20 lg:w-24 h-32 sm:h-20 lg:h-24 object-cover rounded-lg"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-2">
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
                  <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ $t('common.reviewsCount', { count: product.reviews }) }})</span>
                </div>
              </div>
              <div class="text-left sm:text-right w-full sm:w-auto">
                <div class="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 mb-2 sm:mb-3">
                  ${{ product.price }}
                </div>
                <div class="flex flex-col sm:flex-row sm:block gap-2">
                  <button
                    @click.stop="toggleWishlist(product)"
                    :class=" [
                      'p-1.5 sm:p-2 rounded-full transition-colors',
                      product.isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                    :aria-label="$t('common.toggleWishlist')"
                  >
                    <i class="fas fa-heart w-3 h-3 sm:w-4 sm:h-4"></i>
                  </button>
                  <button
                    @click.stop="addToCart(product)"
                    class="flex-1 sm:block sm:w-full py-1.5 sm:py-2 px-3 sm:px-4 lg:px-6 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                  >
                    {{ $t('common.addToCart') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-6 sm:mt-8 flex items-center justify-center">
          <nav class="flex items-center space-x-1 sm:space-x-2">
            <button
              @click="currentPage = currentPage - 1"
              :disabled="currentPage === 1"
              class="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <i class="fas fa-chevron-left w-3 h-3 sm:w-4 sm:h-4"></i>
            </button>
            <span
              v-for="page in visiblePages"
              :key="page"
              @click="typeof page === 'number' && (currentPage = page)"
              :class=" [
                'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg cursor-pointer text-sm',
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
              class="p-1.5 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <i class="fas fa-chevron-right w-3 h-3 sm:w-4 sm:h-4"></i>
            </button>
          </nav>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-8 sm:py-12">
        <i class="fas fa-search text-3xl sm:text-4xl text-gray-300 dark:text-gray-600 mb-3 sm:mb-4"></i>
        <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">{{ $t('store.productSearch.noProductsTitle') }}</h3>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          {{ $t('store.productSearch.noProductsDesc') }}
        </p>
        <button
          @click="clearFilters"
          class="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
        >
          {{ $t('common.clearAllFilters') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductsService from '@/services/productsService'
import { useProductsStore } from '@/store/products'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const { t } = useI18n()

const searchQuery = ref('')
const isLoading = ref(false)
const VIEW_MODES = { GRID: 'grid', LIST: 'list' }
const viewMode = ref(VIEW_MODES.GRID)
const sortBy = ref('relevance')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const PAGINATION_DELTA = 2

// Server pagination meta
const serverTotal = ref(0)
const serverFrom = ref(0)
const serverTo = ref(0)
const serverTotalPages = ref(1)

// Filter states
const selectedPriceRanges = ref([])
const selectedCategories = ref([])
const selectedBrands = ref([])
const selectedRatings = ref([])

// Filter options derived from store
const priceRanges = ref([
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: '$200 & Above' }
])
const categories = computed(() => (productsStore.categories || []).map((name, idx) => ({ id: idx + 1, name })))
const brands = computed(() => (productsStore.brands || []).map((name, idx) => ({ id: idx + 1, name })))
const ratings = ref([
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' }
])

// Computed properties
const products = ref([])

const filteredProducts = computed(() => {
  // Start with server-fetched search results
  let list = products.value

  // Apply price range filter
  list = productsStore.filterByPriceRange(list, selectedPriceRanges.value)

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    const selectedCategoryNames = categories.value
      .filter(cat => selectedCategories.value.includes(cat.id))
      .map(cat => cat.name)
    list = productsStore.filterByCategories(list, selectedCategoryNames)
  }

  // Apply rating filter
  list = productsStore.filterByRating(list, selectedRatings.value)

  // Apply sorting
  list = productsStore.sortProducts(list, sortBy.value)

  return list
})

const totalPages = computed(() => serverTotalPages.value)

const paginatedProducts = computed(() => filteredProducts.value)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = PAGINATION_DELTA

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
const loadSearchResults = async () => {
  searchQuery.value = route.query.q || ''
  if (!searchQuery.value) {
    products.value = []
    serverTotal.value = 0
    serverFrom.value = 0
    serverTo.value = 0
    serverTotalPages.value = 1
    return
  }
  await fetchProducts()
}

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const { products: items, pagination } = await ProductsService.search({ q: searchQuery.value, page: currentPage.value, per_page: itemsPerPage.value })
    products.value = items
    // Map server pagination to UI
    serverTotal.value = pagination.total || 0
    serverTotalPages.value = pagination.last_page || 1
    // Use server-provided from/to when available; fallback to derived
    const from = pagination.from ?? ((currentPage.value - 1) * itemsPerPage.value + 1)
    const to = pagination.to ?? Math.min(currentPage.value * itemsPerPage.value, serverTotal.value)
    serverFrom.value = items.length > 0 ? from : 0
    serverTo.value = items.length > 0 ? to : 0
  } catch (e) {
    products.value = []
    serverTotal.value = 0
    serverFrom.value = 0
    serverTo.value = 0
    serverTotalPages.value = 1
  } finally {
    isLoading.value = false
  }
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
  console.log('Added to cart:', product.name)
}

const toggleWishlist = (product) => {
  productsStore.toggleWishlist(product.id)
}

// Watch for route changes
watch(() => route.query, () => {
  currentPage.value = 1
  loadSearchResults()
}, { immediate: true })

// Reset pagination when filters change
watch([selectedPriceRanges, selectedCategories, selectedBrands, selectedRatings, sortBy], () => {
  currentPage.value = 1
})

// Fetch new page on currentPage change
watch(currentPage, () => {
  fetchProducts()
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
