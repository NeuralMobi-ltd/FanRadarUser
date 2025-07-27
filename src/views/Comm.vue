<template>
  <div class="flex bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Main Content -->
    <div class="flex-1 p-5 max-w-4xl">
      <!-- Communities Grid (Top Section) -->
      <div class="grid grid-cols-4 gap-2 mb-6">
        <div 
          v-for="(community, index) in topCommunities" 
          :key="index"
          class="relative h-20 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          :style="{ backgroundColor: community.color }"
          @click="navigateToCommunity(community.title)"
        >
          <div class="absolute top-2 left-2">
            <span class="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {{ index + 1 }}
            </span>
          </div>
          <div class="absolute bottom-2 left-2">
            <h3 class="text-white text-sm font-bold">{{ community.title }}</h3>
          </div>
          <div v-if="community.image" class="absolute top-2 right-2 w-8 h-8 rounded overflow-hidden">
            <img :src="community.image" :alt="community.title" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Posts Feed -->
      <div class="space-y-4">
        <!-- Introducing Communities Card -->
        <div class="bg-red-500 dark:bg-red-600 rounded-md p-6 text-white shadow-md">
          <div class="flex items-start mb-4">
            <i class="fas fa-users text-2xl mr-3"></i>
            <div>
              <h2 class="text-xl font-bold mb-2">Introducing Communities on FanRadar</h2>
              <p class="text-sm leading-relaxed mb-4">
                Communities are public and private spaces you can create on FanRadar — for you, your people, 
                and the things you love. Frogs! Daleks! K-pop! The possibilities are endless.
              </p>
              <button class="bg-black dark:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                Browse communities
              </button>
            </div>
          </div>
        </div>

        <!-- User Posts -->
        <div v-for="post in posts" :key="post.id" class="bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
          <!-- Post Header -->
          <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <img :src="post.avatar" :alt="post.username" class="w-8 h-8 rounded-full mr-3" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 dark:text-white">{{ post.username }}</span>
                <span v-if="post.verified" class="text-blue-500 dark:text-blue-400">
                  <i class="fas fa-check-circle"></i>
                </span>
                <span v-if="post.badges" class="flex gap-1">
                  <span v-for="badge in post.badges" :key="badge" class="text-xs">{{ badge }}</span>
                </span>
              </div>
              <span class="text-gray-500 dark:text-gray-400 text-sm">{{ post.time }}</span>
            </div>
            <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>

          <!-- Post Content -->
          <div class="p-4">
            <!-- Text Content -->
            <div v-if="post.type === 'text'" class="text-gray-900 dark:text-white">
              <div v-if="post.quote" class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 mb-3">
                <p class="italic text-gray-600 dark:text-gray-300">"{{ post.quote }}"</p>
              </div>
              <div v-html="post.content" class="whitespace-pre-line"></div>
              <div v-if="post.tags" class="flex flex-wrap gap-2 mt-4">
                <span v-for="tag in post.tags" :key="tag" class="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">#{{ tag }}</span>
              </div>
            </div>

            <!-- Image Content -->
            <div v-if="post.type === 'image'" class="text-gray-900 dark:text-white">
              <img :src="post.image" :alt="post.title" class="w-full rounded-md mb-3" />
              <div v-if="post.tags" class="flex flex-wrap gap-2">
                <span v-for="tag in post.tags" :key="tag" class="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">#{{ tag }}</span>
              </div>
            </div>

            <!-- Chat Content -->
            <div v-if="post.type === 'chat'" class="text-gray-900 dark:text-white space-y-2">
              <div v-for="(message, idx) in post.messages" :key="idx">
                <span class="font-bold">{{ message.user }}:</span>
                <span class="ml-2">{{ message.text }}</span>
              </div>
              <div v-if="post.tags" class="flex flex-wrap gap-2 mt-4">
                <span v-for="tag in post.tags" :key="tag" class="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer">#{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- Post Footer -->
          <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <span class="text-gray-500 dark:text-gray-400 text-sm">{{ post.notes }} notes</span>
              <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                <i class="fas fa-retweet"></i>
              </button>
              <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                <i class="fas fa-comment"></i>
              </button>
              <button class="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <i class="fas fa-heart"></i>
              </button>
            </div>
            <div class="flex items-center text-gray-500 dark:text-gray-400">
              <i class="fas fa-fire mr-1"></i>
              <span class="text-sm">Blaze</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 p-5 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <!-- Following Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-900 dark:text-white font-bold text-lg">Following</h3>
          <button class="text-red-500 hover:text-red-400 font-medium transition-colors">Manage</button>
        </div>
        <div class="space-y-3">
          <div v-for="user in followingUsers" :key="user.username" class="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 transition-colors cursor-pointer">
            <img :src="user.avatar" :alt="user.username" class="w-8 h-8 rounded mr-3" />
            <div class="flex-1">
              <div class="text-gray-900 dark:text-white font-medium">{{ user.username }}</div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">{{ user.posts }} recent posts</div>
            </div>
          </div>
        </div>
        <button class="text-red-500 hover:text-red-400 text-sm mt-4 transition-colors">Show more tags</button>
      </div>

      <!-- Trending Blogs -->
      <div>
        <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-4">Trending Blogs</h3>
        <div class="space-y-3">
          <div v-for="blog in trendingBlogs" :key="blog.username" class="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md p-2 transition-colors">
            <div class="flex items-center">
              <img :src="blog.avatar" :alt="blog.username" class="w-8 h-8 rounded mr-3" />
              <div>
                <div class="text-gray-900 dark:text-white font-medium">{{ blog.username }}</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs">{{ blog.description }}</div>
              </div>
            </div>
            <button class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm font-medium transition-colors">Follow</button>
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

// Top communities data (numbered cards)
const topCommunities = ref([
  { title: 'literature', color: '#8B4513', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=100&q=80' },
  { title: 'writing', color: '#A0522D', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=100&q=80' },
  { title: 'music', color: '#8B0000', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=100&q=80' },
  { title: 'warrior cats', color: '#556B2F', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80' },
  { title: 'the sims 4', color: '#191970', image: null },
  { title: 'long live the black parade', color: '#006400', image: null },
  { title: 'margot robbie', color: '#8B4513', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
  { title: 'homestuck', color: '#8B4513', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
])

// Posts data
const posts = ref([
  {
    id: 1,
    username: 'gale-gentlepenguin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    time: '3d',
    type: 'text',
    content: `Tanjiro: Muzan is far too powerful. There is no way we can defeat him.

Muzan: (laughing) That's Right! No demon slayer can ever defeat me!`,
    notes: '24',
    verified: false,
    badges: ['🏳️‍🌈', '⚧️']
  },
  {
    id: 2,
    username: 'moxiebusting',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 17',
    type: 'text',
    verified: true,
    quote: "Maybe I'll kill that reporter who does all your interviews. Maybe I'll kill Clark Kent.",
    content: `This is the most important line in the movie. I'm 100% serious. It tells you everything you need to know about Lex Luthor's character. It shows the audience that, despite being almost omniscient from the get-go, Luthor clearly has no fucking idea who Superman is, only what he does.

I've never seen anyone go from All-Knowing Evil to Absolute Fucking Loser so fast. In fifteen words he went from unstoppable criminal powerhouse to failing manchild moron. He gave his Evil Dictator demonstration and then turned around, dropped his pants and showed his entire ass. He proclaimed his manifesto of unrelenting ego, turned around, slipped on a banana...`,
    notes: '1,412'
  },
  {
    id: 3,
    username: 'darlingmarichat',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    time: '2d',
    type: 'chat',
    messages: [
      { user: 'Ladybug', text: 'What would you do if I died?' },
      { user: 'Cat Noir', text: "It's funny that you think I'd let you die" }
    ],
    tags: ['miraculous ladybug', 'mlb incorrect quotes', 'ladybug', 'cat noir', 'ladynoir'],
    notes: '24',
    verified: true,
    badges: ['🏳️‍🌈', '✨']
  },
  {
    id: 4,
    username: 'miamisunshine',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 14',
    type: 'image',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=500&q=80',
    tags: ['mine', 'food', 'instagram'],
    notes: '1,412'
  },
  {
    id: 5,
    username: 'boycritter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 2',
    type: 'text',
    content: 'maybe i like my tech a little bit inconvenient',
    tags: ['boycritter et al'],
    notes: '532'
  }
])

// Following users data
const followingUsers = ref([
  { username: '#deltarune', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', posts: '2147' },
  { username: '#movies', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80', posts: '252' },
  { username: '#cats', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', posts: '498' },
  { username: '#my art', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', posts: '4970' }
])

// Trending blogs data
const trendingBlogs = ref([
  { username: 'sleepynoonradio', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', description: 'Sleepy Noon Radio' },
  { username: 'nasa', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', description: 'NASA' },
  { username: 'scuderia-hamilton', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80', description: "Oscar Piastri's de..." },
  { username: 'coolnessgraphed', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', description: 'Coolness Graphed' }
])

// Navigation function
const navigateToCommunity = (communityName) => {
  router.push({ name: 'Community', params: { name: communityName.toLowerCase() } })
}
</script>

<style scoped>
/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Ensure proper text rendering */
.whitespace-pre-line {
  white-space: pre-line;
}

/* Custom styling for post content */
.post-content p {
  margin-bottom: 1rem;
}

.post-content:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .w-80 {
    display: none;
  }
  
  .flex-1 {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Hover effects for interactive elements */
button:hover {
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>