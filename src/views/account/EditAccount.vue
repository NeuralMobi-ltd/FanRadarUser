<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 pb-24">
    <div class="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Update your profile information and settings</p>
      </div>

      <!-- Cover Photo Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Cover Photo</h2>
        <div class="relative">
          <!-- Cover Photo Display -->
          <div class="relative w-full h-36 sm:h-48 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 rounded-xl overflow-hidden">
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
                  class="inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-5 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors mb-2 leading-none gap-2"
                >
                  <CameraIcon class="h-5 w-5" />
                  <span class="text-sm sm:text-base">{{ profileForm.coverPhoto ? 'Change Cover Photo' : 'Add Cover Photo' }}</span>
                </button>
                <p class="text-white/80 text-xs sm:text-sm">Recommended: 1200x400px, JPG or PNG, max 5MB</p>
              </div>
            </div>
          </div>
          
          <!-- Cover Photo Actions -->
          <div class="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex space-x-2">
            <button 
              @click="triggerCoverUpload"
              class="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CameraIcon class="h-5 w-5 block" />
            </button>
            <button 
              v-if="profileForm.coverPhoto"
              @click="removeCoverPhoto"
              class="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <svg class="h-5 w-5 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Profile Photo</h2>
        <div class="flex flex-col items-center space-y-4 sm:space-y-6">
          <div class="relative">
            <div class="relative">
              <img 
                :src="profileForm.avatar" 
                alt="Profile photo" 
                class="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
              <button 
                @click="triggerProfilePhotoUpload"
                class="absolute -bottom-2 -right-2 bg-blue-600 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center p-0"
              >
                <CameraIcon class="h-5 w-5 block" />
              </button>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">Change your photo</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4">Recommended: Square JPG, PNG, or GIF, at least 400x400px and less than 2MB.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-2 sm:space-x-3">
              <button 
                @click="triggerProfilePhotoUpload"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                Upload Photo
              </button>
              <button 
                @click="removeProfilePhoto"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium w-full sm:w-auto"
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
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
        <form @submit.prevent="saveProfile" class="space-y-5 sm:space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First name</label>
              <input
                v-model="profileForm.first_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last name</label>
              <input
                v-model="profileForm.last_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last name"
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
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
              <span>Bio</span>
              <span class="text-xs text-gray-400">{{ profileForm.bio.length }}/300</span>
            </label>
            <textarea 
              v-model="profileForm.bio"
              rows="4" 
              maxlength="300"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <!-- Password Section -->
          <div class="border-t border-gray-200 dark:border-gray-600 pt-5 sm:pt-6">
            <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">Change Password</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <div class="relative">
                  <input 
                    v-model="profileForm.password"
                    :type="showPassword ? 'text' : 'password'" 
                    autocomplete="new-password"
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
                    autocomplete="new-password"
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

          <div class="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-4">
            <button 
              type="button"
              @click="cancelEdit"
              class="px-5 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 w-full sm:w-auto flex items-center gap-2"
            >
              <svg v-if="saving" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v2m0 12v2m8-8h-2M6 12H4m13.657-6.343l-1.414 1.414M8.757 16.243l-1.414 1.414m0-12.728l1.414 1.414M16.243 16.243l1.414 1.414" />
              </svg>
              <span>{{ saving ? 'Saving...' : 'Save Changes' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { CameraIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const profilePhotoInput = ref(null)
const coverInput = ref(null)
const saving = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Toast access (global plugin previously used in fandom creation)
let toast
try {
  const inst = getCurrentInstance()
  toast = inst?.appContext?.config?.globalProperties?.$toast || window.$toast
} catch (_) { /* ignore */ }

function notify(type, message) {
  if (toast && typeof toast[type] === 'function') {
    toast[type](message)
  } else {
    if (type === 'error') console.error(message)
    else if (type === 'warn') console.warn(message)
    else console.log(message)
  }
}

// UI form state + preview sources
const profileForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  bio: '',
  avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=256', // preview (data URL or absolute path)
  coverPhoto: '', // preview (data URL or absolute path)
  password: '',
  confirmPassword: ''
})

// Hold actual File objects selected so we can send them to backend
const avatarFile = ref(null)
const coverFile = ref(null)

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
    // Prefer the normalized fields provided by auth store (camelCase)
    const identifier = authStore.user.userName || authStore.user.userEmail?.split('@')[0] || authStore.user.name || 'User'
    const first = authStore.user.firstName || (authStore.user.name ? authStore.user.name.split(' ')[0] : '') || authStore.user.userName || ''
    const last = authStore.user.lastName || (authStore.user.name ? authStore.user.name.split(' ').slice(1).join(' ') : '') || ''
    profileForm.value = {
      first_name: first,
      last_name: last,
      email: authStore.user.userEmail || authStore.user.email || '',
      bio: authStore.user.bio || '',
      avatar: authStore.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(identifier)}&background=6366f1&color=fff&size=256`,
      coverPhoto: authStore.user.coverPhoto || authStore.user.background_image || '',
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
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    notify('error', 'Profile photo must be less than 2MB')
    return
  }
  avatarFile.value = file
  // Generate preview
  const reader = new FileReader()
  reader.onload = (e) => { profileForm.value.avatar = e.target.result }
  reader.readAsDataURL(file)
}

function removeProfilePhoto() {
  const name = `${profileForm.value.first_name || ''} ${profileForm.value.last_name || ''}`.trim() || (authStore.user?.userName || authStore.user?.userEmail?.split('@')[0]) || 'User'
  profileForm.value.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=256`
}

// Cover Photo Functions
function triggerCoverUpload() {
  coverInput.value?.click()
}

function handleCoverChange(event) {
  const file = event.target.files[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    notify('error', 'Cover photo must be less than 5MB')
    return
  }
  coverFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => { profileForm.value.coverPhoto = e.target.result }
  reader.readAsDataURL(file)
}

function removeCoverPhoto() {
  profileForm.value.coverPhoto = ''
  coverFile.value = null
}

function clearPasswordFields() {
  profileForm.value.password = ''
  profileForm.value.confirmPassword = ''
}

async function saveProfile() {
  // Validate passwords if provided
  if (profileForm.value.password || profileForm.value.confirmPassword) {
    if (profileForm.value.password !== profileForm.value.confirmPassword) {
      notify('error', 'Passwords do not match')
      return
    }
    if (profileForm.value.password.length < 6) {
      notify('error', 'Password must be at least 6 characters long')
      return
    }
  }

  saving.value = true
  try {
    // Build FormData for backend (supports images + other fields)
    const fd = new FormData()
    const appendIf = (k, v) => { if (v !== undefined && v !== null && String(v).trim() !== '') fd.append(k, v) }

    // include username if available (backend may validate it)
    const username = authStore.user?.userName || authStore.user?.username || (profileForm.value.email ? profileForm.value.email.split('@')[0] : '')
    appendIf('username', username)
    appendIf('first_name', profileForm.value.first_name)
    appendIf('last_name', profileForm.value.last_name)
    appendIf('email', profileForm.value.email)
    appendIf('bio', profileForm.value.bio)
    if (avatarFile.value) fd.append('profile_image', avatarFile.value)
    if (coverFile.value) fd.append('background_image', coverFile.value)
    if (profileForm.value.password) {
      fd.append('password', profileForm.value.password)
      fd.append('password_confirmation', profileForm.value.password) // typical backend requirement
    }

    const { success, error } = await authStore.updateProfileRemote(fd)
    if (!success) {
      notify('error', error || 'Failed to update profile on server')
      return
    }

    // Sync form with normalized store user (ensures we show stored URLs not stale Data URLs)
    const u = authStore.user
    profileForm.value.first_name = u.firstName || profileForm.value.first_name
    profileForm.value.last_name = u.lastName || profileForm.value.last_name
    profileForm.value.email = u.userEmail || profileForm.value.email
  profileForm.value.avatar = u.avatar || profileForm.value.avatar
  profileForm.value.coverPhoto = u.coverPhoto || profileForm.value.coverPhoto
  profileForm.value.bio = u.bio || profileForm.value.bio

  notify('success', 'Profile updated successfully!')
    setTimeout(() => {
      const idOrName = authStore.user?.userName || authStore.user?.userEmail?.split('@')[0] || authStore.user?.id
      router.push(`/account/${idOrName}`)
    }, 100)
  } catch (e) {
    console.error('Error saving profile:', e)
    // If backend returned validation errors (Laravel-like), show them
    const resp = e?.response?.data
    if (resp) {
      // If errors object exists, join messages
      if (resp.errors) {
        const messages = Object.values(resp.errors).flat().join('\n')
        notify('error', messages)
      } else if (resp.message) {
        notify('error', resp.message)
      } else {
        notify('error', JSON.stringify(resp))
      }
    } else {
      notify('error', 'Error saving profile. Please try again.')
    }
  } finally {
    saving.value = false
  // Always clear password fields so they don't persist (success or error)
  clearPasswordFields()
  }
}

function cancelEdit() {
  clearPasswordFields()
  const idOrName = authStore.user?.userName || authStore.user?.userEmail?.split('@')[0] || authStore.user?.id
  router.push(`/account/${idOrName}`)
}

// Ensure password fields never persist if user navigates away
onBeforeRouteLeave(() => {
  clearPasswordFields()
})
</script>

<style scoped>
/* Custom styles if needed */
</style>