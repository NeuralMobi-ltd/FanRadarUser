import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import i18n, { i18n as i18nInstance } from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Sync html lang attribute with current locale on startup
try {
  const locale = i18nInstance.global.locale.value
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale)
  }
} catch (e) {
  // no-op
}

app.mount('#app')