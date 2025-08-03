<template>
  <div v-if="article" class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
    <div class="relative h-48">
      <img 
        :src="article.image || article.thumbnail || 'https://via.placeholder.com/300x200'" 
        :alt="article.title || 'News article'" 
        class="w-full h-full object-cover"
      />
      <div v-if="article.breaking" class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
        🔥 Breaking
      </div>
    </div>
    
    <div class="p-4">
      <div class="flex items-center mb-2">
        <img 
          v-if="article.sourceLogo" 
          :src="article.sourceLogo" 
          :alt="article.source || 'Source'" 
          class="w-6 h-6 rounded mr-2"
        />
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ article.source || 'Unknown Source' }}</span>
        <span class="mx-2 text-gray-300 dark:text-gray-600">•</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ article.timeAgo || article.date || 'Recently' }}</span>
      </div>
      
      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
        {{ article.title || 'Untitled Article' }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {{ article.summary || article.description || 'No description available.' }}
      </p>
      
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-3">
          <span>{{ article.views || '1.2K' }} views</span>
          <span>{{ article.readTime || article.readingTime || '3 min' }} read</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="hover:text-red-500 transition-colors">
            <i class="fas fa-heart" :class="{ 'text-red-500': article.isLiked }"></i>
          </button>
          <button class="hover:text-blue-500 transition-colors">
            <i class="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
    <p class="text-gray-500 dark:text-gray-400">Article data not available</p>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: false,
    default: () => ({})
  },
  highlightTerm: {
    type: String,
    default: ''
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