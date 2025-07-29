<template>
  <div class=" min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200 sm:pl-4">
    <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-5 bg-white dark:bg-black flex items-center justify-between">
      <h1 class="text-xl font-bold">New fandom</h1>
      <div>
        <button class="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded mr-2" @click="$router.back()">Cancel</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium">Create</button>
      </div>
    </div>
    <div class="max-w-2xl mx-auto py-10 px-4">
      <div class="space-y-6">
        <!-- Fandom Details -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 class="font-bold mb-4">Fandom details</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="title" maxlength="50" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Fandom title" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Handle <span class="text-red-500">*</span></label>
            <input type="text" v-model="handle" maxlength="30" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="fandom-handle" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Tagline <span class="text-red-500">*</span></label>
            <input type="text" v-model="tagline" maxlength="100" class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="A short description" />
          </div>
        </div>
        <!-- Tags -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 class="font-bold mb-4">Tags</h2>
          <input v-model="newTag" @keydown.enter.prevent="addTag" placeholder="Add tag..." class="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 mb-2" />
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag" class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              #{{ tag }}
              <button @click="removeTag(tag)" class="text-red-500 hover:text-red-700">&times;</button>
            </span>
          </div>
        </div>
        <!-- Appearance -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 class="font-bold mb-4">Appearance</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Upload banner</label>
            <input type="file" @change="onBannerChange" class="mb-2" />
            <div v-if="bannerPreview" class="mb-2">
              <img :src="bannerPreview" class="w-full max-h-40 object-cover rounded" />
            </div>
            <small class="text-gray-500 dark:text-gray-400">Image should be 1840px by 560px.</small>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Upload avatar</label>
            <input type="file" @change="onAvatarChange" class="mb-2" />
            <div v-if="avatarPreview" class="mb-2">
              <img :src="avatarPreview" class="w-20 h-20 object-cover rounded-full" />
            </div>
            <small class="text-gray-500 dark:text-gray-400">Image should be square, ideally 512px.</small>
          </div>
        </div>
        <!-- Privacy -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 class="font-bold mb-4">Privacy</h2>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2">
              <input type="radio" value="public" v-model="privacy" />
              <span>Public fandom</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="private" v-model="privacy" />
              <span>Private fandom</span>
            </label>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span v-if="privacy === 'public'">Anyone can see posts within this fandom. Only members can see comments and reactions.</span>
            <span v-else>Only members can see posts, comments, and reactions.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('')
const handle = ref('')
const tagline = ref('')
const tags = ref([])
const newTag = ref('')
const bannerPreview = ref('')
const avatarPreview = ref('')
const privacy = ref('public')

function addTag() {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
  }
  newTag.value = ''
}
function removeTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}
function onBannerChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      bannerPreview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      avatarPreview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
