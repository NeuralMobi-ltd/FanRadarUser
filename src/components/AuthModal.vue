<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Cute mascot/illustration -->
      <div class="mascot-section"> 
        <div class="mascot">
          <div class="frog">
            <div class="frog-body"></div>
            <div class="frog-eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
          </div>
          <div class="items">
            <div class="letter">📧</div>
            <div class="phone">📱</div>
          </div>
        </div>
      </div>

      <!-- Form section -->
      <div class="form-section">
        <div class="logo">
          <h1>FanRadar</h1>
        </div>
        
        <p class="welcome-text">
          Welcome to the ultimate fan community. Connect, share, and celebrate together.
        </p>
        
        <h2 class="auth-title">
          {{ mode === 'signup' ? 'Sign up' : 'Log in' }}
        </h2>

        <div class="auth-buttons">
          <button class="auth-btn google" @click="handleSocialLogin('google')" v-if="!showEmailForm">
            <i class="fab fa-google"></i>
            Continue with Google
          </button>
          
          <button class="auth-btn apple" @click="handleSocialLogin('apple')" v-if="!showEmailForm">
            <i class="fab fa-apple"></i>
            Continue with Apple
          </button>
          
          <button class="auth-btn email" @click="showEmailForm = true" v-if="!showEmailForm">
            <i class="fas fa-envelope"></i>
            Continue with email
          </button>

          <!-- Email Form -->
          <div v-if="showEmailForm" class="email-form">
            <!-- Step 1: Email and Password -->
            <div v-if="emailStep === 1">
              <div class="form-group">
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="Email"
                  class="email-input"
                />
              </div>
              
              <div class="form-group">
                <input 
                  type="password" 
                  v-model="password" 
                  placeholder="Password"
                  class="email-input"
                />
              </div>
              
              <button 
                class="next-btn" 
                @click="handleEmailPasswordSubmit"
                :disabled="!email || !password"
              >
                {{ mode === 'signup' ? 'Sign up' : 'Log in' }}
                <i class="fas fa-arrow-right"></i>
              </button>
              
              <button class="back-btn" @click="showEmailForm = false">
                <i class="fas fa-arrow-left"></i>
                Back
              </button>
            </div>

            <!-- Step 2: Verification Code -->
            <div v-else-if="emailStep === 2">
              <div class="verification-header">
                <h3>Enter verification code</h3>
                <p>We sent a code to {{ email }}</p>
              </div>
              
              <div class="form-group">
                <input 
                  type="text" 
                  v-model="verificationCode" 
                  placeholder="Enter 6-digit code"
                  class="email-input code-input"
                  maxlength="6"
                  @input="formatVerificationCode"
                />
              </div>
              
              <button 
                class="next-btn" 
                @click="handleCodeSubmit"
                :disabled="verificationCode.length !== 6"
              >
                Verify
                <i class="fas fa-check"></i>
              </button>
              
              <div class="resend-section">
                <button class="resend-btn" @click="resendCode">
                  Didn't receive code? Resend
                </button>
              </div>
            </div>

            <!-- Step 3: Success -->
            <div v-else-if="emailStep === 3" class="success-message">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>{{ mode === 'signup' ? 'Account created!' : 'Welcome back!' }}</h3>
              <p>{{ mode === 'signup' ? 'Your account has been successfully created.' : 'You have been successfully logged in.' }}</p>
              
              <button class="continue-btn" @click="handleSuccess">
                Continue to FanRadar
              </button>
            </div>
          </div>
        </div>

        <div class="footer-links">
          <p class="switch-mode-text" v-if="!showEmailForm || emailStep === 1">
            {{ mode === 'signup' ? 'Already have an account?' : "Don't have an account?" }}
            <a href="#" class="switch-mode-link" @click.prevent="switchMode">
              {{ mode === 'signup' ? 'Log in' : 'Sign up' }}
            </a>
          </p>
        </div>
      </div>

      <!-- Close button -->
      <button class="close-btn" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'signup'
  }
})

const emit = defineEmits(['close', 'success'])

const mode = ref(props.mode)
const showEmailForm = ref(false)
const emailStep = ref(1) // 1: email/password, 2: verification, 3: success
const email = ref('')
const password = ref('')
const verificationCode = ref('')

// Watch for changes in mode prop
watch(() => props.mode, (newMode) => {
  mode.value = newMode
})

const switchMode = () => {
  // Switch between signup and login modes
  mode.value = mode.value === 'signup' ? 'login' : 'signup'
  
  // Reset form state when switching modes
  email.value = ''
  password.value = ''
  showEmailForm.value = false
  emailStep.value = 1
}

const closeModal = () => {
  // Reset form state when closing
  showEmailForm.value = false
  emailStep.value = 1
  email.value = ''
  password.value = ''
  verificationCode.value = ''
  emit('close')
}

const handleSocialLogin = (provider) => {
  console.log(`${mode.value} with ${provider}`)
  // In a real app, you'd initiate OAuth flow with the provider
  
  // For demo purposes, simulate success
  setTimeout(() => {
    emailStep.value = 3
  }, 1000)
}

const handleEmailPasswordSubmit = async () => {
  if (email.value && password.value) {
    try {
      if (mode.value === 'login') {
        // For login, immediately authenticate without verification step
        const auth = useAuthStore()
        const success = await auth.login({ 
          email: email.value, 
          password: password.value 
        })
        
        if (success) {
          emailStep.value = 3 // Go to success screen
        } else {
          // Handle login error
          console.error('Login failed:', auth.error)
        }
      } else {
        // For signup, go to verification step
        // Simulate sending verification email
        emailStep.value = 2
        
        // Simulate API call delay
        setTimeout(() => {
          console.log('Verification code sent to', email.value)
        }, 500)
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }
}

const handleCodeSubmit = async () => {
  if (verificationCode.value.length === 6) {
    try {
      const auth = useAuthStore()
      
      // Only for signup, verify the code through auth store
      if (mode.value === 'signup') {
        // First register the user
        await auth.signup({
          email: email.value,
          password: password.value
        })
        
        // Then verify the code
        const verified = await auth.verifyCode(verificationCode.value)
        
        if (verified) {
          emailStep.value = 3 // Go to success screen
        } else {
          // Handle verification error
          console.error('Verification failed:', auth.error)
        }
      }
    } catch (error) {
      console.error('Verification error:', error)
    }
  }
}

const formatVerificationCode = (event) => {
  // Only allow numbers and limit to 6 digits
  const value = event.target.value.replace(/[^0-9]/g, '').slice(0, 6)
  verificationCode.value = value
}

const resendCode = async () => {
  try {
    const auth = useAuthStore()
    await auth.sendVerificationCode(email.value)
    verificationCode.value = ''
    
    // Show feedback to the user
    console.log('Verification code resent to', email.value)
  } catch (error) {
    console.error('Error resending code:', error)
  }
}

const handleSuccess = () => {
  // Emit success event with user data
  const auth = useAuthStore()
  
  emit('success', { 
    mode: mode.value, 
    email: email.value,
    user: auth.user
  })
  
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: #ffffff;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.mascot-section {
  background: linear-gradient(135deg, #001935 0%, #2c5aa0 100%);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.mascot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frog {
  position: relative;
  width: 80px;
  height: 60px;
}

.frog-body {
  width: 80px;
  height: 60px;
  background: #00cf35;
  border-radius: 40px 40px 30px 30px;
  position: relative;
}

.frog-eyes {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.eye {
  width: 20px;
  height: 20px;
  background: #00cf35;
  border-radius: 50%;
  position: relative;
}

.eye::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
}

.letter, .phone {
  font-size: 24px;
  animation: float 2s ease-in-out infinite;
}

.phone {
  animation-delay: 0.5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.form-section {
  background: #001935;
  padding: 40px;
  text-align: center;
  color: #ffffff;
}

.logo h1 {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #ffffff;
  letter-spacing: -1px;
}

.welcome-text {
  font-size: 16px;
  margin: 0 0 30px 0;
  line-height: 1.4;
  opacity: 0.9;
}

.auth-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 25px 0;
  color: #ffffff;
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.auth-btn {
  background: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #333;
}

.auth-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.auth-btn i {
  font-size: 18px;
}

.auth-btn.google i {
  color: #db4437;
}

.auth-btn.apple i {
  color: #000;
}

.auth-btn.email i {
  color: #00cf35;
}

.footer-links {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.switch-mode-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  margin: 0;
}

.switch-mode-link {
  color: #ffffff;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.switch-mode-link:hover {
  color: #f0f0f0;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.close-btn i {
  font-size: 14px;
}

/* Email Form Styles */
.email-form {
  margin-top: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.email-input {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  outline: none;
  box-sizing: border-box;
}

.email-input::placeholder {
  color: #999;
}

.email-input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.next-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid #ffffff;
  border-radius: 25px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #ffffff;
  margin-bottom: 15px;
}

.next-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #ffffff;
}

.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-message p {
  margin: 0 0 15px 0;
  font-size: 16px;
  line-height: 1.4;
}

.help-text {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
}

.help-link {
  color: #fbbf24;
  text-decoration: underline;
}

.help-link:hover {
  color: #f59e0b;
}

/* Verification Step Styles */
.verification-header {
  text-align: center;
  margin-bottom: 25px;
}

.verification-header h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.verification-header p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  color: #ffffff;
}

.code-input {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4px;
  font-family: monospace;
}

.resend-section {
  text-align: center;
  margin-top: 20px;
}

.resend-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.resend-btn:hover {
  color: #ffffff;
}

/* Success Step Styles */
.success-icon {
  text-align: center;
  margin-bottom: 20px;
}

.success-icon i {
  font-size: 48px;
  color: #10b981;
}

.success-message h3 {
  margin: 0 0 15px 0;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
}

.success-message p {
  text-align: center;
  margin: 0 0 25px 0;
  font-size: 16px;
  opacity: 0.9;
}

.continue-btn {
  width: 100%;
  background: #10b981;
  border: none;
  border-radius: 25px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ffffff;
}

.continue-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}
</style>
