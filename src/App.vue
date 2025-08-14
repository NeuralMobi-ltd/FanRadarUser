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
      <div class="flex flex-col md:flex-row">
        <!-- Hide sidebar for store search routes, show as mobile drawer on small screens -->
        <StoreSidebar v-if="!isStoreSearchRoute" />
        <main class="flex-1 min-h-screen w-full md:w-auto">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Search Layout (header + search sidebar + content) -->
    <div v-else-if="isSearchRoute && isAuthenticated">
      <Header />
      <div class="flex flex-col md:flex-row">
        <SearchPageSidebar class="order-2 md:order-1" />
        <main class="flex-1 min-h-screen w-full md:w-auto order-1 md:order-2">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Community Layout -->
    <div v-else-if="isAuthenticated && !isAuthPage">
      <!-- Header visibility rules -->
      <!-- Home/Explore: show on all breakpoints (as per screenshots) -->
      <div>
        <Header />
      </div>


      <div class="flex flex-col md:flex-row">
        <Sidebar class="order-2 md:order-1" />
        <main class="flex-1 min-h-screen w-full md:w-auto order-1 md:order-2 pb-24 md:pb-0">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Auth Pages (no layout) -->
    <div v-else>
      <router-view />
    </div>

    <!-- Mobile Bottom Navigation (show ONLY on tablet and phone, not on desktop) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-2 pb-2 pt-1" style="padding-bottom: env(safe-area-inset-bottom)">
      <MobileBottomNav v-if="isAuthenticated && !isLandingPage && !isAuthPage" />
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
import MobileBottomNav from '@/components/layout/MobileBottomNav.vue'

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

// Home or Explore routes
const isHomeOrExplore = computed(() => {
  const p = route.path
  return p === '/' || p === '/home' || p.startsWith('/explore')
})
</script>

<style>
/* Remove fixed layouts in favor of responsive flex */
.main-layout {
  display: flex;
  flex-direction: column;
  padding: 0;
}

@media (min-width: 768px) {
  .main-layout {
    flex-direction: row;
  }
}

.main-content {
  flex: 1;
  min-height: 100vh;
  width: 100%;
  /* Add bottom padding on mobile to account for bottom navigation */
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .main-content {
    padding-bottom: 0;
  }
}

/* Responsive image handling */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

/* Development image paths */
[src^="/images/"] {
  content: attr(src);
}

/* Mobile-first responsive utilities */
@media (max-width: 767px) {
  .mobile-full-width {
    width: 100vw !important;
  }
  
  .mobile-padding {
    padding: 1rem !important;
  }
}
</style>