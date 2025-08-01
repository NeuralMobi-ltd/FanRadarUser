<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Hashtag Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-3xl mr-5">
            {{ hashtagIcon }}
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              #{{ hashtagName }}
            </h1>
            <div class="flex items-center text-gray-600 dark:text-gray-300">
              <span>{{ hashtagStats.posts }} posts</span>
              <span class="mx-2">•</span>
              <span>{{ hashtagStats.growth }}% growth this week</span>
            </div>
          </div>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Follow
        </button>
      </div>
    </div>

    <!-- Filter Options -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Latest
        </button>
        <button class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Popular
        </button>
        <button class="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Media
        </button>
      </div>
      
      <div class="relative">
        <input type="text" placeholder="Search in hashtag" class="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Posts Grid -->
    <div class="space-y-6">
      <div v-for="post in posts" :key="post.id" 
           class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
        <!-- Post header with user info -->
        <div class="flex items-start space-x-3 mb-4">
          <img :src="post.userAvatar" :alt="post.username" class="w-10 h-10 rounded-full">
          <div>
            <div class="flex items-center">
              <h4 class="font-semibold text-gray-900 dark:text-white">{{ post.username }}</h4>
              <span class="mx-2 text-gray-400">•</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ post.communityName }}</p>
          </div>
        </div>
        
        <!-- Post content -->
        <p class="text-gray-800 dark:text-gray-200 mb-4">
          {{ post.content }}
          <span class="text-blue-600 dark:text-blue-400 font-medium">#{{ hashtagName }}</span>
        </p>
        
        <!-- Post image if any -->
        <img v-if="post.image" :src="post.image" :alt="post.content" class="w-full h-96 object-cover rounded-lg mb-4">
        
        <!-- Post actions -->
        <div class="flex items-center justify-between text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <button class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {{ post.likes }}
            </button>
            <button class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
              {{ post.comments }}
            </button>
          </div>
          <button class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>

    <!-- Related Hashtags -->
    <div class="mt-10">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Hashtags</h3>
      <div class="flex flex-wrap gap-3">
        <router-link 
          v-for="tag in relatedHashtags" 
          :key="tag.name"
          :to="`/hashtag/${tag.name}`"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          #{{ tag.name }}
        </router-link>
      </div>
    </div>

    <!-- Load More Button -->
    <div class="flex justify-center mt-10">
      <button class="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
        Load More Posts
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hashtagName = computed(() => route.params.hashtag || '')

// Hashtag statistics
const hashtagStats = ref({
  posts: '0',
  growth: '0'
})

// Hashtag icon based on name
const hashtagIcon = computed(() => {
  const iconMap = {
    'LoLPhase5': '🎮',
    'LoLWorlds': '🏆',
    'Swifties': '🎵',
    'AnimeSpring2024': '🌸',
    'MarvelPhase6': '🦸',
    'KPopComeback': '✨',
    'GameOfThrones2024': '🐉',
    'NintendoDirect': '🎮',
    'SportNews': '⚽',
    'TechInnovation': '💻',
    'MovieNight': '🎬',
    'BookClub': '📚'
  }
  
  return iconMap[hashtagName.value] || '#️⃣'
})

// Mock data for posts
const posts = ref([
  {
    id: 1,
    username: 'GamerPro',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2h ago',
    communityName: 'League of Legends',
    content: 'Just saw the latest champion reveal for LoLPhase5 and I\'m absolutely hyped! The abilities look game-changing and might shift the entire meta.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
    likes: 234,
    comments: 56
  },
  {
    id: 2,
    username: 'EsportsAnalyst',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '5h ago',
    communityName: 'Esports Central',
    content: 'Breaking down the new map changes in LoLPhase5 - the jungle pathing is completely different now, which will heavily favor early game junglers and aggressive playstyles.',
    image: null,
    likes: 189,
    comments: 43
  },
  {
    id: 3,
    username: 'LeagueStreamer',
    userAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    date: '1d ago',
    communityName: 'League of Legends',
    content: 'Just hit Challenger with the new champion! Going to stream a full breakdown of optimal builds and combos tonight at 8PM EST. LoLPhase5 has completely revitalized my passion for the game!',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
    likes: 312,
    comments: 89
  },
  {
    id: 4,
    username: 'CompetitiveGamer',
    userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    date: '2d ago',
    communityName: 'Pro Gaming',
    content: 'My predictions for how LoLPhase5 will impact Worlds: Korean teams will adapt faster to the new meta, but Chinese teams might have the edge in the semifinals due to their mechanical prowess with the new champions.',
    image: null,
    likes: 276,
    comments: 67
  }
])

// Related hashtags
const relatedHashtags = ref([
  { name: 'LoLWorlds', posts: '897K' },
  { name: 'ProGaming', posts: '452K' },
  { name: 'Esports', posts: '1.2M' },
  { name: 'RiotGames', posts: '678K' },
  { name: 'LeagueOfLegends', posts: '3.4M' },
  { name: 'Gaming', posts: '5.7M' }
])

// Load hashtag data
onMounted(() => {
  // Here you would typically fetch actual data based on the hashtag
  console.log(`Loading data for hashtag: ${hashtagName.value}`)
  
  // Set mock stats based on hashtag
  const statMap = {
    'LoLPhase5': { posts: '2.3M', growth: '24' },
    'LoLWorlds': { posts: '897K', growth: '18' },
    'Swifties': { posts: '3.1M', growth: '32' },
    'AnimeSpring2024': { posts: '1.8M', growth: '15' },
    'MarvelPhase6': { posts: '2.1M', growth: '28' },
    'KPopComeback': { posts: '1.6M', growth: '22' },
    'GameOfThrones2024': { posts: '945K', growth: '19' },
    'NintendoDirect': { posts: '1.2M', growth: '12' }
  }
  
  hashtagStats.value = statMap[hashtagName.value] || { posts: '500K', growth: '10' }
  
  // Load posts for specific hashtag
  // In a real app, you would fetch from an API
  if (hashtagName.value !== 'LoLPhase5') {
    posts.value = [
      {
        id: 1,
        username: 'HashtagFan',
        userAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        date: '3h ago',
        communityName: 'Trending Topics',
        content: `This is a post about the ${hashtagName.value} hashtag. It's currently trending across the platform!`,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
        likes: 145,
        comments: 32
      },
      {
        id: 2,
        username: 'TrendWatcher',
        userAvatar: 'https://randomuser.me/api/portraits/women/24.jpg',
        date: '6h ago',
        communityName: 'Hot Topics',
        content: `My thoughts on the whole ${hashtagName.value} situation. I think it's going to change everything we know about the industry.`,
        image: null,
        likes: 98,
        comments: 24
      }
    ]
  }
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
