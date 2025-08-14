<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 overflow-hidden">
    <div class="flex flex-col lg:flex-row min-h-screen gap-4 lg:gap-6 overflow-hidden">
      <!-- Main Content -->
      <div class="flex-1 max-w-full lg:max-w-2xl xl:max-w-none flex flex-col overflow-hidden">
        <!-- Create Post Section -->
        <div class="bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 shadow-lg lg:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200">
          <div class="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
            <img src="/public/images/me.png" class="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full ring-2 ring-blue-200 dark:ring-blue-700 object-cover shadow" :alt="currentUser.username">
            <div class="flex-1 min-w-0">
              <textarea
                v-model="newPostContent"
                placeholder="What's on your mind?"
                class="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base lg:text-lg font-medium"
                rows="2"
                @input="autoResize"
              ></textarea>
              <!-- Tags Input -->
              <div class="mt-2">
                <div class="flex flex-wrap gap-1 sm:gap-2 mb-2" v-if="Array.isArray(tags) && tags.length">
                  <span
                    v-for="(tag, idx) in tags"
                    :key="idx"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-sm"
                  >
                    #{{ tag }}
                    <button type="button" class="ml-1 text-white/80 hover:text-red-200 transition-colors" @click="removeTag(idx)">
                      &times;
                    </button>
                  </span>
                </div>
                <input
                  v-model="tagInput"
                  @keydown.enter.prevent="addTag"
                  @keydown.tab.prevent="addTag"
                  type="text"
                  class="w-full px-2 sm:px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white text-xs sm:text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Add tags (press Enter or Tab)..."
                />
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 gap-3 sm:gap-0">
                <div class="flex items-center space-x-3 sm:space-x-4 overflow-x-auto">
                  <!-- Image Upload -->
                  <label class="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all touch-button flex-shrink-0">
                    <i class="fas fa-image text-sm"></i>
                    <span class="hidden sm:inline text-xs">Image</span>
                    <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
                  </label>
                  <!-- Video Upload -->
                  <label class="flex items-center gap-1 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all touch-button flex-shrink-0">
                    <i class="fas fa-video text-sm"></i>
                    <span class="hidden sm:inline text-xs">Video</span>
                    <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
                  </label>
                </div>
                <button
                  @click="createPost"
                  :disabled="!newPostContent.trim() && postMedia.length === 0"
                  class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm touch-button w-full sm:w-auto"
                >
                  Post
                </button>
              </div>
              <!-- Preview selected media -->
              <div v-if="Array.isArray(postMedia) && postMedia.length > 0" class="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div v-for="(media, index) in postMedia" :key="index" class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <img v-if="media.type === 'image'" :src="media.url" class="max-h-24 sm:max-h-32 lg:max-h-48 rounded-lg mb-2 w-full object-cover" />
                  <video v-else-if="media.type === 'video'" :src="media.url" controls class="max-h-24 sm:max-h-32 lg:max-h-48 rounded-lg mb-2 w-full object-cover"></video>
                  <button @click="removeMedia(index)" class="absolute top-1 right-1 text-xs text-white bg-red-500 rounded-full px-1.5 py-0.5 hover:bg-red-700 shadow touch-button">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- News Section (Horizontal Scroll ONLY) -->
        <div class="py-2 border-b border-gray-200 dark:border-gray-800 mb-3 sm:mb-4 overflow-hidden">
          <div class="flex justify-between items-center mb-2 sm:mb-3">
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">News Today</h2>
            <router-link to="/news" class="text-blue-500 text-xs sm:text-sm hover:text-blue-600 transition-colors touch-button">Show more</router-link>
          </div>
          <!-- Natural height container for news scrolling -->
          <div class="overflow-hidden">
            <div class="overflow-x-auto overflow-y-hidden scrollbar-hide pb-3 sm:pb-4 -mx-3 sm:-mx-4 px-3 sm:px-4">
              <div class="flex gap-2 sm:gap-3 lg:gap-4" style="width: max-content;">
                <NewsPost 
                  v-for="news in newsItems" 
                  :key="news.id" 
                  :article="news" 
                  class="w-64 sm:w-72 lg:w-80 flex-shrink-0"
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
                <span class="text-xs sm:text-sm lg:text-base font-medium">Timeline</span>
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
                <span class="text-xs sm:text-sm lg:text-base font-medium">Trending</span>
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
                <span class="text-xs sm:text-sm lg:text-base font-medium">Following</span>
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
                <span>{{ loadingMore ? 'Loading...' : 'Load More Posts' }}</span>
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
              <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
              <p class="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto leading-relaxed">Follow some fandoms to see posts in your timeline!</p>
              <router-link 
                to="/communities/browse"
                class="inline-flex items-center space-x-2 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-button text-sm sm:text-base lg:text-lg"
              >
                <i class="fas fa-search text-xs sm:text-sm"></i>
                <span>Explore Communities</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- End Main Content -->

      <!-- Right Sidebar - Fixed -->
      <div class="w-80 flex-shrink-0 space-y-4 hidden lg:block overflow-hidden">
        <!-- Trending Communities -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Communities</h3>
          <div class="space-y-3">
            <div
              v-for="community in trendingCommunities"
              :key="community.id"
              class="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
              @click="$router.push(`/fandom/${community.handle || community.name.replace(/\s+/g, '-').toLowerCase()}`)"
            >
              <img :src="community.avatar" class="w-10 h-10 rounded-full" :alt="community.name">
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 dark:text-white truncate">{{ community.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ community.members }} members</p>
              </div>
              <button
                class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600"
                @click.stop="joinCommunity(community.id)"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Hashtags -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Hashtags</h3>
          <div class="space-y-2">
            <div
              v-for="(tag, index) in trendingHashtags"
              :key="index"
              class="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
              @click="$router.push(`/hashtag/${tag.name}`)"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">#{{ tag.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ tag.posts }} posts</p>
              </div>
              <span class="text-xs text-green-500 font-medium">{{ tag.growth }}% ↗</span>
            </div>
          </div>
        </div>

      </div>
      <!-- End Right Sidebar -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { usePostsStore } from '@/store/posts'
import { useNewsStore } from '@/store/news'
import { useTrendsStore } from '@/store/trends'
import Post from '@/components/common/Post.vue'
import NewsPost from '@/components/common/NewsPost.vue'

const authStore = useAuthStore()
const postsStore = usePostsStore()
const newsStore = useNewsStore()
const trendsStore = useTrendsStore()


const currentUser = computed(() => authStore.user || { username: '', avatar: '' })

const postMedia = ref([])
const tags = ref([])
const tagInput = ref('')
const newPostContent = ref('')

// Use trendingCommunities and trendingHashtags from the store if available
const trendingCommunities = computed(() => trendsStore.trendingCommunities || [])
const trendingHashtags = computed(() => trendsStore.trendingHashtags || [])

const newsItems = computed(() => newsStore.newsItems)

function likeNews(news) {
  news.isLiked = !news.isLiked;
}

const filteredPosts = computed(() => postsStore.filteredPosts)
const activeFeed = computed(() => postsStore.activeFeed)
const loadingMore = computed(() => postsStore.loadingMore)
const hasMorePosts = computed(() => postsStore.hasMorePosts)

const createPost = () => {
  if (newPostContent.value.trim() || postMedia.value.length > 0) {
    const newPost = {
      username: currentUser.value.username,
      avatar: currentUser.value.avatar,
      text: newPostContent.value,
      media: postMedia.value.map(m => ({ type: m.type, url: m.url }))
    }
    postsStore.addPost(newPost)
    newPostContent.value = ''
    postMedia.value = []
    tags.value = []
  }
}

const likePost = (postId) => {
  postsStore.likePost(postId)
}

const openComments = (postId) => {
  console.log('Opening comments for post:', postId)
}

const sharePost = (postId) => {
  postsStore.sharePost(postId)
}

const loadMorePosts = () => {
  postsStore.loadMorePosts()
}

const joinCommunity = (communityId) => {
  console.log('Joining community:', communityId)
}

const followUser = (userId) => {
  console.log('Following user:', userId)
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 60000)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

onMounted(() => {
  console.log('Home component mounted')
})
</script>

<style scoped>
textarea {
  min-height: 60px;
}

textarea:focus {
  outline: none;
}

/* Hide scrollbar for horizontal news scroll */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>