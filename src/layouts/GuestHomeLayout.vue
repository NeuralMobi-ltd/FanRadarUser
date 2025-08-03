<template>
  <div class="flex min-h-screen bg-white dark:bg-black transition-colors duration-200">
    <!-- Guest Layout Components -->
    <GuestSidebar @open-auth="openAuthModal" />
    <div class="ml-32 flex-1">
      <!-- Main Content -->
      <main class="w-full">
        <router-view />
      </main>
    </div>

    <AuthModal
      :is-visible="showAuthModal"
      :mode="authMode"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthModal from '@/components/AuthModal.vue'
import GuestSidebar from '@/components/layout/Sidebar/GuestSidebar.vue'

// Auth modal state
const showAuthModal = ref(false)
const authMode = ref('signup')

const openAuthModal = (mode) => {
  authMode.value = mode
  showAuthModal.value = true
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

const handleAuthSuccess = (data) => {
  console.log('Auth success:', data)
  showAuthModal.value = false
  // Additional logic after successful auth if needed
}
</script>

<style scoped>
/* Custom styles if needed - most styling is now handled by Tailwind classes */
</style>