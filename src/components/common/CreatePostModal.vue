<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
    <div class="bg-gradient-to-br from-white/90 via-blue-50/90 to-blue-100/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-blue-100 dark:border-blue-800">
      <button
        @click="() => { $emit('close'); $emit('update:modelValue', false) }"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full p-1 bg-white/70 dark:bg-gray-900/70 shadow"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="flex items-start space-x-4">
        <img :src="userAvatar || '/images/me.png'" class="w-14 h-14 rounded-full ring-2 ring-blue-300 dark:ring-blue-700 object-cover shadow" :alt="userName">
        <div class="flex-1">
          <!-- Show post info if editing -->
          <div v-if="editPost" class="mb-3">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Editing post from <b>{{ userName }}</b></span>
              <span v-if="editPost.date"> • {{ editPost.date }}</span>
            </div>
          </div>
          
          <textarea
            v-model="postContent"
            :placeholder="postContent ? '' : 'What\'s on your mind?'"
            class="w-full resize-none border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium"
            rows="3"
          ></textarea>
          
          <!-- Tags display if editing existing post -->
          <div v-if="editPost?.tags?.length" class="flex flex-wrap gap-1 mb-3">
            <span v-for="tag in editPost.tags" :key="tag" class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs">#{{ tag }}</span>
          </div>
          
          <!-- Media preview if editing existing post -->
          <div v-if="editPost?.media?.length" class="flex gap-2 mb-3">
            <span v-for="(media, i) in editPost.media" :key="i" class="inline-block">
              <img v-if="media.type === 'image'" :src="media.url" class="w-10 h-10 object-cover rounded" />
              <span v-else class="inline-block w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">🎬</span>
            </span>
          </div>
          
          <!-- Tags Input -->
          <div class="mt-2">
            <input
              v-model="tagInput"
              @keydown.enter.prevent="addTag"
              @keydown.tab.prevent="addTag"
              type="text"
              class="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white text-xs placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
              placeholder="Add tags (press Enter or Tab)..."
            />
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="(tag, idx) in tags"
                :key="idx"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow"
              >
                #{{ tag }}
                <button type="button" class="ml-1 text-white/80 hover:text-red-200" @click="removeTag(idx)">
                  &times;
                </button>
              </span>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-4">
              <label class="flex items-center gap-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
                <i class="fas fa-image"></i>
                <span class="text-xs">Image</span>
                <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
              </label>
              <label class="flex items-center gap-1 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all">
                <i class="fas fa-video"></i>
                <span class="text-xs">Video</span>
                <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
              </label>
            </div>
            <button
              @click="submit"
              :disabled="!postContent.trim() && postMedia.length === 0"
              class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Post
            </button>
          </div>
          
          <!-- New media preview -->
          <div v-if="postMedia.length > 0" class="mt-4 grid grid-cols-2 gap-3">
            <div v-for="(media, index) in postMedia" :key="index" class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
              <img v-if="media.type === 'image'" :src="media.url" class="max-h-48 rounded-lg mb-2 w-full object-cover" />
              <video v-else-if="media.type === 'video'" :src="media.url" controls class="max-h-48 rounded-lg mb-2 w-full object-cover"></video>
              <button @click="removeMedia(index)" class="absolute top-2 right-2 text-xs text-white bg-red-500 rounded-full px-2 py-1 hover:bg-red-700 shadow">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  userAvatar: String,
  userName: String,
  editPost: Object
})

const emit = defineEmits(['close', 'submit', 'update:modelValue'])

const postContent = ref('')
const postMedia = ref([])

// Tag logic
const tags = ref([])
const tagInput = ref('')

function addTag() {
  const tag = tagInput.value.trim().replace(/^#/, '')
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
  }
  tagInput.value = ''
}

function removeTag(idx) {
  tags.value.splice(idx, 1)
}

function onFileChange(type, event) {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      postMedia.value.push({
        type,
        url: e.target.result,
        file
      })
    }
    reader.readAsDataURL(file)
  })
}

function removeMedia(index) {
  postMedia.value.splice(index, 1)
}

function submit() {
  if (postContent.value.trim() || postMedia.value.length > 0) {
    emit('submit', {
      text: postContent.value,
      media: postMedia.value.map(m => ({ type: m.type, url: m.url })),
      tags: [...tags.value]
    })
    postContent.value = ''
    postMedia.value = []
    tags.value = []
    tagInput.value = ''
    emit('close')
    emit('update:modelValue', false)
  }
}

// Reset form when modal is closed or when editing a post
watch(() => props.modelValue, (val) => {
  if (!val) {
    postContent.value = ''
    postMedia.value = []
    tags.value = []
    tagInput.value = ''
  } else if (props.editPost) {
    postContent.value = props.editPost.content || props.editPost.text || ''
    tags.value = Array.isArray(props.editPost.tags) ? [...props.editPost.tags] : []
    postMedia.value = Array.isArray(props.editPost.media) ? [...props.editPost.media] : []
  }
})
</script>