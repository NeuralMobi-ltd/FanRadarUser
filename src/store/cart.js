import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    count: (state) => state.items.length,
    total: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
    itemQuantity: (state) => (productId) => {
      const item = state.items.find(i => i.id === productId)
      return item ? item.quantity : 0
    }
  },

  actions: {
    addItem(product) {
      const existingItem = this.items.find(i => i.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },
    
    removeItem(productId) {
      this.items = this.items.filter(i => i.id !== productId)
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    }
  }
})
