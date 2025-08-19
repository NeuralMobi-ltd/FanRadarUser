<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 overflow-hidden pt-4">
    <div class="flex flex-col lg:flex-row min-h-screen gap-4 lg:gap-6 overflow-hidden">
      <!-- Main Content -->
      <div class="flex-1 max-w-full lg:max-w-2xl xl:max-w-none flex flex-col overflow-hidden">
        <!-- Create Post Section -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200">
          <!-- User Avatar and Text Input -->
          <div class="flex items-start space-x-3 sm:space-x-4">
            <img 
              src="/public/images/me.png" 
              class="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0" 
              :alt="currentUser.username"
            >
            <div class="flex-1 min-w-0">
              <textarea
                v-model="newPostContent"
                :placeholder="$t('common.whatsOnYourMind')"
                class="w-full resize-none border-none outline-none bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium min-h-[3rem] focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors"
                rows="1"
                @input="autoResize"
                @focus="$event.target.style.minHeight = '5rem'"
                @blur="$event.target.style.minHeight = '3rem'"
              ></textarea>
            </div>
          </div>

          <!-- Tags Section -->
          <div v-if="tags.length || tagInput" class="mt-4 pl-13 sm:pl-16">
            <div class="flex flex-wrap gap-2 mb-3" v-if="Array.isArray(tags) && tags.length">
              <span
                v-for="(tag, idx) in tags"
                :key="idx"
                class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
              >
                #{{ tag }}
                <button 
                  type="button" 
                  class="ml-2 text-blue-600 dark:text-blue-400 hover:text-red-500 transition-colors w-4 h-4 flex items-center justify-center" 
                  @click="removeTag(idx)"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </span>
            </div>
            <input
              v-model="tagInput"
              @keydown.enter.prevent="addTag"
              @keydown.tab.prevent="addTag"
              type="text"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('common.addTagsPlaceholder')"
            />
          </div>

          <!-- Media Preview -->
          <div v-if="Array.isArray(postMedia) && postMedia.length > 0" class="mt-4 pl-13 sm:pl-16">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div 
                v-for="(media, index) in postMedia" 
                :key="index" 
                class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square"
              >
                <img 
                  v-if="media.type === 'image'" 
                  :src="media.url" 
                  class="w-full h-full object-cover" 
                />
                <video 
                  v-else-if="media.type === 'video'" 
                  :src="media.url" 
                  class="w-full h-full object-cover"
                  muted
                ></video>
                <button 
                  @click="removeMedia(index)" 
                  class="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-1">
              <!-- Image Upload -->
              <label class="flex items-center justify-center w-10 h-10 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all touch-target">
                <i class="fas fa-image text-lg"></i>
                <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
              </label>
              
              <!-- Video Upload -->
              <label class="flex items-center justify-center w-10 h-10 rounded-xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all touch-target">
                <i class="fas fa-video text-lg"></i>
                <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
              </label>
              
              <!-- Add Tags Button -->
              <button 
                @click="() => { if (!tagInput && tags.length === 0) tagInput = ' ' }"
                class="flex items-center justify-center w-10 h-10 rounded-xl text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all touch-target"
              >
                <i class="fas fa-hashtag text-lg"></i>
              </button>
            </div>

            <!-- Post Button -->
            <button
              @click="createPost"
              :disabled="!newPostContent.trim() && postMedia.length === 0"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm disabled:cursor-not-allowed transition-all text-sm touch-target min-w-[5rem]"
            >
              {{ $t('common.post') }}
            </button>
          </div>
        </div>

        <!-- News Section (Horizontal Scroll ONLY) -->
        <div class="py-2 border-b border-gray-200 dark:border-gray-800 mb-3 sm:mb-4 overflow-hidden">
          <div class="flex justify-between items-center mb-2 sm:mb-3">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('content.home.newsToday') }}</h2>
            <router-link to="/news" class="text-blue-500 text-xs sm:text-sm hover:text-blue-600 transition-colors touch-button">{{ $t('common.showMore') }}</router-link>
          </div>
          <!-- Natural height container for news scrolling -->
          <div class="overflow-hidden ">
            <div class="overflow-x-auto overflow-y-hidden scrollbar-hide mask-edges-x snap-x snap-mandatory pb-3 sm:pb-4 -mx-3 sm:-mx-4 px-3 sm:px-4">
              <div class="flex gap-2 sm:gap-3 lg:gap-4" style="width: max-content;">
                <NewsPost 
                  v-for="news in newsItems" 
                  :key="news.id" 
                  :article="news" 
                  class="flex-shrink-0 snap-start"
                  :cardWidth="'25rem'"
                  :cardHeight="'11.5rem'"
                  @click:like="likeNews(news)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Modern Feed Toggle with Sliding Indicator -->
        <div class="relative bg-gray-100 dark:bg-gray-800 rounded-xl lg:rounded-2xl p-1 mb-4 sm:mb-6 overflow-hidden shadow-inner mx-1 sm:mx-0">
          <!-- Sliding background indicator -->
          <div 
            class="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl transition-all duration-300 ease-out shadow-lg"
            :style="{
              width: `${100/3}%`,
              left: activeFeed === 'timeline' ? '0%' : activeFeed === 'trending' ? `${100/3}%` : `${200/3}%`
            }"
          ></div>
          
          <!-- Feed buttons -->
          <div class="relative flex">
            <button
              @click="postsStore.setActiveFeed('timeline')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'timeline' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-home text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.timeline') }}</span>
              </div>
            </button>
            
            <button
              @click="postsStore.setActiveFeed('trending')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'trending' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-fire text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.trending') }}</span>
              </div>
            </button>
            
            <button
              @click="postsStore.setActiveFeed('following')"
              class="flex-1 relative z-10 px-2 sm:px-4 py-2.5 sm:py-3 text-center font-semibold rounded-lg lg:rounded-xl transition-all duration-300 touch-button"
              :class="activeFeed === 'following' ? 
                'text-white transform scale-105' : 
                'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-102'"
            >
              <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                <i class="fas fa-user-friends text-xs sm:text-sm"></i>
                <span class="text-xs sm:text-sm lg:text-base font-medium">{{ $t('common.followingFeed') }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Posts Section -->
        <div class="space-y-3 sm:space-y-4 lg:space-y-6">
          <Post 
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            class="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200"
            @like="likePost"
            @comment="openComments"
            @share="sharePost"
          />
          
          <!-- Load More Button -->
          <div class="flex justify-center pt-3 sm:pt-4 lg:pt-6" v-if="hasMorePosts">
            <button
              @click="loadMorePosts"
              :disabled="loadingMore"
              class="px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-button text-sm sm:text-base lg:text-lg"
            >
              <span class="flex items-center space-x-2">
                <i v-if="loadingMore" class="fas fa-spinner fa-spin text-xs sm:text-sm"></i>
                <span>{{ loadingMore ? $t('common.loading') : $t('common.loadMorePosts') }}</span>
                <i v-if="!loadingMore" class="fas fa-chevron-down text-xs sm:text-sm"></i>
              </span>
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="filteredPosts.length === 0" class="text-center py-8 sm:py-12 lg:py-16">
            <div class="text-gray-500 dark:text-gray-400 space-y-3 sm:space-y-4">
              <div class="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
                <i class="fas fa-comments"></i>
              </div>
              <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">{{ $t('common.noPostsYet') }}</h3>
              <p class="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto leading-relaxed">{{ $t('common.followSomeFandoms') }}</p>
              <router-link 
                to="/fandoms/browse"
                class="inline-flex items-center space-x-2 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-button"
              >
                <span>{{ $t('common.exploreFandoms') }}</span>
                <i class="fas fa-arrow-right text-xs sm:text-sm"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Sidebar: Trending Fandoms & Hashtags -->
      <div class="hidden lg:block w-full lg:w-80 xl:w-96 flex-shrink-0">
        <div class="sticky space-y-4">
          <!-- Trending Fandoms -->
          <div class="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-800 dark:via-dark-800 dark:to-dark-900 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('common.trendingFandoms') }}</h3>
            <ul class="space-y-4">
              <li v-for="community in trendingCommunities" :key="community.id" class="flex items-center justify-between">
                <div 
                  class="flex items-center gap-3 cursor-pointer flex-1 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg p-2 -m-2 transition-colors"
                  @click="goToFandom(community)"
                >
                  <img :src="community.avatar" :alt="community.name" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-700" />
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ community.name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ community.members }} {{ $t('common.members') }}</p>
                  </div>
                </div>
                <button @click.stop="joinCommunity(community.id)" class="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow">
                  {{ $t('common.join') }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Trending Hashtags -->
          <div class="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-800 dark:via-dark-800 dark:to-dark-900 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('common.trendingHashtags') }}</h3>
            <ul class="space-y-3">
              <li v-for="tag in trendingHashtags" :key="tag.name"
                  @click="goToHashtag(tag.name)"
                  class="flex items-center justify-between cursor-pointer hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-xl p-2 transition">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">#{{ tag.name }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{{ $t('common.postsCount', { count: tag.posts }) }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span :class="tag.growth >= 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">{{ Math.abs(tag.growth) }}%</span>
                  <i class="fas fa-arrow-up-right-from-square text-xs text-gray-400"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NewsPost from '@/components/common/NewsPost.vue'
import Post from '@/components/common/Post.vue'
import { useAuthStore } from '@/store/auth'
import { useNewsStore } from '@/store/news'
import { usePostsStore } from '@/store/posts'
import { useTrendsStore } from '@/store/trends'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Stores
const postsStore = usePostsStore()
const newsStore = useNewsStore()
const authStore = useAuthStore()
const trendsStore = useTrendsStore()

// Expose reactive store state
const { filteredPosts } = storeToRefs(postsStore)
const activeFeed = computed(() => postsStore.activeFeed)
const loadingMore = computed(() => postsStore.loadingMore)
const hasMorePosts = computed(() => postsStore.hasMorePosts)

// Sidebar data
const trendingCommunities = computed(() => trendsStore.trendingCommunities)
const trendingHashtags = computed(() => trendsStore.trendingHashtags)

// Current user for alt text, with username alias
const currentUser = computed(() => {
  const u = authStore.user || {}
  return {
    username: u.userName || 'You',
    ...u
  }
})

// Create post state
const newPostContent = ref('')
const tags = ref([])
const tagInput = ref('')
const postMedia = ref([]) // [{ type: 'image'|'video', url: '...' }]

function autoResize(e) {
  const el = e?.target
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function addTag() {
  const val = tagInput.value.trim().replace(/^#/, '')
  if (!val) return
  if (!tags.value.includes(val)) tags.value.push(val)
  tagInput.value = ''
}

function removeTag(idx) {
  tags.value.splice(idx, 1)
}

function onFileChange(type, event) {
  const files = Array.from(event.target.files || [])
  files.forEach(file => {
    const url = URL.createObjectURL(file)
    const kind = type === 'video' || file.type.startsWith('video') ? 'video' : 'image'
    postMedia.value.push({ type: kind, url, file })
  })
  // reset input to allow re-selecting same file
  event.target.value = ''
}

function removeMedia(index) {
  const m = postMedia.value[index]
  if (m?.url?.startsWith('blob:')) URL.revokeObjectURL(m.url)
  postMedia.value.splice(index, 1)
}

async function createPost() {
  const payload = {
    content: newPostContent.value,
    media: postMedia.value.map(m => ({ type: m.type, url: m.url }))
  }
  // Use store action; backend is mocked when API not ready
  try {
    if (payload.content?.trim() || payload.media.length) {
      await postsStore.createPost(payload)
    }
  } catch (_) {
    // Fallback to local add
    postsStore.addPost({ text: payload.content, media: payload.media })
  }
  newPostContent.value = ''
  tags.value = []
  tagInput.value = ''
  // Revoke blobs
  postMedia.value.forEach(m => { if (m?.url?.startsWith('blob:')) URL.revokeObjectURL(m.url) })
  postMedia.value = []
}

// Post item handlers
function likePost(postId) {
  postsStore.likePost(postId)
}
function openComments(postId) {
  // no-op placeholder for now
  console.debug('openComments', postId)
}
function sharePost(postId) {
  postsStore.sharePost(postId)
}
async function loadMorePosts() {
  await postsStore.loadMorePosts()
}

// News list
const newsItems = computed(() => newsStore.recentNews || newsStore.newsItems)
function likeNews(news) {
  newsStore.toggleLike(news.id)
}

// Sidebar handlers
function joinCommunity(id) {
  trendsStore.joinCommunity(id)
}
function goToHashtag(name) {
  router.push(`/hashtag/${name}`)
}
function goToFandom(community) {
  // Navigate to fandom detail page using the community name or slug
  const fandomName = community.slug || community.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/fandom/${encodeURIComponent(fandomName)}`)
}
</script>

<style scoped>
/* Hide scrollbar (already present) */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Subtle edge fade for horizontal scrollers */
.mask-edges-x {
  -webkit-mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
}

/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
}

/* Smooth textarea resize */
textarea {
  transition: min-height 0.2s ease;
}
</style>