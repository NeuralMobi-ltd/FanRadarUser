<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-960 transition-colors duration-200">
    <!-- Hide Header on auth pages -->
    <Header v-if="!isAuthPage" />

    <div v-if="isAuthenticated && !isAuthPage" class="main-layout">
      <Sidebar />
      <main class="main-content with-sidebar">
        <router-view />
      </main>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()
const auth = useAuthStore()
auth.initialize()
const isAuthenticated = computed(() => auth.isAuthenticated)
const themeStore = useThemeStore()

// Hide header on login, signup, choose-categories
const isAuthPage = computed(() =>
  ['/login', '/signup', '/choose-categories'].includes(route.path)
)
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
  margin-left: 0;
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