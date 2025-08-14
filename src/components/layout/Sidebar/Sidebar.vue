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
    :class="[
      'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out z-50',
      // Mobile: Fixed overlay
      'lg:relative lg:translate-x-0',
      showMobileMenu ? 'fixed inset-y-0 left-0 w-64 translate-x-0' : 'fixed inset-y-0 left-0 w-64 -translate-x-full',
      // Desktop: Sticky sidebar
      'lg:w-64 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:mb-4'
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
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveRoute('/home') ? 
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <i class="fas fa-home w-5 h-5 mr-3"></i>
          Home
        </router-link>

        <router-link
          to="/explore"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveRoute('/explore') ? 
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <i class="fas fa-compass w-5 h-5 mr-3"></i>
          Explore
        </router-link>

        <router-link
          to="/fandoms/browse"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveRoute('/fandoms/browse') ? 
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <i class="fas fa-users w-5 h-5 mr-3"></i>
          Fandoms
        </router-link>

        <router-link
          to="/mart"
          @click="closeMobileMenu"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveRoute('/mart') ? 
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <i class="fas fa-shopping-bag w-5 h-5 mr-3"></i>
          FanRadar Mart
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
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
          :class="isActiveRoute('/create-fandom') ? 
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          <i class="fas fa-plus w-5 h-5 mr-3"></i>
          Create Fandom
        </router-link>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

      <!-- Recent Fandoms -->
      <div class="space-y-1">
        <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Recent Fandoms
        </h3>
        
        <div class="space-y-1">
          <router-link
            v-for="fandom in recentFandoms"
            :key="fandom.id"
            :to="`/fandom/${fandom.name}`"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <img :src="fandom.avatar" class="w-5 h-5 rounded-full mr-3" :alt="fandom.name">
            <span class="truncate flex-1">{{ fandom.displayName }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ fandom.memberCount }}
            </span>
          </router-link>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

      <!-- Quick Actions -->
      <div class="space-y-1">
        <h3 class="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Quick Actions
        </h3>
        
        <button
          @click="openCreatePostModal"
          class="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i class="fas fa-pen w-5 h-5 mr-3"></i>
          New Post
        </button>
      </div>
    </nav>
    <!-- Create Post Modal -->
    <CreatePostModal
      v-model="showCreatePostModal"
      :user-avatar="userAvatar"
      :user-name="userName"
      @submit="handleCreatePost"
    />
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import CreatePostModal from '@/components/common/CreatePostModal.vue'

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
const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

function openCreatePostModal() {
  showCreatePostModal.value = true
  closeMobileMenu()
}

function handleCreatePost(post) {
  // Use your store or emit event to add the post globally
  // Example: postsStore.addPost(post)
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