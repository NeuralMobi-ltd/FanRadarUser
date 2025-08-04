<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Update your profile information and settings</p>
      </div>

      <!-- Cover Photo Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cover Photo</h2>
        <div class="relative">
          <!-- Cover Photo Display -->
          <div class="relative w-full h-48 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 rounded-xl overflow-hidden">
            <img 
              v-if="profileForm.coverPhoto"
              :src="profileForm.coverPhoto" 
              alt="Cover photo" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div class="text-center">
                <button 
                  @click="triggerCoverUpload"
                  class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors mb-2"
                >
                  <CameraIcon class="h-5 w-5 mr-2" />
                  {{ profileForm.coverPhoto ? 'Change Cover Photo' : 'Add Cover Photo' }}
                </button>
                <p class="text-white/80 text-sm">Recommended: 1200x400px, JPG or PNG, max 5MB</p>
              </div>
            </div>
          </div>
          
          <!-- Cover Photo Actions -->
          <div class="absolute bottom-4 right-4 flex space-x-2">
            <button 
              @click="triggerCoverUpload"
              class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <CameraIcon class="h-4 w-4" />
            </button>
            <button 
              v-if="profileForm.coverPhoto"
              @click="removeCoverPhoto"
              class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <input 
            ref="coverInput"
            type="file" 
            accept="image/*" 
            class="hidden" 
            @change="handleCoverChange"
          />
        </div>
      </div>

      <!-- Profile Photo Section - Centered -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Profile Photo</h2>
        <div class="flex flex-col items-center space-y-6">
          <div class="relative">
            <div class="relative">
              <img 
                :src="profileForm.avatar" 
                alt="Profile photo" 
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
              <button 
                @click="triggerProfilePhotoUpload"
                class="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                <CameraIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Change your photo</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Recommended: Square JPG, PNG, or GIF, at least 400x400px and less than 2MB.</p>
            <div class="flex justify-center space-x-3">
              <button 
                @click="triggerProfilePhotoUpload"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Upload Photo
              </button>
              <button 
                @click="removeProfilePhoto"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Remove
              </button>
            </div>
            <input 
              ref="profilePhotoInput"
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleProfilePhotoChange"
            />
          </div>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input 
                v-model="profileForm.name"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input 
                v-model="profileForm.username"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input 
              v-model="profileForm.email"
              type="email" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
            <textarea 
              v-model="profileForm.bio"
              rows="4" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <!-- Password Section -->
          <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <div class="relative">
                  <input 
                    v-model="profileForm.password"
                    :type="showPassword ? 'text' : 'password'" 
                    class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-lg"></i>
                  </button>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Leave blank to keep current password</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <div class="relative">
                  <input 
                    v-model="profileForm.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-lg"></i>
                  </button>
                </div>
                <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button 
              type="button"
              @click="cancelEdit"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { CameraIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const profilePhotoInput = ref(null)
const coverInput = ref(null)
const saving = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const profileForm = ref({
  name: '',
  username: '',
  email: '',
  bio: '',
  avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
  coverPhoto: '',
  password: '',
  confirmPassword: ''
})

const passwordError = computed(() => {
  if (profileForm.value.password && profileForm.value.confirmPassword) {
    if (profileForm.value.password !== profileForm.value.confirmPassword) {
      return 'Passwords do not match'
    }
  }
  return ''
})

onMounted(() => {
  // Load current user data
  if (authStore.user) {
    profileForm.value = {
      name: authStore.user.userName || '',
      username: authStore.user.userName || authStore.user.userEmail?.split('@')[0] || '',
      email: authStore.user.userEmail || '',
      bio: authStore.user.bio || 'Digital creator | Photography enthusiast | Coffee lover',
      avatar: authStore.user.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
      coverPhoto: authStore.user.coverPhoto || '',
      password: '',
      confirmPassword: ''
    }
  }
})

// Profile Photo Functions
function triggerProfilePhotoUpload() {
  profilePhotoInput.value?.click()
}

function handleProfilePhotoChange(event) {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('Profile photo must be less than 2MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      profileForm.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function removeProfilePhoto() {
  profileForm.value.avatar = `https://ui-avatars.com/api/?name=${profileForm.value.name}&background=6366f1&color=fff&size=256`
}

// Cover Photo Functions
function triggerCoverUpload() {
  coverInput.value?.click()
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
      profileForm.value.coverPhoto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function removeCoverPhoto() {
  profileForm.value.coverPhoto = ''
}

function saveProfile() {
  // Validate passwords if provided
  if (profileForm.value.password || profileForm.value.confirmPassword) {
    if (profileForm.value.password !== profileForm.value.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (profileForm.value.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }
  }

  saving.value = true

  try {
    // Create updated user object
    const updatedUser = {
      ...authStore.user,
      userName: profileForm.value.name,
      userEmail: profileForm.value.email,
      bio: profileForm.value.bio,
      avatar: profileForm.value.avatar,
      coverPhoto: profileForm.value.coverPhoto
    }

    // Add password if provided
    if (profileForm.value.password) {
      updatedUser.password = profileForm.value.password
    }

    // Update auth store directly
    authStore.user = updatedUser
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Show success message
    alert('Profile updated successfully!')
    
    // Navigate back to profile
    setTimeout(() => {
      router.push(`/account/${profileForm.value.username}`)
    }, 100)
    
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Error saving profile. Please try again.')
  } finally {
    saving.value = false
  }
}

function cancelEdit() {
  router.push(`/account/${profileForm.value.username}`)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>