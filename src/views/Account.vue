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
          <span>{{ userPosts?.length || 0 }} posts</span>
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
        <!-- Posts List -->
        <div v-if="tab === 'posts'" class="space-y-6">
          <div v-for="post in mockPosts" :key="post.id" class="relative group">
            <!-- Custom rendering for post content -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 mb-2">
              <div class="flex items-center gap-3 mb-2">
                <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full" />
                <div>
                  <div class="font-bold text-gray-900 dark:text-white">{{ user.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">@{{ user.username }}</div>
                  <div class="text-xs text-gray-400">{{ new Date(post.date).toLocaleString() }}</div>
                </div>
              </div>
              <div class="space-y-3 mt-2">
                <div v-for="(item, idx) in post.content" :key="idx">
                  <div v-if="item.type === 'text'" class="whitespace-pre-line text-base text-gray-900 dark:text-white">
                    {{ item.content }}
                  </div>
                  <div v-else-if="item.type === 'image'" class="my-2">
                    <img :src="item.content" class="rounded-lg max-w-full max-h-80" />
                  </div>
                  <div v-else-if="item.type === 'video'" class="my-2">
                    <video :src="item.content" controls class="rounded-lg max-w-full max-h-80"></video>
                  </div>
                </div>
                <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-2">
                  <span v-for="tag in post.tags" :key="tag" class="text-blue-500 dark:text-blue-400 text-sm font-medium">#{{ tag }}</span>
                </div>
              </div>
            </div>
            <!-- Edit/Delete Controls -->
            <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="editPost(post)"
                class="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="deletePost(post.id)"
                class="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <i class="fas fa-trash"></i>
              </button>
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

    <!-- Edit Post Modal -->
    <CreatePostModal
      v-if="showEditModal"
      :is-visible="showEditModal"
      :initial-content="editingPost"
      @close="closeEditModal"
      @create="handleEditPost"
    />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'
import Post from '@/components/Post.vue'
import CreatePostModal from '@/components/CreatePostModal.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const authStore = useAuthStore()
const username = 'admin'

// Mock user info
const user = ref({
  name: authStore.userName || 'User',
  username,
  avatar: authStore.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128',
  followers: authStore.user?.followers || 0,
  following: authStore.user?.following || 0,
})

// Get posts from store
const userPosts = computed(() => {
  return postsStore.posts.filter(post => post.author === username)
})

const tab = ref('posts')
const commentsOpen = ref({})
const likedPosts = ref({})
const likes = ref({})
const comments = ref({})
const newComment = ref({})
const showEditModal = ref(false)
const editingPost = ref(null)

// Mock posts data
const mockPosts = [
  {
    id: 1,
    content: [
      { type: 'text', content: 'This is a mock text post.' },
      { type: 'image', content: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
    ],
    tags: ['mock', 'demo'],
    date: new Date().toISOString()
  },
  {
    id: 2,
    content: [
      { type: 'image', content: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80' }
    ],
    tags: ['image', 'sample'],
    date: new Date().toISOString()
  }
]

// Initialize likes and comments for each post
watchEffect(() => {
  if (userPosts.value) {
    userPosts.value.forEach(post => {
      if (!likes.value[post.id]) {
        likes.value[post.id] = Number((post.notes || '0').replace(/,/g, ''))
        comments.value[post.id] = []
        newComment.value[post.id] = ''
        likedPosts.value[post.id] = false
      }
    })
  }
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

function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    postsStore.deletePost(postId)
  }
}

function editPost(post) {
  editingPost.value = { ...post }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingPost.value = null
}

function handleEditPost(updatedContent) {
  if (editingPost.value) {
    postsStore.updatePost(editingPost.value.id, updatedContent)
  }
  closeEditModal()
}
</script>