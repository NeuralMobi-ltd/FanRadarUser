<template>
  <div class="app" :class="theme">
    <!-- Fixed Header -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <Header @toggle-theme="toggleTheme" />
    </div>
    
    <!-- Main Content with top padding to account for fixed header -->
    <div class="main-layout pt-16">
      <Sidebar />
      <main class="main-content with-sidebar">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/store/index'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar/Sidebar.vue'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.state.theme)
const toggleTheme = themeStore.toggleTheme
</script>

<style scoped>
/* Your existing styles */
</style>