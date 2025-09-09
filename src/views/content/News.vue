<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
    <!-- Page Header -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ $t('routes.news') }}</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">{{ $t('content.news.subtitle') }}</p>
        </div>
        <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:space-x-4">
          <!-- Filter Dropdown -->
          <select 
            v-model="selectedCategory" 
            class="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            aria-label="Filter category"
          >
            <option value="all">{{ $t('content.news.filters.all') }}</option>
            <option value="breaking">{{ $t('content.news.filters.breaking') }}</option>
            <option value="gaming">{{ $t('content.news.filters.gaming') }}</option>
            <option value="sports">{{ $t('content.news.filters.sports') }}</option>
            <option value="entertainment">{{ $t('content.news.filters.entertainment') }}</option>
            <option value="technology">{{ $t('content.news.filters.technology') }}</option>
          </select>
          
          <!-- Sort Options -->
          <select 
            v-model="sortBy" 
            class="w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            aria-label="Sort news"
          >
            <option value="recent">{{ $t('content.news.sort.recent') }}</option>
            <option value="popular">{{ $t('content.news.sort.popular') }}</option>
            <option value="trending">{{ $t('content.news.sort.trending') }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Breaking News Banner -->
    <div v-if="breakingNews.length > 0" class="mb-8">
      <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div class="flex items-center mb-4">
          <div class="bg-white/20 rounded-full px-3 py-1 flex items-center">
            <i class="fas fa-bolt mr-2 text-white"></i>
            <span class="text-sm font-medium text-white">{{ $t('common.breakingNews') }}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="news in breakingNews.slice(0, 3)"
            :key="news.id"
            class="bg-white/15 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div class="relative h-32">
              <img 
                :src="news.image || news.thumbnail || ''" 
                :alt="news.title || 'Breaking news article'" 
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {{ $t('common.breaking') }}
              </div>
            </div>
            
            <div class="p-3">
              <div class="flex items-center mb-2 text-xs">
                <span class="text-white/80">{{ news.source || $t('common.breakingNews') }}</span>
                <span class="mx-2 text-white/60">•</span>
                <span class="text-white/80">{{ formatTimeAgo(news.date || news.timeAgo) }}</span>
              </div>
              
              <h3 class="font-bold text-sm text-white mb-2 line-clamp-2">
                {{ news.title || 'Breaking News Alert' }}
              </h3>
              
              <p class="text-white/90 text-xs mb-2 line-clamp-2">
                {{ news.summary || news.description || 'Breaking news update available.' }}
              </p>
              
              <div class="flex items-center text-xs text-white/70">
                <span>{{ news.views || '5.2K' }} {{ $t('common.views') }}</span>
                <span class="mx-2">•</span>
                <span>{{ news.readTime || news.readingTime || '2' }} {{ $t('common.read') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      <NewsPost
        v-for="news in filteredNews"
        :key="news.id"
        :article="news"
      />
    </div>

    <!-- Load More Button -->
    <div class="flex justify-center" v-if="hasMoreNews">
      <button
        @click="loadMoreNews"
        :disabled="loadingMore"
        class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <i v-if="loadingMore" class="fas fa-spinner fa-spin mr-2"></i>
        {{ loadingMore ? $t('common.loading') : $t('content.news.loadMore') }}
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredNews.length === 0" class="text-center py-12">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-newspaper text-gray-400 dark:text-gray-500 text-2xl"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ $t('content.news.emptyTitle') }}</h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{{ $t('content.news.emptyDesc') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNewsStore } from '@/store/news'
import { NewsPost } from '@/components/feed'

const newsStore = useNewsStore()
const { locale } = useI18n()

const selectedCategory = ref('all')
const sortBy = ref('recent')
const loadingMore = computed(() => newsStore.loading)
const hasMoreNews = computed(() => newsStore.hasMore)

// Get news data from store
const allNews = computed(() => newsStore.newsItems)

const breakingNews = computed(() => newsStore.breakingNews)

// Helper function to format date to concise "time ago" (e.g., 2h, 5m, 1d)
const formatTimeAgo = (date) => {
  if (!date) return '2h'
  if (typeof date === 'string') {
    if (date.includes('ago')) {
      const match = date.match(/(\d+)([hmd])/)
      if (match) return `${match[1]}${match[2]}`
    }
    if (/[hmd]/.test(date)) return date.replace(' ago', '')
    return date
  }
  const now = new Date()
  const d = new Date(date)
  if (isNaN(d.getTime())) return '2h'
  const mins = Math.floor((now - d) / 60000)
  if (mins < 1) return '1m'
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.floor(mins / 60)}h`
  if (mins < 10080) return `${Math.floor(mins / 1440)}d`
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

// Filter news based on selected category and sort
const filteredNews = computed(() => {
  let filtered = allNews.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    if (selectedCategory.value === 'breaking') {
      filtered = breakingNews.value
    } else {
      filtered = filtered.filter(news => 
        news.category?.toLowerCase() === selectedCategory.value ||
        news.source?.toLowerCase().includes(selectedCategory.value)
      )
    }
  }

  // Sort news
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'popular':
        const viewsA = parseFloat((typeof a.views === 'string' ? a.views : a.views?.toString())?.replace('K', '')) || 0
        const viewsB = parseFloat((typeof b.views === 'string' ? b.views : b.views?.toString())?.replace('K', '')) || 0
        return viewsB - viewsA
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      case 'recent':
      default:
        const dateA = typeof a.date === 'string' ? new Date() : a.date
        const dateB = typeof b.date === 'string' ? new Date() : b.date
        return dateB - dateA
    }
  })
})

const loadMoreNews = async () => {
  await newsStore.loadMore()
}

onMounted(() => {
  if (!newsStore.newsItems.length) {
    // Fetch latest news using current language from i18n
    newsStore.fetchNews({ language: locale.value }).catch(() => {})
  }
})

// Refetch when category selection changes (excluding client-only 'breaking' and 'all')
watch(selectedCategory, (val) => {
  if (val === 'all') {
    newsStore.fetchNews({ language: locale.value }).catch(() => {})
  } else if (val === 'breaking') {
    // Keep current list; UI shows breaking subset
    // Optionally could fetch with category 'top'
    newsStore.fetchNews({ language: locale.value, category: 'top' }).catch(() => {})
  } else {
    newsStore.fetchNews({ language: locale.value, category: val }).catch(() => {})
  }
})
</script>

<style scoped>
/***** Ensure line-clamp works even without the Tailwind plugin *****/
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* Custom styles for news page */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
