<template>
  <div class="flex min-h-screen pt-4">
    <!-- Main Content -->
    <div class="flex-1 px-4 sm:px-6">
      <!-- Create Post Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-start space-x-3">
          <img src="/public/images/me.png" class="w-10 h-10 rounded-full" :alt="currentUser.username">
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="What's on your mind?"
              class="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows="3"
            ></textarea>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-4">
                <!-- Image Upload -->
                <label class="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                  <i class="fas fa-image"></i>
                  <input type="file" accept="image/*" class="hidden" @change="onFileChange('image', $event)" />
                </label>
                <!-- Video Upload -->
                <label class="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                  <i class="fas fa-video"></i>
                  <input type="file" accept="video/*" class="hidden" @change="onFileChange('video', $event)" />
                </label>
              </div>
              
              <button
                @click="createPost"
                :disabled="!newPostContent.trim() && !newPostMedia"
                class="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
            <!-- Preview selected media -->
            <div v-if="newPostMedia" class="mt-3">
              <img v-if="newPostMediaType === 'image'" :src="newPostMedia" class="max-h-48 rounded-lg mb-2" />
              <video v-else-if="newPostMediaType === 'video'" :src="newPostMedia" controls class="max-h-48 rounded-lg mb-2"></video>
              <button @click="removeMedia" class="text-xs text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- News Section -->
      <div class="py-2 border-b border-gray-200 dark:border-gray-800 mb-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-bold text-lg dark:text-white">News Today</h2>
          <button class="text-blue-500 text-sm hover:text-blue-600 transition-colors">Show more</button>
        </div>
        
        <!-- News Items -->
        <div class="space-y-4">
          <NewsPost 
            v-for="news in newsItems"
            :key="news.id"
            :news="news"
          />
        </div>
      </div>

      <!-- Feed Toggle -->
      <div class="flex space-x-1 mb-4">
        <button
          @click="activeFeed = 'timeline'"
          :class="activeFeed === 'timeline' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Timeline
        </button>
        <button
          @click="activeFeed = 'trending'"
          :class="activeFeed === 'trending' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Trending
        </button>
        <button
          @click="activeFeed = 'following'"
          :class="activeFeed === 'following' ? 
            'bg-blue-500 text-white' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'"
          class="px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Following
        </button>
      </div>

      <!-- Posts Section -->
      <div class="space-y-4">
        <Post 
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="openComments"
          @share="sharePost"
        />
        
        <!-- Load More Button -->
        <div class="flex justify-center pt-4" v-if="hasMorePosts">
          <button
            @click="loadMorePosts"
            :disabled="loadingMore"
            class="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <i v-if="loadingMore" class="fas fa-spinner fa-spin mr-2"></i>
            {{ loadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-12">
          <i class="fas fa-comments text-gray-400 text-4xl mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
          <p class="text-gray-500 dark:text-gray-400">Follow some fandoms to see posts in your timeline!</p>
          <router-link 
            to="/communities/browse"
            class="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            Explore Communities
          </router-link>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 flex-shrink-0 p-4 space-y-4 hidden lg:block bg-gray-50 dark:bg-gray-800/50">
      <!-- Trending Communities -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Communities</h3>
        <div class="space-y-3">
          <div v-for="community in trendingCommunities" :key="community.id" class="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <img :src="community.avatar" class="w-10 h-10 rounded-full" :alt="community.name">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ community.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ community.members }} members</p>
            </div>
            <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600">
              Join
            </button>
          </div>
        </div>
      </div>

      <!-- Popular Hashtags -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Trending Hashtags</h3>
        <div class="space-y-2">
          <div v-for="(tag, index) in trendingHashtags" :key="index" class="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">#{{ tag.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tag.posts }} posts</p>
            </div>
            <span class="text-xs text-green-500 font-medium">{{ tag.growth }}% ↗</span>
          </div>
        </div>
      </div>

      <!-- Recommended Users -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Who to Follow</h3>
        <div class="space-y-3">
          <div v-for="user in recommendedUsers" :key="user.id" class="flex items-center space-x-3">
            <img :src="user.avatar" class="w-10 h-10 rounded-full" :alt="user.username">
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">@{{ user.username }}</p>
            </div>
            <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600">
              Follow
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
            <img :src="activity.user.avatar" class="w-8 h-8 rounded-full" :alt="activity.user.name">
            <div class="flex-1 text-sm">
              <p class="text-gray-900 dark:text-white">
                <span class="font-medium">{{ activity.user.name }}</span> {{ activity.action }}
              </p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">{{ formatTimeAgo(activity.date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import Post from '@/components/Post.vue'
import NewsPost from '@/components/NewsPost.vue'

const authStore = useAuthStore()

const newPostContent = ref('')
const newPostMedia = ref(null)
const newPostMediaType = ref(null)

function onFileChange(type, event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    newPostMedia.value = e.target.result
    newPostMediaType.value = type
  }
  reader.readAsDataURL(file)
}

function removeMedia() {
  newPostMedia.value = null
  newPostMediaType.value = null
}

const activeFeed = ref('timeline')
const loadingMore = ref(false)
const hasMorePosts = ref(true)

const currentUser = computed(() => authStore.user || {
  username: 'yasdhekokuri',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const trendingCommunities = ref([
  {
    id: 1,
    name: 'Anime & Manga',
    avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100',
    members: '2.5M'
  },
  {
    id: 2,
    name: 'Marvel Universe',
    avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100',
    members: '1.8M'
  },
  {
    id: 3,
    name: 'K-Pop',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100',
    members: '3.2M'
  },
  {
    id: 4,
    name: 'Gaming',
    avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100',
    members: '4.1M'
  }
])

const trendingHashtags = ref([
  { name: 'LeagueofLegends', posts: '15.2K', growth: 24 },
  { name: 'Anime2024', posts: '8.7K', growth: 18 },
  { name: 'MarvelPhase5', posts: '12.3K', growth: 35 },
  { name: 'KPopNews', posts: '22.1K', growth: 12 },
  { name: 'GameDev', posts: '6.8K', growth: 45 }
])

const recommendedUsers = ref([
  {
    id: 1,
    name: 'Akira Tanaka',
    username: 'akira_anime',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Sophie Chen',
    username: 'sophie_kpop',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'GameMaster Pro',
    username: 'gamemaster_pro',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
])

const recentActivity = ref([
  {
    id: 1,
    user: { name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    action: 'liked your post about anime recommendations',
    date: new Date(Date.now() - 300000) // 5 minutes ago
  },
  {
    id: 2,
    user: { name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    action: 'started following you',
    date: new Date(Date.now() - 600000) // 10 minutes ago
  },
  {
    id: 3,
    user: { name: 'Carol', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    action: 'commented on your Marvel theory',
    date: new Date(Date.now() - 900000) // 15 minutes ago
  }
])

const newsItems = ref([
  {
    id: 1,
    source: 'Esports Today',
    sourceLogo: 'https://logo.clearbit.com/esports.com',
    title: 'League of Legends World Championship 2024',
    summary: 'Les équipes se préparent pour l\'événement esports le plus attendu de l\'année. T1 défendra son titre face aux challengers européens et chinois.',
    date: new Date(Date.now() - 3600000 * 2),
    views: '28.5K',
    breaking: true
  },
  {
    id: 2,
    source: 'Football News',
    sourceLogo: 'https://logo.clearbit.com/skysports.com',
    title: 'Tensions sur les pénalties en Ligue des Champions',
    summary: 'Les dernières controversies sur les décisions arbitrales en phase finale alimentent les débats entre supporters.',
    date: new Date(Date.now() - 3600000 * 6),
    views: '12.3K'
  },
  {
    id: 3,
    source: 'Anime Central',
    sourceLogo: 'https://logo.clearbit.com/crunchyroll.com',
    title: 'Attack on Titan Final Movie Announced',
    summary: 'Studio Wit annonce un film final pour conclure définitivement la saga d\'Eren Yeager.',
    date: new Date(Date.now() - 3600000 * 8),
    views: '45.7K'
  },
  {
    id: 4,
    source: 'K-Pop Weekly',
    sourceLogo: 'https://logo.clearbit.com/soompi.com',
    title: 'NewJeans Breaks Spotify Records',
    summary: 'Le groupe continue de dominer les charts internationaux avec leur nouvel album.',
    date: new Date(Date.now() - 3600000 * 12),
    views: '67.2K'
  }
])

const posts = ref([
  {
    id: 1,
    username: 'Alice Martin',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: new Date(Date.now() - 3600000 * 2),
    text: "Just finished watching the latest Attack on Titan episode and I'm speechless! 😭 The animation quality keeps getting better! #AttackOnTitan #Anime",
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
    likes: 124,
    comments: 23,
    shares: 8,
    isLiked: false,
    fandom: 'Anime',
    trending: true
  },
  {
    id: 2,
    username: 'Jean Dubois',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: new Date(Date.now() - 3600000 * 5),
    text: "T1 vs G2 was absolutely insane! That Baron steal in game 3 will go down in Worlds history 🔥 #LoLWorlds #Esports",
    tags: ['LoLWorlds', 'Esports', 'T1', 'G2'],
    likes: 89,
    comments: 15,
    shares: 12,
    isLiked: true,
    fandom: 'League of Legends',
    trending: true
  },
  {
    id: 3,
    username: 'Sarah Kim',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    date: new Date(Date.now() - 3600000 * 8),
    text: "NewJeans' new music video is a masterpiece! The choreography, the visuals, everything is perfect 💕 #NewJeans #Kpop",
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400',
    likes: 156,
    comments: 34,
    shares: 28,
    isLiked: false,
    fandom: 'K-Pop',
    trending: true
  },
  {
    id: 4,
    username: 'GameMaster99',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    date: new Date(Date.now() - 3600000 * 12),
    text: "Spider-Man 2 on PS5 is incredible! The web-swinging feels so smooth and the graphics are mind-blowing 🕷️ #SpiderMan2 #PS5 #Gaming",
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400',
    likes: 78,
    comments: 19,
    shares: 6,
    isLiked: true,
    fandom: 'Gaming',
    trending: false
  },
  {
    id: 5,
    username: 'Marvel_Fan_2024',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: new Date(Date.now() - 3600000 * 16),
    text: "Theory: What if the TVA from Loki will play a major role in the upcoming Avengers movie? The multiverse implications are huge! 🤔 #Marvel #MCU",
    likes: 203,
    comments: 67,
    shares: 45,
    isLiked: false,
    fandom: 'Marvel',
    trending: true
  },
  {
    id: 6,
    username: 'AnimeLover_JP',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    date: new Date(Date.now() - 3600000 * 20),
    text: "Demon Slayer movie was absolutely phenomenal! The fight scenes were beautifully animated 🗾 ⚔️ #DemonSlayer #Anime",
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
    likes: 145,
    comments: 28,
    shares: 17,
    isLiked: true,
    fandom: 'Anime',
    trending: false
  }
])

const filteredPosts = computed(() => {
  let filtered = posts.value
  switch (activeFeed.value) {
    case 'trending':
      filtered = filtered.filter(post => post.trending)
      break
    case 'following':
      filtered = filtered.filter(post => post.isLiked)
      break
    default:
      break
  }
  return filtered.sort((a, b) => b.date - a.date)
})

const createPost = () => {
  if (newPostContent.value.trim() || newPostMedia.value) {
    const newPost = {
      id: Date.now(),
      username: currentUser.value.username,
      avatar: currentUser.value.avatar,
      date: new Date(),
      text: newPostContent.value,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      fandom: null,
      trending: false,
      image: newPostMediaType.value === 'image' ? newPostMedia.value : null,
      video: newPostMediaType.value === 'video' ? newPostMedia.value : null
    }
    posts.value.unshift(newPost)
    newPostContent.value = ''
    removeMedia()
  }
}

const likePost = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}

const openComments = (postId) => {
  console.log('Opening comments for post:', postId)
}

const sharePost = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.shares += 1
    console.log('Shared post:', postId)
  }
}

const loadMorePosts = () => {
  loadingMore.value = true
  setTimeout(() => {
    const morePosts = [
      {
        id: Date.now() + 1,
        username: 'TechReviewer',
        avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
        date: new Date(Date.now() - 3600000 * 18),
        text: 'The new iPhone is amazing! Camera quality is incredible 📱 #tech #iPhone',
        likes: 23,
        comments: 5,
        shares: 2,
        isLiked: false,
        fandom: 'Technology',
        trending: false
      }
    ]
    posts.value.push(...morePosts)
    loadingMore.value = false
    if (posts.value.length > 10) {
      hasMorePosts.value = false
    }
  }, 1000)
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 60000)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

onMounted(() => {
  console.log('Home component mounted')
})
</script>

<style scoped>
textarea {
  min-height: 60px;
}

textarea:focus {
  outline: none;
}
</style>