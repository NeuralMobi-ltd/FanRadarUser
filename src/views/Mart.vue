<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-10 text-white">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold mb-4">Fan Merchandise Collection</h2>
          <p class="text-lg mb-6">Discover exclusive fan gear from your favorite celebrities, sports teams, and franchises</p>
          <button 
            @click="$router.push('/mart')"
            class="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>

      <!-- Categories -->
      <div class="mb-10">
        <h3 class="text-2xl font-bold mb-6">Shop by Category</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <button 
            v-for="category in categories"
            :key="category"
            @click="filterByCategory(category)"
            class="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center"
            :class="{
              'ring-2 ring-blue-500': activeCategory === category,
              'bg-red-100 dark:bg-red-900': category === 'Football',
              'bg-blue-100 dark:bg-blue-900': category === 'Anime',
              'bg-purple-100 dark:bg-purple-900': category === 'Music',
              'bg-yellow-100 dark:bg-yellow-900': category === 'Movies',
              'bg-green-100 dark:bg-green-900': category === 'Gaming'
            }"
          >
            <div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
              :class="{
                'bg-red-200 dark:bg-red-800': category === 'Football',
                'bg-blue-200 dark:bg-blue-800': category === 'Anime',
                'bg-purple-200 dark:bg-purple-800': category === 'Music',
                'bg-yellow-200 dark:bg-yellow-800': category === 'Movies',
                'bg-green-200 dark:bg-green-800': category === 'Gaming'
              }"
            >
              <i :class="categoryIcons[category]"></i>
            </div>
            <span class="font-medium">{{ category }}</span>
          </button>
        </div>
      </div>

      <!-- Featured Products -->
      <div>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">{{ activeCategory ? activeCategory + ' Products' : 'Trending Now' }}</h3>
          <button 
            v-if="activeCategory"
            @click="clearFilter"
            class="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Clear Filter
          </button>
          <button 
            v-else
            @click="loadMoreProducts"
            class="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View All <i class="fas fa-chevron-right ml-1"></i>
          </button>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div class="relative">
              <img 
                :src="product.image" 
                :alt="product.title" 
                class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute top-3 left-3 flex gap-2">
                <span v-if="product.isTrending" class="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  Trending
                </span>
                <span v-if="product.isNew" class="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  New
                </span>
              </div>
              <button 
                @click.stop="addToCart(product)"
                class="absolute bottom-3 right-3 bg-white dark:bg-gray-900 text-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-full shadow-md transition-colors"
              >
                <i class="fas fa-cart-plus"></i>
              </button>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start mb-1">
                <h2 class="font-bold text-lg truncate">{{ product.title }}</h2>
                <span class="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ product.category }}</span>
              </div>
              
              <!-- Rating Section -->
              <div class="flex items-center mb-2">
                <div class="flex items-center">
                  <template v-if="product.rating && product.rating.count > 0">
                    <!-- Filled stars -->
                    <i 
                      v-for="star in Math.floor(product.rating.average)"
                      :key="'filled-' + star"
                      class="fas fa-star text-yellow-400 text-sm"
                    ></i>
                    
                    <!-- Half star -->
                    <i 
                      v-if="product.rating.average % 1 >= 0.5"
                      class="fas fa-star-half-alt text-yellow-400 text-sm"
                    ></i>
                    
                    <!-- Empty stars -->
                    <i 
                      v-for="star in 5 - Math.ceil(product.rating.average)"
                      :key="'empty-' + star"
                      class="far fa-star text-yellow-400 text-sm"
                    ></i>
                    
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({{ product.rating.count }})
                    </span>
                  </template>
                  <template v-else>
                    <i 
                      v-for="star in 5"
                      :key="'no-rating-' + star"
                      class="far fa-star text-gray-300 dark:text-gray-600 text-sm"
                    ></i>
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      No ratings
                    </span>
                  </template>
                </div>
              </div>
              
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-blue-500 text-lg">${{ product.price }}</span>
                <button 
                  v-if="product.rating"
                  @click.stop="showReviews(product)"
                  class="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  See reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Cart Button -->
    <button 
      @click="$router.push('/cart')"
      class="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center gap-3 group transition-all duration-300 hover:scale-105 z-50"
    >
      <div class="relative">
        <i class="fas fa-shopping-cart text-xl"></i>
        <span v-if="cartItemCount" 
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {{ cartItemCount }}
        </span>
      </div>
      <span class="font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        View Cart
      </span>
    </button>

    <!-- Reviews Modal -->
    <div 
      v-if="showReviewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showReviewModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">{{ currentProduct.title }}</h3>
          <button @click="showReviewModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Product Rating Summary -->
        <div class="flex items-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-center mr-6">
            <div class="text-4xl font-bold text-blue-500">
              {{ currentProduct.rating.average.toFixed(1) }}
            </div>
            <div class="flex justify-center mt-1">
              <i 
                v-for="star in 5"
                :key="'summary-' + star"
                :class="[
                  star <= Math.floor(currentProduct.rating.average) ? 'fas' : 'far',
                  star === Math.ceil(currentProduct.rating.average) && currentProduct.rating.average % 1 > 0 ? 'fa-star-half-alt' : 'fa-star',
                  'text-yellow-400 text-sm'
                ]"
              ></i>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ currentProduct.rating.count }} review{{ currentProduct.rating.count !== 1 ? 's' : '' }}
            </div>
          </div>
          
          <!-- Rating Distribution -->
          <div class="flex-1">
            <div 
              v-for="n in 5"
              :key="'dist-' + n"
              class="flex items-center mb-1"
            >
              <span class="w-8 text-sm text-gray-600 dark:text-gray-300">{{ 6 - n }}★</span>
              <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mx-2">
                <div 
                  class="bg-yellow-400 h-2 rounded-full"
                  :style="{ width: getRatingPercentage(6 - n) + '%' }"
                ></div>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                {{ getRatingCount(6 - n) }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Reviews List -->
        <div v-if="currentProduct.reviews && currentProduct.reviews.length > 0">
          <h4 class="font-bold mb-4">Customer Reviews</h4>
          <div class="space-y-4">
            <div 
              v-for="review in currentProduct.reviews"
              :key="review.id"
              class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
            >
              <div class="flex items-center mb-2">
                <div class="flex items-center mr-3">
                  <i 
                    v-for="star in 5"
                    :key="'review-' + review.id + '-' + star"
                    :class="[
                      star <= review.rating ? 'fas' : 'far',
                      'fa-star text-yellow-400 text-sm'
                    ]"
                  ></i>
                </div>
                <span class="text-sm font-medium">{{ review.user }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  {{ formatReviewDate(review.date) }}
                </span>
              </div>
              <h5 class="font-medium mb-1">{{ review.title }}</h5>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-500 dark:text-gray-400">
          No reviews yet
        </div>
        
        <!-- Add Review Button -->
        <button 
          @click="openReviewForm"
          class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Write a Review
        </button>
      </div>
    </div>
    
    <!-- Review Form Modal -->
    <div 
      v-if="showReviewForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showReviewForm = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Review {{ currentProduct.title }}</h3>
          <button @click="showReviewForm = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <h4 class="font-medium mb-2">Your Rating</h4>
          <div class="flex items-center gap-1">
            <button 
              v-for="star in 5" 
              :key="'form-star-' + star"
              @click="newReview.rating = star"
              class="text-2xl focus:outline-none"
            >
              <i 
                :class="star <= newReview.rating ? 'fas text-yellow-400' : 'far text-gray-400'"
                class="fa-star"
              ></i>
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label for="review-title" class="block font-medium mb-2">Review Title</label>
          <input
            id="review-title"
            v-model="newReview.title"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Summarize your experience"
          >
        </div>
        
        <div class="mb-4">
          <label for="review-text" class="block font-medium mb-2">Your Review</label>
          <textarea
            id="review-text"
            v-model="newReview.comment"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Share details about your experience with this product..."
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-3">
          <button 
            @click="showReviewForm = false"
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
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.count)

// Categories data
const categories = ref(['Football', 'Anime', 'Music', 'Movies', 'Gaming'])
const activeCategory = ref(null)
const showAllProducts = ref(false)

const categoryIcons = {
  'Football': 'fas fa-futbol',
  'Anime': 'fas fa-dragon',
  'Music': 'fas fa-music',
  'Movies': 'fas fa-film',
  'Gaming': 'fas fa-gamepad'
}

// Products data with ratings
const baseProducts = ref([
  {
    id: 1,
    title: "Messi T-shirt",
    category: "Football",
    description: "Official Lionel Messi fan t-shirt. Limited edition with premium quality fabric.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: {
      average: 4.5,
      count: 42,
      distribution: [3, 5, 10, 12, 12] // 1-5 stars count
    },
    reviews: [
      {
        id: 1,
        user: "SoccerFan99",
        rating: 5,
        title: "Perfect fit and quality",
        comment: "The fabric is amazing and the print quality is excellent. Fits true to size.",
        date: "2023-06-15T10:30:00"
      },
      {
        id: 2,
        user: "MessiLover",
        rating: 4,
        title: "Great shirt but runs slightly large",
        comment: "Love the design but I would recommend sizing down if you're between sizes.",
        date: "2023-05-22T14:45:00"
      }
    ]
  },
  {
    id: 2,
    title: "Messi Jersey",
    category: "Football",
    description: "Lionel Messi Argentina jersey. 2022 World Cup edition with official stitching.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: true,
    rating: {
      average: 4.8,
      count: 28,
      distribution: [0, 1, 2, 10, 15]
    },
    reviews: [
      {
        id: 1,
        user: "ArgentinaFan",
        rating: 5,
        title: "Authentic jersey!",
        comment: "Exactly like the ones the players wear. Worth every penny!",
        date: "2023-07-01T09:15:00"
      }
    ]
  },
  {
    id: 3,
    title: "One Piece Figure",
    category: "Anime",
    description: "Luffy action figure from One Piece. Highly detailed collectible item with accessories.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: null // No ratings yet
  },
  {
    id: 4,
    title: "Taylor Swift Poster",
    category: "Music",
    description: "High quality poster of Taylor Swift's Eras Tour. Glossy finish, perfect for framing.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: {
      average: 3.7,
      count: 15,
      distribution: [2, 3, 4, 3, 3]
    },
    reviews: []
  },
  {
    id: 5,
    title: "Marvel Hoodie",
    category: "Movies",
    description: "Marvel Studios logo hoodie. Premium cotton blend, unisex, available in all sizes.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: true,
    rating: {
      average: 4.2,
      count: 36,
      distribution: [1, 4, 8, 12, 11]
    },
    reviews: [
      {
        id: 1,
        user: "ComicBookGuy",
        rating: 4,
        title: "Very comfortable",
        comment: "Great quality material and the logo looks awesome. Runs a bit large though.",
        date: "2023-07-10T16:20:00"
      }
    ]
  },
  {
    id: 6,
    title: "Nintendo Switch",
    category: "Gaming",
    description: "Nintendo Switch console with Joy-Con controllers. Play your favorite games anywhere.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: {
      average: 4.9,
      count: 87,
      distribution: [0, 1, 2, 15, 69]
    },
    reviews: [
      {
        id: 1,
        user: "Gamer123",
        rating: 5,
        title: "Best console ever",
        comment: "Love the portability and the game selection is amazing!",
        date: "2023-06-28T11:45:00"
      }
    ]
  },
  {
    id: 7,
    title: "K-pop Lightstick",
    category: "Music",
    description: "Official BTS Army Bomb lightstick. Limited stock with authentic packaging.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: null // No ratings yet
  },
  {
    id: 8,
    title: "Harry Potter Wand",
    category: "Movies",
    description: "Replica of Harry Potter's wand. Handcrafted with attention to detail, perfect for fans.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: true,
    rating: {
      average: 4.0,
      count: 5,
      distribution: [0, 1, 1, 1, 2]
    },
    reviews: []
  }
])

// Additional products that load when clicking "View All"
const additionalProducts = ref([
  {
    id: 9,
    title: "CR7 Jersey",
    category: "Football",
    description: "Cristiano Ronaldo Portugal jersey. Official merchandise with player name and number.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: {
      average: 4.6,
      count: 32,
      distribution: [0, 2, 5, 10, 15]
    },
    reviews: []
  },
  {
    id: 10,
    title: "Dragon Ball Z Hoodie",
    category: "Anime",
    description: "Goku Super Saiyan hoodie from Dragon Ball Z. Comfortable and stylish for anime fans.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: {
      average: 4.3,
      count: 18,
      distribution: [0, 1, 3, 7, 7]
    },
    reviews: []
  },
  {
    id: 11,
    title: "BTS Album Set",
    category: "Music",
    description: "Complete collection of BTS albums. Includes all studio albums and special editions.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: null // No ratings yet
  },
  {
    id: 12,
    title: "Avengers Cap",
    category: "Movies",
    description: "Official Avengers baseball cap with logo embroidery. Adjustable strap for perfect fit.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: {
      average: 3.5,
      count: 8,
      distribution: [1, 1, 2, 2, 2]
    },
    reviews: []
  },
  {
    id: 13,
    title: "PS5 Controller",
    category: "Gaming",
    description: "DualSense wireless controller for PlayStation 5. Haptic feedback and adaptive triggers.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: {
      average: 4.7,
      count: 45,
      distribution: [0, 1, 4, 15, 25]
    },
    reviews: []
  },
  {
    id: 14,
    title: "Mbappé Cleats",
    category: "Football",
    description: "Kylian Mbappé signature football cleats. Lightweight design for maximum speed.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: true,
    rating: null // No ratings yet
  },
  {
    id: 15,
    title: "Naruto Headband",
    category: "Anime",
    description: "Authentic Naruto headband replica. Metal plate with hidden leaf village symbol.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: false,
    isNew: false,
    rating: {
      average: 4.1,
      count: 12,
      distribution: [0, 1, 2, 4, 5]
    },
    reviews: []
  },
  {
    id: 16,
    title: "Star Wars Lightsaber",
    category: "Movies",
    description: "Premium replica lightsaber with sound effects. Choose between blue, green or red blade.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    isTrending: true,
    isNew: false,
    rating: {
      average: 4.8,
      count: 52,
      distribution: [0, 0, 3, 12, 37]
    },
    reviews: []
  }
])

const products = computed(() => {
  return showAllProducts.value 
    ? [...baseProducts.value, ...additionalProducts.value]
    : baseProducts.value
})

const filteredProducts = computed(() => {
  if (!activeCategory.value) return products.value
  return products.value.filter(product => product.category === activeCategory.value)
})

// Modal state
const showReviewModal = ref(false)
const showReviewForm = ref(false)
const currentProduct = ref({})
const newReview = ref({
  rating: 0,
  title: '',
  comment: ''
})

function filterByCategory(category) {
  activeCategory.value = category
}

function clearFilter() {
  activeCategory.value = null
}

function loadMoreProducts() {
  showAllProducts.value = true
}

function addToCart(product) {
  cartStore.addItem(product)
  // Show notification
  const notification = document.createElement('div')
  notification.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-out'
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>Added to cart: ${product.title}</span>
  `
  document.body.appendChild(notification)
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300')
    setTimeout(() => notification.remove(), 300)
  }, 2000)
}

function showReviews(product) {
  currentProduct.value = product
  showReviewModal.value = true
}

function openReviewForm() {
  showReviewModal.value = false
  newReview.value = {
    rating: 0,
    title: '',
    comment: ''
  }
  showReviewForm.value = true
}

function submitReview() {
  if (!currentProduct.value.rating) {
    // Initialize rating if product has no ratings yet
    currentProduct.value.rating = {
      average: newReview.value.rating,
      count: 1,
      distribution: [0, 0, 0, 0, 0]
    }
    currentProduct.value.rating.distribution[5 - newReview.value.rating] = 1
    currentProduct.value.reviews = []
  } else {
    // Update existing rating
    const oldTotal = currentProduct.value.rating.average * currentProduct.value.rating.count
    currentProduct.value.rating.count += 1
    currentProduct.value.rating.average = (oldTotal + newReview.value.rating) / currentProduct.value.rating.count
    currentProduct.value.rating.distribution[5 - newReview.value.rating] += 1
  }
  
  // Add new review
  currentProduct.value.reviews.unshift({
    id: Date.now(),
    user: "You", // In a real app, this would be the logged-in user's name
    rating: newReview.value.rating,
    title: newReview.value.title,
    comment: newReview.value.comment,
    date: new Date().toISOString()
  })
  
  showReviewForm.value = false
  showReviewModal.value = true
}

function getRatingPercentage(rating) {
  if (!currentProduct.value.rating || currentProduct.value.rating.count === 0) return 0
  const count = currentProduct.value.rating.distribution[5 - rating] || 0
  return (count / currentProduct.value.rating.count) * 100
}

function getRatingCount(rating) {
  if (!currentProduct.value.rating) return 0
  return currentProduct.value.rating.distribution[5 - rating] || 0
}

function formatReviewDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
/* Animation for notification */
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
  10% { opacity: 1; transform: translateY(0) translateX(-50%); }
  90% { opacity: 1; transform: translateY(0) translateX(-50%); }
  100% { opacity: 0; transform: translateY(-20px) translateX(-50%); }
}

.animate-fade-in-out {
  animation: fadeInOut 2.3s ease-in-out forwards;
}

/* Line clamp for description */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>