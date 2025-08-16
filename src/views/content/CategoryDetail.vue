<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Category Header -->
    <div class="relative mb-8">
      <!-- Cover Image -->
      <div class="h-64 w-full rounded-xl overflow-hidden">
        <img 
          :src="getCategoryImage(categoryName)" 
          :alt="categoryName" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Category Info -->
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center mb-2">
          <div class="px-3 py-1 rounded-full text-sm font-medium mr-3 flex items-center gap-2" :class="categoriesStore.getCategoryColor(categoryName)">
            <span>{{ $t('content.category.label') }}</span>
          </div>
          <div class="flex items-center text-sm">
            <span>{{ categoryStats.communities }} {{ $t('content.category.communities') }}</span>
            <span class="mx-2">•</span>
            <span>{{ categoryStats.members }} {{ $t('content.category.members') }}</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">
          <i class="mr-3"></i>{{ formattedCategoryName }}
        </h1>
        <p class="text-white/90 max-w-xl">{{ categoryDescription }}</p>
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
    <div v-if="activeTab === 'communities'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="communities && communities.length > 0">
        <CommunityCard
          v-for="community in communities"
          :key="community.id"
          :community="community"
          :button-text="$t('common.join')"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.category.empty.fandoms') }}
      </div>
    </div>

    <div v-else-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        {{ $t('content.category.empty.posts') }}
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
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.category.empty.news') }}
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
      <div class="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('common.contentComingSoon') }}</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ $t('common.sectionUnderDevelopment') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Post from '@/components/common/Post.vue'
import NewsPost from '@/components/common/NewsPost.vue'
import CommunityCard from '@/components/community/CommunityCard.vue'
import { getCategoryImage } from '@/config/media'
import { useFandomsStore } from '@/store/fandoms'
import { usePostsStore } from '@/store/posts'
import { useNewsStore } from '@/store/news'
import { useCategoriesStore } from '@/store/categories'

const route = useRoute()
const { t } = useI18n()
const categoriesStore = useCategoriesStore()
const categoryName = computed(() => route.params.category || '')
const activeTab = ref('communities')

// Initialize stores
const communitiesStore = useFandomsStore()
const postsStore = usePostsStore()
const newsStore = useNewsStore()

// Format category name (capitalize)
const formattedCategoryName = computed(() => {
  return categoryName.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Category description using store-backed getter
const categoryDescription = computed(() => {
  return categoriesStore.getCategoryDescription(categoryName.value, formattedCategoryName.value)
})

// Category statistics using store-backed getter
const categoryStats = computed(() => categoriesStore.getCategoryStats(categoryName.value))

// Tabs data - update counts from stores
const tabs = computed(() => [
  { 
    id: 'communities', 
    label: t('content.category.tabs.fandoms'), 
    count: communitiesStore.getCommunitiesCountByCategory(categoryName.value).toString() 
  },
  { 
    id: 'posts', 
    label: t('content.category.tabs.posts'), 
    count: postsStore.getPostsByCategory(categoryName.value).length.toString() 
  },
  { 
    id: 'news', 
    label: t('content.category.tabs.news'), 
    count: newsStore.getNewsByCategory(categoryName.value).length.toString() 
  }
])

// Get data from stores
const communities = computed(() => communitiesStore.getCommunitiesByCategory(categoryName.value))
const posts = computed(() => postsStore.getPostsByCategory(categoryName.value))
const newsData = computed(() => {
  const categoryNews = newsStore.getNewsByCategory(categoryName.value)
  if (categoryNews.length > 0) {
    return categoryNews
  }
  // Use default news generator for categories without specific data
  const defaultNews = newsStore.getDefaultNewsForCategory(categoryName.value, formattedCategoryName.value)
  return defaultNews
})

// Methods to handle post interactions
function likePost(postId) {
  postsStore.likePost(postId, 'currentUser')
}

function commentPost(postId) {
  // TODO: Open comment modal or navigate
}

function sharePost(postId) {
  postsStore.sharePost(postId)
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
