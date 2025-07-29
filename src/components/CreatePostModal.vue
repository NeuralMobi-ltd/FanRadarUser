<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div class="bg-white dark:bg-[#1a1f2a] rounded-xl shadow-xl w-full max-w-xl relative z-10">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          {{ props.initialContent ? 'Edit Post' : 'Create Post' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-4">
        <!-- Post Content List -->
        <div class="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
          <div v-for="(item, index) in postContent" :key="index" class="relative group">
            <!-- Text Content -->
            <div v-if="item.type === 'text'" 
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border-l-4 border-blue-500">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <i class="fas fa-font"></i>
                <span>Text</span>
              </div>
              <p class="text-gray-900 dark:text-white">{{ item.content }}</p>
            </div>

            <!-- Image Content -->
            <div v-if="item.type === 'image'" 
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border-l-4 border-green-500">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <i class="fas fa-image"></i>
                <span>Image</span>
              </div>
              <img :src="item.content" class="w-full rounded-lg">
            </div>

            <!-- Video Content -->
            <div v-if="item.type === 'video'" 
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border-l-4 border-purple-500">
              <div class="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <i class="fas fa-video"></i>
                <span>Video</span>
              </div>
              <video :src="item.content" controls class="w-full rounded-lg"></video>
            </div>

            <!-- Remove Button -->
            <button 
              @click="removeContent(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <i class="fas fa-times text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Input Area -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex gap-3 mb-4">
            <button
              @click="currentType = 'text'"
              :class="['px-3 py-1 rounded-full text-sm font-medium transition-colors', 
                currentType === 'text' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400']"
            >
              <i class="fas fa-font"></i>
            </button>
            <button
              @click="() => fileInput.click()"
              :class="['px-3 py-1 rounded-full text-sm font-medium transition-colors', 
                currentType === 'image' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400']"
            >
              <i class="fas fa-camera"></i>
            </button>
            <button
              @click="() => videoInput.click()"
              :class="['px-3 py-1 rounded-full text-sm font-medium transition-colors', 
                currentType === 'video' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-purple-100 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400']"
            >
              <i class="fas fa-video"></i>
            </button>
          </div>

          <!-- Text Input -->
          <div v-if="currentType === 'text'" class="relative">
            <textarea
              v-model="currentContent"
              placeholder="Write your post..."
              rows="3"
              ref="textInput"
              @input="autoGrow"
              class="w-full min-h-[80px] max-h-[300px] p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 
                     focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 
                     dark:placeholder-gray-400 resize-none overflow-hidden whitespace-pre-wrap break-words"
            ></textarea>
          </div>

          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept="image/*"
            @change="handleImageUpload"
          >
          <input
            type="file"
            ref="videoInput"
            class="hidden"
            accept="video/*"
            @change="handleVideoUpload"
          >
        </div>

        <!-- Tags -->
        <div class="mt-4">
          <div class="flex flex-wrap gap-2 mb-2">
            <span v-for="tag in tags" :key="tag" 
              class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <span class="text-gray-500 dark:text-gray-400">#</span>
              {{ tag }}
              <button @click="removeTag(tag)" class="hover:text-red-500">×</button>
            </span>
          </div>
          <input
            v-model="newTag"
            @keydown.enter.prevent="addTag"
            placeholder="Add tags..."
            class="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white mt-2"
          >
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          Cancel
        </button>
        <button 
          @click="createPost"
          :disabled="!isValid"
          :class=" [
            'px-4 py-2 rounded-lg font-medium',
            isValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          ]"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { usePostsStore } from '@/store/posts'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  isVisible: Boolean,
  initialContent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'create'])
const postsStore = usePostsStore()
const authStore = useAuthStore()

const postContent = ref([])
const currentType = ref('text')
const currentContent = ref('')
const tags = ref([])
const newTag = ref('')
const fileInput = ref(null)
const videoInput = ref(null)
const textInput = ref(null)

// Initialize content if editing
if (props.initialContent) {
  postContent.value = props.initialContent.content
  tags.value = props.initialContent.tags
}

function addContent() {
  if (currentContent.value.trim()) {
    postContent.value.push({
      type: currentType.value,
      content: currentContent.value.trim()
    })
    currentContent.value = ''
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      postContent.value.push({
        type: 'image',
        content: e.target.result
      })
    }
    reader.readAsDataURL(file)
  }
}

function handleVideoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      postContent.value.push({
        type: 'video',
        content: e.target.result
      })
    }
    reader.readAsDataURL(file)
  }
}

function removeContent(index) {
  postContent.value.splice(index, 1)
}

const isValid = computed(() => {
  return postContent.value.length > 0
})

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

function createPost() {
  if (!isValid.value) return

  const post = {
    content: postContent.value.map(item => ({ ...item })), // clone to avoid reference issues
    tags: [...tags.value],
    createdAt: new Date(),
    author: authStore.user?.username || 'admin'
  }

  postsStore.addPost(post)
  emit('create', post)

  // Clear modal content after posting
  postContent.value = []
  currentContent.value = ''
  tags.value = []
  newTag.value = ''
}

function autoGrow() {
  const textarea = textInput.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

watch(() => currentContent.value, () => {
  nextTick(() => {
    autoGrow()
  })
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  /* Custom Scrollbar */
  background: transparent;
}

.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Add smooth transitions for tags */
.tag-enter-active,
.tag-leave-active {
  transition: all 0.3s ease;
}

.tag-enter-from,
.tag-leave-to {
  /* Add these new styles */
  opacity: 0;
  transform: translateX(-10px);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
