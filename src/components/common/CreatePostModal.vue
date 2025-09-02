<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-in fade-in-0 zoom-in-95 duration-300 flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <i class="fas fa-plus text-white text-lg"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editPost ? 'Edit Post' : 'Create Post' }}
          </h3>
        </div>
        <button
          @click="() => { $emit('close'); $emit('update:modelValue', false) }"
          class="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-6 space-y-6">
        <!-- User Info for editing -->
        <div v-if="editPost" class="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <img :src="userAvatar || '/images/me.png'" class="w-8 h-8 rounded-full object-cover" :alt="userName">
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400" v-if="editPostDate">{{ editPostDate }}</p>
          </div>
        </div>

        <!-- Main Text Input -->
        <div class="flex items-start space-x-4">
          <img 
            :src="userAvatar || '/images/me.png'" 
            class="w-12 h-12 rounded-full object-cover border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg flex-shrink-0" 
            :alt="userName"
          >
          <div class="flex-1 min-w-0">
            <textarea
              v-model="postContent"
              :placeholder="postContent ? '' : 'What\'s on your mind?'"
              class="w-full resize-none border-none outline-none bg-gray-50 dark:bg-gray-800 rounded-2xl px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg font-medium min-h-[8rem] focus:bg-gray-100 dark:focus:bg-gray-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              rows="4"
              @input="autoResize"
            ></textarea>
          </div>
        </div>

        <!-- Tags Section -->
        <div v-if="showTagInput || tags.length" class="pl-16">
          <div class="flex flex-wrap gap-3 mb-4" v-if="Array.isArray(tags) && tags.length">
            <span
              v-for="(tag, idx) in tags"
              :key="idx"
              class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              #{{ tag }}
              <button type="button" class="ml-2 text-white/80 hover:text-white transition-colors" @click="removeTag(idx)">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
          </div>
          <input
            ref="tagInputEl"
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            @keydown.tab.prevent="addTag"
            type="text"
            class="w-full px-6 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Add tags (press Enter or Tab)..."
          />
        </div>

        <!-- Category / Subcategory Selection Display: only show subcategory to user per requirement -->
        <div v-if="selectedSubcategory" class="pl-16">
          <div class="flex flex-wrap gap-3">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
              <i class="fas fa-tag mr-2 text-sm"></i>
              {{ selectedSubcategory }}
            </span>
          </div>
        </div>

        <!-- Scheduling Section -->
        <div v-if="scheduleEnabled" class="pl-16">
          <div class="mt-4 space-y-2">
            <label class="block text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Schedule (optional)</label>
            <div class="flex items-center gap-3">
              <input type="datetime-local" v-model="scheduleAt" class="px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full" />
              <button type="button" @click="clearSchedule" class="px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition" v-if="scheduleAt">Clear</button>
            </div>
            <p class="text-[11px] text-gray-500 dark:text-gray-400">If set, the post will be created as draft and can be published automatically at the scheduled time (backend dependent).</p>
          </div>
        </div>
        <!-- Media Preview -->
        <div v-if="postMedia.length > 0" class="pl-16">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div 
              v-for="(media, i) in postMedia" 
              :key="i" 
              class="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square group hover:shadow-lg transition-all duration-200"
            >
              <img
                v-if="media.type === 'image'"
                :src="media.url"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <video
                v-else-if="media.type === 'video'"
                :src="media.url"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                muted
              ></video>
              <button
                @click="removeMedia(i)"
                class="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <i class="fas fa-times text-sm"></i>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <!-- Upload progress and errors -->
        <div class="px-6 pt-4">
          <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
            <div :style="{ width: uploadProgress + '%' }" class="h-3 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 rounded-full"></div>
          </div>
          <p v-if="error" class="text-sm text-red-600 dark:text-red-400 mb-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">{{ error }}</p>
        </div>

        <div class="flex items-center justify-between p-6">
          <div class="flex items-center space-x-2">
            <!-- Image Upload -->
            <label class="flex items-center justify-center w-12 h-12 rounded-2xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-200 touch-target group">
              <i class="fas fa-image text-xl group-hover:scale-110 transition-transform duration-200"></i>
              <input type="file" accept="image/*" multiple class="hidden" @change="onFileChange('image', $event)" />
            </label>
            
            <!-- Video Upload -->
            <label class="flex items-center justify-center w-12 h-12 rounded-2xl text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all duration-200 touch-target group">
              <i class="fas fa-video text-xl group-hover:scale-110 transition-transform duration-200"></i>
              <input type="file" accept="video/*" multiple class="hidden" @change="onFileChange('video', $event)" />
            </label>
            
            <!-- Tag Input Toggle -->
            <button 
              @click="toggleTagInput" 
              class="flex items-center justify-center w-12 h-12 rounded-2xl text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 touch-target group"
              :class="{ 'text-blue-600 bg-blue-50 dark:bg-blue-900/20': showTagInput || tags.length }"
              title="Add tags"
            >
              <i class="fas fa-hashtag text-xl group-hover:scale-110 transition-transform duration-200"></i>
            </button>

            <!-- Category Picker -->
            <div class="relative">
              <button @click="showCategoryPicker = !showCategoryPicker" class="flex items-center justify-center w-12 h-12 rounded-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 touch-target group" 
                :class="{ 'text-green-600 bg-green-50 dark:bg-green-900/20': selectedCategory }"
                title="Choose category">
                <i class="fas fa-list text-xl group-hover:scale-110 transition-transform duration-200"></i>
              </button>
              <div v-if="showCategoryPicker" class="absolute left-0 bottom-full mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 w-64 z-50 animate-in slide-in-from-bottom-2 duration-200">
                <div class="mb-3 text-sm font-semibold text-gray-700 dark:text-white">Choose Category</div>
                <ul class="max-h-48 overflow-auto space-y-1">
                  <li v-for="(c, idx) in categoriesStore.getCategories" :key="idx">
                    <button @click.prevent="() => selectCategory(c.name)" class="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-sm transition-colors duration-200 text-gray-900 dark:text-white"
                      :class="{ 'bg-green-50 dark:bg-green-900/20 text-green-600': selectedCategory === c.name }">
                      {{ c.name }}
                    </button>
                  </li>
                </ul>
                <div v-if="availableSubcategories().length" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div class="mb-2 text-sm font-semibold text-gray-700 dark:text-white">Choose Subcategory <span class="text-red-500">*</span></div>
                  <select ref="subcategorySelectEl" v-model="selectedSubcategory" @change="onSubcategorySelect" class="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                    <option value="">— select subcategory —</option>
                    <option v-for="(s, i) in availableSubcategories()" :key="i" :value="s">{{ s }}</option>
                  </select>
                  <p v-if="needSubcategory && !selectedSubcategory" class="mt-2 text-xs text-red-500">Subcategory required.</p>
                </div>
              </div>
            </div>

            <!-- Schedule Toggle -->
            <button @click="toggleSchedule" :title="scheduleEnabled ? 'Disable scheduling' : 'Schedule post'" class="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 touch-target group"
              :class="scheduleEnabled ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'">
              <i class="fas fa-clock text-xl group-hover:scale-110 transition-transform duration-200"></i>
            </button>
          </div>

          <!-- Post Button -->
          <button
            @click="submit"
            :disabled="loading || (!postContent.trim() && postMedia.length === 0) || needSubcategory && selectedCategory && !selectedSubcategory"
            class="px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-200 text-base touch-target min-w-[8rem] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:from-gray-300 disabled:to-gray-300 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 disabled:hover:scale-100"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin text-lg"></i>
            <span>{{ loading ? (editPost ? 'Updating...' : 'Posting...') : (editPost ? 'Update' : 'Post') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import PostsService from '@/services/postsService'
import { usePostsStore } from '@/store/posts'
import { useCategoriesStore } from '@/store/categories'
import { onMounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  userAvatar: String,
  userName: String,
  editPost: Object
})

const emit = defineEmits(['close', 'submit', 'posted', 'update:modelValue', 'refresh'])

const postContent = ref('')
const postMedia = ref([])
const tags = ref([])
const tagInput = ref('')
// Control visibility of the tag input separately from its content
const showTagInput = ref(false)
const tagInputEl = ref(null)
const subcategorySelectEl = ref(null)
const loading = ref(false)
const error = ref('')
const uploadProgress = ref(0)
const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()
onMounted(() => { categoriesStore.fetchCategoriesIfNeeded().catch(()=>{}) })

// ---- Media URL Normalization (remove /api before /storage) ----
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const BASE_ORIGIN = API_BASE.replace(/\/api\/?$/, '')
function normalizeMediaUrl(raw) {
  if (!raw) return raw
  if (/^https?:/i.test(raw)) {
    return raw.replace('/api/storage/', '/storage/').replace(/\/api(\/storage\/)/, '$1')
  }
  if (raw.startsWith('/api/storage')) return BASE_ORIGIN + raw.replace('/api/storage', '/storage')
  if (raw.startsWith('/storage/')) return BASE_ORIGIN + raw
  if (raw.startsWith('storage/')) return BASE_ORIGIN + '/' + raw
  if (/^posts\//.test(raw)) return BASE_ORIGIN + '/storage/' + raw
  return raw
}

// Scheduling
const scheduleEnabled = ref(false)
const scheduleAt = ref('')

function toMySqlDateTime(value) {
  try {
    const d = new Date(value)
    if (isNaN(d)) return null
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  } catch (e) { return null }
}

function toggleSchedule() {
  scheduleEnabled.value = !scheduleEnabled.value
  if (!scheduleEnabled.value) scheduleAt.value = ''
}
function clearSchedule() { scheduleAt.value = '' }

// Category picker state
const selectedCategory = ref('')
const selectedSubcategory = ref('')
const showCategoryPicker = ref(false)
const subcategoriesMap = {
  Music: ['Pop', 'Rock', 'Hip-Hop', 'Electronic'],
  Gaming: ['PC', 'Console', 'Mobile', 'Indie'],
  Movies: ['Action', 'Drama', 'Comedy', 'Documentary'],
  'TV Shows': ['Drama', 'Sitcom', 'Reality', 'Anime'],
  Art: ['Painting', 'Digital', 'Illustration', 'Sculpture'],
  // Expanded sports list as requested: football, basket(ball) etc.
  Sports: ['Football', 'Basketball', 'Soccer', 'Tennis', 'Cricket', 'Baseball', 'Rugby', 'Esports']
}
// Temporarily omit numeric subcategory IDs until real list is fetched from backend.
// Backend currently rejects unknown IDs with "The selected subcategory id is invalid." error.
// We'll send only the textual subcategory for now.
const subcategoryIdMap = null
const availableSubcategories = () => subcategoriesMap[selectedCategory.value] || []
// True when current category has subcategories and one must be selected before posting
const needSubcategory = computed(() => !!selectedCategory.value && availableSubcategories().length > 0)

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
    postMedia.value = Array.isArray(newVal.media) ? newVal.media.map(m => {
      if (typeof m === 'string') {
        return { type: /(mp4|webm|ogg)$/i.test(m) ? 'video' : 'image', url: normalizeMediaUrl(m) }
      }
      return { ...m, url: normalizeMediaUrl(m.url || m.path || m.src) }
    }) : []
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

function selectCategory(name) {
  selectedCategory.value = name
  selectedSubcategory.value = ''
  // Keep picker open if subcategories exist so user can immediately choose one
  if (availableSubcategories().length) {
    showCategoryPicker.value = true
    nextTick(() => {
      subcategorySelectEl.value?.focus()
    })
  } else {
    // If no subcategories, we can close picker
    showCategoryPicker.value = false
  }
}

function onSubcategorySelect() {
  // Auto-close picker once subcategory is selected
  if (selectedSubcategory.value) {
    showCategoryPicker.value = false
  }
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

async function submit() {
  if (!postContent.value.trim() && postMedia.value.length === 0) return
  // Enforce subcategory selection when category has subcategories
  if (needSubcategory.value && !selectedSubcategory.value) {
    error.value = 'Please choose a subcategory.'
    return
  }
  loading.value = true
  error.value = ''

  // Build backend-friendly payload
  // Derive a short title from the first line or first 60 chars of content when no explicit title input
  const derivedTitle = (() => {
    const txt = postContent.value || ''
    const firstLine = txt.split('\n')[0].trim()
    if (firstLine) return firstLine.length > 60 ? firstLine.slice(0, 57) + '...' : firstLine
    return 'Untitled post'
  })()

  const payload = {
    title: derivedTitle,
    description: postContent.value,
    // Backend requires content_status; default to 'draft' to avoid validation errors
    content_status: 'draft',
    tags: tags.value || []
  }

  // Attach category info when selected. Only subcategory is essential to user; still include both if available.
  if (selectedCategory.value) payload.category = selectedCategory.value
  if (selectedCategory.value) {
    const categoryId = categoriesStore.categoryIdByName(selectedCategory.value)
    if (categoryId) payload.category_id = categoryId
  }
  if (selectedSubcategory.value) payload.subcategory = selectedSubcategory.value
  // subcategory_id intentionally omitted until validated IDs provided by backend
  if (scheduleEnabled.value && scheduleAt.value) {
    const mysql = toMySqlDateTime(scheduleAt.value)
    if (mysql) payload.schedule_at = mysql
  }

  // Collect file objects (for upload) and existing URLs (if any)
  const files = postMedia.value.filter(m => m.file).map(m => m.file)
  const existingUrls = postMedia.value.filter(m => !m.file).map(m => m.url)
  if (files.length) payload.medias = files // backend expects medias[] for file uploads
  if (existingUrls.length) payload.media_urls = existingUrls

  try {
    let resp
    // Prepare optimistic post to show immediately
    const optimistic = {
      id: `temp-${Date.now()}`,
      content: postContent.value,
      media: postMedia.value.map(m => ({ type: m.type, url: m.url })),
      username: props.userName || 'You',
      avatar: props.userAvatar || '/images/me.png',
      date: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
      uploading: true,
      uploadProgress: 0
    }
    postsStore.addPost(optimistic)

    const config = {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        } else if (progressEvent.total) {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
        // Update optimistic post progress
        try {
          postsStore.updatePost(optimistic.id, { ...optimistic, uploadProgress: uploadProgress.value })
        } catch (e) {}
      }
    }

    if (props.editPost && props.editPost.id) {
      // Prefer originalId if provided, else extract trailing numeric segment.
      let editId = props.editPost.originalId || props.editPost.id
      if (typeof editId === 'string') {
        const tail = editId.split('-').pop()
        if (/^\d+$/.test(tail)) editId = Number(tail)
      }
      if (typeof editId !== 'number' || editId <= 0) {
        error.value = 'Cannot update: invalid post id.'
        loading.value = false
        return
      }
      resp = await PostsService.update(editId, payload, config)
    } else {
      resp = await PostsService.create(payload, config)
    }

    const created = resp.post || resp.data?.post || resp.data || resp
    // Replace optimistic with normalized API post preserving username/avatar
    if (created) {
      const enriched = { ...created }
      // Keep existing author fields if backend doesn't send them
      if (!enriched.author && !enriched.user) {
        enriched.author = { name: props.userName, avatar: props.userAvatar }
      }
      if (typeof postsStore.replaceOptimistic === 'function') {
        postsStore.replaceOptimistic(optimistic.id, enriched)
      } else {
        // Fallback: manual replacement
        const idx = postsStore.posts.findIndex(p => p.id === optimistic.id)
        if (idx !== -1) {
          const media = Array.isArray(enriched.media) ? enriched.media.map(m => {
            if (typeof m === 'string') {
              return { type: /(mp4|webm|ogg)$/i.test(m) ? 'video' : 'image', url: m }
            }
            return { type: m.type || 'image', url: m.url || m.path || m.src }
          }) : []
          postsStore.posts[idx] = {
            ...postsStore.posts[idx],
            id: enriched.id || postsStore.posts[idx].id,
            originalId: enriched.id || postsStore.posts[idx].originalId,
            text: enriched.description || enriched.content || enriched.body || postsStore.posts[idx].text,
            media,
            likes: enriched.likes || enriched.likes_count || 0,
            comments: enriched.comments || enriched.comments_count || 0,
            isLiked: !!(enriched.liked || enriched.is_liked),
            trending: !!enriched.trending,
            uploading: false,
            uploadProgress: 100
          }
          if (postsStore.lastMutation !== undefined) {
            postsStore.lastMutation = Date.now()
          }
        }
      }
    }

  emit('submit', resp)
  emit('posted', resp)
  emit('refresh') // let parent trigger a manual refresh if desired
  // Also broadcast a global event for any listener (e.g., Account page) without prop drilling
  try { window.dispatchEvent(new CustomEvent('posts:created', { detail: { post: created } })) } catch(_) {}

    // Reset form and close
    postContent.value = ''
    postMedia.value = []
    tags.value = []
    tagInput.value = ''
    showTagInput.value = false
    selectedCategory.value = ''
    selectedSubcategory.value = ''
    showCategoryPicker.value = false
  emit('close')
  emit('update:modelValue', false)
  } catch (err) {
    // Mark optimistic post as failed
    error.value = err?.response?.data?.message || err?.message || 'Failed to create post.'
    console.error('CreatePostModal submit error', err)
    try {
      postsStore.updatePost(optimistic.id, { ...optimistic, uploading: false, failed: true })
    } catch (e) {}
  } finally {
    loading.value = false
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
    selectedCategory.value = ''
    selectedSubcategory.value = ''
    showCategoryPicker.value = false
    error.value = ''
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
  min-width: 48px;
  min-height: 48px;
}

/* Responsive spacing utilities */
.pl-16 {
  padding-left: 4rem;
}

@media (max-width: 640px) {
  .pl-16 {
    padding-left: 3rem;
  }
  
  .touch-target {
    min-width: 44px;
    min-height: 44px;
  }
}

/* Animation utilities */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoom-in {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

@keyframes slide-in-from-bottom {
  from { 
    opacity: 0; 
    transform: translateY(0.5rem); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-in {
  animation: fade-in 0.3s ease-out, zoom-in 0.3s ease-out;
}

.fade-in-0 {
  animation: fade-in 0.3s ease-out;
}

.zoom-in-95 {
  animation: zoom-in 0.3s ease-out;
}

.slide-in-from-bottom-2 {
  animation: slide-in-from-bottom 0.2s ease-out;
}

.duration-300 {
  animation-duration: 0.3s;
}

.duration-200 {
  animation-duration: 0.2s;
}

/* Gradient border effect for avatar */
.border-3 {
  border-width: 3px;
}

/* Custom scrollbar for category list */
.overflow-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: rgb(156 163 175 / 0.5);
  border-radius: 2px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: rgb(156 163 175 / 0.8);
}
</style>