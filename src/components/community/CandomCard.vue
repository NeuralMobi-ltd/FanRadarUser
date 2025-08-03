<template>
  <div 
    class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg"
    @click="handleClick"
  >
    <!-- Cover Image -->
    <div class="relative h-32">
      <img 
        :src="fandom.coverImage || fandom.image" 
        :alt="fandom.name || fandom.title" 
        class="w-full h-full object-cover"
      />
      
      <!-- User Ownership/Role Badge -->
      <div v-if="userRole" class="absolute top-3 left-3">
        <div v-if="userRole === 'admin'" class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <i class="fas fa-crown"></i>
          <span>My Fandom</span>
        </div>
        <div v-else-if="userRole === 'member'" class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <i class="fas fa-check"></i>
          <span>Joined</span>
        </div>
      </div>
      
      <!-- Fandom Avatar/Logo positioned at bottom right -->
      <div class="absolute bottom-0 right-0 m-3">
        <img 
          :src="fandom.logo || fandom.avatar || fandom.image" 
          :alt="fandom.name || fandom.title" 
          class="w-16 h-16 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg" 
        />
      </div>
    </div>

    <!-- Fandom Info -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-bold text-xl text-gray-900 dark:text-white">
          {{ fandom.name || fandom.title }}
        </h3>
        <!-- User indicator icon -->
        <div v-if="userRole" class="flex items-center">
          <i v-if="userRole === 'admin'" class="fas fa-crown text-yellow-500 text-lg" title="You're the admin"></i>
          <i v-else-if="userRole === 'member'" class="fas fa-heart text-red-500 text-lg" title="You're a member"></i>
        </div>
      </div>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {{ fandom.description }}
      </p>

      <!-- Stats -->
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ fandom.members || fandom.memberCount }} members
        </span>
        <button 
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            userRole === 'admin' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
            userRole === 'member' ? 'bg-green-500 hover:bg-green-600 text-white' :
            'bg-blue-600 hover:bg-blue-700 text-white'
          ]"
        >
          {{ getButtonText() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFandomsStore } from '@/store/fandoms'

const props = defineProps({
  fandom: {
    type: Object,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Join'
  }
})

const emit = defineEmits(['click'])
const router = useRouter()
const fandomsStore = useFandomsStore()

// Get the fandom handle/name for checking user role
const fandomHandle = computed(() => {
  return (props.fandom.name || props.fandom.title)
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
})

// Check user role in this fandom
const userRole = computed(() => {
  return fandomsStore.getUserRole(fandomHandle.value)
})

// Get appropriate button text based on user role
const getButtonText = () => {
  if (userRole.value === 'admin') return 'Manage'
  if (userRole.value === 'member') return 'Joined'
  return props.buttonText
}

const handleClick = () => {
  if (fandomHandle.value) {
    router.push(`/fandom/${fandomHandle.value}`)
  }
  emit('click', props.fandom)
}
</script>

// ...existing styles...
