<template>
  <!-- Mobile Menu Overlay -->
  <div
    v-if="showMobileFilters"
    class="fixed inset-0 z-50 lg:hidden"
    @click="showMobileFilters = false"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
  </div>


  <!-- Sidebar -->
  <aside 
    :class=" [
      'bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out z-20',
      // Mobile: Fixed overlay
      'lg:relative lg:translate-x-0',
      showMobileFilters ? 'fixed inset-y-0 left-0 w-80 translate-x-0' : 'fixed inset-y-0 left-0 w-80 -translate-x-full',
      // Desktop: Sticky sidebar
      'lg:w-80 lg:sticky lg:top-0 lg:h-screen'
    ]"
  >
    <!-- Close button for mobile -->
    <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      <button
        @click="showMobileFilters = false"
        class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Filters Content -->
    <div class="p-4 sm:p-6 space-y-6 sm:space-y-8">
  <!-- Subcategory filter only (Categories) -->

      <!-- Categories/Subcategories -->
      <div>
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <template v-if="!selectedParentCategoryId">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <i class="fas fa-th-large text-blue-500 text-sm"></i>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
              </div>
            </template>
            <template v-else>
              <button 
                @click="clearParentCategory" 
                class="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200" 
                title="Back to categories"
              >
                <i class="fas fa-arrow-left text-sm"></i>
              </button>
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <i class="fas fa-layer-group text-green-500 text-sm"></i>
                </div>
                <div class="min-w-0">
                  <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{{ parentCategoryName }}</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Subcategories</p>
                </div>
              </div>
            </template>
          </div>
          <div class="flex items-center gap-2 ml-2">
            <span class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-500 whitespace-nowrap">
              {{ totalProducts }} items
            </span>
          </div>
        </div>

        <!-- Categories list (limit 10 with Show more) -->
        <div v-if="!selectedParentCategoryId" class="space-y-2">
          <!-- All Products item -->
          <button
            @click="applyAll"
            :class="[
              'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group text-left transform hover:scale-[1.02] active:scale-[0.98]',
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700 dark:text-green-300 shadow-md'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent hover:shadow-sm'
            ]"
          >
            <div class="flex items-center gap-3">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-gray-200 group-hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:text-gray-400'
              ]">
                <i class="fas fa-th-large text-sm"></i>
              </div>
              <div>
                <span class="font-semibold text-sm text-gray-900 dark:text-white block">All Products</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">View everything</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white px-2 py-1 rounded-lg text-xs font-medium">
                {{ totalProducts }}
              </span>
              <i class="fas fa-chevron-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
          </button>

          <div class="space-y-2">
            <button
              v-for="(cat, index) in visibleCategories"
              :key="cat.id"
              @click="openCategory(cat.id)"
              :class="[
                'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group text-left transform hover:scale-[1.02] active:scale-[0.98]',
                selectedParentCategoryId === cat.id
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-700 dark:text-blue-300 shadow-md'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent hover:shadow-sm'
              ]"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                  selectedParentCategoryId === cat.id 
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-400'
                ]">
                  <i class="fas fa-folder text-sm"></i>
                </div>
                <div>
                  <span class="font-semibold text-sm text-gray-900 dark:text-white block">{{ cat.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ categoryCounts[cat.id] || 0 }} items</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white px-2 py-1 rounded-lg text-xs font-medium">
                  {{ categoryCounts[cat.id] || 0 }}
                </span>
                <i class="fas fa-chevron-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </button>
          </div>

          <button 
            v-if="categoriesOverflow && visibleCount < categoriesSorted.length" 
            @click="showMoreCats" 
            class="w-full mt-3 py-2 px-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
          >
            <i class="fas fa-chevron-down mr-2"></i>
            {{ `Show ${Math.min(7, categoriesSorted.length - visibleCount)} more` }}
          </button>

          <button 
            v-else-if="categoriesOverflow && visibleCount >= categoriesSorted.length" 
            @click="resetCats" 
            class="w-full mt-3 py-2 px-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
          >
            <i class="fas fa-chevron-up mr-2"></i>
            Show less
          </button>
        </div>

        <!-- Subcategories of selected category -->
        <div v-else class="space-y-2">
          <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Filtering by category</p>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ parentCategoryName }}</p>
          </div>
          
          <div class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            <button
              v-for="(sub, index) in subcategoriesForParent"
              :key="sub.id"
              @click="selectSubcategory(sub.id)"
              :class="[
                'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group text-left transform hover:scale-[1.02] active:scale-[0.98]',
                selectedCategory === String(sub.id)
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-700 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700 dark:text-green-300 shadow-md'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent hover:shadow-sm'
              ]"
              :style="{ animationDelay: `${index * 30}ms` }"
            >
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300',
                  selectedCategory === String(sub.id) 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-green-100 group-hover:to-emerald-100 group-hover:text-green-600 dark:from-gray-700 dark:to-gray-800 dark:text-gray-400'
                ]">
                  <i class="fas fa-tag text-xs"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <span class="font-medium text-sm text-gray-900 dark:text-white block truncate">{{ sub.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ subcategoryCounts[sub.id] || 0 }} products
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 ml-2">
                <span class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white px-2 py-1 rounded-md text-xs font-medium min-w-[2rem] text-center">
                  {{ subcategoryCounts[sub.id] || 0 }}
                </span>
                <i v-if="selectedCategory === String(sub.id)" class="fas fa-check text-xs text-green-500"></i>
                <i v-else class="fas fa-chevron-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </button>
          </div>
          
          <div v-if="subcategoriesForParent.length === 0" class="text-center py-8">
            <div class="text-gray-400 text-2xl mb-2">
              <i class="fas fa-folder-open"></i>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">No subcategories found</p>
          </div>
        </div>
      </div>

      <!-- Price Range -->
      <div>
        <div class="flex items-center gap-2 mb-3 sm:mb-4">
          <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <i class="fas fa-dollar-sign text-yellow-500 text-sm"></i>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Price Range</h3>
        </div>
        <div class="space-y-4">
          <!-- Price Slider Visual -->
          <div class="px-2">
            <div class="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>${{ priceRange.min || 0 }}</span>
              <span>${{ priceRange.max || 500 }}</span>
            </div>
            <div class="relative">
              <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div 
                class="absolute top-0 h-2 bg-green-500 rounded-full"
                :style="{ left: '20%', right: '30%' }"
              ></div>
            </div>
          </div>
          
          <!-- Price Inputs -->
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Min Price</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input 
                  v-model="storeSidebarStore.priceRange.min"
                  type="number" 
                  placeholder="0"
                  class="w-full pl-6 pr-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
            </div>
            <div class="flex-1">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Max Price</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input 
                  v-model="storeSidebarStore.priceRange.max"
                  type="number" 
                  placeholder="500"
                  class="w-full pl-6 pr-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

  <!-- Brands removed per request -->

  <!-- Apply Filters Button (subcategory + price only) -->
      <div class="space-y-3">
        <button 
          @click="applyAllFiltersAndClose"
          class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <i class="fas fa-filter mr-2"></i>
          Apply Filters
        </button>
        
        <button 
          v-if="hasActiveFilters" 
          @click="clearAllFiltersAndClose" 
          class="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl font-medium transition-all duration-200 text-sm transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <i class="fas fa-times mr-2"></i>
          Clear All
        </button>
      </div>

      <!-- Quick Actions -->
      <div class="border-t border-gray-100 dark:border-gray-800 pt-4 sm:pt-6">
        <div class="flex items-center gap-2 mb-3 sm:mb-4">
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <i class="fas fa-bolt text-orange-500 text-sm"></i>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
        </div>
        <div class="space-y-3">
          <router-link 
            to="/cart"
            @click="closeMobileFilters"
            class="flex items-center justify-between w-full p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:shadow-md transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <i class="fas fa-shopping-cart text-white text-sm"></i>
              </div>
              <div>
                <span class="font-semibold text-green-700 dark:text-green-300 text-sm block">View Cart</span>
                <span class="text-xs text-green-600 dark:text-green-400">See your items</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-green-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-bold min-w-[1.5rem] text-center">
                {{ cartItemCount }}
              </span>
              <i class="fas fa-chevron-right text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
          </router-link>

          <router-link 
            to="/favorites"
            @click="closeMobileFilters"
            class="flex items-center justify-between w-full p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 rounded-xl hover:shadow-md transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <i class="fas fa-heart text-white text-sm"></i>
              </div>
              <div>
                <span class="font-semibold text-pink-700 dark:text-pink-300 text-sm block">My Favorites</span>
                <span class="text-xs text-pink-600 dark:text-pink-400">Saved products</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="bg-pink-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-bold min-w-[1.5rem] text-center">
                {{ favoritesCount }}
              </span>
              <i class="fas fa-chevron-right text-xs text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
          </router-link>

          <router-link 
            to="/orders"
            @click="closeMobileFilters"
            class="flex items-center gap-3 w-full p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <i class="fas fa-receipt text-white text-sm"></i>
            </div>
            <div class="flex-1">
              <span class="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white text-sm block transition-colors">My Orders</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Order history</span>
            </div>
            <i class="fas fa-chevron-right text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore } from '@/store/products'
import { useStoreSidebarStore } from '@/store/storeSidebar'
import { useCartStore } from '@/store/cart'
import { fetchCategories, fetchSubcategories } from '@/services/categoriesApi'

// Initialize stores and router
const router = useRouter()
const route = useRoute()
const productsStore = useProductsStore()
const storeSidebarStore = useStoreSidebarStore()
const cartStore = useCartStore()

// Mobile filters state
const showMobileFilters = ref(false)

// Local reactive state
const selectedCategory = ref(route.query.category || 'all') // holds subcategory id or 'all' for applied filter
const selectedParentCategoryId = ref(null) // holds category id when drilling into subs
// Categories pagination: show 7 at a time
const PAGE_SIZE = 7
const visibleCount = ref(PAGE_SIZE)

// Quick filters removed

// Remote-driven category/subcategory data
const apiCategories = ref([])
const apiSubcategoriesByCategory = ref({})

// Count products by subcategory id
const subcategoryCounts = computed(() => {
  const counts = {}
  for (const p of productsStore.products) {
    const id = p.subcategoryId
    if (id !== undefined && id !== null) {
      counts[id] = (counts[id] || 0) + 1
    }
  }
  return counts
})

const totalProducts = computed(() => productsStore.getTotalProducts())
const cartItemCount = computed(() => cartStore.itemCount)
const favoritesCount = computed(() => productsStore.wishlistSet?.size || 0)

// Category counts by id computed directly from products (no subcategory fetch needed)
const categoryCounts = computed(() => {
  const counts = {}
  for (const p of productsStore.products) {
    const catId = p.categoryId ?? p.subcategory?.category_id ?? null
    if (catId !== null && catId !== undefined) {
      counts[catId] = (counts[catId] || 0) + 1
    }
  }
  return counts
})

const categoriesSorted = computed(() => {
  return [...apiCategories.value].sort((a, b) => a.name.localeCompare(b.name))
})

const categoriesOverflow = computed(() => categoriesSorted.value.length > PAGE_SIZE)
const visibleCategories = computed(() => {
  const sorted = categoriesSorted.value.map(cat => ({
    ...cat,
    count: categoryCounts.value[cat.id] || 0
  }))
  return sorted.slice(0, visibleCount.value)
})

const showMoreCats = () => {
  visibleCount.value = Math.min(
    visibleCount.value + PAGE_SIZE,
    categoriesSorted.value.length
  )
}

const resetCats = () => {
  visibleCount.value = PAGE_SIZE
}

const parentCategoryName = computed(() => {
  const c = apiCategories.value.find(c => c.id === selectedParentCategoryId.value)
  return c ? c.name : ''
})

const subcategoriesForParent = computed(() => apiSubcategoriesByCategory.value[selectedParentCategoryId.value] || [])

// Computed for price range
const priceRange = computed(() => storeSidebarStore.priceRange)

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return selectedCategory.value !== 'all' ||
         storeSidebarStore.priceRange.min !== '' ||
         storeSidebarStore.priceRange.max !== ''
})

// Watch for route changes to update selected category
watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = newCategory || 'all'
  // If subcategory present, infer parent category from existing products to avoid fetching all subs
  if (newCategory) {
    const subId = Number(newCategory)
    const sample = productsStore.products.find(p => Number(p.subcategoryId) === subId)
    selectedParentCategoryId.value = sample ? sample.categoryId : null
  }
})

// Methods
// Apply 'All' and clear subcategory filter
const applyAll = () => {
  selectedParentCategoryId.value = null
  selectedCategory.value = 'all'
  const query = { ...route.query }
  delete query.category
  router.push({ query })
  storeSidebarStore.setCategory('')
  storeSidebarStore.clearCategoryFilter()
}

// Drill into a category to show its subcategories
const openCategory = async (categoryId) => {
  selectedParentCategoryId.value = categoryId
  
  // Fetch subcategories for this category if not already loaded
  if (!apiSubcategoriesByCategory.value[categoryId]) {
    try {
      const subcategories = await fetchSubcategories(categoryId)
      apiSubcategoriesByCategory.value[categoryId] = subcategories
    } catch (e) {
      console.warn('Failed to load subcategories for category', categoryId, e)
      apiSubcategoriesByCategory.value[categoryId] = []
    }
  }
}

const clearParentCategory = () => {
  selectedParentCategoryId.value = null
}

// Click on a subcategory applies the filter using its id
const selectSubcategory = (subcategoryId) => {
  const slug = String(subcategoryId)
  selectedCategory.value = slug
  const query = { ...route.query, category: slug }
  router.push({ query })
  storeSidebarStore.setCategory(slug)
  storeSidebarStore.applyFilters()
}

// Quick filter handling removed

const closeMobileFilters = () => {
  showMobileFilters.value = false
}

const applyAllFilters = () => {
  // Apply all filters through the store
  storeSidebarStore.applyFilters()
  
  // Create comprehensive filter object
  const filters = {
    category: selectedCategory.value !== 'all' ? selectedCategory.value : '',
    priceRange: {
      min: storeSidebarStore.priceRange.min ? parseFloat(storeSidebarStore.priceRange.min) : null,
      max: storeSidebarStore.priceRange.max ? parseFloat(storeSidebarStore.priceRange.max) : null
    },
  // Only subcategory + price
  }
  
  console.log('Applied filters:', filters)
  
  // Parent (Mart.vue) reacts to appliedFilters from storeSidebar store
}

const applyAllFiltersAndClose = () => {
  applyAllFilters()
  closeMobileFilters()
}

const clearAllFilters = () => {
  selectedCategory.value = 'all'
  storeSidebarStore.clearAllFilters()
  
  // Clear route query parameters
  router.push({ query: {} })
}

const clearAllFiltersAndClose = () => {
  clearAllFilters()
  closeMobileFilters()
}

const applyPriceFilter = () => applyAllFilters()

// Product drop methods
const viewDrop = (drop) => {
  console.log('Viewing product drop:', drop)
  // Navigate to a dedicated drop page or open a modal
  router.push(`/mart/drop/${drop.id}`)
}

const selectDrop = (drop) => {
  const index = productDrops.value.findIndex(d => d.id === drop.id)
  currentDropIndex.value = index
}

// Load categories and subcategories from API
onMounted(async () => {
  try {
    // Only fetch categories on mount
    const cats = await fetchCategories()
    apiCategories.value = cats

    // If there's a subcategory in the route, infer its parent from existing products
    const q = route.query.category
    if (q) {
      const subId = Number(q)
      const sample = productsStore.products.find(p => Number(p.subcategoryId) === subId)
      selectedParentCategoryId.value = sample ? sample.categoryId : null
      // Subcategories for the selected category will be fetched lazily on first open
    }
  } catch (e) {
    console.warn('Failed to load categories:', e)
    // swallow; sidebar will be minimal
  }
})
</script>

<style scoped>
.sidebar-width {
    width: 270px;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes slide-in {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.drop-item-enter-active {
  animation: slide-in 0.3s ease-out;
}

@keyframes countdown {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.countdown-animation {
  animation: countdown 1s ease-in-out infinite;
}

/* Gradient text animation for "LIVE" badge */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-text {
  background: linear-gradient(-45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

@media (prefers-color-scheme: dark) {
  .custom-scrollbar {
    scrollbar-color: #4a5568 #2d3748;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4a5568;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
}
</style>
