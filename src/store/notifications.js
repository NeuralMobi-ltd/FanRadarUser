import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
  notifications: []
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
