<template>
  <div class="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white left-0 transition-colors duration-200">
    <!-- Header -->
    <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-5 bg-white dark:bg-black">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Browse communities</h1>
        <div class="flex items-center gap-5">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search communities..." 
              class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full py-2.5 px-5 pl-11 text-gray-900 dark:text-white text-sm w-72 outline-none focus:border-blue-500 transition-colors placeholder-gray-400 dark:placeholder-gray-500"
            />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm"></i>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            @click="$router.push('/create-fandom')"
          >
            Create a fandom
          </button>
        </div>
      </div>
    </div>

    <!-- Communities Grid -->
    <div class="px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Community Cards -->
        <div 
          v-for="(community, index) in communities" 
          :key="index"
          class="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          @click="navigateToCommunity(community.title)"
        >
          <!-- Background Image -->
          <div 
            class="aspect-[4/3] bg-cover bg-center bg-no-repeat"
            :style="{ 
              backgroundImage: `url(${community.image})`,
              backgroundColor: community.fallbackColor || '#4a5568'
            }"
          >
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <h3 class="text-white font-bold text-xl mb-2 leading-tight">{{ community.title }}</h3>
              <p v-if="community.description" class="text-gray-200 text-sm leading-snug mb-2">{{ community.description }}</p>
              <div v-if="community.memberCount" class="text-gray-300 text-sm font-medium">
                {{ community.memberCount }} members
              </div>
            </div>
          </div>
        </div>

        <!-- More Communities Cards (smaller ones like in Tumblr) -->
        <div 
          v-for="(smallCommunity, index) in smallCommunities" 
          :key="`small-${index}`"
          class="group relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
          @click="navigateToCommunity(smallCommunity.title)"
        >
          <div 
            class="aspect-[4/3] bg-cover bg-center bg-no-repeat"
            :style="{ 
              backgroundImage: `url(${smallCommunity.image})`,
              backgroundColor: smallCommunity.fallbackColor || '#4a5568'
            }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-3">
              <h3 class="text-white font-bold text-base">{{ smallCommunity.title }}</h3>
              <div v-if="smallCommunity.memberCount" class="text-gray-400 text-xs mt-1">
                {{ smallCommunity.memberCount }} members
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-8">
        <button class="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
          Load more communities
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Main communities data (larger cards like in Tumblr)
const communities = ref([
  { 
    title: 'Aesthetic', 
    description: 'Beautiful visuals and artistic content',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    memberCount: '1.2M',
    fallbackColor: '#8B4513' 
  },
  { 
    title: 'Anime', 
    description: 'All things anime and manga',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    memberCount: '980K',
    fallbackColor: '#FF6B6B' 
  },
  { 
    title: 'Books & Literature', 
    description: 'Reading recommendations and book discussions',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    memberCount: '756K',
    fallbackColor: '#8B4513' 
  },
  { 
    title: 'Culture', 
    description: 'Cultural discussions and perspectives',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
    memberCount: '432K',
    fallbackColor: '#4ECDC4' 
  },
  { 
    title: 'Art', 
    description: 'Original artwork and creative expression',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
    memberCount: '1.5M',
    fallbackColor: '#95E1D3' 
  },
  { 
    title: 'Community Spotlight', 
    description: 'Featured communities and creators',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    memberCount: '245K',
    fallbackColor: '#F38BA8' 
  },
  { 
    title: 'Movies', 
    description: 'Film reviews and movie discussions',
    image: 'https://images.unsplash.com/photo-1489599809467-6e5d9b55f80d?auto=format&fit=crop&w=800&q=80',
    memberCount: '678K',
    fallbackColor: '#FFD93D' 
  },
  { 
    title: 'Music', 
    description: 'Music discovery and artist appreciation',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    memberCount: '892K',
    fallbackColor: '#6BCF7F' 
  }
])

// Additional smaller communities
const smallCommunities = ref([
  { 
    title: 'Gaming', 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    memberCount: '1.1M',
    fallbackColor: '#8B5CF6' 
  },
  { 
    title: 'Photography', 
    image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80',
    memberCount: '534K',
    fallbackColor: '#EC4899' 
  },
  { 
    title: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    memberCount: '423K',
    fallbackColor: '#F59E0B' 
  },
  { 
    title: 'Science', 
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    memberCount: '267K',
    fallbackColor: '#10B981' 
  },
  { 
    title: 'Food', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80',
    memberCount: '789K',
    fallbackColor: '#F97316' 
  },
  { 
    title: 'Travel', 
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    memberCount: '612K',
    fallbackColor: '#06B6D4' 
  },
  { 
    title: 'Cats', 
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    memberCount: '945K',
    fallbackColor: '#EF4444' 
  },
  { 
    title: 'Memes', 
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80',
    memberCount: '1.3M',
    fallbackColor: '#8B5CF6' 
  }
])

// Navigation function
const navigateToCommunity = (communityName) => {
  router.push({ name: 'Community', params: { name: communityName.toLowerCase() } })
}
</script>

<style scoped>
/* Remove custom dark/light CSS, use Tailwind classes only */

/* Community card hover effects */
.group:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

/* Gradient overlays for better text readability */
.bg-gradient-to-t {
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 20%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.1) 60%,
    transparent 100%
  );
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: theme('colors.gray.800');
}

::-webkit-scrollbar-thumb {
  background: theme('colors.gray.600');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.gray.500');
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}

/* Smooth transitions for interactive elements */
button {
  transition: all 0.2s ease;
}

/* Focus states for accessibility */
button:focus {
  outline: 2px solid theme('colors.blue.500');
  outline-offset: 2px;
}

input:focus {
  outline: none;
  border-color: theme('colors.blue.500');
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Community card image loading states */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Text shadow for better readability on images */
.text-white {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Dark mode specific styles */
.dark .min-h-screen {
  background: theme('colors.gray.900');
  color: theme('colors.white');
}

.dark .bg-gray-900 {
  background-color: theme('colors.gray.800') !important;
}

.dark .text-white {
  color: theme('colors.gray.900') !important;
  text-shadow: none;
}

.dark .border-gray-700 {
  border-color: theme('colors.gray.600') !important;
}

.dark .bg-gray-800 {
  background-color: theme('colors.gray.900') !important;
}

.dark .border-gray-600 {
  border-color: theme('colors.gray.500') !important;
}

.dark .placeholder-gray-400 {
  color: theme('colors.gray.300') !important;
}

.dark .text-gray-400 {
  color: theme('colors.gray.300') !important;
}

.dark .text-gray-300 {
  color: theme('colors.gray.200') !important;
}

/* Dark mode button styles */
.dark .bg-blue-500 {
  background-color: theme('colors.blue.500') !important;
}

.dark .hover\:bg-blue-600:hover {
  background-color: theme('colors.blue.600') !important;
}

.dark .hover\:bg-gray-700:hover {
  background-color: theme('colors.gray.700') !important;
}
</style>