<template>
  <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
    <div class="flex items-start gap-3">
      <img :src="post.author.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-medium">{{ post.author.name }}</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm">·</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{ post.date }}</span>
        </div>
        
        <p class="mt-2 text-gray-800 dark:text-gray-200">{{ post.content }}</p>
        
        <div class="mt-4 flex gap-2">
          <button 
            @click="$emit('approve', post.id)"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium"
          >
            Approve
          </button>
          <button 
            @click="$emit('reject', post.id)"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object
})

defineEmits(['approve', 'reject'])
</script>