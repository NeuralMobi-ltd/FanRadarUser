import { defineStore } from 'pinia'

export const useStoreNotifications = defineStore('storeNotifications', {
  state: () => ({
    notifications: [
      // Product-related notifications for the store
      {
        id: 1,
        text: 'Your order <b>#1234</b> for <b>Wireless Headphones</b> has shipped!',
        time: '2m ago',
        read: false,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        text: 'Price drop: <b>Gaming Mouse</b> is now 20% off!',
        time: '15m ago',
        read: false,
        icon: 'fas fa-tag'
      },
      {
        id: 3,
        text: 'Your <b>FanRadarMart</b> order is out for delivery',
        time: '1h ago',
        read: true,
        icon: 'fas fa-truck'
      },
      {
        id: 4,
        text: 'New product added: <b>Marvel T-Shirt</b> now available!',
        time: '2h ago',
        read: false,
        icon: 'fas fa-tshirt'
      },
      {
        id: 5,
        text: 'Welcome to <b>FanRadarMart</b>! Enjoy shopping for your favorite fandom products.',
        time: '1d ago',
        read: true,
        icon: 'fas fa-star'
      }
    ]
  }),
  actions: {
    markAsRead(id) {
      const notif = this.notifications.find(n => n.id === id)
      if (notif) notif.read = true
    },
    markAllAsRead() {
      this.notifications.forEach(n => { n.read = true })
    },
    markAllAsSeen() {
      // Optionally implement "seen" logic if needed
    },
    addNotification(notification) {
      this.notifications.unshift(notification)
    }
  }
})
