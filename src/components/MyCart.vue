<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <div class="max-w-5xl mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold mb-8 text-center">My Cart</h1>
      
      <!-- Cart Items -->
      <div v-if="cartItems.length" class="space-y-4">
        <div v-for="item in cartItems" :key="item.id" 
          class="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between shadow-md">
          <div class="flex items-center gap-4">
            <img :src="item.image" :alt="item.title" class="w-20 h-20 object-cover rounded-md"/>
            <div>
              <h3 class="font-bold text-lg">{{ item.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400">{{ item.category }}</p>
              <p class="font-bold text-blue-500">${{ item.price }}</p>
            </div>
          </div>
          <button @click="removeFromCart(item.id)" 
            class="text-red-500 hover:text-red-600 transition-colors">
            <i class="fas fa-trash"></i>
          </button>
        </div>

        <!-- Total -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold">Total:</span>
            <span class="text-2xl font-bold text-blue-500">${{ total }}</span>
          </div>
          <button @click="checkout" 
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-bold transition-colors">
            Checkout
          </button>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-20">
        <i class="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">Add some items to your cart and they will appear here</p>
        <router-link to="/mart" 
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-bold transition-colors">
          Continue Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const total = computed(() => cartStore.total)

function removeFromCart(id) {
  cartStore.removeItem(id)
}

function checkout() {
  // Implement checkout logic
  console.log('Checkout clicked')
}
</script>
