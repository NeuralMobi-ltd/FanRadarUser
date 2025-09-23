<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 overflow-visible">
    <div class="flex items-center justify-between px-2 sm:px-4 py-2 relative">
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
            id="global-search-input"
            v-model="searchQuery"
            @focus="openSearchModal"
            @click="openSearchModal"
            @keyup.enter="performSearch"
            type="text"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
            :placeholder="t('header.searchPlaceholder')"
            />
          <button 
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <i class="fas fa-times text-gray-400 hover:text-gray-600"></i>
          </button>
        </div>
      </div>

      <!-- Right: User Actions - Responsive -->
      <div class="flex items-center space-x-1 sm:space-x-2">
        <!-- Mobile/Tablet Actions (show only on small screens) -->
        <div class="flex items-center space-x-1 lg:hidden">
          <!-- Mobile Search Button with better design -->
          <button
            v-if="isAuthenticated"
            @click="toggleMobileSearch"
            :aria-expanded="showMobileSearchInput ? 'true' : 'false'"
            aria-controls="mobile-search-bar"
            class="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            <MagnifyingGlassIcon v-if="!showMobileSearchInput" class="h-5 w-5" />
            <i v-else class="fas fa-times text-sm"></i>
          </button>

          <!-- Language Selector (mobile) - Better design -->
          <div class="relative">
            <button
              @click="showLanguageDropdown = !showLanguageDropdown"
              class="flex items-center space-x-1 px-2.5 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <span class="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold">
                {{ locale.toUpperCase() }}
              </span>
              <ChevronDownIcon class="h-3 w-3" />
            </button>
            
            <!-- Language Dropdown -->
            <div
              v-if="showLanguageDropdown"
              class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div class="py-1">
                <button
                  @click="selectLanguage('en')"
                  :class="[
                    'w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors',
                    locale === 'en' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <span class="text-lg">🇺🇸</span>
                  <span>{{ t('header.english') }}</span>
                  <i v-if="locale === 'en'" class="fas fa-check ml-auto text-xs"></i>
                </button>
                <button
                  @click="selectLanguage('fr')"
                  :class="[
                    'w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors',
                    locale === 'fr' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <span class="text-lg">🇫🇷</span>
                  <span>{{ t('header.french') }}</span>
                  <i v-if="locale === 'fr'" class="fas fa-check ml-auto text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            <SunIcon v-if="isDark" class="h-5 w-5" />
            <MoonIcon v-else class="h-5 w-5" />
          </button>

          <!-- Notifications removed -->

          <!-- Mobile/Tablet User Avatar & Logout -->
          <div v-if="isAuthenticated" class="relative">
            <button
              @click="showMobileUserMenu = !showMobileUserMenu"
              class="flex items-center space-x-1 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            >
              <AvatarFallback
                :src="userAvatar"
                :first-name="authStore.user?.firstName || authStore.user?.first_name || userName"
                :last-name="authStore.user?.lastName || authStore.user?.last_name"
                custom-class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-semibold text-white"
              />
              <ChevronDownIcon class="w-3 h-3" />
            </button>
            
            <!-- Mobile User Dropdown -->
            <div
              v-if="showMobileUserMenu"
              class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div class="py-1">
                <router-link 
                  :to="`/account/${userName || 'user'}`"
                  @click="showMobileUserMenu = false"
                  class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserIcon class="w-4 h-4 mr-2" />
                  {{ t('header.profile') }}
                </router-link>
                <button
                  @click="requestLogout"
                  class="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <ArrowRightOnRectangleIcon class="w-4 h-4 mr-2" />
                  {{ t('header.logout') }}
                </button>
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
            class="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
          >
            <SunIcon v-if="isDark" class="h-4 sm:h-5 w-4 sm:w-5" />
            <MoonIcon v-else class="h-4 sm:h-5 w-4 sm:w-5" />
          </button>

          <!-- Language Selector (desktop) - Better design -->
          <div class="relative">
            <button
              @click="showLanguageDropdown = !showLanguageDropdown"
              class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <span class="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold">
                {{ locale.toUpperCase() }}
              </span>
              <ChevronDownIcon class="h-3 w-3" />
            </button>
            
            <!-- Language Dropdown -->
            <div
              v-if="showLanguageDropdown"
              class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div class="py-1">
                <button
                  @click="selectLanguage('en')"
                  :class="[
                    'w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors',
                    locale === 'en' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <span class="text-lg">🇺🇸</span>
                  <span>English</span>
                  <i v-if="locale === 'en'" class="fas fa-check ml-auto text-xs"></i>
                </button>
                <button
                  @click="selectLanguage('fr')"
                  :class="[
                    'w-full flex items-center space-x-2 px-3 py-2 text-sm transition-colors',
                    locale === 'fr' 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  ]"
                >
                  <span class="text-lg">🇫🇷</span>
                  <span>Français</span>
                  <i v-if="locale === 'fr'" class="fas fa-check ml-auto text-xs"></i>
                </button>
              </div>
            </div>
          </div>

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
              <span class="hidden sm:inline">{{ t('header.create') }}</span>
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
                <span>{{ t('header.getApp') }}</span>
              </button>
            </div>

            <!-- Notifications removed -->

            <!-- User Menu -->
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-1 sm:space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <AvatarFallback
                  :src="userAvatar"
                  :first-name="authStore.user?.firstName || authStore.user?.first_name || userName"
                  :last-name="authStore.user?.lastName || authStore.user?.last_name"
                  custom-class="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white"
                />
                <span class="font-medium text-sm sm:text-base hidden sm:inline">{{ userName || 'User' }}</span>
                <ChevronDownIcon class="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="showUserMenu"
                class="absolute right-0 z-50 mt-2 w-44 sm:w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700"
              >
                <div class="py-1">
                  <router-link 
                    :to="`/account/${userName || 'user'}`"
                    @click="showUserMenu = false"
                    class="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <UserIcon class="w-4 h-4 mr-2" />
                    {{ t('header.profile') }}
                  </router-link>
                  <router-link 
                    to="/edit-account"
                    @click="showUserMenu = false" 
                    class="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Cog6ToothIcon class="w-4 h-4 mr-2" />
                    {{ t('header.userSettings') }}
                  </router-link>
                  <button
                    @click="requestLogout"
                    class="flex items-center w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon class="w-4 h-4 mr-2" />
                    {{ t('header.logout') }}
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-500 hover:text-blue-600 rounded-xl border border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              {{ t('auth.signIn.title') }}
            </router-link>
            <router-link
              to="/register"
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200"
            >
              {{ t('auth.signUp.title') }}
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile inline search input (only phones) -->
    <transition name="fade-slide">
      <div
        v-if="showMobileSearchInput && isAuthenticated"
        id="mobile-search-bar"
        class="sm:hidden px-3 pb-3 -mt-1"
      >
        <form @submit.prevent="performSearch" class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </span>
          <input
            ref="mobileSearchRef"
            v-model="searchQuery"
            type="text"
            autocomplete="off"
            inputmode="search"
            @keyup.enter="performSearch"
            @keydown.esc.prevent="closeMobileSearch"
            class="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/70 border border-gray-300/70 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-inner"
            :placeholder="t('header.searchPlaceholder')"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="clearSearch"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i class="fas fa-times text-xs"></i>
          </button>
        </form>
      </div>
    </transition>
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
  <h3 class="text-lg sm:text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">{{ t('header.getAppTitle') }}</h3>
      <p class="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm">{{ t('header.getAppSubtitle') }}</p>
      <div class="flex justify-center mb-4">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://fanradar.app"
          alt="FanRadar QR Code"
          class="rounded-lg border w-32 h-32 sm:w-40 sm:h-40"
        />
      </div>
  <p class="text-center text-gray-500 dark:text-gray-400 mb-3 text-xs">{{ t('header.getAppStoreHint') }}</p>
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
    @posted="handleCreatePost"
  />

  <!-- Logout Confirmation Modal -->
  <div v-if="showLogoutConfirm" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-gray-900 rounded-xl w-full max-w-sm shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-start gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center text-red-600 dark:text-red-300">
          <i class="fas fa-sign-out-alt text-lg"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('header.logoutTitle') }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{{ t('header.logoutMessage') }}</p>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 mb-5 flex gap-2 items-start">
        <i class="fas fa-info-circle mt-0.5"></i>
  <span>{{ t('header.logoutHint') }}</span>
      </div>
      <div class="flex flex-col sm:flex-row-reverse gap-3">
        <button @click="confirmLogout" :disabled="loggingOut" class="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
          <i v-if="!loggingOut" class="fas fa-door-open"></i>
          <i v-else class="fas fa-spinner fa-spin"></i>
          <span>{{ loggingOut ? t('header.loggingOut') : t('header.logout') }}</span>
        </button>
  <button @click="cancelLogout" :disabled="loggingOut" class="px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">{{ t('modal.confirm.cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import { CreatePostModal } from '@/components/feed'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import { usePostsStore } from '@/store/posts'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import {
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    MagnifyingGlassIcon,
    MoonIcon,
    SunIcon,
    UserIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const { t, locale: i18nLocale } = useI18n()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)
const isDark = computed(() => themeStore.isDark)

// notifications removed

const showUserMenu = ref(false)
const showMobileUserMenu = ref(false)
const showAppModal = ref(false)
// Desktop search uses inline bar; mobile uses inline dropdown
const showSearchModal = ref(false) // reserved if modal is later reintroduced
const showMobileSearchInput = ref(false)
const mobileSearchRef = ref(null)
const showCreatePostModal = ref(false)
const postsStore = usePostsStore()
const showLanguageDropdown = ref(false)
const searchQuery = ref('')
const modalPostContent = ref('')
const modalPostMedia = ref([])
const locale = ref(typeof localStorage !== 'undefined' ? (localStorage.getItem('locale') || i18nLocale.value) : i18nLocale.value)

function toggleTheme() {
  themeStore.toggleTheme()
}


function openSearchModal() { // legacy (desktop already shows search input)
  showSearchModal.value = true
}

function toggleMobileSearch() {
  showMobileSearchInput.value = !showMobileSearchInput.value
  if (showMobileSearchInput.value) {
    nextTick(() => {
      mobileSearchRef.value?.focus()
    })
  }
}

function closeMobileSearch() {
  showMobileSearchInput.value = false
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
    closeMobileSearch()
  }
}

// Handle search from modal
function handleSearchFromModal(term) {
  searchQuery.value = term
  performSearch()
}

// (Optional) If needed elsewhere, compute placeholder via i18n.
// const mobileSearchPlaceholder = computed(() => t('header.searchPlaceholder'))

// Logout flow with custom confirmation modal
const showLogoutConfirm = ref(false)
const loggingOut = ref(false)
function requestLogout() {
  showLogoutConfirm.value = true
  showUserMenu.value = false
}
async function confirmLogout() {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    await authStore.logout()
    router.push('/login')
  } finally {
    loggingOut.value = false
    showLogoutConfirm.value = false
  }
}
function cancelLogout() { if (!loggingOut.value) showLogoutConfirm.value = false }

// notifications removed

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
  if (!post) return
  // If PostsService returned wrapper like { post: {...} } prefer post.post
  const created = post.post || post.data || post
  try {
    postsStore.addPost(created)
  } catch (e) {
    console.warn('Failed to add post to store', e)
  }
}

const onChangeLocale = () => {
  i18nLocale.value = locale.value
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('locale', locale.value)
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', locale.value)
  } catch {}
}

function selectLanguage(lang) {
  locale.value = lang
  showLanguageDropdown.value = false
  onChangeLocale()
}

watch(i18nLocale, (val) => {
  if (locale.value !== val) locale.value = val
})
</script>

<style scoped>
/* ...existing code... */
</style>
