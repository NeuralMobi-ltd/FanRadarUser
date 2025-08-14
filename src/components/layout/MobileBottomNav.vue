<template>
  <nav class="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div class="flex justify-around items-center px-2">
      <!-- Home -->
      <router-link
        to="/"
        class="flex flex-col items-center justify-center py-2 px-2 touch-button"
        :class="isActiveRoute('/') || isActiveRoute('/home') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <i class="fas fa-home text-lg"></i>
        <span class="text-xs font-medium mt-1">Home</span>
      </router-link>

      <!-- Explore -->
      <router-link
        to="/explore"
        class="flex flex-col items-center justify-center py-2 px-2 touch-button"
        :class="isActiveRoute('/explore') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <i class="fas fa-compass text-lg"></i>
        <span class="text-xs font-medium mt-1">Explore</span>
      </router-link>

      <!-- Fandoms -->
      <router-link
        to="/fandoms/browse"
        class="flex flex-col items-center justify-center py-2 px-2 touch-button"
        :class="isActiveRoute('/fandoms') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <i class="fas fa-users text-lg"></i>
        <span class="text-xs font-medium mt-1">Fandoms</span>
      </router-link>

      <!-- Store -->
      <router-link
        to="/mart"
        class="flex flex-col items-center justify-center py-2 px-2 touch-button relative"
        :class="isActiveRoute('/mart') ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <i class="fas fa-shopping-bag text-lg"></i>
        <span class="text-xs font-medium mt-1">Mart</span>
        <!-- Cart indicator -->
        <span v-if="cartCount > 0" class="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {{ cartCount }}
        </span>
      </router-link>

      <!-- Profile -->
      <router-link
        to="/profile"
        class="flex flex-col items-center justify-center py-2 px-2 touch-button"
        :class="isActiveRoute('/profile') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
      >
        <i class="fas fa-user text-lg"></i>
        <span class="text-xs font-medium mt-1">Profile</span>
      </router-link>
    </div>
  </nav>

  <!-- Create Post Modal -->
  <CreatePostModal
    v-model="showCreateModal"
    :user-avatar="userAvatar"
    :user-name="userName"
    @submit="handleCreatePost"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import CreatePostModal from '@/components/common/CreatePostModal.vue'

const route = useRoute()
const authStore = useAuthStore()

const showCreateModal = ref(false)
const cartCount = ref(3) // Mock cart count - replace with actual store

const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/home'
  }
  return route.path.startsWith(path)
}

function handleCreatePost(post) {
  // Handle post creation
  console.log('Creating post:', post)
}
</script>

<style scoped>
/* Ensure the bottom navigation doesn't interfere with content */
.router-link-active {
  color: rgb(37 99 235); /* blue-600 */
}

/* Custom active state for store/mart routes */
.router-link-active[href*="mart"] {
  color: rgb(22 163 74); /* green-600 */
}
</style>
