<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Profile Header with Gradient Background -->
    <div class="relative bg-gradient-to-r from-indigo-500 to-purple-600 h-48">
      <!-- Cover Photo with Edit Button -->
      <div class="absolute inset-0 overflow-hidden group">
        <img 
          :src="user.coverPhoto || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1350&q=80'"
          alt="Cover photo"
          class="w-full h-full object-cover"
        />
        <button 
          @click="editCoverPhoto"
          class="absolute bottom-4 right-4 bg-white/90 text-indigo-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CameraIcon class="h-5 w-5" />
        </button>
      </div>
      
      <!-- Profile Picture -->
      <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
        <div class="relative group">
          <img
            :src="user.avatar"
            alt="Profile picture"
            class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-900 shadow-xl object-cover bg-white"
          />
          <button
            @click="editProfilePhoto"
            class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <CameraIcon class="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <!-- Profile Info Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <!-- Name and Username -->
        <div class="text-center px-6 pt-6 pb-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-indigo-500 font-mono">@{{ user.username }}</p>
          
          <!-- Stats -->
          <div class="flex justify-center space-x-6 mt-4 text-sm">
            <div class="flex flex-col items-center">
              <span class="font-bold text-gray-900 dark:text-white">{{ user.posts }}</span>
              <span class="text-gray-500 dark:text-gray-400">Posts</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-bold text-gray-900 dark:text-white">{{ user.followers }}</span>
              <span class="text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-bold text-gray-900 dark:text-white">{{ user.following }}</span>
              <span class="text-gray-500 dark:text-gray-400">Following</span>
            </div>
          </div>
          
          <!-- Bio -->
          <p v-if="user.bio" class="mt-4 text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            {{ user.bio }}
          </p>
          
          <!-- Action Buttons -->
          <div class="mt-6 flex justify-center">
            <button
              @click="editProfile"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PencilIcon class="-ml-1 mr-2 h-4 w-4" />
              Edit Profile
            </button>
            <button
              @click="showCreatePostModal = true"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PlusIcon class="-ml-1 mr-2 h-4 w-4" />
              New Post
            </button>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="border-t border-gray-200 dark:border-gray-700 mt-4">
          <nav class="flex -mb-px">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="currentTab = tab.name"
              :class="[
                currentTab === tab.name
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300',
                'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center'
              ]"
            >
              <component :is="tab.icon" class="mr-2 h-5 w-5" />
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Posts Tab -->
        <div v-if="currentTab === 'posts'" class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="post in userPosts" :key="post.id" class="p-6">
            <div class="flex items-start">
              <img :src="user.avatar" alt="Avatar" class="h-10 w-10 rounded-full mr-3" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <p class="font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                  <span class="mx-1 text-gray-500">·</span>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.date) }}
                  </p>
                </div>
                
 <!-- Post Content -->
  <div class="mt-2 space-y-3">
    <p v-if="post.content" class="text-gray-800 dark:text-gray-200 whitespace-pre-line">
      {{ post.content }}
    </p>
    
    <!-- Media Gallery -->
    <div v-if="post.media?.length" class="grid gap-2 mt-2"
      :class="{
        'grid-cols-1': post.media.length === 1,
        'grid-cols-2': post.media.length === 2 || post.media.length === 4,
        'grid-cols-3': post.media.length === 3 || post.media.length >= 5
      }"
    >
      <div v-for="(media, index) in post.media" :key="index" class="relative">
        <img 
          v-if="media.type === 'image'"
          :src="media.url" 
          class="rounded-lg w-full h-full object-cover aspect-square"
          @click="openMediaViewer(post.media, index)"
        />
        <video
          v-else-if="media.type === 'video'"
          :src="media.url"
          class="rounded-lg w-full h-full object-cover aspect-square"
          @click="openMediaViewer(post.media, index)"
        />
        <div v-if="post.media.length > 1 && index === 3 && post.media.length > 4" 
          class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer"
          @click="openMediaViewer(post.media, index)"
        >
          <span class="text-white text-2xl font-bold">+{{ post.media.length - 4 }}</span>
        </div>
      </div>
    </div>
    
    <!-- Tags -->
    <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-2">
      <span 
        v-for="tag in post.tags" 
        :key="tag"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
      >
        #{{ tag }}
      </span>
    </div>
  </div>

  <!-- Media Viewer Modal -->
  <MediaViewer 
    v-if="showMediaViewer"
    :media="viewerMedia"
    :initial-index="viewerIndex"
    @close="showMediaViewer = false"
  />
                
                <!-- Post Actions -->
                <div class="mt-4 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <button 
                    @click="toggleLike(post.id)" 
                    :class="{'text-red-500': isPostLiked(post.id)}"
                    class="flex items-center space-x-1 hover:text-red-500"
                  >
                    <HeartIcon class="h-5 w-5" />
                    <span>{{ post.likes }}</span>
                  </button>
                  <button class="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <ChatBubbleLeftIcon class="h-5 w-5" />
                    <span>{{ post.comments }}</span>
                  </button>
                  <button class="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <ArrowPathIcon class="h-5 w-5" />
                    <span>{{ post.shares }}</span>
                  </button>
                </div>
              </div>
              
              <!-- Post Options -->
              <div class="ml-4 relative">
                <button 
                  @click="togglePostMenu(post.id)"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <EllipsisHorizontalIcon class="h-5 w-5" />
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="openPostMenu === post.id"
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <button 
                      @click="editPost(post)"
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      Edit Post
                    </button>
                    <button 
                      @click="deletePost(post.id)"
                      class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="!userPosts.length" class="p-12 text-center">
            <InboxIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts yet</h3>
         
            <div class="mt-6">
            </div>
          </div>
        </div>
        
        <!-- Following Tab -->
        <div v-else-if="currentTab === 'following'" class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="person in following" :key="person.id" class="p-4">
            <div class="flex items-center">
              <img :src="person.avatar" alt="Avatar" class="h-10 w-10 rounded-full" />
              <div class="ml-4 flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ person.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{{ person.username }}
                </p>
              </div>
              <button
                @click="unfollow(person.id)"
                class="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Following
              </button>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="!following.length" class="p-12 text-center">
            <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Not following anyone</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Find people to follow and see their posts here.
            </p>
          </div>
        </div>
        
        <!-- Favorites Tab -->
        <div v-else-if="currentTab === 'favorites'" class="divide-y divide-gray-200 dark:divide-gray-700">
          <div v-for="post in favoritePosts" :key="post.id" class="p-6">
            <div class="flex items-start">
              <img :src="post.authorAvatar || 'https://ui-avatars.com/api/?name='+post.authorName" alt="Avatar" class="h-10 w-10 rounded-full mr-3" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center">
                  <p class="font-medium text-gray-900 dark:text-white">{{ post.authorName }}</p>
                  <span class="mx-1 text-gray-500">·</span>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.date) }}
                  </p>
                </div>
                
                <!-- Post Content -->
                <div class="mt-2 space-y-3">
                  <p class="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {{ post.content }}
                  </p>
                  <img 
                    v-if="post.image" 
                    :src="post.image" 
                    class="rounded-lg max-w-full max-h-96 object-contain"
                  />
                  
                  <!-- Tags -->
                  <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-2">
                    <span 
                      v-for="tag in post.tags" 
                      :key="tag"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
                
                <!-- Post Actions -->
                <div class="mt-4 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <button 
                    @click="toggleLike(post.id)" 
                    class="flex items-center space-x-1 text-red-500"
                  >
                    <HeartIcon class="h-5 w-5" />
                    <span>{{ post.likes }}</span>
                  </button>
                  <button class="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <ChatBubbleLeftIcon class="h-5 w-5" />
                    <span>{{ post.comments }}</span>
                  </button>
                  <button class="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <ArrowPathIcon class="h-5 w-5" />
                    <span>{{ post.shares }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="!favoritePosts.length" class="p-12 text-center">
            <HeartIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No favorite posts yet</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Like posts to see them appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Create Post Modal -->
    <CreatePostModal 
      v-if="showCreatePostModal"
      @close="showCreatePostModal = false"
      @post-created="handlePostCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { usePostsStore } from '@/store/posts'
import {
  CameraIcon,
  PencilIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  InboxIcon,
  PlusIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'
import CreatePostModal from '@/components/CreatePostModal.vue'
import MediaViewer from '@/components/MediaViewer.vue'


const router = useRouter()
const authStore = useAuthStore()
const postsStore = usePostsStore()

// User data
const user = ref({
  name: authStore.user?.name || 'User',
  username: authStore.user?.username || 'username',
  avatar: authStore.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
  coverPhoto: authStore.user?.coverPhoto || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1350&q=80',
  bio: authStore.user?.bio || 'Digital creator | Photography enthusiast | Coffee lover',
  posts: 24,
  followers: 1243,
  following: 56
})

// Tabs
const tabs = [
  { name: 'posts', label: 'Posts', icon: 'div' },
  { name: 'following', label: 'Following', icon: UserGroupIcon },
  { name: 'favorites', label: 'Favorites', icon: HeartIcon }
]
const currentTab = ref('posts')

// Modal state
const showCreatePostModal = ref(false)

// Posts
const userPosts = computed(() => {
  return postsStore.posts.filter(post => post.author === user.value.username)
})

// Favorite posts (posts you've liked)
const favoritePosts = computed(() => {
  return postsStore.posts.filter(post => 
    post.likedBy && post.likedBy.includes(user.value.username)
  )
})

// Following
const following = ref([
  {
    id: 1,
    name: 'Jane Cooper',
    username: 'janecooper',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg'
  },
  {
    id: 2,
    name: 'Alex Morgan',
    username: 'alexmorgan',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Sam Wilson',
    username: 'samwilson',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
  }
])

const showMediaViewer = ref(false)
const viewerMedia = ref([])
const viewerIndex = ref(0)

function openMediaViewer(media, index) {
  viewerMedia.value = media
  viewerIndex.value = index
  showMediaViewer.value = true
}

// Post menu
const openPostMenu = ref(null)
function togglePostMenu(postId) {
  openPostMenu.value = openPostMenu.value === postId ? null : postId
}

function isPostLiked(postId) {
  const post = postsStore.posts.find(p => p.id === postId)
  return post?.likedBy?.includes(user.value.username) || false
}

function editProfile() {
  router.push('/edit-account')
}

function editCoverPhoto() {
  console.log('Edit cover photo')
}

function editProfilePhoto() {
  console.log('Edit profile photo')
}

function toggleLike(postId) {
  postsStore.toggleLike(postId, user.value.username)
}

function editPost(post) {
  // Implement post editing functionality
  console.log('Edit post:', post)
}

function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    postsStore.deletePost(postId)
  }
}

function unfollow(userId) {
  following.value = following.value.filter(user => user.id !== userId)
}

function handlePostCreated(newPost) {
  showCreatePostModal.value = false
  user.value.posts += 1
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>