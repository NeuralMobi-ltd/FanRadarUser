import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import i18n, { i18n as i18nInstance } from './i18n'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
// Provide a global helper for toasts
app.config.globalProperties.$toast = toast

// Sync html lang attribute with current locale on startup
try {
  const locale = i18nInstance.global.locale.value
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale)
  }
} catch (e) {
  // no-op
}

// Initialize auth store (restores session from cookie/localStorage)
try {
  const { useAuthStore } = require('@/store/auth')
  const auth = useAuthStore()
  auth.initialize?.()
} catch (_) { /* ignore */ }

app.mount('#app')