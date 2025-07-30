<template>
  <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
    <div class="flex items-start gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div class="font-medium">{{ item.type }} reported</div>
          <span class="text-sm text-red-500">{{ item.reports }} reports</span>
        </div>
        
        <div class="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
          <div v-if="item.type === 'Post'">
            <p class="text-gray-800 dark:text-gray-200">{{ item.content.text }}</p>
            <img 
              v-if="item.content.image"
              :src="item.content.image"
              class="mt-2 rounded-lg max-w-full max-h-48 object-contain"
              alt="Reported image"
            />
          </div>
          <div v-else-if="item.type === 'Comment'">
            <p class="text-gray-800 dark:text-gray-200">{{ item.content.text }}</p>
          </div>
        </div>
        
        <div class="mt-3">
          <p class="text-sm font-medium">Reason:</p>
          <p class="text-sm text-gray-700 dark:text-gray-300">{{ item.reason }}</p>
        </div>
        
        <div class="mt-4 flex gap-2">
          <button 
            @click="$emit('resolve', item.id)"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium"
          >
            Mark as Resolved
          </button>
          <button 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})

defineEmits(['resolve'])
</script>