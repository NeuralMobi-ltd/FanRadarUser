<template>
  <div class="p-4 sm:p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <button @click="$router.go(-1)" class="flex items-center text-green-600 hover:text-green-700 mb-4 sm:mb-6">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="text-sm sm:text-base">Back to Orders</span>
      </button>

  <div v-if="order">
        <!-- Order Header -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
          <div class="flex flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Order #{{ order.id }}</h1>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.date) }}</p>
            </div>
            <span :class="getStatusColor(order.status)" class="px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
            </span>
          </div>

          <!-- Order Progress -->
          <!-- Progress simplified: backend exposes status only -->
          <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Status: {{ order.status }}</div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Order Items</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="item in order.items" :key="item.id" class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg">
              <div class="flex-1">
                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
                <p class="text-green-600 font-semibold text-sm sm:text-base">${{ item.price }} each</p>
              </div>
              <div class="text-right">
                <p class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary & Shipping -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <!-- Order Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Order Summary</h2>
            <div class="flex items-center justify-between text-base sm:text-lg font-semibold">
              <span class="text-gray-900 dark:text-white">Total</span>
              <span class="text-green-600">${{ order.total.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Customer</h2>
            <div class="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <div>{{ order.user?.first_name }} {{ order.user?.last_name }}</div>
              <div class="text-gray-500 dark:text-gray-400">{{ order.user?.email }}</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
  <div class="flex justify-end mt-4 sm:mt-6 text-sm sm:text-base text-gray-500 dark:text-gray-400">Status: {{ order.status }}</div>
      </div>

      <div v-else class="text-center py-12 sm:py-16">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">Order not found</h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base">The order you're looking for doesn't exist.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrdersService from '@/services/ordersService'

const route = useRoute()
const orderId = computed(() => route.params.id)

const order = ref(null)

const toNum = (v) => {
  const n = typeof v === 'string' ? parseFloat(v) : v
  return Number.isFinite(n) ? n : 0
}

const normalizeOrder = (o) => {
  const items = Array.isArray(o.products) ? o.products.map(p => ({
    id: p.id,
    name: p.product_name || p.name || `Product #${p.id}`,
    price: toNum(p.price),
    quantity: p.pivot?.quantity || 1,
  image: p.image || p.images?.[0] || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
  })) : []
  return {
    id: o.id,
    date: new Date(o.order_date || o.created_at || Date.now()),
    status: o.status || 'pending',
    total: toNum(o.total_amount),
    items,
    user: o.user || null
  }
}

const loadOrder = async () => {
  try {
    const res = await OrdersService.getById(orderId.value)
    const raw = res?.order || res
    order.value = normalizeOrder(raw)
  } catch (e) {
    order.value = null
  }
}

const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

onMounted(loadOrder)
</script>

<style scoped>
</style>