<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
    <h1 class="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">404</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ $t ? $t('errors.notFound.title') : 'Page not found' }}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">{{ $t ? $t('errors.notFound.message') : 'The page you are looking for might have been removed or had its name changed.' }}</p>
    <router-link to="/" class="inline-flex items-center px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow">
      {{ $t ? $t('common.goHome') : 'Go Home' }}
    </router-link>
  </div>
</template>
<script setup>
</script>
