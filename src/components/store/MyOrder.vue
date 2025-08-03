<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

      <!-- Filter Tabs -->
      <div class="flex space-x-1 mb-6">
        <button 
          v-for="status in orderStatuses" 
          :key="status" 
          @click="activeStatus = status"
          :class="['px-4 py-2 rounded-lg font-medium transition-colors', 
                   activeStatus === status ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']"
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

      <div v-else class="space-y-6">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id" 
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- Order Header -->
          <div class="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Order #{{ order.id }}</h3>
                <p class="text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.date) }}</p>
              </div>
              <div class="flex items-center gap-4">
                <span 
                  :class="getStatusColor(order.status)" 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                </span>
                <router-link 
                  :to="`/orders/${order.id}`" 
                  class="text-green-600 hover:text-green-700 font-medium"
                >
                  View Details
                </router-link>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="w-16 h-16 object-cover rounded-lg"
                >
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Quantity: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Order Total -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900 dark:text-white">Total: ${{ order.total.toFixed(2) }}</span>
              <div class="flex gap-2">
                <button 
                  v-if="order.status === 'delivered'" 
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Leave Review
                </button>
                <button 
                  v-if="order.status === 'processing'" 
                  @click="cancelOrder(order.id)" 
                  class="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
                >
                  Cancel Order
                </button>
                <button 
                  v-if="order.status === 'delivered'" 
                  class="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg font-medium transition-colors"
                >
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStatus = ref('all')
const orderStatuses = ref(['all', 'processing', 'shipped', 'delivered', 'cancelled'])

const orders = ref([
  {
    id: 'ORD-2024-001',
    date: new Date('2024-01-15'),
    status: 'delivered',
    total: 116.97,
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
  },
  {
    id: 'ORD-2024-002',
    date: new Date('2024-01-10'),
    status: 'shipped',
    total: 89.99,
    items: [
      {
        id: 3,
        name: 'League of Legends Championship Trophy Replica',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: new Date('2024-01-05'),
    status: 'processing',
    total: 54.98,
    items: [
      {
        id: 4,
        name: 'K-Pop BTS Photocard Set',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
      },
      {
        id: 5,
        name: 'Studio Ghibli Totoro Plushie',
        price: 34.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
      }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeStatus.value)
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

const cancelOrder = (orderId) => {
  if (confirm('Are you sure you want to cancel this order?')) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'cancelled'
    }
  }
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