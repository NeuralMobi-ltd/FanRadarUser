<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-960 transition-colors duration-200">
    <!-- Choose correct layout based on authentication status -->
    <div v-if="isAuthenticated" class="flex">
      <!-- Authenticated user layout -->
      <Sidebar />
      <main class="main-content with-sidebar">
        <router-view />
      </main>
    </div>

    <!-- Guest user layout -->
    <component v-else :is="GuestHomeLayout" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import Sidebar from '@/components/Sidebar.vue'
import GuestHomeLayout from '@/layouts/GuestHomeLayout.vue'

const auth = useAuthStore()
auth.initialize()
const isAuthenticated = computed(() => auth.isAuthenticated)

const themeStore = useThemeStore()
const toggleTheme = themeStore.toggleTheme
</script>


<style>
.main-layout {
  display: flex;
}

.main-content {
  flex: 1;
  min-height: 100vh;
}

.main-content.with-sidebar {
  margin-left: 256px; /* Account for sidebar width */
}

/* Add this to fix image display issues */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

/* Ensure proper image paths in development */
[src^="/images/"] {
  content: attr(src);
  /* For development environment */
}
</style>