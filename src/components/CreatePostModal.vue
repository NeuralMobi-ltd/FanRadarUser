<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @mousedown.self="handleClose">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg mx-4 relative">
      <!-- Header with close button -->
      <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold">Create New Post</h3>
        <button 
          @click="handleClose" 
          type="button"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-4">
        <textarea 
          v-model="postContent"
          placeholder="What's on your mind?"
          class="w-full min-h-[150px] p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
        ></textarea>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          @click="handleClose" 
          type="button"
          class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button 
          @click="submitPost" 
          type="button"
          class="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Simple props and emits
const emit = defineEmits(['close', 'post-created'])

// State
const postContent = ref('')

// Methods - with try/catch to capture any errors
function handleClose(e) {
  // Only close if the click is on the overlay, not inside the modal
  if (!e || e.target === e.currentTarget) {
    emit('close')
  }
}

function submitPost() {
  try {
    if (!postContent.value.trim()) return;
    
    const newPost = {
      id: Date.now(),
      content: postContent.value,
      date: new Date().toISOString(),
    };
    
    emit('post-created', newPost);
    postContent.value = '';
    handleClose();
  } catch (error) {
    console.error("Error in submitPost:", error);
  }
}
</script>