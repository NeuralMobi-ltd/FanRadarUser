<template>
  <div class="w-full bg-[#181c23] rounded-xl shadow border border-gray-700">
    <!-- Post Header -->
    <div class="flex items-center p-4 border-b border-gray-700">
      <img :src="post.avatar || post.authorAvatar" class="w-10 h-10 rounded-full mr-3" />
      <div>
        <div class="font-bold text-white">{{ post.username || post.author }}</div>
        <div class="text-xs text-gray-400">{{ post.date }}</div>
      </div>
      <button class="ml-auto text-gray-400 hover:text-white"><i class="fas fa-ellipsis-h"></i></button>
    </div>

    <!-- Post Content -->
    <div v-if="post.image || post.text" class="p-4">
      <div v-if="post.text" class="px-4 py-3 text-white">{{ post.text }}</div>
      <div v-if="post.image" class="w-full">
        <img :src="post.image" class="w-full rounded-md" />
      </div>
    </div>

    <!-- Post Footer -->
    <div class="flex items-center justify-between px-4 py-2 border-t border-[#232b3e] bg-[#1a1f2a]">
      <div class="flex gap-4">
        <button
          class="flex items-center gap-1 px-2 py-1 rounded-full font-semibold"
          :class="isCommentsOpen ? 'text-blue-500 bg-blue-900' : 'text-gray-400 hover:text-blue-400'"
          @click="$emit('toggle-comments')"
        >
          <i class="fas fa-comment"></i>
          <span>{{ commentsCount }}</span>
        </button>
        <button class="text-gray-400 hover:text-green-400">
          <i class="fas fa-retweet"></i>
        </button>
        <button
          class="flex items-center gap-1"
          :class="{'text-red-500': isLiked, 'text-gray-400': !isLiked}"
          @click="$emit('toggle-like')"
        >
          <i class="fas fa-heart"></i>
          <span>{{ likesCount }}</span>
        </button>
      </div>
    </div>

    <!-- Comments Section -->
    <div v-if="isCommentsOpen" class="bg-[#1a1f2a] px-4 py-6 border-t border-gray-700">
      <div class="flex items-center gap-3 mb-4">
        <img :src="currentUserAvatar" alt="avatar" class="w-8 h-8 rounded-full" />
        <input
          v-model="newComment"
          @keyup.enter="handleAddComment"
          type="text"
          placeholder="Reply as @yassineelaouni"
          class="flex-1 bg-transparent border border-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="handleAddComment"
          class="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
      
      <!-- Comments List -->
      <div v-if="comments?.length" class="space-y-6">
        <div v-for="(comment, idx) in comments" :key="idx" class="flex items-start gap-3">
          <img :src="comment.avatar" alt="avatar" class="w-8 h-8 rounded-full" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-blue-400">@{{ comment.user }}</span>
              <span class="text-xs text-gray-400">{{ comment.date }}</span>
            </div>
            <div class="text-sm text-white">{{ comment.text }}</div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-10">
        <i class="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
        <div class="text-gray-400 mb-2">Be the first to Reply!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

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
  }
})

const emit = defineEmits(['toggle-comments', 'toggle-like', 'add-comment'])
const newComment = ref('')

function handleAddComment() {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value)
    newComment.value = ''
  }
}

function addNewComment() {
  if (newCommentText.value.trim()) {
    emit('add-comment', newCommentText.value)
    newCommentText.value = ''
  }
}
</script>
