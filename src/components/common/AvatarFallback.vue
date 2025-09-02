<template>
  <div v-if="!src || src === fallback" :class="[baseClass, customClass]" :style="style">
    <span class="font-bold text-white text-base sm:text-lg select-none">{{ initials }}</span>
  </div>
  <img v-else :src="src" :alt="alt" :class="customClass" :style="style" />
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  src: String,
  alt: { type: String, default: 'User avatar' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fallback: { type: String, default: '/images/me.png' },
  customClass: { type: String, default: 'w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center' },
  style: { type: [String, Object], default: '' }
})
const initials = computed(() => {
  const f = props.firstName?.trim()[0] || ''
  const l = props.lastName?.trim()[0] || ''
  return (f + l).toUpperCase() || 'U'
})
const baseClass = 'w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center'
</script>
