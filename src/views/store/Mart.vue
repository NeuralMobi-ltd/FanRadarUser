<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 md:pb-0">
    <!-- Main Content -->
    <div class="p-4 sm:p-5 md:p-6">
        <!-- Hero Banner -->
        <div class="relative bg-gradient-to-r from-green-600 to-green-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 overflow-hidden">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10 text-white">
            <h1 class="text-4xl font-bold mb-4">{{ heroContent.title }}</h1>
            <p class="text-xl mb-6">{{ heroContent.subtitle }}</p>
            <div class="flex flex-wrap gap-4">
            </div>
          </div>
        </div>

        <!-- Product Drops Section -->
        <div class="mb-6 sm:mb-8">
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Featured Drops</h2>
            <div class="flex items-center gap-3 text-sm">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <i class="far fa-clock"></i>
                <span>Next ends in: {{ countdownText }}</span>
              </span>
              <button class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                View all
              </button>
            </div>
          </div>

          <!-- Featured Drop -->
          <div class="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-5 sm:mb-6 overflow-hidden">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div class="relative z-10 text-white" v-if="currentDrop">
              <div class="flex flex-col lg:flex-row items-center gap-8">
                <!-- Left content -->
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-2 py-1 text-xs rounded-full bg-white/20 font-semibold tracking-wide">{{ currentDrop.badge }}</span>
                    <span 
                      class="px-2 py-1 text-xs rounded-full font-semibold"
                      :class="[getUrgencyStyle(currentDrop.urgencyLevel).bgColor, 'text-gray-900']"
                    >
                      {{ getUrgencyStyle(currentDrop.urgencyLevel).text }}
                    </span>
                  </div>
                  <h3 class="text-3xl md:text-4xl font-extrabold leading-tight mb-2">{{ currentDrop.title }}</h3>
                  <p class="text-white/90 text-lg mb-5">{{ currentDrop.subtitle }}</p>

                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    <li v-for="f in currentDrop.features" :key="f" class="flex items-center gap-2 text-white/90">
                      <i class="fas fa-check-circle text-green-300"></i>
                      <span>{{ f }}</span>
                    </li>
                  </ul>

                  <div class="flex flex-wrap items-center gap-4 mb-4">
                    <div class="text-4xl font-extrabold">${{ currentDrop.dropPrice }}</div>
                    <div class="text-white/70 line-through text-xl">${{ currentDrop.originalPrice }}</div>
                    <span class="px-2 py-1 bg-red-600 rounded-full text-white text-sm font-semibold">-{{ currentDrop.discount }}%</span>
                  </div>

                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-56 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div class="h-full bg-emerald-400" :style="{ width: soldPercent(currentDrop) + '%' }"></div>
                    </div>
                    <div class="text-sm text-white/90">{{ currentDrop.totalStock - currentDrop.stockLeft }} sold • {{ currentDrop.stockLeft }} left</div>
                  </div>

                  <div class="flex items-center gap-2 mb-6">
                    <i class="far fa-clock"></i>
                    <span class="font-semibold tracking-wide">{{ countdownText }}</span>
                  </div>

                  <div class="flex flex-wrap gap-3">
                    <button @click="viewDrop(currentDrop)" class="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 font-medium">Shop drop</button>
                    <button @click="viewDrop(currentDrop)" class="px-4 py-2 rounded-lg border border-white/40 hover:bg-white/10 font-medium">Details</button>
                  </div>
                </div>

                <!-- Right image -->
                <div class="flex-1 w-full">
                  <img :src="currentDrop.image" :alt="currentDrop.title" class="rounded-lg sm:rounded-xl w-full max-h-56 sm:max-h-80 object-cover ring-1 sm:ring-2 ring-white/30 shadow-xl" />
                </div>
              </div>
            </div>
          </div>

          <!-- Other Drops Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div 
              v-for="drop in otherDrops"
              :key="drop.id"
              class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
            >
              <div class="relative">
                <img :src="drop.image" :alt="drop.title" class="w-full h-36 sm:h-44 object-cover" />
                <div class="absolute top-2 left-2 flex gap-2">
                  <span class="px-2 py-0.5 text-[11px] rounded-full bg-black/60 text-white">{{ drop.badge }}</span>
                  <span :class="[getUrgencyStyle(drop.urgencyLevel).bgColor, 'text-gray-900 px-2 py-0.5 text-[11px] rounded-full font-semibold']">
                    {{ getUrgencyStyle(drop.urgencyLevel).text }}
                  </span>
                </div>
                <div class="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                  <i class="far fa-clock mr-1"></i>{{ formatCountdown(drop.endTime, nowTime) }}
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ drop.title }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ drop.subtitle }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">${{ drop.dropPrice }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ drop.originalPrice }}</span>
                  <span class="px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">-{{ drop.discount }}%</span>
                </div>
                <div class="mt-3">
                  <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" :style="{ width: soldPercent(drop) + '%' }"></div>
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{{ drop.totalStock - drop.stockLeft }} sold</span>
                    <span>{{ drop.stockLeft }} left</span>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="text-xs text-gray-600 dark:text-gray-300">
                    <i class="fas fa-tag mr-1 text-green-500"></i>{{ drop.category }}
                  </div>
                  <button @click="viewDrop(drop)" class="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="storeSidebarStore.hasActiveFilters" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Filters</h3>
            <span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              {{ storeSidebarStore.getActiveFilterCount }} applied
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <!-- Subcategory Filter -->
            <span v-if="storeSidebarStore.appliedFilters.category" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              <i class="fas fa-layer-group"></i>
              <span>Subcategory: {{ subcategoryName(storeSidebarStore.appliedFilters.category) }}</span>
              <button class="ml-1 hover:text-blue-900 dark:hover:text-blue-200" @click="storeSidebarStore.clearCategoryFilter()">✕</button>
            </span>
            
            <!-- Price Filter -->
            <span v-if="storeSidebarStore.appliedFilters.priceMin || storeSidebarStore.appliedFilters.priceMax" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              <i class="fas fa-dollar-sign"></i>
              <span>
                Price: 
                {{ storeSidebarStore.appliedFilters.priceMin ?? 0 }} - 
                {{ storeSidebarStore.appliedFilters.priceMax ?? '∞' }}
              </span>
              <button class="ml-1 hover:text-green-900 dark:hover:text-green-200" @click="storeSidebarStore.clearPriceFilter()">✕</button>
            </span>
            <!-- No brand/quick/search chips -->
          </div>
        </div>

        <!-- Filter and Sort Bar -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <!-- Search and Brand removed; keep Price only -->
              <select v-model="priceRange" class="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option v-for="r in martStore.priceRanges" :key="r.value" :value="r.value">{{ r.label }}</option>
              </select>
            </div>
            
            <div class="flex items-center gap-3 sm:gap-4">
              <!-- Sort -->
              <select v-model="sortBy" class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white">
                <option v-for="s in martStore.sortOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>

              <!-- View toggle -->
              <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button :class="['px-3 py-1.5 rounded-md text-sm', viewMode==='grid' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300']" @click="viewMode='grid'">
                  <i class="fas fa-th-large"></i>
                </button>
                <button :class="['px-3 py-1.5 rounded-md text-sm', viewMode==='list' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300']" @click="viewMode='list'">
                  <i class="fas fa-list"></i>
                </button>
              </div>

              <!-- Clear -->
              <button v-if="hasActiveFilters" @click="clearAllFilters" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                Clear
              </button>

              <span class="text-sm text-gray-500 dark:text-gray-400">{{ filteredProducts.length }} results</span>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="i in 8" :key="i" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
            <div class="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div class="p-4 space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div class="flex justify-between items-center">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
          <div class="text-gray-400 text-6xl mb-4 animate-bounce">
            <i class="fas fa-shopping-basket"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters to see more products</p>
          <button @click="clearAllFilters" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
            <i class="fas fa-refresh mr-2"></i>Clear Filters
          </button>
        </div>

        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer transform"
            @click="viewProduct(product)"
          >
            <!-- Product Image -->
            <div class="relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-3 left-3 flex gap-2">
                <span v-if="product.isNew" class="px-2 py-1 text-xs bg-green-600 text-white rounded-full animate-pulse">New</span>
                <span v-if="product.discount" class="px-2 py-1 text-xs bg-red-600 text-white rounded-full">-{{ product.discount }}%</span>
              </div>
              <!-- Wishlist Button Overlay -->
              <button 
                @click.stop="toggleWishlist(product.id)" 
                :disabled="wishlistProcessing.has(product.id)"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <i v-if="wishlistProcessing.has(product.id)" class="fas fa-spinner fa-spin text-gray-500"></i>
                <i v-else :class="['fas fa-heart transition-all duration-200', product.isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500']"></i>
              </button>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <h3 class="text-gray-900 dark:text-white font-semibold mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ product.category }}</p>
              
              <!-- Price and Rating Row -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ product.originalPrice }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="text-yellow-400 text-sm">
                    <i class="fas fa-star" v-for="i in Math.round(product.rating)" :key="i"></i>
                    <i class="far fa-star" v-for="i in (5 - Math.round(product.rating))" :key="i + 5"></i>
                  </div>
                  <span class="text-xs text-gray-500 ml-1">({{ product.reviews || 0 }})</span>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button 
                  @click.stop="openRate(product)" 
                  class="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-yellow-400 group/rate"
                >
                  <i class="fas fa-star text-yellow-400 mr-1 group-hover/rate:animate-pulse"></i> Rate
                </button>
                <button 
                  @click.stop="addToCart(product)" 
                  class="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group cursor-pointer"
            @click="viewProduct(product)"
          >
            <div class="flex">
              <div class="relative w-40 h-40 flex-shrink-0">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute top-2 left-2 flex flex-col gap-1">
                  <span v-if="product.isNew" class="px-2 py-1 text-xs bg-green-600 text-white rounded-full animate-pulse">New</span>
                  <span v-if="product.discount" class="px-2 py-1 text-xs bg-red-600 text-white rounded-full">-{{ product.discount }}%</span>
                </div>
                <!-- Wishlist Button -->
                <button 
                  @click.stop="toggleWishlist(product.id)" 
                  :disabled="wishlistProcessing.has(product.id)"
                  class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <i v-if="wishlistProcessing.has(product.id)" class="fas fa-spinner fa-spin text-gray-500"></i>
                  <i v-else :class="['fas fa-heart transition-all duration-200', product.isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500']"></i>
                </button>
              </div>
              
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-gray-900 dark:text-white font-semibold mb-2 group-hover:text-green-600 transition-colors">{{ product.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.brand }} • {{ product.category }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{{ product.description }}</p>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex flex-col gap-2">
                    <div class="flex items-baseline gap-2">
                      <span class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price }}</span>
                      <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-400 line-through">${{ product.originalPrice }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="text-yellow-400 text-sm">
                        <i class="fas fa-star" v-for="i in Math.round(product.rating)" :key="i"></i>
                        <i class="far fa-star" v-for="i in (5 - Math.round(product.rating))" :key="i + 5"></i>
                      </div>
                      <span class="text-xs text-gray-500">({{ product.reviews || 0 }})</span>
                    </div>
                  </div>
                  
                  <div class="flex gap-2">
                    <button 
                      @click.stop="openRate(product)" 
                      class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:border-yellow-400 group/rate"
                    >
                      <i class="fas fa-star text-yellow-400 mr-1 group-hover/rate:animate-pulse"></i> Rate
                    </button>
                    <button 
                      @click.stop="addToCart(product)" 
                      class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      <i class="fas fa-cart-plus mr-1"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom padding for mobile nav -->
        <div class="h-14 md:h-0"></div>

        <!-- Pagination (if needed) -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8 mb-6">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <i class="fas fa-chevron-left mr-1"></i> Previous
          </button>
          
          <div class="flex gap-1">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                page === currentPage 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Next <i class="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
    </div>
    <!-- Rate modal with backdrop blur -->
    <Transition name="modal">
      <RateProductModal 
        v-if="ratingModalOpen"
        :open="ratingModalOpen" 
        :initialValue="ratingTarget?.initialValue || 0" 
        @close="ratingModalOpen=false" 
        @submit="submitRating" 
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/store/products'
import { useStoreSidebarStore } from '@/store/storeSidebar'
import { useMartStore } from '@/store/mart'
import { useCartStore } from '@/store/cart'
import notify from '@/utils/notify'
import RateProductModal from '@/components/common/RateProductModal.vue'
// No category/subcategory prefetching here to avoid extra network calls

// Initialize stores
const productsStore = useProductsStore()
const storeSidebarStore = useStoreSidebarStore()
const martStore = useMartStore()
const cartStore = useCartStore()

// Subcategory-based selection (id)
const selectedCategory = ref('')
// No preloaded categories/subcategories here; sidebar lazily handles those
const priceRange = ref(martStore.config.DEFAULT_PRICE_RANGE)
const selectedBrand = ref('')
const sortBy = ref(martStore.config.DEFAULT_SORT)
const currentPage = ref(1)
const viewMode = ref('grid') // 'grid' or 'list'
const itemsPerPage = martStore.config.DEFAULT_ITEMS_PER_PAGE
const loading = ref(false)
const wishlistProcessing = ref(new Set())
const ratingModalOpen = ref(false)
const ratingTarget = ref(null) // { id, initialValue }

// Product Drops State
const currentDropIndex = ref(0)
const countdownTimer = ref(null)
const rotationTimer = ref(null)
const nowTime = ref(Date.now())

// Use locally loaded categories/subcategories for mapping subcategory names
const heroFeatures = computed(() => martStore.heroFeatures)
const heroContent = computed(() => martStore.heroContent)

// Product Drops Computed
const currentDrop = computed(() => martStore.productDrops[currentDropIndex.value])
const otherDrops = computed(() => martStore.productDrops.filter((_, index) => index !== currentDropIndex.value))
const countdownText = computed(() => currentDrop.value ? formatCountdown(currentDrop.value.endTime, nowTime.value) : '')

// Product Drops Methods
const formatCountdown = (endTime, nowMs) => {
  const now = nowMs || new Date().getTime()
  const end = new Date(endTime).getTime()
  const difference = end - now
  if (difference <= 0) return 'EXPIRED'
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  return `${minutes}m ${seconds}s`
}

const getUrgencyStyle = (urgencyLevel) => {
  return martStore.dropUrgencyMessages[urgencyLevel] || martStore.dropUrgencyMessages.low
}

const soldPercent = (drop) => {
  if (!drop?.totalStock) return 0
  return Math.min(100, Math.round(((drop.totalStock - drop.stockLeft) / drop.totalStock) * 100))
}

const viewDrop = (drop) => {
  console.log('Viewing drop:', drop.title)
}

const startDropRotation = () => {
  rotationTimer.value = setInterval(() => {
    currentDropIndex.value = (currentDropIndex.value + 1) % martStore.productDrops.length
  }, martStore.dropConfig.AUTO_ROTATE_INTERVAL)
}

const startCountdownUpdate = () => {
  countdownTimer.value = setInterval(() => {
    nowTime.value = Date.now()
  }, martStore.dropConfig.COUNTDOWN_UPDATE_INTERVAL)
}

// Lifecycle
onMounted(async () => {
  // Load products from backend and hydrate wishlist state
  try {
    loading.value = true
    await productsStore.loadProducts({ page: 1, limit: 48 })
  } finally {
    loading.value = false
  }
  startDropRotation()
  startCountdownUpdate()
})

onUnmounted(() => {
  if (rotationTimer.value) clearInterval(rotationTimer.value)
  if (countdownTimer.value) clearInterval(countdownTimer.value)
})

// Brands not used

// Enhanced filtered products that considers sidebar filters
const filteredProducts = computed(() => {
  let filtered = [...productsStore.products]
  
  // Apply sidebar filters (subcategory by id + price range only)
  const sidebarFilters = storeSidebarStore.appliedFilters
  
  // Subcategory id filter from sidebar
  if (sidebarFilters.category && sidebarFilters.category !== 'all') {
    const subId = Number(sidebarFilters.category)
    if (!Number.isNaN(subId)) {
      filtered = filtered.filter(p => Number(p.subcategoryId) === subId)
    }
  }
  
  // Price range from sidebar
  if (sidebarFilters.priceMin !== null || sidebarFilters.priceMax !== null) {
    filtered = filtered.filter(p => {
      const price = p.price
      const min = sidebarFilters.priceMin || 0
      const max = sidebarFilters.priceMax || Infinity
      return price >= min && price <= max
    })
  }
  
  // No quick filters
  
  // Apply local filters (from the filter bar)
  if (selectedCategory.value) {
    const subId = Number(selectedCategory.value)
    if (!Number.isNaN(subId)) filtered = filtered.filter(p => Number(p.subcategoryId) === subId)
  }
  
  if (priceRange.value !== '') {
    const [min, max] = priceRange.value.split('-').map(v => v === '+' ? Infinity : parseInt(v))
    filtered = filtered.filter(p => p.price >= min && (max === Infinity || p.price <= max))
  }
  
  // Apply sorting
  return productsStore.sortMartProducts(filtered, sortBy.value)
})

// Check if any filters are active (including sidebar filters)
const hasActiveFilters = computed(() => {
  return Boolean(selectedCategory.value) || priceRange.value !== '' || storeSidebarStore.hasActiveFilters
})

// Clear all filters (including sidebar)
const clearAllFilters = () => {
  selectedCategory.value = martStore.config.DEFAULT_CATEGORY
  priceRange.value = martStore.config.DEFAULT_PRICE_RANGE
  currentPage.value = 1
  storeSidebarStore.clearAllFilters()
}

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const toggleWishlist = async (productId) => {
  if (wishlistProcessing.value.has(productId)) return
  wishlistProcessing.value.add(productId)
  try {
    await productsStore.toggleWishlist(productId)
  } finally {
    wishlistProcessing.value.delete(productId)
  }
}

function openRate(product) {
  ratingTarget.value = { id: product.id, initialValue: Math.round(product.rating || 0) }
  ratingModalOpen.value = true
}

async function submitRating({ evaluation, commentaire }) {
  if (!ratingTarget.value) return
  const { id } = ratingTarget.value
  const res = await productsStore.rateProduct(id, evaluation, commentaire)
  if (res && res.success) {
    notify.success('Rating saved')
  } else {
    notify.error(res?.error || 'Failed to save rating')
  }
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category
  })
  notify.success(`${product.name} added to cart!`, {
    autoClose: 3000
  })
}

const viewProduct = (product) => {
  // Navigate to product detail page
  console.log('Viewing product:', product.name)
  // router.push(`/product/${product.id}`)
}

// Pagination helpers
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 2 // Show 2 pages before and after current
  
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  const range = []
  const start = Math.max(1, current - delta)
  const end = Math.min(total, current + delta)
  
  if (start > 1) {
    range.push(1)
    if (start > 2) range.push('...')
  }
  
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  
  if (end < total) {
    if (end < total - 1) range.push('...')
    range.push(total)
  }
  
  return range.filter(page => page !== '...' || range.length > 5)
})

// Resolve subcategory id to name using already-loaded product data (no extra API calls)
const subcategoryName = (id) => {
  const subId = Number(id)
  const match = productsStore.products.find(p => Number(p.subcategoryId) === subId && p.subcategoryName)
  return match?.subcategoryName || id
}

// Watch for changes in filtered products to reset pagination
watch(filteredProducts, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Hover animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Pulse animation for new badges */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Loading skeleton animation */
@keyframes skeleton {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.animate-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: skeleton 1.5s infinite linear;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #374151;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #6b7280;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
}

/* Focus styles for accessibility */
button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Product card hover effects */
.group:hover .group-hover\:animate-pulse {
  animation: pulse 1s infinite;
}
</style>