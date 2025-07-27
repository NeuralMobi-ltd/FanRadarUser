<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-950">
    <!-- Auth Layout for Login/Signup pages -->
    <div class="flex min-h-screen">
      <!-- Left Side - Brand/Welcome Section -->
      <div class="hidden md:flex md:w-1/2 bg-primary-600 text-white p-8 flex-col justify-between">
        <div>
          <router-link to="/" class="text-2xl font-bold mb-8 block">tumblr</router-link>
          <h1 class="text-4xl font-bold mb-4">Welcome to Tumblr</h1>
          <p class="text-lg text-primary-100">Join millions of others in sharing your creativity, finding your community, and connecting with passionate people.</p>
        </div>
        <div class="text-sm text-primary-200">
          © 2025 Tumblr Inc.
        </div>
      </div>

      <!-- Right Side - Auth Form Container -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8">
        <main class="w-full max-w-md">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed for this layout component
</script>

<style scoped>
.bg-primary-600 {
  background: linear-gradient(135deg, #00B8FF 0%, #0072FF 100%);
}
</style>
