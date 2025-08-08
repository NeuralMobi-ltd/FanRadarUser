<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div class=" mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Store Name -->
        <div class="flex items-center space-x-4">
          <router-link to="/mart" class="flex items-center space-x-3">
            <img 
              src="/public/images/FanRadarStore.png" 
              alt="FanRadar Store Logo" 
              class="w-10 rounded-xl object-cover"
            />
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">FanRadarMart</h1>
            </div>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative search-container">
            <input
              v-model="searchQuery"
              @focus="showSearchModal = true"
              @click="showSearchModal = true"
              type="text"
              placeholder="Search products..."
              class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-2 px-4 pl-10 pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              @keyup.enter="performSearch"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <!-- Search Button -->
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 transition-colors"
              :disabled="!searchQuery.trim()"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Product Search Modal positioned relative to search input -->
            <ProductSearchModal 
              :is-visible="showSearchModal"
              :query="searchQuery" 
              @close="showSearchModal = false" 
              @search="performSearch"
            />
          </div>
        </div>
    
            <!-- Actions -->
            <div class="flex items-center space-x-3">
              <!-- Back to Community -->
              <router-link 
                to="/dashboard"
                class="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <i class="fas fa-home w-4 h-4 mt-1"></i>
                <span>fandoms</span>
              </router-link>

              <!-- Dark mode toggle -->
              <button 
                @click="toggleTheme"
                class="p-2.5 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
              >
                <svg v-if="isDark" class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>


              <!-- Notifications -->
              <div class="relative">
                <button
                  class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md relative"
                  @click="toggleNotificationsDropdown"
                >
                  <BellIcon class="h-5 w-5" />
                  <span v-if="unreadNotificationsCount > 0" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900"></span>
                </button>
                <!-- Notifications Dropdown -->
                <div
                  v-if="showNotificationsDropdown"
                  class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span class="font-semibold text-gray-900 dark:text-white">Notifications</span>
                    <button
                      v-if="unreadNotificationsCount > 0"
                      @click="markAllNotificationsRead"
                      class="text-xs text-blue-500 hover:underline"
                    >Mark all as read</button>
                  </div>
                  <div class="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                    <div
                      v-for="notif in notifications"
                      :key="notif.id"
                      class="flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notif.read }"
                      @click="markNotificationRead(notif.id)"
                    >
                      <div class="flex-shrink-0">
                        <img v-if="notif.avatar" :src="notif.avatar" class="w-9 h-9 rounded-full object-cover" />
                        <div v-else class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                          <i :class="notif.icon"></i>
                        </div>
                      </div>
                      <div class="ml-3 flex-1 min-w-0">
                        <div class="text-sm text-gray-900 dark:text-white font-medium" v-html="notif.text"></div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ notif.time }}</div>
                      </div>
                      <span v-if="!notif.read" class="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                    </div>
                    <div v-if="notifications.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-8">
                      No notifications
                    </div>
                  </div>
                </div>
              </div>

              <!-- Cart -->
              <router-link 
                to="/cart"
                class="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 group"
              >
                      <i class="fas fa-shopping-cart w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"></i>

                <span v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-lg transform scale-100 hover:scale-110 transition-transform">
                  {{ cartItemsCount }}
                </span>
              </router-link>

        

          <!-- User Profile -->
          <div class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img 
                :src="user?.avatar || '/public/images/me.png'" 
                class="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                :alt="user?.name || 'User'"
              />
              <span class="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">{{ user?.name || 'yassineelaouni581' }}</span>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
            >
              <!-- User Info Header -->
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center space-x-3">
                  <img :src="user?.avatar || '/public/images/me.png'" class="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ user?.name || 'yassineelaouni581' }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ user?.email || 'yss@fanradars.com' }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <router-link 
                to="/account/me"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </router-link>
              <router-link 
                to="/orders"
                class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 7l1.5 12a2 2 0 002 2h11a2 2 0 002-2L21 7M16 11V7a4 4 0 00-8 0v4" />
                        </svg>

                My Orders
              </router-link>
              <button class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
              <hr class="my-2 border-gray-200 dark:border-gray-600">
              <button 
                @click="logout"
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import ProductSearchModal from '@/components/store/ProductSearchModal.vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { useStoreNotifications } from '@/store/storeNotifications'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const notificationsStore = useStoreNotifications()

const searchQuery = ref('')
const showUserMenu = ref(false)
const showSearchModal = ref(false)
const showNotificationsDropdown = ref(false)
const cartItemsCount = ref(3) // Mock cart count

const user = computed(() => authStore.user)
const isDark = computed(() => themeStore.isDark)
const notifications = computed(() => notificationsStore.notifications)
const unreadNotificationsCount = computed(() =>
  notificationsStore.notifications.filter(n => !n.read).length
)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to product search results page with search parameters specific to products
    router.push({
      name: 'ProductSearchResults',
      query: { 
        q: searchQuery.value.trim(),
        type: 'products' // Specify that this is a product search
      }
    })
    showSearchModal.value = false
  }
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

function toggleNotificationsDropdown() {
  showNotificationsDropdown.value = !showNotificationsDropdown.value
  if (showNotificationsDropdown.value) {
    notificationsStore.markAllAsSeen()
  }
}

function markNotificationRead(id) {
  notificationsStore.markAsRead(id)
}

function markAllNotificationsRead() {
  notificationsStore.markAllAsRead()
}

// Close search modal when clicking outside
const closeSearchOnClickOutside = (event) => {
  if (showSearchModal.value && !event.target.closest('.search-container')) {
    showSearchModal.value = false
  }
}

// Add event listener for click outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', closeSearchOnClickOutside)
}
</script>
