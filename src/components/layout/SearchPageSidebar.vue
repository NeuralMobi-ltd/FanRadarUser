<template>
  <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-16 overflow-y-auto">
    <!-- Search Filters Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
        <i class="fas fa-search mr-2 text-blue-500"></i>
        Search Results
      </h2>
    </div>

    <!-- Filter Options -->
    <div class="p-4">
      <div class="space-y-2">
        <div
          @click="selectFilter('all')"
          :class=" [
            'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
            activeFilter === 'all' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-layer-group text-blue-500 text-sm"></i>
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">All</span>
          </div>
        </div>

        <div
          @click="selectFilter('posts')"
          :class=" [
            'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
            activeFilter === 'posts' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-file-text text-green-500 text-sm"></i>
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Posts</span>
          </div>
        </div>

        <div
          @click="selectFilter('people')"
          :class=" [
            'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
            activeFilter === 'people' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-user text-orange-500 text-sm"></i>
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">People</span>
          </div>
        </div>

        <div
          @click="selectFilter('news')"
          :class=" [
            'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
            activeFilter === 'news' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-newspaper text-red-500 text-sm"></i>
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">News</span>
          </div>
        </div>

        <div
          @click="selectFilter('fandoms')"
          :class=" [
            'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
            activeFilter === 'fandoms' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-users text-purple-500 text-sm"></i>
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Fandoms</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeFilter = ref('all')

// Watch for filter changes in URL
watch(() => route.query.filter, (newFilter) => {
  activeFilter.value = newFilter || 'all'
}, { immediate: true })

const selectFilter = (filter) => {
  activeFilter.value = filter
  
  // Update URL with filter parameter
  const currentQuery = { ...route.query }
  if (filter === 'all') {
    delete currentQuery.filter
  } else {
    currentQuery.filter = filter
  }
  
  router.push({
    name: 'SearchResults',
    query: currentQuery
  })
}
import { onMounted } from 'vue'

// Methods
const updateFilters = () => {
  // Emit filter changes to parent component or update route query
  const filters = {
    types: selectedContentTypes.value,
    date: selectedDateRange.value,
    categories: selectedCategories.value,
    sort: selectedSort.value
  }
  
  // Update URL with filters
  router.push({
    name: 'SearchResults',
    query: {
      ...route.query,
      ...filters
    }
  })
}

const searchHashtag = (hashtag) => {
  router.push({
    name: 'SearchResults',
    query: { q: hashtag }
  })
}

const clearAllFilters = () => {
  selectedContentTypes.value = ['posts', 'fandoms', 'news']
  selectedDateRange.value = 'all'
  selectedCategories.value = []
  selectedSort.value = 'relevance'
  updateFilters()
}

// Filter state
const selectedContentTypes = ref(['posts', 'fandoms', 'news'])
const selectedDateRange = ref('all')
const selectedCategories = ref([])
const selectedSort = ref('relevance')

// Initialize filters from URL query params
onMounted(() => {
  if (route.query.types) {
    selectedContentTypes.value = Array.isArray(route.query.types) ? route.query.types : [route.query.types]
  }
  if (route.query.date) {
    selectedDateRange.value = route.query.date
  }
  if (route.query.categories) {
    selectedCategories.value = Array.isArray(route.query.categories) ? route.query.categories : [route.query.categories]
  }
  if (route.query.sort) {
    selectedSort.value = route.query.sort
  }
})
</script>
