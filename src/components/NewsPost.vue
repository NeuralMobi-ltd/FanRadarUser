<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
    <div class="relative h-48">
      <img :src="news.image" :alt="news.title" class="w-full h-full object-cover">
      <div v-if="news.breaking" class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
        🔥 Breaking
      </div>
    </div>
    
    <div class="p-4">
      <div class="flex items-center mb-2">
        <img v-if="news.sourceLogo" :src="news.sourceLogo" :alt="news.source" class="w-6 h-6 rounded mr-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ news.source }}</span>
        <span class="mx-2 text-gray-300 dark:text-gray-600">•</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ news.date }}</span>
      </div>
      
      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ news.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {{ news.summary }}
      </p>
      
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-3">
          <span>{{ news.views }} views</span>
          <span>{{ news.readingTime }} min read</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="hover:text-red-500 transition-colors">
            <i class="fas fa-heart" :class="{ 'text-red-500': news.isLiked }"></i>
          </button>
          <button class="hover:text-blue-500 transition-colors">
            <i class="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  news: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>