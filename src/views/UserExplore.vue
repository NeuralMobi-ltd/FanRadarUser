<template>
  <div class="flex bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">

    <!-- Main Content -->
    <div class="flex-1 px-10 pt-8">
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
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :is-liked="likedPosts[post.id]"
          :is-comments-open="commentsOpen[post.id]"
          :comments="comments[post.id]"
          :likes-count="likes[post.id]"
          :comments-count="comments[post.id]?.length || 0"
          @toggle-comments="toggleComments(post.id)"
          @toggle-like="toggleLike(post.id)"
          @add-comment="(text) => addComment(post.id, text)"
        />
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 flex-shrink-0 min-h-screen flex flex-col gap-4 px-2 py-6 bg-transparent">
      <!-- Following Card -->
      <div class="bg-white text-gray-900 rounded-2xl shadow-lg p-4 mb-2 dark:bg-[#11161f] dark:text-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">Following</h3>
          <button class="text-blue-500 hover:text-blue-400 font-medium transition-colors">Manage</button>
        </div>
        <div class="space-y-3">
          <div v-for="user in followingUsers" :key="user.username"
            class="flex items-center hover:bg-gray-100 dark:hover:bg-[#232b3e] rounded-md p-2 transition-colors cursor-pointer">
            <img :src="user.avatar" :alt="user.username" class="w-8 h-8 rounded mr-3" />
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">{{ user.username }}</div>
              <div class="text-gray-500 dark:text-gray-400 text-xs truncate">{{ user.posts }} recent posts</div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-[#232b3e] my-4"></div>
        <button class="w-full text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors text-center">
          Show more tags
        </button>
      </div>

      <!-- Trending Blogs Card -->
      <div class="bg-white text-gray-900 rounded-2xl shadow-lg p-4 dark:bg-[#11161f] dark:text-white">
        <h3 class="font-bold text-base mb-3">Trending Blogs</h3>
        <div class="divide-y divide-gray-200 dark:divide-[#232b3e]">
          <div v-for="blog in trendingBlogs" :key="blog.username" class="flex items-center justify-between py-2">
            <div class="flex items-center min-w-0">
              <img :src="blog.avatar" :alt="blog.username" class="w-8 h-8 rounded mr-3" />
              <div class="min-w-0">
                <div class="font-semibold truncate">{{ blog.username }}</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs truncate">{{ blog.description }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">Follow</button>
              <button class="text-gray-400 hover:text-red-500 text-lg px-1" title="Remove">
                &times;
              </button>
            </div>
          </div>
        </div>
        <button class="w-full mt-3 text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors text-center">
          Show more blogs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Post from '@/components/Post.vue'

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
    badges: ['']
  },
  {
    id: 2,
    username: 'moxiebusting',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 17',
    type: 'text',
    verified: false,
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
    type: 'image',
    image: 'https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2025-03/Ultraprocessed%20foods%20display%202%20framed%20-%20shutterstock_2137640529_r.jpg?h=ab94ba44&itok=yrOIN-8T',
    tags: ['miraculous ladybug', 'mlb incorrect quotes', 'ladybug', 'cat noir', 'ladynoir'],
    notes: '24',
    verified: true,
    badges: ['✨']
  },
  {
    id: 4,
    username: 'miamisunshine',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 14',
    type: 'image',
    image: 'https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2025-03/Ultraprocessed%20foods%20display%202%20framed%20-%20shutterstock_2137640529_r.jpg?h=ab94ba44&itok=yrOIN-8T',
    tags: ['mine', 'food', 'instagram'],
    notes: '1,412'
  },
  {
    id: 5,
    username: 'boycritter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    time: 'Jul 2',
    type: 'image',
    image: 'https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2025-03/Ultraprocessed%20foods%20display%202%20framed%20-%20shutterstock_2137640529_r.jpg?h=ab94ba44&itok=yrOIN-8T',
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

const commentsOpen = ref({})
const likedPosts = ref({})
const likes = ref({})
const comments = ref({})
const newComment = ref({})

// Initialize likes and comments for each post
posts.value.forEach(post => {
  likes.value[post.id] = Number((post.notes || '0').replace(/,/g, ''))
  comments.value[post.id] = []
  newComment.value[post.id] = ''
  likedPosts.value[post.id] = false
})

function toggleComments(postId) {
  commentsOpen.value[postId] = !commentsOpen.value[postId]
}

function toggleLike(postId) {
  likedPosts.value[postId] = !likedPosts.value[postId]
  likes.value[postId] += likedPosts.value[postId] ? 1 : -1
}

function addComment(postId, text) {
  const trimmedText = (text || '').trim()
  if (!trimmedText) return
  comments.value[postId].push({
    user: 'yassineelaouni',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text: trimmedText
  })
  newComment.value[postId] = ''
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