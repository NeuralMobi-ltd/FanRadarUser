<template>
  <div class="flex min-h-screen pt-4">
    <!-- Main Content -->
    <div class="flex-1 px-4 sm:px-6">
      <!-- Create Post Section -->
      <div class="bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-6 mb-6 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200">
        <div class="flex items-start space-x-4">
          <img src="/public/images/me.png" class="w-12 h-12 rounded-full ring-2 ring-blue-200 dark:ring-blue-700 object-cover shadow" :alt="currentUser.username">
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="What's on your mind?"
              class="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium"
              rows="3"
            ></textarea>
            <!-- Tags Input -->
            <div class="mt-2">
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="(tag, idx) in tags"
                  :key="idx"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow"
                >
                  #{{ tag }}
                  <button type="button" class="ml-1 text-white/80 hover:text-red-200" @click="removeTag(idx)">
                    &times;
                  </button>
                </span>
              </div>
              <input
                v-model="tagInput"
                @keydown.enter.prevent="addTag"
                @keydown.tab.prevent="addTag"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white text-xs placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
                placeholder="Add tags (press Enter or Tab)..."
              />
            </div>
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-4">
                <!-- Image Upload -->
                <label class="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
                  <i class="fas fa-image"></i>
                  <span class="hidden sm:inline text-xs">Image</span>
                  <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
                </label>
                <!-- Video Upload -->
                <label class="flex items-center gap-1 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all">
                  <i class="fas fa-video"></i>
                  <span class="hidden sm:inline text-xs">Video</span>
                  <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
                </label>
              </div>
              <button
                @click="createPost"
                :disabled="!newPostContent.trim() && postMedia.length === 0"
                class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Post
              </button>
            </div>
            <!-- Preview selected media -->
            <div v-if="postMedia.length > 0" class="mt-4 grid grid-cols-2 gap-3">
              <div v-for="(media, index) in postMedia" :key="index" class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
                <img v-if="media.type === 'image'" :src="media.url" class="max-h-48 rounded-lg mb-2 w-full object-cover" />
                <video v-else-if="media.type === 'video'" :src="media.url" controls class="max-h-48 rounded-lg mb-2 w-full object-cover"></video>
                <button @click="removeMedia(index)" class="absolute top-2 right-2 text-xs text-white bg-red-500 rounded-full px-2 py-1 hover:bg-red-700 shadow">Remove</button>
              </div>
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
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
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

      <!-- Recommended Users -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Who to Follow</h3>
        <div class="space-y-3">
          <div
            v-for="user in recommendedUsers"
            :key="user.id"
            class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg"
            @click="$router.push(`/account/${user.username}`)"
          >
            <img :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.username">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">@{{ user.username }}</p>
            </div>
            <button
              class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600"
              @click.stop="followUser(user.id)"
            >
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
const postMedia = ref([])
const tagInput = ref('')
const tags = ref([])

function onFileChange(type, event) {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      postMedia.value.push({
        type,
        url: e.target.result,
        file
      })
    }
    reader.readAsDataURL(file)
  })
}

function removeMedia(index) {
  postMedia.value.splice(index, 1)
}

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
  }
  tagInput.value = ''
}

function removeTag(index) {
  tags.value.splice(index, 1)
}

const currentUser = computed(() => authStore.user || {
  username: 'yasdhekokuri',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const trendingCommunities = computed(() => trendsStore.trendingCommunities)
const trendingHashtags = computed(() => trendsStore.trendingHashtags)
const recommendedUsers = computed(() => trendsStore.recommendedUsers)
const newsItems = computed(() => newsStore.recentNews)
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