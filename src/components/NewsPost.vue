<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
       @click="openNewsArticle">
    <!-- News Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-3">
        <img 
          :src="news.sourceLogo" 
          class="w-8 h-8 rounded-full object-cover"
          :alt="news.source"
          @error="handleImageError"
        >
        <div>
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-900 dark:text-white text-sm">{{ news.source }}</span>
            <span v-if="news.breaking" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse">
              <i class="fas fa-bolt mr-1"></i>
              BREAKING
            </span>
          </div>
          <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{{ formatDate(news.date) }}</span>
            <span>•</span>
            <span class="flex items-center">
              <i class="fas fa-eye mr-1"></i>
              {{ news.views }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- News Options -->
      <div class="relative">
        <button 
          @click.stop="showOptions = !showOptions"
          class="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          <i class="fas fa-ellipsis-h text-gray-400 text-sm"></i>
        </button>
        
        <div 
          v-if="showOptions"
          v-click-outside="() => showOptions = false"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
        >
          <button 
            @click.stop="saveNews"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fas fa-bookmark mr-2"></i>
            Save Article
          </button>
          <button 
            @click.stop="shareNews"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fas fa-share mr-2"></i>
            Share
          </button>
          <button 
            @click.stop="hideNews"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fas fa-eye-slash mr-2"></i>
            Hide from {{ news.source }}
          </button>
        </div>
      </div>
    </div>

    <!-- News Content -->
    <div class="mb-3">
      <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
        {{ news.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
        {{ news.summary }}
      </p>
    </div>

    <!-- News Image (if available) -->
    <div v-if="news.image" class="mb-3 rounded-lg overflow-hidden">
      <img 
        :src="news.image" 
        :alt="news.title"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      >
    </div>

    <!-- News Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-4">
        <!-- Category Tag -->
        <span 
          v-if="news.category"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          {{ news.category }}
        </span>
        
        <!-- Reading Time -->
        <span 
          v-if="news.readingTime"
          class="text-xs text-gray-500 dark:text-gray-400 flex items-center"
        >
          <i class="fas fa-clock mr-1"></i>
          {{ news.readingTime }} min read
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          @click.stop="likeNews"
          class="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          :class="{ 'text-red-500': news.isLiked }"
          title="Like"
        >
          <i :class="news.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
        
        <button 
          @click.stop="commentOnNews"
          class="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          title="Comment"
        >
          <i class="far fa-comment"></i>
        </button>
        
        <button 
          @click.stop="shareNews"
          class="p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          title="Share"
        >
          <i class="fas fa-share"></i>
        </button>
      </div>
    </div>

    <!-- Trending Indicator -->
    <div 
      v-if="news.trending"
      class="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse"
    >
      <i class="fas fa-fire mr-1"></i>
      Hot
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open', 'like', 'comment', 'share', 'save', 'hide'])

const showOptions = ref(false)

// Methods
const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}

const handleImageError = (event) => {
  // Hide image if it fails to load
  event.target.style.display = 'none'
}

const openNewsArticle = () => {
  emit('open', props.news.id)
  // In a real app, this would open the full article
  console.log('Opening news article:', props.news.title)
}

const likeNews = () => {
  emit('like', props.news.id)
  // Toggle like state locally for immediate feedback
  props.news.isLiked = !props.news.isLiked
}

const commentOnNews = () => {
  emit('comment', props.news.id)
  console.log('Commenting on news:', props.news.id)
}

const shareNews = () => {
  emit('share', props.news.id)
  // Copy link to clipboard or open share dialog
  if (navigator.share) {
    navigator.share({
      title: props.news.title,
      text: props.news.summary,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    console.log('Link copied to clipboard')
  }
}

const saveNews = () => {
  emit('save', props.news.id)
  console.log('Saving news:', props.news.id)
}

const hideNews = () => {
  emit('hide', props.news.id)
  console.log('Hiding news from:', props.news.source)
}

// Click outside directive
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth hover animations */
.group:hover img {
  transform: scale(1.02);
}

/* Custom scrollbar for long content */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #374151;
}
</style>