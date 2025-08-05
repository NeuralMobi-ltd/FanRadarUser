<template>
  <div class="flex min-h-screen pt-4">
    <!-- Main Content -->
    <div class="flex-1 px-4 sm:px-6">
      <!-- Create Post Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-start space-x-3">
          <img src="/public/images/me.png" class="w-10 h-10 rounded-full" :alt="currentUser.username">
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="What's on your mind?"
              class="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows="3"
            ></textarea>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-4">
                <!-- Image Upload -->
                <label class="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                  <i class="fas fa-image"></i>
                  <input type="file" accept="image/*" class="hidden" @change="onFileChange('image', $event)" />
                </label>
                <!-- Video Upload -->
                <label class="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                  <i class="fas fa-video"></i>
                  <input type="file" accept="video/*" class="hidden" @change="onFileChange('video', $event)" />
                </label>
              </div>
              
              <button
                @click="createPost"
                :disabled="!newPostContent.trim() && !newPostMedia"
                class="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
            <!-- Preview selected media -->
            <div v-if="newPostMedia" class="mt-3">
              <img v-if="newPostMediaType === 'image'" :src="newPostMedia" class="max-h-48 rounded-lg mb-2" />
              <video v-else-if="newPostMediaType === 'video'" :src="newPostMedia" controls class="max-h-48 rounded-lg mb-2"></video>
              <button @click="removeMedia" class="text-xs text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- News Section -->
      <div class="py-2 border-b border-gray-200 dark:border-gray-800 mb-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-bold text-lg dark:text-white">News Today</h2>
          <router-link to="/news" class="text-blue-500 text-sm hover:text-blue-600 transition-colors">Show more</router-link>
        </div>
        
        <!-- News Items -->
        <div class="space-y-4">
          <NewsPost 
            v-for="news in newsItems"
            :key="news.id"
            :article="news"
          />
        </div>
      </div>

      <!-- Feed Toggle -->
      <div class="flex space-x-1 mb-4">
        <button
          @click="postsStore.setActiveFeed('timeline')"
          :class="activeFeed === 'timeline' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Timeline
        </button>
        <button
          @click="postsStore.setActiveFeed('trending')"
          :class="activeFeed === 'trending' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Trending
        </button>
        <button
          @click="postsStore.setActiveFeed('following')"
          :class="activeFeed === 'following' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Following
        </button>
      </div>

      <!-- Posts Section -->
      <div class="space-y-4">
        <Post 
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="openComments"
          @share="sharePost"
        />
        
        <!-- Load More Button -->
        <div class="flex justify-center pt-4" v-if="hasMorePosts">
          <button
            @click="loadMorePosts"
            :disabled="loadingMore"
            class="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <i v-if="loadingMore" class="fas fa-spinner fa-spin mr-2"></i>
            {{ loadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-12">
          <i class="fas fa-comments text-gray-400 text-4xl mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
          <p class="text-gray-500 dark:text-gray-400">Follow some fandoms to see posts in your timeline!</p>
          <router-link 
            to="/communities/browse"
            class="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            Explore Communities
          </router-link>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 flex-shrink-0 p-4 space-y-4 hidden lg:block bg-gray-50 dark:bg-gray-800/50">
      <!-- Trending Communities -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Communities</h3>
        <div class="space-y-3">
          <div v-for="community in trendingCommunities" :key="community.id" class="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <img :src="community.avatar" class="w-10 h-10 rounded-full" :alt="community.name">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ community.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ community.members }} members</p>
            </div>
            <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600" @click="joinCommunity(community.id)">
              Join
            </button>
          </div>
        </div>
      </div>

      <!-- Popular Hashtags -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Hashtags</h3>
        <div class="space-y-2">
          <div v-for="(tag, index) in trendingHashtags" :key="index" class="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">#{{ tag.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tag.posts }} posts</p>
            </div>
            <span class="text-xs text-green-500 font-medium">{{ tag.growth }}% ↗</span>
          </div>
        </div>
      </div>

      <!-- Recommended Users -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Who to Follow</h3>
        <div class="space-y-3">
          <div v-for="user in recommendedUsers" :key="user.id" class="flex items-center space-x-3">
            <img :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.username">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">@{{ user.username }}</p>
            </div>
            <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600" @click="followUser(user.id)">
              Follow
            </button>
          </div>
        </div>
      </div>
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

const newPostContent = ref('')
const newPostMedia = ref(null)
const newPostMediaType = ref(null)

function onFileChange(type, event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    newPostMedia.value = e.target.result
    newPostMediaType.value = type
  }
  reader.readAsDataURL(file)
}

function removeMedia() {
  newPostMedia.value = null
  newPostMediaType.value = null
}

// Use store data instead of local refs
const currentUser = computed(() => authStore.user || {
  username: 'yasdhekokuri',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

// Get data from stores
const trendingCommunities = computed(() => trendsStore.trendingCommunities)
const trendingHashtags = computed(() => trendsStore.trendingHashtags)
const recommendedUsers = computed(() => trendsStore.recommendedUsers)
const newsItems = computed(() => newsStore.recentNews)
const filteredPosts = computed(() => postsStore.filteredPosts)
const activeFeed = computed(() => postsStore.activeFeed)
const loadingMore = computed(() => postsStore.loadingMore)
const hasMorePosts = computed(() => postsStore.hasMorePosts)

const createPost = () => {
  if (newPostContent.value.trim() || newPostMedia.value) {
    const newPost = {
      username: currentUser.value.username,
      avatar: currentUser.value.avatar,
      text: newPostContent.value,
      image: newPostMediaType.value === 'image' ? newPostMedia.value : null,
      video: newPostMediaType.value === 'video' ? newPostMedia.value : null
    }
    postsStore.addPost(newPost)
    newPostContent.value = ''
    removeMedia()
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
  trendsStore.joinCommunity(communityId)
}

const followUser = (userId) => {
  trendsStore.followUser(userId)
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
</style>