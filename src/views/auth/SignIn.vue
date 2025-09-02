<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-sky-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950">
    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.25),transparent_65%)]"></div>
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
          <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">Welcome Back</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign in to continue your journey</p>
        </div>
        <div class="px-8 pb-10 pt-6">
          <form @submit.prevent="onSignIn">
            <!-- Show error message if any -->
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="text-red-700 dark:text-red-400 text-sm font-medium">{{ errorMessage }}</span>
              </div>
            </div>
            
            <div class="space-y-6">
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
                    id="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    required 
                    class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200" 
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    tabindex="-1"
                  >
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-lg" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="flex justify-end">
                  <router-link to="/forgot-password" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors">
                    Forgot password?
                  </router-link>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-600 hover:via-blue-500 hover:to-sky-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
              :disabled="loading"
            >
              <span v-if="loading" class="mr-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>
          
          <div class="mt-10 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              Don't have an account?
              <router-link to="/signup" class="text-blue-600 dark:text-sky-400 hover:text-blue-500 dark:hover:text-sky-300 font-semibold ml-1 transition-colors">
                Sign up
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
import { useAuthStore } from '@/store/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const errorMessage = ref('')

async function onSignIn() {
  if (!email.value || !password.value) {
    errorMessage.value = t('auth.signIn.errors.missingFields')
    return
  }

  loading.value = true
  errorMessage.value = ''
  
  try {
    const { success, error } = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      router.push('/')
    } else {
      errorMessage.value = error || authStore.error || t('auth.signIn.errors.loginFailed')
    }
  } catch (error) {
    errorMessage.value = error.message || t('auth.signIn.errors.unexpected')
  } finally {
    loading.value = false
  }
}

</script>