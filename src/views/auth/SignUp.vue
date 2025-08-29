<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-1">Join us today</p>
      </div>

      <!-- Main Card -->
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
        <div class="p-8">
          <form @submit.prevent="onSignUp">
            <div class="grid grid-cols-1 gap-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="first_name">
                    First Name
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input 
                      v-model="first_name" 
                      id="first_name" 
                      type="text" 
                      required 
                      class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                      placeholder="First name"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="last_name">
                    Last Name
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input 
                      v-model="last_name" 
                      id="last_name" 
                      type="text" 
                      required 
                      class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="username">
                  Username
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input 
                    v-model="username" 
                    id="username" 
                    type="text" 
                    class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Choose a username (optional)"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="email">
                  Email Address
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input 
                    v-model="email" 
                    id="email" 
                    type="email" 
                    required 
                    class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="birth_date">
                    Birth Date
                  </label>
                  <input
                    v-model="birth_date"
                    id="birth_date"
                    type="date"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white transition-all duration-200"
                  />
                </div>
                
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <div class="flex gap-3 pt-2">
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="gender" value="male" required class="form-radio text-indigo-600 focus:ring-indigo-500" />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Male</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="gender" value="female" required class="form-radio text-indigo-600 focus:ring-indigo-500" />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Female</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="password">
                  Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'"
                    id="password" 
                    required 
                    class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Create a password"
                  />
                  <button type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    @click="showPassword = !showPassword"
                    tabindex="-1"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.415 1.415M14.12 14.12L18.75 18.75m-4.63-4.63A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 013.95-5.593" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>
          
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p class="text-center text-gray-600 dark:text-gray-400">
              Already have an account?
              <router-link to="/login" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold ml-1 transition-colors">
                Sign in
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '@/store/registration'

const registrationStore = useRegistrationStore()

const router = useRouter()
const first_name = ref('')
const last_name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const birth_date = ref('')
const gender = ref('')
const showPassword = ref(false)

function onSignUp() {
  // Store basic info (no API call yet)
  registrationStore.setBasicInfo({
    first_name: first_name.value,
    last_name: last_name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    birth_date: birth_date.value,
    gender: gender.value
  })
  router.push('/choose-categories')
}

</script>