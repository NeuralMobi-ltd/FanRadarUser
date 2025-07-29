<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Banner/Header Area -->
    <div class="relative">
      <div class="h-48 bg-gradient-to-r from-purple-600 to-blue-500 w-full"></div>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-32"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-16">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="flex items-end gap-4">
            <div class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white shadow-lg overflow-hidden">
              <img :src="fandom.avatar" class="w-full h-full object-cover" alt="Fandom avatar" />
            </div>
            <div class="mb-2">
              <h1 class="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{{ fandom.name }}</h1>
              <p class="text-white/90 text-sm sm:text-base">{{ fandom.tagline || 'Join our community' }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 mb-4">
            <button class="flex items-center gap-2 bg-white/90 hover:bg-white text-purple-700 px-4 py-2 rounded-full font-medium transition-all shadow-sm">
              <i class="fas fa-user-plus text-sm"></i>
              <span>Join</span>
            </button>
            <button class="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-purple-700 rounded-full transition-all shadow-sm">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column - Content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- About Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-info-circle text-blue-500"></i>
            <span>About this community</span>
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">{{ fandom.description || 'Welcome to our community! Join us to share your passion.' }}</p>
          
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in fandom.tags" :key="tag" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
              #{{ tag }}
            </span>
          </div>
          
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.members }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Members</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.posts }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.online }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Online</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-blue-500">{{ fandom.createdAt }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Created</div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'latest' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'latest'"
            >
              <span>Latest</span>
            </button>
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'polls' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'polls'"
            >
              <span>Polls</span>
            </button>
            <button 
              class="px-6 py-3 font-medium relative"
              :class="activeTab === 'media' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="activeTab = 'media'"
            >
              <span>Media</span>
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-6">
            <!-- Post Creation -->
            <div v-if="activeTab === 'latest'" class="mb-6">
              <div class="flex items-start gap-3">
                <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
                <div class="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <input 
                    type="text" 
                    placeholder="Create a post..." 
                    class="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
                    @click="showPostModal = true"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-7 gap-1 mt-3">
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-font text-blue-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Text</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-image text-green-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Photo</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-link text-orange-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Link</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-poll text-purple-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Poll</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-video text-red-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Video</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-music text-pink-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Audio</span>
                </button>
                <button class="flex flex-col items-center justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i class="fas fa-quote-right text-yellow-500"></i>
                  <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">Quote</span>
                </button>
              </div>
            </div>
            
            <!-- Posts Feed -->
            <div v-if="activeTab === 'latest'" class="space-y-6">
              <Post
                v-for="post in formattedPosts"
                :key="post.id"
                :post="post"
                :is-liked="likedPosts[post.id]"
                :is-comments-open="commentsOpen[post.id]"
                :comments="comments[post.id]"
                :likes-count="post.likes"
                :comments-count="post.comments || 0"
                @toggle-comments="toggleComments(post.id)"
                @toggle-like="toggleLike(post.id)"
                @add-comment="(text) => addComment(post.id, text)"
              />
            </div>
            
            <!-- Polls Tab -->
            <div v-if="activeTab === 'polls'" class="py-6">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <i class="fas fa-poll text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">No polls yet</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Create a poll to engage with the community</p>
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                  Create Poll
                </button>
              </div>
            </div>
            
            <!-- Media Tab -->
            <div v-if="activeTab === 'media'" class="py-6">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div v-for="(post, index) in postsWithMedia" :key="index" class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img v-if="post.image" :src="post.image" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                    <i class="fas fa-image text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        <!-- Moderators -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-shield-alt text-blue-500"></i>
            <span>Moderators</span>
          </h2>
          <div class="space-y-3">
            <div v-for="mod in moderators" :key="mod.id" class="flex items-center gap-3">
              <img :src="mod.avatar" class="w-10 h-10 rounded-full" alt="Moderator avatar" />
              <div>
                <div class="font-medium">{{ mod.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">@{{ mod.username }}</div>
              </div>
              <span v-if="mod.isAdmin" class="ml-auto px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
        
        <!-- Community Rules -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-gavel text-blue-500"></i>
            <span>Community Rules</span>
          </h2>
          <ol class="list-decimal list-inside space-y-2 text-sm">
            <li>Be respectful to all members</li>
            <li>No spam or self-promotion</li>
            <li>Keep content relevant to the fandom</li>
            <li>No NSFW content</li>
            <li>Follow Tumblr's community guidelines</li>
          </ol>
        </div>
        
        <!-- Similar Communities -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-users text-blue-500"></i>
            <span>Similar Communities</span>
          </h2>
          <div class="space-y-4">
            <div v-for="community in similarCommunities" :key="community.id" class="flex items-center gap-3">
              <img :src="community.avatar" class="w-10 h-10 rounded-full" alt="Community avatar" />
              <div>
                <div class="font-medium">{{ community.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ community.members }} members</div>
              </div>
              <button class="ml-auto text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Post Creation Modal -->
    <div v-if="showPostModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-bold">Create Post</h3>
          <button @click="showPostModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4">
          <div class="flex items-start gap-3 mb-4">
            <img :src="currentUser.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
            <div>
              <div class="font-medium">{{ currentUser.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Posting to {{ fandom.name }}</div>
            </div>
          </div>
          
          <textarea 
            v-model="newPostContent"
            placeholder="What would you like to share?"
            class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none min-h-[150px]"
          ></textarea>
          
          <div class="mt-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
            <i class="fas fa-image text-3xl text-gray-400 mb-2"></i>
            <p class="text-gray-500 dark:text-gray-400">Drag and drop images or click to browse</p>
            <button class="mt-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-full transition-colors">
              Select Files
            </button>
          </div>
        </div>
        <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <button @click="showPostModal = false" class="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Post from '@/components/Post.vue'

const activeTab = ref('latest')
const showPostModal = ref(false)
const newPostContent = ref('')

// Mock data
const fandom = ref({
  name: 'Underwater Basketweavers',
  handle: 'underwater-basketweavers',
  tagline: 'A community celebrating original artists on Tumblr',
  avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
  banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
  members: '3,245',
  posts: '423',
  online: '1',
  description: 'Welcome to the official community for underwater basket weaving enthusiasts! Share your creations, techniques, and connect with fellow artists.',
  tags: ['art', 'craft', 'weaving', 'creative', 'handmade'],
  createdAt: 'January 15, 2023',
  isPrivate: false
})

const currentUser = ref({
  name: 'Yassine El Aouni',
  username: 'yassineelaouni',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
})

const moderators = ref([
  {
    id: 1,
    name: 'Ilia Hahh',
    username: 'ilia-hahh',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isAdmin: true
  },
  {
    id: 3,
    name: 'Mike Chen',
    username: 'mikechen',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isAdmin: false
  }
])

const similarCommunities = ref([
  {
    id: 1,
    name: 'Fiber Arts Collective',
    avatar: 'https://images.unsplash.com/photo-1590544848371-d44111ea798e?auto=format&fit=crop&w=500&q=80',
    members: '8.2k'
  },
  {
    id: 2,
    name: 'Handmade Crafts',
    avatar: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=500&q=80',
    members: '12.5k'
  },
  {
    id: 3,
    name: 'Traditional Weaving',
    avatar: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80',
    members: '5.7k'
  }
])

const fandomPosts = ref([
  {
    id: 1,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    content: 'Just finished my latest underwater basket! The kelp fibers worked beautifully with the coral accents.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    likes: 156,
    comments: 32,
    date: '3 hours ago',
    tags: ['basket', 'kelp', 'coral', 'showcase']
  },
  {
    id: 2,
    author: {
      name: 'Mike Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    content: 'Anyone going to the International Underwater Weaving Conference next month? Looking for roommates!',
    likes: 89,
    comments: 47,
    date: '1 day ago',
    tags: ['conference', 'meetup', 'event']
  },
  {
    id: 3,
    author: {
      name: 'Alex Rivera',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    content: 'New tutorial up on my blog - how to harvest and prepare seaweed for weaving. Link in bio!',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    likes: 432,
    comments: 78,
    date: '2 days ago',
    tags: ['tutorial', 'seaweed', 'technique']
  }
])

// Format posts to match Post component's expected structure
const formattedPosts = computed(() => {
  return fandomPosts.value.map(post => {
    return {
      id: post.id,
      username: post.author.name,
      avatar: post.author.avatar,
      date: post.date,
      text: post.content,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      tags: post.tags || []
    }
  })
})

const postsWithMedia = computed(() => {
  return formattedPosts.value.filter(post => post.image)
})

// States for post interactions
const commentsOpen = ref({})
const likedPosts = ref({})
const comments = ref({})

// Initialize states for each post
onMounted(() => {
  formattedPosts.value.forEach(post => {
    commentsOpen.value[post.id] = false
    likedPosts.value[post.id] = false
    comments.value[post.id] = []
  })
})

// Post interaction methods
function toggleComments(postId) {
  commentsOpen.value[postId] = !commentsOpen.value[postId]
}

function toggleLike(postId) {
  likedPosts.value[postId] = !likedPosts.value[postId]
  const post = formattedPosts.value.find(p => p.id === postId)
  if (post) {
    post.likes += likedPosts.value[postId] ? 1 : -1
  }
}

function addComment(postId, text) {
  const trimmedText = text.trim()
  if (!trimmedText) return
  if (!comments.value[postId]) {
    comments.value[postId] = []
  }
  
  comments.value[postId].push({
    user: currentUser.value.username,
    avatar: currentUser.value.avatar,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text: trimmedText
  })
  
  // Increment comment count
  const post = formattedPosts.value.find(p => p.id === postId)
  if (post) {
    post.comments = (post.comments || 0) + 1
  }
}
</script>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark ::-webkit-scrollbar-track {
  background: #2d3748;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4a5568;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>