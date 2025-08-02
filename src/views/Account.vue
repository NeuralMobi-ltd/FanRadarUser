<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Profile Header with Enhanced Design -->
    <div class="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 h-64 md:h-80 overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full mix-blend-overlay filter blur-2xl opacity-60 animate-bounce"></div>
      </div>
      
      <!-- Cover Photo with Enhanced Overlay -->
      <div class="absolute inset-0 overflow-hidden group">
        <img 
          v-if="user.coverPhoto"
          :src="user.coverPhoto"
          alt="Cover photo"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div v-else class="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <button 
          v-if="isOwnProfile"
          @click="editCoverPhoto"
          class="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
        >
          <CameraIcon class="h-5 w-5" />
        </button>
      </div>
      
      <!-- Profile Picture with Glass Effect - Centered -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-1 shadow-2xl bg-red-600">
            <img
              src="/public/images/me.png"
              alt="Profile picture"
              class="h-32 w-32 rounded-full object-cover bg-white transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            v-if="isOwnProfile"
            @click="editProfilePhoto"
            class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          >
            <CameraIcon class="h-8 w-8 text-white" />
          </button>
          <!-- Online Status Indicator -->
          <div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
        </div>
      </div>
    </div>

    <!-- Main Content with Enhanced Layout -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <!-- Profile Info Section with Glass Morphism -->
      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-8">
        <!-- Name and Username - Centered -->
        <div class="text-center px-6 pt-8 pb-4">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ user.name }}</h1>
          <p class="text-indigo-600 dark:text-indigo-400 font-mono text-lg">@{{ user.username }}</p>
          
          <!-- Enhanced Stats with Icons -->
          <div class="flex justify-center space-x-8 mt-6">
            <div class="flex flex-col items-center group cursor-pointer">
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.posts }}</span>
              <span class="text-gray-500 dark:text-gray-400 text-sm">Posts</span>
            </div>
            <div class="flex flex-col items-center group cursor-pointer">
              <div class="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.followers }}</span>
              <span class="text-gray-500 dark:text-gray-400 text-sm">Followers</span>
            </div>
            <div class="flex flex-col items-center group cursor-pointer">
              <div class="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.following }}</span>
              <span class="text-gray-500 dark:text-gray-400 text-sm">Following</span>
            </div>
          </div>
          
          <!-- Enhanced Bio with Better Typography -->
          <div v-if="user.bio" class="mt-6 max-w-2xl mx-auto">
            <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{{ user.bio }}</p>
          </div>
          
          <!-- Enhanced Action Buttons -->
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <template v-if="isOwnProfile">
              <button
                @click="editProfile"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105"
              >
                <PencilIcon class="-ml-1 mr-3 h-5 w-5" />
                Edit Profile
              </button>
              <button
                @click="showCreatePostModal = true"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
              >
                <PlusIcon class="-ml-1 mr-3 h-5 w-5" />
                New Post
              </button>
              <!-- Enhanced Settings Dropdown -->
              <div class="relative">
                <button
                  @click="showSettingsMenu = !showSettingsMenu"
                  class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-base font-medium rounded-full shadow-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105"
                >
                  <Cog6ToothIcon class="-ml-1 mr-3 h-5 w-5" />
                  Settings
                </button>
                
                <!-- Enhanced Dropdown Menu -->
                <div 
                  v-if="showSettingsMenu"
                  class="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 focus:outline-none"
                >
                  <div class="py-2">
                    <button 
                      @click="editProfile"
                      class="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <PencilIcon class="mr-3 h-4 w-4" />
                      Edit Profile
                    </button>
                    <button 
                      @click="openPhotoModal"
                      class="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <CameraIcon class="mr-3 h-4 w-4" />
                      Change Profile Photo
                    </button>
                    <hr class="my-1 border-gray-200 dark:border-gray-700">
                    <button 
                      @click="logout"
                      class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <button
                @click="toggleFollow"
                :class=" [
                  'inline-flex items-center px-8 py-3 text-base font-medium rounded-full shadow-lg transition-all duration-300 hover:scale-105',
                  isFollowing 
                    ? 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-700'
                    : 'border border-transparent text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                ]"
              >
                {{ isFollowing ? 'Following' : 'Follow' }}
              </button>
              <button
                class="inline-flex items-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-base font-medium rounded-full shadow-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                Message
              </button>
            </template>
          </div>
        </div>
        
        <!-- Enhanced Tabs with Better Design -->
        <div class="border-t border-gray-200/50 dark:border-gray-700/50 mt-6">
          <nav class="flex -mb-px">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="currentTab = tab.name"
              :class=" [
                currentTab === tab.name
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-700/30',
                'flex-1 whitespace-nowrap py-4 px-6 border-b-2 font-semibold text-sm flex items-center justify-center transition-all duration-200'
              ]"
            >
              <component :is="tab.icon" class="mr-2 h-5 w-5" />
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content with Enhanced Design -->
      <div class="space-y-6">
        <!-- Posts Tab -->
        <div v-if="currentTab === 'posts'">
          <template v-if="userPosts.length > 0">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Post
                v-for="post in userPosts"
                :key="post.id"
                :post="post"
                @like="toggleLike"
                @comment="() => {}"
                @share="() => {}"
                @delete="deletePost"
                :can-delete="isOwnProfile"
                class="w-full"
              />
            </div>
          </template>
          
          <!-- Enhanced Empty State -->
          <div v-else class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-16 text-center">
            <div class="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <InboxIcon class="h-12 w-12 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">No posts yet</h3>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {{ isOwnProfile ? 'Share your first post with the community and start building your presence!' : 'This user hasn\'t shared any posts yet.' }}
            </p>
            <button
              v-if="isOwnProfile"
              @click="showCreatePostModal = true"
              class="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <PlusIcon class="-ml-1 mr-3 h-5 w-5" />
              Create First Post
            </button>
          </div>
        </div>
        
        <!-- Following Tab -->
        <div v-else-if="currentTab === 'following'">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <template v-if="following.length > 0">
              <div class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                <div v-for="person in following" :key="person.id" class="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <div class="flex items-center">
                    <div class="relative">
                      <img :src="person.avatar" alt="Avatar" class="h-12 w-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700" />
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div class="ml-4 flex-1 min-w-0">
                      <p class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {{ person.name }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                        @{{ person.username }}
                      </p>
                    </div>
                    <button
                      @click="unfollow(person.id)"
                      class="ml-4 inline-flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-full text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                    >
                      Following
                    </button>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- Enhanced Empty State for Following -->
            <div v-else class="p-16 text-center">
              <div class="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <UserGroupIcon class="h-12 w-12 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Not following anyone</h3>
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Discover and follow interesting people to see their posts and updates in your feed.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Saved Tab -->
        <div v-else-if="currentTab === 'saved'">
          <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <template v-if="savedPosts.length > 0">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <Post
                  v-for="post in savedPosts"
                  :key="post.id"
                  :post="post"
                  @like="toggleLike"
                  @comment="() => {}"
                  @share="() => {}"
                  class="w-full"
                />
              </div>
            </template>
            
            <!-- Enhanced Empty State for Saved -->
            <div v-else class="p-16 text-center">
              <div class="mx-auto w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                <svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">No saved posts yet</h3>
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Save posts that you want to read later by clicking the bookmark icon. Build your collection of saved content!
              </p>
            </div>
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
    
    <!-- Photo Upload Modal for Profile Photo -->
    <div 
      v-if="showPhotoModal"
      class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Change Profile Photo</h3>
        
        <div class="flex flex-col items-center space-y-4">
          <div class="relative">
            <img 
              :src="tempAvatar || user.avatar" 
              alt="Profile preview" 
              class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
            />
            <button 
              @click="triggerPhotoUpload"
              class="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <CameraIcon class="h-5 w-5" />
            </button>
          </div>
          
          <input 
            ref="photoInput"
            type="file" 
            accept="image/*" 
            class="hidden" 
            @change="handlePhotoChange"
          />
          
          <div class="flex space-x-3 w-full">
            <button 
              @click="triggerPhotoUpload"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Photo
            </button>
            <button 
              @click="removePhoto"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="cancelPhotoChange"
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="savePhotoChange"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Photo Upload Modal for Cover Photo -->
    <div 
      v-if="showCoverPhotoModal"
      class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Change Cover Photo</h3>
        
        <div class="flex flex-col items-center space-y-4">
          <div class="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img 
              v-if="tempCoverPhoto"
              :src="tempCoverPhoto" 
              alt="Cover preview" 
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600"></div>
            <button 
              @click="triggerCoverUpload"
              class="absolute inset-0 bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <CameraIcon class="h-8 w-8" />
            </button>
          </div>
          
          <input 
            ref="coverInput"
            type="file" 
            accept="image/*" 
            class="hidden" 
            @change="handleCoverChange"
          />
          
          <div class="flex space-x-3 w-full">
            <button 
              @click="triggerCoverUpload"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Photo
            </button>
            <button 
              @click="removeCoverPhoto"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="cancelCoverChange"
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="saveCoverChange"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import {
  CameraIcon,
  PencilIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  InboxIcon,
  PlusIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'
import Post from '@/components/Post.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Get user from route params or current user
const profileUsername = computed(() => route.params.user)
const isOwnProfile = computed(() => profileUsername.value === authStore.user?.email?.split('@')[0] || profileUsername.value === authStore.user?.name?.toLowerCase().replace(/\s+/g, ''))

// User data - load based on profile being viewed
const user = ref({
  name: 'Loading...',
  username: profileUsername.value,
  avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
  coverPhoto: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1350&q=80',
  bio: '',
  posts: 0,
  followers: 0,
  following: 0
})

// Load user data
onMounted(() => {
  loadUserData()
})

function loadUserData() {
  if (isOwnProfile.value) {
    // Load current user's data
    user.value = {
      name: authStore.user?.name || 'User',
      username: authStore.user?.email?.split('@')[0] || 'user',
      avatar: authStore.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
      coverPhoto: authStore.user?.coverPhoto || '',
      bio: 'Digital creator | Photography enthusiast | Coffee lover',
      posts: 24,
      followers: authStore.userStats?.followers || 1243,
      following: authStore.userStats?.following || 56
    }
  } else {
    // Load other user's data (mock data for now)
    user.value = {
      name: profileUsername.value.charAt(0).toUpperCase() + profileUsername.value.slice(1),
      username: profileUsername.value,
      avatar: `https://ui-avatars.com/api/?name=${profileUsername.value}&background=random&size=256`,
      coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1350&q=80',
      bio: 'Content creator and community enthusiast',
      posts: Math.floor(Math.random() * 100) + 10,
      followers: Math.floor(Math.random() * 1000) + 100,
      following: Math.floor(Math.random() * 200) + 50
    }
  }
}

// Tabs
const tabs = [
  { name: 'posts', label: 'Posts', icon: 'div' },
  { name: 'following', label: 'Following', icon: UserGroupIcon },
  { name: 'saved', label: 'Saved', icon: HeartIcon }
]
const currentTab = ref('posts')

// Modal states
const showCreatePostModal = ref(false)
const showSettingsMenu = ref(false)
const showImageModal = ref(false)
const showPhotoModal = ref(false)
const showCoverPhotoModal = ref(false)
const modalImage = ref('')
const tempAvatar = ref('')
const tempCoverPhoto = ref('')
const photoInput = ref(null)
const coverInput = ref(null)

// Following state (for viewing other profiles)
const isFollowing = ref(false)

// Mock data with enhanced structure for Post component compatibility
const userPosts = ref([
  {
    id: 1,
    username: computed(() => user.value.name),
    userAvatar: computed(() => user.value.avatar),
    content: 'Just finished an amazing photography session! The lighting was perfect today. 📸',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
    tags: ['photography', 'nature', 'art'],
    likes: 45,
    comments: 12,
    shares: 3,
    isLiked: false,
    date: new Date(Date.now() - 3600000 * 2),
    fandom: 'Photography'
  },
  {
    id: 2,
    username: computed(() => user.value.name),
    userAvatar: computed(() => user.value.avatar),
    content: 'Coffee and code - my favorite combination for a productive morning! ☕️💻\n\nWorking on some exciting new features that I can\'t wait to share with you all.',
    tags: ['coding', 'coffee', 'productivity', 'development'],
    likes: 23,
    comments: 8,
    shares: 1,
    isLiked: true,
    date: new Date(Date.now() - 3600000 * 8),
    fandom: 'Tech'
  }
])

const savedPosts = ref([
  {
    id: 3,
    username: 'Alice Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Amazing sunset from my balcony tonight! 🌅 Sometimes the best moments are right at home.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    tags: ['sunset', 'photography', 'nature'],
    likes: 89,
    comments: 15,
    shares: 7,
    isLiked: true,
    date: new Date(Date.now() - 3600000 * 12),
    fandom: 'Photography'
  }
])

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

// Post menu
const openPostMenu = ref(null)

function togglePostMenu(postId) {
  openPostMenu.value = openPostMenu.value === postId ? null : postId
}

function editProfile() {
  router.push('/edit-account')
}

function editCoverPhoto() {
  showCoverPhotoModal.value = true
  showSettingsMenu.value = false
  tempCoverPhoto.value = user.value.coverPhoto
}

function editProfilePhoto() {
  showPhotoModal.value = true
  showSettingsMenu.value = false
  tempAvatar.value = user.value.avatar
}

function openPhotoModal() {
  showPhotoModal.value = true
  showSettingsMenu.value = false
  tempAvatar.value = user.value.avatar
}

function triggerPhotoUpload() {
  photoInput.value?.click()
}

function triggerCoverUpload() {
  coverInput.value?.click()
}

function handlePhotoChange(event) {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('Profile photo must be less than 2MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      tempAvatar.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function handleCoverChange(event) {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Cover photo must be less than 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      tempCoverPhoto.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function removePhoto() {
  tempAvatar.value = `https://ui-avatars.com/api/?name=${user.value.name}&background=6366f1&color=fff&size=256`
}

function removeCoverPhoto() {
  tempCoverPhoto.value = ''
}

function savePhotoChange() {
  user.value.avatar = tempAvatar.value
  // Update auth store
  if (isOwnProfile.value && authStore.user) {
    authStore.user.avatar = tempAvatar.value
    localStorage.setItem('auth', JSON.stringify(authStore.user))
  }
  showPhotoModal.value = false
}

function saveCoverChange() {
  user.value.coverPhoto = tempCoverPhoto.value
  // Update auth store
  if (isOwnProfile.value && authStore.user) {
    authStore.user.coverPhoto = tempCoverPhoto.value
    localStorage.setItem('auth', JSON.stringify(authStore.user))
  }
  showCoverPhotoModal.value = false
}

function cancelPhotoChange() {
  tempAvatar.value = ''
  showPhotoModal.value = false
}

function cancelCoverChange() {
  tempCoverPhoto.value = ''
  showCoverPhotoModal.value = false
}

function toggleLike(postId) {
  const post = userPosts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes += post.isLiked ? 1 : -1
  }
}

function editPost(post) {
  console.log('Edit post:', post)
}

function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    userPosts.value = userPosts.value.filter(p => p.id !== postId)
    user.value.posts -= 1
  }
}

function toggleFollow() {
  isFollowing.value = !isFollowing.value
  user.value.followers += isFollowing.value ? 1 : -1
}

function openImageModal(imageSrc) {
  modalImage.value = imageSrc
  showImageModal.value = true
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    router.push('/login')
  }
}

function handlePostCreated(newPost) {
  userPosts.value.unshift({
    ...newPost,
    username: user.value.name,
    userAvatar: user.value.avatar,
    id: Date.now()
  })
  showCreatePostModal.value = false
  user.value.posts += 1
}

function unfollow(userId) {
  following.value = following.value.filter(user => user.id !== userId)
  user.value.following -= 1
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
/* Enhanced animations */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Glass morphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}
</style>