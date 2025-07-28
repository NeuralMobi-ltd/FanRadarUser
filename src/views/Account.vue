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
import Post from '@/components/Post.vue'

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
// (duplicate declaration removed)

// (Duplicate block removed)

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
