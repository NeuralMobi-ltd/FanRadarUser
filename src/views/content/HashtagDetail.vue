<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Hashtag Header -->
    <div class="relative mb-8">
      <!-- Cover Image -->
      <div class="h-64 w-full rounded-xl overflow-hidden">
        <img 
          :src="getHashtagImage()" 
          :alt="hashtagName" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Hashtag Info -->
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center mb-2">
          <div class="px-3 py-1 bg-purple-600 rounded-full text-sm font-medium mr-3 flex items-center gap-2">
            <span>Hashtag</span>
          </div>
          <div class="flex items-center text-sm">
            <span>{{ hashtagStats.posts }} posts</span>
            <span class="mx-2">•</span>
            <span>{{ hashtagStats.growth }}% growth this week</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">#{{ hashtagName }}</h1>
        <p class="text-white/90 max-w-xl">{{ hashtagDescription }}</p>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div class="flex gap-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-4 px-1 font-medium',
            activeTab === tab.id 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          {{ tab.label }}
          <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Dynamic Content Based on Active Tab -->
    <div v-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-if="posts && posts.length > 0">
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @comment="commentPost"
          @share="sharePost"
          class="w-full mb-0"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        No posts found for this hashtag.
      </div>
    </div>

    <div v-else-if="activeTab === 'news'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <template v-if="newsData && newsData.length > 0">
        <NewsPost
          v-for="news in newsData"
          :key="news.id"
          :news="news"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        No news found for this hashtag.
      </div>
    </div>

    <div v-else-if="activeTab === 'related'" class="space-y-6">
      <template v-if="relatedHashtags && relatedHashtags.length > 0">
        <div v-for="tag in relatedHashtags" :key="tag.name" 
             @click="navigateToHashtag(tag.name)"
             class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer p-6">
          <div class="flex items-center mb-4">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
              <span class="text-2xl">#</span>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">#{{ tag.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ tag.posts }} posts</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">{{ tag.description }}</p>
        </div>
      </template>
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
        No related hashtags found.
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
      <div class="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Content Coming Soon</h3>
        <p class="text-gray-500 dark:text-gray-400">This section is currently under development.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Post from '@/components/common/Post.vue'
import NewsPost from '@/components/common/NewsPost.vue'

const route = useRoute()
const router = useRouter()
const hashtagName = computed(() => route.params.hashtag || '')
const activeTab = ref('posts')

// Hashtag description based on name
const hashtagDescription = computed(() => {
  const descriptions = {
    'LoLPhase5': 'Discover the latest updates and discussions about League of Legends Phase 5.',
    'LoLWorlds': 'Follow the excitement of League of Legends World Championship.',
    'Swifties': 'Join Taylor Swift fans sharing their love and latest updates.',
    'AnimeSpring2024': 'Spring anime season discussions and recommendations.',
    'MarvelPhase6': 'Marvel Cinematic Universe Phase 6 theories and news.',
    'KPopComeback': 'Latest K-Pop comebacks and music releases.',
    'GameOfThrones2024': 'House of the Dragon and Game of Thrones universe content.',
    'NintendoDirect': 'Nintendo Direct announcements and gaming news.'
  }
  
  return descriptions[hashtagName.value] || `Join the conversation about #${hashtagName.value} and connect with like-minded fans.`
})

// Hashtag statistics
const hashtagStats = ref({
  posts: '0',
  growth: '0'
})

// Tabs data
const tabs = ref([
  { id: 'posts', label: 'Posts', count: '234' },
  { id: 'news', label: 'News', count: '15' },
  { id: 'related', label: 'Related', count: '12' }
])

// Initialize data arrays
const posts = ref([])
const newsData = ref([])
const relatedHashtags = ref([])

// Get hashtag image
function getHashtagImage() {
  const imageMap = {
    'LoLPhase5': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
    'LoLWorlds': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
    'Swifties': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    'AnimeSpring2024': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    'MarvelPhase6': 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=400&fit=crop',
    'KPopComeback': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    'GameOfThrones2024': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=400&fit=crop',
    'NintendoDirect': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop'
  }
  
  return imageMap[hashtagName.value] || 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop'
}

// Navigate to hashtag
const navigateToHashtag = (tag) => {
  router.push(`/hashtag/${tag}`)
}

// Load hashtag data
onMounted(() => {
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
  
  // Initialize posts data
  posts.value = [
    {
      id: 1,
      username: 'GamerPro',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2h ago',
      communityName: 'Gaming Community',
      content: `Just saw the latest updates for ${hashtagName.value} and I'm absolutely hyped! This is going to change everything.`,
      image: 'https://dims.apnews.com/dims4/default/9a1aa05/2147483647/strip/true/crop/5058x2845+0+263/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2Fc3%2F568b2887ee1325a267b042192e69%2F8021f5b2054d4f93ac59558090f0e304',
      tags: [hashtagName.value, 'Gaming', 'Trending'],
      likes: 234,
      comments: 56,
      shares: 18,
      isLiked: false,
      fandom: 'Gaming'
    },
    {
      id: 2,
      username: 'ContentCreator',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '5h ago',
      communityName: 'Content Creators',
      content: `My detailed analysis of the ${hashtagName.value} phenomenon. This trend is reshaping the entire landscape and here's why you should care.`,
      image: null,
      tags: [hashtagName.value, 'Analysis', 'Content'],
      likes: 189,
      comments: 43,
      shares: 12,
      isLiked: true,
      fandom: 'Content'
    },
    {
      id: 3,
      username: 'TrendWatcher',
      userAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      date: '1d ago',
      communityName: 'Trend Analysis',
      content: `Breaking down everything you need to know about ${hashtagName.value}. The implications are massive and will affect the industry for years to come.`,
      image: 'https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/02/nba_central.jpg',
      tags: [hashtagName.value, 'Trends', 'Analysis'],
      likes: 312,
      comments: 89,
      shares: 24,
      isLiked: false,
      fandom: 'Analysis'
    }
  ]

  // Initialize news data
  newsData.value = [
    {
      id: 1,
      source: 'Gaming News',
      sourceLogo: 'https://logo.clearbit.com/ign.com',
      title: `Breaking: ${hashtagName.value} Update Released`,
      summary: `Major update brings new features and improvements to ${hashtagName.value}. Community reaction has been overwhelmingly positive.`,
      image: getHashtagImage(),
      date: '1h ago',
      views: '25.3K',
      category: 'Gaming',
      readingTime: '3',
      isLiked: false,
      breaking: true
    },
    {
      id: 2,
      source: 'Tech Today',
      sourceLogo: 'https://logo.clearbit.com/techcrunch.com',
      title: `${hashtagName.value} Community Reaches New Milestone`,
      summary: `The ${hashtagName.value} community celebrates reaching over 1 million active users with special events and announcements.`,
      image: 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg',
      date: '3h ago',
      views: '18.9K',
      category: 'Technology',
      readingTime: '4',
      isLiked: false
    },
    {
      id: 3,
      source: 'Community Blog',
      sourceLogo: 'https://logo.clearbit.com/medium.com',
      title: `Top ${hashtagName.value} Moments This Week`,
      summary: `A roundup of the best content, discussions, and highlights from the ${hashtagName.value} community this week.`,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
      date: '6h ago',
      views: '12.7K',
      category: 'Community',
      readingTime: '2',
      isLiked: false
    }
  ]

  // Initialize related hashtags with CSS icons
  relatedHashtags.value = [
    {
      name: 'Gaming',
      posts: '5.7M',
      description: 'General gaming discussions and news across all platforms and genres.'
    },
    {
      name: 'Esports',
      posts: '1.2M',
      description: 'Competitive gaming tournaments, professional players, and esports news.'
    },
    {
      name: 'Trending',
      posts: '2.8M',
      description: 'Currently trending topics and viral content across the platform.'
    },
    {
      name: 'Community',
      posts: '1.5M',
      description: 'Community discussions, events, and user-generated content.'
    }
  ]
})

// Methods to handle post interactions
function likePost(postId) {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
    console.log('Liked post:', postId, post.isLiked)
  }
}

function commentPost(postId) {
  console.log('Comment on post:', postId)
}

function sharePost(postId) {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.shares += 1
    console.log('Shared post:', postId)
  }
}
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>