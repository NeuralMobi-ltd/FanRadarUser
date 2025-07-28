<template>
  <div class="flex min-h-screen bg-black text-white transition-colors duration-200">
    <!-- Main Feed -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-black">
      <!-- Tabs -->
      <div class="flex gap-8 mb-6 w-full max-w-2xl border-b border-[#232b3e] mx-auto justify-center">
        <button
          class="pb-3 font-bold transition-colors border-b-2"
          :class="tab === 'foryou' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white'"
          @click="tab = 'foryou'"
        >
          For you
        </button>
        <button
          class="pb-3 font-bold transition-colors border-b-2"
          :class="tab === 'following' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white'"
          @click="tab = 'following'"
        >
          Following
        </button>
      </div>
      <!-- Post Composer -->
      <div class="flex gap-3 mb-6 w-full max-w-2xl mx-auto justify-center">
        <button class="flex flex-col items-center justify-center bg-[#181c23] hover:bg-[#232b3e] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-font text-lg"></i>
          <span class="text-xs">Text</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#181c23] hover:bg-[#232b3e] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-camera text-lg"></i>
          <span class="text-xs">Photo</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#181c23] hover:bg-[#232b3e] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-quote-left text-lg"></i>
          <span class="text-xs">Quote</span>
        </button>
        <button class="flex flex-col items-center justify-center bg-[#181c23] hover:bg-[#232b3e] text-white rounded-lg px-4 py-2 font-bold">
          <i class="fas fa-video text-lg"></i>
          <span class="text-xs">Video</span>
        </button>
      </div>
      <!-- Posts Feed -->
      <div class="flex flex-col items-center w-full max-w-2xl mx-auto gap-6 justify-center">
        <div v-for="post in posts" :key="post.id" class="w-full bg-[#181c23] rounded-xl shadow border border-gray-700">
          <div class="flex items-center p-4 border-b border-gray-700">
            <img :src="post.avatar" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <div class="font-bold text-white">{{ post.username }}</div>
              <div class="text-xs text-gray-400">{{ post.date }}</div>
            </div>
            <button class="ml-auto text-gray-400 hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
          </div>
          <div v-if="post.image">
            <img :src="post.image" class="w-full" />
          </div>
          <div v-if="post.text" class="px-4 py-3 text-white">{{ post.text }}</div>
          <div class="flex items-center justify-between px-4 py-2 border-t border-[#232b3e] bg-[#1a1f2a]">
            <div class="flex gap-4">
              <button
                class="flex items-center gap-1 px-2 py-1 rounded-full font-semibold"
                :class="commentsOpen[post.id] ? 'text-blue-500 bg-blue-900' : 'text-gray-400 hover:text-blue-400'"
                @click="toggleComments(post.id)"
              >
                <i class="fas fa-comment"></i>
                <span>{{ comments[post.id]?.length || 0 }}</span>
              </button>
              <button class="text-gray-400 hover:text-green-400"><i class="fas fa-retweet"></i></button>
              <button
                class="flex items-center gap-1"
                :class="{'text-red-500': likedPosts[post.id], 'text-gray-400': !likedPosts[post.id]}"
                @click="toggleLike(post.id)"
              >
                <i class="fas fa-heart"></i>
                <span>{{ likes[post.id] }}</span>
              </button>
            </div>
          </div>
          <div v-if="commentsOpen[post.id]" class="bg-[#1a1f2a] px-4 py-6 border-t border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
              <input
                v-model="newComment[post.id]"
                @keyup.enter="addComment(post.id)"
                type="text"
                placeholder="Reply as @yassineelaouni"
                class="flex-1 bg-transparent border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="addComment(post.id)"
                class="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
            <div v-if="comments[post.id]?.length" class="space-y-6">
              <div v-for="(comment, idx) in comments[post.id]" :key="idx" class="flex items-start gap-3">
                <img :src="comment.avatar" alt="avatar" class="w-8 h-8 rounded-full" />
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-blue-400">@{{ comment.user }}</span>
                    <span class="text-xs text-gray-400">{{ comment.date }}</span>
                  </div>
                  <div class="text-sm text-white">{{ comment.text }}</div>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-10">
              <i class="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
              <div class="text-gray-400 mb-2">Be the first to Reply!</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Right Sidebar -->
    <aside class="w-80 bg-[#181c23] border-l border-[#232b3e] flex flex-col gap-6 py-8 px-4">   
      <!-- Trending Blogs Card -->
      <div class="bg-[#232b3e] text-white rounded-2xl shadow-lg p-4">
        <h3 class="font-bold text-base mb-3">Trending Blogs</h3>
        <div class="divide-y divide-[#181c23]">
          <div v-for="blog in trendingBlogs" :key="blog.username" class="flex items-center justify-between py-2">
            <div class="flex items-center min-w-0">
              <img :src="blog.avatar" :alt="blog.username" class="w-8 h-8 rounded mr-3" />
              <div class="min-w-0">
                <div class="font-semibold truncate">{{ blog.username }}</div>
                <div class="text-gray-400 text-xs truncate">{{ blog.description }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">Follow</button>
              <button class="text-gray-400 hover:text-red-500 text-lg px-1" title="Remove">
                &times;
              </button>
            </div>
          </div>
        </div>
        <button class="w-full mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors text-center">
          Show more blogs
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
const tab = ref('foryou')
const blogs = [
  { username: 'realgrumpycat', desc: 'The Official Grumpy Cat' },
  { username: 'dreamatdusk', desc: 'DreamAtDusk' },
  { username: 'twisted-cat', desc: 'Twistedcat' },
  { username: 'bbybluemochi', desc: 'bbybluemochi' }
]
const posts = [
  {
    id: 1,
    username: 'my-heart-of-heart',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Jul 9',
    image: 'https://www.watchmojo.com/uploads/share-image/VIDEO-SHARE-18222.jpg?2022-04-21.v2',
    notes: 848
  },
  {
    id: 2,
    username: 'fanartlover',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Jul 10',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    notes: 1203
  },
  {
    id: 3,
    username: 'textpostguy',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    date: 'Jul 11',
    text: 'Just finished reading a great book! Highly recommend it to everyone. 📚',
    notes: 312
  },
  {
    id: 4,
    username: 'gifqueen',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    date: 'Jul 12',
    image: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
    notes: 789
  }
]
const followingPosts = [
  {
    id: 101,
    username: 'fanradaruser',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Jul 19',
    text: 'Just got my new CR7 t-shirt from FanRadarMart!',
    likes: 12,
    tags: ['cr7', 'fanradarmart'],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    verified: true,
    comments: 0,
    notes: 12
  },
  {
    id: 102,
    username: 'animefan',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Jul 18',
    text: 'One Piece episode was fire! 🔥',
    likes: 8,
    tags: ['onepiece', 'anime'],
    image: null,
    verified: false,
    comments: 0,
    notes: 8
  }
]

import { ref } from 'vue'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const commentsOpen = ref({})
const likedPosts = ref({})
const likes = ref({})
const comments = ref({})
const newComment = ref({})

posts.forEach(post => {
  likes.value[post.id] = post.notes || 0
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

function addComment(postId) {
  const text = (newComment.value[postId] || '').trim()
  if (!text) return
  comments.value[postId].push({
    user: 'yassineelaouni',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text
  })
  newComment.value[postId] = ''
}

const followingTags = [
  { username: '#deltarune', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', posts: '2147' },
  { username: '#movies', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80', posts: '252' },
  { username: '#cats', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', posts: '498' },
  { username: '#my art', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', posts: '4970' }
]

const trendingBlogs = [
  { username: 'sleepynoonradio', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', description: 'Sleepy Noon Radio' },
  { username: 'nasa', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', description: 'NASA' },
  { username: 'scuderia-hamilton', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=80', description: "Oscar Piastri's de..." },
  { username: 'coolnessgraphed', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', description: 'Coolness Graphed' }
]
</script>


<style scoped>
/* All styling is handled by Tailwind classes */
</style>
