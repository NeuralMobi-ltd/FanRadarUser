<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 bottom-0 z-50">
    <div class="flex items-center justify-between px-4 py-2">
      <!-- Left: Logo -->
      <div class="flex items-center">
        <router-link to="/" class="flex items-center space-x-2">
          <img 
            src="/images/FanRadar.png"
            alt="FanRadar" 
            class="h-8 w-auto dark:hidden"
          />
          <img 
            src="/images/FanRadarWhite.png"
            alt="FanRadar" 
            class="h-8 w-auto hidden dark:block"
          />
        </router-link>
      </div>

      <!-- Center: Search Bar (only if authenticated) -->
      <div v-if="isAuthenticated" class="flex-1 max-w-2xl mx-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Search FanRadar"
          />
        </div>
      </div>

      <!-- Right: User Actions -->
      <div class="flex items-center space-x-2">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md"
        >
          <SunIcon v-if="isDark" class="h-5 w-5" />
          <MoonIcon v-else class="h-5 w-5" />
        </button>

        <!-- Authenticated and Guest User Actions -->
        <template v-if="isAuthenticated">

          <!-- Create Post -->
          <button class="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            <span>Create</span>
          </button>
             <!-- Get App Button (always visible) -->
        <div>
          <button
            @click="showAppModal = true"
            class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-full font-medium transition-colors"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" />
              <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" stroke="currentColor" />
            </svg>
            <span>Get App</span>
          </button>
        </div>

          <!-- Notifications -->
          <button class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md relative">
            <BellIcon class="h-5 w-5" />
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-gray-900"></span>
          </button>

          <!-- User Menu -->
          <div class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <img 
                :src="authStore.user?.avatar || '/public/images/me.png'" 
                :alt="authStore.user?.name || 'User'"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="font-medium">{{ authStore.user?.name || 'User' }}</span>
              <ChevronDownIcon class="w-4 h-4" />
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <router-link 
                  :to="`/account/${authStore.user?.email?.split('@')[0] || 'user'}`"
                  @click="showUserMenu = false"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UserIcon class="inline w-4 h-4 mr-2" />
                  Profile
                </router-link>
                <router-link 
                  to="/edit-account"
                  @click="showUserMenu = false" 
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Cog6ToothIcon class="inline w-4 h-4 mr-2" />
                  User Settings
                </router-link>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <ArrowRightOnRectangleIcon class="inline w-4 h-4 mr-2" />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="px-4 py-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 rounded-full border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Log In
          </router-link>
          <router-link
            to="/register"
            class="px-4 py-1.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            Sign Up
          </router-link>
        </template>
      </div>
    </div>
  </header>

  <!-- Get App Modal -->
  <div
    v-if="showAppModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
  >
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-1/4 relative">
      <button
        @click="showAppModal = false"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h3 class="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">Get the FanRadar app</h3>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
        Scan this QR code to download the app now
      </p>
      <div class="flex justify-center mb-4">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://fanradar.app"
          alt="FanRadar QR Code"
          class="rounded-lg border"
        />
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400 mb-3 text-xs">Or check it out in the app stores</p>
      <div class="flex justify-center gap-2">
        <a href="https://play.google.com/store" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10"/>
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank">
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" class="h-10"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
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

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isDark = computed(() => themeStore.isDark)

const showUserMenu = ref(false)
const showAppModal = ref(false)

function toggleTheme() {
  themeStore.toggleTheme()
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    router.push('/login')
    showUserMenu.value = false
  }
}
</script>
