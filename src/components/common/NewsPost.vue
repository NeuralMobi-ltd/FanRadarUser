
<template>
  <div v-if="article" class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 cursor-pointer">
    <!-- Horizontal Layout: Image left, Content right -->
    <div class="flex gap-4 p-4">
      <!-- Left: Large Image with gradient overlay -->
      <div class="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden relative bg-gradient-to-br from-purple-400 to-purple-600">
        <div class="absolute inset-0 flex items-center justify-center">
          <!-- Image placeholder icon -->
          <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Right: Content -->
      <div class="flex-1 min-w-0 flex flex-col justify-between">
        <!-- Top row: Category and time -->
        <div class="flex items-center justify-between mb-2">
          <span v-if="article.category" class="text-sm font-medium text-purple-600 dark:text-purple-400">
            {{ article.category }}
          </span>
          <div class="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <span>il y a {{ formattedDate }}</span>
          </div>
        </div>
        
        <!-- Title -->
        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {{ article.title || 'Untitled Article' }}
        </h3>
        
        <!-- Summary -->
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
          {{ article.summary || article.description || 'No description available.' }}
        </p>
        
        <!-- Bottom row: Source and stats -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{{ article.source || 'Music Daily' }}</span>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Likes -->
            <div class="flex items-center gap-1 text-sm">
              <button 
                @click.stop="toggleLike"
                class="transition-colors duration-200"
                :class="article.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </button>
              <span class="text-gray-600 dark:text-gray-400 font-medium">{{ formatNumber(article.likes) || '45,2K' }}</span>
            </div>
            
            <!-- Comments/Shares -->
            <div class="flex items-center gap-1 text-sm">
              <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-600 dark:text-gray-400 font-medium">{{ formatNumber(article.comments) || '8,1K' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fallback for missing article -->
  <div v-else class="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
    <div class="text-center">
      <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-newspaper text-gray-400 text-xl"></i>
      </div>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Article not available</p>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed } from 'vue'

const props = defineProps({
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

const emit = defineEmits(['click:like', 'click:share'])

// Helper function to format numbers (1200 -> 1.2K)
const formatNumber = (num) => {
  if (!num || typeof num !== 'number') return num
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Helper function to format date to "time ago" format (French style)
const formatTimeAgo = (date) => {
  if (!date) return '2h'
  
  // Handle string dates like "2h ago", "6h ago" - extract number and unit
  if (typeof date === 'string') {
    if (date.includes('ago')) {
      const match = date.match(/(\d+)([hm])/);
      if (match) {
        return `${match[1]}${match[2]}`;
      }
    }
    if (date.includes('h') || date.includes('m') || date.includes('d')) {
      return date.replace(' ago', '');
    }
    return date;
  }
  
  // Handle Date objects
  const now = new Date()
  const articleDate = new Date(date)
  
  // If date is invalid, return default
  if (isNaN(articleDate.getTime())) {
    return '2h'
  }
  
  const diffInMinutes = Math.floor((now - articleDate) / 60000)
  
  if (diffInMinutes < 1) {
    return '1m'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours}h`
  } else if (diffInMinutes < 10080) {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days}j`
  } else {
    // For older dates, show formatted date
    return articleDate.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short'
    })
  }
}

// Computed property for formatted date
const formattedDate = computed(() => {
  return formatTimeAgo(props.article.date || props.article.timeAgo)
})

const toggleLike = () => {
  if (props.article) {
    props.article.isLiked = !props.article.isLiked
    emit('click:like', props.article)
  }
}

const shareArticle = () => {
  emit('click:share', props.article)
  // You can add actual sharing logic here
  console.log('Sharing article:', props.article.title)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>