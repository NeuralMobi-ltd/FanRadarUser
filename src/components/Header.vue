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
              class="flex items-center space-x-1 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <img
                src="/images/me.png"
                alt="User avatar"
                class="h-8 w-8 rounded-full"
              />
              <svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-2">
                  <img src="/images/me.png" alt="User avatar" class="h-8 w-8 rounded-full"/>
                  <div>
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">1 karma</div>
                  </div>
                </div>
              </div>
              
              <router-link
                to="/account"
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showUserMenu = false"
              >
                <svg class="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
                Profile
              </router-link>
              
              <router-link
                to="/settings"
                class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="showUserMenu = false"
              >
                <svg class="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                </svg>
                User Settings
              </router-link>
              
              <hr class="my-1 border-gray-200 dark:border-gray-700">
              
              <button
                @click="logout"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
                </svg>
                Log Out
              </button>
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
  MoonIcon
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
  authStore.logout()
  showUserMenu.value = false
  router.push('/')
}
</script>
