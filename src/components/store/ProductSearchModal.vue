<template>
  <!-- Product Search Dropdown positioned below search input -->
  <div 
    v-if="isVisible" 
    class="absolute top-full left-0 right-0 z-50 mt-2"
  >
    <!-- Search dropdown -->
    <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96">
      <!-- Trending searches and results -->
      <div class="overflow-y-auto max-h-96">
        <!-- Show recent searches or search results based on query -->
        <div v-if="!query">
          <!-- Recent searches section -->
          <div v-if="recentSearches.length > 0" class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent Product Searches</h3>
              <button 
                @click="clearRecentSearches"
                class="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
              >
                Clear all
              </button>
            </div>
            
            <!-- Recent search items -->
            <div class="mt-2 space-y-1">
              <div
                v-for="search in recentSearches"
                :key="search"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div 
                  @click="selectSearch(search)"
                  class="flex items-center space-x-3 flex-1 cursor-pointer"
                >
                  <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-gray-500 dark:text-gray-400 text-sm"></i>
                  </div>
                  <span class="text-gray-900 dark:text-white text-sm">{{ search }}</span>
                </div>
                <button 
                  @click.stop="removeRecentSearch(search)"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Popular Products section -->
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Popular Products</h3>
          </div>
          
          <!-- Popular product items -->
          <div class="px-2">
            <div
              v-for="product in popularProducts"
              :key="product.id"
              @click="selectSearch(product.name)"
              class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <i class="fas fa-star text-green-500"></i>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${{ product.price }} • {{ product.category }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search results when query exists -->
        <div v-else>
          <!-- Loading -->
          <div v-if="isSearching" class="p-4 text-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Searching products...</p>
          </div>

          <!-- Results -->
          <div v-else class="p-4">
            <!-- Quick results preview -->
            <div v-if="hasResults" class="space-y-4">
              <!-- Products -->
              <div v-if="searchResults.products.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-shopping-bag mr-2 text-green-500"></i>
                  Products
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="product in searchResults.products.slice(0, 3)"
                    :key="product.id"
                    @click="goToProduct(product)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img :src="product.image" :alt="product.name" class="w-10 h-10 rounded-lg object-cover" />
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(product.name)"></p>
                      <div class="flex items-center justify-between">
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ product.category }}</p>
                        <p class="text-sm font-medium text-green-600 dark:text-green-400">${{ product.price }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Categories -->
              <div v-if="searchResults.categories.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-tags mr-2 text-blue-500"></i>
                  Categories
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="category in searchResults.categories.slice(0, 2)"
                    :key="category.id"
                    @click="goToCategory(category)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <i :class="category.icon" class="text-blue-500 text-sm"></i>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(category.name)"></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ category.productCount }} products</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Brands -->
              <div v-if="searchResults.brands.length > 0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <i class="fas fa-copyright mr-2 text-purple-500"></i>
                  Brands
                </h4>
                <div class="space-y-1">
                  <div
                    v-for="brand in searchResults.brands.slice(0, 2)"
                    :key="brand.id"
                    @click="goToBrand(brand)"
                    class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <img :src="brand.logo" :alt="brand.name" class="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white" v-html="highlightSearchTerm(brand.name)"></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ brand.productCount }} products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- See all results button -->
            <div v-if="hasResults" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="viewAllResults"
                class="w-full py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              >
                See all product results for "{{ query }}"
              </button>
            </div>

            <!-- No results -->
            <div v-if="!hasResults && !isSearching" class="text-center py-4">
              <i class="fas fa-search text-xl text-gray-300 dark:text-gray-600 mb-2"></i>
              <p class="text-sm text-gray-500 dark:text-gray-400">No products found for "{{ query }}"</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching for different keywords</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { POPULAR_PRODUCTS, MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from '@/constants/productSearchConstants'
import { useProductSearchStore } from '@/store/productSearch'

const props = defineProps({
  isVisible: Boolean,
  query: String
})

const emit = defineEmits(['close', 'search'])
const router = useRouter()
const productSearchStore = useProductSearchStore()

const popularProducts = computed(() => POPULAR_PRODUCTS)
const recentSearches = computed(() => productSearchStore.recentSearches)
const searchResults = computed(() => productSearchStore.searchResults)
const isSearching = computed(() => productSearchStore.isSearching)

const hasResults = computed(() =>
  searchResults.value.products.length > 0 ||
  searchResults.value.categories.length > 0 ||
  searchResults.value.brands.length > 0
)

const highlightSearchTerm = (text) => {
  if (!props.query || !text) return text
  const regex = new RegExp(`(${props.query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
}

const performSearch = async () => {
  if (!props.query?.trim()) {
    productSearchStore.setSearchResults({ products: [], categories: [], brands: [] })
    return
  }
  productSearchStore.setIsSearching(true)
  await new Promise(resolve => setTimeout(resolve, 400))
  const query = props.query.toLowerCase()
  productSearchStore.setSearchResults({
    products: MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query)),
    categories: MOCK_CATEGORIES.filter(c => c.name.toLowerCase().includes(query)),
    brands: MOCK_BRANDS.filter(b => b.name.toLowerCase().includes(query))
  })
  productSearchStore.setIsSearching(false)
}

const selectSearch = (term) => {
  productSearchStore.addRecentSearch(term)
  router.push({
    name: 'ProductSearchResults',
    query: { q: term, type: 'products' }
  })
  closeSearch()
}

const removeRecentSearch = (term) => {
  productSearchStore.removeRecentSearch(term)
}

const clearRecentSearches = () => {
  productSearchStore.clearRecentSearches()
}

const closeSearch = () => {
  emit('close')
}

const viewAllResults = () => {
  if (props.query?.trim()) {
    productSearchStore.addRecentSearch(props.query.trim())
    router.push({
      name: 'ProductSearchResults',
      query: { q: props.query.trim(), type: 'products' }
    })
    closeSearch()
  }
}

const goToProduct = (product) => {
  router.push(`/mart/product/${product.id}`)
  closeSearch()
}

const goToCategory = (category) => {
  router.push(`/mart/category/${category.id}`)
  closeSearch()
}

const goToBrand = (brand) => {
  router.push(`/mart/brand/${brand.id}`)
  closeSearch()
}

watch(() => props.query, () => {
  performSearch()
})

productSearchStore.loadRecentSearches()
</script>
