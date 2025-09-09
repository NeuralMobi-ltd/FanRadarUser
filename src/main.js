import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import i18n, { i18n as i18nInstance } from './i18n'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import initImageFallback from '@/utils/imageFallback'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
// Provide a global helper for toasts
app.config.globalProperties.$toast = toast

// Global image fallback for any missing/broken <img>
try {
  initImageFallback('https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg')
} catch (_) { /* ignore */ }

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