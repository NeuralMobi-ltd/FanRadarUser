<template>
  <nav
    class="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-700"
    style="padding-bottom: env(safe-area-inset-bottom)"
  >
    <div class="flex justify-around items-center px-1 py-1">
      <!-- Home -->
      <router-link
        to="/"
        aria-label="Home"
        class="flex flex-col items-center justify-center py-2.5 px-2 touch-button"
        :class="isActiveRoute('/dashboard') || isActiveRoute('/home') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <i class="fas fa-home text-base"></i>
        <span class="text-[11px] font-medium mt-0.5">Home</span>
      </router-link>

      <!-- Explore -->
      <router-link
        to="/explore"
        aria-label="Explore"
        class="flex flex-col items-center justify-center py-2.5 px-2 touch-button"
        :class="isActiveRoute('/explore') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <i class="fas fa-compass text-base"></i>
        <span class="text-[11px] font-medium mt-0.5">Explore</span>
      </router-link>

      <!-- Fandoms -->
      <router-link
        to="/fandoms/browse"
        aria-label="Fandoms"
        class="flex flex-col items-center justify-center py-2.5 px-2 touch-button"
        :class="isActiveRoute('/fandoms') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <i class="fas fa-users text-base"></i>
        <span class="text-[11px] font-medium mt-0.5">Fandoms</span>
      </router-link>

      <!-- Store -->
      <router-link
        to="/mart"
        aria-label="Mart"
        class="flex flex-col items-center justify-center py-2.5 px-2 touch-button relative"
        :class="isActiveRoute('/mart') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <i class="fas fa-shopping-bag text-base"></i>
        <span class="text-[11px] font-medium mt-0.5">Mart</span>
      </router-link>

      <!-- Profile -->
      <router-link
        :to="accountPath"
        aria-label="Profile"
        class="flex flex-col items-center justify-center py-2.5 px-2 touch-button"
        :class="isActiveRoute('/account') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <i class="fas fa-user text-base"></i>
        <span class="text-[11px] font-medium mt-0.5">Profile</span>
      </router-link>
    </div>
  </nav>

  <!-- Create Post Modal -->
  <CreatePostModal
    v-model="showCreateModal"
    :user-avatar="userAvatar"
    :user-name="userName"
    @submit="handleCreatePost"
    @posted="handleCreatePost"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { CreatePostModal } from '@/components/feed'
import { usePostsStore } from '@/store/posts'

const route = useRoute()
const authStore = useAuthStore()

const showCreateModal = ref(false)
const postsStore = usePostsStore()
const cartCount = ref(3) // Mock cart count - replace with actual store

const userName = computed(() => authStore.userName)
const userAvatar = computed(() => authStore.userAvatar)

// Route to the authenticated user's account page
const accountPath = computed(() => {
  return userName.value ? `/account/${encodeURIComponent(userName.value)}` : '/dashboard'
})

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/home'
  }
  return route.path.startsWith(path)
}

function handleCreatePost(post) {
  if (!post) return
  const created = post.post || post.data || post
  try {
    postsStore.addPost(created)
  } catch (e) {
    console.warn('Failed to add post to store', e)
  }
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
