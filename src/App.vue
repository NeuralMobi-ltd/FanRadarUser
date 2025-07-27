<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-200">
    <!-- Authenticated user layout -->
    <div v-if="isAuthenticated" class="authenticated-layout">
      <div class="main-layout">
        <Sidebar />
        <main class="main-content with-sidebar">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Guest user layout -->
    <component
      :is="isAuthenticated ? 'DashboardLayout' : 'GuestHomeLayout'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useThemeStore } from '@/store/index'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
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
  margin-left: 240px; /* Account for sidebar width */
}
</style>