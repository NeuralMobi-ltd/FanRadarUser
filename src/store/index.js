import { reactive, watch } from 'vue'

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
  toggleTheme: () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light'
  },
})