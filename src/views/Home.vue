<template>
  <div class="flex min-h-screen bg-black text-white">
    <!-- Main Feed -->
    <main class="flex-1 flex flex-col mx-auto max-w-2xl w-full">
      <!-- Stories/News Ticker -->
      <div class="flex gap-2 p-2 overflow-x-auto scrollbar-hide bg-[#121212]">
        <div v-for="(story, index) in trendingNews" :key="index" 
             class="flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden relative group">
          <img :src="story.image" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-xs font-medium truncate">{{ story.title }}</p>
          </div>
          <div v-if="story.breaking" class="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 rounded">
            BREAKING
          </div>
        </div>
      </div>
      
      <!-- Compact Tabs -->
      <div class="flex border-b border-[#2a2a2a] sticky top-0 bg-black z-10">
        <button
          v-for="(tabItem, idx) in tabs"
          :key="idx"
          class="flex-1 py-3 text-sm font-medium relative"
          :class="activeTab === idx ? 'text-white' : 'text-gray-400 hover:text-white'"
          @click="activeTab = idx"
        >
          {{ tabItem }}
          <span v-if="activeTab === idx" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full"></span>
        </button>
      </div>
      
      <!-- Posts Feed -->
      <div class="flex flex-col">
        <!-- Create Post - Compact -->
        <div class="p-3 border-b border-[#2a2a2a]">
          <div class="flex items-center gap-2">
            <img :src="currentUser.avatar" class="w-8 h-8 rounded-full" />
            <input 
              type="text" 
              placeholder="What's happening?"
              class="flex-1 bg-[#2a2a2a] rounded-full px-4 py-2 text-sm focus:outline-none"
              @click="showPostModal = true"
            />
          </div>
          <div class="flex justify-between mt-2 px-2">
            <div class="flex gap-4">
              <button class="text-blue-400 text-sm flex items-center gap-1">
                <i class="fas fa-image text-xs"></i>
                <span>Media</span>
              </button>
              <button class="text-green-400 text-sm flex items-center gap-1">
                <i class="fas fa-link text-xs"></i>
                <span>Link</span>
              </button>
            </div>
            <button class="text-xs bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full">
              Post
            </button>
          </div>
        </div>

        <!-- Posts - Compact Design -->
        <div v-for="post in filteredPosts" :key="post.id" class="p-3 border-b border-[#2a2a2a] hover:bg-[#121212] transition-colors">
          <!-- News Type Post -->
          <div v-if="post.type === 'news'" class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <span class="font-bold text-blue-400">{{ post.source }}</span>
              <span class="text-gray-400">· {{ post.time }}</span>
              <button class="ml-auto text-gray-400 hover:text-white">
                <i class="fas fa-ellipsis-h text-sm"></i>
              </button>
            </div>
            <div class="flex gap-3">
              <div class="flex-1">
                <h3 class="font-medium">{{ post.title }}</h3>
                <p class="text-sm text-gray-400 mt-1 line-clamp-2">{{ post.summary }}</p>
                <div class="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>{{ post.views }} views</span>
                  <span>{{ post.comments }} comments</span>
                </div>
              </div>
              <img :src="post.image" class="w-20 h-20 object-cover rounded-lg" />
            </div>
          </div>
          
          <!-- Regular Post -->
          <div v-else class="space-y-2">
            <div class="flex items-center gap-2">
              <img :src="post.avatar" class="w-8 h-8 rounded-full" />
              <div class="flex-1">
                <span class="font-bold text-sm">{{ post.username }}</span>
                <span class="text-gray-400 text-xs ml-2">{{ post.date }}</span>
              </div>
              <button class="text-gray-400 hover:text-white">
                <i class="fas fa-ellipsis-h text-sm"></i>
              </button>
            </div>
            
            <p class="text-sm">{{ post.text }}</p>
            
            <div v-if="post.image" class="mt-2">
              <img :src="post.image" class="w-full rounded-lg" />
            </div>
            
            <div class="flex justify-between mt-2 text-xs text-gray-400">
              <button class="flex items-center gap-1 hover:text-blue-400">
                <i class="far fa-comment"></i>
                <span>{{ post.comments }}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-green-400">
                <i class="fas fa-retweet"></i>
                <span>{{ post.shares }}</span>
              </button>
              <button 
                class="flex items-center gap-1"
                :class="{'text-red-500': post.liked, 'hover:text-red-400': !post.liked}"
                @click="post.liked = !post.liked"
              >
                <i class="far fa-heart"></i>
                <span>{{ post.likes + (post.liked ? 1 : 0) }}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-blue-400">
                <i class="far fa-share-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Right Sidebar - Compact -->
    <aside class="hidden lg:block w-80 border-l border-[#2a2a2a] p-3 overflow-y-auto sticky top-0 h-screen">
      <!-- Trending Now -->
      <div class="bg-[#121212] rounded-lg p-3 mb-3">
        <h3 class="font-bold text-sm mb-2">Trending Now</h3>
        <div class="space-y-3">
          <div v-for="(trend, idx) in trendingTopics" :key="idx" class="text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">{{ idx + 1 }} · {{ trend.category }}</span>
              <button class="text-gray-400 hover:text-white">
                <i class="fas fa-ellipsis-h text-xs"></i>
              </button>
            </div>
            <p class="font-medium">{{ trend.title }}</p>
            <p class="text-xs text-gray-400">{{ trend.posts }} posts</p>
          </div>
        </div>
      </div>
      
      <!-- Who to follow -->
      <div class="bg-[#121212] rounded-lg p-3">
        <h3 class="font-bold text-sm mb-2">Who to follow</h3>
        <div class="space-y-3">
          <div v-for="user in suggestedUsers" :key="user.id" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="user.avatar" class="w-8 h-8 rounded-full" />
              <div>
                <p class="text-sm font-medium">{{ user.name }}</p>
                <p class="text-xs text-gray-400">@{{ user.username }}</p>
              </div>
            </div>
            <button 
              class="text-xs px-3 py-1 rounded-full"
              :class="user.following ? 'bg-transparent border border-gray-600 text-white' : 'bg-white text-black'"
              @click="user.following = !user.following"
            >
              {{ user.following ? 'Following' : 'Follow' }}
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Post Modal -->
    <div v-if="showPostModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <!-- Modal content remains the same -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref(0)
const tabs = ref(['For You', 'Following', 'News', 'Sports', 'Tech'])
const showPostModal = ref(false)

const currentUser = ref({
  username: 'yassineelaouni',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const posts = ref([
  {
    id: 1,
    type: 'post',
    username: 'techupdates',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    date: '2h ago',
    text: 'Just tried the new AI coding assistant - it completely changed my workflow! Anyone else using it? #programming #AI',
    image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=500',
    likes: 42,
    comments: 8,
    shares: 3,
    liked: false
  },
  {
    id: 2,
    type: 'news',
    source: 'TechCrunch',
    time: '45m ago',
    title: 'Apple announces new AI features coming to iOS 18',
    summary: 'The new update will include on-device AI processing for enhanced privacy and several new Siri capabilities.',
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500',
    views: '12.4K',
    comments: 342
  },
  {
    id: 3,
    type: 'post',
    username: 'travelbug',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: '5h ago',
    text: 'Sunset views in Santorini never get old. Where should I travel next?',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
    likes: 128,
    comments: 24,
    shares: 7,
    liked: false
  },
  {
    id: 4,
    type: 'news',
    source: 'BBC News',
    time: '1h ago',
    title: 'Scientists discover potential breakthrough in quantum computing',
    summary: 'New research suggests a way to maintain quantum coherence for significantly longer periods.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
    views: '8.7K',
    comments: 213
  }
])

const trendingNews = ref([
  {
    title: 'Stock markets hit record high',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500',
    breaking: true
  },
  {
    title: 'New Marvel movie trailer drops',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500'
  },
  {
    title: 'World Cup qualifiers tonight',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500'
  },
  {
    title: 'Tech conference starts tomorrow',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500'
  }
])

const trendingTopics = ref([
  { category: 'Technology', title: '#WWDC2024', posts: '245K' },
  { category: 'Sports', title: '#UEFAChampionsLeague', posts: '189K' },
  { category: 'Business', title: '#StockMarket', posts: '112K' },
  { category: 'Entertainment', title: '#NewMovieReleases', posts: '98K' }
])

const suggestedUsers = ref([
  {
    id: 1,
    name: 'NASA',
    username: 'nasa',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500',
    following: false
  },
  {
    id: 2,
    name: 'Elon Musk',
    username: 'elonmusk',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500',
    following: false
  },
  {
    id: 3,
    name: 'NatGeo',
    username: 'natgeo',
    avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=500',
    following: false
  }
])

const filteredPosts = computed(() => {
  // Filter logic based on active tab
  return posts.value
})
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>