<template>
  <header class="fixed top-0 left-52 right-0 h-16 bg-white dark:bg-dark-950 border-b border-gray-200 dark:border-dark-700 z-50">
    <div class="flex items-center justify-between h-full px-6">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ pageTitle }}</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            class="w-64 px-4 py-2 text-sm text-gray-700 dark:text-white bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-md focus:outline-none focus:border-primary-600 dark:focus:border-primary-500"
          >
          <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  switch (route.path) {
    case '/explore':
      return 'Explore'
    case '/communities':
      return 'Communities'
    default:
      return 'Home'
  }
})
</script>
