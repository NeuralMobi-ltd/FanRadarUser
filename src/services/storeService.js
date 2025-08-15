import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const StoreService = {
  async products(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { products: [] }
    }
    const { data } = await http.get(API_CONFIG.store.products, { params })
    return data
  },
  async categories() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { categories: [] }
    }
    const { data } = await http.get(API_CONFIG.store.categories)
    return data
  },
  async brands() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { brands: [] }
    }
    const { data } = await http.get(API_CONFIG.store.brands)
    return data
  },
  async search(q) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { products: [] }
    }
    const { data } = await http.get(API_CONFIG.store.search(q))
    return data
  },
  async addToCart(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.post(API_CONFIG.store.cart, payload)
    return data
  },
  async getCart() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { cart: { items: [] } }
    }
    const { data } = await http.get(API_CONFIG.store.cart)
    return data
  },
  async updateCartItem(itemId, payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.store.cartItem(itemId), payload)
    return data
  },
  async removeCartItem(itemId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.delete(API_CONFIG.store.cartItem(itemId))
    return data
  },
  async placeOrder(payload) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { orderId: Date.now(), success: true }
    }
    const { data } = await http.post(API_CONFIG.store.orders, payload)
    return data
  },
  async getOrders(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { orders: [] }
    }
    const { data } = await http.get(API_CONFIG.store.orders, { params })
    return data
  },
  async getOrderById(orderId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { order: null }
    }
    const { data } = await http.get(API_CONFIG.store.orderById(orderId))
    return data
  },
  async cancelOrder(orderId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.store.cancelOrder(orderId))
    return data
  },
  async toggleWishlist(productId) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.post(API_CONFIG.store.wishlist(productId))
    return data
  }
}

export default StoreService
