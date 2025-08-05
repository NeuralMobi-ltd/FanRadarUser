<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">News</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Stay updated with the latest news from all your favorite communities</p>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Filter Dropdown -->
          <select 
            v-model="selectedCategory" 
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            <option value="all">All Categories</option>
            <option value="breaking">Breaking News</option>
            <option value="gaming">Gaming</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
          </select>
          
          <!-- Sort Options -->
          <select 
            v-model="sortBy" 
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
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
            <span class="text-sm font-medium text-white">Breaking News</span>
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
                :src="news.image || news.thumbnail || 'https://via.placeholder.com/300x200'" 
                :alt="news.title || 'Breaking news article'" 
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Breaking
              </div>
            </div>
            
            <div class="p-3">
              <div class="flex items-center mb-2 text-xs">
                <span class="text-white/80">{{ news.source || 'Breaking News' }}</span>
                <span class="mx-2 text-white/60">•</span>
                <span class="text-white/80">{{ news.timeAgo || news.date || 'Just now' }}</span>
              </div>
              
              <h3 class="font-bold text-sm text-white mb-2 line-clamp-2">
                {{ news.title || 'Breaking News Alert' }}
              </h3>
              
              <p class="text-white/90 text-xs mb-2 line-clamp-2">
                {{ news.summary || news.description || 'Breaking news update available.' }}
              </p>
              
              <div class="flex items-center justify-between text-xs text-white/70">
                <div class="flex items-center gap-2">
                  <span>{{ news.views || '5.2K' }} views</span>
                  <span>{{ news.readTime || news.readingTime || '2 min' }} read</span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="hover:text-white transition-colors">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button class="hover:text-white transition-colors">
                    <i class="fas fa-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
        {{ loadingMore ? 'Loading...' : 'Load More News' }}
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredNews.length === 0" class="text-center py-12">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-newspaper text-gray-400 dark:text-gray-500 text-2xl"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No news found</h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Try adjusting your filters or check back later for new updates.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNewsStore } from '@/store/news'
import NewsPost from '@/components/common/NewsPost.vue'

const newsStore = useNewsStore()

const selectedCategory = ref('all')
const sortBy = ref('recent')
const loadingMore = ref(false)
const hasMoreNews = ref(true)

// Get news data from store
const allNews = computed(() => [
  ...newsStore.newsItems,
  ...Object.values(newsStore.categoryNews).flat()
])

const breakingNews = computed(() => newsStore.breakingNews)

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
        const viewsA = parseFloat(a.views?.replace('K', '')) || 0
        const viewsB = parseFloat(b.views?.replace('K', '')) || 0
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

const loadMoreNews = () => {
  loadingMore.value = true
  // Simulate loading delay
  setTimeout(() => {
    loadingMore.value = false
    // In a real app, you would fetch more news here
    console.log('Loading more news...')
  }, 1000)
}

onMounted(() => {
  console.log('News page mounted')
})
</script>

<style scoped>
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
