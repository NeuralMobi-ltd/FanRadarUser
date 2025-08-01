<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div class="p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
          <p class="text-gray-600 dark:text-gray-300 mt-2">Sign in to your FanRadar account</p>
        </div>
        
        <!-- Google Sign In Button -->
        <button 
          @click="signInWithGoogle"
          class="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors mb-6"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 21.99 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.72 16.7 5.84 14.1H2.18V16.94C4 20.53 7.7 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.1C5.62 13.43 5.5 12.72 5.5 12C5.5 11.28 5.62 10.57 5.84 9.9V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.1Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 4 3.47 2.18 7.06L5.84 9.9C6.72 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        
        <div class="flex items-center mb-6">
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span class="mx-4 text-gray-500 dark:text-gray-400">or</span>
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        
        <form @submit.prevent="onSignIn">
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" for="email">Email</label>
            <input 
              v-model="email" 
              id="email" 
              type="email" 
              required 
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white" 
              placeholder="Enter your email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" for="password">Password</label>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              required 
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white" 
              placeholder="••••••••"
            />
            <router-link to="/forgot-password" class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline float-right mt-2">Forgot password?</router-link>
          </div>
          <button 
            type="submit" 
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        
        <p class="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?
          <router-link to="/signup" class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

function onSignIn() {
  // Mock sign-in logic
  authStore.user = { email: email.value }
  // Use a mutation/method to set authenticated state
  if (typeof authStore.setAuthenticated === 'function') {
    authStore.setAuthenticated(true)
  } else if ('_isAuthenticated' in authStore) {
    authStore._isAuthenticated = true
  }
  router.push('/dashboard')
}

function signInWithGoogle() {
  // Google auth logic
  console.log('Signing in with Google')
}
</script>