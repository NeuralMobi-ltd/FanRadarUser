<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <!-- Post Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-3">
        <router-link :to="`/account/${post.username}`">
          <img :src="post.avatar" class="w-10 h-10 rounded-full hover:opacity-80 transition-opacity" :alt="post.username">
        </router-link>
        
        <div>
          <router-link 
            :to="`/account/${post.username}`"
            class="font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {{ post.username }}
          </router-link>
          
          <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{{ formatDate(post.date) }}</span>
            <span v-if="post.fandom" class="text-blue-500 dark:text-blue-400">
              • {{ post.fandom }}
            </span>
            <span v-if="post.trending" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              <i class="fas fa-fire mr-1"></i>
              Trending
            </span>
          </div>
        </div>
      </div>
      
      <!-- Post Options -->
      <div class="relative">
        <button 
          @click="showOptions = !showOptions"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <i class="fas fa-ellipsis-h text-gray-400"></i>
        </button>
        
        <div 
          v-if="showOptions"
          v-click-outside="() => showOptions = false"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
        >
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i class="fas fa-bookmark mr-2"></i>
            Save Post
          </button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i class="fas fa-flag mr-2"></i>
            Report
          </button>
          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <i class="fas fa-user-times mr-2"></i>
            Hide from {{ post.username }}
          </button>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mb-3">
      <p class="text-gray-900 dark:text-white whitespace-pre-wrap">{{ post.text }}</p>
      
      <!-- Post Image -->
      <div v-if="post.image" class="mt-3 rounded-lg overflow-hidden">
        <img 
          :src="post.image" 
          :alt="'Image from ' + post.username"
          class="w-full h-auto max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
          @click="openImageModal"
        >
      </div>
      
      <!-- Post Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-3">
        <span 
          v-for="tag in post.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          @click="searchByTag(tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Post Actions -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-6">
        <!-- Like Button -->
        <button 
          @click="$emit('like', post.id)"
          class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
          :class="{ 'text-red-500 dark:text-red-400': post.isLiked }"
        >
          <i 
            :class="post.isLiked ? 'fas fa-heart' : 'far fa-heart'"
            class="group-hover:scale-110 transition-transform"
          ></i>
          <span class="text-sm font-medium">{{ formatNumber(post.likes) }}</span>
        </button>

        <!-- Comment Button -->
        <button 
          @click="$emit('comment', post.id)"
          class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
        >
          <i class="far fa-comment group-hover:scale-110 transition-transform"></i>
          <span class="text-sm font-medium">{{ formatNumber(post.comments) }}</span>
        </button>

        <!-- Share Button -->
        <button 
          @click="$emit('share', post.id)"
          class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors group"
        >
          <i class="fas fa-share group-hover:scale-110 transition-transform"></i>
          <span class="text-sm font-medium">{{ formatNumber(post.shares) }}</span>
        </button>
      </div>

      <!-- Additional Actions -->
      <div class="flex items-center space-x-2">
        <button 
          class="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Bookmark"
        >
          <i class="far fa-bookmark"></i>
        </button>
        
        <button 
          class="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Share externally"
        >
          <i class="fas fa-external-link-alt"></i>
        </button>
      </div>
    </div>

    <!-- Comments Preview -->
    <div v-if="post.comments > 0" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <button 
        @click="$emit('comment', post.id)"
        class="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
      >
        View {{ post.comments === 1 ? '1 comment' : `all ${post.comments} comments` }}
      </button>
    </div>

    <!-- Image Modal -->
    <div 
      v-if="showImageModal && post.image"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click="showImageModal = false"
    >
      <div class="relative max-w-4xl max-h-full p-4">
        <img 
          :src="post.image" 
          :alt="'Image from ' + post.username"
          class="max-w-full max-h-full object-contain"
        >
        <button 
          @click="showImageModal = false"
          class="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'comment', 'share'])

const showOptions = ref(false)
const showImageModal = ref(false)

// Methods
const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  
  return date.toLocaleDateString()
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  return (num / 1000000).toFixed(1) + 'M'
}

const searchByTag = (tag) => {
  console.log('Searching for tag:', tag)
  // Implement tag search functionality
}

const openImageModal = () => {
  showImageModal.value = true
}

// Click outside directive (you might want to implement this as a global directive)
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
/* Component-specific styles */
.group:hover .fa-heart {
  animation: heartbeat 0.3s ease-in-out;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Ensure text breaks properly for long words */
p {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>