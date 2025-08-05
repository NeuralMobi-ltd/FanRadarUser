<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Browse Communities</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">Discover and join fandoms, clubs, and interest groups!</p>
    <!-- Example: List of communities/fandoms -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="community in communities" :key="community.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ community.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ community.description }}</p>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Join</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const communities = ref([
  { id: 1, name: 'Anime Fans', description: 'Discuss your favorite anime series and movies.' },
  { id: 2, name: 'Gaming Legends', description: 'Share tips, news, and highlights from the gaming world.' },
  { id: 3, name: 'K-Pop Stans', description: 'Connect with fellow K-Pop enthusiasts.' },
  { id: 4, name: 'Marvel Universe', description: 'Talk about Marvel comics, movies, and theories.' },
  { id: 5, name: 'Football Club', description: 'All things football: matches, players, and more.' }
])
</script>
