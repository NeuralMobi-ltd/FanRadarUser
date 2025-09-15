<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div class="mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo and Store Name -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <router-link to="/mart" class="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="/public/images/FanRadarStore.png" 
              alt="FanRadar Store Logo" 
              class="w-8 sm:w-10 rounded-xl object-cover"
            />
            <div class="hidden sm:block">
              <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">FanRadarStore</h1>
            </div>
          </router-link>
        </div>

        <!-- Search Bar (Desktop only) -->
        <div class="hidden lg:flex flex-1 max-w-2xl mx-2 sm:mx-4 lg:mx-8 ">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-2 px-3 sm:px-4 pl-8 sm:pl-10 pr-10 sm:pr-12 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              @keyup.enter="performDesktopSearch"
            />
            <svg class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <!-- Clear Button -->
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-8 sm:right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
  
            </button>
            <!-- Search Button -->
            <button
              @click="performDesktopSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full p-1 sm:p-1.5 transition-colors"
              :disabled="!searchQuery.trim()"
            >
              <svg class="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
    
        <!-- Actions - Responsive -->
        <div class="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          <!-- Mobile/Tablet Actions (show only on small screens) -->
          <div class="flex items-center space-x-2 md:hidden">
            <!-- Mobile Search Button -->
            <button
              @click="openMobileSearch"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-md"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Theme Toggle (mobile) -->
            <button 
              @click="toggleTheme"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-md"
            >
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- Notifications (mobile) removed -->

            <!-- Cart (mobile) -->
            <router-link 
              to="/cart"
              class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-md"
            >
              <i class="fas fa-shopping-cart w-5 h-5"></i>
              <span v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {{ cartItemsCount }}
              </span>
            </router-link>

            <!-- Orders (mobile) -->
            <router-link 
              to="/orders"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-md"
              aria-label="My Orders"
            >
              <i class="fas fa-clipboard-list w-5 h-5"></i>
            </router-link>
          </div>

          <!-- Desktop/Tablet Actions (md and up) -->
          <div class="hidden md:flex items-center space-x-3">
            <!-- Back to Community -->
            <router-link 
              to="/dashboard"
              class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <i class="fas fa-home w-4 h-4 mt-1"></i>
              <span>fandoms</span>
            </router-link>

            <!-- Dark mode toggle -->
            <button 
              @click="toggleTheme"
              class="p-2 sm:p-2.5 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
            >
              <svg v-if="isDark" class="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- Notifications removed -->

            <!-- User Profile -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-1 sm:space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <AvatarFallback
                  :src="user?.avatar"
                  :username="user?.name || 'User'"
                  :alt="user?.name || 'User'"
                  :size="32"
                  class="w-6 sm:w-8 h-6 sm:h-8 border-2 border-gray-200 dark:border-gray-600"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ user?.name || 'yassineelaouni581' }}</span>
                <svg class="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- User Dropdown -->
              <div 
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
              >
                <!-- User Info Header -->
                <div class="px-3 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <div class="flex items-center space-x-3">
                    <AvatarFallback :src="user?.avatar" :username="user?.name" :alt="user?.name" :size="40" class="w-8 sm:w-10 h-8 sm:h-10" />
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{{ user?.name || 'yassineelaouni581' }}</p>
                      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ user?.email || 'yss@fanradars.com' }}</p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <router-link 
                  to="/account/me"
                  class="flex items-center px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  <svg class="w-3 sm:w-4 h-3 sm:h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </router-link>
                <router-link 
                  to="/orders"
                  class="flex items-center px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  <svg class="w-3 sm:w-4 h-3 sm:h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 7l1.5 12a2 2 0 002 2h11a2 2 0 002-2L21 7M16 11V7a4 4 0 00-8 0v4" />
                  </svg>
                  My Orders
                </router-link>
                <button class="flex items-center w-full px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  <svg class="w-3 sm:w-4 h-3 sm:h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
                <hr class="my-2 border-gray-200 dark:border-gray-600">
                <button 
                  @click="logout"
                  class="flex items-center w-full px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  <svg class="w-3 sm:w-4 h-3 sm:h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Product Search Modal (like SearchModal.vue) -->
    <div v-if="showMobileSearchModal" class="md:hidden">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 z-[59] bg-black bg-opacity-25"
        @click="closeMobileSearch"
      ></div>
      
      <!-- Modal -->
      <div class="fixed top-14 left-0 right-0 z-[60] px-2">
        <!-- Search dropdown -->
        <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96">
          <!-- Top search bar (shown when used as overlay on phones) -->
          <div class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 flex items-center gap-2">
            <i class="fas fa-search text-gray-400"></i>
            <input
              ref="mobileSearchInput"
              v-model="mobileSearchQuery"
              @keydown.enter.prevent="performMobileSearch"
              type="text"
              class="flex-1 bg-gray-50 dark:bg-gray-700/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-600 text-sm"
              placeholder="Search products..."
            />
            <button v-if="mobileSearchQuery" @click="clearLocalQuery" class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Clear">
              <i class="fas fa-times text-sm"></i>
            </button>
            <button @click="closeMobileSearch" class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white" aria-label="Close">
              <i class="fas fa-chevron-up text-sm"></i>
            </button>
          </div>

          <!-- Trending searches and results -->
          <div class="overflow-y-auto max-h-96">
            <!-- Show recent searches or search results based on query -->
            <div v-if="!effectiveQuery">
              <!-- Recent searches section -->
              <div v-if="recentSearches.length > 0" class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent</h3>
                  <button 
                    @click="clearRecentSearches"
                    class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Clear all
                  </button>
                </div>
                
                <!-- Recent search items -->
                <div class="mt-2 space-y-1">
                  <div
                    v-for="search in recentSearches"
                    :key="search"
                    class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div 
                      @click="selectSearch(search)"
                      class="flex items-center space-x-3 flex-1 cursor-pointer"
                    >
                      <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <i class="fas fa-clock text-gray-500 dark:text-gray-400 text-sm"></i>
                      </div>
                      <span class="text-gray-900 dark:text-white text-sm">{{ search }}</span>
                    </div>
                    <button 
                      @click.stop="removeRecentSearch(search)"
                      class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1"
                    >
                      <i class="fas fa-times text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Trending section -->
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Trending Products</h3>
              </div>
              
              <!-- Trending items -->
              <div class="px-2">
                <div
                  v-for="trend in trendingProducts"
                  :key="trend.id"
                  @click="selectSearch(trend.name)"
                  class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div class="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <i class="fas fa-fire text-green-500"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ trend.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ trend.searches }} searches</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Search results when query exists -->
            <div v-else>
              <!-- Loading -->
              <div v-if="isSearching" class="p-4 text-center">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching...</p>
              </div>

              <!-- Results -->
              <div v-else class="p-4">
                <!-- Quick results preview -->
                <div v-if="hasResults" class="space-y-4">
                  <!-- Products -->
                  <div v-if="searchResults.products.length > 0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <i class="fas fa-shopping-bag mr-2 text-green-500"></i>
                      Products
                    </h4>
                    <div class="space-y-1">
                      <div
                        v-for="product in searchResults.products.slice(0, 3)"
                        :key="product.id"
                        @click="goToProduct(product)"
                        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img :src="product.image" :alt="product.name" class="w-8 h-8 rounded object-cover" />
                        <div class="flex-1">
                          <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(product.name)"></p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">${{ product.price }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- See all results button -->
                <div v-if="hasResults" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    @click="viewAllResults"
                    class="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    See all results for "{{ effectiveQuery }}"
                  </button>
                </div>

                <!-- No results -->
                <div v-if="!hasResults && !isSearching" class="text-center py-4">
                  <i class="fas fa-search text-xl text-gray-300 dark:text-gray-600 mb-2"></i>
                  <p class="text-sm text-gray-500 dark:text-gray-400">No products found for "{{ effectiveQuery }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const searchQuery = ref('')
const mobileSearchQuery = ref('')
const showUserMenu = ref(false)
// removed desktop search modal
const showMobileSearchModal = ref(false)
const showMobileSearchResults = ref(false)
const cartItemsCount = ref(3) // Mock cart count
const mobileSearchInput = ref(null)
const isSearching = ref(false)

// Store search functionality
const recentSearches = ref(['iPhone 15', 'Gaming Headset', 'Laptop Stand'])
const trendingProducts = ref([
  { id: 1, name: 'iPhone 15 Pro', searches: '2.1k' },
  { id: 2, name: 'Gaming Laptop', searches: '1.8k' },
  { id: 3, name: 'Wireless Earbuds', searches: '1.5k' },
  { id: 4, name: 'Smart Watch', searches: '1.2k' }
])

const searchResults = ref({
  products: []
})

const user = computed(() => authStore.user)
const isDark = computed(() => themeStore.isDark)
// notifications removed

const effectiveQuery = computed(() => (mobileSearchQuery.value || '').trim())
const hasResults = computed(() => searchResults.value.products.length > 0)

// Watch for mobile search query changes
watch(mobileSearchQuery, (val) => {
  performSearch()
})

const highlightSearchTerm = (text) => {
  if (!effectiveQuery.value || !text) return text
  const regex = new RegExp(`(${effectiveQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const performSearch = async () => {
  if (!effectiveQuery.value) {
    searchResults.value = { products: [] }
    return
  }

  isSearching.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Mock search results
  const mockProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 1199, image: '/public/images/F.png' },
    { id: 2, name: 'Samsung Galaxy S24', price: 999, image: '/public/images/F.png' },
    { id: 3, name: 'Gaming Laptop ASUS', price: 1499, image: '/public/images/F.png' }
  ].filter(product => 
    product.name.toLowerCase().includes(effectiveQuery.value.toLowerCase())
  )

  searchResults.value = { products: mockProducts }
  isSearching.value = false
}

const selectSearch = (term) => {
  addToRecentSearches(term)
  router.push({
    name: 'ProductSearchResults',
    query: { q: term, type: 'products' }
  })
  closeMobileSearch()
}

const addToRecentSearches = (term) => {
  const searches = recentSearches.value.filter(s => s !== term)
  recentSearches.value = [term, ...searches].slice(0, 5)
}

const removeRecentSearch = (term) => {
  recentSearches.value = recentSearches.value.filter(s => s !== term)
}

const clearRecentSearches = () => {
  recentSearches.value = []
}

const clearLocalQuery = () => {
  mobileSearchQuery.value = ''
}

const viewAllResults = () => {
  if (effectiveQuery.value) {
    addToRecentSearches(effectiveQuery.value)
    router.push({
      name: 'ProductSearchResults',
      query: { q: effectiveQuery.value, type: 'products' }
    })
    closeMobileSearch()
  }
}

const goToProduct = (product) => {
  router.push(`/mart/product/${product.id}`)
  closeMobileSearch()
}

const openMobileSearch = () => {
  showMobileSearchModal.value = true
  // Auto-focus the input after the modal is visible
  nextTick(() => {
    if (mobileSearchInput.value) {
      mobileSearchInput.value.focus()
    }
  })
}

const closeMobileSearch = () => {
  showMobileSearchModal.value = false
  showMobileSearchResults.value = false
  mobileSearchQuery.value = ''
  searchResults.value = { products: [] }
}

const performMobileSearch = () => {
  if (mobileSearchQuery.value.trim()) {
    router.push({
      name: 'ProductSearchResults',
      query: { 
        q: mobileSearchQuery.value.trim(),
        type: 'products'
      }
    })
    closeMobileSearch()
  }
}

const performDesktopSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to product search results page with search parameters specific to products
    router.push({
      name: 'ProductSearchResults',
      query: { 
        q: searchQuery.value.trim(),
        type: 'products' // Specify that this is a product search
      }
    })
  }
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// notifications removed

// Close search modal when clicking outside
// desktop search modal removed; no outside-click handling needed
</script>
