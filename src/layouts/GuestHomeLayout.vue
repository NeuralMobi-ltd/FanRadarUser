<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-200">
    <!-- Guest Layout Components -->
    <GuestSidebar @open-auth="openAuthModal" />
    <div class="ml-52 flex-1">
      <GuestHeader />
      <!-- Main Content with padding for header -->
      <main class="pt-16 min-h-screen">
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
import GuestSidebar from '@/components/layout/GuestSidebar.vue'
import GuestHeader from '@/components/layout/GuestHeader.vue'

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