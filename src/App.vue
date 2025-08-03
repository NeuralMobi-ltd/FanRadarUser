<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-960 transition-colors duration-200">
    <!-- Store Layout for mart, cart, orders -->
    <div v-if="isStoreRoute && isAuthenticated">
      <StoreHeader />
      <div class="flex">
        <StoreSidebar />
        <main class="flex-1 min-h-screen">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Community Layout -->
    <div v-else-if="isAuthenticated && !isAuthPage">
      <Header />
      <div class="main-layout">
        <Sidebar />
        <main class="main-content with-sidebar">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Auth Pages (no layout) -->
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
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar/Sidebar.vue'
import StoreHeader from '@/components/store/StoreHeader.vue'
import StoreSidebar from '@/components/store/StoreSidebar.vue'

const route = useRoute()
const auth = useAuthStore()
auth.initialize()
const isAuthenticated = computed(() => auth.isAuthenticated)
const themeStore = useThemeStore()

// Check if current route is store-related
const isStoreRoute = computed(() => 
  ['/mart', '/cart', '/orders'].some(path => route.path.startsWith(path))
)

// Hide header on login, signup, choose-categories
const isAuthPage = computed(() =>
  ['/login', '/signup', '/choose-categories', '/'].includes(route.path)
)
</script>

<style>
.main-layout {
  display: flex;
  padding: 0;
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