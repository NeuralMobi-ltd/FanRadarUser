<template>
  <!-- ...existing code... -->
  <router-link to="/cart" class="relative">
    <button class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2">
      <i class="fas fa-shopping-cart"></i>
      <span class="text-sm font-medium">Cart</span>
      <span v-if="cartItemsCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {{ cartItemsCount }}
      </span>
    </button>
  </router-link>
  <!-- ...existing code... -->
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const cartItemsCount = computed(() => cartStore.items.length)
</script>