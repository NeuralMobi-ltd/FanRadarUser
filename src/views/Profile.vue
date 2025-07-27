<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <div class="flex flex-col items-center mb-4">
      <img src="/images/FanRadar.png" alt="FanRadar Logo" class="h-14 mb-2" />
    </div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Profile</h2>
    <!-- Profile Photo Section -->
    <div class="flex flex-col items-center mb-6">
      <div class="relative">
        <img :src="photoPreview || defaultPhoto" class="h-24 w-24 rounded-full object-cover border-2 border-indigo-500" />
        <label for="photo-upload" class="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 cursor-pointer hover:bg-indigo-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 3a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <input id="photo-upload" type="file" class="hidden" accept="image/*" @change="onPhotoChange" />
        </label>
      </div>
      <span class="text-xs text-gray-500 mt-2">Click the photo to change</span>
    </div>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input v-model="name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input v-model="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div class="relative">
          <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10" />
          <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15.54 15.54A8.963 8.963 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.014 9.014 0 012.042-3.338" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 012.042-3.338m1.664-2.043A8.963 8.963 0 0112 5c4.478 0 8.268 2.943 9.542 7-.274.832-.67 1.613-1.176 2.318M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input v-model="role" class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100" disabled />
      </div>
      <button type="button" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const name = ref(authStore.user?.name || '')
const email = ref(authStore.user?.email || '')
const role = ref(authStore.user?.role || '')
const confirmPassword = ref('')
const showPassword = ref(false)

const defaultPhoto = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name.value || 'User') + '&background=6366f1&color=fff&size=128'
const photoPreview = ref('')

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
</script> 