<template>
  <div class="pl-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Profile Header -->
    <div class="relative bg-gradient-to-tr from-primary-500 to-accent-500 h-48 flex items-center justify-center">
      <img
        :src="user.avatar"
        alt="avatar"
        class="absolute left-1/2 top-36 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-white dark:bg-gray-900 object-cover"
      />
    </div>
    <div class="max-w-2xl mx-auto pt-20 pb-8 px-4">
      <div class="flex flex-col items-center mb-6">
        <h1 class="text-2xl font-bold mb-1">{{ user.name }}</h1>
        <div class="text-blue-500 font-mono mb-2">@{{ user.username }}</div>
        <div class="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{{ user.followers }} followers</span>
          <span>{{ user.following }} following</span>
          <span>{{ posts.length }} posts</span>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          @click="editProfile"
        >
          Edit profile
        </button>
      </div>
      <!-- Tabs -->
      <div class="flex gap-8 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          class="pb-3 font-bold transition-colors border-b-2"
          :class="tab === 'posts' ? 'border-blue-500 text-blue-500 dark:text-blue-400' : 'border-transparent text-gray-400 hover:text-blue-500'"
          @click="tab = 'posts'"
        >
          Posts
        </button>
      </div>
      <!-- Posts List and Following List -->
      <div>
        <div v-if="tab === 'posts'" class="space-y-6">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
              <div>
                <div class="font-bold text-gray-900 dark:text-white">{{ user.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">@{{ user.username }} · {{ post.date }}</div>
              </div>
              <button class="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <div v-if="post.image">
              <img :src="post.image" class="w-full rounded-b-xl" />
            </div>
            <div v-if="post.text" class="px-4 py-3 text-gray-900 dark:text-white">{{ post.text }}</div>
            <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#181c23]">
              <div class="flex gap-4">
                <button
                  class="flex items-center gap-1 text-blue-500 bg-blue-100 dark:bg-[#232b3e] px-2 py-1 rounded-full font-semibold"
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
                <button class="text-gray-400 hover:text-yellow-400"><i class="fas fa-bolt"></i></button>
              </div>
              <span class="text-xs text-gray-400">{{ likes[post.id] }} notes</span>
            </div>
            <div v-if="commentsOpen[post.id]" class="bg-gray-50 dark:bg-[#181c23] px-4 py-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-3 mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" class="w-8 h-8 rounded-full" />
                <input
                  v-model="newComment[post.id]"
                  @keyup.enter="addComment(post.id)"
                  type="text"
                  placeholder="Reply as @yassineelaouni"
                  class="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div class="text-sm text-gray-900 dark:text-white">{{ comment.text }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center py-10">
                <i class="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
                <div class="text-gray-400 mb-2">Be the first to Reply! Or...</div>
                <a href="#" class="text-blue-500 hover:underline font-medium">Check out the Likes</a>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="tab === 'following'" class="space-y-6">
          <div v-for="follow in following" :key="follow.id" class="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center p-4">
            <img :src="follow.avatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <div class="font-bold text-gray-900 dark:text-white">{{ follow.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">@{{ follow.username }}</div>
            </div>
            <button class="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors">
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const username = route.params.username || 'yassineelaouni'

// Mock user info
const user = ref({
  name: 'Ysselhhhhhhhhhhhhhhhhh',
  username,
  avatar: 'https://ui-avatars.com/api/?name=Yssel&background=6366f1&color=fff&size=128',
  followers: 1234,
  following: 567,
})

// Mock posts
const posts = ref([
  {
    id: 1,
    date: '3d',
    text: 'hhhhhhhhhhhhhhhhhhhhhhh\n\n#ijjj',
    notes: 0,
    image: null
  },
  {
    id: 2,
    date: '3d',
    text: null,
    notes: 0,
    image: 'https://www.eatingwell.com/thmb/088YHsNmHkUQ7iNGP4375MiAXOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_7866255_foods-you-should-eat-every-week-to-lose-weight_-04-d58e9c481bce4a29b47295baade4072d.jpg'
  }
])

// Mock likes
// Removed duplicate 'likes' declaration to fix redeclaration error

// Mock following
const following = ref([
  {
    id: 1,
    name: 'fanradaruser',
    username: 'fanradaruser',
    avatar: 'https://ui-avatars.com/api/?name=FanRadar&background=6366f1&color=fff&size=128'
  },
  {
    id: 2,
    name: 'Blaze',
    username: 'blaze',
    avatar: 'https://ui-avatars.com/api/?name=Blaze&background=6366f1&color=fff&size=128'
  }
])

const tab = ref('posts')
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

function editProfile() {
  router.push('/edit-account')
}
</script>
