<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div v-if="cartItems.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Add some awesome products to get started!</p>
        <router-link to="/mart" class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.category }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-lg font-bold text-green-600">${{ item.price }}</span>
                  <span v-if="item.originalPrice" class="text-sm text-gray-500 line-through">${{ item.originalPrice }}</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="px-4 py-2 border-x border-gray-300 dark:border-gray-600">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <button @click="removeItem(item.id)" class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-fit">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-semibold text-green-600">Free</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-semibold">${{ tax.toFixed(2) }}</span>
            </div>
            <hr class="border-gray-200 dark:border-gray-700">
            <div class="flex justify-between text-lg">
              <span class="font-semibold">Total</span>
              <span class="font-bold text-green-600">${{ total.toFixed(2) }}</span>
            </div>
          </div>
          <button @click="proceedToCheckout" class="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
            Proceed to Checkout
          </button>
          <router-link to="/mart" class="block w-full mt-3 text-center text-green-600 hover:text-green-700 py-2 border border-green-600 rounded-lg font-medium transition-colors">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartItems = ref([
  {
    id: 1,
    name: 'Attack on Titan Survey Corps Hoodie',
    category: 'Apparel',
    price: 45.99,
    originalPrice: 59.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Marvel Avengers Logo T-Shirt',
    category: 'Apparel',
    price: 24.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'League of Legends Championship Trophy Replica',
    category: 'Collectibles',
    price: 89.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop'
  }
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + tax.value)

const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity < 1) {
    removeItem(itemId)
    return
  }
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = newQuantity
  }
}

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

const proceedToCheckout = () => {
  console.log('Proceeding to checkout...')
  // Add checkout logic here
}
</script>