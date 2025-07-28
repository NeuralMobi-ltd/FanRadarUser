<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <div class="max-w-xl mx-auto pt-16 pb-8 px-4">
      <h2 class="text-2xl font-bold mb-8 text-center">Edit Profile</h2>
      <form class="space-y-6" @submit.prevent="saveChanges">
        <!-- Profile Image -->
        <div class="flex flex-col items-center mb-6">
          <div class="relative">
            <img :src="photoPreview || user.avatar" class="h-24 w-24 rounded-full object-cover border-2 border-blue-500" />
            <label for="photo-upload" class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <input id="photo-upload" type="file" class="hidden" accept="image/*" @change="onPhotoChange" />
            </label>
          </div>
          <span class="text-xs text-gray-500 mt-2">Click the photo to change</span>
        </div>
        <!-- Background Image -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Background Image</label>
          <div class="flex items-center gap-4">
            <div class="relative">
              <img
                :src="bgPreview || user.backgroundImage"
                class="h-16 w-32 rounded-lg object-cover border border-gray-300 dark:border-gray-700"
                style="box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
              />
              <div
                class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full p-1 shadow"
                style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"
              >
                <label for="bg-upload" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  <input id="bg-upload" type="file" class="hidden" accept="image/*" @change="onBgChange" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input v-model="user.fullName" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- Username -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Username</label>
          <input v-model="user.username" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input v-model="user.email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <div class="relative">
            <input
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              @click="showPassword = !showPassword"
              tabindex="-1"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15.54 15.54A8.963 8.963 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.014 9.014 0 012.042-3.338" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.042-3.338m1.664-2.043A8.963 8.963 0 0112 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const user = ref({
  fullName: authStore.user?.name || '',
  username: authStore.user?.name || '',
  email: authStore.user?.email || '',
  password: '',
  avatar: authStore.user?.avatar || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128',
  backgroundImage: authStore.user?.backgroundImage || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
})

const photoPreview = ref('')
const bgPreview = ref('')
const showPassword = ref(false)

function onPhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      photoPreview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

function onBgChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      bgPreview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

function saveChanges() {
  // Update user info in authStore (mock)
  authStore.user.name = user.value.fullName
  authStore.user.email = user.value.email
  authStore.user.avatar = photoPreview.value || user.value.avatar
  authStore.user.backgroundImage = bgPreview.value || user.value.backgroundImage
  // Save password if needed (mock only)
  if (user.value.password) {
    authStore.user.password = user.value.password
  }
  alert('Profile updated!')
}
</script>
