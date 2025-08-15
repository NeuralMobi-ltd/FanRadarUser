<template>
  <!-- Search Sidebar Overlay -->
  <div 
    v-if="isVisible" 
    class="fixed inset-0 z-50 flex"
    @click="closeSearch"
  >
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-25 transition-opacity"></div>
    
    <!-- Search sidebar -->
    <div 
      class="relative w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 h-full overflow-hidden"
      @click.stop
    >
      <!-- Search header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <button 
            @click="closeSearch"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <i class="fas fa-arrow-left text-gray-600 dark:text-gray-300"></i>
          </button>
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400"></i>
            </div>
            <input
              ref="searchInput"
              v-model="searchQuery"
              @input="performSearch"
              @keyup.enter="viewAllResults"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Search FanRadar"
            />
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <i class="fas fa-times text-gray-400 hover:text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Search suggestions/recent -->
      <div v-if="!searchQuery" class="overflow-y-auto h-full pb-16">
        <!-- Recent searches -->
        <div v-if="recentSearches.length > 0" class="p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent</h3>
            <button 
              @click="clearRecentSearches"
              class="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          </div>
          <div class="space-y-1">
            <div
              v-for="search in recentSearches"
              :key="search"
              @click="selectSearch(search)"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <i class="fas fa-clock text-gray-500 dark:text-gray-400 text-sm"></i>
              </div>
              <span class="text-gray-900 dark:text-white text-sm">{{ search }}</span>
              <button 
                @click.stop="removeRecentSearch(search)"
                class="ml-auto p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
              >
                <i class="fas fa-times text-gray-400 text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Trending searches -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Trending</h3>
          <div class="space-y-1">
            <div
              v-for="trend in trendingSearches"
              :key="trend.term"
              @click="selectSearch(trend.term)"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div class="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <i class="fas fa-fire text-red-500 text-sm"></i>
              </div>
              <div class="flex-1">
                <span class="text-gray-900 dark:text-white text-sm">{{ trend.term }}</span>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ trend.posts }} posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search results -->
      <div v-else class="overflow-y-auto h-full pb-16">
        <!-- Loading -->
        <div v-if="isSearching" class="p-4 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching...</p>
        </div>

        <!-- Results -->
        <div v-else>
          <!-- People results -->
          <div v-if="searchResults.people.length > 0" class="p-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <i class="fas fa-user mr-2 text-blue-500"></i>
              People
            </h3>
            <div class="space-y-1">
              <div
                v-for="person in searchResults.people.slice(0, 3)"
                :key="person.id"
                @click="goToProfile(person)"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <img :src="person.avatar" :alt="person.name" class="w-10 h-10 rounded-full object-cover" />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white text-sm" v-html="highlightSearchTerm(person.name)"></h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">@{{ person.username }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Fandoms results -->
          <div v-if="searchResults.communities.length > 0" class="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <i class="fas fa-users mr-2 text-purple-500"></i>
              Fandoms
            </h3>
            <div class="space-y-1">
              <div
                v-for="community in searchResults.communities.slice(0, 3)"
                :key="community.id"
                @click="goToCommunity(community)"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <img :src="community.logo" :alt="community.name" class="w-10 h-10 rounded-lg object-cover" />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white text-sm" v-html="highlightSearchTerm(community.name)"></h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ community.members }} members</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts results -->
          <div v-if="searchResults.posts.length > 0" class="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <i class="fas fa-file-text mr-2 text-green-500"></i>
              Posts
            </h3>
            <div class="space-y-1">
              <div
                v-for="post in searchResults.posts.slice(0, 3)"
                :key="post.id"
                @click="goToPost(post)"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div class="flex items-start space-x-2">
                  <img :src="post.author.avatar" :alt="post.author.name" class="w-8 h-8 rounded-full object-cover" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900 dark:text-white font-medium">{{ post.author.name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-300 truncate" v-html="highlightSearchTerm(post.content)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- See all results -->
          <div v-if="hasResults" class="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="viewAllResults"
              class="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              See all results for "{{ searchQuery }}"
            </button>
          </div>

          <!-- No results -->
          <div v-if="!hasResults && !isSearching" class="p-4 text-center">
            <i class="fas fa-search text-2xl text-gray-300 dark:text-gray-600 mb-2"></i>
            <p class="text-sm text-gray-500 dark:text-gray-400">No results found for "{{ searchQuery }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const searchInput = ref(null)
const searchQuery = ref('')
const isSearching = ref(false)

// Mock data
const recentSearches = ref(['Premier League', 'Anime', 'Marvel'])
const trendingSearches = ref([
  { term: 'World Cup 2024', posts: '45.2K' },
  { term: 'New Anime Season', posts: '32.1K' },
  { term: 'MCU Phase 5', posts: '28.7K' },
  { term: 'K-Pop Comeback', posts: '24.3K' }
])

const searchResults = ref({
  people: [],
  communities: [],
  posts: []
})

// Mock search data
const mockData = {
  people: [
    {
      id: 1,
      name: 'Football Fanatic',
      username: 'footballfan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Anime Expert',
      username: 'animeexpert',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    }
  ],
  communities: [
    {
      id: 1,
      name: 'Premier League Fans',
      handle: 'premier-league-fans',
      logo: 'https://logo.clearbit.com/premierleague.com',
      members: '234K'
    },
    {
      id: 2,
      name: 'Anime & Manga',
      handle: 'anime-manga',
      logo: 'https://logo.clearbit.com/crunchyroll.com',
      members: '980K'
    }
  ],
  posts: [
    {
      id: 1,
      content: 'What an incredible Premier League match yesterday!',
      author: {
        name: 'Sports Fan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
    }
  ]
}

const hasResults = computed(() => 
  searchResults.value.people.length > 0 || 
  searchResults.value.communities.length > 0 || 
  searchResults.value.posts.length > 0
)

const highlightSearchTerm = (text) => {
  if (!searchQuery.value || !text) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = { people: [], communities: [], posts: [] }
    return
  }

  isSearching.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const query = searchQuery.value.toLowerCase()
  
  searchResults.value = {
    people: mockData.people.filter(person =>
      person.name.toLowerCase().includes(query) ||
      person.username.toLowerCase().includes(query)
    ),
    communities: mockData.communities.filter(community =>
      community.name.toLowerCase().includes(query)
    ),
    posts: mockData.posts.filter(post =>
      post.content.toLowerCase().includes(query)
    )
  }

  isSearching.value = false
}

const selectSearch = (term) => {
  searchQuery.value = term
  addToRecentSearches(term)
  performSearch()
}

const addToRecentSearches = (term) => {
  const recent = recentSearches.value.filter(search => search !== term)
  recent.unshift(term)
  recentSearches.value = recent.slice(0, 5)
}

const removeRecentSearch = (term) => {
  recentSearches.value = recentSearches.value.filter(search => search !== term)
}

const clearRecentSearches = () => {
  recentSearches.value = []
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = { people: [], communities: [], posts: [] }
}

const closeSearch = () => {
  emit('close')
}

const viewAllResults = () => {
  if (searchQuery.value.trim()) {
    addToRecentSearches(searchQuery.value.trim())
    router.push({
      name: 'SearchResults',
      query: { q: searchQuery.value.trim() }
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

const goToPost = (post) => {
  // Navigate to post detail or close search
  closeSearch()
}

// Auto-focus search input when sidebar opens
watch(() => props.isVisible, (visible) => {
  if (visible) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    clearSearch()
  }
})
</script>
