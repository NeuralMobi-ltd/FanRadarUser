<template>
  <!-- Mobile-first responsive design -->
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-3 sm:pt-4 lg:pt-6 pb-20 md:pb-6">
      <!-- Page Title -->
      <div class="mb-6 sm:mb-8 lg:mb-10">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('common.discoverContent') }}</h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">{{ $t('common.trendsNewsFandomsForYou') }}</p>
      </div>

      <!-- Current Trends Section -->
      <div class="mb-6 sm:mb-8 lg:mb-10">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <svg class="w-3 h-3 sm:w-5 sm:h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('common.currentTrends') }}</h2>
        </div>
        
        <!-- Horizontal Scroll Container -->
        <div class="overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div class="flex gap-3 sm:gap-4 lg:gap-6 w-max">
            <div v-for="trend in currentTrends" :key="trend.tag" 
                 @click="navigateToHashtag(trend.tag)"
                 class="w-72 sm:w-80 lg:w-96 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0 touch-manipulation">
              <div class="flex items-center mb-3 sm:mb-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <i :class="trend.icon" class="text-lg sm:text-2xl text-blue-500"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white text-base sm:text-lg">#{{ trend.tag }}</h3>
                  <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{{ $t('common.postsCount', { count: trend.posts }) }}</p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">{{ trend.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Categories Section -->
      <div class="mb-6 sm:mb-8 lg:mb-10">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
            <svg class="w-3 h-3 sm:w-5 sm:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('common.popularCategories') }}</h2>
        </div>
        
        <!-- Horizontal Scroll Container -->
        <div class="overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div class="flex gap-3 sm:gap-4 lg:gap-6 w-max">
            <div v-for="category in popularCategories" :key="category.name" 
                 @click="navigateToCategory(category.name)"
                 class="relative w-48 h-28 sm:w-56 sm:h-36 lg:w-64 lg:h-40 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 active:scale-95 transition-transform flex-shrink-0 touch-manipulation">
              <img :src="category.image" :alt="category.name" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                <h3 class="text-white font-bold text-sm sm:text-lg">{{ category.name }}</h3>
                <p class="text-white/80 text-xs sm:text-sm">{{ category.communities }} {{ $t('common.fandoms') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      <!-- Fan News Section -->
      <div class="mb-6 sm:mb-8 lg:mb-10">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div class="flex items-center">
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
              <svg class="w-3 h-3 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
            </div>
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{{ $t('common.fanNews') }}</h2>
          </div>
          <router-link 
            to="/news" 
            class="text-blue-500 text-xs sm:text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-button px-2 py-1 rounded-lg"
          >
            {{ $t('common.seeAll') }}
          </router-link>
        </div>
        
        <!-- Horizontal Scroll Container -->
        <div class="overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div class="flex gap-3 sm:gap-4 lg:gap-6 w-max">
            <div v-for="news in fanNews" :key="news.id" 
                 class="w-72 sm:w-80 lg:w-96 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg active:scale-95 transition-all duration-300 flex-shrink-0 cursor-pointer touch-manipulation">
              <div class="relative h-40 sm:h-48 lg:h-56">
                <img :src="news.image" :alt="news.title" class="w-full h-full object-cover">
                <div class="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {{ news.category }}
                </div>
              </div>
              <div class="p-3 sm:p-4 lg:p-6">
                <h3 class="font-bold text-gray-900 dark:text-white text-sm sm:text-lg mb-2 line-clamp-2 leading-tight">{{ news.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">{{ news.description }}</p>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{{ news.timeAgo || news.date }}</span>
                  <span>{{ news.views }} {{ $t('common.views') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/store/news'
import { useTrendsStore } from '@/store/trends'

const router = useRouter()
const newsStore = useNewsStore()
const trendsStore = useTrendsStore()

const fanNews = computed(() => newsStore.newsItems)
const currentTrends = computed(() => trendsStore.currentTrends || [])
const popularCategories = computed(() => trendsStore.popularCategories || [])

const navigateToCategory = (categoryName) => {
  router.push(`/category/${categoryName.toLowerCase()}`)
}

const navigateToHashtag = (hashtag) => {
  router.push(`/hashtag/${hashtag}`)
}
</script>

<style scoped>
/* Hide scrollbar for webkit browsers */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

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