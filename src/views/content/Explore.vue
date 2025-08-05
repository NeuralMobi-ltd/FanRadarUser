<template>
  <!-- Match the style in the screenshot with proper max-width -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
    <!-- Page Title -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Discover Content</h1>
      <p class="text-gray-600 dark:text-gray-300">Trends, news and communities for you</p>
    </div>

    <!-- Current Trends Section -->
    <div class="mb-10">
      <div class="flex items-center mb-6">
        <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Current Trends</h2>
      </div>
      
      <!-- Horizontal Scroll Container -->
      <div class="overflow-x-auto pb-4 scrollbar-hide">
        <div class="flex gap-6 w-max">
          <div v-for="trend in currentTrends" :key="trend.tag" 
               @click="navigateToHashtag(trend.tag)"
               class="w-80 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mr-4">
                <i :class="trend.icon" class="text-2xl text-blue-500"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white text-lg">#{{ trend.tag }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm">{{ trend.posts }} posts</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ trend.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Categories Section -->
    <div class="mb-10">
      <div class="flex items-center mb-6">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Popular Categories</h2>
      </div>
      
      <!-- Horizontal Scroll Container -->
      <div class="overflow-x-auto pb-4 scrollbar-hide">
        <div class="flex gap-4 w-max">
          <div v-for="category in popularCategories" :key="category.name" 
               @click="navigateToCategory(category.name)"
               class="relative w-56 h-36 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform flex-shrink-0">
            <img :src="category.image" :alt="category.name" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <h3 class="text-white font-bold text-lg">{{ category.name }}</h3>
              <p class="text-white/80 text-sm">{{ category.communities }} communities</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fan News Section -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Fan News</h2>
        </div>
        <router-link to="/news" class="text-blue-500 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400">See all</router-link>
      </div>
      
      <!-- Horizontal Scroll Container -->
      <div class="overflow-x-auto pb-4 scrollbar-hide">
        <div class="flex gap-4 w-max">
          <div v-for="news in fanNews" :key="news.id" class="w-80 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 flex-shrink-0">
            <div class="relative h-48">
              <img :src="news.image" :alt="news.title" class="w-full h-full object-cover">
              <div class="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                {{ news.category }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">{{ news.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{{ news.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{{ news.time }}</span>
                <span>{{ news.views }} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTrends = ref([
  { 
    tag: 'LoLPhase5', 
    posts: '2.3M', 
    icon: 'fas fa-gamepad',
    description: 'League of Legends Phase 5 introduces new champions and major gameplay changes that are revolutionizing competitive play with the new Void storyline.'
  },
  { 
    tag: 'LoLWorlds', 
    posts: '897K', 
    icon: 'fas fa-trophy',
    description: 'World Championship 2024 is heating up with incredible matches and unexpected upsets. T1 vs GenG finals breaking viewership records.'
  },
  { 
    tag: 'Swifties', 
    posts: '3.1M', 
    icon: 'fas fa-music',
    description: 'Taylor Swift fans are celebrating the announcement of her new Eras Tour dates and surprise album release featuring collaborations.'
  },
  { 
    tag: 'AnimeSpring2024', 
    posts: '1.8M', 
    icon: 'fas fa-heart',
    description: 'Spring anime season brings incredible new series including the highly anticipated Attack on Titan finale and Demon Slayer continuation.'
  },
  { 
    tag: 'MarvelPhase6', 
    posts: '2.1M', 
    icon: 'fas fa-mask',
    description: 'Marvel Studios reveals exciting details about Phase 6 of the MCU with new heroes, multiverse storylines, and the return of the X-Men.'
  },
  { 
    tag: 'KPopComeback', 
    posts: '1.6M', 
    icon: 'fas fa-star',
    description: 'Multiple K-Pop groups are making spectacular comebacks this month with BTS, BLACKPINK, and NewJeans releasing chart-topping albums.'
  },
  { 
    tag: 'GameOfThrones2024', 
    posts: '945K', 
    icon: 'fas fa-fire',
    description: 'House of the Dragon Season 2 trailer drops with epic dragon battles and the highly anticipated Dance of Dragons storyline.'
  },
  { 
    tag: 'NintendoDirect', 
    posts: '1.2M', 
    icon: 'fas fa-gamepad',
    description: 'Nintendo Direct showcases upcoming Switch games including the new Super Mario Wonder and highly anticipated Zelda sequel updates.'
  }
])

const popularCategories = ref([
  {
    name: 'Sport',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop',
    communities: '450+'
  },
  {
    name: 'Music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
    communities: '680+'
  },
  {
    name: 'Tech',
    image: 'https://www.intelligenthq.com/wp-content/uploads/2020/09/How-Tech-is-Changing-the-Way-we-Work.jpg',
    communities: '320+'
  },
  {
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
    communities: '890+'
  },
  {
    name: 'Anime',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    communities: '750+'
  },
  {
    name: 'Movies',
    image: 'http',
    communities: '520+'
  },
  {
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    communities: '280+'
  },
  {
    name: 'Art',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
    communities: '340+'
  },
  {
    name: 'TV Shows',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=200&fit=crop',
    communities: '620+'
  },
  {
    name: 'Comics',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=200&fit=crop',
    communities: '430+'
  },
  {
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    communities: '290+'
  },
  {
    name: 'Photography',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
    communities: '380+'
  }
])

const fanNews = ref([
  {
    id: 1,
    category: 'K-pop',
    title: 'BTS Announces New Album for 2024',
    description: 'The group revealed details about their upcoming album during a special live stream event with exclusive behind-the-scenes footage and collaborations with western artists.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
    time: '2h ago',
    views: '15.2K'
  },
  {
    id: 2,
    category: 'Gaming',
    title: 'League of Legends World Championship Finals',
    description: 'Epic showdown between T1 and JDG in the most anticipated esports match of the year with record-breaking viewership of 5.1 million concurrent viewers.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
    time: '4h ago',
    views: '28.7K'
  },
  {
    id: 3,
    category: 'Anime',
    title: 'Attack on Titan Final Movie Announced',
    description: 'Studio WIT confirms the production of a conclusive film to end the beloved series with an epic finale, featuring enhanced animation and extended scenes.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop',
    time: '6h ago',
    views: '45.3K'
  },
  {
    id: 4,
    category: 'Marvel',
    title: 'Deadpool 3 Gets Official Release Date',
    description: 'Ryan Reynolds confirms the highly anticipated sequel will introduce Deadpool to the MCU multiverse with Hugh Jackman returning as Wolverine.',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=300&fit=crop',
    time: '8h ago',
    views: '67.1K'
  },
  {
    id: 5,
    category: 'Technology',
    title: 'Apple Vision Pro Gets Gaming Update',
    description: 'Major software update brings enhanced gaming capabilities and new AR experiences to the headset, including support for popular VR titles.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop',
    time: '12h ago',
    views: '23.8K'
  },
  {
    id: 6,
    category: 'Sports',
    title: 'World Cup 2026 Venues Announced',
    description: 'FIFA reveals the complete list of stadiums that will host matches across North America, featuring state-of-the-art facilities in 16 cities.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=300&fit=crop',
    time: '1d ago',
    views: '91.5K'
  },
  {
    id: 7,
    category: 'TV Shows',
    title: 'House of the Dragon Season 2 Trailer',
    description: 'HBO releases the epic first trailer for the highly anticipated second season featuring massive dragon battles and political intrigue in Westeros.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=300&fit=crop',
    time: '1d ago',
    views: '78.9K'
  },
  {
    id: 8,
    category: 'Music',
    title: 'Taylor Swift Breaks Spotify Records',
    description: 'The pop superstar sets new streaming records with her latest album, surpassing 1 billion streams in just one week across all platforms.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
    time: '2d ago',
    views: '134.2K'
  },
  {
    id: 9,
    category: 'Gaming',
    title: 'Nintendo Direct Showcases 2024 Lineup',
    description: 'Nintendo reveals upcoming Switch games including new Super Mario Wonder gameplay, Zelda sequel updates, and surprise third-party announcements.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=300&fit=crop',
    time: '2d ago',
    views: '52.7K'
  },
  {
    id: 10,
    category: 'Movies',
    title: 'Marvel Phase 6 Timeline Revealed',
    description: 'Kevin Feige unveils the complete Phase 6 movie schedule including Fantastic Four, X-Men introduction, and the highly anticipated Avengers: Secret Wars.',
    image: 'https://images.unsplash.com/photo-1489599904486-b9c74d6f4c22?w=600&h=300&fit=crop',
    time: '3d ago',
    views: '89.4K'
  }
])

const navigateToCategory = (categoryName) => {
  router.push(`/category/${categoryName.toLowerCase()}`)
}

const navigateToHashtag = (hashtag) => {
  router.push(`/hashtag/${hashtag}`)
}
</script>

<style scoped>
/* Hide scrollbar for webkit browsers */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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