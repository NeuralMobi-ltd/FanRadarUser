<template>
  <div class="w-full bg-[#181c23] rounded-xl shadow border border-gray-700 mb-4 overflow-hidden">
    <!-- News Header -->
    <div class="flex items-center p-3 border-b border-gray-700">
      <img :src="news.sourceLogo" class="w-6 h-6 rounded-full mr-2" />
      <div class="flex-1">
        <div class="font-bold text-white text-sm">{{ news.source }}</div>
        <div class="text-xs text-gray-400">{{ formatTimeAgo(news.date) }}</div>
      </div>
      <button class="text-gray-400 hover:text-white">
        <i class="fas fa-bookmark text-sm"></i>
      </button>
    </div>

    <!-- News Content -->
    <div class="p-3">
      <h3 class="text-white font-medium mb-2">{{ news.title }}</h3>
      <p class="text-gray-300 text-sm mb-3">{{ news.summary }}</p>
      <div v-if="news.image" class="w-full rounded-lg overflow-hidden mb-3">
        <img :src="news.image" class="w-full h-auto max-h-60 object-cover" />
      </div>
      
      <!-- News Footer -->
      <div class="flex items-center justify-between text-xs text-gray-400">
        <div class="flex items-center gap-2">
          <span><i class="fas fa-eye"></i> {{ news.views }}</span>
          <span><i class="fas fa-comment"></i> {{ news.comments }}</span>
        </div>
        <button class="text-blue-400 hover:text-blue-300">
          Read Full Story <i class="fas fa-external-link-alt ml-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}
</script>