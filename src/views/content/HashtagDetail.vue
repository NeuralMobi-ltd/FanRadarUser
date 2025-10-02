<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 pt-3 md:pt-4">
    <!-- Hashtag Header -->
  <div class="relative mb-6 md:mb-8">
      <!-- Cover: deterministic gradient (hashtags have no image) -->
      <div class="h-44 sm:h-56 md:h-64 w-full rounded-xl overflow-hidden relative">
        <div 
          class="w-full h-full"
          :style="coverStyle"
          :aria-label="hashtagName"
          role="img"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Hashtag Info -->
      <div class="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white max-w-[90%]">
        <div class="flex items-center mb-1.5 md:mb-2">
          <div class="px-2.5 py-1 bg-purple-600 rounded-full text-[11px] sm:text-xs font-medium mr-2.5 md:mr-3 flex items-center gap-1.5">
            <span class="leading-none">{{ $t('content.hashtag.label') }}</span>
          </div>
          <div class="flex items-center text-sm">
      
          </div>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 tracking-tight">#{{ hashtagName }}</h1>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-5 md:mb-6">
      <div class="flex gap-5 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none -mx-1 px-1">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-3 md:pb-4 px-0.5 font-medium text-sm sm:text-base whitespace-nowrap',
            activeTab === tab.id 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          {{ tab.label }}
          <span class="ml-1.5 md:ml-2 px-1.5 md:px-2 py-0.5 text-[10px] sm:text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <template v-if="posts && posts.length > 0">
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="commentPost"
          class="w-full mb-0"
        />
        <div class="col-span-full flex justify-center mt-2">
          <button 
            v-if="canLoadMore"
            @click="loadMore"
            class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
          >
            {{ $t('common.loadMore') }}
          </button>
        </div>
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.hashtag.empty.posts') }}
      </div>
    </div>

  <div v-else-if="activeTab === 'news'" class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <template v-if="newsData && newsData.length > 0">
        <NewsPost
          v-for="news in newsData"
          :key="news.id"
          :article="news"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        {{ $t('content.hashtag.empty.news') }}
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
import Post from '@/components/common/Post.vue'
import { NewsPost } from '@/components/feed'
import { useHashtagsStore } from '@/store/hashtags'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const hashtagName = computed(() => route.params.hashtag || '')
const hashtagId = computed(() => route.query.id || null)
const activeTab = ref('posts')

// Initialize store
const hashtagsStore = useHashtagsStore()

// Hashtag description/statistics from store
const hashtagDescription = computed(() => hashtagsStore.getHashtagDescription(hashtagName.value))
const hashtagStats = computed(() => hashtagsStore.getHashtagStats(hashtagName.value))

// Tabs data - update counts from stores
const tabs = computed(() => [
  { id: 'posts', label: t('content.hashtag.tabs.posts'), count: posts.value.length.toString() },
  { id: 'news', label: t('content.hashtag.tabs.news'), count: newsData.value.length.toString() }
])

// Get data from stores
const loading = ref(false)
const canLoadMore = computed(() => {
  const id = hashtagId.value
  if (id) {
    const slot = hashtagsStore.postsById?.[String(id)]
    return !!slot?.pagination?.hasNext
  }
  const name = String(hashtagName.value || '')
  if (!name) return false
  const slotByName = hashtagsStore.postsByNamePagination?.[name]
  return !!slotByName?.hasNext
})
const posts = computed(() => {
  // Prefer backend by id when available
  const byId = hashtagId.value ? hashtagsStore.getPostsByHashtagId(hashtagId.value) : []
  if (byId && byId.length) return byId
  // Then prefer name-based fetched list
  const byName = hashtagsStore.getPostsByHashtag(hashtagName.value)
  if (byName && byName.length) return byName
  return hashtagsStore.getDefaultPostsForHashtag(hashtagName.value)
})

const newsData = computed(() => {
  const hashtagNews = hashtagsStore.getNewsByHashtag(hashtagName.value)
  return hashtagNews.length > 0 ? hashtagNews : hashtagsStore.getDefaultNewsForHashtag(hashtagName.value)
})

// Related hashtags feature removed (mobile simplification)

// Methods to handle post interactions
function likePost(postId) { hashtagsStore.likeHashtagPost(hashtagName.value, postId) }
function commentPost(postId) { console.log('Comment on post:', postId) }
// sharePost removed

async function loadHashtagContent() {
  loading.value = true
  try {
    if (hashtagId.value) {
      await hashtagsStore.fetchPostsById(hashtagId.value, { page: 1, limit: 12 })
    } else if (hashtagName.value) {
      await hashtagsStore.fetchPostsByName(String(hashtagName.value), { page: 1, limit: 12 })
    }
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (hashtagId.value) {
    await hashtagsStore.loadMoreById(hashtagId.value)
  } else if (hashtagName.value) {
    await hashtagsStore.loadMoreByName(String(hashtagName.value))
  }
}
onMounted(loadHashtagContent)
watch([hashtagId, hashtagName], loadHashtagContent)

// Deterministic gradient based on hashtag text
function hashToHue(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 360
  }
  return h
}

const coverStyle = computed(() => {
  const name = String(hashtagName.value || 'hashtag').toLowerCase()
  const h = hashToHue(name)
  const h2 = (h + 40) % 360
  return {
    background: `linear-gradient(135deg, hsl(${h}, 80%, 45%), hsl(${h2}, 80%, 45%))`
  }
})
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