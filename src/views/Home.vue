<template>
  <div class="flex min-h-screen bg-black text-white">
    <!-- Main Content -->
    <div class="flex-1 max-w-2xl mx-auto p-4">
      <!-- Stories/News Ticker -->
      <div class="flex gap-3 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <div 
          v-for="(story, idx) in trendingStories" 
          :key="idx" 
          class="flex-shrink-0 w-28 h-36 rounded-xl overflow-hidden relative group cursor-pointer hover:scale-105 transition-transform"
        >
          <img :src="story.image" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-xs font-medium truncate">{{ story.title }}</p>
          </div>
          <div v-if="story.live" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 rounded-full flex items-center">
            <span class="relative flex h-2 w-2 mr-1">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE
          </div>
        </div>
      </div>

      <!-- Create Post -->
      <div class="bg-[#181c23] rounded-xl p-3 mb-4 border border-gray-700">
        <div class="flex items-center gap-2">
          <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" />
          <input 
            type="text" 
            placeholder="What's happening?"
            class="flex-1 bg-[#232b3e] border-none rounded-full px-4 py-2 text-sm text-white focus:outline-none"
            @click="showPostModal = true"
          />
        </div>
        <div class="flex justify-between mt-3 px-1">
          <div class="flex gap-4">
            <button class="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              <i class="fas fa-image"></i>
              <span class="hidden sm:inline">Media</span>
            </button>
            <button class="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
              <i class="fas fa-poll"></i>
              <span class="hidden sm:inline">Poll</span>
            </button>
          </div>
          <button class="text-xs bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full">
            Post
          </button>
        </div>
      </div>

      <!-- Content Feed -->
      <div class="space-y-4">
        <!-- Breaking News Post -->
        <NewsPost :news="{
          id: 101,
          source: 'BBC Breaking',
          sourceLogo: 'https://logo.clearbit.com/bbc.com',
          title: 'Major earthquake strikes Pacific region',
          summary: 'A 7.8 magnitude earthquake has hit the Pacific islands, triggering tsunami warnings across the region.',
          image: 'https://images.unsplash.com/photo-1506259091721-347e791bab0f',
          date: new Date(Date.now() - 3600000 * 1), // 1 hour ago
          views: '42.8K',
          comments: 892,
          breaking: true
        }" />

        <!-- Popular Post -->
        <Post :post="{
          id: 101,
          username: 'tech_enthusiast',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          date: new Date(Date.now() - 3600000 * 3), // 3 hours ago
          text: 'Just upgraded to the new AI assistant - it can now write full code modules! The auto-debugging feature is a game changer for developers. #AI #Programming',
          image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
          tags: ['AI', 'Programming', 'Tech'],
          likes: 1243,
          comments: 287
        }" />

        <!-- News Post -->
        <NewsPost :news="{
          id: 102,
          source: 'Tech Today',
          sourceLogo: 'https://logo.clearbit.com/techtoday.com',
          title: 'Microsoft unveils new Copilot+ PCs with AI acceleration',
          summary: 'New laptop line features neural processing units capable of 40+ TOPS for on-device AI tasks.',
          image: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb',
          date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
          views: '28.3K',
          comments: 421
        }" />

        <!-- Photo Post -->
        <Post :post="{
          id: 102,
          username: 'travel_guru',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          date: new Date(Date.now() - 3600000 * 8), // 8 hours ago
          text: 'Sunrise at Angkor Wat - worth waking up at 4am for this view! #Cambodia #Travel',
          image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
          tags: ['Travel', 'Photography', 'Cambodia'],
          likes: 892,
          comments: 134
        }" />

        <!-- Text Post -->
        <Post :post="{
          id: 103,
          username: 'bookworm',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
          date: new Date(Date.now() - 3600000 * 12), // 12 hours ago
          text: 'Just finished Project Hail Mary by Andy Weir. Absolutely mind-blowing science fiction with such believable science! Anyone else read it? What did you think? #Books #SciFi',
          tags: ['Books', 'Reading', 'SciFi'],
          likes: 456,
          comments: 89
        }" />

        <!-- News Post -->
        <NewsPost :news="{
          id: 103,
          source: 'Sports Network',
          sourceLogo: 'https://logo.clearbit.com/espn.com',
          title: 'Champions League final breaks viewership records',
          summary: 'Over 450 million viewers tuned in worldwide for the dramatic final match that went to penalties.',
          image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
          date: new Date(Date.now() - 3600000 * 15), // 15 hours ago
          views: '18.9K',
          comments: 312
        }" />

        <!-- Video Game Post -->
        <Post :post="{
          id: 104,
          username: 'gamer_4_life',
          avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
          date: new Date(Date.now() - 3600000 * 18), // 18 hours ago
          text: 'After 3 years of development, our indie game just launched on Steam! Check out the trailer and let us know what you think. #IndieDev #GameDev',
          image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1',
          tags: ['Gaming', 'IndieDev', 'Steam'],
          likes: 721,
          comments: 156
        }" />

        <!-- News Post -->
        <NewsPost :news="{
          id: 104,
          source: 'Health News',
          sourceLogo: 'https://logo.clearbit.com/webmd.com',
          title: 'New study reveals benefits of intermittent fasting',
          summary: 'Research shows 14-16 hour fasting windows may improve metabolic health and longevity markers.',
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
          date: new Date(Date.now() - 3600000 * 24), // 24 hours ago
          views: '15.2K',
          comments: 287
        }" />
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="hidden lg:block w-80 p-4 border-l border-gray-800 sticky top-0 h-screen overflow-y-auto">
      <!-- Search Bar -->
      <div class="relative mb-6">
        <input 
          type="text" 
          placeholder="Search"
          class="w-full bg-[#232b3e] border-none rounded-full px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
        <i class="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
      </div>

      <!-- Trending Now -->
      <div class="bg-[#181c23] rounded-xl p-4 mb-4">
        <h3 class="font-bold text-lg mb-3">Trending Now</h3>
        <div class="space-y-4">
          <div v-for="(trend, idx) in trendingTopics" :key="idx" class="group cursor-pointer">
            <div class="text-xs text-gray-400">{{ trend.category }} · Trending</div>
            <h4 class="font-bold group-hover:text-blue-400">{{ trend.title }}</h4>
            <div class="text-xs text-gray-400">{{ trend.posts }} posts</div>
          </div>
        </div>
        <button class="text-blue-400 text-sm mt-3 w-full text-left hover:text-blue-300">
          Show more
        </button>
      </div>

      <!-- Who to follow -->
      <div class="bg-[#181c23] rounded-xl p-4 mb-4">
        <h3 class="font-bold text-lg mb-3">Who to follow</h3>
        <div class="space-y-4">
          <div v-for="user in suggestedUsers" :key="user.id" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="user.avatar" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ user.name }}</p>
                <p class="text-xs text-gray-400">@{{ user.username }}</p>
              </div>
            </div>
            <button 
              class="text-xs px-3 py-1 rounded-full transition-colors"
              :class="user.following ? 'bg-transparent border border-gray-600 text-white' : 'bg-white text-black font-medium'"
              @click="user.following = !user.following"
            >
              {{ user.following ? 'Following' : 'Follow' }}
            </button>
          </div>
        </div>
        <button class="text-blue-400 text-sm mt-3 w-full text-left hover:text-blue-300">
          Show more
        </button>
      </div>

      <!-- Suggested News -->
      <div class="bg-[#181c23] rounded-xl p-4">
        <h3 class="font-bold text-lg mb-3">Suggested News</h3>
        <div class="space-y-4">
          <div v-for="news in suggestedNews" :key="news.id" class="group cursor-pointer">
            <div class="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span>{{ news.source }}</span>
              <span>·</span>
              <span>{{ formatTimeAgo(news.date) }}</span>
            </div>
            <h4 class="font-medium group-hover:text-blue-400 text-sm">{{ news.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Post from '@/components/Post.vue'
import NewsPost from '@/components/NewsPost.vue'

const currentUser = ref({
  username: 'yassineelaouni',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const showPostModal = ref(false)

const trendingStories = ref([
  { 
    title: 'Tech Conference', 
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    live: true
  },
  { 
    title: 'New Phone Launch', 
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb' 
  },
  { 
    title: 'Championship Final', 
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018' 
  },
  { 
    title: 'Music Festival', 
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' 
  },
  { 
    title: 'Movie Premiere', 
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba' 
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
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    following: false
  },
  {
    id: 2,
    name: 'Elon Musk',
    username: 'elonmusk',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    following: false
  },
  {
    id: 3,
    name: 'NatGeo',
    username: 'natgeo',
    avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6',
    following: false
  }
])

const suggestedNews = ref([
  {
    id: 1,
    source: 'Tech Today',
    title: 'Apple announces revolutionary new AI features coming to iOS 18',
    date: new Date(Date.now() - 3600000 * 2) // 2 hours ago
  },
  {
    id: 2,
    source: 'Science Daily',
    title: 'Breakthrough in quantum computing announced by researchers',
    date: new Date(Date.now() - 3600000 * 5) // 5 hours ago
  },
  {
    id: 3,
    source: 'Business Insider',
    title: 'Stock markets hit all-time high amid economic recovery',
    date: new Date(Date.now() - 3600000 * 8) // 8 hours ago
  }
])

const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>