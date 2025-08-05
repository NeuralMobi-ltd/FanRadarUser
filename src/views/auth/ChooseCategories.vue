<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-2 sm:px-6">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl mx-auto">
      <!-- Header with progress indicator -->
      <div class="bg-blue-600 dark:bg-blue-700 px-8 py-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-white">{{ config.title }}</h2>
          <span class="text-blue-200 font-medium">{{ selected.length }}/{{ maxSelections }}</span>
        </div>
        <div class="w-full bg-blue-500 bg-opacity-40 rounded-full h-2">
          <div 
            class="bg-white h-2 rounded-full transition-all duration-300" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
      
      <div class="p-4 sm:p-8">
        <p class="text-gray-600 dark:text-gray-300 mb-6 text-center">
          {{ config.description }}
        </p>
        
        <!-- Category grid with improved visuals -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :class="[
              'px-4 py-3 rounded-xl font-medium border-2 transition-all duration-200 flex items-center justify-center',
              selected.includes(cat)
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 border-blue-300 dark:border-blue-600 scale-[0.98] shadow-inner'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600',
              !selected.includes(cat) && selected.length >= 5 ? 'opacity-50' : ''
            ]"
            @click="toggleCategory(cat)"
            :disabled="!selected.includes(cat) && selected.length >= maxSelections"
          >
            <span>{{ cat }}</span>
            <svg 
              v-if="selected.includes(cat)"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 ml-2 text-blue-600 dark:text-blue-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Continue button with better feedback -->
        <button
          type="submit"
          @click="submitCategories"
          :class="[
            'w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center',
            canContinue 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900'
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          ]"
          :disabled="!canContinue"
        >
          Continue
          <svg 
            v-if="selected.length === 5"
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 ml-2 animate-bounce-horizontal" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <p class="mt-4 text-center text-sm" :class="selected.length === 5 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'">
          <span v-if="selected.length < 5">Select {{ 5 - selected.length }} more to continue</span>
          <span v-else class="font-medium">Great choices! Ready to go</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { 
  USER_INTEREST_CATEGORIES, 
  MAX_CATEGORY_SELECTION, 
  CATEGORY_SELECTION_CONFIG 
} from '@/constants/userCategories'

const router = useRouter()
const authStore = useAuthStore()

// Use categories from constants
const categories = USER_INTEREST_CATEGORIES
const maxSelections = MAX_CATEGORY_SELECTION
const config = CATEGORY_SELECTION_CONFIG

const selected = ref([])

// Computed properties for better reactivity
const remainingSelections = computed(() => maxSelections - selected.value.length)
const canContinue = computed(() => selected.value.length === config.minSelections)
const progressPercentage = computed(() => (selected.value.length / maxSelections) * 100)

function toggleCategory(cat) {
  if (selected.value.includes(cat)) {
    selected.value = selected.value.filter(c => c !== cat) 
  } else if (selected.value.length < maxSelections) {
    selected.value.push(cat)
  }
}

function submitCategories() {
  authStore.user = { username: 'yassel', categories: selected.value }
  authStore.isAuthenticated = true
  router.push('/')
}
</script>

<style>
.animate-bounce-horizontal {
  animation: bounce-horizontal 1.5s infinite;
}

@keyframes bounce-horizontal {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}
</style>