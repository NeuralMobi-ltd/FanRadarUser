<template>
  <aside class="sidebar-width bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
    <div class="p-6">
      <!-- Categories -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
        <nav class="space-y-2">
          <router-link 
            v-for="category in categories"
            :key="category.name"
            :to="category.path"
            :class=" [
              'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
              $route.path === category.path || $route.query.category === category.slug
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <i :class="category.icon" class="w-5 h-5"></i>
            <span class="font-medium">{{ category.name }}</span>
            <span v-if="category.count" class="ml-auto text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
              {{ category.count }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Brands -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Brands</h3>
        <div class="space-y-3">
          <label v-for="brand in brands" :key="brand.name" class="flex items-center">
            <input 
              type="checkbox" 
              :value="brand.slug"
              v-model="selectedBrands"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span class="ml-3 text-gray-700 dark:text-gray-300">{{ brand.name }}</span>
            <span class="ml-auto text-xs text-gray-500">{{ brand.products }}</span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Range</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <input 
              v-model="priceRange.min"
              type="number" 
              placeholder="Min"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500">-</span>
            <input 
              v-model="priceRange.max"
              type="number" 
              placeholder="Max"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button 
            @click="applyPriceFilter"
            class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-3">
        <router-link 
          to="/cart"
          class="flex items-center justify-between w-full px-4 py-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            <span class="font-medium">View Cart</span>
          </div>
          <span class="bg-green-600 text-white text-xs px-2 py-1 rounded-full">3</span>
        </router-link>

        <router-link 
          to="/orders"
          class="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="font-medium">My Orders</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const selectedBrands = ref([])
const priceRange = ref({
  min: '',
  max: ''
})

const categories = ref([
  {
    name: 'All Products',
    path: '/mart',
    slug: 'all',
    icon: 'fas fa-th-large',
    count: '1.2k'
  },
  {
    name: 'Apparel',
    path: '/mart?category=apparel',
    slug: 'apparel',
    icon: 'fas fa-tshirt',
    count: '450'
  },
  {
    name: 'Accessories',
    path: '/mart?category=accessories',
    slug: 'accessories', 
    icon: 'fas fa-gem',
    count: '320'
  },
  {
    name: 'Home & Living',
    path: '/mart?category=home',
    slug: 'home',
    icon: 'fas fa-home',
    count: '280'
  },
  {
    name: 'Tech Gadgets',
    path: '/mart?category=tech',
    slug: 'tech',
    icon: 'fas fa-laptop',
    count: '150'
  },
  {
    name: 'Collectibles',
    path: '/mart?category=collectibles',
    slug: 'collectibles',
    icon: 'fas fa-trophy',
    count: '180'
  },
  {
    name: 'Books',
    path: '/mart?category=books',
    slug: 'books',
    icon: 'fas fa-book',
    count: '90'
  }
])

const brands = ref([
  { name: 'FanRadar Official', slug: 'fanradar', products: '245' },
  { name: 'Anime Collective', slug: 'anime-collective', products: '180' },
  { name: 'Marvel Store', slug: 'marvel', products: '220' },
  { name: 'Gaming Gear', slug: 'gaming-gear', products: '160' },
  { name: 'K-Pop Merch', slug: 'kpop', products: '195' },
  { name: 'Studio Ghibli', slug: 'studio-ghibli', products: '85' },
  { name: 'Warner Bros', slug: 'warner-bros', products: '120' }
])

const applyPriceFilter = () => {
  // Handle price filtering logic
  console.log('Applying price filter:', priceRange.value)
}
</script>

<style scoped>
.sidebar-width {
    width: 270px;
}
</style>
