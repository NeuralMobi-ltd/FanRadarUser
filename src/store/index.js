import { reactive, watch, computed } from 'vue'

const state = reactive({
  theme: localStorage.getItem('theme') || 'light', // Load theme from localStorage
})

// Apply theme to document on initialization and changes
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme)
}

// Apply initial theme
applyTheme(state.theme)

// Watch for theme changes
watch(() => state.theme, applyTheme)

export const useThemeStore = () => ({
  state,
  isDark: computed(() => state.theme === 'dark'),
  toggleTheme: () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  },
})

// Export store names for easy importing
export { useAuthStore } from './auth'
export { usePostsStore } from './posts'
export { useUsersStore } from './users'
export { useFandomsStore } from './fandoms'
export { useCartStore } from './cart'
export { useSearchStore } from './search'
export { useNewsStore } from './news'
export { useTrendsStore } from './trends'
export { useProductsStore } from './products'