<template>
  <div :class="[isDark ? 'dark' : '', 'min-h-screen font-sans transition-colors duration-300 bg-gray-50 dark:bg-dark-900']">
    <!-- Navigation Bar -->
    <nav class="w-full bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <span class="text-2xl font-extrabold text-primary dark:text-accent1">FanRadar</span>
      </div>
      <div class="flex gap-6 items-center">
        <a href="#" class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent1 font-medium">Home</a>
        <a href="#" class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent1 font-medium">Business</a>
        <a href="#" class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent1 font-medium">Sport</a>
        <a href="#" class="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-accent1 font-medium">Creators</a>
        <button @click="toggleDark" class="ml-4 p-2 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-accent1/20 transition">
          <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>
    </nav>

    <!-- Hero / Highlight -->
    <section class="w-full bg-gradient-to-r from-primary/10 to-accent1/10 dark:from-dark-800 dark:to-dark-900 py-10 px-4 md:px-0">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <img :src="heroNews.image" alt="hero" class="w-full md:w-2/5 rounded-2xl shadow-lg object-cover h-64 md:h-80" />
        <div class="flex-1">
          <span class="inline-block bg-primary/10 text-primary dark:bg-accent1/20 dark:text-accent1 px-3 py-1 rounded-full text-xs font-bold mb-3">{{ heroNews.category }}</span>
          <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">{{ heroNews.title }}</h1>
          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ heroNews.excerpt }}</p>
          <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{{ heroNews.date }}</span>
            <span class="font-medium">•</span>
            <span>By {{ heroNews.author }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero Carousel -->
    <section class="w-full bg-gradient-to-r from-primary/10 to-accent1/10 dark:from-dark-800 dark:to-dark-900 py-10 px-4 md:px-0">
      <div class="max-w-5xl mx-auto">
        <HeroCarousel :items="[heroNews, ...newsFeed]" />
      </div>
    </section>

    <!-- Latest News -->
    <section class="w-full py-10 px-4 md:px-0">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Latest News</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="news in newsFeed" :key="news.id" class="bg-white dark:bg-dark-700 rounded-2xl shadow-md overflow-hidden">
            <img :src="news.image" alt="news" class="w-full h-40 object-cover" />
            <div class="p-4">
              <span class="inline-block bg-primary/10 text-primary dark:bg-accent1/20 dark:text-accent1 px-3 py-1 rounded-full text-xs font-bold mb-2">{{ news.category }}</span>
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ news.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ news.excerpt }}</p>
              <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ news.date }}</span>
                <span class="font-medium">•</span>
                <span>By {{ news.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fan Stories -->
    <section class="w-full py-10 px-4 md:px-0 bg-gray-50 dark:bg-dark-800">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Fan Stories</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="story in stories" :key="story.id" class="bg-white dark:bg-dark-700 rounded-2xl shadow-md overflow-hidden">
            <img :src="story.image" alt="story" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ story.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ story.excerpt }}</p>
              <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ story.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Business Updates -->
    <section class="w-full py-10 px-4 md:px-0">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Business Updates</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="biz in business" :key="biz.id" class="bg-white dark:bg-dark-700 rounded-2xl shadow-md overflow-hidden">
            <img :src="biz.image" alt="business" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ biz.title }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ biz.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sports News -->
    <section class="w-full py-10 px-4 md:px-0 bg-gray-50 dark:bg-dark-800">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Sports News</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="sportNews in sport" :key="sportNews.id" class="bg-white dark:bg-dark-700 rounded-2xl shadow-md overflow-hidden">
            <img :src="sportNews.image" alt="sport" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ sportNews.title }}</h3>
              <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{{ sportNews.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Creators -->
    <section class="w-full py-10 px-4 md:px-0">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Featured Creators</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="creator in creators" :key="creator.id" class="bg-white dark:bg-dark-700 rounded-2xl shadow-md overflow-hidden">
            <div class="p-4">
              <div class="flex items-center gap-4">
                <img :src="creator.avatar" alt="creator" class="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{{ creator.name }}</h3>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ creator.followers }} Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 py-6">
      <div class="max-w-5xl mx-auto text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">&copy; 2025 FanRadar. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import HeroCarousel from '@/components/common/HeroCarousel.vue'

export default {
  name: 'Home',
  components: { HeroCarousel },
  setup() {
    const isDark = ref(false)
    const toggleDark = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    // Mock Data
    const heroNews = ref({
      title: 'Fan Community Sets New Record for Online Event Attendance',
      excerpt: 'A global fan event has drawn over 1 million participants, breaking previous records and showcasing the power of online fandoms.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200',
      category: 'Trending',
      date: 'July 23, 2025',
      author: 'Jane Doe'
    })

    const newsFeed = ref([
      {
        id: 1,
        title: 'Anime Expo 2025: Biggest Announcements',
        excerpt: 'All the major reveals and surprises from this year\'s Anime Expo.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
        category: 'Anime',
        date: 'July 20, 2025',
        author: 'Alex Kim'
      },
      {
        id: 2,
        title: 'Marvel Studios Teases New Phase',
        excerpt: 'Marvel Studios hints at new heroes and storylines for the next phase of the MCU.',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800',
        category: 'Movies',
        date: 'July 18, 2025',
        author: 'Chris Evans'
      },
      {
        id: 3,
        title: 'K-Pop Group Breaks Streaming Records',
        excerpt: 'The latest K-Pop sensation has shattered global streaming records with their new album.',
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800',
        category: 'Music',
        date: 'July 15, 2025',
        author: 'Minji Park'
      },
      {
        id: 4,
        title: 'Gaming Tournament Prize Pool Hits $10M',
        excerpt: 'The world\'s largest gaming tournament announces a record-breaking prize pool.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        category: 'Gaming',
        date: 'July 10, 2025',
        author: 'Sam Lee'
      }
    ])

    const stories = ref([
      {
        id: 1,
        title: 'Cosplay Parade',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        date: 'July 22, 2025'
      },
      {
        id: 2,
        title: 'Fan Art Contest',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
        date: 'July 21, 2025'
      },
      {
        id: 3,
        title: 'Meet & Greet',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
        date: 'July 19, 2025'
      },
      {
        id: 4,
        title: 'Live Q&A',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400',
        date: 'July 18, 2025'
      }
    ])

    const business = ref([
      {
        id: 1,
        title: 'Fandom Startup Raises $5M',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200',
        date: 'July 17, 2025'
      },
      {
        id: 2,
        title: 'Merch Sales Hit New High',
        image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?w=200',
        date: 'July 16, 2025'
      }
    ])

    const sport = ref([
      {
        id: 1,
        title: 'Esports Finals Announced',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200',
        date: 'July 15, 2025'
      },
      {
        id: 2,
        title: 'Fan League Expands',
        image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=200',
        date: 'July 14, 2025'
      }
    ])

    const creators = ref([
      {
        id: 1,
        name: 'LuffyFan',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        followers: '120K'
      },
      {
        id: 2,
        name: 'MarvelQueen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        followers: '98K'
      },
      {
        id: 3,
        name: 'KpopStar',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        followers: '87K'
      }
    ])

    return {
      isDark,
      toggleDark,
      heroNews,
      newsFeed,
      stories,
      business,
      sport,
      creators
    }
  }
}
</script>

<style scoped>
/* Custom styles specific to this component */
.text-gradient {
  background: linear-gradient(90deg, #0372ff, #ffca08);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.bg-primary { background-color: #0372ff; }
.text-primary { color: #0372ff; }
.bg-accent1 { background-color: #ffca08; }
.text-accent1 { color: #ffca08; }
.dark .bg-dark-900 { background-color: #18181b; }
.dark .bg-dark-800 { background-color: #27272a; }
.dark .border-dark-700 { border-color: #3f3f46; }
.dark .text-dark-900 { color: #18181b; }
.dark .text-dark-800 { color: #27272a; }

/* Confetti animation */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00;
  opacity: 1;
  animation: confetti-fall 5s linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>