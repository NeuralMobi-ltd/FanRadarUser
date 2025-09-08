<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Search Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 md:py-6">
      <div class="max-w-4xl mx-auto px-3 sm:px-4">
        <div class="flex items-center space-x-3 mb-2 md:mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
          </div>
          <h1 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
            Search Results for "{{ searchQuery }}"
          </h1>
        </div>
        <p class="hidden md:block text-gray-600 dark:text-gray-300">
          <span v-if="isAnyLoading">Loading...</span>
          <span v-else>Found {{ aggregateCount }} results</span>
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
        <!-- Users Section -->
        <div v-if="userResults.length > 0 || usersLoading">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-user mr-2 text-orange-500"></i>
            Users
            <span v-if="usersLoading" class="ml-2 text-xs text-gray-500 animate-pulse">loading...</span>
          </h2>
          <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
            <div
              v-for="person in userResults"
              :key="person.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start space-x-3">
                <AvatarFallback
                  :src="person.profile_image"
                  :first-name="person.first_name || person.firstName"
                  :last-name="person.last_name || person.lastName"
                  custom-class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white cursor-pointer"
                  @click="goToProfile(person)"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <h3
                        class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors"
                        @click="goToProfile(person)"
                        v-html="highlightSearchTerm(displayUserName(person))"
                      ></h3>
                      <!-- Username removed per request -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts Section -->
        <div v-if="postResults.length > 0 || postsLoading">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-file-text mr-2 text-blue-500"></i>
            Posts
            <span v-if="postsLoading" class="ml-2 text-xs text-gray-500 animate-pulse">loading...</span>
          </h2>
          <div class="space-y-3 md:space-y-4">
            <Post
              v-for="post in postResults"
              :key="post.id"
              :post="normalizePost(post)"
              :highlight-term="searchQuery"
            />
          </div>
        </div>

        <!-- Fandoms Section -->
        <div v-if="fandomResults.length > 0 || fandomsLoading">
          <h2 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center">
            <i class="fas fa-users mr-2 text-purple-500"></i>
            Fandoms
            <span v-if="fandomsLoading" class="ml-2 text-xs text-gray-500 animate-pulse">loading...</span>
          </h2>
          <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
            <CommunityCard
              v-for="fandom in mappedFandomResults"
              :key="fandom.id"
              :fandom="fandom"
              :highlight-term="searchQuery"
            />
          </div>
        </div>
      </div>

      <!-- Posts Only -->
      <div v-else-if="activeFilter === 'posts'" class="space-y-3 md:space-y-4">
        <div v-if="postsLoading" class="text-sm text-gray-500">Loading posts...</div>
        <Post
          v-for="post in postResults"
          :key="post.id"
          :post="normalizePost(post)"
          :highlight-term="searchQuery"
        />
        <div v-if="!postsLoading && postResults.length === 0" class="text-sm text-gray-500">No posts</div>
        <div class="mt-4" v-if="hasMorePosts">
          <button @click="loadMorePosts" :disabled="postsLoading" class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-60">
            <span v-if="!postsLoading">Load more</span>
            <span v-else class="flex items-center gap-2"><i class="fas fa-spinner fa-spin"></i> Loading...</span>
          </button>
        </div>
      </div>

      <!-- People Only -->
      <div v-else-if="activeFilter === 'people'" class="space-y-4">
        <div v-if="usersLoading" class="text-sm text-gray-500">Loading users...</div>
        <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
          <div
            v-for="person in userResults"
            :key="person.id"
            class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start space-x-3">
              <AvatarFallback
                :src="person.profile_image"
                :first-name="person.first_name || person.firstName"
                :last-name="person.last_name || person.lastName"
                custom-class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white cursor-pointer"
                @click="goToProfile(person)"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3
                      class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors"
                      v-html="highlightSearchTerm(displayUserName(person))"
                      @click="goToProfile(person)"
                    ></h3>
                    <!-- Username removed per request -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!usersLoading && userResults.length === 0" class="text-sm text-gray-500">No users</div>
        <div class="mt-4" v-if="hasMoreUsers">
          <button @click="loadMoreUsers" :disabled="usersLoading" class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-60">
            <span v-if="!usersLoading">Load more</span>
            <span v-else class="flex items-center gap-2"><i class="fas fa-spinner fa-spin"></i> Loading...</span>
          </button>
        </div>
      </div>

  <!-- News filter removed (legacy) -->

      <!-- Fandoms Only -->
      <div v-else-if="activeFilter === 'fandoms'" class="space-y-4">
        <div v-if="fandomsLoading" class="text-sm text-gray-500">Loading fandoms...</div>
        <div class="grid sm:grid-cols-2 gap-3 md:gap-4">
          <CommunityCard
            v-for="fandom in mappedFandomResults"
            :key="fandom.id"
            :fandom="fandom"
            :highlight-term="searchQuery"
          />
        </div>
        <div v-if="!fandomsLoading && fandomResults.length === 0" class="text-sm text-gray-500">No fandoms</div>
        <div class="mt-4" v-if="hasMoreFandoms">
          <button @click="loadMoreFandoms" :disabled="fandomsLoading" class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-60">
            <span v-if="!fandomsLoading">Load more</span>
            <span v-else class="flex items-center gap-2"><i class="fas fa-spinner fa-spin"></i> Loading...</span>
          </button>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="!isAnyLoading && aggregateCount === 0" class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try searching for something else</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import API_CONFIG from '@/config/api'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/store/search'
import Post from '@/components/common/Post.vue'
import { NewsPost } from '@/components/feed'
import { CommunityCard } from '@/components/fandom'
import AvatarFallback from '@/components/common/AvatarFallback.vue'

const route = useRoute()
const router = useRouter()
const activeFilter = ref('all')
const searchQuery = ref('')
const searchStore = useSearchStore()

// Expose reactive pieces from store
const userResults = computed(() => searchStore.userResults)
const usersLoading = computed(() => searchStore.usersLoading)
const postResults = computed(() => searchStore.postResults)
const postsLoading = computed(() => searchStore.postsLoading)
const fandomResults = computed(() => searchStore.fandomResults)
const fandomsLoading = computed(() => searchStore.fandomsLoading)
const hasMoreUsers = computed(() => searchStore.hasMoreUsers)
const hasMorePosts = computed(() => searchStore.hasMorePosts)
const hasMoreFandoms = computed(() => searchStore.hasMoreFandoms)

const aggregateCount = computed(() => userResults.value.length + postResults.value.length + fandomResults.value.length)
const isAnyLoading = computed(() => usersLoading.value || postsLoading.value || fandomsLoading.value)

// Map backend snake_case fields to camelCase ones consumed by FandomCard
const mappedFandomResults = computed(() => {
  return fandomResults.value.map(f => ({
    ...f,
    coverImage: f.cover_image || f.coverImage || f.image,
    logo: f.logo_image || f.logo || f.avatar || f.image,
    members: f.members_count || f.members || f.memberCount
  }))
})

const highlightSearchTerm = (text) => {
  if (!searchQuery.value || !text) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

async function performSearchServer() {
  const q = searchQuery.value.trim()
  if (!q) return resetResults()
  // Fire all three in parallel (users/posts/fandoms) with debounce 300ms for first page
  await Promise.all([
    searchStore.fetchUsers({ q, page: 1, limit: 10, debounce: 300 }),
    searchStore.fetchPosts({ q, page: 1, limit: 10 }, { debounce: 300 }),
    searchStore.fetchFandoms({ q, page: 1, limit: 10, debounce: 300 })
  ])
}

function resetResults() {
  searchStore.userResults = []
  searchStore.postResults = []
  searchStore.fandomResults = []
}

const goToProfile = (person) => {
  if (person?.id) {
    router.push({ name: 'Account', params: { user: String(person.id) } })
  } else if (person?.username) {
    router.push({ name: 'Account', params: { user: person.username } })
  }
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
  { key: 'people', label: 'Users' },
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
  searchQuery.value = newQuery || ''
  performSearchServer()
}, { immediate: true })

onMounted(() => {
  searchQuery.value = route.query.q || ''
  activeFilter.value = route.query.filter || 'all'
  performSearchServer()
})

function loadMoreUsers() {
  searchStore.fetchMoreUsers()
}
function loadMorePosts() {
  searchStore.fetchMorePosts()
}
function loadMoreFandoms() {
  searchStore.fetchMoreFandoms()
}

// Normalize backend post shape (raw search) to Post component expectations
function normalizePost(p) {
  if (!p) return p
  const user = p.user || {}

  // Build API origin (strip trailing /api) for relative media
  let base = (import.meta.env.VITE_API_BASE_URL || API_CONFIG.baseURL || '').trim()
  if (base.endsWith('/')) base = base.slice(0, -1)
  base = base.replace(/\/api$/i, '')

  const resolveMedia = (path) => {
    if (!path) return ''
    if (/^(https?:|data:|blob:)/i.test(path)) return path
    const cleaned = String(path).replace(/^\//, '')
    return base ? `${base}/${cleaned}` : cleaned
  }

  // Media array -> standardized objects
  const mediaArr = Array.isArray(p.media) ? p.media : []
  const media = mediaArr.map(m => {
    const src = typeof m === 'string' ? m : (m.url || m.path || m.src || '')
    const isVideo = /\.(mp4|webm|ogg)$/i.test(src)
    return { type: isVideo ? 'video' : 'image', url: resolveMedia(src) }
  })

  // Username fallback chain
  const username = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.full_name || user.username || 'User'

  // Likes / comments numeric
  const likes = Number(p.likes ?? p.likes_count ?? 0) || 0
  const comments = Number(p.comments ?? p.comments_count ?? 0) || 0

  return {
    id: p.id,
    username,
    avatar: resolveMedia(user.profile_image || user.avatar || user.profileImage),
    text: p.description || p.content || '',
    date: p.created_at || p.updated_at || new Date().toISOString(),
    media,
    tags: Array.isArray(p.tags) ? p.tags : [],
    likes,
    comments,
    isLiked: !!(p.is_liked || p.liked),
    fandom: p.fandom?.name || p.fandom_name || null,
    trending: !!p.trending
  }
}

function displayUserName(u) {
  return `${u.first_name || u.firstName || ''} ${u.last_name || u.lastName || ''}`.trim() || u.userName || 'User'
}
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
