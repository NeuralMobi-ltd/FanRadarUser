<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
    <!-- Main Content -->
    <div class="p-4 sm:p-5 md:p-6">
        <!-- Hero Banner -->
        <div class="relative bg-gradient-to-r from-green-600 to-green-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 overflow-hidden">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10 text-white">
            <h1 class="text-4xl font-bold mb-4">{{ heroContent.title }}</h1>
            <p class="text-xl mb-6">{{ heroContent.subtitle }}</p>
            <div class="flex flex-wrap gap-4">
            </div>
          </div>
        </div>

        <!-- Product Drops Section -->
        <div class="mb-6 sm:mb-8">
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Drops</h2>
            <div class="flex items-center gap-3 text-sm">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <i class="far fa-clock"></i>
                <span>Next ends in: {{ countdownText }}</span>
              </span>
              <button class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                View all
              </button>
            </div>
          </div>

          <!-- Featured Drop -->
          <div class="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-5 sm:mb-6 overflow-hidden">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div class="relative z-10 text-white" v-if="currentDrop">
              <div class="flex flex-col lg:flex-row items-center gap-8">
                <!-- Left content -->
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-2 py-1 text-xs rounded-full bg-white/20 font-semibold tracking-wide">{{ currentDrop.badge }}</span>
                    <span 
                      class="px-2 py-1 text-xs rounded-full font-semibold"
                      :class="[getUrgencyStyle(currentDrop.urgencyLevel).bgColor, 'text-gray-900']"
                    >
                      {{ getUrgencyStyle(currentDrop.urgencyLevel).text }}
                    </span>
                  </div>
                  <h3 class="text-3xl md:text-4xl font-extrabold leading-tight mb-2">{{ currentDrop.title }}</h3>
                  <p class="text-white/90 text-lg mb-5">{{ currentDrop.subtitle }}</p>

                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    <li v-for="f in currentDrop.features" :key="f" class="flex items-center gap-2 text-white/90">
                      <i class="fas fa-check-circle text-green-300"></i>
                      <span>{{ f }}</span>
                    </li>
                  </ul>

                  <div class="flex flex-wrap items-center gap-4 mb-4">
                    <div class="text-4xl font-extrabold">${{ currentDrop.dropPrice }}</div>
                    <div class="text-white/70 line-through text-xl">${{ currentDrop.originalPrice }}</div>
                    <span class="px-2 py-1 bg-red-600 rounded-full text-white text-sm font-semibold">-{{ currentDrop.discount }}%</span>
                  </div>

                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-56 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div class="h-full bg-emerald-400" :style="{ width: soldPercent(currentDrop) + '%' }"></div>
                    </div>
                    <div class="text-sm text-white/90">{{ currentDrop.totalStock - currentDrop.stockLeft }} sold • {{ currentDrop.stockLeft }} left</div>
                  </div>

                  <div class="flex items-center gap-2 mb-6">
                    <i class="far fa-clock"></i>
                    <span class="font-semibold tracking-wide">{{ countdownText }}</span>
                  </div>

                  <div class="flex flex-wrap gap-3">
                    <button @click="viewDrop(currentDrop)" class="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 font-medium">Shop drop</button>
                    <button @click="viewDrop(currentDrop)" class="px-4 py-2 rounded-lg border border-white/40 hover:bg-white/10 font-medium">Details</button>
                  </div>
                </div>

                <!-- Right image -->
                <div class="flex-1 w-full">
                  <img :src="currentDrop.image" :alt="currentDrop.title" class="rounded-lg sm:rounded-xl w-full max-h-56 sm:max-h-80 object-cover ring-1 sm:ring-2 ring-white/30 shadow-xl" />
                </div>
              </div>
            </div>
          </div>

          <!-- Other Drops Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div 
              v-for="drop in otherDrops"
              :key="drop.id"
              class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
            >
              <div class="relative">
                <img :src="drop.image" :alt="drop.title" class="w-full h-36 sm:h-44 object-cover" />
                <div class="absolute top-2 left-2 flex gap-2">
                  <span class="px-2 py-0.5 text-[11px] rounded-full bg-black/60 text-white">{{ drop.badge }}</span>
                  <span :class="[getUrgencyStyle(drop.urgencyLevel).bgColor, 'text-gray-900 px-2 py-0.5 text-[11px] rounded-full font-semibold']">
                    {{ getUrgencyStyle(drop.urgencyLevel).text }}
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                  <i class="far fa-clock mr-1"></i>{{ formatCountdown(drop.endTime, nowTime) }}
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ drop.title }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ drop.subtitle }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">${{ drop.dropPrice }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ drop.originalPrice }}</span>
                  <span class="px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">-{{ drop.discount }}%</span>
                </div>
                <div class="mt-3">
                  <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" :style="{ width: soldPercent(drop) + '%' }"></div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{{ drop.totalStock - drop.stockLeft }} sold</span>
                    <span>{{ drop.stockLeft }} left</span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="text-xs text-gray-600 dark:text-gray-300">
                    <i class="fas fa-tag mr-1 text-green-500"></i>{{ drop.category }}
                  </div>
                  <button @click="viewDrop(drop)" class="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="storeSidebarStore.hasActiveFilters" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Filters</h3>
            <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              {{ storeSidebarStore.getActiveFilterCount }} applied
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <!-- Category Filter -->
            <span v-if="storeSidebarStore.appliedFilters.category" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              <i class="fas fa-layer-group"></i>
              <span>Category: {{ storeSidebarStore.appliedFilters.category }}</span>
              <button class="ml-1 hover:text-blue-900 dark:hover:text-blue-200" @click="storeSidebarStore.clearCategoryFilter()">✕</button>
            </span>
            
            <!-- Brand Filters -->
            <span v-for="brand in storeSidebarStore.appliedFilters.brands" :key="brand" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              <i class="fas fa-copyright"></i>
              <span>{{ brandNameFromSlug(brand) }}</span>
              <button class="ml-1 hover:text-purple-900 dark:hover:text-purple-200" @click="removeBrandFilter(brand)">✕</button>
            </span>
            
            <!-- Price Filter -->
            <span v-if="storeSidebarStore.appliedFilters.priceMin || storeSidebarStore.appliedFilters.priceMax" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              <i class="fas fa-dollar-sign"></i>
              <span>
                Price: 
                {{ storeSidebarStore.appliedFilters.priceMin ?? 0 }} - 
                {{ storeSidebarStore.appliedFilters.priceMax ?? '∞' }}
              </span>
              <button class="ml-1 hover:text-green-900 dark:hover:text-green-200" @click="storeSidebarStore.clearPriceFilter()">✕</button>
            </span>
            
            <!-- Quick Filters -->
            <span v-for="filter in storeSidebarStore.appliedFilters.quickFilters" :key="filter" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">
              <i class="fas fa-bolt"></i>
              <span>{{ quickFilterLabel(filter) }}</span>
              <button class="ml-1 hover:text-orange-900 dark:hover:text-orange-200" @click="removeQuickFilter(filter)">✕</button>
            </span>
            
            <!-- Search Filter -->
            <span v-if="storeSidebarStore.appliedFilters.search" class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              <i class="fas fa-search"></i>
              <span>{{ storeSidebarStore.appliedFilters.search }}</span>
              <button class="ml-1 hover:text-gray-900 dark:hover:text-white" @click="storeSidebarStore.clearSearchFilter()">✕</button>
            </span>
          </div>
        </div>

        <!-- Filter and Sort Bar -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <!-- Search -->
              <div class="relative w-full sm:w-auto">
                <input
                  :value="storeSidebarStore.appliedFilters.search"
                  @input="updateSearch($event.target.value)"
                  type="text"
                  placeholder="Search in products..."
                  class="w-full sm:w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              <!-- Category -->
              <select v-model="selectedCategory" class="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option value="">All Categories</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>

              <!-- Brand -->
              <select v-model="selectedBrand" class="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option value="">All Brands</option>
                <option v-for="b in availableBrands" :key="b" :value="b">{{ b }}</option>
              </select>

              <!-- Price -->
              <select v-model="priceRange" class="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option v-for="r in martStore.priceRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
              </select>
            </div>
            
            <div class="flex items-center gap-3 sm:gap-4">
              <!-- Sort -->
              <select v-model="sortBy" class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option v-for="s in martStore.sortOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>

              <!-- View toggle -->
              <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button :class="['px-3 py-1.5 rounded-md text-sm', viewMode==='grid' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300']" @click="viewMode='grid'">
                  <i class="fas fa-th-large"></i>
                </button>
                <button :class="['px-3 py-1.5 rounded-md text-sm', viewMode==='list' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300']" @click="viewMode='list'">
                  <i class="fas fa-list"></i>
                </button>
              </div>

              <!-- Clear -->
              <button v-if="hasActiveFilters" @click="clearAllFilters" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                Clear
              </button>

              <span class="text-sm text-gray-500 dark:text-gray-400">{{ filteredProducts.length }} results</span>
            </div>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <div class="text-gray-400 text-6xl mb-4">
            <i class="fas fa-shopping-basket"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
          <p class="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more products</p>
        </div>

        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 group"
          >
            <!-- Product Image -->
            <div class="relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute top-3 left-3 flex gap-2">
                <span v-if="product.isNew" class="px-2 py-1 text-xs bg-green-600 text-white rounded-full">New</span>
                <span v-if="product.discount" class="px-2 py-1 text-xs bg-red-600 text-white rounded-full">-{{ product.discount }}%</span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <h3 class="text-gray-900 dark:text-white font-semibold mb-1 line-clamp-2">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.brand }} • {{ product.category }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ product.originalPrice }}</span>
                </div>
                <button @click="toggleWishlist(product.id)" class="text-gray-400 hover:text-red-500">
                  <i :class="['fas', product.isWishlisted ? 'fa-heart text-red-500' : 'fa-heart']"></i>
                </button>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <div class="text-yellow-400">
                  <i class="fas fa-star" v-for="i in Math.round(product.rating)" :key="i"></i>
                </div>
                <button @click="addToCart(product)" class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View images size for mobile -->
        <div v-else class="space-y-3 sm:space-y-4">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group"
          >
            <div class="flex">
              <img :src="product.image" :alt="product.name" class="w-40 h-40 object-cover" />
              <div class="p-4 flex-1">
                <h3 class="text-gray-900 dark:text-white font-semibold mb-1">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.brand }} • {{ product.category }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ product.originalPrice }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="text-yellow-400">
                      <i class="fas fa-star" v-for="i in Math.round(product.rating)" :key="i"></i>
                    </div>
                    <button @click="addToCart(product)" class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom padding for mobile nav -->
        <div class="h-14 md:h-0"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/store/products'
import { useStoreSidebarStore } from '@/store/storeSidebar'
import { useMartStore } from '@/store/mart'

// Initialize stores
const productsStore = useProductsStore()
const storeSidebarStore = useStoreSidebarStore()
const martStore = useMartStore()

const selectedCategory = ref(martStore.config.DEFAULT_CATEGORY)
const priceRange = ref(martStore.config.DEFAULT_PRICE_RANGE)
const selectedBrand = ref('')
const sortBy = ref(martStore.config.DEFAULT_SORT)
const currentPage = ref(1)
const viewMode = ref('grid') // 'grid' or 'list'
const itemsPerPage = martStore.config.DEFAULT_ITEMS_PER_PAGE

// Product Drops State
const currentDropIndex = ref(0)
const countdownTimer = ref(null)
const rotationTimer = ref(null)
const nowTime = ref(Date.now())

// Use store for options
const categories = computed(() => productsStore.categories)
const heroFeatures = computed(() => martStore.heroFeatures)
const heroContent = computed(() => martStore.heroContent)

// Product Drops Computed
const currentDrop = computed(() => martStore.productDrops[currentDropIndex.value])
const otherDrops = computed(() => martStore.productDrops.filter((_, index) => index !== currentDropIndex.value))
const countdownText = computed(() => currentDrop.value ? formatCountdown(currentDrop.value.endTime, nowTime.value) : '')

// Product Drops Methods
const formatCountdown = (endTime, nowMs) => {
  const now = nowMs || new Date().getTime()
  const end = new Date(endTime).getTime()
  const difference = end - now
  if (difference <= 0) return 'EXPIRED'
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  return `${minutes}m ${seconds}s`
}

const getUrgencyStyle = (urgencyLevel) => {
  return martStore.dropUrgencyMessages[urgencyLevel] || martStore.dropUrgencyMessages.low
}

const soldPercent = (drop) => {
  if (!drop?.totalStock) return 0
  return Math.min(100, Math.round(((drop.totalStock - drop.stockLeft) / drop.totalStock) * 100))
}

const viewDrop = (drop) => {
  console.log('Viewing drop:', drop.title)
}

const startDropRotation = () => {
  rotationTimer.value = setInterval(() => {
    currentDropIndex.value = (currentDropIndex.value + 1) % martStore.productDrops.length
  }, martStore.dropConfig.AUTO_ROTATE_INTERVAL)
}

const startCountdownUpdate = () => {
  countdownTimer.value = setInterval(() => {
    nowTime.value = Date.now()
  }, martStore.dropConfig.COUNTDOWN_UPDATE_INTERVAL)
}

// Lifecycle
onMounted(() => {
  startDropRotation()
  startCountdownUpdate()
})

onUnmounted(() => {
  if (rotationTimer.value) clearInterval(rotationTimer.value)
  if (countdownTimer.value) clearInterval(countdownTimer.value)
})

// Get available brands from store
const availableBrands = computed(() => {
  const brands = [...new Set(productsStore.products.map(p => p.brand))]
  return brands.sort()
})

// Enhanced filtered products that considers sidebar filters
const filteredProducts = computed(() => {
  let filtered = [...productsStore.products]
  
  // Apply sidebar filters
  const sidebarFilters = storeSidebarStore.appliedFilters
  
  // Category filter from sidebar
  if (sidebarFilters.category && sidebarFilters.category !== 'all') {
    const categoryMap = {
      'apparel': 'Apparel',
      'accessories': 'Accessories',
      'home': 'Home & Living',
      'tech': 'Tech Gadgets',
      'collectibles': 'Collectibles',
      'books': 'Books'
    }
    const mappedCategory = categoryMap[sidebarFilters.category]
    if (mappedCategory) {
      filtered = filtered.filter(p => p.category === mappedCategory)
    }
  }
  
  // Brand filters from sidebar
  if (sidebarFilters.brands.length > 0) {
    filtered = filtered.filter(p => {
      const brandSlug = p.brand.toLowerCase().replace(/\s+/g, '-')
      return sidebarFilters.brands.includes(brandSlug)
    })
  }
  
  // Price range from sidebar
  if (sidebarFilters.priceMin !== null || sidebarFilters.priceMax !== null) {
    filtered = filtered.filter(p => {
      const price = p.price
      const min = sidebarFilters.priceMin || 0
      const max = sidebarFilters.priceMax || Infinity
      return price >= min && price <= max
    })
  }
  
  // Search from sidebar
  if (sidebarFilters.search) {
    const searchTerm = sidebarFilters.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    )
  }
  
  // Quick filters from sidebar
  if (sidebarFilters.quickFilters.length > 0) {
    sidebarFilters.quickFilters.forEach(filter => {
      switch (filter) {
        case 'new':
          filtered = filtered.filter(p => p.isNew)
          break
        case 'sale':
          filtered = filtered.filter(p => p.discount > 0)
          break
        case 'popular':
          filtered = filtered.filter(p => p.rating >= 4.5)
          break
        case 'exclusive':
          filtered = filtered.filter(p => p.category === 'Collectibles')
          break
      }
    })
  }
  
  // Apply local filters (from the filter bar)
  if (selectedCategory.value !== '') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }
  
  if (selectedBrand.value !== '') {
    filtered = filtered.filter(p => p.brand === selectedBrand.value)
  }
  
  if (priceRange.value !== '') {
    const [min, max] = priceRange.value.split('-').map(v => v === '+' ? Infinity : parseInt(v))
    filtered = filtered.filter(p => p.price >= min && (max === Infinity || p.price <= max))
  }
  
  // Apply sorting
  return productsStore.sortMartProducts(filtered, sortBy.value)
})

// Check if any filters are active (including sidebar filters)
const hasActiveFilters = computed(() => {
  return selectedCategory.value !== '' || 
         priceRange.value !== '' || 
         selectedBrand.value !== '' ||
         storeSidebarStore.hasActiveFilters
})

// Clear all filters (including sidebar)
const clearAllFilters = () => {
  selectedCategory.value = martStore.config.DEFAULT_CATEGORY
  priceRange.value = martStore.config.DEFAULT_PRICE_RANGE
  selectedBrand.value = ''
  currentPage.value = 1
  storeSidebarStore.clearAllFilters()
}

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

const removeQuickFilter = (filter) => {
  const filters = storeSidebarStore.appliedFilters.quickFilters.filter(f => f !== filter)
  storeSidebarStore.setQuickFilters(filters)
}

const updateSearch = (val) => {
  storeSidebarStore.setSearchQuery(val)
}

const brandNameFromSlug = (slug) => slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const removeBrandFilter = (slug) => {
  storeSidebarStore.selectedBrands = storeSidebarStore.selectedBrands.filter(b => b !== slug)
  storeSidebarStore.appliedFilters.brands = storeSidebarStore.appliedFilters.brands.filter(b => b !== slug)
}

const quickFilterLabel = (q) => ({ new: 'New', sale: 'On Sale', popular: 'Popular', exclusive: 'Exclusive' }[q] || q)

// Watch for changes in filtered products to reset pagination
watch(filteredProducts, () => {
  currentPage.value = 1
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