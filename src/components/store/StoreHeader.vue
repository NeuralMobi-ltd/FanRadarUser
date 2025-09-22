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
              @click="toggleMobileInlineSearch"
              :aria-expanded="showMobileInlineSearch ? 'true' : 'false'"
              aria-controls="store-mobile-search"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-md transition-colors"
            >
              <svg v-if="!showMobileInlineSearch" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <i v-else class="fas fa-times w-5 h-5"></i>
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

    <!-- Mobile inline search (replaces previous modal) -->
    <transition name="fade-slide">
      <div v-if="showMobileInlineSearch" id="store-mobile-search" class="md:hidden px-3 pb-3 -mt-1">
        <form @submit.prevent="performMobileSearch" class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            ref="mobileInlineSearchRef"
            v-model="mobileSearchQuery"
            @keyup.enter.prevent="performMobileSearch"
            @keydown.esc.prevent="closeMobileInlineSearch"
            type="text"
            autocomplete="off"
            inputmode="search"
            class="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/70 border border-gray-300/70 dark:border-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-inner"
            placeholder="Search products..."
          />
          <button
            v-if="mobileSearchQuery"
            type="button"
            @click="mobileSearchQuery = ''"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i class="fas fa-times text-xs"></i>
          </button>
        </form>
      </div>
    </transition>
  </header>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const searchQuery = ref('')
const mobileSearchQuery = ref('')
const showMobileInlineSearch = ref(false)
const mobileInlineSearchRef = ref(null)
const showUserMenu = ref(false)
const cartItemsCount = ref(3) // Mock cart count
const isSearching = ref(false)

// (Simplified) store search functionality for inline mobile search

const user = computed(() => authStore.user)
const isDark = computed(() => themeStore.isDark)
// notifications removed

const toggleMobileInlineSearch = () => {
  showMobileInlineSearch.value = !showMobileInlineSearch.value
  if (showMobileInlineSearch.value) {
    nextTick(() => mobileInlineSearchRef.value?.focus())
  }
}

const closeMobileInlineSearch = () => {
  showMobileInlineSearch.value = false
}

const performMobileSearch = () => {
  const q = mobileSearchQuery.value.trim()
  if (!q) return
  router.push({
    name: 'ProductSearchResults',
    query: { q, type: 'products' }
  })
  mobileSearchQuery.value = ''
  closeMobileInlineSearch()
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
