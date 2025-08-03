<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
              <i class="fas fa-users text-purple-600 dark:text-purple-400"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Browse Fandoms</h1>
              <p class="text-gray-600 dark:text-gray-300">Discover and join amazing fan communities</p>
            </div>
          </div>
          <router-link
            to="/create-fandom"
            class="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <i class="fas fa-plus"></i>
            <span>Create Fandom</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Search and Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400"></i>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search fandoms..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Gaming">Gaming</option>
          <option value="Technology">Technology</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
        </select>
      </div>

      <!-- Fandoms Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommunityCard
          v-for="fandom in filteredFandoms"
          :key="fandom.id"
          :fandom="fandom"
          @click="goToFandom"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredFandoms.length === 0" class="text-center py-12">
        <i class="fas fa-users text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No fandoms found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
        <router-link
          to="/create-fandom"
          class="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <i class="fas fa-plus"></i>
          <span>Create New Fandom</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/store/search'
import CommunityCard from '@/components/community/CommunityCard.vue'

const router = useRouter()
const searchStore = useSearchStore()

const searchQuery = ref('')
const selectedCategory = ref('')

// Get fandoms from search store
const allFandoms = computed(() => searchStore.mockFandoms)

// Filter fandoms based on search and category
const filteredFandoms = computed(() => {
  let fandoms = allFandoms.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    fandoms = fandoms.filter(fandom =>
      fandom.name.toLowerCase().includes(query) ||
      fandom.description.toLowerCase().includes(query) ||
      fandom.category.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    fandoms = fandoms.filter(fandom => fandom.category === selectedCategory.value)
  }

  return fandoms
})

const goToFandom = (fandom) => {
  router.push(`/fandom/${fandom.handle}`)
}
</script>
