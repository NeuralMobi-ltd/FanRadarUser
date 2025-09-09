<template>
  <div v-if="article" 
       class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 cursor-pointer min-h-36 min-w-64"
       :style="cardStyle"
       @click="openLink">
    <!-- Horizontal Layout: Image left, Content right -->
    <div class="flex gap-4 p-4 h-full">
      <!-- Left: Image with overlays -->
      <div class="flex-shrink-0 w-28 sm:w-32 h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-500/20 to-secondary-500/30">
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title || 'news thumbnail'"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <!-- Image placeholder icon -->
          <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <!-- Category pill -->
        <span v-if="article.category" class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 shadow">
          {{ article.category }}
        </span>
        <!-- Breaking badge -->
        <span v-if="article.breaking" class="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-500 text-white shadow">
          Breaking
        </span>
      </div>
      
      <!-- Right: Content -->
      <div class="flex-1 min-w-0 flex flex-col h-full">
        <!-- Source + time -->
        <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
          <img v-if="article.sourceLogo" :src="article.sourceLogo" :alt="article.source || 'source'" class="w-4 h-4 rounded-sm object-contain bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/60" />
          <span class="font-medium truncate">{{ article.source || 'Source' }}</span>
          <span class="opacity-50">•</span>
          <span>{{ formattedDate }}</span>
        </div>
        
        <!-- Title -->
        <h3 class="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
          {{ article.title || 'Untitled Article' }}
        </h3>
        
        <!-- Summary -->
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
          {{ article.summary || article.description || 'No description available.' }}
        </p>
        
        <!-- Views display -->
        <div class="mt-auto flex items-center text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/>
            </svg>
            <span class="font-medium">{{ formatNumber(article.views) }}</span>
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
import { computed } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: false,
    default: () => ({})
  },
  // Optional sizing overrides (e.g., '18rem', '280px')
  cardWidth: {
    type: [String, Number],
    default: null
  },
  cardHeight: {
    type: [String, Number],
    default: null
  }
})


const cardStyle = computed(() => {
  const s = {}
  if (props.cardWidth !== null && props.cardWidth !== undefined) {
    s.width = typeof props.cardWidth === 'number' ? `${props.cardWidth}px` : props.cardWidth
  }
  if (props.cardHeight !== null && props.cardHeight !== undefined) {
    s.height = typeof props.cardHeight === 'number' ? `${props.cardHeight}px` : props.cardHeight
  }
  return s
})

// Helper function to format numbers (1200 -> 1.2K)
const formatNumber = (num) => {
  if (typeof num !== 'number') return num
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}


// Helper function to format date to concise "time ago" (e.g., 2h, 5m, 1d)
const formatTimeAgo = (date) => {
  if (!date) return '2h'
  if (typeof date === 'string') {
    if (date.includes('ago')) {
      const match = date.match(/(\d+)([hmd])/)
      if (match) return `${match[1]}${match[2]}`
    }
    if (/[hmd]/.test(date)) return date.replace(' ago', '')
    return date
  }
  const now = new Date()
  const d = new Date(date)
  if (isNaN(d.getTime())) return '2h'
  const mins = Math.floor((now - d) / 60000)
  if (mins < 1) return '1m'
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.floor(mins / 60)}h`
  if (mins < 10080) return `${Math.floor(mins / 1440)}d`
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

const formattedDate = computed(() => formatTimeAgo(props.article.date || props.article.timeAgo))


function openLink() {
  const href = props.article?.link
  if (href) window.open(href, '_blank', 'noopener')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>