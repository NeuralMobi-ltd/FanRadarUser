<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Category Header -->
    <div class="relative mb-8">
      <!-- Cover Image -->
      <div class="h-64 w-full rounded-xl overflow-hidden">
        <img 
          :src="getCategoryImage()" 
          :alt="categoryName" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      
      <!-- Category Info -->
      <div class="absolute bottom-6 left-6 text-white">
        <div class="flex items-center mb-2">
          <div class="px-3 py-1 rounded-full text-sm font-medium mr-3 flex items-center gap-2" :class="getCategoryColor()">
            <span>Category</span>
          </div>
          <div class="flex items-center text-sm">
            <span>{{ categoryStats.communities }} communities</span>
            <span class="mx-2">•</span>
            <span>{{ categoryStats.members }} members</span>
          </div>
        </div>
        <h1 class="text-4xl font-bold mb-1">
          <i class="mr-3"></i>{{ formattedCategoryName }}
        </h1>
        <p class="text-white/90 max-w-xl">{{ categoryDescription }}</p>
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
    <div v-if="activeTab === 'communities'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="communities && communities.length > 0">
        <CommunityCard
          v-for="community in communities"
          :key="community.id"
          :community="community"
          button-text="Join"
        />
      </template>
      <div v-else class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
        No communities found for this category.
      </div>
    </div>

    <div v-else-if="activeTab === 'posts'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        No posts found for this category.
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
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
        No news found for this category.
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
import { useRoute } from 'vue-router'
import Post from '@/components/Post.vue'
import NewsPost from '@/components/NewsPost.vue'
import CommunityCard from '@/components/CommunityCard.vue'

const route = useRoute()
const categoryName = computed(() => route.params.category || '')
const activeTab = ref('communities')

// Format category name (capitalize)
const formattedCategoryName = computed(() => {
  return categoryName.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Category description based on name
const categoryDescription = computed(() => {
  const descriptions = {
    'sport': 'Connect with sports fans, follow your favorite teams, and discuss the latest games and events.',
    'music': 'Share your favorite tracks, discover new artists, and connect with music lovers worldwide.',
    'tech': 'Stay updated on the latest tech news, product releases, and industry trends.',
    'gaming': 'Find gaming communities, share gameplay strategies, and connect with fellow gamers.',
    'anime': 'Discuss your favorite anime series, share fan art, and stay updated on new releases.',
    'movies': 'Talk about the latest blockbusters, classic films, and connect with movie enthusiasts.',
    'books': 'Explore literary discussions, book recommendations, and connect with fellow readers.',
    'art': 'Share your artwork, discover talented artists, and join creative communities.',
    'tv-shows': 'Discuss episodes, theories, and news about your favorite TV series.',
    'comics': 'Connect with comic book fans, discuss storylines, and share your favorite characters.',
    'fashion': 'Stay on top of trends, share outfit inspirations, and connect with fashion enthusiasts.',
    'photography': 'Share your photos, learn techniques, and connect with photographers worldwide.'
  }
  
  return descriptions[categoryName.value] || `Join the ${formattedCategoryName.value} community and connect with fellow enthusiasts.`
})

// Category statistics
const categoryStats = ref({
  communities: '0',
  members: '0'
})

// Tabs data - remove trending tab
const tabs = ref([
  { id: 'communities', label: 'Communities', count: '28' },
  { id: 'posts', label: 'Posts', count: '453' },
  { id: 'news', label: 'News', count: '8' }
])

// Initialize all arrays as empty to prevent null/undefined errors
const communities = ref([])
const posts = ref([])
const trending = ref([])
const newsData = ref([])

// Get category image
function getCategoryImage() {
  const imageMap = {
    'sport': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=400&fit=crop',
    'music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    'tech': 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg',
    'gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop',
    'anime': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
    'movies': 'https://www.wondermind.com/wp-content/uploads/2024/09/20-Feel-Good-Movies-People-Swear-By-For-Your-Next-Bad-Day.jpg?w=960',
    'books': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    'art': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop',
    'tv-shows': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=400&fit=crop',
    'comics': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1200&h=400&fit=crop',
    'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
    'photography': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=400&fit=crop'
  }
  
  return imageMap[categoryName.value] || 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=1200&h=400&fit=crop'
}

// Get category color
function getCategoryColor() {
  const colorMap = {
    'sport': 'bg-orange-600',
    'music': 'bg-pink-600',
    'tech': 'bg-gray-600',
    'gaming': 'bg-green-600',
    'anime': 'bg-purple-600',
    'movies': 'bg-yellow-600',
    'books': 'bg-amber-600',
    'art': 'bg-purple-600',
    'tv-shows': 'bg-indigo-600',
    'comics': 'bg-blue-600',
    'fashion': 'bg-rose-600',
    'photography': 'bg-teal-600'
  }
  
  return colorMap[categoryName.value] || 'bg-blue-600'
}

// Get category icon using Font Awesome CSS classes
function getCategoryIcon() {
  const iconMap = {
    'sport': 'fas fa-futbol',
    'music': 'fas fa-music',
    'tech': 'fas fa-laptop',
    'gaming': 'fas fa-gamepad',
    'anime': 'fas fa-heart',
    'movies': 'fas fa-film',
    'books': 'fas fa-book',
    'art': 'fas fa-palette',
    'tv-shows': 'fas fa-tv',
    'comics': 'fas fa-book-open',
    'fashion': 'fas fa-tshirt',
    'photography': 'fas fa-camera'
  }
  
  return iconMap[categoryName.value] || 'fas fa-star'
}

// Load category data
onMounted(() => {
  console.log(`Loading data for category: ${categoryName.value}`)
  
  // Set mock stats based on category
  const statMap = {
    'sport': { communities: '450+', members: '2.5M+' },
    'music': { communities: '680+', members: '3.8M+' },
    'tech': { communities: '320+', members: '1.7M+' },
    'gaming': { communities: '890+', members: '4.2M+' },
    'anime': { communities: '750+', members: '3.1M+' },
    'movies': { communities: '520+', members: '2.8M+' },
    'books': { communities: '280+', members: '1.5M+' },
    'art': { communities: '340+', members: '1.9M+' },
    'tv-shows': { communities: '620+', members: '3.4M+' },
    'comics': { communities: '430+', members: '2.3M+' },
    'fashion': { communities: '290+', members: '1.6M+' },
    'photography': { communities: '380+', members: '2.1M+' }
  }
  
  categoryStats.value = statMap[categoryName.value] || { communities: '250+', members: '1.2M+' }
  
  // Initialize with proper data structure
  try {
    // Initialize communities data - no change needed
    communities.value = [
      {
        id: 1,
        name: 'Premier League Fans',
        description: 'The ultimate community for Premier League football fans. Match discussions, transfer news, and more!',
        members: '234K',
        logo: 'https://logo.clearbit.com/premierleague.com',
        coverImage: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=300&fit=crop'
      },
      {
        id: 2,
        name: 'NBA Central',
        description: 'All things NBA. Game threads, highlights, player discussions and basketball strategies.',
        members: '189K',
        logo: 'https://logo.clearbit.com/nba.com',
        coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=300&fit=crop'
      },
      {
        id: 3,
        name: 'Formula 1',
        description: 'The fastest community on FanRadar! Race discussions, team updates, and technical analyses.',
        members: '156K',
        logo: 'https://logo.clearbit.com/formula1.com',
        coverImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=300&fit=crop'
      },
      {
        id: 4,
        name: 'Tennis World',
        description: 'Grand Slams, ATP & WTA tours, and everything tennis related. From amateurs to professionals!',
        members: '98K',
        logo: 'https://logo.clearbit.com/atptour.com',
        coverImage: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=300&fit=crop'
      },
      {
        id: 5,
        name: 'Cricket Fans',
        description: 'Test matches, ODIs, T20s - all cricket formats discussed by passionate fans worldwide.',
        members: '145K',
        logo: 'https://logo.clearbit.com/icc-cricket.com',
        coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=300&fit=crop'
      },
      {
        id: 6,
        name: 'Olympic Games',
        description: 'Celebrating Olympic sports, athletes and events from around the world.',
        members: '120K',
        logo: 'https://logo.clearbit.com/olympic.org',
        coverImage: 'https://alizila.oss-us-west-1.aliyuncs.com/uploads/2021/07/100-meters-sprint-olympics-rio-2016-shutterstock-992x558-1.jpg'
      }
    ]

    // Initialize posts data to match Post component
    posts.value = [
      {
        id: 1,
        username: 'SportsEnthusiast',
        userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: '2h ago',
        communityName: 'Premier League Fans',
        content: 'What an incredible match yesterday! The last-minute goal completely changed the league standings. Anyone else think the referee missed a clear penalty in the first half?',
        image: 'https://dims.apnews.com/dims4/default/9a1aa05/2147483647/strip/true/crop/5058x2845+0+263/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fe8%2Fc3%2F568b2887ee1325a267b042192e69%2F8021f5b2054d4f93ac59558090f0e304',
        tags: ['PremierLeague', 'Football', 'MatchDay', 'Referee'],
        likes: 234,
        comments: 56,
        shares: 18,
        isLiked: false,
        fandom: 'Sport'
      },
      {
        id: 2,
        username: 'BasketballFan44',
        userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: '5h ago',
        communityName: 'NBA Central',
        content: 'Hot take: This rookie class might be the best we\'ve seen in the past decade. The skill level and basketball IQ of these young players is absolutely off the charts!',
        image: 'https://static0.givemesportimages.com/wordpress/wp-content/uploads/2024/02/nba_central.jpg',
        tags: ['NBA', 'Rookies', 'Basketball', 'HotTake'],
        likes: 189,
        comments: 43,
        shares: 12,
        isLiked: true,
        fandom: 'Sport'
      },
      {
        id: 3,
        username: 'F1Analyst',
        userAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
        date: '1d ago',
        communityName: 'Formula 1',
        content: 'Breaking down the new aerodynamic regulations and how they might affect the competitive balance next season. Teams with high downforce philosophy will need to completely rethink their approach.',
        image: 'https://e0.365dm.com/25/02/2048x1152/skysports-pirelli-f1-2025-test_6820918.jpg?20250206074138',
        tags: ['Formula1', 'F1Regulations', 'Aerodynamics', 'Racing'],
        likes: 312,
        comments: 89,
        shares: 24,
        isLiked: false,
        fandom: 'Sport'
      }
    ]

    // Initialize news data based on category to match NewsPost component
    if (categoryName.value === 'sport') {
      // Remove trending data initialization
      
      // Set up news data for NewsPost component with proper string dates
      newsData.value = [
        {
          id: 1,
          source: 'Sports Today',
          sourceLogo: 'https://logo.clearbit.com/espn.com',
          title: 'Champions League Final Preview',
          summary: 'Expert analysis and predictions for the biggest match in European football. Team lineups, key players to watch, and tactical breakdowns.',
          image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',
          date: '2h ago', // String format
          views: '12.4K',
          category: 'Football',
          readingTime: '5',
          isLiked: false,
          breaking: true
        },
        {
          id: 2,
          source: 'NBA Network',
          sourceLogo: 'https://logo.clearbit.com/nba.com',
          title: 'NBA Playoffs Drama Continues',
          summary: 'Heated discussions about the ongoing playoff series, MVP candidates, and game-changing moments that are defining this season.',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
          date: '4h ago', // Using string date format
          views: '8.7K',
          category: 'Basketball',
          readingTime: '4',
          isLiked: false
        },
        {
          id: 3,
          source: 'Tennis World',
          sourceLogo: 'https://logo.clearbit.com/atptour.com',
          title: 'Wimbledon Championship Update',
          summary: 'Tennis fans analyzing draw predictions, discussing past champions and rising stars in the tournament.',
          image: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=500&fit=crop',
          date: '6h ago', // Using string date format
          views: '6.2K',
          category: 'Tennis',
          readingTime: '3',
          isLiked: false
        }
      ]
    } else if (categoryName.value === 'gaming') {
      newsData.value = [
        {
          id: 1,
          source: 'Game Insider',
          sourceLogo: 'https://logo.clearbit.com/ign.com',
          title: 'League of Legends World Championship',
          summary: 'Epic showdown between the world\'s best teams. Live coverage, player interviews, and expert analysis of the biggest esports event.',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
          date: '1h ago',
          views: '25.3K',
          category: 'Esports',
          readingTime: '6',
          isLiked: false,
          trending: true
        },
        {
          id: 2,
          source: 'PlayStation Blog',
          sourceLogo: 'https://logo.clearbit.com/playstation.com',
          title: 'New PlayStation 5 Games Announced',
          summary: 'Sony reveals exclusive titles coming to PS5 including highly anticipated sequels and new IPs that will revolutionize gaming.',
          image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop',
          date: '3h ago', // Using string date format
          views: '18.9K',
          category: 'Console Gaming',
          readingTime: '5',
          isLiked: false
        }
      ]
      
      // Remove trending assignment
    } else {
      // Default news for other categories
      newsData.value = [
        {
          id: 1,
          source: formattedCategoryName.value,
          sourceLogo: `https://logo.clearbit.com/${categoryName.value}.com`,
          title: `Latest ${formattedCategoryName.value} News`,
          summary: `Breaking news and updates from the ${categoryName.value} community. Stay informed with the latest developments.`,
          image: getCategoryImage(),
          date: '3h ago', // String format
          views: '15.2K',
          category: formattedCategoryName.value,
          readingTime: '4',
          isLiked: false
        }
      ]
      
      // Remove trending assignment
    }
  } catch (error) {
    console.error('Error initializing category data:', error)
    // Fallback to empty arrays
    communities.value = []
    posts.value = []
    trending.value = []
    newsData.value = []
  }
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
  // Open comment modal or navigation in a real app
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
