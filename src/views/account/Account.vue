<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <!-- Edit Post Modal -->
      <CreatePostModal
        v-model="showEditModal"
        :edit-post="editingPost"
        :user-avatar="userProfile?.avatar || authStore.user?.avatar"
        :user-name="userProfile?.username || authStore.user?.userName"
        mode="default"
        @posted="handleEditPosted"
        @submit="handleEditPosted"
      />
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
              <AvatarFallback
                :src="userProfile?.avatar || (isOwnProfile ? authStore.user?.avatar : '')"
                :first-name="(userProfile?.name || authStore.user?.name || authStore.user?.userName || '').split(' ')[0]"
                :last-name="(userProfile?.name || authStore.user?.name || '').split(' ').slice(1).join(' ')"
                :username="userProfile?.username || authStore.user?.userName"
                :size="96"
                custom-class="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white dark:border-gray-800 shadow-lg"
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
                {{ userProfile?.name || $t('account.unknownUser') }}
              </h1>
              
              <p class="text-gray-600 dark:text-gray-300 mb-3">@{{ userProfile?.username || 'username' }}</p>
              
              <!-- Bio -->
              <p v-if="userProfile?.bio" class="text-gray-700 dark:text-gray-300 max-w-2xl mb-4 whitespace-pre-line">
                {{ userProfile.bio }}
              </p>
              <p v-else-if="isOwnProfile" class="text-gray-400 italic mb-4">{{ $t('account.addShortBio') }}</p>

              <!-- Action Buttons moved here -->
              <div class="flex flex-wrap gap-2 sm:space-x-3 mb-4">
                <button 
                  v-if="isOwnProfile"
                  @click="$router.push('/edit-account')"
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <i class="fas fa-edit"></i>
                  <span>{{ $t('common.editProfile') }}</span>
                </button>
                <template v-else>
                  <button 
                    @click="toggleFollow"
                    :disabled="followProcessing"
                    :class=" [
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed',
                      isFollowing 
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    ]"
                  >
                    <i v-if="!followProcessing" :class="isFollowing ? 'fas fa-user-minus' : 'fas fa-user-plus'"></i>
                    <i v-else class="fas fa-spinner fa-spin"></i>
                    <span>{{ isFollowing ? $t('common.followingVerb') : $t('common.follow') }}</span>
                  </button>
            
                </template>
              </div>
            </div>
          </div>

          <!-- Stats and Tabs Navigation -->
          <div class="flex justify-start space-x-4 sm:space-x-8 text-xs sm:text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
            <button 
              @click="activeTab = 'posts'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.posts || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">{{ $t('account.posts') }}</div>
            </button>
            <button 
              @click="activeTab = 'followers'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.followers || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">{{ $t('account.followers') }}</div>
            </button>
            <button 
              @click="activeTab = 'following'"
              class="text-center hover:text-blue-600 transition-colors"
            >
              <div class="font-bold text-lg text-gray-900 dark:text-white">{{ formatNumber(userProfile?.following || 0) }}</div>
              <div class="text-gray-600 dark:text-gray-400">{{ $t('account.following') }}</div>
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
                <span>{{ $t('account.posts') }}</span>
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
                <span>{{ $t('account.followers') }}</span>
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
                <span>{{ $t('account.following') }}</span>
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
                <span>{{ $t('account.myFandoms') }}</span>
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
                <span>{{ $t('account.saved') }}</span>
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
                <span>{{ $t('account.posts') }}</span>
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
                <span>{{ $t('account.followers') }}</span>
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
                <span>{{ $t('account.following') }}</span>
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
                <span>{{ $t('account.myFandoms') }}</span>
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
                <span>{{ $t('account.saved') }}</span>
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
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.empty.noPostsYet') }}</h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {{ isOwnProfile ? $t('account.empty.sharePrompt') : $t('account.empty.userHasNoPosts', { name: userProfile?.name || $t('account.thisUser') }) }}
            </p>
          </div>
        </div>

        <!-- Followers Tab -->
        <div v-else-if="activeTab === 'followers'">
          <div v-if="followersLoading" class="py-8 flex justify-center"><div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>
          <div v-else-if="followersList.length > 0" class="grid md:grid-cols-2 gap-4">
            <div
              v-for="follower in followersList"
              :key="follower.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center space-x-3">
                <AvatarFallback
                  :src="follower.avatar"
                  :first-name="(follower.name || '').split(' ')[0]"
                  :last-name="(follower.name || '').split(' ').slice(1).join(' ')"
                  :username="follower.username"
                  :size="48"
                  custom-class="w-12 h-12 cursor-pointer"
                  @click="navigateToProfile(follower)"
                />
                <div class="flex-1">
                  <h3 
                    class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                    @click="navigateToProfile(follower)"
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
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.empty.noFollowers') }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ $t('account.empty.followersHint') }}</p>
          </div>
        </div>

        <!-- Following Tab -->
        <div v-else-if="activeTab === 'following'">
          <div v-if="followingLoading" class="py-8 flex justify-center"><div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>
          <div v-else-if="followingList.length > 0" class="grid md:grid-cols-2 gap-4">
            <div
              v-for="following in followingList"
              :key="following.id"
              class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-center space-x-3">
                <AvatarFallback
                  :src="following.avatar"
                  :first-name="(following.name || '').split(' ')[0]"
                  :last-name="(following.name || '').split(' ').slice(1).join(' ')"
                  :username="following.username"
                  :size="48"
                  custom-class="w-12 h-12 cursor-pointer"
                  @click="navigateToProfile(following)"
                />
                <div class="flex-1">
                  <h3 
                    class="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 transition-colors" 
                    @click="navigateToProfile(following)"
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
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.empty.notFollowingAnyone') }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ $t('account.empty.findPeople') }}</p>
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
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.empty.noSavedPosts') }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ $t('account.empty.savedHint') }}</p>
          </div>
        </div>

        <!-- My Fandoms Tab -->
        <div v-if="activeTab === 'fandoms'">
          <div v-if="myFandoms.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CommunityCard
              v-for="fandom in myFandoms"
              :key="fandom.id"
              :community="fandom"
              :button-text="$t('common.view')"
            />
          </div>
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-3xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.empty.noFandomsJoined') }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ $t('account.empty.joinAFandomHint') }}</p>
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
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">{{ $t('account.notFound.title') }}</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">{{ $t('account.notFound.description') }}</p>
        <button 
          @click="$router.push('/dashboard')"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ $t('account.notFound.goToDashboard') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AvatarFallback from '@/components/common/AvatarFallback.vue'
import CreatePostModal from '@/components/common/CreatePostModal.vue'
import Post from '@/components/common/Post.vue'
import { CommunityCard } from '@/components/fandom'
import API_CONFIG from '@/config/api'
import AuthService from '@/services/authService'
import FollowsService from '@/services/followsService'
import PostsService from '@/services/postsService'
import UsersService from '@/services/usersService'
import { useAuthStore } from '@/store/auth'
import { useFandomsStore } from '@/store/fandoms'
import { usePostsStore } from '@/store/posts'
import { useUsersStore } from '@/store/users'
import notify from '@/utils/notify'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const fandomsStore = useFandomsStore()
const postsStore = usePostsStore()
const { t } = useI18n()

const loading = ref(true)
const userProfile = ref(null)
const userPosts = ref([])
const isFollowing = ref(false)
const followProcessing = ref(false)
const activeTab = ref('posts')

const followersList = ref([])
const followingList = ref([])
const followersLoading = ref(false)
const followingLoading = ref(false)
const savedPosts = ref([])
// Edit modal state
const showEditModal = ref(false)
const editingPost = ref(null)

// Consider "own profile" only when route uses a self-handle (not numeric id)
const isOwnProfile = computed(() => {
  const currentUser = authStore.user
  const profileParam = String(route.params.user || '')
  if (!currentUser) return false
  const isNumericParam = /^\d+$/.test(profileParam)
  if (profileParam === 'me') return true
  if (isNumericParam) return false
  const handle = currentUser.userName || currentUser.userEmail?.split('@')[0]
  return handle && handle === profileParam
})

// All fandoms the user belongs to (admin or member) loaded from backend
const myFandoms = computed(() => fandomsStore.allFandoms.filter(f => f.role === 'admin' || f.role === 'member'))


const fetchUserProfile = async () => {
  loading.value = true
  try {
    // Reset state so we don't carry over the previous profile when navigating between users
    userProfile.value = null
    userPosts.value = []
    followersList.value = []
    followingList.value = []
    isFollowing.value = false

    const param = String(route.params.user || '')
    const isNumericParam = /^\d+$/.test(param)
    // Treat as self ONLY for 'me' or handle routes; numeric param always fetches that numeric user's profile
    const isSelf = (param === 'me') || (!isNumericParam && (
      (authStore.user?.userName && authStore.user.userName === param) ||
      (authStore.user?.userEmail && authStore.user.userEmail.split('@')[0] === param)
    ))

    // Fetch self profile
  if (isSelf) {
      try {
        const resp = await AuthService.getProfile()
        const u = resp?.user || resp?.data || resp
        if (u) {
          const resolveImage = (p) => {
            if (!p) return p
            if (/^https?:\/\//i.test(p)) return p
            let rawBase = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
            const assetBase = /\/api$/i.test(rawBase) ? rawBase.replace(/\/api$/i, '') : rawBase
            const cleaned = String(p).replace(/^\/+/, '')
            return assetBase ? `${assetBase}/${cleaned}` : cleaned
          }
          userProfile.value = {
            id: u.id,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username || u.email?.split('@')[0],
            username: u.username || (u.email ? u.email.split('@')[0] : undefined),
            email: u.email,
            avatar: resolveImage(u.profile_image || u.avatar) || '',
            coverPhoto: resolveImage(u.background_image || u.coverPhoto || ''),
            followers: u.followers_count || u.stats?.followers || 0,
            following: u.following_count || u.stats?.following || 0,
            posts: u.posts_count || u.stats?.posts || 0,
            role: u.role || 'user',
            date_naissance: u.date_naissance || null,
            gender: u.gender || null,
            preferred_categories: u.preferred_categories || [],
            bio: u.bio || u.description || ''
          }
          isFollowing.value = false // can't follow self
        }
      } catch (e) {
        console.debug('Self profile fetch failed', e)
      }
    }

    // Fetch other user by numeric id
  if (!userProfile.value && isNumericParam) {
      try {
        const resp = await UsersService.profile(param)
        const u = resp?.data?.user || resp?.user || resp?.data || resp
        if (u) {
          const resolveImage = (p) => {
            if (!p) return p
            if (/^https?:\/\//i.test(p)) return p
            let rawBase = (API_CONFIG && API_CONFIG.baseURL) ? API_CONFIG.baseURL.replace(/\/$/, '') : ''
            const assetBase = /\/api$/i.test(rawBase) ? rawBase.replace(/\/api$/i, '') : rawBase
            const cleaned = String(p).replace(/^\/+/, '')
            return assetBase ? `${assetBase}/${cleaned}` : cleaned
          }
          userProfile.value = {
            id: u.id,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username || u.email?.split('@')[0],
            username: u.username || (u.email ? u.email.split('@')[0] : undefined),
            email: u.email,
            avatar: resolveImage(u.profile_image || u.avatar),
            coverPhoto: resolveImage(u.background_image || u.coverPhoto || ''),
            followers: u.followers_count || 0,
            following: u.following_count || 0,
            posts: u.posts_count || (Array.isArray(u.posts) ? u.posts.length : 0),
            role: u.role || 'user',
            date_naissance: u.date_naissance || null,
            gender: u.gender || null,
            preferred_categories: u.preferred_categories || [],
            bio: u.bio || u.description || ''
          }
          isFollowing.value = !!u.is_followed
          // Provide posts list if included
          if (Array.isArray(u.posts) && u.posts.length) {
            userPosts.value = u.posts.map((p, idx) => normalizePost(p, idx))
          }
        }
      } catch (e) {
        console.debug('Numeric profile fetch failed', e)
      }
    }

    // Fallback: username-based (client store)
    if (!userProfile.value) {
      const username = String(param || '').trim() || 'unknown'
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
        // Fallback stub without assigning a fake numeric id
        // Important: do NOT set a random id here; it would leak into followers API calls.
        userProfile.value = {
          id: null,
          name: username,
          username,
          avatar: '',
          followers: 0,
          following: 0,
          posts: 0,
          role: 'user',
          bio: '',
          preferred_categories: []
        }
      }
    }

    // After we have userProfile, if numeric id and we haven't already filled lists, fetch followers/following/posts (except when already derived from self or embedded posts)
    // Only proceed when we have a valid integer id (prevents accidental float/placeholder ids)
    const hasValidId = Number.isInteger(userProfile.value?.id)
    if (hasValidId) {
      const id = Number(userProfile.value.id)
      if (userPosts.value.length === 0) {
        try {
          const postsResp = await PostsService.userPosts(id)
          const rawPosts = postsResp?.posts || postsResp?.data?.posts || postsResp?.data || []
          userPosts.value = Array.isArray(rawPosts) ? rawPosts.map((p, idx) => normalizePost(p, idx)) : []
        } catch {}
      }
      try {
        const fResp = await FollowsService.followers(id)
        const raw = fResp?.data?.followers || fResp?.followers || fResp?.data || fResp || []
        followersList.value = Array.isArray(raw) ? raw.map(normalizeUserItem) : []
        // Derive following state by checking if auth user id exists in followers of viewed profile (only when viewing someone else)
        if(!isSelf && authStore.user?.id){
          isFollowing.value = followersList.value.some(f => String(f.id) === String(authStore.user.id))
        }
      } catch {}
      try {
        const fgResp = await FollowsService.following(id)
        const rawFg = fgResp?.data?.following || fgResp?.following || fgResp?.data || fgResp || []
        followingList.value = Array.isArray(rawFg) ? rawFg.map(normalizeUserItem) : []
      } catch {}
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    userProfile.value = null
  } finally {
    loading.value = false
  }
}

// Extract a robust numeric user id from various shapes, similar to Post.vue's extractPostUserId
function extractUserId(u){
  if(!u) return null
  const cand = u.id ?? u.user_id ?? u.userId ?? u.user?.id
  if (cand == null) return null
  const n = Number(cand)
  return Number.isInteger(n) && n > 0 ? n : null
}

// Navigate to profile mirroring Post.vue accountLinkTarget logic
function navigateToProfile(user){
  if(!user) return
  const current = authStore.user
  const uid = extractUserId(user)
  const isSelf = current && uid && String(current.id) === String(uid)
  if (isSelf) {
    const handle = current.userName || current.userEmail?.split('@')[0] || 'me'
    router.push({ name: 'Account', params: { user: handle } })
    return
  }
  if (uid) {
    router.push({ name: 'Account', params: { user: String(uid) } })
    return
  }
  const fallback = (user.username || (user.email ? user.email.split('@')[0] : '') || 'me')
  router.push({ name: 'Account', params: { user: fallback } })
}

// Keep account page in sync with auth store (so header/profile edits reflect immediately)
watch(() => authStore.user, (u) => {
  if (!u) return
  // Only sync reactive changes from auth store when viewing OWN profile.
  // Prevents overwriting another user's profile (e.g. /account/97) with current user (id 99),
  // which caused follower/following fetch to use the wrong id.
  if (!isOwnProfile.value) return
  userProfile.value = {
    id: u.id, // safe because it's own profile
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

// Use the viewed user's cover when not own profile; prefer auth cover only when viewing own profile
const coverSrc = computed(() => {
  if (isOwnProfile.value) {
    return authStore.user?.coverPhoto || authStore.user?.background_image || ''
  }
  return userProfile.value?.coverPhoto || ''
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
    avatar: avatarUrl || '',
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

  // Resolve avatar: prefer viewed profile's avatar; only fall back to auth avatar on own profile
  let avatar = apiPost.avatar || userProfile.value.avatar
  if (!avatar && isOwnProfile.value) avatar = authStore.user?.avatar
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
    // Provide author identifiers so <Post /> can navigate correctly
    user_id: Number.isFinite(Number(userProfile.value.id)) ? Number(userProfile.value.id) : undefined,
    user: {
      id: Number.isFinite(Number(userProfile.value.id)) ? Number(userProfile.value.id) : undefined,
      username: userProfile.value.username,
      profile_image: userProfile.value.avatar
    },
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

const toggleFollow = async () => {
  // Only allow follow/unfollow when we have a real integer user id
  if (followProcessing.value) return
  const targetId = Number.isInteger(userProfile.value?.id) ? Number(userProfile.value.id) : null
  if (!targetId || targetId <= 0) return
  const wasFollowing = isFollowing.value
  followProcessing.value = true
  // Optimistic update
  isFollowing.value = !wasFollowing
  if (userProfile.value) {
    userProfile.value.followers = Math.max(0, userProfile.value.followers + (isFollowing.value ? 1 : -1))
  }
  try {
    if(!wasFollowing){
      const resp = await FollowsService.follow(targetId)
      if(resp){
        if(resp.success === false && /already/i.test(resp.message||'')){
          // We were already following; undo extra increment
            if(userProfile.value) userProfile.value.followers = Math.max(0, userProfile.value.followers - 1)
          isFollowing.value = true
        }
        if(resp.follower_count !== undefined && userProfile.value){
          userProfile.value.followers = resp.follower_count
        }
      }
    } else {
      const resp = await FollowsService.unfollow(targetId)
      if(resp){
        if(resp.success === false && /not\s+following/i.test(resp.message||'')){
          // We weren't actually following; undo decrement
          if(userProfile.value) userProfile.value.followers = userProfile.value.followers + 1
          isFollowing.value = false
        }
        if(resp.follower_count !== undefined && userProfile.value){
          userProfile.value.followers = resp.follower_count
        }
      }
    }
    refreshFollowData(targetId)
  } catch(e){
    isFollowing.value = wasFollowing
    if(userProfile.value){
      userProfile.value.followers = Math.max(0, userProfile.value.followers + (wasFollowing ? 1 : -1))
    }
  } finally {
    followProcessing.value = false
  }
}

async function refreshFollowData(userId){
  if(!Number.isInteger(userId) || userId <= 0) return
  try {
    followersLoading.value = true
    const fResp = await FollowsService.followers(userId)
    const rawFollowers = fResp?.data?.followers || fResp?.followers || fResp?.data || fResp || []
    followersList.value = Array.isArray(rawFollowers) ? rawFollowers.map(normalizeUserItem) : []
    if(!isOwnProfile.value && authStore.user?.id){
      isFollowing.value = followersList.value.some(f => String(f.id) === String(authStore.user.id))
    }
  } catch(_) { /* ignore */ } finally { followersLoading.value = false }
  try {
    followingLoading.value = true
    const fgResp = await FollowsService.following(userId)
    const rawFollowing = fgResp?.data?.following || fgResp?.following || fgResp?.data || fgResp || []
    followingList.value = Array.isArray(rawFollowing) ? rawFollowing.map(normalizeUserItem) : []
  } catch(_) { /* ignore */ } finally { followingLoading.value = false }
}

// Add methods for editing and deleting posts
function deleteUserPost(postId) {
  // Parent now trusts child ConfirmModal; no extra browser confirm.
  const resolveId = (id) => {
    if (typeof id === 'number') return id
    if (typeof id === 'string') {
      const tail = id.split('-').pop()
      if (/^\d+$/.test(tail)) return Number(tail)
      if (/^\d+$/.test(id)) return Number(id)
    }
    const rec = userPosts.value.find(p => p.id === id || p.originalId === id)
    if (rec?.originalId && /^\d+$/.test(String(rec.originalId))) return Number(rec.originalId)
    if (typeof rec?.id === 'number') return rec.id
    return null
  }
  const backendId = resolveId(postId)
  if (!backendId || backendId <= 0) {
    notify.error(t('common.invalidPostId'))
    return
  }
  const before = [...userPosts.value]
  userPosts.value = userPosts.value.filter(p => p.id !== postId && p.originalId !== postId && p.id !== backendId)
  if (userProfile.value) {
    userProfile.value.posts = Math.max(0, (userProfile.value.posts || 0) - 1)
  }
  PostsService.remove(backendId)
    .then((res) => {
      if (res?.success === false) throw new Error(res?.message || res?.error || 'Delete failed')
      notify.success(t('common.postDeleted'))
    })
    .catch((err) => {
      userPosts.value = before
      if (userProfile.value) {
        userProfile.value.posts = (userProfile.value.posts || 0) + 1
      }
      notify.error(err?.message || t('common.failedToDeletePost'))
    })
}

function editUserPost(postId, fullPost) {
  // Open edit modal with the selected post
  const findPost = (id) => {
    if (id == null) return null
    // match numeric id against originalId or id; if string, try trailing numeric
    const idNum = typeof id === 'number' ? id : (typeof id === 'string' ? ( /^\d+$/.test(id) ? Number(id) : ( /^\d+$/.test(id.split('-').pop()) ? Number(id.split('-').pop()) : null ) ) : null)
    return userPosts.value.find(p => p.id === id || p.originalId === id || (idNum != null && (p.originalId === idNum || p.id === idNum))) || null
  }
  const post = fullPost || findPost(postId)
  if (!post) {
    notify.error(t('common.postNotFound'))
    return
  }
  // Pass through as-is; CreatePostModal understands { id, originalId, text/content, media[] }
  editingPost.value = { ...post, content: post.text || post.content }
  showEditModal.value = true
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

// Removed posts:created injection to prevent immediate display of new posts on Account page

onMounted(() => {
  fetchUserProfile()
  // Load current user's fandom memberships
  fandomsStore.loadMyFandoms().catch(()=>{})
  requestAnimationFrame(updateTabScrollState)
  if (tabScroll.value) tabScroll.value.addEventListener('scroll', updateTabScrollState, { passive: true })
  window.addEventListener('resize', updateTabScrollState)
})

onUnmounted(() => {
  if (tabScroll.value) tabScroll.value.removeEventListener('scroll', updateTabScrollState)
  window.removeEventListener('resize', updateTabScrollState)
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
          const fandomNameById = (id) => {
            if (!id) return ''
            const f = fandomsStore.allFandoms.find(f => String(f.id) === String(id))
            return f?.name || ''
          }
          savedPosts.value = postsStore.savedPosts.map(p => ({
            ...p,
            // keep original author info produced by normalizeApiPost
            fandom: p.fandom || (p.fandom_id ? { id: p.fandom_id, name: fandomNameById(p.fandom_id) } : null)
          }))
        }
      })
    } else {
      const fandomNameById = (id) => {
        if (!id) return ''
        const f = fandomsStore.allFandoms.find(f => String(f.id) === String(id))
        return f?.name || ''
      }
      savedPosts.value = postsStore.savedPosts.map(p => ({
        ...p,
        fandom: p.fandom || (p.fandom_id ? { id: p.fandom_id, name: fandomNameById(p.fandom_id) } : null)
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

// Handle edit result from modal
function handleEditPosted(resp) {
  try {
    const p = resp?.post || resp?.data?.post || resp?.data || resp
    if (!p) return
    // Determine the id we should match on
    const pid = typeof p.id === 'number' ? p.id : (typeof p.id === 'string' && /^\d+$/.test(p.id) ? Number(p.id) : null)
    const idx = userPosts.value.findIndex(x => x.originalId === pid || x.id === pid)
    if (idx !== -1) {
      // Update minimal fields
      const updated = { ...userPosts.value[idx] }
      updated.text = p.description || p.content || updated.text
      if (Array.isArray(p.media)) {
        updated.media = p.media.map(m => ({ type: m.type || (/\.(mp4|webm|ogg)$/i.test(m.url || m.path || m.src) ? 'video' : 'image'), url: resolveMediaUrl(m.url || m.path || m.src) }))
      }
      updated.trending = !!p.trending
      updated.originalId = pid || updated.originalId
      userPosts.value.splice(idx, 1, updated)
    }
    notify.success(t('common.postUpdated'))
  } catch (_) {
    // ignore
  } finally {
    showEditModal.value = false
    editingPost.value = null
  }
}
</script>

<style scoped>
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>