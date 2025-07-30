<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
    <div class="flex items-start gap-3">
      <img :src="poll.createdBy.avatar" class="w-10 h-10 rounded-full" alt="User avatar" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-medium">{{ poll.createdBy.name }}</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm">·</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm">Created a poll</span>
          <button 
            v-if="isAdmin"
            @click="$emit('delete-poll', poll.id)"
            class="ml-auto text-red-500 hover:text-red-600"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
        
        <h3 class="mt-2 text-lg font-medium">{{ poll.question }}</h3>
        
        <div class="mt-4 space-y-3">
          <div 
            v-for="(option, index) in poll.options"
            :key="index"
            class="relative"
          >
            <button
              @click="!option.voted && $emit('vote', poll.id, index)"
              class="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              :class="{ 
                'bg-blue-100 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900': option.voted,
                'cursor-default': option.voted
              }"
            >
              <div class="flex justify-between items-center">
                <span>{{ option.text }}</span>
                <span v-if="poll.totalVotes > 0" class="text-sm font-medium">
                  {{ Math.round((option.votes / poll.totalVotes) * 100) }}%
                </span>
              </div>
              <div 
                v-if="poll.totalVotes > 0"
                class="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-lg"
                :style="{ width: `${(option.votes / poll.totalVotes) * 100}%` }"
              ></div>
            </button>
          </div>
        </div>
        
        <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {{ poll.totalVotes }} votes · Ends {{ poll.endDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  poll: Object,
  isAdmin: Boolean
})

defineEmits(['vote', 'delete-poll'])
</script>