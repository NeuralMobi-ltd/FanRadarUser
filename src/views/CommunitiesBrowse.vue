<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 sm:px-6 py-4">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Discover Communities</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Find your people and explore shared interests
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
          <div class="relative w-full sm:w-72">
            <input 
              type="text" 
              v-model="search"
              placeholder="Search communities..." 
              class="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2.5 px-5 pl-11 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500 dark:placeholder-gray-400"
            />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm"></i>
          </div>
          <button
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2"
            @click="$router.push('/create-fandom')"
          >
            <i class="fas fa-plus text-sm"></i>
            <span>Create Community</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <!-- Categories Filter -->
      <div class="mb-6 overflow-x-auto">
        <div class="flex space-x-2 pb-2">
          <button 
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            class="px-4 py-2 rounded-full whitespace-nowrap transition-colors"
            :class="{
              'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300': activeCategory === category,
              'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700': activeCategory !== category
            }"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Featured News Section -->
      <div v-if="activeCategory === 'News' || activeCategory === 'All'" class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i class="fas fa-newspaper text-red-500"></i>
          <span>Featured News Communities</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="community in newsCommunities"
            :key="community.title"
            class="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-500/20"
            @click="$router.push(`/f/${community.handle}`)"
          >
            <div 
              class="aspect-[4/3] bg-cover bg-center bg-no-repeat relative"
              :style="{ backgroundImage: `url(${community.image})`, backgroundColor: community.fallbackColor }"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>{{ community.onlineCount }} online</span>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden">
                    <img :src="community.avatar" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 class="text-white font-bold text-lg mb-1 leading-tight">{{ community.title }}</h3>
                    <p class="text-gray-200 text-sm line-clamp-2 mb-2">
                      {{ community.description }}
                    </p>
                    <div class="flex items-center text-gray-300 text-xs font-medium gap-3">
                      <span>{{ community.memberCount }} members</span>
                      <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{{ community.postCount }} posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Breaking News
            </div>
          </div>
        </div>
      </div>

      <!-- Communities Grid -->
      <div v-if="filteredCommunities.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="community in filteredCommunities"
          :key="community.title"
          class="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-500/20"
          @click="$router.push(`/f/${community.handle}`)"
        >
          <div 
            class="aspect-[4/3] bg-cover bg-center bg-no-repeat relative"
            :style="{ backgroundImage: `url(${community.image})`, backgroundColor: community.fallbackColor }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>{{ community.onlineCount }} online</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden">
                  <img :src="community.avatar" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="text-white font-bold text-lg mb-1 leading-tight">{{ community.title }}</h3>
                  <p class="text-gray-200 text-sm line-clamp-2 mb-2">
                    {{ community.description }}
                  </p>
                  <div class="flex items-center text-gray-300 text-xs font-medium gap-3">
                    <span>{{ community.memberCount }} members</span>
                    <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{{ community.postCount }} posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="community.category === 'News'" class="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            News
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <i class="fas fa-users text-3xl text-gray-400 dark:text-gray-600"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No communities found</h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">
          We couldn't find any communities matching your search. Try different keywords or create your own community.
        </p>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
          @click="$router.push('/create-fandom')"
        >
          Create a Community
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCommunities.length > 0" class="mt-8 flex items-center justify-center gap-2">
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <i class="fas fa-chevron-left text-sm"></i>
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium">
          1
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          2
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          3
        </button>
        <span class="px-2 text-gray-500 dark:text-gray-400">...</span>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          8
        </button>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <i class="fas fa-chevron-right text-sm"></i>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const activeCategory = ref('All')

const categories = ref([
  'All',
  'News',
  'Art',
  'Gaming',
  'Music',
  'Movies',
  'TV Shows',
  'Books',
  'Technology',
  'Science',
  'Sports',
  'Fashion'
])

const newsCommunities = ref([
  { 
    title: 'World News Network', 
    handle: 'world-news',
    description: 'Global news coverage and discussions about current events', 
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c7e9?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    memberCount: '1.8M', 
    postCount: '320K',
    onlineCount: '5.2K',
    fallbackColor: '#1a365d',
    tags: ['news', 'world', 'current events'],
    category: 'News'
  },
  { 
    title: 'Tech Today', 
    handle: 'tech-today',
    description: 'Latest technology news and gadget reviews', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
    memberCount: '1.2M', 
    postCount: '245K',
    onlineCount: '3.8K',
    fallbackColor: '#2d3748',
    tags: ['tech', 'gadgets', 'innovation'],
    category: 'News'
  },
  { 
    title: 'Business Insights', 
    handle: 'business',
    description: 'Financial markets, business trends and economic analysis', 
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    memberCount: '890K', 
    postCount: '156K',
    onlineCount: '2.7K',
    fallbackColor: '#4a5568',
    tags: ['business', 'finance', 'economy'],
    category: 'News'
  }
])

const communities = ref([
  ...newsCommunities.value,
  { 
    title: 'Aesthetic', 
    handle: 'aesthetic',
    description: 'Beautiful visuals and artistic content from around the world', 
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    memberCount: '1.2M', 
    postCount: '245K',
    onlineCount: '3.4K',
    fallbackColor: '#8B4513',
    tags: ['art', 'photography', 'design'],
    category: 'Art'
  },
  { 
    title: 'Anime & Manga', 
    handle: 'anime',
    description: 'All things anime and manga - discussions, fan art, and more', 
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    memberCount: '980K', 
    postCount: '178K',
    onlineCount: '2.8K',
    fallbackColor: '#FF6B6B',
    tags: ['anime', 'manga', 'japan'],
    category: 'Gaming'
  },
  { 
    title: 'Digital Art', 
    handle: 'digital-art',
    description: 'Showcase your digital creations and get inspired by others', 
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    memberCount: '1.5M', 
    postCount: '320K',
    onlineCount: '4.1K',
    fallbackColor: '#95E1D3',
    tags: ['art', 'digital', 'illustration'],
    category: 'Art'
  },
  { 
    title: 'Community Spotlight', 
    handle: 'spotlight',
    description: 'Featured communities and creators worth checking out', 
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    memberCount: '245K', 
    postCount: '45K',
    onlineCount: '1.2K',
    fallbackColor: '#F38BA8',
    tags: ['featured', 'spotlight'],
    category: 'All'
  },
  { 
    title: 'Book Lovers', 
    handle: 'books',
    description: 'Reading recommendations and book discussions for all genres', 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    memberCount: '756K', 
    postCount: '89K',
    onlineCount: '2.3K',
    fallbackColor: '#8B4513',
    tags: ['books', 'reading', 'literature'],
    category: 'Books'
  },
  { 
    title: 'World Cultures', 
    handle: 'cultures',
    description: 'Explore and discuss different cultures from around the globe', 
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    memberCount: '432K', 
    postCount: '67K',
    onlineCount: '1.5K',
    fallbackColor: '#4ECDC4',
    tags: ['culture', 'travel', 'world'],
    category: 'Culture'
  },
  { 
    title: 'Film Buffs', 
    handle: 'movies',
    description: 'Film reviews, movie discussions, and cinema appreciation', 
    image: 'https://images.unsplash.com/photo-1489599809467-6e5d9b55f80d?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    memberCount: '678K', 
    postCount: '112K',
    onlineCount: '2.1K',
    fallbackColor: '#FFD93D',
    tags: ['movies', 'film', 'cinema'],
    category: 'Movies'
  },
  { 
    title: 'Music Discovery', 
    handle: 'music',
    description: 'Share and discover new music across all genres', 
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80', 
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    memberCount: '892K', 
    postCount: '156K',
    onlineCount: '3.2K',
    fallbackColor: '#6BCF7F',
    tags: ['music', 'discovery', 'artists'],
    category: 'Music'
  }
])

const filteredCommunities = computed(() => {
  let results = communities.value
  
  // Filter by search query
  if (search.value.trim()) {
    const query = search.value.toLowerCase()
    results = results.filter(c =>
      c.title.toLowerCase().includes(query) ||
      (c.description && c.description.toLowerCase().includes(query)) ||
      (c.tags && c.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  // Filter by category
  if (activeCategory.value !== 'All') {
    results = results.filter(c => 
      c.category === activeCategory.value ||
      (c.tags && c.tags.some(tag => 
        tag.toLowerCase().includes(activeCategory.value.toLowerCase())
      ))
    )
  }
  
  return results
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>