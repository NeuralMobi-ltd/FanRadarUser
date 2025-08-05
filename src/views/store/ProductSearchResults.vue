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
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'grid' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <i class="fas fa-th w-4 h-4"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg transition-colors',
                viewMode === 'list' 
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
        <div v-if="viewMode === 'grid'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const isLoading = ref(false)
const viewMode = ref('grid')
const sortBy = ref('relevance')
const currentPage = ref(1)
const itemsPerPage = ref(20)

// Filter states
const selectedPriceRanges = ref([])
const selectedCategories = ref([])
const selectedBrands = ref([])
const selectedRatings = ref([])

// Filter options
const priceRanges = ref([
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: '$200 & Above' }
])

const categories = ref([
  { id: 1, name: 'Electronics', count: 67 },
  { id: 2, name: 'Clothing', count: 32 },
  { id: 3, name: 'Collectibles', count: 45 },
  { id: 4, name: 'Home & Living', count: 28 },
  { id: 5, name: 'Accessories', count: 18 }
])

const brands = ref([
  { id: 1, name: 'Razer', count: 15 },
  { id: 2, name: 'Corsair', count: 12 },
  { id: 3, name: 'SteelSeries', count: 8 },
  { id: 4, name: 'HyperX', count: 10 },
  { id: 5, name: 'ASUS', count: 7 },
  { id: 6, name: 'Secretlab', count: 5 }
])

const ratings = ref([
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' }
])

// Mock products data
const allProducts = ref([
  {
    id: 1,
    name: 'Gaming Mechanical Keyboard RGB',
    category: 'Electronics',
    price: 129.99,
    rating: 5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    description: 'High-quality mechanical keyboard with RGB lighting',
    isWishlisted: false,
    brand: 'Razer'
  },
  {
    id: 2,
    name: 'Gaming Headset Pro Wireless',
    category: 'Electronics',
    price: 149.99,
    rating: 5,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    description: 'Premium wireless gaming headset with 7.1 surround sound',
    isWishlisted: false,
    brand: 'SteelSeries'
  },
  {
    id: 3,
    name: 'Gaming Headset RGB Wired',
    category: 'Electronics',
    price: 89.99,
    rating: 4,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    description: 'RGB gaming headset with crystal clear microphone',
    isWishlisted: false,
    brand: 'Razer'
  },
  {
    id: 4,
    name: 'Professional Gaming Headset',
    category: 'Electronics',
    price: 199.99,
    rating: 5,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
    description: 'Professional esports gaming headset with noise cancellation',
    isWishlisted: true,
    brand: 'HyperX'
  },
  {
    id: 5,
    name: 'Anime Character Figure Collection',
    category: 'Collectibles',
    price: 34.99,
    rating: 4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    description: 'Premium quality anime figure with detailed craftsmanship',
    isWishlisted: true,
    brand: 'Good Smile'
  },
  {
    id: 6,
    name: 'Gaming Ergonomic Chair',
    category: 'Home & Living',
    price: 299.99,
    rating: 5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    description: 'Comfortable gaming chair with lumbar support',
    isWishlisted: false,
    brand: 'Secretlab'
  },
  {
    id: 7,
    name: 'Wireless Gaming Mouse',
    category: 'Electronics',
    price: 79.99,
    rating: 4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    description: 'High precision wireless gaming mouse',
    isWishlisted: false,
    brand: 'Corsair'
  },
  {
    id: 8,
    name: 'Gaming Headset Stand RGB',
    category: 'Accessories',
    price: 29.99,
    rating: 4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    description: 'RGB headset stand with USB charging ports',
    isWishlisted: false,
    brand: 'Corsair'
  },
  {
    id: 9,
    name: 'Band Merchandise T-Shirt',
    category: 'Clothing',
    price: 24.99,
    rating: 4,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Official band merchandise t-shirt',
    isWishlisted: false,
    brand: 'Official'
  },
  {
    id: 10,
    name: 'Gaming Monitor 144Hz',
    category: 'Electronics',
    price: 349.99,
    rating: 5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop',
    description: '27-inch gaming monitor with 144Hz refresh rate',
    isWishlisted: false,
    brand: 'ASUS'
  },
  {
    id: 11,
    name: 'Gaming Desk RGB LED',
    category: 'Home & Living',
    price: 189.99,
    rating: 4,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    description: 'Gaming desk with built-in RGB LED lighting',
    isWishlisted: false,
    brand: 'IKEA Gaming'
  },
  {
    id: 12,
    name: 'Collectible Gaming Figurine',
    category: 'Collectibles',
    price: 45.99,
    rating: 5,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    description: 'Limited edition gaming character figurine',
    isWishlisted: false,
    brand: 'Funko'
  }
])

// Computed properties
const filteredProducts = computed(() => {
  let products = allProducts.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // Filter by price range
  if (selectedPriceRanges.value.length > 0) {
    products = products.filter(product => {
      return selectedPriceRanges.value.some(range => {
        if (range === '0-25') return product.price < 25
        if (range === '25-50') return product.price >= 25 && product.price < 50
        if (range === '50-100') return product.price >= 50 && product.price < 100
        if (range === '100-200') return product.price >= 100 && product.price < 200
        if (range === '200+') return product.price >= 200
        return false
      })
    })
  }

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    const selectedCategoryNames = categories.value
      .filter(cat => selectedCategories.value.includes(cat.id))
      .map(cat => cat.name)
    products = products.filter(product => 
      selectedCategoryNames.includes(product.category)
    )
  }

  // Filter by ratings
  if (selectedRatings.value.length > 0) {
    const minRating = Math.min(...selectedRatings.value)
    products = products.filter(product => product.rating >= minRating)
  }

  // Sort products
  if (sortBy.value === 'price-low') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    products.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    products.sort((a, b) => b.rating - a.rating)
  }

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
  const delta = 2

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
  // Add to cart logic
  console.log('Added to cart:', product.name)
  // Show toast notification
}

const toggleWishlist = (product) => {
  product.isWishlisted = !product.isWishlisted
  // Update wishlist in store/API
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
