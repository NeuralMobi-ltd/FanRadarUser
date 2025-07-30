<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <button 
          @click="$router.push('/orders')"
          class="flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Back to Orders
        </button>
        <h1 class="ml-4 text-xl font-bold">Order #FR-100256</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Order Status Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 class="text-lg font-bold mb-1">Order Status</h2>
            <div class="flex items-center gap-2">
              <span :class="statusBadgeClass" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ currentStatus.text }}
              </span>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {{ formatDate(order.updatedAt) }}
              </p>
            </div>
          </div>
          
          <button 
            v-if="currentStatus.value === 'shipped'"
            @click="trackPackage"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <i class="fas fa-truck"></i>
            <span>Track Package</span>
          </button>
        </div>

        <!-- Status Timeline -->
        <div class="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700">
          <div 
            v-for="(status, index) in statusTimeline" 
            :key="status.value"
            class="relative mb-6 last:mb-0"
          >
            <div 
              :class="[
                'absolute -left-8 w-5 h-5 rounded-full border-4 flex items-center justify-center',
                status.completed 
                  ? 'border-blue-500 bg-white dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
              ]"
            >
              <i 
                v-if="status.completed"
                class="fas fa-check text-xs text-blue-500"
              ></i>
            </div>
            
            <div>
              <h3 class="font-medium">{{ status.text }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ status.completed ? formatDate(status.date) : 'Pending' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping & Payment Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-bold mb-4">Shipping Information</h2>
          <div class="space-y-2">
            <p class="font-medium">{{ order.shipping.name }}</p>
            <p>{{ order.shipping.address }}</p>
            <p>{{ order.shipping.city }}, {{ order.shipping.state }} {{ order.shipping.zip }}</p>
            <p>{{ order.shipping.country }}</p>
            <p class="text-blue-500">{{ order.shipping.phone }}</p>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-bold mb-4">Payment Information</h2>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-6 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
              <i class="fab fa-cc-visa text-lg text-blue-900 dark:text-blue-300"></i>
            </div>
            <span>Visa ending in {{ order.payment.last4 }}</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Paid on {{ formatDate(order.payment.date) }}
          </p>
          <p class="mt-4 font-bold">${{ order.total.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-bold">Order Items</h2>
        </div>
        
        <div v-for="(item, index) in order.items" :key="item.id" 
          class="p-6 flex flex-col sm:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
          <img :src="item.image" :alt="item.title" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"/>
          
          <div class="flex-1">
            <div class="flex justify-between">
              <div>
                <h3 class="font-bold">{{ item.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.category }}</p>
              </div>
              <p class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            
            <div class="mt-4 flex justify-between items-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Quantity: {{ item.quantity }}
              </p>
              
              <button 
                v-if="currentStatus.value === 'delivered'"
                @click="openReviewModal(item)"
                class="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-bold mb-4">Order Summary</h2>
        
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
            <span>${{ order.subtotal.toFixed(2) }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">Shipping</span>
            <span>${{ order.shippingFee.toFixed(2) }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-300">Tax</span>
            <span>${{ order.tax.toFixed(2) }}</span>
          </div>
          
          <div class="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <span class="font-bold">Total</span>
            <span class="font-bold text-blue-500">${{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Order Actions -->
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button 
          v-if="['processing', 'shipped'].includes(currentStatus.value)"
          @click="cancelOrder"
          class="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
        >
          Cancel Order
        </button>
        
        <button 
          @click="$router.push('/mart')"
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex-1"
        >
          Continue Shopping
        </button>
      </div>
    </main>

    <!-- Review Modal -->
    <div v-if="showReviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Review {{ reviewItem.title }}</h3>
          <button @click="showReviewModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <h4 class="font-medium mb-2">Your Rating</h4>
          <div class="flex items-center gap-1">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="review.rating = star"
              class="text-2xl focus:outline-none"
            >
              <i 
                :class="star <= review.rating ? 'fas text-yellow-400' : 'far text-gray-400'"
                class="fa-star"
              ></i>
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label for="review-text" class="block font-medium mb-2">Your Review</label>
          <textarea
            id="review-text"
            v-model="review.comment"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-3">
          <button 
            @click="showReviewModal = false"
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

// Sample order data - in a real app this would come from an API
const order = ref({
  id: 'FR-100256',
  status: 'delivered',
  createdAt: '2023-05-15T14:32:00',
  updatedAt: '2023-05-20T11:15:00',
  subtotal: 79.98,
  shippingFee: 5.99,
  tax: 4.00,
  total: 89.97,
  shipping: {
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    phone: '(555) 123-4567',
    carrier: 'UPS',
    trackingNumber: '1Z999AA0392658769'
  },
  payment: {
    method: 'visa',
    last4: '4242',
    date: '2023-05-15T14:32:00'
  },
  items: [
    {
      id: 'prod-1',
      title: 'Limited Edition Poster',
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Home Decor',
      price: 24.99,
      quantity: 1
    },
    {
      id: 'prod-2',
      title: 'Official Fan T-Shirt',
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Apparel',
      price: 29.99,
      quantity: 2
    }
  ]
})

const statusTimeline = ref([
  { value: 'placed', text: 'Order Placed', date: '2023-05-15T14:32:00', completed: true },
  { value: 'processing', text: 'Processing', date: '2023-05-16T09:15:00', completed: true },
  { value: 'shipped', text: 'Shipped', date: '2023-05-17T13:45:00', completed: true },
  { value: 'delivered', text: 'Delivered', date: '2023-05-20T11:15:00', completed: true }
])

const currentStatus = computed(() => {
  return {
    value: order.value.status,
    text: order.value.status.charAt(0).toUpperCase() + order.value.status.slice(1)
  }
})

const statusBadgeClass = computed(() => {
  const classes = {
    processing: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    shipped: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    delivered: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }
  return classes[order.value.status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
})

// Review modal
const showReviewModal = ref(false)
const reviewItem = ref(null)
const review = ref({
  rating: 0,
  comment: ''
})

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function trackPackage() {
  // In a real app, this would open the carrier's tracking page
  window.open(`https://www.ups.com/track?tracknum=${order.value.shipping.trackingNumber}`, '_blank')
}

function openReviewModal(item) {
  reviewItem.value = item
  review.value = { rating: 0, comment: '' }
  showReviewModal.value = true
}

function submitReview() {
  // In a real app, this would submit to your backend
  console.log('Review submitted for', reviewItem.value.id, review.value)
  alert(`Thank you for your ${review.value.rating}-star review!`)
  showReviewModal.value = false
}

function cancelOrder() {
  if (confirm('Are you sure you want to cancel this order?')) {
    // In a real app, this would call an API to cancel the order
    order.value.status = 'cancelled'
    alert('Your order has been cancelled')
    router.push('/orders')
  }
}
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>