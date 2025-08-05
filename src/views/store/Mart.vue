<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Main Content -->
    <div class="p-6">
        <!-- Hero Banner -->
        <div class="relative bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 mb-8 overflow-hidden">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative z-10 text-white">
            <h1 class="text-4xl font-bold mb-4">{{ heroContent.title }}</h1>
            <p class="text-xl mb-6">{{ heroContent.subtitle }}</p>
            <div class="flex flex-wrap gap-4">
              <span 
                v-for="feature in heroFeatures" 
                :key="feature.text"
                class="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm"
              >
                {{ feature.icon }} {{ feature.text }}
              </span>
            </div>
          </div>
        </div>

        <!-- Product Drops Section -->
        <div class="mb-8">
          <!-- Section Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔥 Hot Drops</h2>
              <p class="text-gray-600 dark:text-gray-400">Limited-time exclusive releases</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400">Don't miss out!</p>
              <p class="text-xs text-gray-400">Updates every {{ Math.floor(DROP_CONFIG.AUTO_ROTATE_INTERVAL / 1000) }}s</p>
            </div>
          </div>

          <!-- Featured Drop -->
          <div class="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 mb-6 overflow-hidden">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div class="relative z-10 text-white">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                    {{ currentDrop.badge }}
                  </span>
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-semibold animate-pulse',
                      getUrgencyStyle(currentDrop.urgencyLevel).bgColor,
                      getUrgencyStyle(currentDrop.urgencyLevel).color
                    ]"
                  >
                    {{ getUrgencyStyle(currentDrop.urgencyLevel).text }}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-sm opacity-90">Ends in</p>
                  <div class="text-2xl font-bold">{{ formatCountdown(currentDrop.endTime) }}</div>
                </div>
              </div>

                <div class="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 class="text-4xl font-bold mb-3">{{ currentDrop.title }}</h3>
                  <p class="text-xl mb-6 opacity-90">{{ currentDrop.subtitle }}</p>
                  
                  <!-- Features -->
                  <div class="grid grid-cols-2 gap-3 mb-6">
                  <div v-for="feature in currentDrop.features" :key="feature" class="flex items-center gap-2">
                    <span class="text-lg">{{ feature.split(' ')[0] }}</span>
                    <span class="text-sm opacity-90">{{ feature.split(' ').slice(1).join(' ') }}</span>
                  </div>
                  </div>

                  <!-- Price and Stock -->
                  <div class="flex items-center gap-6 mb-6">
                  <div>
                    <span class="text-lg line-through opacity-60">${{ currentDrop.originalPrice }}</span>
                    <span class="text-3xl font-bold ml-3">${{ currentDrop.dropPrice }}</span>
                    <span class="bg-green-500 text-white px-2 py-1 rounded-full text-sm ml-3">
                    {{ currentDrop.discount }}% OFF
                    </span>
                  </div>
                  </div>

                  <!-- Stock Bar -->
                  <div class="mb-6">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm opacity-90">Stock Level</span>
                    <span class="text-sm font-semibold">{{ currentDrop.stockLeft }} / {{ currentDrop.totalStock }} left</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-2">
                    <div 
                    class="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${(currentDrop.stockLeft / currentDrop.totalStock) * 100}%` }"
                    ></div>
                  </div>
                  </div>

                  <!-- CTA Button -->
                  <button 
                  @click="viewDrop(currentDrop)"
                  class="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center gap-3"
                  >
                  <i class="fas fa-bolt"></i>
                  Claim This Drop
                  </button>
                </div>

                <!-- Product Image/Preview -->
                <div class="relative">
                  <div class="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div class="aspect-square bg-white/20 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                    src="https://ae01.alicdn.com/kf/S2c27aa2921084b97a9478c28e6c3973ah.jpg_640x640q90.jpg"
                    :alt="currentDrop.title"
                    class="w-full h-full object-contain"
                    />
                  </div>
                  </div>
                </div>
                </div>
            </div>
          </div>

          <!-- Other Drops Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="drop in otherDrops" 
              :key="drop.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <!-- Drop Header -->
              <div class="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center justify-between mb-2">
                  <span class="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full text-xs font-semibold">
                    {{ drop.badge }}
                  </span>
                  <span 
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      getUrgencyStyle(drop.urgencyLevel).bgColor.replace('bg-', 'bg-opacity-20 bg-'),
                      getUrgencyStyle(drop.urgencyLevel).color
                    ]"
                  >
                    {{ getUrgencyStyle(drop.urgencyLevel).text }}
                  </span>
                </div>
                <h4 class="font-bold text-gray-900 dark:text-white">{{ drop.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ drop.subtitle }}</p>
              </div>

              <!-- Drop Content -->
              <div class="p-4">
                <!-- Countdown -->
                <div class="text-center mb-4">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Ends in</p>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">
                    {{ formatCountdown(drop.endTime) }}
                  </div>
                </div>

                <!-- Price -->
                <div class="text-center mb-4">
                  <span class="text-sm text-gray-400 line-through">${{ drop.originalPrice }}</span>
                  <span class="text-xl font-bold text-green-600 dark:text-green-400 ml-2">${{ drop.dropPrice }}</span>
                  <div class="text-xs text-green-600 dark:text-green-400 mt-1">{{ drop.discount }}% OFF</div>
                </div>

                <!-- Stock -->
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Stock</span>
                    <span class="text-xs text-gray-700 dark:text-gray-300">{{ drop.stockLeft }} left</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div 
                      class="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                      :style="{ width: `${(drop.stockLeft / drop.totalStock) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Action Button -->
                <button 
                  @click="viewDrop(drop)"
                  class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  View Drop
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="storeSidebarStore.hasActiveFilters" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Filters</h3>
            <span class="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
              {{ storeSidebarStore.getActiveFilterCount }} applied
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <!-- Category Filter -->
            <span v-if="storeSidebarStore.appliedFilters.category" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              Category: {{ storeSidebarStore.appliedFilters.category }}
              <button @click="storeSidebarStore.clearCategoryFilter()" class="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
            
            <!-- Brand Filters -->
            <span v-for="brand in storeSidebarStore.appliedFilters.brands" :key="brand" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              {{ brand }}
              <button @click="storeSidebarStore.toggleBrand(brand)" class="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
            
            <!-- Price Filter -->
            <span v-if="storeSidebarStore.appliedFilters.priceMin || storeSidebarStore.appliedFilters.priceMax" class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
              ${{ storeSidebarStore.appliedFilters.priceMin || 0 }} - ${{ storeSidebarStore.appliedFilters.priceMax || '∞' }}
              <button @click="storeSidebarStore.clearPriceFilter()" class="hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
            
            <!-- Quick Filters -->
            <span v-for="filter in storeSidebarStore.appliedFilters.quickFilters" :key="filter" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm">
              {{ filter }}
              <button @click="removeQuickFilter(filter)" class="hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
            
            <!-- Search Filter -->
            <span v-if="storeSidebarStore.appliedFilters.search" class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              "{{ storeSidebarStore.appliedFilters.search }}"
              <button @click="storeSidebarStore.clearSearchFilter()" class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5">
                <i class="fas fa-times text-xs"></i>
              </button>
            </span>
          </div>
        </div>

        <!-- Filter and Sort Bar -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-4">
              <!-- Category Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select 
                  v-model="selectedCategory" 
                  class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Price Range Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
                <select 
                  v-model="priceRange" 
                  class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
                >
                  <option v-for="range in MART_PRICE_RANGES" :key="range.value" :value="range.value">{{ range.label }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Brand Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                <select 
                  v-model="selectedBrand" 
                  class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
                >
                  <option value="">All Brands</option>
                  <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- Clear Filters Button -->
              <div class="pt-6">
                <button 
                  v-if="hasActiveFilters"
                  @click="clearAllFilters"
                  class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Clear Filters
                </button>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">Results</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</p>
              </div>
              
              <!-- Sort Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                <select 
                  v-model="sortBy" 
                  class="appearance-none px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors min-w-[150px]"
                >
                  <option v-for="option in MART_SORT_OPTIONS" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <!-- View Toggle -->
              <div class="pt-6">
                <div class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <button
                    @click="viewMode = 'grid'"
                    :class="[
                      'px-3 py-2 text-sm font-medium transition-colors',
                      viewMode === 'grid' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    ]"
                  >
                    <i class="fas fa-th-large"></i>
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    :class="[
                      'px-3 py-2 text-sm font-medium transition-colors',
                      viewMode === 'list' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    ]"
                  >
                    <i class="fas fa-list"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <div class="text-gray-400 text-6xl mb-4">
            <i class="fas fa-shopping-basket"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
          <p class="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more products</p>
        </div>

        <!-- Grid View -->
        <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 group"
          >
            <!-- Product Image -->
            <div class="relative overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3">
                <span 
                  v-if="product.sale"
                  class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ product.sale }}% OFF
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <button 
                  @click="toggleWishlist(product.id)"
                  class="p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                >
                  <i 
                    :class="[
                      'fas fa-heart',
                      product.isWishlisted ? 'text-red-500' : 'text-gray-400'
                    ]"
                  ></i>
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <div class="mb-2">
                <span class="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                  {{ product.category }}
                </span>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {{ product.description }}
              </p>
              
              <!-- Price and Rating -->
              <div class="flex items-center justify-between mb-4">
                <div>
                  <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through mr-2">
                    ${{ product.originalPrice }}
                  </span>
                  <span class="text-lg font-bold text-green-600 dark:text-green-400">
                    ${{ product.price }}
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm text-gray-600 dark:text-gray-300">{{ product.rating }}</span>
                </div>
              </div>

              <!-- Add to Cart Button -->
              <button 
                @click="addToCart(product)"
                class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group"
          >
            <div class="flex">
              <!-- Product Image -->
              <div class="relative w-48 h-48 flex-shrink-0 overflow-hidden">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div class="absolute top-3 left-3">
                  <span 
                    v-if="product.sale"
                    class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ product.sale }}% OFF
                  </span>
                </div>
              </div>

              <!-- Product Info -->
              <div class="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                      {{ product.category }}
                    </span>
                    <button 
                      @click="toggleWishlist(product.id)"
                      class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <i 
                        :class="[
                          'fas fa-heart',
                          product.isWishlisted ? 'text-red-500' : 'text-gray-400'
                        ]"
                      ></i>
                    </button>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {{ product.name }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    {{ product.description }}
                  </p>
                  
                  <!-- Brand and Rating -->
                  <div class="flex items-center gap-4 mb-4">
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Brand: <span class="font-medium">{{ product.brand }}</span>
                    </span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-yellow-400 text-sm"></i>
                      <span class="text-sm text-gray-600 dark:text-gray-300">{{ product.rating }}</span>
                    </div>
                  </div>
                </div>

                <!-- Price and Actions -->
                <div class="flex items-center justify-between">
                  <div>
                    <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through mr-2">
                      ${{ product.originalPrice }}
                    </span>
                    <span class="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${{ product.price }}
                    </span>
                  </div>
                  <button 
                    @click="addToCart(product)"
                    class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-8" v-if="totalPages > 1">
          <div class="flex items-center gap-2">
            <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50">
              Previous
            </button>
            <span v-for="page in totalPages" :key="page" @click="currentPage = page" 
                  :class="['px-3 py-2 border rounded-lg cursor-pointer', currentPage === page ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700']">
              {{ page }}
            </span>
            <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useProductsStore } from '@/store/products'
import { useStoreSidebarStore } from '@/store/storeSidebar'
import { 
  MART_CATEGORIES,
  MART_PRICE_RANGES,
  MART_SORT_OPTIONS,
  MART_CONFIG,
  MART_HERO_FEATURES,
  MART_HERO_CONTENT
} from '@/constants/martConstants'
import { 
  PRODUCT_DROPS,
  DROP_URGENCY_MESSAGES,
  DROP_CONFIG
} from '@/constants/martPageConstants'

// Initialize stores
const productsStore = useProductsStore()
const storeSidebarStore = useStoreSidebarStore()

const selectedCategory = ref(MART_CONFIG.DEFAULT_CATEGORY)
const priceRange = ref(MART_CONFIG.DEFAULT_PRICE_RANGE)
const selectedBrand = ref('')
const sortBy = ref(MART_CONFIG.DEFAULT_SORT)
const currentPage = ref(1)
const viewMode = ref('grid') // 'grid' or 'list'
const itemsPerPage = MART_CONFIG.DEFAULT_ITEMS_PER_PAGE

// Product Drops State
const currentDropIndex = ref(0)
const countdownTimer = ref(null)
const rotationTimer = ref(null)

// Use constants for options
const categories = ref(MART_CATEGORIES)
const heroFeatures = ref(MART_HERO_FEATURES)
const heroContent = ref(MART_HERO_CONTENT)

// Product Drops Computed
const currentDrop = computed(() => PRODUCT_DROPS[currentDropIndex.value])
const otherDrops = computed(() => 
  PRODUCT_DROPS.filter((_, index) => index !== currentDropIndex.value)
)

// Product Drops Methods
const formatCountdown = (endTime) => {
  const now = new Date().getTime()
  const end = new Date(endTime).getTime()
  const difference = end - now

  if (difference <= 0) {
    return 'EXPIRED'
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else {
    return `${minutes}m ${seconds}s`
  }
}

const getUrgencyStyle = (urgencyLevel) => {
  return DROP_URGENCY_MESSAGES[urgencyLevel] || DROP_URGENCY_MESSAGES.low
}

const viewDrop = (drop) => {
  console.log('Viewing drop:', drop.title)
  // TODO: Navigate to drop detail page or open modal
}

const startDropRotation = () => {
  rotationTimer.value = setInterval(() => {
    currentDropIndex.value = (currentDropIndex.value + 1) % PRODUCT_DROPS.length
  }, DROP_CONFIG.AUTO_ROTATE_INTERVAL)
}

const startCountdownUpdate = () => {
  countdownTimer.value = setInterval(() => {
    // Force reactivity update for countdown
  }, DROP_CONFIG.COUNTDOWN_UPDATE_INTERVAL)
}

// Lifecycle
onMounted(() => {
  startDropRotation()
  startCountdownUpdate()
})

onUnmounted(() => {
  if (rotationTimer.value) {
    clearInterval(rotationTimer.value)
  }
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})

// Get available brands from store
const availableBrands = computed(() => {
  const brands = [...new Set(productsStore.products.map(p => p.brand))]
  return brands.sort()
})

// Enhanced filtered products that considers sidebar filters
const filteredProducts = computed(() => {
  let filtered = [...productsStore.products]
  
  // Apply sidebar filters
  const sidebarFilters = storeSidebarStore.appliedFilters
  
  // Category filter from sidebar
  if (sidebarFilters.category && sidebarFilters.category !== 'all') {
    const categoryMap = {
      'apparel': 'Apparel',
      'accessories': 'Accessories',
      'home': 'Home & Living',
      'tech': 'Tech Gadgets',
      'collectibles': 'Collectibles',
      'books': 'Books'
    }
    const mappedCategory = categoryMap[sidebarFilters.category]
    if (mappedCategory) {
      filtered = filtered.filter(p => p.category === mappedCategory)
    }
  }
  
  // Brand filters from sidebar
  if (sidebarFilters.brands.length > 0) {
    filtered = filtered.filter(p => {
      const brandSlug = p.brand.toLowerCase().replace(/\s+/g, '-')
      return sidebarFilters.brands.includes(brandSlug)
    })
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
  
  // Search from sidebar
  if (sidebarFilters.search) {
    const searchTerm = sidebarFilters.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    )
  }
  
  // Quick filters from sidebar
  if (sidebarFilters.quickFilters.length > 0) {
    sidebarFilters.quickFilters.forEach(filter => {
      switch (filter) {
        case 'new':
          filtered = filtered.filter(p => p.isNew)
          break
        case 'sale':
          filtered = filtered.filter(p => p.discount > 0)
          break
        case 'popular':
          filtered = filtered.filter(p => p.rating >= 4.5)
          break
        case 'exclusive':
          filtered = filtered.filter(p => p.category === 'Collectibles')
          break
      }
    })
  }
  
  // Apply local filters (from the filter bar)
  if (selectedCategory.value !== '') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }
  
  if (selectedBrand.value !== '') {
    filtered = filtered.filter(p => p.brand === selectedBrand.value)
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
  return selectedCategory.value !== '' || 
         priceRange.value !== '' || 
         selectedBrand.value !== '' ||
         storeSidebarStore.hasActiveFilters
})

// Clear all filters (including sidebar)
const clearAllFilters = () => {
  selectedCategory.value = MART_CONFIG.DEFAULT_CATEGORY
  priceRange.value = MART_CONFIG.DEFAULT_PRICE_RANGE
  selectedBrand.value = ''
  currentPage.value = 1
  storeSidebarStore.clearAllFilters()
}

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

const toggleWishlist = (productId) => {
  productsStore.toggleWishlist(productId)
}

const addToCart = (product) => {
  console.log('Added to cart:', product.name)
  // TODO: Use cart store when implemented
}

const removeQuickFilter = (filter) => {
  const filters = storeSidebarStore.appliedFilters.quickFilters.filter(f => f !== filter)
  storeSidebarStore.setQuickFilters(filters)
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
</style>