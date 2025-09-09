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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">Verify Your Account</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Enter the verification code sent to</p>
          <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ maskedEmail }}</p>
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

          <form @submit.prevent="onVerifyOtp">
            <!-- OTP Input Section -->
            <div class="space-y-6">
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Verification Code
                </label>
                <div class="flex justify-center gap-3">
                  <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    :ref="el => otpInputs[index] = el"
                    v-model="otpDigits[index]"
                    type="text"
                    maxlength="1"
                    class="w-12 h-14 text-center text-lg font-bold bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all duration-200"
                    @input="handleOtpInput(index, $event)"
                    @keydown="handleKeyDown(index, $event)"
                    @paste="handlePaste"
                    :disabled="loading"
                  />
                </div>
              </div>

              <!-- Timer -->
              <div v-if="timeLeft > 0" class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Code expires in <span class="font-semibold text-blue-600 dark:text-blue-400">{{ formatTime(timeLeft) }}</span>
                </p>
              </div>

              <!-- Resend Code -->
              <div v-else class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  @click="resendOtp"
                  :disabled="resendLoading"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="resendLoading" class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resending...
                  </span>
                  <span v-else>Resend Code</span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading || !isOtpComplete"
              class="w-full mt-8 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-600 hover:via-blue-500 hover:to-sky-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
            >
              <span v-if="loading" class="mr-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Verifying...' : 'Verify Code' }}
            </button>
          </form>

          <!-- Back to Login -->
          <div class="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              Want to use a different email?
              <button
                @click="goBack"
                class="text-blue-600 dark:text-sky-400 hover:text-blue-500 dark:hover:text-sky-300 font-semibold ml-1 transition-colors"
              >
                Go back
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Reactive data
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const loading = ref(false)
const resendLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const timeLeft = ref(300) // 5 minutes in seconds
const timer = ref(null)

// Props from route query
const email = ref(route.query.email || '')
const verificationType = ref(route.query.type || 'signup') // 'signup', 'login', 'password-reset'

// Computed properties
const maskedEmail = computed(() => {
  if (!email.value) return ''
  const [localPart, domain] = email.value.split('@')
  if (localPart.length <= 2) return email.value
  const masked = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
  return `${masked}@${domain}`
})

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit.length === 1)
})

const otpCode = computed(() => {
  return otpDigits.value.join('')
})

// Methods
function handleOtpInput(index, event) {
  const value = event.target.value
  
  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }
  
  otpDigits.value[index] = value
  
  // Auto-focus next input
  if (value && index < otpDigits.value.length - 1) {
    otpInputs.value[index + 1]?.focus()
  }
}

function handleKeyDown(index, event) {
  // Handle backspace
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
  
  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowRight' && index < otpDigits.value.length - 1) {
    otpInputs.value[index + 1]?.focus()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text')?.replace(/\D/g, '') || ''
  
  if (pastedData.length === 6) {
    for (let i = 0; i < 6; i++) {
      otpDigits.value[i] = pastedData[i] || ''
    }
    // Focus last input
    otpInputs.value[5]?.focus()
  }
}

function startTimer() {
  timeLeft.value = 300 // Reset to 5 minutes
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

async function onVerifyOtp() {
  if (!isOtpComplete.value) {
    errorMessage.value = 'Please enter the complete verification code'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Call the OTP verification API
    const result = await authStore.verifyOtp({
      email: email.value,
      otp_code: otpCode.value,
      type: verificationType.value
    })

    if (result.success) {
      successMessage.value = 'Verification successful!'
      
      // Handle different verification types
      if (verificationType.value === 'signup') {
        // Redirect to choose categories or dashboard
        setTimeout(() => {
          router.push('/choose-categories')
        }, 1500)
      } else if (verificationType.value === 'login') {
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else if (verificationType.value === 'password-reset') {
        // Redirect to reset password form
        setTimeout(() => {
          router.push({ 
            name: 'ResetPassword', 
            query: { 
              email: email.value, 
              token: result.reset_token 
            } 
          })
        }, 1500)
      }
    } else {
      errorMessage.value = result.error || 'Invalid verification code'
    }
  } catch (error) {
    errorMessage.value = error.message || 'Verification failed. Please try again.'
  } finally {
    loading.value = false
  }
}

async function resendOtp() {
  resendLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.resendOtp({
      email: email.value,
      type: verificationType.value
    })

    if (result.success) {
      successMessage.value = 'Verification code sent successfully!'
      startTimer()
      // Clear OTP inputs
      otpDigits.value = ['', '', '', '', '', '']
      otpInputs.value[0]?.focus()
    } else {
      errorMessage.value = result.error || 'Failed to resend code'
    }
  } catch (error) {
    errorMessage.value = error.message || 'Failed to resend code'
  } finally {
    resendLoading.value = false
  }
}

function goBack() {
  if (verificationType.value === 'signup') {
    router.push('/signup')
  } else if (verificationType.value === 'password-reset') {
    router.push('/forgot-password')
  } else {
    router.push('/login')
  }
}

// Lifecycle hooks
onMounted(() => {
  // Redirect if no email provided
  if (!email.value) {
    router.push('/login')
    return
  }
  
  // Start the timer
  startTimer()
  
  // Focus first input
  otpInputs.value[0]?.focus()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom number input styling */
input[type="text"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
