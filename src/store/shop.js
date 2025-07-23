import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShopStore = defineStore('shop', () => {
  const products = ref([])
  const radarDrops = ref([])
  const cart = ref([])

  function addToCart(product) {
    cart.value.push(product)
  }

  async function fetchProducts() {
    // TODO: Implement API call
  }

  return { products, radarDrops, cart, addToCart, fetchProducts }
}) 