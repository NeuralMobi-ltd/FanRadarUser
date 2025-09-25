<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <!-- Header -->
    <header 
      class="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/65 dark:supports-[backdrop-filter]:bg-gray-800/65 px-4 sm:px-6 py-6 transition-all duration-300"
      :class="{ '!py-3 shadow-lg shadow-black/5 dark:shadow-black/40': isShrunk }"
    >
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('fandom.list.title') }}</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              {{ $t('fandom.list.subtitle') }}
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-80">
              <input 
                type="text" 
                v-model="search"
                :placeholder="$t('fandom.list.searchPlaceholder')" 
                class="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl py-3 px-5 pl-12 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500 dark:placeholder-gray-400"
              />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
            </div>
            <button
              class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
              @click="$router.push('/create-fandom')"
            >
              <i class="fas fa-plus"></i>
              <span>{{ $t('common.createFandom') }}</span>
            </button>
          </div>
        </div>

        <!-- Categories Filter -->
        <div class="overflow-x-auto">
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Featured Banner -->
  <div v-if="activeCategory === 'All'" class="mb-12 mt-2 sm:mt-4">
        <div class="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-8 text-white ring-1 ring-white/10 dark:ring-black/20 shadow-xl">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
    <h2 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 flex items-center gap-2"><span class="text-base sm:text-lg">🔥</span> {{ $t('fandom.list.trendingTitle') }}</h2>
    <p class="text-blue-100 text-sm sm:text-base mb-3 sm:mb-4 max-w-xl">{{ $t('fandom.list.trendingSubtitle') }}</p>
              </div>
              <div class="hidden md:block">
                <div class="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-users text-4xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-24">
        <div class="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <!-- Fandoms Grid -->
      <div v-else-if="filteredCommunities.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <FandomCard
            v-for="community in filteredCommunities"
            :key="community.id"
            :community="community"
            button-text="Join Fandom"
          />
        </div>

        <!-- Load More Button -->
        <div class="flex justify-center mt-12">
          <button class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            <i class="fas fa-plus"></i>
            {{ $t('common.loadMoreFandoms') }}
          </button>
        </div>
      </div>

      <!-- Empty state -->
  <div v-else class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-3xl flex items-center justify-center mb-6">
          <i class="fas fa-search text-4xl text-primary-500"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{{ $t('fandom.list.emptyTitle') }}</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
          {{ $t('fandom.list.emptyDescription') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            @click="search = ''; activeCategory = 'All'"
          >
            {{ $t('common.clearFiltersCta') }}
          </button>
          <button
            class="border border-gray-300 dark:border-gray-600 hover:border-primary-500 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-6 py-3 rounded-xl font-medium transition-colors"
            @click="$router.push('/create-fandom')"
          >
            {{ $t('common.createAFandom') }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { FandomCard } from '@/components/fandom'
import { useCategoriesStore } from '@/store/categories'
import { useFandomsStore } from '@/store/fandoms'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

// Initialize stores
const fandomsStore = useFandomsStore()
const categoriesStore = useCategoriesStore()

const search = ref('')
const activeCategory = ref('All')
const loading = ref(false)
const isShrunk = ref(false)

// Scroll listener for shrinking header
const onScroll = () => {
  if (typeof window === 'undefined') return
  isShrunk.value = window.scrollY > 40
}

// Get categories from store
const categories = computed(() => categoriesStore.getCategories)

// Get fandoms from store with filtering
const filteredCommunities = computed(() => {
  let fandoms = fandomsStore.allFandoms || []
  // Filter by category
  if (activeCategory.value && activeCategory.value !== 'All') {
    fandoms = fandoms.filter(f => f.category === activeCategory.value)
  }
  // Filter by search
  if (search.value && search.value.trim() !== '') {
    const q = search.value.trim().toLowerCase()
    fandoms = fandoms.filter(f => f.name.toLowerCase().includes(q) || (f.description && f.description.toLowerCase().includes(q)))
  }
  return fandoms
})

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      fandomsStore.loadFromApi(),
      fandomsStore.loadMyFandoms().catch(()=>{})
    ])
  } finally {
    loading.value = false
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('scroll', onScroll)
})

</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>