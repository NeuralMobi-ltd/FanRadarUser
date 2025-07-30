<template>
  <div class="w-full bg-[#181c23] rounded-xl shadow border border-gray-700 mb-4 transition-all hover:border-gray-600">
    <!-- Post Header -->
    <div class="flex items-center p-3 border-b border-gray-700">
      <img :src="post.avatar" class="w-8 h-8 rounded-full mr-2" />
      <div class="flex-1 min-w-0">
        <div class="font-bold text-white text-sm truncate">{{ post.username }}</div>
        <div class="text-xs text-gray-400">{{ formatDate(post.date) }}</div>
      </div>
      <div class="relative">
        <button 
          class="ml-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          @click="showPostMenu = !showPostMenu"
        >
          <i class="fas fa-ellipsis-h text-sm"></i>
        </button>
        
        <!-- Post Menu Dropdown (Admin Only) -->
        <div 
          v-if="showPostMenu && isAdmin"
          class="absolute right-0 z-10 mt-1 w-40 bg-[#232b3e] rounded-md shadow-lg border border-gray-700"
        >
          <div class="py-1">
            <button
              @click="editPost"
              class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <i class="fas fa-pencil-alt mr-2"></i> Edit
            </button>
            <button
              @click="deletePost"
              class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
              <i class="fas fa-trash-alt mr-2"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <div class="p-3">
      <div v-if="!isEditing" class="text-white text-sm mb-3">{{ post.text }}</div>
      
      <!-- Edit Post Form -->
      <div v-if="isEditing" class="mb-3">
        <textarea
          v-model="editText"
          class="w-full bg-[#232b3e] border border-gray-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <div class="flex justify-end gap-2 mt-2">
          <button
            @click="cancelEdit"
            class="px-3 py-1 text-sm text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            @click="saveEdit"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Save
          </button>
        </div>
      </div>
      
      <div v-if="post.image" class="w-full rounded-lg overflow-hidden">
        <img :src="post.image" class="w-full h-auto max-h-96 object-cover" />
      </div>
      
      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-1 mt-3">
        <span v-for="(tag, idx) in post.tags" :key="idx" class="text-xs text-blue-400 hover:text-blue-300">
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Post Stats -->
    <div class="px-3 py-1 text-xs text-gray-400 border-t border-gray-700">
      {{ likesCount }} likes · {{ commentsCount }} comments
    </div>

    <!-- Post Actions -->
    <div class="flex items-center justify-between px-1 py-1 border-t border-gray-700 bg-[#1a1f2a]">
      <button
        class="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-800"
        @click="$emit('toggle-comments')"
      >
        <i class="far fa-comment" :class="{'text-blue-500': isCommentsOpen}"></i>
        <span :class="{'text-blue-500': isCommentsOpen}">Comment</span>
      </button>
      <button class="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-800">
        <i class="fas fa-retweet"></i>
        <span>Share</span>
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-800"
        @click="$emit('toggle-like')"
      >
        <i class="far fa-heart" :class="{'text-red-500': isLiked}"></i>
        <span :class="{'text-red-500': isLiked}">Like</span>
      </button>
    </div>

    <!-- Comments Section -->
    <div v-if="isCommentsOpen" class="bg-[#1a1f2a] px-3 py-3 border-t border-gray-700">
      <div class="flex items-center gap-2 mb-3">
        <img :src="currentUserAvatar" class="w-8 h-8 rounded-full" />
        <input
          v-model="newComment"
          @keyup.enter="handleAddComment"
          type="text"
          placeholder="Write a comment..."
          class="flex-1 bg-[#232b3e] border-none rounded-full px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <!-- Comments List -->
      <div v-if="comments?.length" class="space-y-3">
        <div v-for="(comment, idx) in comments" :key="idx" class="flex items-start gap-2">
          <img :src="comment.avatar" class="w-6 h-6 rounded-full mt-1" />
          <div class="flex-1 bg-[#232b3e] rounded-lg p-2">
            <div class="flex items-center gap-1">
              <span class="font-semibold text-blue-400 text-xs">@{{ comment.user }}</span>
              <span class="text-gray-400 text-xs">{{ comment.date }}</span>
            </div>
            <div class="text-sm text-white mt-1">{{ comment.text }}</div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-400 text-sm">
        No comments yet. Be the first to comment!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  isCommentsOpen: {
    type: Boolean,
    default: false
  },
  comments: {
    type: Array,
    default: () => []
  },
  likesCount: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  currentUserAvatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-comments', 'toggle-like', 'add-comment', 'edit-post', 'delete-post'])

const showPostMenu = ref(false)
const isEditing = ref(false)
const editText = ref('')
const newComment = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const handleAddComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value)
    newComment.value = ''
  }
}

const editPost = () => {
  editText.value = props.post.text
  isEditing.value = true
  showPostMenu.value = false
}

const saveEdit = () => {
  emit('edit-post', editText.value)
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

const deletePost = () => {
  if (confirm('Are you sure you want to delete this post?')) {
    emit('delete-post')
  }
  showPostMenu.value = false
}
</script>