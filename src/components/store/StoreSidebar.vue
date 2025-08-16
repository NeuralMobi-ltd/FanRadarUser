<template>
  <!-- Mobile Menu Overlay -->
  <div
    v-if="showMobileFilters"
    class="fixed inset-0 z-50 lg:hidden"
    @click="showMobileFilters = false"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
  </div>


  <!-- Sidebar -->
  <aside 
    :class=" [
      'bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out z-50',
      // Mobile: Fixed overlay
      'lg:relative lg:translate-x-0',
      showMobileFilters ? 'fixed inset-y-0 left-0 w-80 translate-x-0' : 'fixed inset-y-0 left-0 w-80 -translate-x-full',
      // Desktop: Sticky sidebar
      'lg:w-80 lg:sticky lg:top-0 lg:h-screen'
    ]"
  >
    <!-- Close button for mobile -->
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      <button
        @click="showMobileFilters = false"
        class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Filters Content -->
    <div class="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <!-- Quick Filters -->
      <div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <i class="fas fa-filter text-green-500"></i>
          Quick Filters
        </h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="filter in quickFilters" 
            :key="filter.value"
            @click="toggleQuickFilter(filter.value)"
            :class=" [
              'px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200',
              activeQuickFilters.includes(filter.value)
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center justify-between">
          <span class="flex items-center gap-2">
            <i class="fas fa-th-large text-blue-500"></i>
            Categories
          </span>
          <span class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-500">
            {{ totalProducts }}
          </span>
        </h3>
        <div class="space-y-2">
          <button 
            v-for="category in categoriesWithCounts" 
            :key="category.slug"
            @click="selectCategory(category.slug)"
            :class=" [
              'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group text-left',
              selectedCategory === category.slug
                ? 'bg-green-50 border-2 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent'
            ]"
          >
            <div class="flex items-center gap-3">
              <div :class=" [
                'w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center transition-colors',
                selectedCategory === category.slug
                  ? 'bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
              ]">
                <i :class="category.icon + ' text-sm'"></i>
              </div>
              <span class="font-medium text-sm">{{ category.name }}</span>
            </div>
            <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg text-xs font-medium">
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Price Range -->
      <div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <i class="fas fa-dollar-sign text-yellow-500"></i>
          Price Range
        </h3>
        <div class="space-y-4">
          <!-- Price Slider Visual -->
          <div class="px-2">
            <div class="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>${{ priceRange.min || 0 }}</span>
              <span>${{ priceRange.max || 500 }}</span>
            </div>
            <div class="relative">
              <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div 
                class="absolute top-0 h-2 bg-green-500 rounded-full"
                :style="{ left: '20%', right: '30%' }"
              ></div>
            </div>
          </div>
          
          <!-- Price Inputs -->
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Min</label>
              <input 
                v-model="storeSidebarStore.priceRange.min"
                type="number" 
                placeholder="0"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div class="flex-1">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Max</label>
              <input 
                v-model="storeSidebarStore.priceRange.max"
                type="number" 
                placeholder="500"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Brands -->
      <div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <i class="fas fa-star text-purple-500"></i>
          Brands
        </h3>
        <div class="space-y-2 max-h-32 sm:max-h-48 overflow-y-auto">
          <label 
            v-for="brand in brands" 
            :key="brand.slug" 
            class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors group"
          >
            <input 
              type="checkbox" 
              :value="brand.slug"
              v-model="storeSidebarStore.selectedBrands"
              class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span class="flex-1 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
              {{ brand.name }}
            </span>
            <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
              {{ brand.products }}
            </span>
          </label>
        </div>
      </div>

      <!-- Apply Filters Button -->
      <div class="space-y-3">
        <button 
          @click="applyAllFiltersAndClose"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          Apply Filters
        </button>
        
        <button 
          v-if="hasActiveFilters"
          @click="clearAllFiltersAndClose"
          class="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Clear All
        </button>
      </div>

      <!-- Quick Actions -->
      <div class="border-t border-gray-100 dark:border-gray-800 pt-4 sm:pt-6">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <i class="fas fa-bolt text-orange-500"></i>
          Quick Actions
        </h3>
        <div class="space-y-3">
          <router-link 
            to="/cart"
            @click="closeMobileFilters"
            class="flex items-center justify-between w-full p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-700 transition-colors">
                <i class="fas fa-shopping-cart text-green-600 dark:text-green-400 text-sm"></i>
              </div>
              <span class="font-semibold text-green-700 dark:text-green-300 text-sm">View Cart</span>
            </div>
            <span class="bg-green-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-bold">
              {{ cartItemCount }}
            </span>
          </router-link>

          <router-link 
            to="/orders"
            @click="closeMobileFilters"
            class="flex items-center gap-3 w-full p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors group"
          >
            <div class="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
              <i class="fas fa-receipt text-blue-600 dark:text-blue-400 text-sm"></i>
            </div>
            <span class="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white text-sm">My Orders</span>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore } from '@/store/products'
import { useStoreSidebarStore } from '@/store/storeSidebar'

// Initialize stores and router
const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()
const storeSidebarStore = useStoreSidebarStore()

// Mobile filters state
const showMobileFilters = ref(false)

// Local reactive state
const searchQuery = ref('')
const selectedCategory = ref(route.query.category || 'all')
const activeQuickFilters = ref([])

// Quick filter options
const quickFilters = ref([
  { value: 'new', label: 'New Arrivals' },
  { value: 'sale', label: 'On Sale' },
  { value: 'popular', label: 'Popular' },
  { value: 'exclusive', label: 'Exclusive' }
])

// Get data from stores
const brands = computed(() => productsStore.getStoreBrands())
const categoryCounts = computed(() => productsStore.getCategoryCounts())
const totalProducts = computed(() => productsStore.getTotalProducts())
const cartItemCount = computed(() => productsStore.getCartItemCount())

// Build STORE_CATEGORIES from products store categories
const STORE_CATEGORIES = computed(() => {
  const map = [
    { name: 'All Products', slug: 'all', icon: 'fas fa-th-large' },
    { name: 'Apparel', slug: 'apparel', icon: 'fas fa-tshirt' },
    { name: 'Accessories', slug: 'accessories', icon: 'fas fa-gem' },
    { name: 'Home & Living', slug: 'home', icon: 'fas fa-home' },
    { name: 'Tech Gadgets', slug: 'tech', icon: 'fas fa-laptop' },
    { name: 'Collectibles', slug: 'collectibles', icon: 'fas fa-trophy' },
    { name: 'Books', slug: 'books', icon: 'fas fa-book' }
  ]
  // Only include categories present in store to avoid stale items
  const present = new Set((productsStore.categories || []).map(c => c))
  return map.filter(item => item.slug === 'all' || present.has(item.name))
})

// Combine categories with counts
const categoriesWithCounts = computed(() => {
  return STORE_CATEGORIES.value.map(category => ({
    ...category,
    count: categoryCounts.value[category.slug] || '0'
  }))
})

// Computed for price range
const priceRange = computed(() => storeSidebarStore.priceRange)

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' ||
         storeSidebarStore.selectedBrands.length > 0 ||
         storeSidebarStore.priceRange.min !== '' ||
         storeSidebarStore.priceRange.max !== '' ||
         activeQuickFilters.value.length > 0 ||
         searchQuery.value !== ''
})

// Watch for route changes to update selected category
watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = newCategory || 'all'
})

// Methods
const selectCategory = (categorySlug) => {
  selectedCategory.value = categorySlug
  
  // Update the route query parameter
  const query = { ...route.query }
  if (categorySlug === 'all') {
    delete query.category
  } else {
    query.category = categorySlug
  }
  
  router.push({ query })
}

const toggleQuickFilter = (filterValue) => {
  const index = activeQuickFilters.value.indexOf(filterValue)
  if (index > -1) {
    activeQuickFilters.value.splice(index, 1)
  } else {
    activeQuickFilters.value.push(filterValue)
  }
}

const closeMobileFilters = () => {
  showMobileFilters.value = false
}

const applyAllFilters = () => {
  // Apply all filters through the store
  storeSidebarStore.applyFilters()
  
  // Create comprehensive filter object
  const filters = {
    category: selectedCategory.value !== 'all' ? selectedCategory.value : '',
    brands: storeSidebarStore.selectedBrands,
    priceRange: {
      min: storeSidebarStore.priceRange.min ? parseFloat(storeSidebarStore.priceRange.min) : null,
      max: storeSidebarStore.priceRange.max ? parseFloat(storeSidebarStore.priceRange.max) : null
    },
    quickFilters: activeQuickFilters.value,
    search: searchQuery.value
  }
  
  console.log('Applied filters:', filters)
  
  // Emit event or update global state for Mart.vue to listen to
  // This will be handled by the parent component or through the store
}

const applyAllFiltersAndClose = () => {
  applyAllFilters()
  closeMobileFilters()
}

const clearAllFilters = () => {
  selectedCategory.value = 'all'
  activeQuickFilters.value = []
  searchQuery.value = ''
  storeSidebarStore.clearAllFilters()
  
  // Clear route query parameters
  router.push({ query: {} })
}

const clearAllFiltersAndClose = () => {
  clearAllFilters()
  closeMobileFilters()
}

const applyPriceFilter = () => {
  applyAllFilters()
}

// Product drop methods
const viewDrop = (drop) => {
  console.log('Viewing product drop:', drop)
  // Navigate to a dedicated drop page or open a modal
  router.push(`/mart/drop/${drop.id}`)
}

const selectDrop = (drop) => {
  const index = productDrops.value.findIndex(d => d.id === drop.id)
  currentDropIndex.value = index
}
</script>

<style scoped>
.sidebar-width {
    width: 270px;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes slide-in {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.drop-item-enter-active {
  animation: slide-in 0.3s ease-out;
}

@keyframes countdown {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.countdown-animation {
  animation: countdown 1s ease-in-out infinite;
}

/* Gradient text animation for "LIVE" badge */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-text {
  background: linear-gradient(-45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
