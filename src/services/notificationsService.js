import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const NotificationsService = {
  async all(params = {}) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { notifications: [] }
    }
    const { data } = await http.get(API_CONFIG.notifications.all, { params })
    return data
  },
  async markRead(id) {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.notifications.markRead(id))
    return data
  },
  async markAllRead() {
    if (API_CONFIG.useMocks) {
      await delay(API_CONFIG.mockLatency)
      return { success: true }
    }
    const { data } = await http.put(API_CONFIG.notifications.markAllRead)
    return data
  }
}

export default NotificationsService
