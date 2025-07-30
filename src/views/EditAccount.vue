<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button 
          @click="router.go(-1)"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h1>
        <button
          @click="saveProfile"
          class="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Cover Photo Section -->
        <div class="relative h-48 bg-gray-100 dark:bg-gray-700">
          <img 
            v-if="form.coverPhoto"
            :src="form.coverPhoto"
            alt="Cover photo"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              @click="openMediaPicker('cover')"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CameraIcon class="-ml-1 mr-2 h-4 w-4" />
              {{ form.coverPhoto ? 'Change Cover Photo' : 'Add Cover Photo' }}
            </button>
          </div>
        </div>

        <!-- Profile Picture Section -->
        <div class="px-6 pb-6 relative">
          <div class="flex justify-center -mt-16">
            <div class="relative group">
              <img
                :src="form.avatar"
                alt="Profile picture"
                class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover bg-white"
              />
              <button
                @click="openMediaPicker('avatar')"
                class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <CameraIcon class="h-8 w-8 text-white" />
              </button>
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <div class="px-6 pb-8 space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 dark:text-gray-400">@</span>
              </div>
              <input
                type="text"
                id="username"
                v-model="form.username"
                class="block w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              v-model="form.bio"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Tell the world about yourself..."
            ></textarea>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Brief description for your profile.
            </p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <!-- Password Section -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Leave blank to keep current password.
            </p>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="form.newPassword"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                @click="showNewPassword = !showNewPassword"
                tabindex="-1"
              >
                <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="form.confirmPassword"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Picker Modal -->
    <MediaPickerModal
      v-if="showMediaPicker"
      :type="mediaPickerType"
      @close="showMediaPicker = false"
      @selected="handleMediaSelected"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ArrowLeftIcon, CameraIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

// Password visibility toggles
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Form data
const form = ref({
  name: authStore.user?.name || '',
  username: authStore.user?.username || '',
  bio: authStore.user?.bio || '',
  avatar: authStore.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256',
  coverPhoto: authStore.user?.coverPhoto || '',
  isPrivate: authStore.user?.isPrivate || false,
  email: authStore.user?.email || '',
  website: authStore.user?.website || '',
  location: authStore.user?.location || '',
  newPassword: '',
  confirmPassword: ''
})

// Media picker
const showMediaPicker = ref(false)
const mediaPickerType = ref('avatar')

function openMediaPicker(type) {
  mediaPickerType.value = type
  showMediaPicker.value = true
}

function handleMediaSelected(file) {
  if (mediaPickerType.value === 'avatar') {
    form.value.avatar = URL.createObjectURL(file)
  } else {
    form.value.coverPhoto = URL.createObjectURL(file)
  }
  showMediaPicker.value = false
}

function saveProfile() {
  // Validate passwords if any password field is filled
  if (form.value.newPassword || form.value.confirmPassword) {
    if (form.value.newPassword !== form.value.confirmPassword) {
      alert("New passwords don't match")
      return
    }
  }

  // Update the user data in the auth store
  authStore.updateUserProfile({
    ...form.value,
    // Only include password if it's being changed
    ...(form.value.newPassword ? {
      newPassword: form.value.newPassword
    } : {})
  })
  
  // Navigate back to the profile page
  router.push('/profile')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>