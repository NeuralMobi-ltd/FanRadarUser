<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="userProfile" class="max-w-4xl mx-auto px-4 py-8">
      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <!-- Cover Photo with gradient fallback -->
        <div class="h-32 rounded-t-xl relative overflow-visible">
          <!-- Cover Photo if exists, otherwise gradient -->
          <div 
            v-if="userProfile?.coverPhoto" 
            class="w-full h-full bg-cover bg-center rounded-t-xl"
            :style="`background-image: url(${userProfile.coverPhoto})`"
          ></div>
          <div 
            v-else
            class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl"
          ></div>
          
          <!-- Overlay for better contrast -->
          <div class="absolute inset-0 bg-black/20 rounded-t-xl"></div>
        </div>
        
        <!-- Avatar positioned outside cover photo -->
        <div class="relative -mt-12 px-6">
          <div class="flex items-end">
            <div class="relative z-30">
              <img 
                :src="userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face'" 
                :alt="userProfile?.name || 'User'"
                class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 object-cover shadow-lg"
              />
              <div v-if="userProfile?.verified" class="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 z-10">
                <i class="fas fa-check text-white text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="px-6 pt-4 pb-6">
          <div class="mb-6">
            <!-- Profile Details -->
            <div class="mb-4">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ userProfile?.name || 'Unknown User' }}
              </h1>
              
              <p class="text-gray-600 dark:text-gray-300 mb-3">@{{ userProfile?.username || 'username' }}</p>
              
              <!-- Bio -->
              <p v-if="userProfile?.bio" class="text-gray-700 dark:text-gray-300 max-w-2xl mb-4">
                {{ userProfile.bio }}
              </p>

              <!-- Action Buttons moved here -->
              <div class="flex space-x-3 mb-4">
                <button 
                  v-if="isOwnProfile"
                  @click="$router.push('/edit-account')"
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <i class="fas fa-edit"></i>
                  <span>Edit Profile</span>
                </button>
                <template v-else>
                  <button 
                    @click="toggleFollow"
                    :class=" [
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium',
                      isFollowing 
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    ]"
                  >
                    <i :class="isFollowing ? 'fas fa-user-minus' : 'fas fa-user-plus'"></i>
                    <span>{{ isFollowing ? 'Following' : 'Follow' }}</span>
                  </button>
            
                </template>
              </div>
            </div>
          </div>

          <!-- Stats and Tabs Navigation -->
          <div class="flex justify-start space-x-8 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
            <button 
              @click="activeTab = 'posts'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.posts || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">Posts</div>
            </button>
            <button 
              @click="activeTab = 'followers'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.followers || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">Followers</div>
            </button>
            <button 
              @click="activeTab = 'following'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.following || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">Following</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        <div class="flex bg-gray-50 dark:bg-gray-700/50">
          <button 
            @click="activeTab = 'posts'"
            :class=" [
              'flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 relative',
              activeTab === 'posts' 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800'
            ]"
          >
            <i class="fas fa-th-large text-lg"></i>
            <span class="font-semibold">Posts</span>
            <div v-if="activeTab === 'posts'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>
          
          <button 
            @click="activeTab = 'followers'"
            :class=" [
              'flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 relative',
              activeTab === 'followers' 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800'
            ]"
          >
            <i class="fas fa-users text-lg"></i>
            <span class="font-semibold">Followers</span>
            <div v-if="activeTab === 'followers'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>
          
          <button 
            @click="activeTab = 'following'"
            :class=" [
              'flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 relative',
              activeTab === 'following' 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800'
            ]"
          >
            <i class="fas fa-user-plus text-lg"></i>
            <span class="font-semibold">Following</span>
            <div v-if="activeTab === 'following'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>

          <!-- My Fandoms Tab (conditionally rendered) -->
            <button 
              v-if="myFandoms.length > 0"
              @click="activeTab = 'fandoms'"
              :class=" [
                'flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 relative',
                activeTab === 'fandoms' 
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800'
              ]"
            >
              <i class="fas fa-users text-lg"></i>
              <span class="font-semibold">My Fandoms</span>
              <div v-if="activeTab === 'fandoms'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            </button>
          
          <button 
            v-if="isOwnProfile"
            @click="activeTab = 'saved'"
            :class=" [
              'flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-200 relative',
              activeTab === 'saved' 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800'
            ]"
          >
            <i class="fas fa-bookmark text-lg"></i>
            <span class="font-semibold">Saved</span>
            <div v-if="activeTab === 'saved'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>
        </div>
      </div>

      <!-- Content Based on Active Tab -->
      <div class="space-y-6">
        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'">
          <div v-if="userPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Post 
              v-for="post in userPosts"
              :key="post.id"
              :post="post"
              :can-delete="isOwnProfile"
              :can-edit="isOwnProfile"
              @delete="deleteUserPost"
              @edit="editUserPost"
            />
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-camera text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {{ isOwnProfile ? "Share your thoughts with the world!" : `${userProfile?.name || 'This user'} hasn't shared anything yet.` }}
            </p>
          </div>
        </div>

        <!-- Followers Tab -->
        <div v-else-if="activeTab === 'followers'">
          <div v-if="followersList.length > 0" class="grid md:grid-cols-2 gap-4">
            <div
              v-for="follower in followersList"
              :key="follower.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center space-x-3">
                <img 
                  :src="follower.avatar" 
                  :alt="follower.name" 
                  class="w-12 h-12 rounded-full object-cover cursor-pointer" 
                  @click="$router.push(`/account/${follower.username}`)"
                />
                <div class="flex-1">
                  <h3 
                    class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                    @click="$router.push(`/account/${follower.username}`)"
                  >
                    {{ follower.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">@{{ follower.username }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ follower.bio }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No followers yet</h3>
            <p class="text-gray-500 dark:text-gray-400">When people follow you, they'll appear here.</p>
          </div>
        </div>

        <!-- Following Tab -->
        <div v-else-if="activeTab === 'following'">
          <div v-if="followingList.length > 0" class="grid md:grid-cols-2 gap-4">
            <div
              v-for="following in followingList"
              :key="following.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center space-x-3">
                <img 
                  :src="following.avatar" 
                  :alt="following.name" 
                  class="w-12 h-12 rounded-full object-cover cursor-pointer" 
                  @click="$router.push(`/account/${following.username}`)"
                />
                <div class="flex-1">
                  <h3 
                    class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                    @click="$router.push(`/account/${following.username}`)"
                  >
                    {{ following.name }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">@{{ following.username }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ following.bio }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-user-plus text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Not following anyone</h3>
            <p class="text-gray-500 dark:text-gray-400">Find interesting people to follow.</p>
          </div>
        </div>

        <!-- Saved Tab -->
        <div v-else-if="activeTab === 'saved' && isOwnProfile">
          <div v-if="savedPosts.length > 0" class="space-y-4">
            <Post 
              v-for="post in savedPosts"
              :key="post.id"
              :post="post"
            />
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-bookmark text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No saved posts</h3>
            <p class="text-gray-500 dark:text-gray-400">Posts you save will appear here.</p>
          </div>
        </div>

        <!-- My Fandoms Tab -->
        <div v-if="activeTab === 'fandoms'">
          <div v-if="myFandoms.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CommunityCard
              v-for="fandom in myFandoms"
              :key="fandom.id"
              :community="fandom"
              button-text="View Fandom"
            />
          </div>
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No fandoms joined yet</h3>
            <p class="text-gray-500 dark:text-gray-400">Join a fandom to see it here.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- User Not Found -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-user-slash text-3xl text-gray-400"></i>
        </div>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">User not found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">The profile you're looking for doesn't exist.</p>
        <button 
          @click="$router.push('/dashboard')"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useUsersStore } from '@/store/users'
import { useFandomsStore } from '@/store/fandoms'
import Post from '@/components/common/Post.vue'
import CommunityCard from '@/components/community/CommunityCard.vue'

const route = useRoute()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const fandomsStore = useFandomsStore()

const loading = ref(true)
const userProfile = ref({})
const userPosts = ref([])
const isFollowing = ref(false)
const activeTab = ref('posts')

const followersList = ref([])
const followingList = ref([])
const savedPosts = ref([])

const isOwnProfile = computed(() => {
  const currentUser = authStore.user
  const profileUsername = route.params.user
  
  if (!currentUser) return false
  
  return currentUser.userEmail === `${profileUsername}@fanradars.com` || 
         currentUser.userName === profileUsername ||
         currentUser.userEmail?.split('@')[0] === profileUsername ||
         profileUsername === 'me'
})

const myFandoms = computed(() => {
  const user = authStore.user
  if (!user) return []
  // Find fandoms where user is admin or member (by username or email)
  return fandomsStore.allFandoms.filter(f =>
    f.role === 'admin'
  )
})


const fetchUserProfile = async () => {
  loading.value = true
  
  try {
    let username = route.params.user
    
    if (username === 'me' || isOwnProfile.value) {
      const currentUser = authStore.user
      if (currentUser) {
        username = currentUser.userName || currentUser.userEmail?.split('@')[0] || currentUser.username
        
        userProfile.value = {
          id: currentUser.id || Math.random(),
          name: currentUser.userName || username,
          username: currentUser.userName || currentUser.userEmail?.split('@')[0] || username,
          email: currentUser.userEmail,
          avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
          bio: currentUser.bio || 'FanRadar user',
          coverPhoto: currentUser.coverPhoto || '',
          followers: authStore.userStats?.followers || 132,
          following: authStore.userStats?.following || 12,
          posts: authStore.userStats?.posts || 15,
          verified: currentUser.verified || false,
          joinedDate: currentUser.joinedDate || '2023-06-01'
        }
        
        userPosts.value = usersStore.getPostsByUsername(userProfile.value.username)
        loading.value = false
        return
      }
    }
    
    // Look for user in store
    const foundUser = usersStore.getUserByUsername(username)
     
    if (foundUser) {
      userProfile.value = foundUser
    } else {
      userProfile.value = {
        id: Math.random(),
        name: username,
        username: username,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
        bio: 'FanRadar user',
        followers: 120,
        following: 45,
        posts: 2,
        verified: false,
        joinedDate: '2023-06-01'
      }
    }
    
    // Load user posts from store
    userPosts.value = usersStore.getPostsByUsername(userProfile.value.username)
    
    // Load followers and following from store
    followersList.value = usersStore.getFollowers
    followingList.value = usersStore.getFollowing
    
  } catch (error) {
    console.error('Error fetching user profile:', error)
    userProfile.value = null
  } finally {
    loading.value = false
  }
}

const formatNumber = (num) => {
  if (typeof num === 'string') return num
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1).replace('.0', '') + 'K'
  return (num / 1000000).toFixed(1).replace('.0', '') + 'M'
}

const formatJoinDate = (date) => {
  if (!date) return 'Recently'
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
}

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  if (userProfile.value) {
    if (isFollowing.value) {
      userProfile.value.followers++
    } else {
      userProfile.value.followers = Math.max(0, userProfile.value.followers - 1)
    }
  }
}

// Add methods for editing and deleting posts
function deleteUserPost(postId) {
  userPosts.value = userPosts.value.filter(post => post.id !== postId)
  // Optionally, also remove from store if needed
  // usersStore.deleteUserPost(userProfile.value.username, postId)
}

function editUserPost(postId) {
  // Implement your edit logic here (open modal, etc.)
  const post = userPosts.value.find(p => p.id === postId)
  if (post) {
    // Example: open an edit modal (not implemented here)
    alert('Edit post: ' + postId)
  }
}

onMounted(() => {
  fetchUserProfile()
})

watch(() => route.params.user, () => {
  if (route.name === 'Account') {
    fetchUserProfile()
  }
})

watch(() => authStore.user, () => {
  if (isOwnProfile.value) {
    fetchUserProfile()
  }
}, { deep: true })
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}
</style>