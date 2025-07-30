<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Your Cart
        </h1>
        <div class="w-8"></div> <!-- Spacer for alignment -->
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Empty Cart -->
      <div v-if="!cartItems.length" class="text-center py-16">
        <div class="mx-auto w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-shopping-cart text-4xl text-blue-500"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start shopping to find amazing fan merchandise!
        </p>
        <router-link to="/mart" 
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md">
          Continue Shopping
        </router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <!-- Cart Items -->
          <div v-for="item in cartItems" :key="item.id" 
            class="p-6 flex items-center border-b border-gray-200 dark:border-gray-700 last:border-0">
            <img :src="item.image" :alt="item.title" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"/>
            <div class="ml-4 sm:ml-6 flex-1">
              <div class="flex justify-between">
                <div>
                  <h3 class="font-bold text-lg">{{ item.title }}</h3>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">{{ item.category }}</p>
                </div>
                <button @click="removeFromCart(item.id)" 
                  class="text-gray-400 hover:text-red-500 transition-colors ml-4">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <div class="flex justify-between items-center mt-4">
                <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button 
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :disabled="item.quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="px-3">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <span class="font-bold text-blue-500 text-lg">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 class="text-xl font-bold mb-6">Order Summary</h3>
          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span class="font-medium">${{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Shipping</span>
              <span class="font-medium">${{ shipping }}</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <span class="text-lg font-bold">Total</span>
              <span class="text-xl font-bold text-blue-500">${{ total }}</span>
            </div>
          </div>
          <button @click="checkout" 
            class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition-colors shadow-md">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
})

const shipping = computed(() => {
  return subtotal.value > 50 ? '0.00' : '5.99'
})

const total = computed(() => {
  return (parseFloat(subtotal.value) + parseFloat(shipping.value)).toFixed(2)
})

function removeFromCart(id) {
  cartStore.removeItem(id)
}

function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) return
  cartStore.updateQuantity(id, newQuantity)
}

function checkout() {
  // Implement checkout logic
  console.log('Checkout clicked')
}
</script>