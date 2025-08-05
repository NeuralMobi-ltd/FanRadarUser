<template>
  <div class="app" :class="theme">
    <StoreHeader />
    <div class="main-layout">
      <!-- No sidebar for store layout -->
      <main class="main-content store-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/store/index'
import StoreHeader from '@/components/store/StoreHeader.vue'

const themeStore = useThemeStore()
const theme = computed(() => themeStore.state.theme)
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f9fafb;
}

.app.dark {
  background-color: #111827;
}

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px); /* Subtract header height */
}

.store-content {
  flex: 1;
  width: 100%;
  background-color: #f9fafb;
}

.app.dark .store-content {
  background-color: #111827;
}
</style>
