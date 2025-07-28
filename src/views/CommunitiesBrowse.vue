<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-5 bg-white dark:bg-black">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Browse communities</h1>
        <div class="flex items-center gap-5">
          <div class="relative">
            <input 
              type="text" 
              v-model="search"
              placeholder="Search communities..." 
              class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-2.5 px-5 pl-11 text-gray-900 dark:text-white text-sm w-72 outline-none focus:border-blue-500 transition-colors placeholder-gray-400 dark:placeholder-gray-500"
            />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm"></i>
          </div>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
            Create a community
          </button>
        </div>
      </div>
    </div>
    <!-- Communities Grid -->
    <div class="px-4 py-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="community in filteredCommunities"
          :key="community.title"
          class="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <div 
            class="aspect-[4/3] bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${community.image})`, backgroundColor: community.fallbackColor }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <h3 class="text-white font-bold text-xl mb-2 leading-tight">{{ community.title }}</h3>
              <p v-if="community.description" class="text-gray-200 text-sm leading-snug mb-2">{{ community.description }}</p>
              <div v-if="community.memberCount" class="text-gray-300 text-sm font-medium">
                {{ community.memberCount }} members
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const communities = ref([
  { title: 'Aesthetic', description: 'Beautiful visuals and artistic content', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', memberCount: '1.2M', fallbackColor: '#8B4513' },
  { title: 'Anime', description: 'All things anime and manga', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80', memberCount: '980K', fallbackColor: '#FF6B6B' },
  { title: 'Art', description: 'Original artwork and creative expression', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80', memberCount: '1.5M', fallbackColor: '#95E1D3' },
  { title: 'Community Spotlight', description: 'Featured communities and creators', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', memberCount: '245K', fallbackColor: '#F38BA8' },
  { title: 'Books & Literature', description: 'Reading recommendations and book discussions', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80', memberCount: '756K', fallbackColor: '#8B4513' },
  { title: 'Culture', description: 'Cultural discussions and perspectives', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80', memberCount: '432K', fallbackColor: '#4ECDC4' },
  { title: 'Movies', description: 'Film reviews and movie discussions', image: 'https://images.unsplash.com/photo-1489599809467-6e5d9b55f80d?auto=format&fit=crop&w=800&q=80', memberCount: '678K', fallbackColor: '#FFD93D' },
  { title: 'Music', description: 'Music discovery and artist appreciation', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80', memberCount: '892K', fallbackColor: '#6BCF7F' }
])

const filteredCommunities = computed(() => {
  if (!search.value.trim()) return communities.value
  const query = search.value.toLowerCase()
  return communities.value.filter(c =>
    c.title.toLowerCase().includes(query) ||
    (c.description && c.description.toLowerCase().includes(query))
  )
})
</script>

<style scoped>
/* ...use Tailwind for most styling... */
.group:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
.bg-gradient-to-t {
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 20%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.1) 60%,
    transparent 100%
  );
}
</style>
