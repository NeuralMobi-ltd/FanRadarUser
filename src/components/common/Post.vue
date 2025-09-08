<template>
  <article class="bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 mb-5 sm:mb-7 shadow-md hover:shadow-xl border border-gray-100/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-[1.01] hover:border-blue-200 dark:hover:border-blue-800/50 group">
    <!-- Post Header -->
    <header class="flex items-start justify-between mb-4 sm:mb-5">
      <div class="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
  <router-link :to="post.userId ? { name: 'Account', params: { user: String(post.userId) } } : { name: 'Account', params: { user: (post.displayName || '').trim() || 'me' } }" class="relative flex-shrink-0 group-avatar">
          <div class="relative">
            <AvatarFallback
              :src="post.avatar || post.userAvatar"
              :alt="post.displayName || post.username"
              :firstName="post.firstName || post.first_name || (post.displayName || post.username || '').split(' ')[0] || 'U'"
              :lastName="post.lastName || post.last_name || (post.displayName || post.username || '').split(' ').slice(1).join(' ') || ''"
              customClass="w-11 h-11 sm:w-14 sm:h-14 ring-3 ring-gray-100 dark:ring-gray-700 hover:ring-blue-400 transition-all duration-300 shadow-sm group-hover/avatar:shadow-md"
            />
          </div>
        </router-link>
        
        <div class="flex-1 min-w-0">
          <!-- Top row: name • time -->
          <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 w-full leading-none mb-1 overflow-hidden">
            <router-link 
              :to="post.userId ? { name: 'Account', params: { user: String(post.userId) } } : { name: 'Account', params: { user: (post.displayName || '').trim() || 'me' } }"
              class="block truncate min-w-0 text-sm sm:text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {{ post.displayName || post.username || 'User' }}
            </router-link>
            <span aria-hidden="true" class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm flex-shrink-0">•</span>
            <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">{{ formatDate(post.date) }}</span>
          </div>

          <!-- Badges row: responsive design for all screens -->
          <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-visible no-scrollbar py-0.5 max-w-full">
            <span
              v-if="post.fandom || post.communityName"
              class="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white dark:bg-blue-500 dark:text-white flex-shrink-0"
            >
              <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/90 dark:bg-white rounded-full mr-1"></span>
              {{ post.fandom || post.communityName }}
            </span>
            <span
              v-if="post.trending"
              class="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-fuchsia-600 flex-shrink-0"
            >
              <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
              </svg>
              Trending
            </span>
          </div>
        </div>
      </div>
      <!-- Post actions menu for owner -->
      <div v-if="canEdit || canDelete" class="relative flex-shrink-0">
  <button @click="showMenu = !showMenu" class="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group-menu">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/menu:text-gray-600 dark:group-hover/menu:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="2"/>
            <circle cx="10" cy="10" r="2"/>
            <circle cx="16" cy="10" r="2"/>
          </svg>
        </button>
        <div v-if="showMenu" class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          <button
            v-if="canEdit"
            type="button"
            @click.prevent.stop="openEditModal"
            class="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Post
          </button>
          <button
            v-if="canDelete"
            type="button"
            @click.prevent.stop="deletePost"
            class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Post
          </button>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <main class="mb-4 sm:mb-5">
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-gray-900 dark:text-white text-sm sm:text-base leading-relaxed whitespace-pre-wrap mb-0">{{ post.text || post.content }}</p>
      </div>
      
      <!-- Legacy Single Image Support -->
      <div v-if="displayImage && !displayMedia" class="mt-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          :src="displayImage" 
          :alt="'Image from ' + (post.displayName || post.username || 'user')"
          loading="lazy"
          class="w-full h-auto object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
      </div>

      <!-- Instagram-style Media Carousel -->
      <div v-if="displayMedia && displayMedia.length > 0" class="mt-4 relative">
        <div class="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square relative">
          <!-- Media Container -->
          <div class="relative w-full h-full overflow-hidden">
            <div 
              class="flex transition-transform duration-300 ease-out h-full"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(media, index) in displayMedia" 
                :key="index"
                class="w-full h-full flex-shrink-0"
              >
                <!-- Image -->
                <img 
                  v-if="media.type === 'image'"
                  :src="media.url" 
                  :alt="'Media ' + (index + 1) + ' from ' + (post.displayName || post.username || 'user')"
                  loading="lazy"
                  class="w-full h-full object-cover select-none"
                  draggable="false"
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
          <div v-if="displayMedia.length > 1">
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
              v-if="currentSlide < displayMedia.length - 1"
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
        <div v-if="displayMedia.length > 1" class="flex justify-center mt-3 space-x-1">
          <button
            v-for="(media, index) in displayMedia"
            :key="index"
            @click="goToSlide(index)"
            class="dot-btn p-0 m-0 border-0 outline-none focus:outline-none focus:ring-0 inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 transition-all duration-200"
            :class="
              currentSlide === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            "
            aria-label="Go to media"
            type="button"
          ></button>
        </div>

        <!-- Media Counter -->
        <div v-if="displayMedia.length > 1" class="absolute top-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded-full backdrop-blur-sm">
          {{ currentSlide + 1 }} / {{ displayMedia.length }}
        </div>
      </div>
      
      <!-- Post Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mt-5">
        <button 
          v-for="tag in post.tags"
          :key="tag"
          class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800 cursor-pointer hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-200 transform hover:scale-105"
          @click="searchByTag(tag)"
        >
          #{{ tag }}
        </button>
      </div>
    </main>

    <!-- Post Actions -->
    <footer class="flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100 dark:border-gray-700">
      <div class="flex items-center space-x-1 sm:space-x-2">
        <!-- Like Button -->
        <button 
          @click="favorite"
          class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group-like"
          :class="{ 'bg-red-50 dark:bg-red-900/20': post.isLiked }"
          :aria-label="post.isLiked ? 'Unlike post' : 'Like post'"
        >
          <div class="relative">
            <svg 
              :class="post.isLiked ? 'text-red-500 scale-110' : 'text-gray-500 dark:text-gray-400 group-like:hover:text-red-500'"
              class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            <div v-if="post.isLiked" class="absolute inset-0 animate-ping">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-500 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <span class="text-sm sm:text-base font-semibold" :class="post.isLiked ? 'text-red-500' : 'text-gray-700 dark:text-gray-300 group-like:hover:text-red-500'">
            {{ formatNumber(post.likes) }}
          </span>
        </button>

        <!-- Comment Button -->
        <button 
          @click="toggleComments"
          class="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group-comment"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20': showComments }"
          :aria-label="showComments ? 'Hide comments' : 'Show comments'"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 group-comment:hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 group-comment:hover:text-blue-500 transition-colors">{{ formatNumber(post.comments) }}</span>
        </button>
      </div>

      <!-- Save Button -->
      <button 
        @click="toggleSave"
  class="p-2 sm:p-2.5 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200 group-save"
        :class="{ 'bg-yellow-50 dark:bg-yellow-900/20': isSaved }"
        :aria-label="isSaved ? 'Unsave post' : 'Save post'"
      >
        <svg 
          :class="isSaved ? 'text-yellow-500 scale-110' : 'text-gray-500 dark:text-gray-400 group-save:hover:text-yellow-500'"
          class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      </button>
    </footer>

    <!-- Comments Section -->
    <section v-if="showComments" class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-5">
      <!-- Add Comment Input -->
      <div class="flex items-start space-x-4">
        <AvatarFallback
          :src="currentUserAvatar"
          alt="Your avatar"
          :firstName="authStore.user?.first_name || (authStore.user?.name || authStore.user?.userName || '').split(' ')[0] || 'U'"
          :lastName="authStore.user?.last_name || (authStore.user?.name || authStore.user?.userName || '').split(' ').slice(1).join(' ') || ''"
          customClass="w-10 h-10 ring-3 ring-gray-100 dark:ring-gray-700 shadow-sm flex-shrink-0"
        />
        <div class="flex-1 comment-group">
          <div class="relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
            <textarea
              ref="commentTextarea"
              v-model="newComment"
              placeholder="Write a thoughtful comment..."
              :maxlength="commentMax"
              @input="autoResize"
              class="w-full resize-none bg-transparent border-0 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 leading-relaxed scrollbar-thin"
              rows="2"
              @keydown.meta.enter.prevent="addComment"
              @keydown.ctrl.enter.prevent="addComment"
              aria-label="Add a comment"
            ></textarea>
            <div class="flex items-center justify-between mt-2 select-none">
              <div class="flex items-center gap-3">
                <span v-if="newComment.length" class="text-[11px] font-medium tracking-wide" :class="charRemaining < 0 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'">
                  {{ charRemaining }}
                </span>
                <transition name="fade">
                  <span v-if="commentError" class="text-[11px] text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">{{ commentError }}</span>
                </transition>
              </div>
              <button
                @click="addComment"
                :disabled="!newComment.trim() || adding || charRemaining < 0"
                class="px-4 h-8 rounded-full bg-blue-600 text-white text-xs font-semibold shadow flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                :aria-busy="adding ? 'true' : 'false'"
              >
                <svg v-if="adding" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
                </svg>
                <span>{{ adding ? 'Posting' : 'Post' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="space-y-1">
        <transition-group name="fade-list" tag="div" class="space-y-4">
            <article v-for="comment in postComments" :key="comment.id" class="group/item">
              <div class="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                <!-- Avatar -->
                <AvatarFallback
                  :src="getCommentAvatar(comment)"
                  :alt="(comment.user?.name || comment.username || 'comment user')"
                  :firstName="comment.firstName || comment.user?.first_name || (comment.user?.name || comment.username || '').split(' ')[0] || 'U'"
                  :lastName="comment.lastName || comment.user?.last_name || (comment.user?.name || comment.username || '').split(' ').slice(1).join(' ') || ''"
                  customClass="w-9 h-9 ring-2 ring-gray-100 dark:ring-gray-700 object-cover flex-shrink-0"
                />
                <!-- Body -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 text-xs sm:text-sm mb-0.5">
                    <span class="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[140px] sm:max-w-[200px]" :class="isOwnComment(comment) ? 'text-blue-600 dark:text-blue-400' : ''">
                      {{ comment.user?.name || comment.username || 'User' }}
                    </span>
                    <span class="text-gray-400 dark:text-gray-500">•</span>
                    <span class="text-gray-500 dark:text-gray-400">{{ formatDate(comment.date || comment.created_at) }}</span>
                    <span v-if="comment._optimistic" class="animate-pulse text-[10px] px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium tracking-wide">
                      sending...
                    </span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">{{ comment.content || comment.text }}</p>
                </div>
              </div>
            </article>
        </transition-group>
      </div>
    </section>

  <!-- Internal edit modal removed; parent (e.g., fandom detail) handles editing -->
  </article>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import { ref, watch, computed, nextTick } from 'vue'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'
import notify from '@/utils/notify'
import PostsService from '@/services/postsService'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  canEdit: {
    type: Boolean,
    default: false
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['like', 'comment', 'delete', 'edit'])

// Instagram-style carousel state
const currentSlide = ref(0)
const showComments = ref(false)
const isSaved = ref(false)
const newComment = ref('')
const showMenu = ref(false)
// Removed local edit modal state; editing delegated to parent component

// Current authenticated user's avatar (fallback to default)
const authStore = useAuthStore()
const currentUserAvatar = computed(() => {
  const u = authStore.user
  const raw = u?.avatar || u?.profile_image || u?.profileImage || u?.profile_image_url || u?.avatarUrl
  if (raw) {
    try { return resolveAsset(raw) } catch (_) { return raw }
  }
  return ''
})

// Comments local reactive list (initialized from post.commentsList if present)
const postComments = ref(props.post.commentsList ? [...props.post.commentsList] : [])
const commentsLoaded = ref(Array.isArray(props.post.commentsList) && props.post.commentsList.length > 0)
const loadingComments = ref(false)
const commentError = ref('')
const commentTextarea = ref(null)
const commentMax = 500
const charRemaining = computed(() => commentMax - newComment.value.length)

// Keep in sync if parent updates post.commentsList
watch(() => props.post.commentsList, (val) => {
  if (Array.isArray(val)) {
    postComments.value = [...val]
  }
})

const postsStore = usePostsStore()

// ---- Asset URL Normalization ----
// Ensure storage assets don't contain /api and have full base URL.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const BASE_ORIGIN = API_BASE.replace(/\/api\/?$/, '') // strip trailing /api
const WINDOW_ORIGIN = typeof window !== 'undefined' ? window.location.origin : ''

function resolveAsset(raw) {
  if (!raw) return raw
  // If already absolute (http/https), just strip any trailing /api segment before /storage
  if (/^https?:/i.test(raw)) {
    return raw.replace('/api/storage/', '/storage/').replace(/\/api(\/storage\/)/, '$1')
  }
  // If it starts with /api/storage or storage paths
  if (raw.startsWith('/api/storage')) {
    return BASE_ORIGIN + raw.replace('/api/storage', '/storage')
  }
  if (raw.startsWith('/storage/')) {
    return BASE_ORIGIN + raw
  }
  // Backend might return relative like storage/profile/xxx.jpg
  if (raw.startsWith('storage/')) {
    return BASE_ORIGIN + '/' + raw
  }
  // posts/images or posts/videos relative paths
  if (raw.startsWith('posts/')) {
    return BASE_ORIGIN + '/storage/' + raw
  }
  // Generic relative path without leading storage (e.g. profile_images/.. or avatars/..)
  if (!raw.startsWith('/')) {
    return BASE_ORIGIN + '/storage/' + raw.replace(/^\/*/, '')
  }
  // If we get here and it's a root-relative path not handled above
  if (raw.startsWith('/')) {
    // Prefer base origin else window origin
    return (BASE_ORIGIN || WINDOW_ORIGIN) + raw
  }
  return raw
}

const displayMedia = computed(() => {
  if (!props.post.media || !Array.isArray(props.post.media)) return null
  return props.post.media.map(m => ({
    ...m,
    url: resolveAsset(m.url || m.path || m.src || m.file_path)
  }))
})

const displayImage = computed(() => {
  return resolveAsset(props.post.image || props.post.cover || props.post.file_path)
})

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
  // Accept ISO string or Date
  const d = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : null
  if (!d || isNaN(d)) return 'recently'
  const now = Date.now()
  const diff = now - d.getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return seconds + 's'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return minutes + 'm'
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours + 'h'
  const days = Math.floor(hours / 24)
  if (days < 7) return days + 'd'
  return d.toLocaleDateString()
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  return (num / 1000000).toFixed(1) + 'M'
}

const toggleComments = async () => {
  showComments.value = !showComments.value
  emit('comment', props.post.id)
  if (showComments.value && !commentsLoaded.value && !loadingComments.value) {
    loadingComments.value = true
    try {
      const backendId = extractBackendId(props.post) || props.post.id
      const { comments, count } = await PostsService.getComments(backendId, { page: 1, per_page: 20 })
      const normalized = (comments || []).map(c => ({
        id: c.id,
        content: c.content || c.text,
        date: c.created_at || c.createdAt,
        user: {
          id: c.user?.id,
          name: c.user?.full_name || [c.user?.first_name, c.user?.last_name].filter(Boolean).join(' ').trim() || c.user?.username,
          avatar: c.user?.profile_image || c.user?.avatar || c.user?.profile_image_url
        }
      }))
      postComments.value = normalized
      if (typeof count === 'number') props.post.comments = count
      commentsLoaded.value = true
    } catch (e) {
      notify.error(e?.message || 'Failed to load comments')
    } finally {
      loadingComments.value = false
    }
  }
}

const toggleSave = () => {
  // Optimistic toggle with API call
  if (adding.value) return
  const target = props.post.id
  const currentlySaved = isSaved.value || props.post.isSaved
  isSaved.value = !currentlySaved
  props.post.isSaved = isSaved.value
  if (!currentlySaved) {
    postsStore.savePostApi(target).then(res => {
      if (res?.success === false) {
        isSaved.value = currentlySaved
        props.post.isSaved = currentlySaved
        notify.error(res.error || 'Failed to save')
      } else {
        notify.success(res?.message || 'Saved')
      }
    }).catch(err => {
      isSaved.value = currentlySaved
      props.post.isSaved = currentlySaved
      notify.error(err?.message || 'Failed to save')
    })
  } else {
    postsStore.unsavePostApi(target).then(res => {
      if (res?.success === false) {
        isSaved.value = currentlySaved
        props.post.isSaved = currentlySaved
        notify.error(res.error || 'Failed to unsave')
      } else {
        notify.info(res?.message || 'Removed from saved')
      }
    }).catch(err => {
      isSaved.value = currentlySaved
      props.post.isSaved = currentlySaved
      notify.error(err?.message || 'Failed to unsave')
    })
  }
}


const adding = ref(false)
function autoResize(e) {
  const el = e?.target || commentTextarea.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 280) + 'px'
}
const addComment = async () => {
  commentError.value = ''
  if (!newComment.value.trim() || adding.value) return
  const content = newComment.value.trim()
  adding.value = true
  const optimistic = {
    id: Date.now(),
    username: authStore.userName || 'You',
    userAvatar: currentUserAvatar.value,
    content,
    date: new Date().toISOString(),
    _optimistic: true
  }
  postComments.value.unshift(optimistic)
  newComment.value = ''
  await nextTick(() => autoResize())
  try {
    const res = await postsStore.addCommentApi(props.post.id, { content })
    const saved = res?.comment || res?.data?.comment
    if (saved) {
      const idx = postComments.value.findIndex(c => c.id === optimistic.id)
      if (idx !== -1) {
        postComments.value[idx] = {
          id: saved.id || optimistic.id,
          username: saved.user?.username || saved.user?.name || optimistic.username,
          userAvatar: saved.user?.avatar || saved.user?.profile_image_url || optimistic.userAvatar,
          content: saved.content || saved.text || content,
          date: saved.created_at || saved.createdAt || new Date().toISOString()
        }
      }
    } else if (res?.success === false) {
      throw new Error(res.error || 'Failed to save comment')
    }
  } catch (e) {
    postComments.value = postComments.value.filter(c => c.id !== optimistic.id)
    commentError.value = e?.message || 'Failed to post comment'
  } finally {
    adding.value = false
  }
}

// Helpers for comment avatars / ownership
function isOwnComment(comment) {
  if (!comment) return false
  // Prefer numeric ID comparison when available
  const currentId = authStore.user?.id
  const commentUserId = comment.user_id || comment.userId || comment.user?.id || comment.user?.user_id
  if (currentId && commentUserId && Number(currentId) === Number(commentUserId)) return true
  // Fallback to username comparison (case-insensitive)
  const current = authStore.userName || authStore.user?.userName || authStore.user?.username
  const cName = comment.username || comment.userName || comment.user?.username || comment.user?.userName
  return current && cName && current.toLowerCase() === cName.toLowerCase()
}

function getCommentAvatar(comment) {
  if (!comment) return currentUserAvatar.value
  if (isOwnComment(comment)) return currentUserAvatar.value
  const raw = comment.userAvatar || comment.avatar || comment.user?.avatar || comment.user?.profile_image_url || comment.user?.profile_image
  if (raw) return resolveAsset(raw)
  return currentUserAvatar.value
}

const searchByTag = (tag) => {
  console.log('Searching for tag:', tag)
}

function openEditModal() {
  showMenu.value = false
  const backendId = extractBackendId(props.post) || props.post.id
  emit('edit', backendId)
}


function extractBackendId(p) {
  if (!p) return null
  if (p.originalId && /^\d+$/.test(String(p.originalId))) return Number(p.originalId)
  if (typeof p.id === 'number') return p.id
  if (typeof p.id === 'string') {
    const tail = p.id.split('-').pop()
    if (/^\d+$/.test(tail)) return Number(tail)
  }
  return null
}

function deletePost() {
  // Only emit; parent handles confirmation + API.
  showMenu.value = false
  const backendId = extractBackendId(props.post)
  emit('delete', backendId || props.post.id)
}

function favorite() {
  const backendId = extractBackendId(props.post)
  postsStore.favoritePostApi(backendId || props.post.id)
  emit('like', props.post.id)
}



// submitEdit removed (handled in parent modal)
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

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
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

/* Enhanced focus styles */
button:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  transform: scale(1.02);
}

/* Better text rendering */
p, span, div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #d1d5db, #9ca3af);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #9ca3af, #6b7280);
}

.dark ::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #4b5563, #374151);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #6b7280, #4b5563);
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

/* Enhanced dot indicator animations */
@keyframes dotPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.dot-active {
  animation: dotPulse 0.3s ease-out;
}

.dot-btn { 
  appearance: none; 
  -webkit-appearance: none; 
  -webkit-tap-highlight-color: transparent;
  outline: none;
  min-width: 0 !important;
  min-height: 0 !important;
  line-height: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dot-btn:focus,
.dot-btn:active {
  outline: none !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
}

/* No scrollbar style for overflow-x-auto */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Enhanced fade transitions */
.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
}
.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

/* Enhanced list transitions with stagger */
.fade-list-enter-active { 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
}
.fade-list-leave-active { 
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
  position: absolute; 
}
.fade-list-enter-from { 
  opacity: 0; 
  transform: translateY(12px) scale(0.95); 
}
.fade-list-leave-to { 
  opacity: 0; 
  transform: translateY(-8px) scale(0.95); 
}

/* Thin scrollbar for comment textarea */
.scrollbar-thin::-webkit-scrollbar { 
  height: 6px; 
  width: 6px; 
}
.scrollbar-thin::-webkit-scrollbar-track { 
  background: transparent; 
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb { 
  background: linear-gradient(45deg, #cbd5e1, #94a3b8); 
  border-radius: 3px; 
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #94a3b8, #64748b);
}
.dark .scrollbar-thin::-webkit-scrollbar-thumb { 
  background: linear-gradient(45deg, #475569, #334155); 
}
.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #64748b, #475569);
}

/* Prose styling for content */
.prose {
  color: inherit;
}

.prose p {
  margin: 0;
}

/* Enhanced hover effects */
.group-like:hover svg {
  animation: heartbeat 0.6s ease-in-out;
}

.group-comment:hover svg {
  animation: bounce-in 0.4s ease-out;
}

.group-save:hover svg {
  animation: pulse-ring 0.6s ease-out;
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .dot-btn { 
    min-width: 0 !important; 
    min-height: 0 !important; 
  }
  
  /* Adjust spacing for mobile */
  article {
    margin-bottom: 1rem;
  }
  
  /* Optimize touch targets */
  button {
    min-height: 44px;
    min-width: 44px;
  }
  
  .dot-btn {
    min-height: 24px;
    min-width: 24px;
  }
}

/* Dark mode enhancements */
.dark article {
  backdrop-filter: blur(10px);
  background: rgba(31, 41, 55, 0.95);
}

/* Loading state improvements */
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.loading-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
</style>