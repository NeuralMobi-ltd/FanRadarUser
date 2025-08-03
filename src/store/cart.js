import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  actions: {
    addItem(product) {
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
