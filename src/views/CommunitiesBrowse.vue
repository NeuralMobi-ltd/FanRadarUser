<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm px-4 sm:px-6 py-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Discover Fandoms</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Find your people and explore shared interests
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-80">
              <input 
                type="text" 
                v-model="search"
                placeholder="Search fandoms..." 
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl py-3 px-5 pl-12 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500 dark:placeholder-gray-400"
              />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
            </div>
            <button
              class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
              @click="$router.push('/create-fandom')"
            >
              <i class="fas fa-plus"></i>
              <span>Create Fandom</span>
            </button>
          </div>
        </div>

        <!-- Categories Filter -->
        <div class="overflow-x-auto">
          <div class="flex space-x-3 pb-2">
            <button 
              v-for="category in categories"
              :key="category.name"
              @click="activeCategory = category.name"
              class="px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 font-medium flex items-center gap-2 min-w-fit"
              :class="{
                [category.color + ' text-white shadow-lg']: activeCategory === category.name,
                'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600': activeCategory !== category.name
              }"
            >
              <i :class="category.icon" class="text-sm"></i>
              <span>{{ category.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Featured Banner -->
      <div v-if="activeCategory === 'All'" class="mb-12">
        <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl overflow-hidden p-8 text-white">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold mb-2">🔥 Trending Fandoms</h2>
                <p class="text-blue-100 mb-4">Join the most active fandoms this week</p>
                <div class="flex -space-x-2">
                  <img v-for="i in 5" :key="i" :src="`https://randomuser.me/api/portraits/men/${i + 10}.jpg`" class="w-8 h-8 rounded-full border-2 border-white" />
                  <div class="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold">+5K</div>
                </div>
              </div>
              <div class="hidden md:block">
                <div class="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-users text-4xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fandoms Grid -->
      <div v-if="filteredCommunities.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CommunityCard
            v-for="community in filteredCommunities"
            :key="community.title"
            :community="community"
            button-text="Join Fandom"
          />
        </div>

        <!-- Load More Button -->
        <div class="flex justify-center mt-12">
          <button class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            <i class="fas fa-plus"></i>
            Load More Fandoms
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center mb-6">
          <i class="fas fa-search text-4xl text-blue-500"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No fandoms found</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
          We couldn't find any fandoms matching your search. Try different keywords or create your own fandom to get started.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            @click="search = ''; activeCategory = 'All'"
          >
            Clear Filters
          </button>
          <button
            class="border border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 py-3 rounded-xl font-medium transition-colors"
            @click="$router.push('/create-fandom')"
          >
            Create a Fandom
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommunityCard from '@/components/CommunityCard.vue'

const search = ref('')
const activeCategory = ref('All')

const categories = ref([
  { name: 'All', color: 'bg-blue-600', icon: 'fas fa-star' },
  { name: 'News', color: 'bg-red-600', icon: 'fas fa-newspaper' },
  { name: 'Art', color: 'bg-purple-600', icon: 'fas fa-palette' },
  { name: 'Gaming', color: 'bg-green-600', icon: 'fas fa-gamepad' },
  { name: 'Music', color: 'bg-pink-600', icon: 'fas fa-music' },
  { name: 'Movies', color: 'bg-yellow-600', icon: 'fas fa-film' },
  { name: 'TV Shows', color: 'bg-indigo-600', icon: 'fas fa-tv' },
  { name: 'Books', color: 'bg-amber-600', icon: 'fas fa-book' },
  { name: 'Technology', color: 'bg-gray-600', icon: 'fas fa-laptop' },
  { name: 'Science', color: 'bg-teal-600', icon: 'fas fa-microscope' },
  { name: 'Sports', color: 'bg-orange-600', icon: 'fas fa-futbol' },
  { name: 'Fashion', color: 'bg-rose-600', icon: 'fas fa-tshirt' }
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
    image: 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg', 
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
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>