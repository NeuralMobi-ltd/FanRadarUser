<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
    <button 
      @click="$emit('close')"
      class="absolute top-4 right-4 text-white p-2 z-10"
    >
      &times;
    </button>
    
    <div class="relative w-full h-full flex items-center justify-center">
      <button 
        @click="prevMedia"
        class="absolute left-4 text-white p-2 bg-black/50 rounded-full z-10"
        :disabled="currentIndex === 0"
      >
        &larr;
      </button>
      
      <div class="max-w-4xl w-full h-full flex items-center justify-center">
        <img 
          v-if="currentMedia.type === 'image'"
          :src="currentMedia.url"
          class="max-h-screen max-w-full object-contain"
        />
        <video
          v-else-if="currentMedia.type === 'video'"
          :src="currentMedia.url"
          controls
          autoplay
          class="max-h-screen max-w-full"
        />
      </div>
      
      <button 
        @click="nextMedia"
        class="absolute right-4 text-white p-2 bg-black/50 rounded-full z-10"
        :disabled="currentIndex === media.length - 1"
      >
        &rarr;
      </button>
    </div>
    
    <div class="absolute bottom-4 left-0 right-0 flex justify-center">
      <div class="flex space-x-2">
        <button 
          v-for="(item, index) in media"
          :key="index"
          @click="currentIndex = index"
          class="w-2 h-2 rounded-full"
          :class="{
            'bg-white': currentIndex === index,
            'bg-white/50': currentIndex !== index
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  media: {
    type: Array,
    required: true
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)

const currentMedia = computed(() => props.media[currentIndex.value])

function nextMedia() {
  if (currentIndex.value < props.media.length - 1) {
    currentIndex.value++
  }
}

function prevMedia() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>