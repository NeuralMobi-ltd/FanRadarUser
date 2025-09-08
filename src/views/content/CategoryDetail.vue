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
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">
          <i class="mr-3"></i>{{ formattedCategoryName }}
        </h1>
        <p class="text-white/90 max-w-xl">{{ categoryDescription }}</p>
      </div>
    </div>

    <!-- Subcategories (quick nav) -->
    <div v-if="subcategories && subcategories.length" class="mb-4 flex flex-wrap gap-2">
      <!-- All chip -->
      <button
        @click="selectAll"
        :class="[
          'px-3 py-1.5 rounded-full text-xs border text-gray-700 dark:text-gray-300',
          selectedSubId === null
            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
        ]"
      >
        {{ $t('common.all') }}
      </button>
      <button 
        v-for="s in subcategories" :key="s.id"
        @click="selectSubcategory(s)"
        :class="[
          'px-3 py-1.5 rounded-full text-xs border text-gray-700 dark:text-gray-300',
          selectedSubId === s.id
            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
        ]"
      >
        {{ s.name }}
      </button>
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
    <div v-if="activeTab === 'fandoms'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="fandoms && fandoms.length > 0">
        <CommunityCard
          v-for="fandom in fandoms"
          :key="fandom.id"
          :community="fandom"
          :button-text="$t('common.join')"
        />
        <div class="col-span-full flex justify-center mt-2">
          <button v-if="canLoadMoreFandoms" @click="loadMoreFandoms" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">{{ $t('common.loadMore') }}</button>
        </div>
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
          class="w-full mb-0"
        />
        <div class="col-span-full flex justify-center mt-2">
          <button v-if="canLoadMorePosts" @click="loadMorePosts" class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">{{ $t('common.loadMore') }}</button>
        </div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Post from '@/components/common/Post.vue'
import { NewsPost } from '@/components/feed'
import { CommunityCard } from '@/components/fandom'
import { getCategoryImage } from '@/utils/media'
import { useFandomsStore } from '@/store/fandoms'
import { usePostsStore } from '@/store/posts'
import { useNewsStore } from '@/store/news'
import { useCategoriesStore } from '@/store/categories'
import { useSubcategoriesStore } from '@/store/subcategories'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const categoriesStore = useCategoriesStore()
const categoryName = computed(() => route.params.category || '')
const activeTab = ref('fandoms')

// Initialize stores
const communitiesStore = useFandomsStore()
const postsStore = usePostsStore()
const newsStore = useNewsStore()
const subStore = useSubcategoriesStore()

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

// Tabs badges should reflect what is actually rendered (aggregated or per-subcategory)
// We'll define tabs after computing posts/fandoms/newsData.

// Subcategory-driven content
// Use raw route param to allow slug or case-insensitive name matching
const selectedCategoryId = computed(() => categoriesStore.categoryIdByName(categoryName.value))
const subcategories = computed(() => categoriesStore.getSubcategories(selectedCategoryId.value))
const selectedSubId = ref(null) // null means "All"

// Aggregated lists across all subcategories
const allPosts = computed(() => {
  const list = subcategories.value || []
  const merged = []
  const seen = new Set()
  for (const s of list) {
    const arr = subStore.getContent(s.id) || []
    for (const p of arr) {
      if (!seen.has(p.id)) { seen.add(p.id); merged.push(p) }
    }
  }
  // Optional: sort newest first if created_at exists
  try { merged.sort((a,b) => new Date(b.created_at||0) - new Date(a.created_at||0)) } catch(_) {}
  return merged
})
const allFandoms = computed(() => {
  const list = subcategories.value || []
  const merged = []
  const seen = new Set()
  for (const s of list) {
    const arr = subStore.getFandoms(s.id) || []
    for (const f of arr) {
      if (!seen.has(f.id)) { seen.add(f.id); merged.push(f) }
    }
  }
  return merged
})

const posts = computed(() => selectedSubId.value ? subStore.getContent(selectedSubId.value) : allPosts.value)
const fandoms = computed(() => selectedSubId.value ? subStore.getFandoms(selectedSubId.value) : allFandoms.value)

const anyContentHasNext = computed(() => {
  const list = subcategories.value || []
  return list.some(s => subStore.getContentPagination(s.id)?.hasNext)
})
const anyFandomsHasNext = computed(() => {
  const list = subcategories.value || []
  return list.some(s => subStore.getFandomsPagination(s.id)?.hasNext)
})

const canLoadMorePosts = computed(() => selectedSubId.value ? !!subStore.getContentPagination(selectedSubId.value)?.hasNext : anyContentHasNext.value)
const canLoadMoreFandoms = computed(() => selectedSubId.value ? !!subStore.getFandomsPagination(selectedSubId.value)?.hasNext : anyFandomsHasNext.value)
const newsData = computed(() => {
  const categoryNews = newsStore.getNewsByCategory(categoryName.value)
  if (categoryNews.length > 0) {
    return categoryNews
  }
  // Use default news generator for categories without specific data
  const defaultNews = newsStore.getDefaultNewsForCategory(categoryName.value, formattedCategoryName.value)
  return defaultNews
})

// Tabs data - show counts based on actually rendered arrays
const tabs = computed(() => [
  {
    id: 'fandoms',
    label: t('content.category.tabs.fandoms'),
    count: (fandoms.value?.length || 0).toString()
  },
  {
    id: 'posts',
    label: t('content.category.tabs.posts'),
    count: (posts.value?.length || 0).toString()
  },
  {
    id: 'news',
    label: t('content.category.tabs.news'),
    count: (newsData.value?.length || 0).toString()
  }
])

// Methods to handle post interactions
function likePost(postId) {
  postsStore.likePost(postId, 'currentUser')
}

function commentPost(postId) {
  // TODO: Open comment modal or navigate
}

onMounted(() => {
  if (selectedCategoryId.value) categoriesStore.fetchSubcategoriesFor(selectedCategoryId.value)
})
// Fetch subcategories whenever the resolved id becomes available
watch(selectedCategoryId, (id) => {
  if (id) categoriesStore.fetchSubcategoriesFor(id)
}, { immediate: true })
// When subcategories load, preload first page for each to build the aggregated view
watch(subcategories, async (list) => {
  if (!Array.isArray(list) || !list.length) return
  // Keep default in All mode (selectedSubId = null)
  await Promise.allSettled(list.map(s => Promise.all([
    subStore.fetchContent(s.id, { page: 1, limit: 20 }),
    subStore.fetchFandoms(s.id, { page: 1, limit: 12 })
  ])))
}, { immediate: true })

async function selectSubcategory(s) {
  if (!s) return
  selectedSubId.value = s.id
  await Promise.all([
    subStore.fetchContent(s.id, { page: 1, limit: 20 }),
    subStore.fetchFandoms(s.id, { page: 1, limit: 12 })
  ])
}

function selectAll() {
  selectedSubId.value = null
}

async function loadMorePosts() {
  const id = selectedSubId.value
  if (id) {
    const slot = subStore.contentById[String(id)]
    const next = (slot?.pagination?.page || 1) + 1
    await subStore.fetchContent(id, { page: next, limit: slot?.pagination?.limit || 20 })
    return
  }
  // All mode: advance any subcategory with next page
  const list = subcategories.value || []
  await Promise.allSettled(list.map(s => {
    const pag = subStore.getContentPagination(s.id)
    if (pag?.hasNext) {
      const next = (pag.page || 1) + 1
      return subStore.fetchContent(s.id, { page: next, limit: pag.limit || 20 })
    }
    return Promise.resolve()
  }))
}

async function loadMoreFandoms() {
  const id = selectedSubId.value
  if (id) {
    const slot = subStore.fandomsById[String(id)]
    const next = (slot?.pagination?.page || 1) + 1
    await subStore.fetchFandoms(id, { page: next, limit: slot?.pagination?.limit || 12 })
    return
  }
  // All mode: advance any subcategory with next page
  const list = subcategories.value || []
  await Promise.allSettled(list.map(s => {
    const pag = subStore.getFandomsPagination(s.id)
    if (pag?.hasNext) {
      const next = (pag.page || 1) + 1
      return subStore.fetchFandoms(s.id, { page: next, limit: pag.limit || 12 })
    }
    return Promise.resolve()
  }))
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
