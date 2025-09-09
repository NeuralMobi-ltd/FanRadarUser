<template>
  <div class="p-4 sm:p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">My Orders</h1>

      <!-- Filter Tabs (derived from backend statuses) -->
      <div class="flex space-x-2 overflow-x-auto whitespace-nowrap pb-1 -mx-2 px-2 mb-4 sm:mb-6" v-if="orderStatuses.length > 1">
        <button 
          v-for="status in orderStatuses" 
          :key="status" 
          @click="activeStatus = status"
          :class="['inline-flex items-center justify-center text-center leading-tight px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base border transition-colors', 
                   activeStatus === status 
                     ? 'bg-green-600 text-white border-transparent' 
                     : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600']"
        >
          {{ status.charAt(0).toUpperCase() + status.slice(1) }}
        </button>
      </div>

      <!-- Orders List -->
      <div v-if="filteredOrders.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
        <router-link 
          to="/mart" 
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Start Shopping
        </router-link>
      </div>

      <div v-else class="space-y-4 sm:space-y-6">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- Order Header -->
          <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div class="flex flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Order #{{ order.id }}</h3>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.date) }}</p>
              </div>
              <div class="flex items-center gap-2 sm:gap-4">
                <span 
                  :class="getStatusColor(order.status)" 
                  class="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </span>
                <router-link 
                  :to="`/orders/${order.id}`" 
                  class="text-sm sm:text-base text-green-600 hover:text-green-700 font-medium"
                >
                  View Details
                </router-link>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="p-4 sm:p-6">
            <div class="space-y-3 sm:space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
                >
                <div class="flex-1">
                  <h4 class="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Order Total (from backend) -->
            <div class="mt-5 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Total: ${{ order.total.toFixed(2) }}</span>
              <router-link :to="`/orders/${order.id}`" class="text-sm sm:text-base text-green-600 hover:text-green-700 font-medium">Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import OrdersService from '@/services/ordersService'

const activeStatus = ref('all')
const orders = ref([])
const loading = ref(false)

const normalizeOrder = (o) => {
  const toNum = (v) => {
    const n = typeof v === 'string' ? parseFloat(v) : v
    return Number.isFinite(n) ? n : 0
  }
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
    items
  }
}

const loadOrders = async () => {
  loading.value = true
  try {
    const res = await OrdersService.myOrders()
    const arr = res?.orders || res?.data?.orders || []
    orders.value = arr.map(normalizeOrder)
    // Initialize active status if not set
    if (!orderStatuses.value.includes(activeStatus.value)) activeStatus.value = 'all'
  } catch (e) {
    orders.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadOrders)

const orderStatuses = computed(() => {
  const set = new Set(orders.value.map(o => o.status).filter(Boolean))
  return ['all', ...Array.from(set)]
})

const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') return orders.value
  return orders.value.filter(order => order.status === activeStatus.value)
})

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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>