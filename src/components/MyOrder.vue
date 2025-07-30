<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
    
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          My Orders
        </h1>
        <div class="relative">
          <button 
            @click="showFilters = !showFilters"
            class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <i class="fas fa-filter"></i>
            <span>Filter</span>
          </button>
          <transition name="fade">
            <div 
              v-show="showFilters"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700"
            >
              <div class="p-2 space-y-2">
                <label 
                  v-for="status in orderStatuses" 
                  :key="status.value"
                  class="flex items-center px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    v-model="selectedStatuses"
                    :value="status.value"
                    class="rounded text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600"
                  >
                  <span class="ml-2 text-sm">{{ status.label }}</span>
                </label>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="text-center py-16">
        <div class="mx-auto w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-box-open text-4xl text-blue-500"></i>
        </div>
        <h2 class="text-2xl font-bold mb-2">No orders found</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {{
            selectedStatuses.length === 0 
              ? "You haven't placed any orders yet. Start shopping to find amazing fan merchandise!"
              : "No orders match your selected filters."
          }}
        </p>
        <router-link 
          to="/mart" 
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md"
        >
          Start Shopping
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <!-- Order Header -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div class="flex items-center gap-3">
                <h3 class="font-bold text-lg">Order #{{ order.id }}</h3>
                <span 
                  :class="getStatusBadgeClass(order.status)"
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </div>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Placed on {{ formatDate(order.date) }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-bold text-blue-500">${{ order.total.toFixed(2) }}</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                {{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}
              </p>
            </div>
          </div>

          <!-- Order Items Preview -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex -space-x-2">
              <img 
                v-for="(item, index) in order.items.slice(0, 5)" 
                :key="index"
                :src="item.image"
                :alt="item.title"
                class="w-12 h-12 rounded-lg border-2 border-white dark:border-gray-800 object-cover"
              />
              <div 
                v-if="order.items.length > 5"
                class="w-12 h-12 rounded-lg border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold"
              >
                +{{ order.items.length - 5 }}
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <router-link 
              :to="`/orders/${order.id}`"
              class="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-2"
            >
              <i class="fas fa-eye"></i>
              <span>View Details</span>
            </router-link>
            
            <div class="flex items-center gap-3">
              <button 
                v-if="order.status === 'shipped'"
                @click="trackOrder(order.id)"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Track Package
              </button>
              <button 
                v-if="order.status === 'delivered'"
                @click="leaveReview(order)"
                class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Leave Review
              </button>
              <button 
                v-if="['processing', 'shipped'].includes(order.status)"
                @click="cancelOrder(order.id)"
                class="px-4 py-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Review Modal -->
    <div 
      v-if="reviewModal.open"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Leave a Review</h3>
          <button @click="reviewModal.open = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <h4 class="font-medium mb-2">Rate your purchase</h4>
          <div class="flex items-center gap-1">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="reviewModal.rating = star"
              class="text-2xl focus:outline-none"
            >
              <i 
                :class="star <= reviewModal.rating ? 'fas text-yellow-400' : 'far text-gray-400'"
                class="fa-star"
              ></i>
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label for="review-text" class="block font-medium mb-2">Your review</label>
          <textarea
            id="review-text"
            v-model="reviewModal.comment"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-3">
          <button 
            @click="reviewModal.open = false"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="submitReview"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Sample order data - in a real app, this would come from an API
const orders = ref([
  {
    id: 'FR-100256',
    date: '2023-05-15T14:32:00',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: 'prod-1',
        title: 'Limited Edition Poster',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 24.99,
        quantity: 1
      },
      {
        id: 'prod-2',
        title: 'Official Fan T-Shirt',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 29.99,
        quantity: 2
      }
    ],
    trackingNumber: 'UPS-1Z999AA0392658769'
  },
  {
    id: 'FR-100198',
    date: '2023-04-28T09:15:00',
    status: 'shipped',
    total: 45.98,
    items: [
      {
        id: 'prod-3',
        title: 'Collector\'s Pin Set',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 19.99,
        quantity: 1
      },
      {
        id: 'prod-4',
        title: 'Novelty Coffee Mug',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 12.99,
        quantity: 2
      }
    ],
    trackingNumber: 'USPS-9405511202537864567891'
  },
  {
    id: 'FR-100045',
    date: '2023-03-10T16:45:00',
    status: 'processing',
    total: 65.50,
    items: [
      {
        id: 'prod-5',
        title: 'Autographed Merch Box',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 65.50,
        quantity: 1
      }
    ]
  },
  {
    id: 'FR-099876',
    date: '2023-02-22T11:20:00',
    status: 'cancelled',
    total: 34.98,
    items: [
      {
        id: 'prod-6',
        title: 'Hoodie',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        price: 34.98,
        quantity: 1
      }
    ]
  }
])

const orderStatuses = [
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
]

const selectedStatuses = ref([])
const showFilters = ref(false)
const reviewModal = ref({
  open: false,
  orderId: null,
  rating: 0,
  comment: ''
})

const filteredOrders = computed(() => {
  if (selectedStatuses.value.length === 0) {
    return orders.value
  }
  return orders.value.filter(order => selectedStatuses.value.includes(order.status))
})

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function getStatusText(status) {
  const statusMap = {
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return statusMap[status] || status
}

function getStatusBadgeClass(status) {
  const classes = {
    processing: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    shipped: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    delivered: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
}

function trackOrder(orderId) {
  const order = orders.value.find(o => o.id === orderId)
  if (order && order.trackingNumber) {
    // In a real app, this would redirect to the carrier's tracking page
    alert(`Tracking order ${order.trackingNumber} with carrier website`)
  }
}

function leaveReview(order) {
  reviewModal.value = {
    open: true,
    orderId: order.id,
    rating: 0,
    comment: ''
  }
}

function submitReview() {
  // In a real app, this would submit to your backend
  console.log('Submitting review:', reviewModal.value)
  alert(`Thank you for your ${reviewModal.value.rating}-star review!`)
  reviewModal.value.open = false
}

function cancelOrder(orderId) {
  if (confirm('Are you sure you want to cancel this order?')) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = 'cancelled'
      // In a real app, you would call an API to cancel the order
      alert(`Order ${orderId} has been cancelled`)
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