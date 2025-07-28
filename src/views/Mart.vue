<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <div class="max-w-7xl mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold mb-8 text-center">FanRadarMart</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
        <div
          v-for="product in trendingProducts"
          :key="product.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer group"
        >
          <div class="relative">
            <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200" />
            <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              Trending
            </div>
          </div>
          <div class="p-5">
            <h2 class="font-bold text-lg mb-1">{{ product.title }}</h2>
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.category }}</div>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">{{ product.description }}</p>
            <div class="flex items-center justify-between">
              <span class="font-bold text-blue-500 text-lg">${{ product.price }}</span>
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trendingProducts = ref([
  {
    id: 1,
    title: "Messi T-shirt",
    category: "Football",
    description: "Official Lionel Messi fan t-shirt. Limited edition.",
    price: 29.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0CcmXcYZo1qCkofBQdsAZvWHDZyjt-g_GQ&s"
  },
  {
    id: 2,
    title: "Messi Jersey",
    category: "Football",
    description: "Lionel Messi Argentina jersey. 2022 World Cup edition.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "One Piece Figure",
    category: "Anime",
    description: "Luffy action figure from One Piece. Collectible item.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Taylor Swift Poster",
    category: "Music",
    description: "High quality poster of Taylor Swift's Eras Tour.",
    price: 14.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4dFsdNGRuRz-PlDdHaB69hqOfbRSshrM2ZA&s"
  },
  {
    id: 5,
    title: "Marvel Hoodie",
    category: "Movies",
    description: "Marvel Studios logo hoodie. Unisex, all sizes.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    title: "Nintendo Switch",
    category: "Gaming",
    description: "Nintendo Switch console. Play your favorite games.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    title: "K-pop Lightstick",
    category: "Music",
    description: "Official BTS Army Bomb lightstick. Limited stock.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    title: "Harry Potter Wand",
    category: "Books",
    description: "Replica of Harry Potter's wand. Perfect for fans.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
  },
    {
    id: 9,
    title: "Yassine Potter Wand",
    category: "Books",
    description: "Replica of Yassine Potter's wand. Perfect for fans.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
  }
])
</script>
