<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-sky-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(14,165,233,0.25),transparent_65%)]"></div>
    <div class="w-full max-w-md relative group">
      <div class="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500/40 via-blue-400/40 to-sky-400/40 opacity-40 blur transition group-hover:opacity-70 dark:opacity-60 dark:group-hover:opacity-90"></div>
      <div class="relative rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.55)] border border-blue-100/60 dark:border-white/5 bg-white/95 supports-[backdrop-filter]:bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl">
        <!-- Logo/Brand Section -->
        <div class="pt-10 px-10 text-center flex flex-col items-center">
          <div class="w-24 h-24 mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-[2px] shadow-[0_10px_28px_-6px_rgba(37,99,235,0.5)] animate-[fadeIn_0.55s_ease] relative after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:[box-shadow:inset_0_1px_2px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(255,255,255,0.4)] dark:after:[box-shadow:inset_0_1px_2px_0_rgba(255,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.08)] after:opacity-90">
            <div class="w-full h-full rounded-2xl bg-white/70 dark:bg-gray-900/40 backdrop-blur-md flex items-center justify-center ring-1 ring-white/60 dark:ring-white/10">
              <img src="/images/F.png" alt="FanRadar Logo" class="w-16 h-16 object-contain" />
            </div>
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">Create Account</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Join the community today</p>
        </div>
        <div class="px-8 pb-10 pt-6">
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
                      class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
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
                      class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              
              
              <div class="space-y-2 animate-[fadeIn_0.55s_ease]">
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
                    class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 animate-[fadeIn_0.6s_ease]">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="birth_date">
                    Birth Date
                  </label>
                  <input
                    v-model="birth_date"
                    id="birth_date"
                    type="date"
                    required
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200"
                  />
                </div>
                
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <div class="flex gap-3 pt-2">
                    <label class="relative flex-1 cursor-pointer">
                      <input type="radio" v-model="gender" value="male" required class="sr-only peer" />
                      <div class="h-12 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200
                                   hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/60
                                   peer-checked:text-blue-700 dark:peer-checked:text-sky-300 peer-checked:border-blue-500
                                   peer-checked:shadow-[0_0_0_2px_rgba(59,130,246,0.25)] dark:peer-checked:shadow-[0_0_0_2px_rgba(59,130,246,0.35)] peer-checked:bg-gradient-to-r peer-checked:from-blue-50 peer-checked:to-sky-50 dark:peer-checked:from-blue-900/40 dark:peer-checked:to-sky-900/40">
                        Male
                      </div>
                    </label>
                    <label class="relative flex-1 cursor-pointer">
                      <input type="radio" v-model="gender" value="female" required class="sr-only peer" />
                      <div class="h-12 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200
                                   hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/60
                                   peer-checked:text-blue-700 dark:peer-checked:text-sky-300 peer-checked:border-blue-500
                                   peer-checked:shadow-[0_0_0_2px_rgba(59,130,246,0.25)] dark:peer-checked:shadow-[0_0_0_2px_rgba(59,130,246,0.35)] peer-checked:bg-gradient-to-r peer-checked:from-blue-50 peer-checked:to-sky-50 dark:peer-checked:from-blue-900/40 dark:peer-checked:to-sky-900/40">
                        Female
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2 animate-[fadeIn_0.65s_ease]">
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
                    class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Create a password"
                  />
                  <button type="button"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    @click="showPassword = !showPassword"
                    tabindex="-1"
                  >
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-lg" aria-hidden="true"></i>
                    <span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-600 hover:via-blue-500 hover:to-sky-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              Create Account
            </button>
          </form>
          
          <div class="mt-10 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?
              <router-link to="/login" class="text-blue-600 dark:text-sky-400 hover:text-blue-500 dark:hover:text-sky-300 font-semibold ml-1 transition-colors">
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
    email: email.value,
    password: password.value,
    birth_date: birth_date.value,
    gender: gender.value
  })
  router.push('/choose-categories')
}

</script>

<style scoped>
/* (Optional space for component-specific styles) */
</style>