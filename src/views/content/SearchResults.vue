<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Search Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 md:py-6">
      <div class="max-w-4xl mx-auto px-3 sm:px-4">
        <div class="flex items-center space-x-3 mb-2 md:mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
            <i class="fas fa-hashtag text-blue-600 dark:text-blue-400 text-sm"></i>
          </div>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Search Results for "{{ searchQuery }}"
          </h1>
        </div>
        <p class="hidden md:block text-gray-600 dark:text-gray-300">
          Found {{ totalResults }} results across posts, people, news, and fandoms
        </p>

        <!-- Mobile search input -->
        <div class="md:hidden mt-3">
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="searchQuery"
                @keyup.enter="onSearchSubmit"
                type="text"
                class="w-full pl-9 pr-10 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search FanRadar"
              />
              <button v-if="searchQuery" @click="searchQuery=''; onSearchSubmit()" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <button @click="onSearchSubmit" class="px-3 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700">Go</button>
          </div>
        </div>

        <!-- Mobile/Tablet filters: horizontal chips -->
        <div class="md:hidden mt-3 -mx-3 px-3">
          <div class="relative overflow-x-auto no-scrollbar">
            <div class="flex items-center gap-2">
              <button
                v-for="f in filters"
                :key="f.key"
                @click="setFilter(f.key)"
                :class="[
                  'px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors',
                  (activeFilter || 'all') === f.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                ]"
              >
                {{ f.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results Content -->
    <div class="max-w-4xl mx-auto px-3 sm:px-4 py-4 md:py-6">
      <!-- All Results -->
      <div v-if="activeFilter === 'all'" class="space-y-6 md:space-y-8">
        <!-- Posts Section -->
        <div v-if="filteredResults.posts.length > 0">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-file-text mr-2 text-blue-500"></i>
            Posts
          </h2>
          <div class="space-y-3 md:space-y-4">
            <Post 
              v-for="post in filteredResults.posts.slice(0, 3)"
              :key="post.id"
              :post="post"
              :highlight-term="searchQuery"
            ></Post>
          </div>
        </div>

        <!-- People Section -->
        <div v-if="filteredResults.people.length > 0">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-user mr-2 text-orange-500"></i>
            People
          </h2>
          <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
            <div
              v-for="person in filteredResults.people.slice(0, 4)"
              :key="person.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start space-x-3">
                <img 
                  :src="person.avatar" 
                  :alt="person.name" 
                  class="w-12 h-12 rounded-full object-cover cursor-pointer" 
                  @click="goToProfile(person)"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <h3 
                        class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                        v-html="highlightSearchTerm(person.name)"
                        @click="goToProfile(person)"
                      ></h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">@{{ person.username }}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2" v-html="highlightSearchTerm(person.bio)"></p>
                    </div>
                    <button
                      @click="toggleFollow(person)"
                      :class="[
                        'ml-3 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0',
                        person.isFollowing 
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      ]"
                    >
                      {{ person.isFollowing ? 'Following' : 'Follow' }}
                    </button>
                  </div>
                  <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{{ formatFollowers(person.followers) }} followers</span>
                    <span v-if="person.verified" class="text-blue-500">
                      <i class="fas fa-check-circle"></i> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- News Section -->
        <div v-if="filteredResults.news.length > 0">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-newspaper mr-2 text-red-500"></i>
            News
          </h2>
          <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
            <NewsPost 
              v-for="article in filteredResults.news.slice(0, 4)"
              :key="article.id"
              :article="article"
              :highlight-term="searchQuery"
            ></NewsPost>
          </div>
        </div>

        <!-- Fandoms Section -->
        <div v-if="filteredResults.fandoms.length > 0">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-users mr-2 text-purple-500"></i>
            Fandoms
          </h2>
          <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
            <CommunityCard 
              v-for="fandom in filteredResults.fandoms.slice(0, 4)"
              :key="fandom.id"
              :fandom="fandom"
              :highlight-term="searchQuery"
            ></CommunityCard>
          </div>
        </div>
      </div>

      <!-- Posts Only -->
      <div v-else-if="activeFilter === 'posts'" class="space-y-3 md:space-y-4">
        <Post 
          v-for="post in filteredResults.posts"
          :key="post.id"
          :post="post"
          :highlight-term="searchQuery"
        ></Post>
      </div>

      <!-- People Only -->
      <div v-else-if="activeFilter === 'people'" class="grid sm:grid-cols-2 gap-3 md:gap-4">
        <div
          v-for="person in filteredResults.people"
          :key="person.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start space-x-3">
            <img 
              :src="person.avatar" 
              :alt="person.name" 
              class="w-12 h-12 rounded-full object-cover cursor-pointer" 
              @click="goToProfile(person)"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 
                    class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                    v-html="highlightSearchTerm(person.name)"
                    @click="goToProfile(person)"
                  ></h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">@{{ person.username }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2" v-html="highlightSearchTerm(person.bio)"></p>
                </div>
                <button
                  @click="toggleFollow(person)"
                  :class="[
                    'ml-3 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0',
                    person.isFollowing 
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  ]"
                >
                  {{ person.isFollowing ? 'Following' : 'Follow' }}
                </button>
              </div>
              <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>{{ formatFollowers(person.followers) }} followers</span>
                <span v-if="person.verified" class="text-blue-500">
                  <i class="fas fa-check-circle"></i> Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- News Only -->
      <div v-else-if="activeFilter === 'news'" class="grid sm:grid-cols-2 gap-3 md:gap-4">
        <NewsPost 
          v-for="article in filteredResults.news"
          :key="article.id"
          :article="article"
          :highlight-term="searchQuery"
        ></NewsPost>
      </div>

      <!-- Fandoms Only -->
      <div v-else-if="activeFilter === 'fandoms'" class="grid sm:grid-cols-2 gap-3 md:gap-4">
        <CommunityCard 
          v-for="fandom in filteredResults.fandoms"
          :key="fandom.id"
          :fandom="fandom"
          :highlight-term="searchQuery"
        ></CommunityCard>
      </div>

      <!-- No Results -->
      <div v-if="totalResults === 0" class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try searching for something else</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/store/search'
import Post from '@/components/common/Post.vue'
import { NewsPost } from '@/components/feed'
import { CommunityCard } from '@/components/fandom'

const route = useRoute()
const router = useRouter()
const activeFilter = ref('all')
const searchQuery = ref('')

const searchResults = ref({
  posts: [],
  news: [],
  fandoms: []
})

const searchStore = useSearchStore()

// Filter results based on current filter
const filteredResults = computed(() => {
  const currentFilter = route.query.filter || 'all'
  
  if (currentFilter === 'all') {
    return searchResults.value
  } else if (currentFilter === 'posts') {
    return { posts: searchResults.value.posts, news: [], fandoms: [], people: [] }
  } else if (currentFilter === 'people') {
    return { posts: [], news: [], fandoms: [], people: searchResults.value.people }
  } else if (currentFilter === 'news') {
    return { posts: [], news: searchResults.value.news, fandoms: [], people: [] }
  } else if (currentFilter === 'fandoms') {
    return { posts: [], news: [], fandoms: searchResults.value.fandoms, people: [] }
  }
  
  return searchResults.value
})

const totalResults = computed(() => 
  filteredResults.value.posts.length + 
  filteredResults.value.news.length + 
  filteredResults.value.fandoms.length + 
  filteredResults.value.people.length
)

const highlightSearchTerm = (text) => {
  if (!searchQuery.value || !text) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const performSearch = () => {
  const query = searchQuery.value
  
  if (!query) {
    searchResults.value = {
      posts: [],
      news: [],
      fandoms: [],
      people: []
    }
    return
  }
  
  const results = searchStore.performGlobalSearch(query)
  
  searchResults.value = {
    posts: results.posts || [],
    news: results.news || [],
    fandoms: results.fandoms || results.communities || [],
    people: results.people || []
  }
}

const goToProfile = (person) => {
  router.push(`/account/${person.username}`)
}

const toggleFollow = (person) => {
  person.isFollowing = !person.isFollowing
  
  // Update follower count
  if (person.isFollowing) {
    person.followers = (typeof person.followers === 'number' ? person.followers : parseInt(person.followers.replace(/[KM]/g, '')) * (person.followers.includes('K') ? 1000 : person.followers.includes('M') ? 1000000 : 1)) + 1
  } else {
    person.followers = Math.max(0, (typeof person.followers === 'number' ? person.followers : parseInt(person.followers.replace(/[KM]/g, '')) * (person.followers.includes('K') ? 1000 : person.followers.includes('M') ? 1000000 : 1)) - 1)
  }
  
  // Format the number back
  person.followers = formatFollowers(person.followers)
}

const formatFollowers = (count) => {
  if (typeof count === 'string') return count
  
  if (count < 1000) return count.toString()
  if (count < 1000000) return (count / 1000).toFixed(1).replace('.0', '') + 'K'
  return (count / 1000000).toFixed(1).replace('.0', '') + 'M'
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'posts', label: 'Posts' },
  { key: 'people', label: 'People' },
  { key: 'news', label: 'News' },
  { key: 'fandoms', label: 'Fandoms' }
]

const onSearchSubmit = () => {
  router.push({ name: 'SearchResults', query: { q: (searchQuery.value || '').trim(), filter: route.query.filter || 'all' } })
}

const setFilter = (key) => {
  router.push({ name: 'SearchResults', query: { q: route.query.q || searchQuery.value || '', filter: key } })
}

// Watch for filter changes in URL
watch(() => route.query.filter, (newFilter) => {
  activeFilter.value = newFilter || 'all'
})

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery
    performSearch()
  }
}, { immediate: true })

onMounted(() => {
  searchQuery.value = route.query.q || ''
  activeFilter.value = route.query.filter || 'all'
  performSearch()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2; /* standard property for compatibility */
}

.no-scrollbar { scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>
