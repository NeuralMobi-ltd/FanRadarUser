<template>
  <div class="w-full h-64 relative overflow-hidden rounded-2xl shadow-lg">
    <div v-for="(item, idx) in items" :key="item.id" v-show="idx === current" class="absolute inset-0 transition-opacity duration-700" :class="{ 'opacity-100': idx === current, 'opacity-0': idx !== current }">
      <img :src="item.image" :alt="item.title" class="w-full h-64 object-cover" />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <h2 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h2>
        <p class="text-white text-sm">{{ item.excerpt }}</p>
      </div>
    </div>
    <button @click="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"><i class="fas fa-chevron-left"></i></button>
    <button @click="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"><i class="fas fa-chevron-right"></i></button>
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      <span v-for="(item, idx) in items" :key="item.id" class="w-2 h-2 rounded-full" :class="idx === current ? 'bg-primary' : 'bg-white/50'"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  items: { type: Array, required: true }
})
const current = ref(0)
let interval = null
const next = () => { current.value = (current.value + 1) % props.items.length }
const prev = () => { current.value = (current.value - 1 + props.items.length) % props.items.length }
onMounted(() => {
  interval = setInterval(next, 5000)
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
</style>
