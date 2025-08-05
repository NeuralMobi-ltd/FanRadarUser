<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Hashtag Header -->
    <div class="relative mb-8">
      <!-- Cover Image -->
      <div class="h-64 w-full rounded-xl overflow-hidden">
        <img 
          :src="getHashtagImage(hashtagName)" 
          :alt="hashtagName" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Hashtag Info -->
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center mb-2">
          <div class="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium mr-3 flex items-center gap-2">
            <span>Hashtag</span>
          </div>
          <div class="flex items-center text-sm">
            <span>{{ hashtagStats.posts }} posts</span>
            <span class="mx-2">•</span>
            <span>{{ hashtagStats.growth }}% growth this week</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">#{{ hashtagName }}</h1>
        <p class="text-white/90 max-w-xl">{{ hashtagDescription }}</p>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div class="flex gap-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-4 px-1 font-medium',
            activeTab === tab.id 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          {{ tab.label }}
          <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-if="posts && posts.length > 0">
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="commentPost"
          @share="sharePost"
          class="w-full mb-0"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        No posts found for this hashtag.
      </div>
    </div>

    <div v-else-if="activeTab === 'news'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-if="newsData && newsData.length > 0">
        <NewsPost
          v-for="news in newsData"
          :key="news.id"
          :article="news"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        No news found for this hashtag.
      </div>
    </div>

    <div v-else-if="activeTab === 'related'" class="space-y-6">
      <template v-if="relatedHashtags && relatedHashtags.length > 0">
        <div v-for="tag in relatedHashtags" :key="tag.name" 
             @click="navigateToHashtag(tag.name)"
             class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer p-6">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
              <span class="text-2xl">#</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">#{{ tag.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tag.posts }} posts</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">{{ tag.description }}</p>
        </div>
      </template>
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
        No related hashtags found.
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
      <div class="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Content Coming Soon</h3>
        <p class="text-gray-500 dark:text-gray-400">This section is currently under development.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Post from '@/components/common/Post.vue'
import NewsPost from '@/components/common/NewsPost.vue'
import { 
  getHashtagDescription, 
  getHashtagImage, 
  getHashtagStats 
} from '@/constants/hashtagConstants'
import { useHashtagsStore } from '@/store/hashtags'

const route = useRoute()
const router = useRouter()
const hashtagName = computed(() => route.params.hashtag || '')
const activeTab = ref('posts')

// Initialize store
const hashtagsStore = useHashtagsStore()

// Hashtag description using imported constant
const hashtagDescription = computed(() => {
  return getHashtagDescription(hashtagName.value)
})

// Hashtag statistics using imported constant
const hashtagStats = computed(() => getHashtagStats(hashtagName.value))

// Tabs data - update counts from stores
const tabs = computed(() => [
  { 
    id: 'posts', 
    label: 'Posts', 
    count: posts.value.length.toString() 
  },
  { 
    id: 'news', 
    label: 'News', 
    count: newsData.value.length.toString() 
  },
  { 
    id: 'related', 
    label: 'Related', 
    count: hashtagsStore.getAllRelatedHashtags.length.toString() 
  }
])

// Get data from stores
const posts = computed(() => {
  const hashtagPosts = hashtagsStore.getPostsByHashtag(hashtagName.value)
  if (hashtagPosts.length > 0) {
    return hashtagPosts
  }
  return hashtagsStore.getDefaultPostsForHashtag(hashtagName.value)
})

const newsData = computed(() => {
  const hashtagNews = hashtagsStore.getNewsByHashtag(hashtagName.value)
  if (hashtagNews.length > 0) {
    return hashtagNews
  }
  return hashtagsStore.getDefaultNewsForHashtag(hashtagName.value)
})

const relatedHashtags = computed(() => hashtagsStore.getAllRelatedHashtags)

// Navigate to hashtag
const navigateToHashtag = (tag) => {
  router.push(`/hashtag/${tag}`)
}

// Methods to handle post interactions
function likePost(postId) {
  hashtagsStore.likeHashtagPost(hashtagName.value, postId)
}

function commentPost(postId) {
  console.log('Comment on post:', postId)
}

function sharePost(postId) {
  hashtagsStore.shareHashtagPost(hashtagName.value, postId)
}
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>