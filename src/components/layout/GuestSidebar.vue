<template>
  <aside class="fixed left-0 top-0 w-64 h-screen bg-white text-black border-r border-gray-200 dark:bg-black dark:text-white dark:border-gray-800 flex flex-col">
    <!-- Logo -->
    <div class="px-5 py-4">
      <router-link to="/" class="text-black dark:text-white hover:opacity-80 transition-opacity flex items-center">
        <img
          :src="isDark ? logoSrcWhite : logoSrc"
          alt="FanRadar Logo"
          class="h-14 object-contain"
        />
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2">
      <ul class="space-y-1">
        <li>
          <router-link 
            to="/explore" 
            class="flex items-center gap-3 px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] rounded-md transition-colors"
          >
            <i class="fas fa-compass text-xl w-6"></i>
            <span class="font-medium">Explore</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/communities" 
            class="flex items-center gap-3 px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] rounded-md transition-colors"
          >
            <i class="fas fa-users text-xl w-6"></i>
            <span class="font-medium">Communities</span>
          </router-link>
        </li>
        <li>
          <button 
            @click="toggleThemeMode"
            class="flex items-center gap-3 px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A] rounded-md transition-colors w-full"
          >
            <i class="fas fa-palette text-xl w-6"></i>
            <span class="font-medium">Cement</span>
            <span class="ml-auto text-gray-400 dark:text-gray-500 text-sm">(4/12)</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Auth Buttons -->
    <div class="p-4 space-y-3">
      <button 
        @click="$emit('open-auth', 'signup')"
        class="w-full bg-gray-500 text-white font-semibold py-3 px-4 rounded-full transition-colors text-base
               dark:bg-dark-400 dark:text-white dark:hover:bg-dark-500"
      >
        Sign up
      </button>
      <button 
        @click="$emit('open-auth', 'login')"
        class="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-full transition-colors text-base
               dark:bg-dark-700 dark:text-white dark:hover:bg-dark-800"
      >
        Log in
      </button>
    </div>
  </aside>
</template>

<script>
import { useThemeStore } from '@/store'
import { ref, onMounted } from 'vue'

export default {
  name: 'GuestSidebar',
  emits: ['open-auth'],
  setup() {
    const themeStore = useThemeStore()
    const logoSrcWhite = '/images/FanRadarWhite.png'
    const logoSrc = '/images/FanRadar.png'
    const isDark = ref(document.documentElement.classList.contains('dark'))

    // Watch for dark mode changes
    const updateIsDark = () => {
      isDark.value = document.documentElement.classList.contains('dark')
    }

    onMounted(() => {
      // Listen for class changes on <html>
      const observer = new MutationObserver(updateIsDark)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    })

    const toggleThemeMode = () => {
      const html = document.documentElement
      html.classList.toggle('dark')
      updateIsDark()
      themeStore.toggleTheme && themeStore.toggleTheme()
    }

    return {
      toggleThemeMode,
      logoSrc,
      logoSrcWhite,
      isDark
    }
  }
}
</script>

<style scoped>
/* All styling is handled by Tailwind classes */
</style>
