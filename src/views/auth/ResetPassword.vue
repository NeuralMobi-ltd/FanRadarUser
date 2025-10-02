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
              <svg class="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">{{ t('auth.resetPassword.title') }}</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ t('auth.resetPassword.subtitle') }}</p>
        </div>
        
        <div class="px-8 pb-10 pt-6">
          <!-- Error message -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-[fadeIn_0.3s_ease]">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="text-red-700 dark:text-red-400 text-sm font-medium">{{ errorMessage }}</span>
            </div>
          </div>

          <!-- Success message -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-[fadeIn_0.3s_ease]">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-green-700 dark:text-green-400 text-sm font-medium">{{ successMessage }}</span>
            </div>
          </div>

          <form @submit.prevent="onResetPassword">
            <div class="space-y-6">
              <div class="space-y-2 animate-[fadeIn_0.55s_ease]">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="password">
                  {{ t('auth.resetPassword.passwordLabel') }}
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
                    :disabled="loading"
                    class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    :placeholder="t('auth.resetPassword.passwordPlaceholder')"
                    minlength="6"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? t('auth.resetPassword.hidePassword') : t('auth.resetPassword.showPassword')"
                    tabindex="-1"
                  >
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div class="space-y-2 animate-[fadeIn_0.65s_ease]">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300" for="confirmPassword">
                  {{ t('auth.resetPassword.confirmPasswordLabel') }}
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    v-model="confirmPassword" 
                    id="confirmPassword" 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    required 
                    :disabled="loading"
                    class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    :placeholder="t('auth.resetPassword.confirmPasswordPlaceholder')"
                    minlength="6"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    @click="showConfirmPassword = !showConfirmPassword"
                    :aria-label="showConfirmPassword ? t('auth.resetPassword.hidePassword') : t('auth.resetPassword.showPassword')"
                    tabindex="-1"
                  >
                    <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-lg" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <!-- Password requirements -->
  <div class="text-sm text-gray-600 dark:text-gray-400 animate-[fadeIn_0.7s_ease]">
    <p class="mb-2 font-medium">{{ t('auth.resetPassword.requirements') }}</p>
    <ul class="list-disc list-inside space-y-1 text-xs">
    <li>{{ t('auth.resetPassword.requirementLength') }}</li>
      <li>{{ t('auth.resetPassword.requirementMatch') }}</li>
    </ul>
        </div>
            </div>
            
            <button 
              type="submit" 
              :disabled="loading || !password || !confirmPassword || password !== confirmPassword"
              class="w-full mt-8 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-600 hover:via-blue-500 hover:to-sky-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              <span v-if="loading" class="mr-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? t('auth.resetPassword.resetting') : t('auth.resetPassword.resetPassword') }}
            </button>
          </form>
          
          <div class="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              {{ t('auth.resetPassword.rememberPassword') }}
              <router-link to="/login" class="text-blue-600 dark:text-sky-400 hover:text-blue-500 dark:hover:text-sky-300 font-semibold ml-1 transition-colors">
                {{ t('auth.resetPassword.signInLink') }}
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Reactive data
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Get props from route query
const email = ref(route.query.email || '')
const otp = ref(route.query.otp || route.query.token || '')

async function onResetPassword() {
  if (!password.value || !confirmPassword.value) {
  errorMessage.value = t('auth.resetPassword.errors.fillAllFields')
    return
  }

  if (password.value !== confirmPassword.value) {
  errorMessage.value = t('auth.resetPassword.errors.passwordsNoMatch')
    return
  }

  if (password.value.length < 6) {
  errorMessage.value = t('auth.resetPassword.errors.passwordTooShort')
    return
  }

  if (!email.value || !otp.value) {
  errorMessage.value = t('auth.resetPassword.errors.invalidResetLink')
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.resetPassword({
      email: email.value,
      otp: otp.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })

    if (result.success) {
      successMessage.value = result.message || t('auth.resetPassword.success')
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      errorMessage.value = result.error || t('auth.resetPassword.errors.resetFailed')
    }
  } catch (error) {
    errorMessage.value = error.message || t('auth.resetPassword.errors.resetFailed')
  } finally {
    loading.value = false
  }
}

// Redirect if no email or token provided
if (!email.value || !otp.value) {
  router.push('/forgot-password')
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
