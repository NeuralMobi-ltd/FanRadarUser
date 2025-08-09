<template>
  <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto mb-4 z-40">
    <nav class="p-4 space-y-2">
      <!-- Main Navigation -->
      <div class="space-y-1">
        <router-link
          to="/"
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
            class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <img :src="fandom.avatar" class="w-5 h-5 rounded-full mr-3" :alt="fandom.name">
            <span class="truncate">{{ fandom.displayName }}</span>
            <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">
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
          @click="showCreatePostModal = true"
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

const createPost = () => {
  // Implement create post functionality
  console.log('Creating new post...')
}

const openMessaging = () => {
  // Implement messaging functionality
  console.log('Opening messages...')
}

const openNotifications = () => {
  // Implement notifications functionality
  console.log('Opening notifications...')
}

const showCreatePostModal = ref(false)
const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

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