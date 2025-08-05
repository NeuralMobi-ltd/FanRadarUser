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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isVisible: Boolean,
  query: String
})

const emit = defineEmits(['close', 'search'])

const router = useRouter()
const isSearching = ref(false)

// Mock data for popular products (in a real app, this would come from a store)
const popularProducts = ref([
  { id: 1, name: 'Gaming Headset Pro', price: 149.99, category: 'Electronics' },
  { id: 2, name: 'Gaming Headset RGB', price: 89.99, category: 'Electronics' },
  { id: 3, name: 'Anime T-Shirt', price: 24.99, category: 'Clothing' },
  { id: 4, name: 'Gaming Mouse Wireless', price: 79.99, category: 'Electronics' },
  { id: 5, name: 'Collectible Figure', price: 34.99, category: 'Collectibles' }
])

// Mock recent searches (in a real app, this would be stored in localStorage or a store)
const recentSearches = ref([
  'gaming keyboard',
  'anime figures',
  'band merchandise'
])

const searchResults = ref({
  products: [],
  categories: [],
  brands: []
})

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
    searchResults.value = { products: [], categories: [], brands: [] }
    return
  }

  isSearching.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))

  // Mock search results (in a real app, this would be an API call)
  const mockProducts = [
    { id: 1, name: 'Gaming Headset Pro Wireless', price: 149.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop' },
    { id: 2, name: 'Gaming Headset RGB Wired', price: 89.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop' },
    { id: 3, name: 'Professional Gaming Headset', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop' },
    { id: 4, name: 'Gaming Headset Stand RGB', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
    { id: 5, name: 'Gaming Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop' },
    { id: 6, name: 'Wireless Gaming Mouse', price: 79.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop' },
    { id: 7, name: 'Anime Character Figure', price: 34.99, category: 'Collectibles', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop' },
    { id: 8, name: 'Gaming Chair Ergonomic', price: 299.99, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' }
  ]

  const mockCategories = [
    { id: 1, name: 'Gaming Accessories', productCount: 156, icon: 'fas fa-gamepad' },
    { id: 2, name: 'Electronics', productCount: 89, icon: 'fas fa-laptop' },
    { id: 3, name: 'Collectibles', productCount: 234, icon: 'fas fa-trophy' },
    { id: 4, name: 'Home & Living', productCount: 45, icon: 'fas fa-home' }
  ]

  const mockBrands = [
    { id: 1, name: 'Razer', productCount: 45, logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=50&h=50&fit=crop' },
    { id: 2, name: 'Corsair', productCount: 32, logo: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=50&h=50&fit=crop' },
    { id: 3, name: 'SteelSeries', productCount: 28, logo: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=50&h=50&fit=crop' }
  ]

  // Filter results based on query
  const query = props.query.toLowerCase()
  
  searchResults.value = {
    products: mockProducts.filter(p => p.name.toLowerCase().includes(query)),
    categories: mockCategories.filter(c => c.name.toLowerCase().includes(query)),
    brands: mockBrands.filter(b => b.name.toLowerCase().includes(query))
  }

  isSearching.value = false
}

const selectSearch = (term) => {
  // Add to recent searches
  addToRecentSearches(term)
  
  // Navigate to product search results page
  router.push({
    name: 'ProductSearchResults',
    query: { q: term, type: 'products' }
  })
  
  // Close the modal
  closeSearch()
}

const addToRecentSearches = (term) => {
  // Remove if already exists
  const index = recentSearches.value.indexOf(term)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }
  
  // Add to beginning
  recentSearches.value.unshift(term)
  
  // Keep only last 5
  if (recentSearches.value.length > 5) {
    recentSearches.value = recentSearches.value.slice(0, 5)
  }
  
  // In a real app, save to localStorage
  localStorage.setItem('productRecentSearches', JSON.stringify(recentSearches.value))
}

const removeRecentSearch = (term) => {
  const index = recentSearches.value.indexOf(term)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
    localStorage.setItem('productRecentSearches', JSON.stringify(recentSearches.value))
  }
}

const clearRecentSearches = () => {
  recentSearches.value = []
  localStorage.removeItem('productRecentSearches')
}

const closeSearch = () => {
  emit('close')
}

const viewAllResults = () => {
  if (props.query?.trim()) {
    addToRecentSearches(props.query.trim())
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

// Load recent searches from localStorage on mount
const loadRecentSearches = () => {
  const saved = localStorage.getItem('productRecentSearches')
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error loading recent searches:', e)
    }
  }
}

// Perform search when query changes
watch(() => props.query, () => {
  performSearch()
})

// Load recent searches on component mount
loadRecentSearches()
</script>
