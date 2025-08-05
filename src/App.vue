<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-960 transition-colors duration-200">
    <!-- Landing Page Layout (only header) -->
    <div v-if="isLandingPage">
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <!-- Store Layout for mart, cart, orders -->
    <div v-else-if="isStoreRoute && isAuthenticated">
      <StoreHeader />
      <div class="flex">
        <!-- Hide sidebar for store search routes -->
        <StoreSidebar v-if="!isStoreSearchRoute" />
        <main :class="isStoreSearchRoute ? 'flex-1 min-h-screen' : 'flex-1 min-h-screen'">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Search Layout (header + search sidebar + content) -->
    <div v-else-if="isSearchRoute && isAuthenticated">
      <Header />
      <div class="main-layout">
        <SearchPageSidebar />
        <main class="main-content with-sidebar">
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
import SearchPageSidebar from '@/components/layout/SearchPageSidebar.vue'

const route = useRoute()
const auth = useAuthStore()
auth.initialize()
const isAuthenticated = computed(() => auth.isAuthenticated)
const themeStore = useThemeStore()

// Check if current route is landing page
const isLandingPage = computed(() => route.path === '/')

// Check if current route is store-related
const isStoreRoute = computed(() => 
  ['/mart', '/cart', '/orders'].some(path => route.path.startsWith(path))
)

// Check if current route is store search
const isStoreSearchRoute = computed(() => route.path.startsWith('/mart/search'))

// Check if current route is search page
const isSearchRoute = computed(() => route.path === '/search')

// Hide header on login, signup, choose-categories (but not landing page)
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