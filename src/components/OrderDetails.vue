<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <button @click="$router.go(-1)" class="flex items-center text-green-600 hover:text-green-700 mb-6">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Orders
      </button>

      <div v-if="order">
        <!-- Order Header -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Order #{{ order.id }}</h1>
              <p class="text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.date) }}</p>
            </div>
            <span :class="getStatusColor(order.status)" class="px-4 py-2 rounded-full text-sm font-medium">
              {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
            </span>
          </div>

          <!-- Order Progress -->
          <div class="relative">
            <div class="flex items-center justify-between mb-2">
              <span v-for="(step, index) in orderSteps" :key="step.status" 
                    :class="['text-sm font-medium', getStepStatus(step.status) !== 'inactive' ? 'text-green-600' : 'text-gray-400']">
                {{ step.label }}
              </span>
            </div>
            <div class="relative">
              <div class="flex items-center justify-between">
                <div v-for="(step, index) in orderSteps" :key="step.status" 
                     :class="['w-4 h-4 rounded-full border-2', getStepClass(step.status)]">
                </div>
              </div>
              <div class="absolute top-2 left-2 right-2 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
                <div class="h-full bg-green-600 transition-all duration-500" :style="{ width: progressWidth }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Items</h2>
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">Quantity: {{ item.quantity }}</p>
                <p class="text-green-600 font-semibold">${{ item.price }} each</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary & Shipping -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>${{ order.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                <span class="text-green-600">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Tax</span>
                <span>${{ order.tax.toFixed(2) }}</span>
              </div>
              <hr class="border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-green-600">${{ order.total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h2>
            <div class="space-y-3">
              <div>
                <span class="text-gray-600 dark:text-gray-400 block">Shipping Address</span>
                <p class="text-gray-900 dark:text-white">{{ order.shippingAddress.name }}</p>
                <p class="text-gray-900 dark:text-white">{{ order.shippingAddress.street }}</p>
                <p class="text-gray-900 dark:text-white">{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zip }}</p>
              </div>
              <div v-if="order.trackingNumber">
                <span class="text-gray-600 dark:text-gray-400 block">Tracking Number</span>
                <p class="text-green-600 font-mono">{{ order.trackingNumber }}</p>
              </div>
              <div v-if="order.estimatedDelivery">
                <span class="text-gray-600 dark:text-gray-400 block">Estimated Delivery</span>
                <p class="text-gray-900 dark:text-white">{{ formatDate(order.estimatedDelivery) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <button v-if="order.status === 'delivered'" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
            Leave Review
          </button>
          <button v-if="order.status === 'processing'" @click="cancelOrder" class="px-6 py-3 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors">
            Cancel Order
          </button>
          <button v-if="order.status === 'delivered'" class="px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium transition-colors">
            Reorder
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Order not found</h2>
        <p class="text-gray-600 dark:text-gray-400">The order you're looking for doesn't exist.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => route.params.id)

const orderSteps = ref([
  { status: 'processing', label: 'Processing' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' }
])

const order = ref({
  id: 'ORD-2024-001',
  date: new Date('2024-01-15'),
  status: 'delivered',
  total: 116.97,
  subtotal: 108.27,
  tax: 8.70,
  trackingNumber: 'TN123456789',
  estimatedDelivery: new Date('2024-01-20'),
  shippingAddress: {
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  },
  items: [
    {
      id: 1,
      name: 'Attack on Titan Survey Corps Hoodie',
      price: 45.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Marvel Avengers Logo T-Shirt',
      price: 24.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop'
    }
  ]
})

const progressWidth = computed(() => {
  const currentStepIndex = orderSteps.value.findIndex(step => step.status === order.value.status)
  return `${(currentStepIndex / (orderSteps.value.length - 1)) * 100}%`
})

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  const colors = {
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStepStatus = (stepStatus) => {
  const currentStepIndex = orderSteps.value.findIndex(step => step.status === order.value.status)
  const stepIndex = orderSteps.value.findIndex(step => step.status === stepStatus)
  
  if (stepIndex <= currentStepIndex) return 'completed'
  return 'inactive'
}

const getStepClass = (stepStatus) => {
  const status = getStepStatus(stepStatus)
  if (status === 'completed') return 'bg-green-600 border-green-600'
  return 'bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
}

const cancelOrder = () => {
  if (confirm('Are you sure you want to cancel this order?')) {
    order.value.status = 'cancelled'
  }
}

onMounted(() => {
  // Load order data based on orderId
  console.log('Loading order:', orderId.value)
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>