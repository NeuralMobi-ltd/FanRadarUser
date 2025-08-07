<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-auto">
    <!-- Post Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <router-link :to="`/account/${post.username}`" class="relative">
          <img :src="post.avatar || post.userAvatar" class="w-12 h-12 rounded-full ring-2 ring-gray-100 dark:ring-gray-700 hover:ring-blue-500 transition-all duration-200" :alt="post.username">
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </router-link>
        
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <router-link 
              :to="`/account/${post.username}`"
              class="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {{ post.username }}
            </router-link>
            <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.date) }}</span>
          </div>
          
          <div class="flex items-center space-x-2 mt-1">
            <span v-if="post.fandom || post.communityName" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></div>
              {{ post.fandom || post.communityName }}
            </span>
            <span v-if="post.trending" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
              </svg>
              Trending
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="mb-4">
      <p class="text-gray-900 dark:text-white text-[15px] leading-relaxed whitespace-pre-wrap">{{ post.text || post.content }}</p>
      
      <!-- Legacy Single Image Support -->
      <div v-if="post.image && !post.media" class="mt-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          :src="post.image" 
          :alt="'Image from ' + post.username"
          class="w-full h-auto object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
      </div>

      <!-- Instagram-style Media Carousel -->
      <div v-if="post.media && post.media.length > 0" class="mt-4 relative">
        <div class="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square relative">
          <!-- Media Container -->
          <div class="relative w-full h-full overflow-hidden">
            <div 
              class="flex transition-transform duration-300 ease-out h-full"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(media, index) in post.media" 
                :key="index"
                class="w-full h-full flex-shrink-0"
              >
                <!-- Image -->
                <img 
                  v-if="media.type === 'image'"
                  :src="media.url" 
                  :alt="'Media ' + (index + 1) + ' from ' + post.username"
                  class="w-full h-full object-cover"
                >
                <!-- Video -->
                <div 
                  v-else-if="media.type === 'video'"
                  class="w-full h-full relative"
                >
                  <video 
                    :src="media.url"
                    class="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  ></video>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows (only show if multiple media items) -->
          <div v-if="post.media.length > 1">
            <!-- Previous Arrow -->
            <button 
              v-if="currentSlide > 0"
              @click="previousSlide"
              class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Next Arrow -->
            <button 
              v-if="currentSlide < post.media.length - 1"
              @click="nextSlide"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dots Indicator (only show if multiple media items) -->
        <div v-if="post.media.length > 1" class="flex justify-center mt-3 space-x-1">
          <button
            v-for="(media, index) in post.media"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-200',
              currentSlide === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            ]"
          ></button>
        </div>

        <!-- Media Counter -->
        <div v-if="post.media.length > 1" class="absolute top-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded-full backdrop-blur-sm">
          {{ currentSlide + 1 }} / {{ post.media.length }}
        </div>
      </div>
      
      <!-- Post Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
        <span 
          v-for="tag in post.tags"
          :key="tag"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-all duration-200"
          @click="searchByTag(tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Post Actions -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
      <div class="flex items-center space-x-1">
        <!-- Like Button -->
        <button 
          @click="$emit('like', post.id)"
          class="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
          :class="{ 'bg-red-50 dark:bg-red-900/20': post.isLiked }"
        >
          <div class="relative">
            <svg 
              :class="post.isLiked ? 'text-red-500 scale-110' : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500'"
              class="w-5 h-5 transition-all duration-200"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            <div v-if="post.isLiked" class="absolute inset-0 animate-ping">
              <svg class="w-5 h-5 text-red-500 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <span class="text-sm font-semibold" :class="post.isLiked ? 'text-red-500' : 'text-gray-700 dark:text-gray-300 group-hover:text-red-500'">
            {{ formatNumber(post.likes) }}
          </span>
        </button>

        <!-- Comment Button -->
        <button 
          @click="toggleComments"
          class="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20': showComments }"
        >
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">{{ formatNumber(post.comments) }}</span>
        </button>

        <!-- Share Button -->
        <button 
          @click="sharePost"
          class="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
        >
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-green-500 transition-colors">{{ formatNumber(post.shares) }}</span>
        </button>
      </div>

      <!-- Save Button -->
      <button 
        @click="toggleSave"
        class="p-2 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200 group"
        :class="{ 'bg-yellow-50 dark:bg-yellow-900/20': isSaved }"
      >
        <svg 
          :class="isSaved ? 'text-yellow-500 scale-110' : 'text-gray-500 dark:text-gray-400 group-hover:text-yellow-500'"
          class="w-5 h-5 transition-all duration-200"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      </button>
    </div>

    <!-- Comments Section -->
    <div v-if="showComments" class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
      <!-- Add Comment Input -->
      <div class="flex items-start space-x-3">
        <img :src="currentUserAvatar" class="w-9 h-9 rounded-full ring-2 ring-gray-100 dark:ring-gray-700" alt="Your avatar">
        <div class="flex-1">
          <div class="relative">
            <textarea
              v-model="newComment"
              placeholder="Write a comment..."
              class="w-full resize-none border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows="2"
              @keydown.meta.enter="addComment"
              @keydown.ctrl.enter="addComment"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-gray-400">Press Cmd+Enter to post</span>
              <button
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-4">
        <div v-for="comment in postComments" :key="comment.id" class="group">
          <div class="flex items-start space-x-3">
            <img :src="comment.userAvatar" class="w-8 h-8 rounded-full ring-1 ring-gray-200 dark:ring-gray-600" :alt="comment.username">
            <div class="flex-1 min-w-0">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ comment.username }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(comment.date) }}</span>
                </div>
                <p class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'comment', 'share'])

// Instagram-style carousel state
const currentSlide = ref(0)
const showComments = ref(false)
const isSaved = ref(false)
const newComment = ref('')

// Mock current user avatar
const currentUserAvatar = ref('/public/images/me.png')

// Mock comments data
const postComments = ref([
  {
    id: 1,
    username: 'John Doe',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Great post! Really enjoyed reading this.',
    date: '2h ago'
  },
  {
    id: 2,
    username: 'Alice Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Thanks for sharing this insight.',
    date: '3h ago'
  }
])

// Instagram-style carousel methods
const nextSlide = () => {
  if (currentSlide.value < props.post.media.length - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Methods
const formatDate = (date) => {
  if (typeof date === 'string') {
    return date;
  }
  
  if (date instanceof Date && !isNaN(date)) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }
  
  return 'recently';
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  return (num / 1000000).toFixed(1) + 'M'
}

const toggleComments = () => {
  showComments.value = !showComments.value
  emit('comment', props.post.id)
}

const toggleSave = () => {
  isSaved.value = !isSaved.value
  // Emit save event or handle save logic
}

const sharePost = () => {
  emit('share', props.post.id)
  // Copy link to clipboard or open share dialog
  if (navigator.share) {
    navigator.share({
      title: `Post by ${props.post.username}`,
      text: props.post.text || props.post.content,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    console.log('Link copied to clipboard')
  }
}

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: Date.now(),
      username: 'Current User',
      userAvatar: currentUserAvatar.value,
      content: newComment.value,
      date: 'just now'
    }
    postComments.value.unshift(comment)
    newComment.value = ''
    // Update post comments count
    props.post.comments = (props.post.comments || 0) + 1
  }
}

const searchByTag = (tag) => {
  console.log('Searching for tag:', tag)
}
</script>

<style scoped>
/* Enhanced animations */
@keyframes heartbeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes bounce-in {
  0% { transform: scale(0.3) rotate(-12deg); opacity: 0; }
  50% { transform: scale(1.05) rotate(0deg); }
  70% { transform: scale(0.9) rotate(0deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.group:hover .fa-heart,
.group:hover svg[data-heart] {
  animation: heartbeat 0.6s ease-in-out;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom focus styles */
button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Better text rendering */
p, span, div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Instagram-style carousel transitions */
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.3s ease-out;
}

.carousel-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Dot indicator animations */
@keyframes dotPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.dot-active {
  animation: dotPulse 0.3s ease-out;
}
</style>