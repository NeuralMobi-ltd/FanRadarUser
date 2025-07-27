<template>
  <div class="app" :class="theme">
    <Header @toggle-theme="toggleTheme" />
    <div class="main-layout">
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
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.state.theme)
const toggleTheme = themeStore.toggleTheme
</script>

<style scoped>
/* Your existing styles */
</style>