<template>
  <!-- Search Dropdown positioned below search input -->
  <div 
    v-if="isVisible" 
    class="absolute top-full left-0 right-0 z-50 mt-2"
  >
    <!-- Search dropdown -->
    <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96">
      <!-- Trending searches and results -->
      <div class="overflow-y-auto max-h-96">
        <!-- Show recent searches or search results based on query -->
        <div v-if="!query">
          <!-- Recent searches section -->
          <div v-if="recentSearches.length > 0" class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent</h3>
              <button 
                @click="clearRecentSearches"
                class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Clear all
              </button>
            </div>
            
            <!-- Recent search items -->
            <div class="mt-2 space-y-1">
              <div
                v-for="search in recentSearches"
                :key="search"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div 
                  @click="selectSearch(search)"
                  class="flex items-center space-x-3 flex-1 cursor-pointer"
                >
                  <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-gray-500 dark:text-gray-400 text-sm"></i>
                  </div>
                  <span class="text-gray-900 dark:text-white text-sm">{{ search }}</span>
                </div>
                <button 
                  @click.stop="removeRecentSearch(search)"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Trending section -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Trending</h3>
          </div>
          
          <!-- Trending items -->
          <div class="px-2">
            <div
              v-for="trend in trendingSearches"
              :key="trend.term"
              @click="selectSearch(trend.term)"
              class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div class="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <i class="fas fa-fire text-red-500"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ trend.term }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ trend.posts }} posts</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search results when query exists -->
        <div v-else>
          <!-- Loading -->
          <div v-if="isSearching" class="p-4 text-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching...</p>
          </div>

          <!-- Results -->
          <div v-else class="p-4">
            <!-- Quick results preview -->
            <div v-if="hasResults" class="space-y-4">
              <!-- People -->
              <div v-if="searchResults.people.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-user mr-2 text-blue-500"></i>
                  People
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="person in searchResults.people.slice(0, 2)"
                    :key="person.id"
                    @click="goToProfile(person)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img :src="person.avatar" :alt="person.name" class="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(person.name)"></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">@{{ person.username }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Posts -->
              <div v-if="searchResults.posts.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-file-text mr-2 text-green-500"></i>
                  Posts
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="post in searchResults.posts.slice(0, 2)"
                    :key="post.id"
                    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div class="flex items-start space-x-2">
                      <img :src="post.author.avatar" :alt="post.author.name" class="w-6 h-6 rounded-full object-cover" />
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-900 dark:text-white font-medium">{{ post.author.name }}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-300 truncate" v-html="highlightSearchTerm(post.content)"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Communities -->
              <div v-if="searchResults.communities.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-users mr-2 text-purple-500"></i>
                  Communities
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="community in searchResults.communities.slice(0, 2)"
                    :key="community.id"
                    @click="goToCommunity(community)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img :src="community.logo" :alt="community.name" class="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(community.name)"></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ community.members }} members</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Fandoms -->
              <div v-if="searchResults.fandoms.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-users mr-2 text-purple-500"></i>
                  Fandoms
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="fandom in searchResults.fandoms.slice(0, 2)"
                    :key="fandom.id"
                    @click="goToFandom(fandom)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img :src="fandom.logo" :alt="fandom.name" class="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(fandom.name)"></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ fandom.members }} members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- See all results button -->
            <div v-if="hasResults" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="viewAllResults"
                class="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                See all results for "{{ query }}"
              </button>
            </div>

            <!-- No results -->
            <div v-if="!hasResults && !isSearching" class="text-center py-4">
              <i class="fas fa-search text-xl text-gray-300 dark:text-gray-600 mb-2"></i>
              <p class="text-sm text-gray-500 dark:text-gray-400">No results found for "{{ query }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/store/search'

const props = defineProps({
  isVisible: Boolean,
  query: String
})

const emit = defineEmits(['close', 'search'])

const router = useRouter()
const isSearching = ref(false)

const searchStore = useSearchStore()

// Use store data instead of local data
const recentSearches = computed(() => searchStore.getRecentSearches)
const trendingSearches = computed(() => searchStore.trendingSearches)

const searchResults = ref({
  people: [],
  fandoms: [],
  posts: []
})

const hasResults = computed(() => 
  searchResults.value.people.length > 0 || 
  searchResults.value.fandoms.length > 0 || 
  searchResults.value.posts.length > 0
)

const highlightSearchTerm = (text) => {
  if (!props.query || !text) return text
  const regex = new RegExp(`(${props.query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const performSearch = async () => {
  if (!props.query?.trim()) {
    searchResults.value = { people: [], fandoms: [], posts: [] }
    return
  }

  isSearching.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  // Use search store to get results
  const results = searchStore.performGlobalSearch(props.query)
  
  searchResults.value = {
    people: results.people || [],
    fandoms: results.fandoms || [],
    posts: results.posts || []
  }

  isSearching.value = false
}

const selectSearch = (term) => {
  // Add to recent searches
  addToRecentSearches(term)
  
  // Navigate to search results page
  router.push({
    name: 'SearchResults',
    query: { q: term }
  })
  
  // Close the modal
  closeSearch()
}

const addToRecentSearches = (term) => {
  searchStore.addToRecentSearches(term)
}

const removeRecentSearch = (term) => {
  searchStore.removeRecentSearch(term)
}

const clearRecentSearches = () => {
  searchStore.clearRecentSearches()
}

const closeSearch = () => {
  emit('close')
}

const viewAllResults = () => {
  if (props.query?.trim()) {
    addToRecentSearches(props.query.trim())
    router.push({
      name: 'SearchResults',
      query: { q: props.query.trim() }
    })
    closeSearch()
  }
}

const goToProfile = (person) => {
  router.push(`/account/${person.username}`)
  closeSearch()
}

const goToCommunity = (community) => {
  router.push(`/fandom/${community.handle}`)
  closeSearch()
}

const goToFandom = (fandom) => {
  router.push(`/fandom/${fandom.handle}`)
  closeSearch()
}

// Perform search when query changes
watch(() => props.query, () => {
  performSearch()
})
</script>