<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur p-4">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ editPost ? 'Edit Post' : 'Create Post' }}
        </h3>
        <button
          @click="() => { $emit('close'); $emit('update:modelValue', false) }"
          class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 space-y-4">
        <!-- User Info for editing -->
        <div v-if="editPost" class="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <img :src="userAvatar || '/images/me.png'" class="w-8 h-8 rounded-full object-cover" :alt="userName">
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400" v-if="editPostDate">{{ editPostDate }}</p>
          </div>
        </div>

        <!-- Main Text Input -->
        <div class="flex items-start space-x-3">
          <img 
            :src="userAvatar || '/images/me.png'" 
            class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0" 
            :alt="userName"
          >
          <div class="flex-1 min-w-0">
            <textarea
              v-model="postContent"
              :placeholder="postContent ? '' : 'What\'s on your mind?'"
              class="w-full resize-none border-none outline-none bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium min-h-[6rem] focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors"
              rows="4"
              @input="autoResize"
            ></textarea>
          </div>
        </div>

        <!-- Tags Section -->
        <div v-if="showTagInput || tags.length" class="pl-13">
          <div class="flex flex-wrap gap-2 mb-3" v-if="Array.isArray(tags) && tags.length">
            <span
              v-for="(tag, idx) in tags"
              :key="idx"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
            >
              #{{ tag }}
              <button type="button" class="ml-1.5 text-white/80 hover:text-white transition-colors" @click="removeTag(idx)">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </span>
          </div>
          <input
            ref="tagInputEl"
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            @keydown.tab.prevent="addTag"
            type="text"
            class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Add tags (press Enter or Tab)..."
          />
        </div>
          
        <!-- Media Preview -->
        <div v-if="postMedia.length > 0" class="pl-13">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div 
              v-for="(media, i) in postMedia" 
              :key="i" 
              class="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square"
            >
              <img
                v-if="media.type === 'image'"
                :src="media.url"
                class="w-full h-full object-cover"
              />
              <video
                v-else-if="media.type === 'video'"
                :src="media.url"
                class="w-full h-full object-cover"
                muted
              ></video>
              <button
                @click="removeMedia(i)"
                class="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-1">
          <!-- Image Upload -->
          <label class="flex items-center justify-center w-10 h-10 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all touch-target">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
            <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
          </label>
          
          <!-- Video Upload -->
          <label class="flex items-center justify-center w-10 h-10 rounded-xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all touch-target">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
          </label>
          
          <!-- Tag Input Toggle -->
          <button 
            @click="toggleTagInput" 
            class="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all touch-target"
            :class="{ 'text-blue-600 bg-blue-50 dark:bg-blue-900/20': showTagInput || tags.length }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Post Button -->
        <button
          @click="submit"
          :disabled="!postContent.trim() && postMedia.length === 0"
          class="px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all text-sm touch-target min-w-[5rem] bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {{ editPost ? 'Update' : 'Post' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  userAvatar: String,
  userName: String,
  editPost: Object
})

const emit = defineEmits(['close', 'submit', 'update:modelValue'])

const postContent = ref('')
const postMedia = ref([])
const tags = ref([])
const tagInput = ref('')
// Control visibility of the tag input separately from its content
const showTagInput = ref(false)
const tagInputEl = ref(null)

// Computed property for formatted date
const editPostDate = computed(() => {
  if (!props.editPost?.date) return ''
  const date = new Date(props.editPost.date)
  return `${date.getHours()}h ago`
})

// Initialize with edit post data
watch(() => props.editPost, (newVal) => {
  if (newVal) {
    postContent.value = newVal.content || newVal.text || ''
    tags.value = Array.isArray(newVal.tags) ? [...newVal.tags] : []
    postMedia.value = Array.isArray(newVal.media) ? [...newVal.media] : []
  }
}, { immediate: true })

// Auto-resize textarea for mobile experience
const autoResize = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'
}

// Toggle tag input visibility
const toggleTagInput = async () => {
  showTagInput.value = !showTagInput.value
  if (showTagInput.value) {
    await nextTick()
    tagInputEl.value?.focus()
  }
}

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
  if (event?.target) event.target.value = ''
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
    showTagInput.value = false
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
    showTagInput.value = false
  } else if (props.editPost) {
    postContent.value = props.editPost.content || props.editPost.text || ''
    tags.value = Array.isArray(props.editPost.tags) ? [...props.editPost.tags] : []
    postMedia.value = Array.isArray(props.editPost.media) ? [...props.editPost.media] : []
    showTagInput.value = !!tags.value.length
  }
})
</script>

<style scoped>
/* Mobile-friendly touch targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

/* Responsive spacing utilities */
.pl-13 {
  padding-left: 3.25rem;
}

@media (min-width: 640px) {
  .sm\:pl-16 {
    padding-left: 4rem;
  }
}
</style>