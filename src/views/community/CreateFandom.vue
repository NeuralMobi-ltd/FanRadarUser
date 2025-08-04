<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Simple Header -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-5xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="$router.back()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              ← Back
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Fandom</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">Build a thriving community around your passion</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="saveDraft" 
              :disabled="!hasContent"
              class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              💾 Save Draft
            </button>
            <button 
              @click="createFandom"
              :disabled="!isFormValid"
              :class=" [
                'px-6 py-2 rounded-lg font-medium transition-all duration-200',
                isFormValid 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              ]"
            >
              🚀 Create Fandom
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Basic Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              📝 Basic Information
            </h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fandom Name <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.title" 
                  maxlength="50" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  placeholder="Give your community a great name"
                  @input="generateHandle"
                />
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">Choose a clear, memorable name that reflects what your community is about</p>
                  <p class="text-xs text-gray-500">{{ formData.title.length }}/50</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Handle <span class="text-red-500">*</span>
                </label>
                <div class="flex rounded-lg border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                  <span class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm border-r border-gray-300 dark:border-gray-600 rounded-l-lg">
                    🌐 fanradar.com/fandom/
                  </span>
                  <input 
                    type="text" 
                    v-model="formData.handle" 
                    maxlength="30" 
                    class="flex-1 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-lg border-0 focus:outline-none" 
                    placeholder="your-fandom-name"
                    @input="validateHandle"
                  />
                </div>
                <div class="mt-2">
                  <p v-if="handleError" class="text-xs text-red-500 flex items-center">
                    ⚠️ {{ handleError }}
                  </p>
                  <p v-else class="text-xs text-gray-500">
                    This will be your community's unique address – letters, numbers, and hyphens only
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.tagline" 
                  maxlength="100" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  placeholder="A compelling one-liner that captures your fandom's essence"
                />
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">This appears in search results and previews – make it catchy!</p>
                  <p class="text-xs text-gray-500">{{ formData.tagline.length }}/100</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description
                </label>
                <textarea 
                  v-model="formData.description" 
                  rows="4" 
                  maxlength="500"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none" 
                  placeholder="Describe what makes your fandom special, what kind of content to expect, and what brings your community together..."
                ></textarea>
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">Help people understand your community's purpose</p>
                  <p class="text-xs text-gray-500">{{ formData.description.length }}/500</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Category & Tags -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🏷️ Category & Discovery
            </h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Primary Category <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <button
                    v-for="category in categories"
                    :key="category.value"
                    @click="formData.category = category.value"
                    :class=" [
                      'p-3 text-left rounded-lg border-2 transition-all duration-200',
                      formData.category === category.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    ]"
                  >
                    <div class="text-2xl mb-1">{{ category.icon }}</div>
                    <div class="font-medium text-sm truncate">{{ category.name }}</div>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Tags ({{ formData.tags.length }}/10)
                </label>
                <div class="flex items-center space-x-2 mb-4">
                  <div class="relative flex-1">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">#</span>
                    <input 
                      v-model="newTag" 
                      @keydown.enter.prevent="addTag"
                      @keydown.space.prevent="addTag"
                      placeholder="Add tags that describe your fandom" 
                      class="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    />
                  </div>
                  <button 
                    @click="addTag"
                    :disabled="!newTag.trim() || formData.tags.length >= 10"
                    class="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    ➕ Add
                  </button>
                </div>
                
                <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mb-3">
                  <span 
                    v-for="tag in formData.tags" 
                    :key="tag" 
                    class="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 text-sm font-medium transition-all hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    #{{ tag }}
                    <button @click="removeTag(tag)" class="text-blue-500 hover:text-blue-700 transition-colors">
                      ❌
                    </button>
                  </span>
                </div>
                
                <div v-if="suggestedTags.length > 0 && formData.tags.length < 10" class="mt-3">
                  <p class="text-xs text-gray-500 mb-2">💡 Suggested tags for {{ getCategoryName(formData.category) }}:</p>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="tag in suggestedTags.slice(0, 5)"
                      :key="tag"
                      @click="addSuggestedTag(tag)"
                      class="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      ➕ {{ tag }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🔐 Privacy & Settings
            </h2>
            
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Community Type</label>
                <div class="space-y-4">
                  <label class="flex items-start p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                    :class="{'border-blue-500 bg-blue-50 dark:bg-blue-900/20': formData.privacy === 'public'}">
                    <input type="radio" value="public" v-model="formData.privacy" class="mt-1" />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center">
                        <span class="text-xl mr-2">🌍</span>
                        <span class="font-medium text-gray-900 dark:text-white">Public Community</span>
                      </div>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Anyone can discover your fandom, see content, and join</p>
                    </div>
                  </label>
                  
                  <label class="flex items-start p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                    :class="{'border-blue-500 bg-blue-50 dark:bg-blue-900/20': formData.privacy === 'private'}">
                    <input type="radio" value="private" v-model="formData.privacy" class="mt-1" />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center">
                        <span class="text-xl mr-2">🔒</span>
                        <span class="font-medium text-gray-900 dark:text-white">Private Community</span>
                      </div>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Only approved members can see and participate in this fandom</p>
                    </div>
                  </label>
                </div>
              </div>

              <div class="space-y-4">
                <label class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <span class="text-xl">👥</span>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">Member Invitations</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Allow all members to invite their friends</div>
                    </div>
                  </div>
                  <input type="checkbox" v-model="formData.allowMemberInvites" class="rounded" />
                </label>
                
                <label class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div class="flex items-center space-x-3">
                    <span class="text-xl">✋</span>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">Membership Approval</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Review and approve new member requests</div>
                    </div>
                  </div>
                  <input type="checkbox" v-model="formData.requireApproval" class="rounded" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Live Preview -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              👁️ Preview
            </h3>
            
            <!-- Fandom Header Preview (similar to FandomDetail) -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
              <!-- Cover Image -->
              <div class="h-24 w-full bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <!-- Fandom Info -->
                <div class="absolute bottom-2 left-3 text-white">
                  <div class="flex items-center mb-1">
                    <div class="px-2 py-0.5 bg-blue-600 rounded-full text-xs font-medium mr-2">
                      <span>🎯 Fandom</span>
                    </div>
                    <div class="flex items-center text-xs">
                      <span>👥 0 members</span>
                      <span class="mx-1">•</span>
                      <span>{{ formData.privacy === 'private' ? '🔒 Private' : '🌍 Public' }}</span>
                    </div>
                  </div>
                  <h4 class="text-lg font-bold">{{ formData.title || 'Your Fandom Name' }}</h4>
                </div>
                
                <!-- Fandom Avatar/Logo -->
                <div class="absolute bottom-2 right-2">
                  <div class="w-12 h-12 bg-blue-600 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white font-bold">
                    {{ formData.title.charAt(0) || 'F' }}
                  </div>
                </div>
              </div>
              
              <div class="p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ formData.tagline || 'Your compelling tagline will appear here' }}
                </p>
                
                <!-- Category badge -->
                <div v-if="formData.category" class="mb-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    🏷️ {{ getCategoryName(formData.category) }}
                  </span>
                </div>

                <!-- Tags -->
                <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-1">
                  <span 
                    v-for="tag in formData.tags.slice(0, 3)" 
                    :key="tag"
                    class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                  >
                    #{{ tag }}
                  </span>
                  <span v-if="formData.tags.length > 3" class="text-xs text-gray-500 px-1">
                    +{{ formData.tags.length - 3 }}
                  </span>
                </div>
                
                <!-- Creator info -->
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span class="text-xs text-gray-500 dark:text-gray-400">👤 Created by {{ userName }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Tracker -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              📈 Progress
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Overall Progress</span>
                <span class="text-sm font-bold text-blue-600">{{ completionPercentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  class="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
                  :style="{ width: completionPercentage + '%' }"
                ></div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="flex items-center space-x-2">
                    <span :class="basicInfoComplete ? 'text-green-500' : 'text-gray-400'">
                      {{ basicInfoComplete ? '✅' : '⭕' }}
                    </span>
                    <span>Basic Information</span>
                  </span>
                  <span v-if="basicInfoComplete" class="text-green-500 text-xs">✅ Complete</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="flex items-center space-x-2">
                    <span :class="categoryComplete ? 'text-green-500' : 'text-gray-400'">
                      {{ categoryComplete ? '✅' : '⭕' }}
                    </span>
                    <span>Category & Tags</span>
                  </span>
                  <span v-if="categoryComplete" class="text-green-500 text-xs">✅ Complete</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="flex items-center space-x-2">
                    <span :class="settingsComplete ? 'text-green-500' : 'text-gray-400'">
                      {{ settingsComplete ? '✅' : '⭕' }}
                    </span>
                    <span>Privacy Settings</span>
                  </span>
                  <span v-if="settingsComplete" class="text-green-500 text-xs">✅ Complete</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 p-6">
            <h3 class="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
              💡 Pro Tips
            </h3>
            <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li class="flex items-start">
                <span class="mr-2">📌</span>
                <span>Use clear, descriptive names that fans will easily remember</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">🎯</span>
                <span>Add specific tags that fans actually search for</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✍️</span>
                <span>Write a compelling description that explains your community's value</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">🚀</span>
                <span>Choose the right privacy level for your community goals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.userName || 'You')

// Form data
const formData = ref({
  title: '',
  handle: '',
  tagline: '',
  description: '',
  category: '',
  tags: [],
  privacy: 'public',
  allowMemberInvites: true,
  requireApproval: false
})

const newTag = ref('')
const handleError = ref('')

// Categories
const categories = [
  { value: 'entertainment', name: 'Entertainment', icon: '🎭' },
  { value: 'music', name: 'Music', icon: '🎵' },
  { value: 'movies-tv', name: 'Movies & TV', icon: '🎬' },
  { value: 'books', name: 'Books', icon: '📚' },
  { value: 'gaming', name: 'Gaming', icon: '🎮' },
  { value: 'sports', name: 'Sports', icon: '⚽' },
  { value: 'technology', name: 'Technology', icon: '💻' },
  { value: 'art-design', name: 'Art & Design', icon: '🎨' },
  { value: 'lifestyle', name: 'Lifestyle', icon: '✨' },
  { value: 'education', name: 'Education', icon: '📖' },
  { value: 'science', name: 'Science', icon: '🔬' },
  { value: 'travel', name: 'Travel', icon: '✈️' }
]

// Computed properties
const isFormValid = computed(() => {
  return formData.value.title.trim() && 
         formData.value.handle.trim() && 
         formData.value.tagline.trim() && 
         !handleError.value
})

const basicInfoComplete = computed(() => {
  return formData.value.title && formData.value.handle && formData.value.tagline && !handleError.value
})

const categoryComplete = computed(() => {
  return formData.value.category && formData.value.tags.length > 0
})

const settingsComplete = computed(() => {
  return formData.value.privacy !== ''
})

const completionPercentage = computed(() => {
  let completed = 0
  if (basicInfoComplete.value) completed += 40
  if (categoryComplete.value) completed += 40
  if (settingsComplete.value) completed += 20
  return completed
})

const hasContent = computed(() => {
  return formData.value.title.trim() || formData.value.tagline.trim() || formData.value.description.trim()
})

const suggestedTags = computed(() => {
  const categoryTags = {
    'entertainment': ['celebrity', 'drama', 'comedy', 'reality-tv', 'entertainment-news'],
    'music': ['rock', 'pop', 'hip-hop', 'indie', 'electronic', 'classical', 'jazz', 'metal'],
    'movies-tv': ['marvel', 'netflix', 'anime', 'thriller', 'sci-fi', 'comedy', 'drama', 'horror'],
    'gaming': ['pc-gaming', 'console', 'mobile-games', 'esports', 'indie-games', 'rpg', 'fps', 'mmorpg'],
    'sports': ['football', 'basketball', 'soccer', 'baseball', 'olympics', 'tennis', 'golf', 'hockey'],
    'technology': ['gadgets', 'programming', 'ai', 'web-dev', 'mobile', 'blockchain', 'cloud', 'cybersecurity'],
    'art-design': ['illustration', 'graphic-design', 'photography', 'drawing', 'painting', 'digital-art', 'sculpture'],
    'lifestyle': ['fashion', 'beauty', 'wellness', 'fitness', 'home-decor', 'diy', 'self-care', 'relationships'],
    'education': ['learning', 'courses', 'student-life', 'academic', 'college', 'school', 'teaching', 'e-learning'],
    'science': ['physics', 'biology', 'chemistry', 'space', 'research', 'medicine', 'environment', 'technology'],
    'travel': ['adventure', 'destinations', 'budget-travel', 'backpacking', 'luxury-travel', 'food-travel', 'photography']
  }
  
  const baseTags = categoryTags[formData.value.category] || []
  return baseTags.filter(tag => !formData.value.tags.includes(tag))
})

// Methods
const generateHandle = () => {
  if (formData.value.title) {
    formData.value.handle = formData.value.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 30)
    
    validateHandle()
  }
}

const validateHandle = () => {
  const handle = formData.value.handle
  if (!handle) {
    handleError.value = ''
    return
  }
  
  if (!/^[a-z0-9-]+$/.test(handle)) {
    handleError.value = 'Handle can only contain lowercase letters, numbers, and hyphens'
  } else if (handle.length < 3) {
    handleError.value = 'Handle must be at least 3 characters long'
  } else if (handle.startsWith('-') || handle.endsWith('-')) {
    handleError.value = 'Handle cannot start or end with hyphens'
  } else {
    handleError.value = ''
  }
}

const addTag = () => {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  formData.value.tags = formData.value.tags.filter(t => t !== tag)
}

const addSuggestedTag = (tag) => {
  if (!formData.value.tags.includes(tag) && formData.value.tags.length < 10) {
    formData.value.tags.push(tag)
  }
}

const getCategoryName = (value) => {
  return categories.find(cat => cat.value === value)?.name
}

const saveDraft = () => {
  localStorage.setItem('fandomDraft', JSON.stringify(formData.value))
  
  // Show a toast notification
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50'
  toast.innerHTML = `
    <div class="flex items-center">
      <span class="text-lg mr-2">✅</span>
      <span>Draft saved successfully!</span>
    </div>
  `
  document.body.appendChild(toast)
  
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

const createFandom = () => {
  if (isFormValid.value) {
    console.log('Creating fandom:', formData.value)
    router.push(`/fandom/${formData.value.handle}`)
  }
}

// Load draft on mount
const loadDraft = () => {
  const draft = localStorage.getItem('fandomDraft')
  if (draft) {
    try {
      const parsedDraft = JSON.parse(draft)
      formData.value = { ...formData.value, ...parsedDraft }
    } catch (e) {
      console.error('Error loading draft:', e)
    }
  }
}

loadDraft()
</script>
