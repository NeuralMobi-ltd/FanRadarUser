<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center justify-between px-2 sm:px-4 py-2">
      <!-- Left: Logo -->
      <div class="flex items-center flex-shrink-0">
        <router-link to="/" class="flex items-center space-x-2">
          <img 
            src="/images/FanRadar.png"
            alt="FanRadar" 
            class="h-6 sm:h-8 w-auto dark:hidden"
          />
          <img 
            src="/images/FanRadarWhite.png"
            alt="FanRadar" 
            class="h-6 sm:h-8 w-auto hidden dark:block"
          />
        </router-link>
      </div>

      <!-- Center: Search Bar (only if authenticated, hidden on mobile) -->
      <div v-if="isAuthenticated" class="hidden sm:flex flex-1 max-w-2xl mx-4 relative">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            @focus="openSearchModal"
            @click="openSearchModal"
            @keyup.enter="performSearch"
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Search FanRadar"
          />
          <button 
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <i class="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>

        <!-- Search Modal positioned relative to search input -->
        <SearchModal 
          :is-visible="showSearchModal"
          :query="searchQuery" 
          @close="showSearchModal = false" 
          @search="performSearch"
        />
      </div>

      <!-- Right: User Actions - Responsive -->
      <div class="flex items-center space-x-1 sm:space-x-2">
        <!-- Mobile/Tablet Actions (show only on small screens) -->
        <div class="flex items-center space-x-2 lg:hidden">
          <!-- Mobile Search Button -->
          <button
            v-if="isAuthenticated"
            @click="openSearchModal"
            class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
          >
            <SunIcon v-if="isDark" class="h-5 w-5" />
            <MoonIcon v-else class="h-5 w-5" />
          </button>

          <!-- Language Selector (mobile) -->
          <select
            v-model="locale"
            @change="onChangeLocale"
            class="px-2 py-1 text-xs rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <!-- Notifications (mobile/tablet) -->
          <div v-if="isAuthenticated" class="relative">
            <button
              class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md relative"
              @click="toggleNotificationsDropdown"
            >
              <BellIcon class="h-5 w-5" />
              <span v-if="unreadNotificationsCount > 0" class="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>
            <!-- Notifications Dropdown for mobile/tablet -->
            <div
              v-if="showNotificationsDropdown"
              class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span class="font-semibold text-gray-900 dark:text-white text-sm">Notifications</span>
                <button
                  v-if="unreadNotificationsCount > 0"
                  @click="markAllNotificationsRead"
                  class="text-xs text-blue-500 hover:underline"
                >Mark all as read</button>
              </div>
              <div class="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notif.read }"
                  @click="markNotificationRead(notif.id)"
                >
                  <div class="flex-shrink-0">
                    <img v-if="notif.avatar" :src="notif.avatar" class="w-8 h-8 rounded-full object-cover" />
                    <div v-else class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                      <i :class="notif.icon"></i>
                    </div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <div class="text-sm text-gray-900 dark:text-white font-medium" v-html="notif.text"></div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ notif.time }}</div>
                  </div>
                  <span v-if="!notif.read" class="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div v-if="notifications.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
                  No notifications
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Actions (show only on large screens) -->
        <div class="hidden lg:flex items-center space-x-2">
          <!-- Mobile Search Button (visible only on mobile when authenticated) -->
          <button
            v-if="isAuthenticated"
            @click="openSearchModal"
            class="sm:hidden p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
          >
            <SunIcon v-if="isDark" class="h-4 sm:h-5 w-4 sm:w-5" />
            <MoonIcon v-else class="h-4 sm:h-5 w-4 sm:w-5" />
          </button>

          <!-- Language Selector (desktop) -->
          <select
            v-model="locale"
            @change="onChangeLocale"
            class="px-2 py-1 text-sm rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <!-- Authenticated and Guest User Actions -->
          <template v-if="isAuthenticated">

            <!-- Create Post -->
            <button
              class="hidden sm:flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
              @click="showCreatePostModal = true"
            >
              <svg class="h-3 sm:h-4 w-3 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span class="hidden sm:inline">Create</span>
            </button>

            <!-- Mobile Create Button -->
            <button
              class="sm:hidden p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
              @click="showCreatePostModal = true"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Get App Button (responsive) -->
            <div class="hidden md:block">
              <button
                @click="showAppModal = true"
                class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-xs sm:text-sm"
              >
                <svg class="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" />
                  <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" stroke="currentColor" />
                </svg>
                <span>Get App</span>
              </button>
            </div>

            <!-- Notifications -->
            <div class="relative">
              <button
                class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md relative"
                @click="toggleNotificationsDropdown"
              >
                <BellIcon class="h-4 sm:h-5 w-4 sm:w-5" />
                <span v-if="unreadNotificationsCount > 0" class="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900"></span>
              </button>
            </div>

            <!-- User Menu -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-1 sm:space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img 
                  :src="userAvatar || '/images/me.png'" 
                  :alt="userName || 'User'"
                  class="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover"
                />
                <span class="font-medium text-sm sm:text-base hidden sm:inline">{{ userName || 'User' }}</span>
                <ChevronDownIcon class="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="showUserMenu"
                class="absolute right-0 z-50 mt-2 w-44 sm:w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <router-link 
                    :to="`/account/${userName || 'user'}`"
                    @click="showUserMenu = false"
                    class="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <UserIcon class="inline w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    Profile
                  </router-link>
                  <router-link 
                    to="/edit-account"
                    @click="showUserMenu = false" 
                    class="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Cog6ToothIcon class="inline w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    User Settings
                  </router-link>
                  <button
                    @click="logout"
                    class="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowRightOnRectangleIcon class="inline w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-500 hover:text-blue-600 rounded-full border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Log In
            </router-link>
            <router-link
              to="/register"
              class="px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </header>

  <!-- Get App Modal -->
  <div
    v-if="showAppModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
  >
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md relative">
      <button
        @click="showAppModal = false"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h3 class="text-lg sm:text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">Get the FanRadar app</h3>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
        Scan this QR code to download the app now
      </p>
      <div class="flex justify-center mb-4">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://fanradar.app"
          alt="FanRadar QR Code"
          class="rounded-lg border w-32 h-32 sm:w-40 sm:h-40"
        />
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400 mb-3 text-xs">Or check it out in the app stores</p>
      <div class="flex justify-center gap-2">
        <a href="https://play.google.com/store" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-8 sm:h-10"/>
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank">
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" class="h-8 sm:h-10"/>
        </a>
      </div>
    </div>
  </div>

  <!-- Create Post Modal -->
  <CreatePostModal
    v-model="showCreatePostModal"
    :user-avatar="userAvatar"
    :user-name="userName"
    @submit="handleCreatePost"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import { useI18n } from 'vue-i18n'
import SearchModal from '@/components/layout/SearchModal.vue'
import CreatePostModal from '@/components/common/CreatePostModal.vue'
import { useNotificationsStore } from '@/store/notifications' // <-- new

import {
  MagnifyingGlassIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const { locale: i18nLocale } = useI18n()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
const userEmail = computed(() => authStore.userEmail)
const userAvatar = computed(() => authStore.userAvatar)
const isDark = computed(() => themeStore.isDark)

const notificationsStore = useNotificationsStore()
const showNotificationsDropdown = ref(false)

const notifications = computed(() => notificationsStore.notifications)
const unreadNotificationsCount = computed(() =>
  notificationsStore.notifications.filter(n => !n.read).length
)

const showUserMenu = ref(false)
const showAppModal = ref(false)
const showSearchSidebar = ref(false)
const showSearchModal = ref(false)
const showCreatePostModal = ref(false)
const searchQuery = ref('')
const modalPostContent = ref('')
const modalPostMedia = ref([])
const locale = ref(typeof localStorage !== 'undefined' ? (localStorage.getItem('locale') || i18nLocale.value) : i18nLocale.value)

function toggleTheme() {
  themeStore.toggleTheme()
}

function openSearchSidebar() {
  showSearchSidebar.value = true
}

function openSearchModal() {
  showSearchModal.value = !showSearchModal.value
}

function clearSearch() {
  searchQuery.value = ''
}

function performSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'SearchResults',
      query: { q: searchQuery.value.trim() }
    })
    showSearchModal.value = false
  }
}

// Handle search from modal
function handleSearchFromModal(term) {
  searchQuery.value = term
  performSearch()
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    router.push('/login')
    showUserMenu.value = false
  }
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

function onModalFileChange(type, event) {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      modalPostMedia.value.push({
        type,
        url: e.target.result,
        file
      })
    }
    reader.readAsDataURL(file)
  })
}

function removeModalMedia(index) {
  modalPostMedia.value.splice(index, 1)
}

function submitModalPost() {
  if (modalPostContent.value.trim() || modalPostMedia.value.length > 0) {
    // You may want to emit an event or use a store to add the post globally
    // Example: postsStore.addPost({ ... })
    // For now, just close the modal and reset
    modalPostContent.value = ''
    modalPostMedia.value = []
    showCreatePostModal.value = false
  }
}

function handleCreatePost(post) {
  // Use your store or emit event to add the post globally
  // Example: postsStore.addPost(post)
}

const onChangeLocale = () => {
  i18nLocale.value = locale.value
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('locale', locale.value)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', locale.value)
  } catch {}
}

watch(i18nLocale, (val) => {
  if (locale.value !== val) locale.value = val
})
</script>

<style scoped>
/* ...existing code... */
</style>
