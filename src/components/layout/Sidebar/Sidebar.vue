<template>
  <!-- Mobile Menu Overlay -->
  <div
    v-if="showMobileMenu"
    class="fixed inset-0 z-50 lg:hidden"
    @click="showMobileMenu = false"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
  </div>


  <!-- Sidebar -->
  <aside 
    v-bind="$attrs"
    :class="[
      'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto lg:overflow-visible transition-transform duration-300 ease-in-out z-40',
      // Mobile: Fixed overlay
      'lg:relative lg:translate-x-0',
      showMobileMenu ? 'fixed inset-y-0 left-0 w-64 translate-x-0' : 'fixed inset-y-0 left-0 w-64 -translate-x-full',
      // Desktop: Sticky sidebar below fixed header, no internal scroll
      'lg:w-64 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] '
    ]"
  >
    <!-- Close button for mobile -->
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
      <button
        @click="showMobileMenu = false"
        class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <nav class="p-4 space-y-2">
      <!-- Main Navigation -->
      <div class="space-y-1">
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap relative overflow-hidden"
          :class="isActiveRoute('/') ? 
            'text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-900/30 font-medium shadow-sm' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'"
        >
          <span class="absolute inset-y-1 left-0 w-1 rounded-r bg-indigo-500 transition-opacity" :class="isActiveRoute('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"></span>
          <i class="fas fa-home w-5 h-5 flex-shrink-0"></i>
          <span class="leading-none">Home</span>
        </router-link>

        <router-link
          to="/explore"
          @click="closeMobileMenu"
          class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap relative overflow-hidden"
          :class="isActiveRoute('/explore') ? 
            'text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-900/30 font-medium shadow-sm' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'"
        >
          <span class="absolute inset-y-1 left-0 w-1 rounded-r bg-indigo-500 transition-opacity" :class="isActiveRoute('/explore') ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"></span>
          <i class="fas fa-compass w-5 h-5 flex-shrink-0"></i>
          <span class="leading-none">Explore</span>
        </router-link>

        <router-link
          to="/fandoms/browse"
          @click="closeMobileMenu"
          class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap relative overflow-hidden"
          :class="isActiveRoute('/fandoms/browse') ? 
            'text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-900/30 font-medium shadow-sm' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'"
        >
          <span class="absolute inset-y-1 left-0 w-1 rounded-r bg-indigo-500 transition-opacity" :class="isActiveRoute('/fandoms/browse') ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"></span>
          <i class="fas fa-users w-5 h-5 flex-shrink-0"></i>
          <span class="leading-none">Fandoms</span>
        </router-link>

        <router-link
          to="/mart"
          @click="closeMobileMenu"
          class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap relative overflow-hidden"
          :class="isActiveRoute('/mart') ? 
            'text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-900/30 font-medium shadow-sm' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'"
        >
          <span class="absolute inset-y-1 left-0 w-1 rounded-r bg-indigo-500 transition-opacity" :class="isActiveRoute('/mart') ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"></span>
          <i class="fas fa-shopping-bag w-5 h-5 flex-shrink-0"></i>
          <span class="leading-none">FanRadar Store</span>
        </router-link>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

      <!-- Create Section -->
      <div class="space-y-1">
        <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Create
        </h3>
        
        <router-link
          to="/create-fandom"
          @click="closeMobileMenu"
          class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap relative overflow-hidden"
          :class="isActiveRoute('/create-fandom') ? 
            'text-indigo-600 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-900/30 font-medium shadow-sm' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/70'"
        >
          <span class="absolute inset-y-1 left-0 w-1 rounded-r bg-indigo-500 transition-opacity" :class="isActiveRoute('/create-fandom') ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"></span>
          <i class="fas fa-plus w-5 h-5 flex-shrink-0"></i>
          <span class="leading-none">Create Fandom</span>
        </router-link>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-700"></div>


  

    </nav>
    <!-- Create Post Modal -->
    <CreatePostModal
      v-model="showCreatePostModal"
      :user-avatar="userAvatar"
      :user-name="userName"
      @submit="handleCreatePost"
      @posted="handleCreatePost"
    />
  </aside>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
import { CreatePostModal } from '@/components/feed'
import { useAuthStore } from '@/store/auth'
import { usePostsStore } from '@/store/posts'
import normalizeAsset from '@/utils/assets'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()

// Mobile menu state
const showMobileMenu = ref(false)

// Mock data - replace with actual store data
const cartItemsCount = ref(3)
const unreadMessages = ref(5)
const unreadNotifications = ref(12)

const recentFandoms = ref([
  {
    id: 1,
    name: 'league-of-legends',
    displayName: 'League of Legends',
    avatar: 'https://logo.clearbit.com/riotgames.com',
    memberCount: '2.5M'
  },
  {
    id: 2,
    name: 'football-fans',
    displayName: 'Football Fans',
    avatar: 'https://logo.clearbit.com/fifa.com',
    memberCount: '1.8M'
  },
  {
    id: 3,
    name: 'k-pop',
    displayName: 'K-Pop',
    avatar: 'https://logo.clearbit.com/spotify.com',
    memberCount: '3.2M'
  },
  {
    id: 4,
    name: 'anime',
    displayName: 'Anime',
    avatar: 'https://logo.clearbit.com/crunchyroll.com',
    memberCount: '4.1M'
  }
])

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const showCreatePostModal = ref(false)
const postsStore = usePostsStore()
const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

function openCreatePostModal() {
  showCreatePostModal.value = true
  closeMobileMenu()
}

function handleCreatePost(post) {
  if (!post) return
  // Avoid injecting a local post; close modal and let feeds refresh from backend
  showCreatePostModal.value = false
}

// Avatar helpers: normalize URL, or fallback to gradient + initials
function safeAvatar(fandom) {
  const url = normalizeAsset(fandom?.avatar)
  return url || ''
}

function hashToHue(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360
  return h
}

function avatarStyle(name = '') {
  const n = String(name || 'fandom').toLowerCase()
  const h = hashToHue(n)
  const h2 = (h + 35) % 360
  return { background: `linear-gradient(135deg, hsl(${h},80%,45%), hsl(${h2},80%,45%))` }
}

function initials(name = '') {
  const n = String(name).trim()
  return n ? n[0].toUpperCase() : '?'
}
</script>

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark aside::-webkit-scrollbar-thumb {
  background: #374151;
}

.dark aside::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>