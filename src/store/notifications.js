import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [
      // General app notifications (not store-specific)
      {
        id: 1,
        text: '<b>John Doe</b> liked your post',
        time: '2m ago',
        read: false,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        text: '<b>Anime & Manga</b> has a new announcement',
        time: '10m ago',
        read: false,
        icon: 'fas fa-bullhorn'
      },
      {
        id: 3,
        text: '<b>Sarah</b> mentioned you in a comment',
        time: '1h ago',
        read: true,
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      {
        id: 4,
        text: 'Welcome to <b>FanRadar</b>!',
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
