<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="userProfile" class="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-24">
      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <!-- Cover Photo with gradient fallback -->
        <div class="h-24 sm:h-32 rounded-t-xl relative overflow-visible">
          <!-- Cover Photo if exists, otherwise gradient -->
          <div 
            v-if="coverSrc" 
            class="w-full h-full bg-cover bg-center rounded-t-xl"
            :style="`background-image: url(${coverSrc})`"
          ></div>
          <div 
            v-else
            class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl"
          ></div>
          
          <!-- Overlay for better contrast -->
          <div class="absolute inset-0 bg-black/20 rounded-t-xl"></div>
        </div>
        
        <!-- Avatar positioned outside cover photo -->
        <div class="relative -mt-10 sm:-mt-12 px-4 sm:px-6">
          <div class="flex items-end">
            <div class="relative z-30">
              <img
                :src="authStore.user?.avatar || userProfile?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face'"
                :alt="authStore.user?.userName || userProfile?.name || 'User'"
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 object-cover shadow-lg"
              />
              <div v-if="userProfile?.verified" class="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 z-10">
                <i class="fas fa-check text-white text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="px-4 sm:px-6 pt-4 pb-6">
          <div class="mb-6">
            <!-- Profile Details -->
            <div class="mb-4">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {{ userProfile?.name || 'Unknown User' }}
              </h1>
              
              <p class="text-gray-600 dark:text-gray-300 mb-3">@{{ userProfile?.username || 'username' }}</p>
              
              <!-- Bio -->
              <p v-if="userProfile?.bio" class="text-gray-700 dark:text-gray-300 max-w-2xl mb-4 whitespace-pre-line">
                {{ userProfile.bio }}
              </p>
              <p v-else-if="isOwnProfile" class="text-gray-400 italic mb-4">Add a short bio to tell people about you.</p>

              <!-- Action Buttons moved here -->
              <div class="flex flex-wrap gap-2 sm:space-x-3 mb-4">
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
          <div class="flex justify-between sm:justify-start space-x-4 sm:space-x-8 text-xs sm:text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
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
      <div class="mb-6">
        <!-- Mobile scrollable tabs -->
        <div class="sm:hidden relative">
          <!-- Gradient overlays -->
          <div
            class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 transition-opacity duration-200"
            :class="{ 'opacity-0': !canScrollLeft }"
          ></div>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 transition-opacity duration-200"
            :class="{ 'opacity-0': !canScrollRight }"
          ></div>

          <!-- Scrollable container -->
          <div ref="tabScroll" class="no-scrollbar overflow-x-auto px-2" @wheel.passive="onWheelScroll">
            <div class="flex items-center gap-3 py-1 min-w-max">
              <button 
                @click="activeTab = 'posts'"
                :data-tab="'posts'"
                :class="[
                  'shrink-0 h-11 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm',
                  activeTab === 'posts' 
                    ? 'bg-blue-600 text-white shadow-blue-500/25 shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <i class="fas fa-th-large text-base"></i>
                <span>Posts</span>
              </button>
              
              <button 
                @click="activeTab = 'followers'"
                :data-tab="'followers'"
                :class="[
                  'shrink-0 h-11 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm',
                  activeTab === 'followers' 
                    ? 'bg-blue-600 text-white shadow-blue-500/25 shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <i class="fas fa-users text-base"></i>
                <span>Followers</span>
              </button>
              
              <button 
                @click="activeTab = 'following'"
                :data-tab="'following'"
                :class="[
                  'shrink-0 h-11 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm',
                  activeTab === 'following' 
                    ? 'bg-blue-600 text-white shadow-blue-500/25 shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <i class="fas fa-user-plus text-base"></i>
                <span>Following</span>
              </button>

              <button 
                v-if="myFandoms.length > 0"
                @click="activeTab = 'fandoms'"
                :data-tab="'fandoms'"
                :class="[
                  'shrink-0 h-11 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm',
                  activeTab === 'fandoms' 
                    ? 'bg-blue-600 text-white shadow-blue-500/25 shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <i class="fas fa-users text-base"></i>
                <span>Fandoms</span>
              </button>

              <button 
                v-if="isOwnProfile"
                @click="activeTab = 'saved'"
                :data-tab="'saved'"
                :class="[
                  'shrink-0 h-11 px-4 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm',
                  activeTab === 'saved' 
                    ? 'bg-blue-600 text-white shadow-blue-500/25 shadow-lg transform scale-105' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                ]"
              >
                <i class="fas fa-bookmark text-base"></i>
                <span>Saved</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop segmented control -->
        <div class="hidden sm:block">
          <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
            <div class="flex">
              <button 
                @click="activeTab = 'posts'"
                :class="[
                  'flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200',
                  activeTab === 'posts' 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                <i class="fas fa-th-large text-base"></i>
                <span>Posts</span>
              </button>
              
              <button 
                @click="activeTab = 'followers'"
                :class="[
                  'flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200',
                  activeTab === 'followers' 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                <i class="fas fa-users text-base"></i>
                <span>Followers</span>
              </button>
              
              <button 
                @click="activeTab = 'following'"
                :class="[
                  'flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200',
                  activeTab === 'following' 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                <i class="fas fa-user-plus text-base"></i>
                <span>Following</span>
              </button>

              <button 
                v-if="myFandoms.length > 0"
                @click="activeTab = 'fandoms'"
                :class="[
                  'flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200',
                  activeTab === 'fandoms' 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                <i class="fas fa-users text-base"></i>
                <span>Fandoms</span>
              </button>

              <button 
                v-if="isOwnProfile"
                @click="activeTab = 'saved'"
                :class="[
                  'flex-1 h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200',
                  activeTab === 'saved' 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                <i class="fas fa-bookmark text-base"></i>
                <span>Saved</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Based on Active Tab -->
      <div class="space-y-6">
        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'">
          <div v-if="userPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useUsersStore } from '@/store/users'
import { useFandomsStore } from '@/store/fandoms'
import { usePostsStore } from '@/store/posts'
import Post from '@/components/common/Post.vue'
import { CommunityCard } from '@/components/fandom'
import AuthService from '@/services/authService'
import PostsService from '@/services/postsService'
import FollowsService from '@/services/followsService'
import API_CONFIG from '@/config/api'

const route = useRoute()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const fandomsStore = useFandomsStore()
const postsStore = usePostsStore()

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

// All fandoms the user belongs to (admin or member) loaded from backend
const myFandoms = computed(() => fandomsStore.allFandoms.filter(f => f.role === 'admin' || f.role === 'member'))


const fetchUserProfile = async () => {
  loading.value = true
  try {
    // If route is 'me' or this is the current user's page, try API first
    if (route.params.user === 'me' || isOwnProfile.value) {
      try {
        const resp = await AuthService.getProfile()
        const u = resp?.user || resp?.data || resp
        if (u) {
          // Resolve avatar & cover to absolute URLs if backend returned relative paths
          const resolveImage = (p) => {
            if (!p) return p
            if (/^https?:\/\//i.test(p)) return p
            let rawBase = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
            // Remove trailing /api for storage assets
            const assetBase = /\/api$/i.test(rawBase) ? rawBase.replace(/\/api$/i, '') : rawBase
            const cleaned = String(p).replace(/^\/+/, '')
            return assetBase ? `${assetBase}/${cleaned}` : cleaned
          }
          userProfile.value = {
            id: u.id,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username || u.email?.split('@')[0],
            username: u.username || (u.email ? u.email.split('@')[0] : undefined),
            email: u.email,
            avatar: resolveImage(u.profile_image || u.avatar) || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
            coverPhoto: resolveImage(u.background_image || u.coverPhoto || ''),
            followers: u.stats?.followers || 0,
            following: u.stats?.following || 0,
            posts: u.stats?.posts || 0,
            role: u.role || 'user',
            date_naissance: u.date_naissance || null,
            gender: u.gender || null,
            preferred_categories: u.preferred_categories || [],
            bio: u.bio || u.description || ''
          }
        }
      } catch (apiErr) {
        // fallback to store-based logic below
        console.debug('AuthService.getProfile failed, falling back to store', apiErr)
      }
    }

    // If still not set, try to find in users store or derive a minimal profile
    if (!userProfile.value) {
      const username = route.params.user || 'unknown'
      const foundUser = usersStore.getUserByUsername(username)
      if (foundUser) {
        userProfile.value = {
          id: foundUser.id,
          name: foundUser.name || foundUser.username || username,
          username: foundUser.username || username,
          email: foundUser.email || '',
          avatar: foundUser.avatar || '',
          coverPhoto: foundUser.coverPhoto || '',
          followers: foundUser.followers || 0,
          following: foundUser.following || 0,
          posts: foundUser.posts || 0,
          role: foundUser.role || 'user',
          bio: foundUser.bio || foundUser.description || '',
          date_naissance: foundUser.date_naissance || null,
          gender: foundUser.gender || null,
          preferred_categories: foundUser.preferred_categories || []
        }
      } else {
        userProfile.value = {
          id: Math.random(),
          name: username,
          username,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
          followers: 0,
          following: 0,
          posts: 0,
          role: 'user',
          bio: '',
          preferred_categories: []
        }
      }
    }

    // Load user posts and follower lists from API when possible (only when we have numeric user id), otherwise fall back to store
    const userId = userProfile.value && (typeof userProfile.value.id === 'number' || /^\\d+$/.test(String(userProfile.value.id)))

    if (userId) {
      const id = Number(userProfile.value.id)
      // Posts
      try {
        const postsResp = await PostsService.userPosts(id)
        // Possible shapes: {posts: []}, {data: {posts: []}}, {data: []}
        const rawPosts = postsResp?.posts || postsResp?.data?.posts || postsResp?.data || []
        userPosts.value = Array.isArray(rawPosts)
          ? rawPosts.map((p, idx) => normalizePost(p, idx))
          : []
      } catch (err) {
        // fallback to client-side store (already shaped maybe differently)
        userPosts.value = (usersStore.getPostsByUsername(userProfile.value.username) || [])
      }

      // Followers
      try {
        const fResp = await FollowsService.followers(id)
        const raw = fResp?.data?.followers || fResp?.followers || fResp?.data || fResp || []
        followersList.value = Array.isArray(raw) ? raw.map(normalizeUserItem) : []
      } catch (err) {
        followersList.value = (usersStore.getFollowers || []).map(normalizeUserItem)
      }

      // Following
      try {
        const fgResp = await FollowsService.following(id)
        const rawFg = fgResp?.data?.following || fgResp?.following || fgResp?.data || fgResp || []
        followingList.value = Array.isArray(rawFg) ? rawFg.map(normalizeUserItem) : []
      } catch (err) {
        followingList.value = (usersStore.getFollowing || []).map(normalizeUserItem)
      }
    } else {
      // No numeric id available — avoid calling username-based user endpoints (API expects numeric IDs).
      userPosts.value = (usersStore.getPostsByUsername(userProfile.value.username) || []).map((p, i) => normalizePost(p, i))
      followersList.value = (usersStore.getFollowers || []).map(normalizeUserItem)
      followingList.value = (usersStore.getFollowing || []).map(normalizeUserItem)
    }

  } catch (error) {
    console.error('Error fetching user profile:', error)
    userProfile.value = null
  } finally {
    loading.value = false
  }
}

// Keep account page in sync with auth store (so header/profile edits reflect immediately)
watch(() => authStore.user, (u) => {
  if (!u) return
  userProfile.value = {
    id: u.id || userProfile.value?.id,
    name: u.name || u.userName || `${u.firstName || ''} ${u.lastName || ''}`.trim(),
    username: u.userName || (u.userEmail ? u.userEmail.split('@')[0] : ''),
    email: u.userEmail || userProfile.value?.email,
    avatar: u.avatar || u.profile_image || userProfile.value?.avatar,
    coverPhoto: u.coverPhoto || u.background_image || userProfile.value?.coverPhoto,
    followers: (u.stats && u.stats.followers) || userProfile.value?.followers || 0,
    following: (u.stats && u.stats.following) || userProfile.value?.following || 0,
    posts: (u.stats && u.stats.posts) || userProfile.value?.posts || 0,
    role: u.role || userProfile.value?.role,
    date_naissance: u.birthDate || u.date_naissance || userProfile.value?.date_naissance,
    gender: u.gender || userProfile.value?.gender,
  preferred_categories: u.categories || u.preferred_categories || userProfile.value?.preferred_categories || [],
  bio: u.bio || u.description || userProfile.value?.bio || ''
  }
}, { immediate: true })

const formatNumber = (num) => {
  if (typeof num === 'string') return num
  if (num < 1000) return num.toString()
  if (num < 1000000) return (num / 1000).toFixed(1).replace('.0', '') + 'K'
  return (num / 1000000).toFixed(1).replace('.0', '') + 'M'
}

// Prefer authenticated user's cover image when available
const coverSrc = computed(() => {
  return authStore.user?.coverPhoto || authStore.user?.background_image || userProfile.value?.coverPhoto || ''
})

const formatJoinDate = (date) => {
  if (!date) return 'Recently'
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
}

// Normalize user items returned from followers/following endpoints
const normalizeUserItem = (item) => {
  if (!item) return item
  // prefer profile_image then avatar
  const rawAvatar = item.profile_image || item.avatar || item.profileImage || ''
  let avatarUrl = rawAvatar
  if (rawAvatar && !/^https?:\/\//i.test(rawAvatar)) {
    const base = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
    avatarUrl = base ? `${base}/${String(rawAvatar).replace(/^\/+/, '')}` : rawAvatar
  }

  const name = (item.first_name || item.firstName || '') || item.name || ''
  const last = item.last_name || item.lastName || ''
  const fullName = `${name} ${last}`.trim() || item.name || (item.email ? item.email.split('@')[0] : '')

  return {
    id: item.id,
    name: fullName,
    username: item.username || (item.email ? item.email.split('@')[0] : undefined),
    email: item.email,
    avatar: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
    bio: item.bio || item.description || '',
    coverPhoto: (item.background_image || item.cover_image || item.coverPhoto) || '',
    // keep any other useful fields if present
    raw: item
  }
}

// Helper to resolve any media/asset path to absolute URL
const apiBase = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
const resolveMediaUrl = (p) => {
  if (!p) return p
  // If absolute URL
  if (/^https?:\/\//i.test(p)) {
    // If it points to our API base but uses /posts/... (no storage), rewrite to /storage/posts/...
    if (apiBase) {
      try {
        const u = new URL(p)
        const baseUrl = new URL(apiBase)
        if (u.host === baseUrl.host) {
          const path = u.pathname.replace(/^\/+/, '')
          if (/^posts\/(images|videos)\//i.test(path)) {
            return `${apiBase}/storage/${path}`
          }
        }
      } catch (e) {
        // ignore URL parsing errors and fall back to returning p
      }
    }
    return p
  }

  const cleaned = String(p).replace(/^\/+/, '') // remove leading slashes

  // Some backend responses give post media paths as "posts/images/..." or "posts/videos/..." (missing 'storage/')
  // Convert those to the public storage path: /storage/posts/images/... or /storage/posts/videos/...
  if (/^posts\/(images|videos)\//i.test(cleaned)) {
    return apiBase ? `${apiBase}/storage/${cleaned}` : `storage/${cleaned}`
  }

  // If already under storage/, or any other relative path, prefix base normally
  return apiBase ? `${apiBase}/${cleaned}` : cleaned
}

// Normalize post data returned by API to what <Post /> expects
const normalizePost = (apiPost, index = 0) => {
  if (!apiPost) return apiPost
  // Media array: convert strings/objects to normalized objects with type + full URL
  const rawMedia = apiPost.media || []
  const media = rawMedia.map(m => {
    // Support either string or already-object
    const src = typeof m === 'string' ? m : (m.url || m.path || m.src || '')
    const isVideo = /\.(mp4|webm|ogg)$/i.test(src)
    return { type: isVideo ? 'video' : 'image', url: resolveMediaUrl(src) }
  })

  // Resolve avatar (prefer current profile's avatar, then post-level avatar, then authStore) and absolutize
  let avatar = apiPost.avatar || userProfile.value.avatar || authStore.user?.avatar
  avatar = resolveMediaUrl(avatar)

  const rawDate = apiPost.created_at || apiPost.updated_at
  let dateVal = new Date()
  if (rawDate) {
    const d = new Date(rawDate)
    if (!isNaN(d)) dateVal = d
  }

  const originalId = apiPost.id && /^\d+$/.test(String(apiPost.id)) ? Number(apiPost.id) : null
  return {
    id: apiPost.id && /^\d+$/.test(String(apiPost.id)) ? apiPost.id : `${apiPost.created_at || 'post'}-${index}`,
    originalId,
    username: userProfile.value.username,
    avatar,
    text: apiPost.description || apiPost.content || '',
    date: dateVal,
    media,
    tags: Array.isArray(apiPost.tags) ? apiPost.tags.map(t => String(t).replace(/^"|"$/g, '')) : [],
    likes: apiPost.likes || 0,
    comments: apiPost.comments || 0,
    isLiked: false,
    fandom: apiPost.fandom || null,
    trending: apiPost.trending || false
  }
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
  userPosts.value = userPosts.value.filter(post => post.id !== postId && post.originalId !== postId)
}

function editUserPost(postId) {
  // Implement your edit logic here (open modal, etc.)
  const post = userPosts.value.find(p => p.id === postId)
  if (post) {
  // Placeholder: integrate modal editing later
  console.debug('Edit post requested', postId)
  }
}

const tabScroll = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateTabScrollState = () => {
  const el = tabScroll.value
  if (!el) return
  const { scrollLeft, scrollWidth, clientWidth } = el
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1
}

const scrollTabs = (dir) => {
  const el = tabScroll.value
  if (!el) return
  el.scrollBy({ left: dir * 160, behavior: 'smooth' })
}

const onWheelScroll = (e) => {
  const el = tabScroll.value
  if (!el) return
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    el.scrollLeft += e.deltaY
    e.preventDefault()
  }
}

// Handle global post created event to show new post instantly without full refresh
function handlePostCreated(e) {
  try {
    const created = e?.detail?.post
    if (!created) return
    if (!isOwnProfile.value) return
    if (activeTab.value !== 'posts') return
    // Avoid duplicates
    const exists = userPosts.value.some(p => p.id === created.id || p.originalId === created.id)
    if (exists) return
    // Basic normalization (reuse resolveMediaUrl)
    const media = Array.isArray(created.media) ? created.media.map(m => {
      const src = typeof m === 'string' ? m : (m.url || m.path || m.src || '')
      const isVideo = /\.(mp4|webm|ogg)$/i.test(src)
      return { type: isVideo ? 'video' : 'image', url: resolveMediaUrl(src) }
    }) : []
    const originalId = created.id && /^\d+$/.test(String(created.id)) ? Number(created.id) : null
    const newPost = {
      id: created.id || `temp-${Date.now()}`,
      originalId,
      username: userProfile.value.username,
      avatar: userProfile.value.avatar,
      text: created.description || created.content || created.body || '',
      date: new Date(created.created_at || created.createdAt || Date.now()),
      media,
      tags: Array.isArray(created.tags) ? created.tags : [],
      likes: created.likes || created.likes_count || 0,
      comments: created.comments || created.comments_count || 0,
      isLiked: false,
      fandom: created.fandom || null,
      trending: !!created.trending
    }
    userPosts.value.unshift(newPost)
    if (userProfile.value) {
      userProfile.value.posts = (userProfile.value.posts || 0) + 1
    }
  } catch (_) { /* ignore */ }
}

onMounted(() => {
  fetchUserProfile()
  // Load current user's fandom memberships
  fandomsStore.loadMyFandoms().catch(()=>{})
  requestAnimationFrame(updateTabScrollState)
  if (tabScroll.value) tabScroll.value.addEventListener('scroll', updateTabScrollState, { passive: true })
  window.addEventListener('resize', updateTabScrollState)
  window.addEventListener('posts:created', handlePostCreated)
})

onUnmounted(() => {
  if (tabScroll.value) tabScroll.value.removeEventListener('scroll', updateTabScrollState)
  window.removeEventListener('resize', updateTabScrollState)
  window.removeEventListener('posts:created', handlePostCreated)
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

watch(() => activeTab.value, () => {
  const el = tabScroll.value
  if (!el) return
  const selected = el.querySelector(`[data-tab="${activeTab.value}"]`)
  if (selected && selected.scrollIntoView) {
    selected.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
  // Lazy load saved posts when switching to 'saved' tab (only for own profile)
  if (activeTab.value === 'saved' && isOwnProfile.value) {
    if (!postsStore.savedPosts || postsStore.savedPosts.length === 0) {
      postsStore.loadSavedPosts({ page: 1, limit: 20 }).then(res => {
        if (res.success) {
          savedPosts.value = postsStore.savedPosts.map(p => ({
            ...p,
            username: userProfile.value.username,
            avatar: userProfile.value.avatar
          }))
        }
      })
    } else {
      savedPosts.value = postsStore.savedPosts.map(p => ({
        ...p,
        username: userProfile.value.username,
        avatar: userProfile.value.avatar
      }))
    }
  }
})

// Refresh posts list when global posts store mutates (create/update/delete)
watch(() => postsStore.lastMutation, (val, old) => {
  if (!val || val === old) return
  if (!isOwnProfile.value || activeTab.value !== 'posts') return
  const username = userProfile.value?.username
  if (!username) return
  const storeUserPosts = postsStore.posts.filter(p => p.username === username)
  if (storeUserPosts.length === 0) {
    // Don't wipe existing list if store has none (prevents clearing UI on unrelated mutations)
    return
  }
  const mergedMap = new Map()
  userPosts.value.forEach(p => mergedMap.set(p.id, p))
  storeUserPosts.forEach(p => mergedMap.set(p.id, { ...p }))
  userPosts.value = Array.from(mergedMap.values()).sort((a,b)=> new Date(b.date) - new Date(a.date))
})
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>